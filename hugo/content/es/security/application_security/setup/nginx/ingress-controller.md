---
aliases:
- /es/security/application_security/setup/nginx/kubernetes/
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Configure App and API Protection para Nginx en Kubernetes
type: multi-code-lang
---
{{< partial name="app_and_api_protection/callout.html" >}}

# Soporte de Ingress-nginx para Datadog {#ingress-nginx-support-for-datadog}

[Ingress-nginx][1] es un [controlador de ingress de Kubernetes][2]
que utiliza NGINX como proxy inverso y balanceador de carga. En un clúster de Kubernetes, el acceso externo está restringido de forma predeterminada por razones de seguridad.
Un controlador de ingress utiliza reglas para controlar cómo el tráfico externo puede llegar a sus servicios.

Puede habilitar [App and API Protection][10] para su controlador ingress-nginx para inspeccionar y proteger el tráfico en el borde de su clúster. Datadog admite dos métodos de configuración:

- **Configuración automática** (recomendada): el Datadog Cluster Agent inyecta el módulo `nginx-datadog` en sus pods del controlador ingress-nginx.
- **Configuración manual**: usted mismo agrega un contenedor de inicialización de Datadog y fragmentos de configuración de NGINX.

## Configuración automatizada con App and API Protection para Kubernetes {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  La configuración automática permite que el Datadog Cluster Agent inyecte el <code>nginx-datadog</code> módulo en sus pods del controlador ingress-nginx, sin cambios manuales en el contenedor de inicialización o fragmentos de NGINX. Este es el enfoque recomendado para la mayoría de los usuarios.
</div>

### Configuración {#setup}

Esta configuración requiere:

- El Datadog Cluster Agent `v7.79.0` o posterior.
- Para el método de Helm, el chart de Helm de Datadog `v3.217.0` o posterior.
- Para el método de Datadog Operator, el Datadog Operator `v1.31.0` o posterior.

Habilite la configuración automática utilizando Datadog Operator o Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Configure el inyector en la sección `spec.features.appsec.injector` de su recurso `DatadogAgent`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    appsec:
      injector:
        enabled: true
        # Optional: override the path where the nginx-datadog module is mounted
        # in the controller pod (default: /modules_mount)
        # nginx:
        #   moduleMountPath: /modules_mount
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
      # Optional: override the path where the nginx-datadog module is mounted
      # in the controller pod (default: /modules_mount)
      # nginx:
      #   moduleMountPath: "/modules_mount"
```

Instale o actualice el chart de Helm de Datadog (`v3.217.0` o posterior):

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

Después de habilitar la configuración automática, el Datadog Cluster Agent:

- Detecta sus pods del controlador ingress-nginx
- Inyecta el módulo `nginx-datadog` en el controlador
- Configura el controlador para cargar el módulo y aplicar App and API Protection

Puede activar o desactivar App and API Protection a través de [Remote Configuration][8] sin cambiar esta configuración.

Para obtener opciones de configuración, consulte [App and API Protection for Kubernetes][9].

### Validar {#validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra el explorador Signals y detalles, y el explorador Vulnerabilities y detalles." video="true" >}}

## Configuración manual (alternativa) {#manual-configuration-alternative}

El controlador ingress-nginx se gestiona a través de [recursos de Kubernetes][3],
pero la personalización de la configuración subyacente de NGINX suele ser limitada más allá de su caso de uso previsto. Sin embargo, ingress-nginx permite
la adición de módulos NGINX adicionales para una funcionalidad extendida. Para aprovechar esta función con `nginx-datadog`, Datadog proporciona **contenedores de inicialización**.

### ¿Cómo habilitar `nginx-datadog` en ingress-nginx? {#how-to-enable-nginx-datadog-in-ingress-nginx}
Para integrar `nginx-datadog` con ingress-nginx, agregue un [contenedor de inicialización][4] de Datadog a la
especificación de su pod y configure NGINX para cargar el módulo `nginx-datadog`.

Los siguientes valores de Helm demuestran cómo inyectar el módulo `nginx-datadog` en un controlador ingress-nginx:

```yaml
controller:
  config: 
    main-snippet: "load_module /modules_mount/ngx_http_datadog_module.so;"
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        # The tag should match the version of the ingress-nginx controller
        # For example, this will inject the Datadog module for ingress v1.10.0
        # Check <https://hub.docker.com/repository/docker/datadog/ingress-nginx-injection/tags> 
        # for the list of all versions supported.
        tag: "v1.10.0"
        distroless: false
```

Consulte los [ejemplos detallados][5] para ayudarle a configurar ingress-nginx con `nginx-datadog`.

### ¿Cómo funciona? {#how-does-it-work}
Los contenedores de inicialización son contenedores especiales que se ejecutan antes que el contenedor principal en un pod de Kubernetes. En este caso,
el contenedor de inicialización de Datadog es responsable de copiar el módulo `nginx-datadog` en un volumen compartido al que el
contenedor principal de ingress-nginx puede acceder.

Cuando se inicia el controlador principal de ingress-nginx, la configuración de NGINX debe actualizarse con la directiva `load_module`,
lo que le permite cargar el módulo de Datadog.

<div class="alert alert-danger">
Datadog proporciona un contenedor de inicialización específico <b>para cada versión del controlador de ingress-nginx</b>, comenzando con <code>v1.10.0</code>. Esto es crucial porque <b>cada</b> contenedor de inicialización debe coincidir con la versión de NGINX subyacente. Para confirmar la compatibilidad, verifique que la versión del contenedor de inicialización de Datadog coincida con su versión de ingress-nginx.
</div>

### Interacción con OpenTelemetry {#interaction-with-opentelemetry}
De forma predeterminada, ingress-nginx incluye un módulo de OpenTelemetry (oTel) que se puede habilitar mediante el ajuste `enable-opentelemetry: true`
en el [ingress-nginx ConfigMap][6].
Sin embargo, si utiliza `nginx-datadog` para el rastreo, Datadog recomienda **deshabilitar** OpenTelemetry para evitar datos de rastreo duplicados de ambos
módulos, el de oTel y el de Datadog.

Para deshabilitar OpenTelemetry, establezca `enable-opentelemetry: false`.

### Habilitación de AppSec {#enabling-appsec}

Puede habilitar el WAF proporcionado por AppSec para proteger sus aplicaciones contra amenazas de seguridad. Para hacerlo, actualice sus valores de Helm para incluir la configuración de AppSec:

```yaml
controller:
  config:
    main-snippet: |
      load_module /modules_mount/ngx_http_datadog_module.so;
      # AppSec thread pool configuration (adjust threads and max_queue as needed)
      thread_pool waf_thread_pool threads=2 max_queue=16;
    http-snippet: |
      # Enable AppSec
      datadog_appsec_enabled on;
      datadog_waf_thread_pool_name waf_thread_pool;
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        tag: "v1.10.0"
        distroless: false
```

**Parámetros de configuración clave:**
- `thread_pool waf_thread_pool`: Crea un grupo de subprocesos dedicado para el procesamiento de AppSec. Ajuste `threads` y `max_queue` según sus patrones de tráfico y los recursos disponibles.
- `datadog_appsec_enabled on`: Habilita el módulo de Application Security para la detección y protección contra amenazas. Esto se puede omitir para que AppSec pueda habilitarse o deshabilitarse a través de Remote Configuration.
- `datadog_waf_thread_pool_name waf_thread_pool`: Asocia las solicitudes coincidentes con el grupo de subprocesos configurado.

Consulte la [referencia de configuración][7] para ver más opciones configurables.

<div class="alert alert-info">
Para entornos de producción, haga un seguimiento del rendimiento del grupo de subprocesos y ajuste los <code>threads</code> y <code>max_queue</code> parámetros según su volumen de tráfico y requisitos de latencia.
</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://kubernetes.io/docs/concepts/services-networking/ingress/
[3]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[4]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[5]: https://github.com/DataDog/nginx-datadog/tree/master/example/ingress-nginx
[6]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry
[7]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[8]: /es/agent/remote_config/?tab=helm#enabling-remote-configuration
[9]: /es/containers/kubernetes/appsec
[10]: /es/security/application_security/