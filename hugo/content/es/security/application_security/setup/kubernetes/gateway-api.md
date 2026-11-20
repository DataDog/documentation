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
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Habilitación de AAP para Gateway API en Kubernetes
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

<div class="alert alert-danger">
  AAP para Gateway API es experimental. Siga las instrucciones a continuación para probarlo.
</div>

## Descripción general {#overview}

El **Request Mirror de Datadog AppSec Gateway API** mejora la seguridad de las aplicaciones al aprovechar la funcionalidad **RequestMirror** en las API de Gateway de Kubernetes para duplicar el tráfico a un punto de conexión de Datadog App & API Protection. Esto permite la detección y el análisis en tiempo real de posibles ataques a nivel de aplicación, el descubrimiento de puntos de conexión de API y más, todo sin afectar el flujo de solicitudes principal.

## Requisitos previos {#prerequisites}

- Un clúster de Kubernetes con [Gateway API CRDs instalados][9].
- Un [controlador compatible con el filtro RequestMirror de Gateway API][10].
- [Go][11] 1.23+ instalado en su máquina local.

## Habilitación de la detección de amenazas {#enabling-threat-detection}

### Instalación {#installation}

1. **Implemente el Datadog Agent** en su clúster de Kubernetes siguiendo la [guía de instalación de Kubernetes][12].

2. **Configure el Datadog Agent** para [admitir cargas útiles de AppSec entrantes][13] utilizando APM como transporte.

3. **Implemente el AppSec Gateway API Request Mirror** en el espacio de nombres de su elección (por ejemplo, `datadog`) junto con su servicio:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/DataDog/dd-trace-go/refs/heads/main/contrib/k8s.io/gateway-api/cmd/request-mirror/deployment.yml
   ```

4. **Verifique la implementación**:

   ```bash
   kubectl get pods -l app=request-mirror
   ```

5. **Aplique parches a sus recursos de Gateway** para permitir el acceso al espacio de nombres con la implementación:

   ```bash
   git clone https://github.com/DataDog/dd-trace-go.git
   cd dd-trace-go
   go run ./contrib/k8s.io/gateway-api/cmd/patch-gateways
   ```

   Utilice la marca `-help` para ver las opciones de personalización del comportamiento de aplicación de parches.

6. **Aplique parches a sus recursos HTTPRoute** para redirigir el tráfico al servicio:

   ```bash
   go run ./contrib/k8s.io/gateway-api/cmd/patch-httproutes
   ```

   Este comando agrega un filtro [RequestMirror][14] a todos los `HTTPRoute` recursos en todos los espacios de nombres. Utilice la marca `-help` para las opciones de configuración.

   **Nota**: Ejecutar este comando regularmente asegura que cualquier recurso `HTTPRoute` recién creado incluya automáticamente el filtro `RequestMirror`. Considere agregar el parche resultante a su pipeline de CI/CD donde `HTTPRoute` se modifiquen los recursos.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra Signals explorer y detalles, y Vulnerabilities explorer y detalles." video="true" >}}

## Configuración {#configuration}

### Variables de entorno {#environment-variables}

La implementación de AppSec Gateway API Request Mirror se puede configurar mediante las siguientes variables de entorno:

| Variable de entorno                 | Valor predeterminado | Descripción                                                                                                                |
|--------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| `DD_REQUEST_MIRROR_LISTEN_ADDR`      | `:8080`       | Dirección y puerto donde el servicio de duplicación de solicitudes escucha las solicitudes duplicadas entrantes                                   |
| `DD_REQUEST_MIRROR_HEALTHCHECK_ADDR` | `:8081`       | Dirección y puerto donde se sirve el punto de conexión de verificación de estado                                                                 |

Configure el Datadog Agent para recibir trazas de la integración mediante las siguientes variables de entorno:

| Variable de entorno                   | Valor predeterminado | Descripción                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nombre de host donde se ejecuta su Datadog Agent                          |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Puerto del Datadog Agent para la recopilación de trazas                        |

### Ejemplo de implementación {#deployment-example}

La implementación predeterminada crea un servicio que escucha en el puerto 8080 para las solicitudes duplicadas y expone un punto de conexión de verificación de estado en el puerto 8081:

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

## Integración de Datadog Go Tracer y Gateway API {#datadog-go-tracer-and-gateway-api-integration}

<div class="alert alert-info">
  La integración de AAP Gateway API se basa en el Datadog Go Tracer. Sigue el mismo proceso de lanzamiento que el rastreador, y sus imágenes de Docker están etiquetadas con la versión correspondiente del rastreador.
</div>

La integración de Gateway API utiliza el [Datadog Go Tracer][6] y hereda todas las variables de entorno del rastreador. Puede encontrar más información en [Configuración del Go SDK][7] y [AAP Library Configuration][8].

## Habilitación del rastreo de APM {#enabling-apm-tracing}

De forma predeterminada, las trazas de reflejo de solicitudes no habilitarán el producto APM de Datadog. Si desea utilizar App and API Protection sin la funcionalidad de rastreo de APM, este es el comportamiento predeterminado. 

Para habilitar el rastreo de APM, establezca la variable de entorno `DD_APM_TRACING_ENABLED=true` en la implementación de reflejos de solicitudes.

Si desea deshabilitar explícitamente el rastreo de APM mientras utiliza App and API Protection:

1. Configure su implementación con la variable de entorno `DD_APM_TRACING_ENABLED=false` además de la variable de entorno `DD_APPSEC_ENABLED=true`.
2. Esta configuración reducirá la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos App and API Protection.

Para obtener más detalles, consulte [Standalone App and API Protection][15].

## Limitaciones {#limitations}

La integración de Gateway API tiene las siguientes limitaciones:

- No puede acceder a las respuestas HTTP
- No se puede aplicar el bloqueo de solicitudes
- Solo se admite json para analizar los cuerpos de las solicitudes HTTP.

Para un análisis más detallado y otras funciones de AAP, considere probar otras integraciones de AAP.

## Lecturas adicionales {#further-reading}

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