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
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Activación de App and API Protection para Envoy Gateway
---

{{< callout url="#" btn_hidden="true" header="App and API Protection para Envoy Gateway está en vista previa" >}}
App and API Protection para Envoy Gateway está en vista previa. Sigue las instrucciones a continuación para probar la vista previa.
{{< /callout >}}

Puedes activar Datadog App and API Protection para el tráfico gestionado por [Envoy Gateway][1]. La integración de Datadog Envoy Gateway permite a Datadog inspeccionar y proteger tu tráfico para detectar y bloquear amenazas directamente en el borde de tu infraestructura.

## Requisitos previos

- Un clúster de Kubernetes en funcionamiento con [Envoy Gateway][1] instalado.
- El [Datadog Agent está instalado y configurado][2] en tu clúster de Kubernetes.
  - Asegúrate de que [Remote Configuration][3] está activada y configurada para permitir el bloqueo de atacantes a través de la interfaz de usuario de Datadog.
  - Asegúrate de que [APM está activado][4] en el Agent para permitir que el servicio de procesador externo envíe sus propias trazas al Agent.
    - Opcionalmente, activa el [Cluster Agent Admission Controller][5] para inyectar automáticamente la información del host del Datadog Agent al servicio de App and API Protection External Processor.

## Configuración automatizada con App and API Protection para Kubernetes

<div class="alert alert-info">
  App and API Protection para Kubernetes configura automáticamente tu Envoy Gateway para la monitorización de Application Security. Este es el enfoque recomendado para la mayoría de los usuarios, ya que elimina la configuración manual y simplifica las operaciones.
</div>

En lugar de desplegar manualmente el procesador externo y configurar `EnvoyExtensionPolicy` (como se muestra en la sección de configuración manual a continuación), activa App and API Protection para que la configuración automática de Kubernetes lo haga por ti.

### Cuándo utilizar la configuración automática

Utiliza la configuración automática si deseas:
- Configurar automáticamente de varios Envoy Gateways en distintos espacios de nombres
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
   - Detecta tus instalaciones de Envoy Gateway
   - Crea recursos `EnvoyExtensionPolicy` para cada Gateway
   - Configura las políticas para enrutar el tráfico al procesador externo
3. **Verifica** la configuración comprobando las políticas creadas:
   ```bash
   kubectl get envoyextensionpolicy -A
   ```

Para obtener información detallada sobre opciones de configuración, funciones avanzadas y solución de problemas, consulta [App and API Protection for Kubernetes](/containers/kubernetes/appsec).

## Configuración manual (alternativa)

Si prefieres la configuración manual o necesitas un control detallado de gateways específicas, sigue las instrucciones que se indican a continuación:

1. Despliegue del servicio Datadog External Processor en tu clúster.
2. Configura un `EnvoyExtensionPolicy` que apunte al servicio del procesador. Esto dirigirá el tráfico de tu Envoy Gateway a este servicio.

### Paso 1: Despliegue el servicio Datadog External Processor

Este servicio es un servidor gRPC con el que Envoy se comunica para que las solicitudes y respuestas sean analizadas por App and API Protection.

Crea un despliegue y servicio de Kubernetes para el Datadog External Processor. Se recomienda desplegar este servicio en un espacio de nombres accesible por tu Envoy Gateway.

La imagen de Docker del Datadog External Processor está disponible en el [Registro de GitHub del rastreador de Datadog Go][6].

He aquí un ejemplo de manifiesto (`datadog-aap-extproc-service.yaml`):

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
          containerPort: 443 # Default gRPC port for the external processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # Optional: Agent Configuration
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the external processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

        # Disable TLS for communication between Envoy Gateway and the external processor. Default is true.
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

#### Opciones de configuración del External Processor

El Datadog External Processor expone algunos ajustes:

| Variable de entorno                      | Valor por defecto       | Descripción                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Dirección de escucha del servidor gRPC.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | Puerto del servidor gRPC.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Puerto del servidor HTTP para checks de estado.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS`                | `true`          | Habilita la capa TLS de gRPC.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS_KEY_FILE`       | `localhost.key` | Cambia la clave por defecto de la capa TLS de gRPC.                                                                           |
| `DD_SERVICE_EXTENSION_TLS_CERT_FILE`      | `localhost.crt` | Cambia el certificado por defecto de la capa TLS de gRPC.                                                                           |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `10485760`                 | Tamaño máximo de los cuerpos a procesar en bytes. Si se establece en `0`, los cuerpos no se procesan. El valor recomendado es `10485760` (10MB). (Para habilitar completamente el procesamiento de cuerpos, también se debe establecer la opción `allowModeOverride` en la configuración del filtro External Processing (Procesamiento externo)). |
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

### Paso 2: Configurar una EnvoyExtensionPolicy

Utiliza `EnvoyExtensionPolicy` para indicar a Envoy Gateway que llame al procesador externo de Datadog. Puedes adjuntar la política a un Gateway o a recursos HTTPRoute/GRPCRoute específicos.

Esto envía todo el tráfico del gateway seleccionado al procesador externo. He aquí un manifiesto de ejemplo (`datadog-aap-extproc-eep.yaml`):

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
      namespace: <your-preferred-namespace> # namespace of the external processor Service
      port: 443

    # Optional: Enable fail open mode. Default is false.
    # Normally, if the external processor fails or times out, the filter fails and Envoy
    # returns a 5xx error to the downstream client. Setting this to true allows requests
    # to continue without error if a failure occurs.
    failOpen: true

    # Optional: Set a timeout by processing message. Default is 200ms.
    # There is a maxium of 2 messages per requests with headers only and 4 messages maximum
    # with body processing enabled.
    # Note: This timeout also includes the data communication between Envoy and the external processor.
    # The timeout should be adjusted to accommodate the additional possible processing time.
    # Larger payloads will require a longer timeout.
    messageTimeout: 200ms

    processingMode:
      # The external processor can dynamically override the processing mode as needed, instructing
      # Envoy to forward request and response bodies to the external processor.
      allowModeOverride: true
      # Only enable the request and response header modes by default.
      request: {}
      response: {}
```

#### Referencia entre espacios de nombres

Si tu procesador externo `Service` se encuentra en un **espacio de nombres diferente** al de la política, añade un [ReferenceGrant][10] en el espacio de nombres del procesador. Por ejemplo, puedes hacerlo con un manifiesto como `datadog-aap-eep-rg.yaml`.

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: datadog-aap-eep-rg
  namespace: <your-extproc-namespace>   # namespace of the external processor Service
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

### Paso 3: Validación

Una vez aplicada la política, el tráfico a través de las Gateway/Routes seleccionadas es inspeccionado por App and API Protection.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Limitaciones

La integración de Envoy Gateway tiene las siguientes limitaciones:

* El modo de observabilidad (análisis asíncrono) no está disponible para Envoy Gateway.

Para más detalles sobre las compatibilidades de integración de Envoy Gateway, consulta la [página de compatibilidad de la integración de Envoy Gateway][11].

## Referencias adicionales

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