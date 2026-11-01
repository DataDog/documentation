---
aliases:
- /es/security/application_security/threats_detection/istio
- /es/security/application_security/setup/istio
- /es/security/application_security/setup/standalone/istio
code_lang: istio
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: Código fuente
  text: Código fuente de la integración de Envoy
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Habilitación de la protección de aplicaciones y API para Istio
---
Puede habilitar la protección de aplicaciones y API dentro de una malla de servicios de Istio para inspeccionar y proteger el tráfico en el borde de su infraestructura. Esto funciona en el Istio Ingress Gateway o a nivel de sidecar.

## Requisitos previos {#prerequisites}

Antes de comenzar, verifique que tiene lo siguiente:

- Un clúster de Kubernetes en ejecución con [Istio][1] instalado.
- El [Datadog Agent está instalado y configurado][2] en su clúster de Kubernetes.
  - Habilite y configure [Remote Configuration][3] para permitir el bloqueo de atacantes a través de la interfaz de usuario de Datadog.
  - Habilite [APM][4] en el Agente. Esto permite que el servicio del procesador de seguridad envíe sus propias trazas al Agent.
    - Opcionalmente, habilite el [Cluster Agent Admission Controller][5] para inyectar automáticamente la información del servidor del Datadog Agent al servicio del procesador de seguridad de App and API Protection.

## Configuración automatizada con App and API Protection para Kubernetes {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  <p>La configuración automatizada utiliza el <strong>modo sidecar</strong>: el procesador de seguridad se ejecuta como un contenedor inyectado en sus pods de gateway de Istio. No se necesita una implementación de procesador separada.</p>
  <p>Para la configuración en <strong>modo externo</strong>, consulte <a href="/containers/kubernetes/appsec/">la protección de aplicaciones y API para Kubernetes</a>.</p>
</div>

### Configuración {#setup}

Habilite la configuración automática utilizando Helm o el Datadog Operator.

{{< tabs >}}
{{% tab "Helm" %}}

Agregue lo siguiente a su `values.yaml`:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Instale o actualice el chart de Helm de Datadog:

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Agregue anotaciones a su recurso `DatadogAgent`. El modo sidecar es el predeterminado, por lo que habilitar el inyector es suficiente:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

Aplique con:

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

Después de habilitar esto, el Datadog Cluster Agent:
- Inyecta un contenedor de procesador sidecar en sus pods de gateway de Istio
- Crea `EnvoyFilter` recursos para enrutar el tráfico al procesador sidecar co-ubicado
- Monitorea nuevos gateways de Istio y los configura automáticamente

**Verifique** la configuración comprobando los filtros creados:

```bash
kubectl get envoyfilter -n istio-system
```

Para el ajuste y la resolución de problemas de recursos sidecar, consulte [la protección de aplicaciones y API para Kubernetes][12].

## Configuración manual (alternativa) {#manual-configuration-alternative}

Para un control detallado sobre gateways o sidecars específicos, utilice la configuración manual a continuación. Esto implica dos pasos:
1. Implementación del servicio del procesador de seguridad de Datadog.
2. Configuración de un `EnvoyFilter` para dirigir el tráfico desde su Istio Ingress Gateway (o sidecars) a este servicio.

### Paso 1: Implemente el servicio del procesador de seguridad de Datadog {#step-1-deploy-the-datadog-security-processor-service}

Este servidor gRPC recibe solicitudes y respuestas de Envoy para el análisis de App and API Protection.

Impleméntelo en un espacio de nombres accesible por su Istio Ingress Gateway. La imagen de Docker se encuentra en el [Datadog Go tracer GitHub Registry][6].

Manifiesto de ejemplo (`datadog-aap-extproc-service.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
  labels:
    app: datadog-aap-extproc
spec:
  replicas: 1 # Adjust replica count based on your load
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
      - name: datadog-aap-extproc-container
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.2.2 # Replace with the latest released version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the security processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # ---- Optional: Agent Configuration ----
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the security processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

        readinessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service # This name will be used in the EnvoyFilter configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
  labels:
    app: datadog-aap-extproc
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
    protocol: TCP
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

#### Opciones de configuración para el procesador de seguridad {#configuration-options-for-the-security-processor}

El procesador de seguridad de Datadog expone algunos ajustes:

| Variable de entorno                      | Valor predeterminado       | Descripción                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Dirección de escucha del servidor gRPC.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | Puerto del servidor gRPC.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Puerto del servidor HTTP para comprobaciones de estado.                                                                                                      |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | Tamaño máximo de los cuerpos que se procesarán en bytes. Si se establece en `0`, los cuerpos no se procesan. El valor recomendado es `10000000` (10 MB). (Para habilitar completamente el procesamiento de cuerpos, también se debe configurar la opción `allow_mode_override` en la configuración del filtro de procesamiento externo) |
| `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | Habilite el análisis asíncrono de solicitudes. Esto también deshabilita las capacidades de bloqueo. (Para habilitar completamente el modo de observabilidad, esta opción también debe configurarse en la configuración del filtro de procesamiento externo) |
| `DD_SERVICE`                              | `serviceextensions` | Nombre del servicio que se muestra en la interfaz de usuario de Datadog.                                                                                                    |


Configure la conexión desde el procesador de seguridad al Datadog Agent utilizando estas variables de entorno:

| Variable de entorno                   | Valor predeterminado | Descripción                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nombre de host o IP de su Datadog Agent.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Puerto del Datadog Agent para la recopilación de trazas.                                  |

El procesador de seguridad está construido sobre el [Datadog Go Tracer][7] y hereda todas sus variables de entorno. Consulte [Configuración del SDK de Go][8] y [Configuración de la biblioteca de protección de aplicaciones y API][9].

<div class="alert alert-info">
  Debido a que el procesador de seguridad de Datadog está construido sobre el Datadog Go tracer, generalmente sigue el mismo proceso de lanzamiento que el tracer, y sus imágenes de Docker están etiquetadas con la versión del tracer correspondiente (por ejemplo, <code>v2.2.2</code>). En algunos casos, es posible que se publiquen versiones de lanzamiento anticipado entre los lanzamientos oficiales del trazador, y estas imágenes están etiquetadas con un sufijo como <code>-docker.1</code>.
</div>

### Paso 2: Configure un EnvoyFilter {#step-2-configure-an-envoyfilter}

Cree un recurso `EnvoyFilter` para enviar tráfico desde su Istio Ingress Gateway o proxies sidecar al `datadog-aap-extproc-service` que implementó.

{{< tabs >}}
{{% tab "Istio Ingress Gateway" %}}

Aplica la protección de aplicaciones y API a todo el tráfico a través de su Istio Ingress Gateway (tráfico norte-sur).

El siguiente manifiesto de ejemplo (`datadog-aap-gateway-filter.yaml`) apunta al Istio Ingress Gateway predeterminado en el espacio de nombres `istio-system` con la etiqueta `istio: ingressgateway`.

**Nota**: Lea atentamente la configuración de ejemplo proporcionada y adáptela para que coincida con su infraestructura y entorno. Puede encontrar más opciones de configuración en la [documentación del procesador de seguridad de Envoy](https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto).

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-gateway-filter
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
spec:
  ## If workloadSelector is omitted, the following patches apply to Gateway pods in this EnvoyFilter's namespace
  ## Use workloadSelector to target a specific Gateway instance.
  # workloadSelector:
  #   labels:
  #     istio: ingressgateway # Label for the default Istio Gateway implementation
  configPatches:
    # Patch to add the External Processing Filter to the Gateway's HTTP connection manager
    - applyTo: HTTP_FILTER
      match:
        context: GATEWAY
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        # Insert this filter before the router filter. This filter needs to be the earliest filter in the chain to process malicious traffic before the data is sent to an application.
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the security processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The security processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the security processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the security processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the security processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The security processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the security processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: GATEWAY
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog security processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{% tab "Sidecar" %}}

Esta configuración aplica la protección de aplicaciones y API a pods específicos dentro de su malla de servicio al apuntar a sus proxies sidecar de Istio. Esto permite un control más granular sobre qué servicios están protegidos.

Aquí hay un manifiesto de ejemplo (`datadog-aap-sidecar-filter.yaml`) que apunta a pods con la etiqueta `app: <your-app-label>` en el espacio de nombres `<your-application-namespace>`. Debe actualizar estos ajustes para que coincidan con su aplicación específica.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-sidecar-filter
  namespace: <your-application-namespace> # Namespace of your application
spec:
  workloadSelector:
    labels:
      app: <your-app-label> # Label of your application pods
  configPatches:
    # Patch to add the External Processing HTTP Filter to the Sidecar's connection manager
    - applyTo: HTTP_FILTER
      match:
        context: SIDECAR_INBOUND
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the security processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The security processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the security processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the security processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the security processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The security processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the security processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the Cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: SIDECAR_INBOUND
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog security processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{< /tabs >}}

Después de aplicar `EnvoyFilter`, el procesador de seguridad de Datadog comienza a gestionar el tráfico a través de su Istio Ingress Gateway o los sidecars seleccionados.

### Paso 3: Valide {#step-3-validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra el explorador Signals y detalles, y el explorador Vulnerabilities y detalles." video="true" >}}

## Limitaciones {#limitations}

Limitaciones conocidas:

* La inspección de los cuerpos de solicitud y respuesta es compatible cuando se utiliza la versión de imagen del procesador de seguridad de Datadog `v2.2.2` o posterior.

Para obtener detalles adicionales sobre las compatibilidades de la integración de Istio, consulte la [página de compatibilidad de la integración de Istio][11].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://istio.io/
[2]: /es/containers/kubernetes/installation/?tab=datadogoperator
[3]: /es/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /es/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /es/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /es/tracing/trace_collection/library_config/go/
[9]: /es/security/application_security/policies/library_configuration/
[10]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[11]: /es/security/application_security/setup/compatibility/istio
[12]: /es/containers/kubernetes/appsec/