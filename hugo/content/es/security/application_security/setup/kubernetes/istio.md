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
  text: Código source (fuente) de la integración de Envoy
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Activación de App and API Protection para Istio
---

{{< callout url="#" btn_hidden="true" header="App and API Protection para Istio está en vista previa" >}}
Para probar la vista previa de App and API Protection para Istio, sigue las instrucciones de configuración a continuación.
{{< /callout >}}

Puedes activar App and API Protection para tus servicios dentro de una malla de servicios de Istio. La integración de Datadog e Istio permite a Datadog inspeccionar y proteger tu tráfico para la detección y el bloqueo de amenazas directamente en el borde de tu infraestructura. Esto se puede aplicar en la gateway de entrada de Istio o en el nivel auxiliar.

## Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente:

- Un clúster de Kubernetes en funcionamiento con [Istio][1] instalado.
- El [Datadog Agent está instalado y configurado][2] en tu cluster de Kubernetes.
  - Asegúrate de que [Remote Configuration][3] está activada y configurada para permitir el bloqueo de atacantes a través de la interfaz de usuario de Datadog.
  - Asegúrate de que [APM está activado][4] en el Agent. *Esto permite que el servicio de procesador externo envíe sus propias trazas al Agent.*
    - Opcionalmente, activa el [Cluster Agent Admission Controller][5] para inyectar automáticamente la información del host del Datadog Agent al servicio de App and API Protection External Processor.

## Configuración automatizada con App and API Protection para Kubernetes

<div class="alert alert-info">
  App and API Protection para Kubernetes configura automáticamente tus gateways de entrada de Istio para la monitorización de Application Security. Este es el enfoque recomendado para la mayoría de los usuarios, ya que elimina la configuración manual y simplifica las operaciones.
</div>

En lugar de desplegar manualmente el procesador externo y configurar `EnvoyFilter` (como se muestra en la sección de configuración manual a continuación), activa App and API Protection para que la configuración automática de Kubernetes lo haga por ti.

### Cuándo utilizar la configuración automática

Utiliza la configuración automática si deseas:
- Configurar automáticamente las gateways de entrada de Istio para Application Security
- Simplificar el despliegue y el mantenimiento continuo
- Gestionar la configuración mediante la infraestructura como código con Helm
- Centralizar la gestión del procesador de Application Security

### Configuración rápida

1. **Despliega el procesador externo** utilizando el manifiesto de despliegue que se muestra en el [Paso 1](#step-1-deploy-the-datadog-external-processor-service) a continuación.
2. **Activa la configuración automática** mediante Helm o Datadog Operator.

   {{< tabs >}}
   {{% tab "Datadog Operator" %}}

   Añade anotaciones a tu recurso `DatadogAgent`. La anotación del nombre del servicio es obligatoria y debe coincidir con tu servicio de procesador externo:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/appsec.injector.enabled: "true"
       agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required
       agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
   spec:
     # ... your existing DatadogAgent configuration
   ```

   Aplica la configuración:

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

   {{% /tab %}}
   {{% tab "Helm" %}}

   Añade lo siguiente a tu `values.yaml`:

   ```yaml
   datadog:
     appsec:
       injector:
         enabled: true
         processor:
           service:
             name: datadog-aap-extproc-service  # Required: must match your external processor service name
             namespace: datadog                 # Must match the namespace where the service is deployed
   ```

   Instala o actualiza el Helm chart de Datadog:

   ```bash
   helm upgrade -i datadog-agent datadog/datadog -f values.yaml
   ```

   {{% /tab %}}
   {{< /tabs >}}

   Una vez activado, el Datadog Cluster Agent:
   - Detecta tus instalaciones de Istio
   - Crea recursos `EnvoyFilter` en el espacio de nombres del sistema de Istio (normalmente `istio-system`)
   - Configura los filtros para enrutar el tráfico al procesador externo
4. **Verifica** la configuración comprobando los filtros creados:
   ```bash
   kubectl get envoyfilter -n istio-system
   ```

Para obtener información detallada sobre opciones de configuración, funciones avanzadas y solución de problemas, consulta [App and API Protection for Kubernetes](/containers/kubernetes/appsec).

## Configuración manual (alternativa)

Si prefieres la configuración manual o necesitas un control detallado sobre gateways o auxiliares específicos, sigue las instrucciones que se indican a continuación. Activar la detección de amenazas para Istio implica dos pasos principales:
1. Despliegue del servicio Datadog External Processor.
2. Configuración de un `EnvoyFilter` para dirigir el tráfico desde tu gateway de entrada de Istio (o auxiliares) a este servicio.

### Paso 1: Despliegue del servicio Datadog External Processor

Este servicio es un servidor gRPC con el que Envoy se comunica para que las solicitudes y respuestas sean analizadas por App and API Protection.

Crea un despliegue y servicio de Kubernetes para el Datadog External Processor. Se recomienda desplegar este servicio en un espacio de nombres accesible por tu gateway de entrada de Istio.

La imagen de Docker del Datadog External Processor está disponible en el [Registro de GitHub del rastreador de Datadog Go][6].

He aquí un ejemplo de manifiesto (`datadog-aap-extproc-service.yaml`):

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
          containerPort: 443 # Default gRPC port for the external processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # ---- Optional: Agent Configuration ----
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the external processor
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

#### Opciones de configuración del External Processor

El Datadog External Processor expone algunos ajustes:

| Variable de entorno                      | Valor por defecto       | Descripción                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Dirección de escucha del servidor gRPC.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | Puerto del servidor gRPC.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Puerto del servidor HTTP para checks de estado.                                                                                                      |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | Tamaño máximo de los cuerpos a procesar en bytes. Si se establece en `0`, los cuerpos no se procesan. El valor recomendado es `10000000` (10MB). (Para habilitar completamente el procesamiento de cuerpos, también se debe establecer la opción `allow_mode_override` en la configuración del filtro External Processing (Procesamiento externo)). |
| `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | Habilita el análisis asíncrono de las solicitudes. Esto también deshabilita las capacidades de bloqueo. (Para activar completamente el modo de observabilidad, esta opción también debe establecerse en la configuración del filtro External Processing (Procesamiento externo)). |
| `DD_SERVICE`                              | `serviceextensions` | Nombre del servicio que aparece en la interfaz de usuario de Datadog.                                                                                                    |


Configura la conexión desde el procesador externo al Datadog Agent utilizando estas variables de entorno:

| Variable de entorno                   | Valor por defecto | Descripción                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nombre de host o IP de tu Datadog Agent.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Puerto del Datadog Agent para la recopilación de trazas.                                  |

El External Processor está construido sobre el [Rastreador de Datadog Go][7] y hereda todas sus variables de entorno. Consulta [Configuración de la biblioteca de rastreo de Go][8] y [Configuración de la biblioteca de App and API Protection][9].

<div class="alert alert-danger">
  <strong>Nota:</strong> Dado que el Datadog External Processor se basa en el rastreador de Datadog Go, generalmente sigue el mismo proceso de publicación que el rastreador, y sus imágenes de Docker se etiquetan con la versión correspondiente del rastreador (por ejemplo, <code>v2.2.2</code>). En algunos casos, pueden publicarse versiones tempranas entre las versiones oficiales del rastreador y estas imágenes se etiquetan con un sufijo como <code>-docker.1</code>.
</div>

### Paso 2: Configuración de un EnvoyFilter

A continuación, crea un recurso `EnvoyFilter` para indicar a tu gateway de entrada de Istio o a proxies auxiliares específicos que envíen tráfico a `datadog-aap-extproc-service` que has desplegado. Este filtro indica a Envoy cómo conectarse al procesador externo y qué tráfico enviar.

Elige la configuración adecuada en función de si deseas aplicar App and API Protection en la gateway de entrada o directamente en los proxies auxiliares de tu aplicación.

{{< tabs >}}
{{% tab "Istio Ingress Gateway" %}}

Esta configuración aplica App and API Protection a todo el tráfico que pasa por la gateway de entrada de Istio. Este es un enfoque común para proteger todo el tráfico Norte-Sur que entra en tu malla de servicios.

A continuación, se muestra un manifiesto de ejemplo (`datadog-aap-gateway-filter.yaml`) que tiene como objetivo la gateway de entrada de Istio predeterminada que normalmente se ejecuta en el espacio de nombres `istio-system` con la etiqueta `istio: ingressgateway`.

**Nota**: Lee detenidamente la configuración de ejemplo proporcionada y adáptala a tu infraestructura y entorno. Puedes encontrar más opciones de configuración disponibles en la [documentación del procesador externo de Envoy][10].

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
            ## Normally, if the external processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The external processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the external processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the external processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The external processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the External Processor
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
                      # Address of the Datadog External Processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{% tab "Sidecar" %}}

Esta configuración aplica App and API Protection a pods específicos dentro de tu malla de servicios dirigiéndose a sus proxies auxiliares de Istio. Esto permite un control más detallado sobre qué servicios están protegidos.

A continuación, se muestra un manifiesto de ejemplo (`datadog-aap-sidecar-filter.yaml`) que se dirige a pods con la etiqueta `app: <your-app-label>` en el espacio de nombres `<your-application-namespace>`. Deberás actualizar estos parámetros para adaptarlos a tu aplicación específica.

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
            ## Normally, if the external processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The external processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the external processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the external processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The external processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the External Processor
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
                      # Address of the Datadog External Processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{< /tabs >}}

Después de aplicar el `EnvoyFilter` elegido, el tráfico que pasa a través de tu gateway de entrada de Istio o auxiliares seleccionados será procesado por el servicio Datadog External Processor, habilitando las funciones de App and API Protection.

### Paso 3: Validación

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Limitaciones

La integración de Istio tiene las siguientes limitaciones:

* La inspección de los cuerpos de solicitud y respuesta es posible cuando se utiliza la imagen del Datadog External Processor versión `v2.2.2` o posterior.

Para obtener más información sobre las compatibilidades de integración de Istio, consulta la [página de compatibilidad de la integración de Istio][11].

## Referencias adicionales

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