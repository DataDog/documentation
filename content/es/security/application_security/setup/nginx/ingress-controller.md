---
aliases:
- /es/security/application_security/setup/nginx/kubernetes/
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Funcionamiento de App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Configura App and API Protection para NGINX en Kubernetes
type: multi-code-lang
---
{{< partial name="app_and_api_protection/callout.html" >}}

# Compatibilidad de Ingress-NGINX con Datadog

[Ingress-NGINX][1] es un [controlador de entrada de Kubernetes][2]
que utiliza NGINX como proxy inverso y equilibrador de carga. En un clúster de Kubernetes, el acceso externo está restringido por defecto por razones de seguridad.
Un controlador de entrada utiliza reglas para controlar cómo el tráfico externo puede llegar a tus servicios.

El controlador ingress-NGINX se gestiona a través de [recursos de Kubernetes][3],
pero la personalización de la configuración subyacente de NGINX suele estar limitada más allá de su caso de uso previsto. Sin embargo, ingress-NGINX permite
la adición de módulos NGINX adicionales para ampliar la funcionalidad. Para aprovechar esta característica con `nginx-datadog`, proporcionamos **contenedores init**.

## ¿Cómo activar `nginx-datadog` en ingress-NGINX?
Para integrar `nginx-datadog` con ingress-NGINX, añade un [controlador init][4] de Datadog a tu especificación de pod
y configura NGINX para cargar el módulo `nginx-datadog`.

Los siguientes valores de Helm demuestran cómo inyectar el módulo `nginx-datadog` en un controlador de ingress-NGINX:

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

Consulta [nuestros ejemplos detallados][5] para ayudarte a configurar ingress-NGINX con `nginx-datadog`.

## ¿Cómo funciona?
Los contenedores init son contenedores especiales que se ejecutan antes del contenedor principal en un pod de Kubernetes. En este caso,
el contenedor init de Datadog es responsable de copiar el módulo `nginx-datadog` en un volumen compartido que será
accesible por el contenedor principal de ingress-NGINX.

Cuando el controlador principal de ingress-NGINX se inicia, la configuración de NGINX debe actualizarse con la directiva `load_module`,
permitiéndote cargar el módulo de Datadog sin problemas.

<div class="alert alert-danger">
Proporcionamos un contenedor init específico **para cada versión del controlador ingress-NGINX **, a partir de la <code>v1.10.0</code>. Esto es crucial porque **cada** contenedor init debe coincidir con la versión NGINX subyacente. Para garantizar la compatibilidad, asegúrate de que la versión del contenedor init de Datadog coincide con tu versión de ingress-NGINX.
</div>

## Interacción con OpenTelemetry
Por defecto, ingress-nginx incluye un módulo de OpenTelemetry que puede activarse mediante el ajuste `enable-opentelemetry: true` 
en el [ConfigMap de ingress-NGINX][6].
Sin embargo, si utilizas `nginx-datadog` para el rastreo, recomendamos **deshabilitar** OpenTelemetry para evitar la duplicación de datos de rastreo de los módulos y 
los módulos de OpenTelemetry y Datadog.

Para desactivar OpenTelemetry, configura `enable-OpenTelemetry: false`.

## Habilitación de AppSec

Puedes habilitar el WAF proporcionado por AppSec para proteger tus aplicaciones de amenazas de seguridad. Para ello, actualiza tus valores Helm para incluir la configuración de AppSec:

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

**Principales parámetros de configuración:**
- `thread_pool waf_thread_pool`: crea un grupo de subprocesos dedicado para el procesamiento de AppSec. Ajusta `threads` y `max_queue` en función de tus patrones de tráfico y los recursos disponibles.
- `datadog_appsec_enabled on`: habilita el módulo Application Security para la detección y protección de amenazas. Puede omitirse para que AppSec se active o desactive a través de Remote Configuration.
- `datadog_waf_thread_pool_name waf_thread_pool`: asocia las solicitudes coincidentes con el grupo de subprocesos configurado.

Consulta la [referencia de configuración][7] para ver más opciones configurables.

<div class="alert alert-info">
Para entornos de producción, monitoriza el rendimiento del grupo de subprocesos y ajusta los parámetros <code>threads</code> y <code>max_queue</code> en función de tus requisitos de volumen de tráfico y latencia.
</div>

[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://kubernetes.io/docs/concepts/services-networking/ingress/
[3]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[4]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[5]: https://github.com/DataDog/nginx-datadog/tree/master/example/ingress-nginx
[6]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry
[7]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md