---
aliases:
- /es/security/application_security/setup/envoy-gateway
code_lang: envoy-gateway
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
title: Habilite App and API Protection para Envoy Gateway
---
Puede habilitar Datadog [App and API Protection][12] para el tráfico gestionado por [Envoy Gateway][1] para inspeccionar y proteger el tráfico en el borde de su infraestructura.

## Requisitos previos {#prerequisites}

- Un clúster de Kubernetes en ejecución con [Envoy Gateway][1] instalado.
- El [Datadog Agent está instalado y configurado][2] en su clúster de Kubernetes.
  - Habilite y configure [Remote Configuration][3] para permitir el bloqueo de atacantes a través de la interfaz de usuario de Datadog.
  - Habilite [APM][4] en el Agent para permitir que el servicio del procesador de seguridad envíe sus propios traces al Agent.
    - Opcionalmente, habilite el [Cluster Agent Admission Controller][5] para inyectar automáticamente la información del servidor del Datadog Agent al servicio del procesador de seguridad de App and API Protection.

## Configuración automatizada con App and API Protection para Kubernetes {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  La configuración automatizada gestiona el despliegue del procesador de seguridad y la <code>EnvoyExtensionPolicy</code> creación. Este es el enfoque recomendado para la mayoría de los usuarios.
</div>

### Configuración {#setup}

1. **Despliegue el procesador de seguridad** utilizando el manifiesto de despliegue que se muestra en [Despliegue el servicio del procesador de seguridad de Datadog](#step-1-deploy-the-datadog-security-processor-service) a continuación.
2. **Habilite la configuración automática** utilizando Datadog Operator o Helm.

   {{< tabs >}}
   {{% tab "Datadog Operator" %}}

   Agregue anotaciones a su recurso `DatadogAgent`. La anotación del nombre del servicio es obligatoria y debe coincidir con su servicio de procesador de seguridad:

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
     override:
       clusterAgent:
         env:
           - name: DD_CLUSTER_AGENT_APPSEC_INJECTOR_MODE
             value: "external"
   ```

   Aplique la configuración:

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

   {{% /tab %}}
   {{% tab "Helm" %}}

   Agregue lo siguiente a su `values.yaml`:

   ```yaml
   datadog:
     appsec:
       injector:
         enabled: true
         mode: "external"
         processor:
           service:
             name: datadog-aap-extproc-service  # Required: must match your security processor service name
             namespace: datadog                 # Must match the namespace where the service is deployed
   ```

   Instale o actualice el chart de Helm de Datadog:

   ```bash
   helm upgrade -i datadog-agent datadog/datadog -f values.yaml
   ```

   {{% /tab %}}
   {{< /tabs >}}

   Después de habilitar esto, el Datadog Cluster Agent:
   - Detecta sus instalaciones de Envoy Gateway
   - Crea `EnvoyExtensionPolicy` recursos para cada Gateway
   - Configura las políticas para enrutar el tráfico al procesador de seguridad
3. **Verifique** la configuración comprobando las políticas creadas:
   ```bash
   kubectl get envoyextensionpolicy -A
   ```

Para obtener opciones de configuración y solución de problemas, consulte [App and API Protection for Kubernetes][13].

## Configuración manual (alternativa) {#manual-configuration-alternative}

Para un control detallado sobre gateways específicos, utilice la configuración manual:

1. Implemente el servicio del procesador de Datadog Security en su clúster.
2. Configure un `EnvoyExtensionPolicy` que apunte a él.

### Paso 1: Implemente el servicio del procesador de seguridad de Datadog {#step-1-deploy-the-datadog-security-processor-service}

Este servidor gRPC recibe solicitudes y respuestas de Envoy para el análisis de App and API Protection.

Impleméntelo en un espacio de nombres accesible por su Envoy Gateway. La imagen de Docker se encuentra en el [Datadog Go tracer GitHub Registry][6].

Manifiesto de ejemplo (`datadog-aap-extproc-service.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0 # Replace with the latest released version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the security processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # Optional: Agent Configuration
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the security processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

        # Disable TLS for communication between Envoy Gateway and the security processor. Default is true.
        # Cannot be enabled for now
        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"

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
  name: datadog-aap-extproc-service # This name will be used in the EnvoyExtensionPolicy configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
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

El procesador de Datadog Security expone algunos ajustes:

| Variable de entorno                      | Valor predeterminado       | Descripción                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Dirección de escucha del servidor gRPC.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | Puerto del servidor gRPC.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Puerto del servidor HTTP para comprobaciones de estado.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS`                | `true`          | Habilite la capa TLS de gRPC.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS_KEY_FILE`       | `localhost.key` | Cambie la clave predeterminada de la capa TLS de gRPC.                                                                           |
| `DD_SERVICE_EXTENSION_TLS_CERT_FILE`      | `localhost.crt` | Cambie el certificado predeterminado de la capa TLS de gRPC.                                                                           |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `10485760`                 | Tamaño máximo de los cuerpos que se procesarán en bytes. Si se establece en `0`, los cuerpos no se procesan. El valor recomendado es `10485760` (10MB). (Para habilitar completamente el procesamiento de cuerpos, también se debe configurar la opción `allowModeOverride` en la configuración del filtro de procesamiento externo.) |
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

### Paso 2: Configure una EnvoyExtensionPolicy {#step-2-configure-an-envoyextensionpolicy}

Utilice una `EnvoyExtensionPolicy` para indicar a Envoy Gateway que llame al procesador de seguridad de Datadog. Puede adjuntar la política a un Gateway o a recursos HTTPRoute/GRPCRoute específicos.

Esto envía todo el tráfico en el Gateway seleccionado al procesador de seguridad. Manifiesto de ejemplo (`datadog-aap-extproc-eep.yaml`):

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyExtensionPolicy
metadata:
  name: datadog-aap-extproc-eep
  namespace: <your-preferred-namespace> # same namespace as the Gateway
spec:
  targetRefs:
  # Target the entire Gateway
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: <your-gateway-name> # update to your specific gateway name
  # Target specific HTTPRoutes/GRPCRoutes
  #- group: gateway.networking.k8s.io
  #  kind: HTTPRoute
  #  name: <your-http-route-name>
  extProc:
  - backendRefs:
    - group: ""
      kind: Service
      name: datadog-aap-extproc-service
      namespace: <your-preferred-namespace> # namespace of the security processor Service
      port: 443

    # Optional: Enable fail open mode. Default is false.
    # Normally, if the security processor fails or times out, the filter fails and Envoy
    # returns a 5xx error to the downstream client. Setting this to true allows requests
    # to continue without error if a failure occurs.
    failOpen: true

    # Optional: Set a timeout by processing message. Default is 200ms.
    # There is a maxium of 2 messages per requests with headers only and 4 messages maximum
    # with body processing enabled.
    # Note: This timeout also includes the data communication between Envoy and the security processor.
    # The timeout should be adjusted to accommodate the additional possible processing time.
    # Larger payloads will require a longer timeout.
    messageTimeout: 200ms

    processingMode:
      # The security processor can dynamically override the processing mode as needed, instructing
      # Envoy to forward request and response bodies to the security processor.
      allowModeOverride: true
      # Only enable the request and response header modes by default.
      request: {}
      response: {}
```

#### Referencia entre espacios de nombres {#crossnamespace-reference}

Si su procesador de seguridad `Service` se encuentra en un **espacio de nombres diferente** al de la política, agregue un [ReferenceGrant][10] en el espacio de nombres del procesador. Por ejemplo, puede hacer esto con un manifiesto como `datadog-aap-eep-rg.yaml`.

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: datadog-aap-eep-rg
  namespace: <your-extproc-namespace>   # namespace of the security processor Service
spec:
  from:
  - group: gateway.envoyproxy.io
    kind: EnvoyExtensionPolicy
    namespace: <your-policy-namespace>  # namespace of the EnvoyExtensionPolicy (and the Gateway)
  to:
  - group: ""
    kind: Service
    name: datadog-aap-extproc-service
```

### Paso 3: Valide {#step-3-validate}

Después de aplicar la política, el tráfico a través del Gateway/Routes seleccionado es inspeccionado por App and API Protection.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra el explorador Signals y detalles, y el explorador Vulnerabilities y detalles." video="true" >}}

## Limitaciones {#limitations}

El modo de observabilidad (análisis asíncrono) no está disponible para Envoy Gateway.

Para obtener detalles adicionales sobre las compatibilidades de la integración de Envoy Gateway, consulte la [página de compatibilidad de la integración de Envoy Gateway][11].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gateway.envoyproxy.io/docs/
[2]: /es/containers/kubernetes/installation/?tab=datadogoperator
[3]: /es/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /es/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /es/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /es/tracing/trace_collection/library_config/go/
[9]: /es/security/application_security/policies/library_configuration/
[10]: https://gateway-api.sigs.k8s.io/api-types/referencegrant/
[11]: /es/security/application_security/setup/compatibility/envoy-gateway
[12]: /es/security/application_security/
[13]: /es/containers/kubernetes/appsec