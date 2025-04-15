---
app_id: fastly
app_uuid: baa14f81-c988-4262-9a9f-e268e9476689
assets:
  dashboards:
    fastly: assets/dashboards/fastly_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: fastly.requests
      metadata_path: metadata.csv
      prefix: fastly.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 57
    source_type_name: Fastly
  monitors:
    5XX errors are higher than usual: assets/monitors/rec_monitor_5xx_errors.json
    'Hit Ratio is low ': assets/monitors/rec_monitor_hit_ratio.json
    Sent bandwidth is abnormally high: assets/monitors/rec_monitor_bandwidth.json
    Web application firewall rule is triggered: assets/monitors/waf_rules.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: fastly
integration_id: fastly
integration_title: Fastly
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: fastly
public_title: Fastly
short_description: Observa las métricas clave de Fastly en contexto con el resto de
  tus métricas de Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Almacenamiento en caché
  - Category::Recopilación de logs
  - Category::Métricas
  - Offering::Integración
  configuration: README.md#Setup
  description: Observa las métricas clave de Fastly en contexto con el resto de tus
    métricas de Datadog.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/
  - resource_type: otro
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account
  - resource_type: otro
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service
  support: README.md#Troubleshooting
  title: Fastly
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/fastly/fastly_dashboard.png" alt="Dashboard de Fastly que muestra la tasa de aciertos de caché, la tasa de éxito y otras métricas" popup="true">}}

## Información general

Conecta Fastly a Datadog para ver métricas clave de Fastly (por ejemplo, cobertura de caché y tamaño del encabezado) en contexto con el resto de tus métricas de Datadog.

La integración incluye monitores y dashboards listos para usar que te permiten ver métricas en conjunto, alternar entre métricas de Fastly y logs relacionados, y crear monitores que te alertan cuando una métrica supera un umbral definido por el usuario o se comporta de manera anómala.

## Configuración

### Instalación

No se requieren pasos de instalación.

### Configuración

#### Recopilación de métricas

Crea un token de API de acceso de solo lectura en la página de gestión de tokens de Fastly, obtén tu ID de servicio del dashboard e ingrésalo en el [cuadro de integración de Fastly][1].

<div class="alert alert-info">
El ServiceID es el código alfanumérico, por ejemplo: <code>5VqE6MOOy1QFJbgmCK41pY</code> (ejemplo de la <a href="https://docs.fastly.com/api/auth">Documentación de la API de Fastly</a>).
</div>

Si usas varios IDs de servicio de una cuenta, ingresa un token de API en cada línea.

El nombre de la cuenta es una forma de organizar tus cuentas y no se usa como parte del proceso de ingesta de datos.

#### Recopilación de logs


{{< site-region region="us3" >}}

La recopilación de logs no es compatible con este sitio.

{{< /site-region >}}



{{< site-region region="us,us5,eu,gov" >}}

Configura el endpoint de Datadog para reenviar logs de Fastly a Datadog. Puedes elegir el endpoint de `Datadog` o `Datadog (via Syslog)`. Se recomienda el endpoint de `Datadog` para una entrega más confiable de logs a través de Syslog.

##### Seleccionar el endpoint de registro

1. Inicia sesión en la interfaz web de Fastly y haz clic en **Configure link** (Configurar enlace).
2. En el menú **Service** (Servicio), selecciona el servicio adecuado.
3. Haz clic en el botón **Configuration** (Configuración) y, a continuación, selecciona **Clone active** (Clonar activo). Aparecerá la página de dominios.
4. Haz clic en el enlace **Logging** (Registro). Aparecerá la página de endpoints de registro. Haz clic en **Create Endpoint** (Crear endpoint) en **Datadog** o en las opciones **Datadog (with Syslog)** (Datadog [con Syslog]).

##### Configurar el endpoint de Datadog (recomendado)

1. Asigna un nombre al endpoint, por ejemplo: `Datadog`.
2. Configura el formato del log. De manera predeterminada, el [formato del log de Datadog y Fastly][2] recomendado ya se proporciona y se puede personalizar.
3. Selecciona tu región para que coincida con la región de tu cuenta de Datadog: {{< region-param key="dd_site_name" code="true" >}}
4. Añade tu [clave de API de Datadog][3].
5. Haz clic en **Create** (Crear) en la parte inferior.
6. Haz clic en **Activate** (Activar) en la parte superior derecha para activar la configuración nueva. Después de unos minutos, los logs deberían empezar a llegar a tu cuenta.

##### Configurar el endpoint de Syslog

1. Asigna un nombre al endpoint, por ejemplo: `Datadog`.
2. Configura el formato del log para que incluya el formato del log de Datadog y Fastly recomendado con [tu clave de API de Datadog][3] al principio. Consulta el [Uso del formato de log de JSON][2] en la documentación de Fastly para ver un ejemplo.

    ```text
    <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
    ```

    **Nota**: Tu clave de API de Datadog DEBE estar delante del formato del log de Datadog y Fastly para que tus logs se muestren en Datadog. Consulta las [Variables útiles para el registro de logs][4] a fin de obtener más detalles.

3. Establece **Syslog Address** (Dirección de Syslog) en: {{< region-param key="web_integrations_endpoint" code="true" >}}
4. Establece **Port** (Puerto) en: {{< region-param key="web_integrations_port" code="true" >}}
5. Establece **TLS** en `yes`
6. Establece **TLS Hostname** (Nombre de host de TLS) en: {{< region-param key="web_integrations_endpoint" code="true" >}}
7. En la sección de opciones avanzadas, selecciona `Blank` como **formato de línea del log**
8. Por último, guarda el endpoint y despliega el servicio. Consulta los logs en tu [Explorador de logs de Datadog][5].

[2]: https://docs.fastly.com/en/guides/log-streaming-datadog#using-the-json-logging-format
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://app.datadoghq.com/logs

{{< /site-region >}}


## Datos recopilados

### Métricas
{{< get-metrics-from-git "fastly" >}}


### Eventos

La integración de Fastly no incluye eventos.

### Checks de servicio

La integración de Fastly no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

- [Monitorizar el rendimiento de Fastly con Datadog][4]
- [Crear y gestionar las cuentas de Fastly con Terraform][5]
- [Crear y gestionar los servicios de Fastly con Terraform][6]

[1]: https://app.datadoghq.com/account/settings#integrations/fastly
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service