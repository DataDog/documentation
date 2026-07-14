---
aliases:
- /es/security/application_security/threats/setup/threat_detection/gateway_api
- /es/security/application_security/threats_detection/gateway_api
- /es/security/application_security/setup/gateway-api
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/k8s.io/gateway-api
  tag: Código fuente
  text: Código fuente de la integración de Gateway API
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Activación de AAP para Gateway API en Kubernetes
---

<div class="alert alert-danger">
  AAP para Gateway API es experimental. Sigue las instrucciones a continuación para probarla.
</div>

## Información general

**Datadog AppSec Gateway API Request Mirror** mejora la seguridad de las aplicaciones al aprovechar la funcionalidad **RequestMirror** de las Gateway APIs de Kubernetes para duplicar el tráfico a un endpoint de Datadog App &API Protection. Esto permite la detección y el análisis en tiempo real de posibles ataques a nivel de aplicación, la detección de endpoints de API, etc., todo ello sin afectar al flujo de solicitudes principal.

## Requisitos previos

- Un clúster de Kubernetes con [CRDs de Gateway API instalados][9].
- Un [controlador compatible con el filtro RequestMirror de Gateway API][10].
- [Go][11] 1.23+ instalado en tu máquina local.

## Habilitación de la detección de amenazas

### Instalación

1. **Despliega el Datadog Agent** en tu clúster de Kubernetes siguiendo la [guía de instalación de Kubernetes][12].

2. **Configura el Datadog Agent** para [admitir cargas útiles de AppSec entrantes][13] usando APM como transporte.

3. **Despliega AppSec Gateway API Request Mirror** en el espacio de nombres de tu elección (por ejemplo, `datadog`) junto con su servicio:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/DataDog/dd-trace-go/refs/heads/main/contrib/k8s.io/gateway-api/cmd/request-mirror/deployment.yml
   ```

4. **Verifica el despliegue**:

   ```bash
   kubectl get pods -l app=request-mirror
   ```

5. **Parchea tus recursos de Gateway** para permitir el acceso al espacio de nombres con el despliegue:

   ```bash
   git clone https://github.com/DataDog/dd-trace-go.git
   cd dd-trace-go
   go run ./contrib/k8s.io/gateway-api/cmd/patch-gateways
   ```

   Utiliza el indicador `-help` para ver las opciones para personalizar el comportamiento de parcheo.

6. **Parchea tus recursos HTTPRoute** para redirigir el tráfico al servicio:

   ```bash
   go run ./contrib/k8s.io/gateway-api/cmd/patch-httproutes
   ```

   Este comando añade un filtro [RequestMirror][14] a todos los recursos de `HTTPRoute` en todos los espacios de nombres. Utiliza el indicador `-help` para las opciones de configuración.

   **Nota**: La ejecución regular de este comando garantiza que cualquier recurso `HTTPRoute` recién creado incluya automáticamente el filtro `RequestMirror`. Considera añadir el parche resultante a tu pipeline de Continuous Integration Continuous Delivery donde se modifican los recursos `HTTPRoute`.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Configuración

### Variables de entorno

El despliegue de Gateway API Request Mirror puede configurarse con las siguientes variables de entorno:

| Variable de entorno                 | Valor por defecto | Descripción                                                                                                                |
|--------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| `DD_REQUEST_MIRROR_LISTEN_ADDR`      | `:8080`       | Dirección y puerto donde el servicio de réplica de solicitudes escucha las solicitudes de réplica entrantes.                                   |
| `DD_REQUEST_MIRROR_HEALTHCHECK_ADDR` | `:8081`       | Dirección y puerto donde se sirve el endpoint de check de estado                                                                 |

Configura el Datadog Agent para recibir trazas (traces) de la integración utilizando las siguientes variables de entorno:

| Variable de entorno                   | Valor por defecto | Descripción                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nombre del host donde se ejecuta el Datadog Agent                           |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Puerto del Datadog Agent para la recopilación de trazas                        |

### Ejemplo de despliegue

El despliegue por defecto crea un servicio que escucha en el puerto 8080 para las solicitudes de réplica y expone un endpoint de check de estado en el puerto 8081:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: request-mirror
  labels:
    app.kubernetes.io/component: request-mirror
    app.kubernetes.io/name: datadog
spec:
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: request-mirror
  template:
    metadata:
      labels:
        app: request-mirror
    spec:
      containers:
        - name: request-mirror
          image: ghcr.io/datadog/dd-trace-go/request-mirror:latest
          ports:
            - containerPort: 8080
              name: http
          livenessProbe:
            httpGet:
              path: /
              port: 8081
          readinessProbe:
            httpGet:
              path: /
              port: 8081
          env:
            - name: DD_AGENT_HOST
              value: "datadog-agent"  # Adjust to your Agent service name
---
apiVersion: v1
kind: Service
metadata:
  name: request-mirror
spec:
  selector:
    app: request-mirror
  ports:
    - name: http
      port: 8080
      targetPort: 8080
```

## Integración del rastreador de Datadog Go y Gateway API

<div class="alert alert-info">
  La integración de AAP Gateway API se basa en el rastreador de Datadog Go. Sigue el mismo proceso de publicación que el rastreador, y sus imágenes de Docker están etiquetadas con la versión del rastreador correspondiente.
</div>

La integración de Gateway API utiliza el [rastreador de Datadog Go][6] y hereda todas las variables de entorno del rastreador. Puedes encontrar más información en [Configuración de la biblioteca de rastreo de Go][7] y [Configuración de la biblioteca de AAP][8].

## Activación del rastreo de APM 

Por defecto, las trazas de réplica de solicitud no habilitarán el producto APM de Datadog. Si deseas utilizar Application & API Protection sin la funcionalidad de rastreo de APM, este es el comportamiento predeterminado. 

Para habilitar el rastreo de APM, establece la variable de entorno `DD_APM_TRACING_ENABLED=true` en el despliegue de la réplica de solicitud.

Si deseas desactivar explícitamente el rastreo de APM mientras utilizas App and API Protection:

1. Configura tu despliegue con la variable de entorno `DD_APM_TRACING_ENABLED=false` además de la variable de entorno `DD_APPSEC_ENABLED=true`.
2. Esta configuración reduce la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos App and API Protection.

Para más detalles, consulta [App and API Protection independiente][15].

## Limitaciones

La integración de Gateway API tiene las siguientes limitaciones:

- No puede acceder a las respuestas HTTP
- No se puede aplicar el bloqueo de solicitudes
- Solo se admite json para analizar los cuerpos de las solicitudes HTTP.

Para un análisis más detallado y otras funciones de AAP, considera la posibilidad de probar otras integraciones de AAP.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/dd-trace-go
[7]: /es/tracing/trace_collection/library_config/go/
[8]: /es/security/application_security/policies/library_configuration/
[9]: https://gateway-api.sigs.k8s.io/guides/#installing-gateway-api
[10]: https://gateway-api.sigs.k8s.io/implementations
[11]: https://go.dev/doc/install
[12]: /es/containers/kubernetes/installation/
[13]: /es/tracing/guide/setting_up_apm_with_kubernetes_service/
[14]: https://gateway-api.sigs.k8s.io/guides/http-request-mirroring/
[15]: /es/security/application_security/setup/standalone/