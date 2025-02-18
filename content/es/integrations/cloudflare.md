---
app_id: cloudflare
app_uuid: e48a0b64-d3ad-436f-95d3-e0c81e6d51d1
assets:
  dashboards:
    Cloudflare-Overview: assets/dashboards/cloudflare_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: cloudflare.requests.all
      metadata_path: metadata.csv
      prefix: cloudflare
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 215
    source_type_name: Cloudflare
  monitors:
    Cache hit rate is abnormally low: assets/monitors/hit_ratio.json
    Error Rate is higher than normal: assets/monitors/error_rate.json
    Threat number is high: assets/monitors/threats.json
    Worker script errors are increasing: assets/monitors/worker_error.json
    Zone bandwidth is abnormal: assets/monitors/bandwidth.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- recopilación de logs
- almacenamiento en caché
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudflare
integration_id: cloudflare
integration_title: Cloudflare
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cloudflare
public_title: Cloudflare
short_description: Monitoriza el tráfico web de Cloudflare, las consultas de DNS,
  las amenazas de seguridad y más.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Log Collection
  - Category::Caching
  - Category::Security
  - Offering::Integration
  configuration: README.md#Configuración
  description: Monitoriza el tráfico web de Cloudflare, las consultas de DNS, las
    amenazas de seguridad y más.
  media:
  - caption: Dashboard de información general de Cloudflare
    image_url: images/overview-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/cloudflare-monitoring-datadog/
  support: README.md#Soporte
  title: Cloudflare
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Integra con Cloudflare para obtener las métricas de tu zona, incluido el tráfico web, las consultas de DNS y la información sobre amenazas. La integración se basa en la [API de análisis de Cloudflare][1]. Obtén más información sobre qué recursos corresponden a qué métricas en [nuestra documentación][2].

**Log Collection**: además de estas métricas, Cloudflare permite a los clientes enviar logs directamente a Datadog mediante Cloudflare Logpush. Estos logs detallados contienen metadatos generados por los productos de Cloudflare y son útiles para la depuración y la creación de análisis, especialmente cuando se combinan con logs de otras fuentes. [Habilita la recopilación de logs de Cloudflare][3] en combinación con estas métricas para obtener una visibilidad completa de tu entorno de Cloudflare.

El dashboard listo para usar mejora la seguridad y el rendimiento de tus aplicaciones. Este panel único te brinda visibilidad de:

- amenazas a la seguridad
- volumen de solicitudes HTTP y tasas de error
- balanceo de carga, incluido el tiempo de ida y vuelta y cualquier cambio en el flujo de tráfico
- problemas de rendimiento en los scripts de workers

Con logs enriquecidos y métricas detalladas que te brindan una visión profunda de tu infraestructura de Cloudflare, puedes crear el contexto que necesitas para resolver problemas.

La integración funciona con [Datadog Cloud SIEM][4] para proporcionar detección de amenazas lista para usar para:

- viaje imposible
- errores de configuración peligrosos
- ataques DDoS

Mitiga las amenazas de seguridad más rápidamente con los planes de automatización de flujo de trabajo incluidos, como bloquear una dirección IP o crear un caso en Datadog.

## Configuración

Antes de empezar, necesitas una [cuenta de Datadog][5], con un [token de API][6], y acceso a [Cloudflare Logpush][7], que requiere un plan de cuenta Enterprise.

Para crear un token de API Cloudflare, sigue la [documentación del token de API Cloudflare][2] y asegúrate de que tienes los permisos necesarios que se indican a continuación para cada cuenta. Si tienes problemas de autenticación con tu token, ponte en contacto con el [servicio de asistencia de Cloudflare][8].

#### Permisos

| Contexto   | Permiso        | Estado |
| ------- | ----------------- | ------ |
| Cuenta | Análisis de cuentas | Leer   |
| Cuenta | Configuración de la cuenta  | Leer   |
| Cuenta | Scripts de workers   | Leer   |
| Cuenta | Cola de workers      | Leer   |
| Zona    | Análisis         | Leer   |
| Zona    | Balanceadores de carga    | Leer   |
| Zona    | Rutas de los workers    | Leer   |
| Zona    | Zona              | Leer   |

### Instalación

Instala la integración utilizando el [cuadro de la integración Cloudflare][9] de Datadog, introduciendo el token de API creado anteriormente.

### Configuración

1. Ve a la pestaña **Configurar** en el [cuadro de la integración Cloudflare][9] de Datadog
2. Introduce tu dirección de correo electrónico y el token de API creado anteriormente para las cuentas que quieres monitorizar. Puedes encontrar tu token de API Cloudflare en tu cuenta de Cloudflare, en **My Profile** > **API Tokens** (Mi perfil** > **Tokens de API). Ten en cuenta que las claves de API Cloudflare ahora se consideran [métodos de autenticación legacy][8]. Si estás utilizando una clave de API, te recomendamos que la sustituyas por un token de API.
3. Proporciona un nombre para la cuenta. Este nombre es arbitrario y se utilizará en la etiqueta (tag) `account` en tus métricas.

### Recopilación de logs

Cloudflare permite a los clientes enviar logs directamente a Datadog mediante Cloudflare Logpush. Puedes gestionar el trabajo de Logpush con la [API Cloudflare](#cloudflare-api) o directamente en tu [dashboard de Cloudflare](#cloudflare-dashboard).

Si instalas el pipeline de la integración Cloudflare, se reasignarán automáticamente determinados atributos. Para ver los atributos reasignados:

1. Ve a los [pipelines de logs][10].
2. Haz clic en **Browse Pipeline Library** (Consultar la biblioteca del pipeline) en la esquina superior derecha.
3. Introduce `Cloudflare` en la barra de búsqueda.
4. Haz clic en **Cloudflare** para ver la lista de reasignadores y otros procesadores instalados.

#### API Cloudflare

1. Crea un trabajo de Logpush realizando una solicitud POST al endpoint de trabajos de Logpush. Incluye los siguientes campos:

   - `name` (opcional): Utiliza tu nombre de dominio como nombre del trabajo.
   - `destination_conf`: Destino de logs que consta de los siguientes parámetros:
     - `<DATADOG_ENDPOINT_URL>`: Endpoint de entrada de logs HTTP de Datadog, que puede ser cualquiera de los que se indican a continuación. Puedes encontrar la diferencia en la [referencia de la API Datadog][11].
       - **v1:** `http-intake.logs.{{< region-param key="dd_site" >}}/v1/input`
       - **v2 (más reciente):** `http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs`
     - `<DATADOG_API_KEY>`: Tu clave de API Datadog.
     - `ddsource`: Configurar como `cloudflare`.
     - `service` (opcional): Especifica el nombre del servicio.
     - `host` (opcional): Especifica el nombre del host.
     - `ddtags` (opcional): Especifica etiquetas.
   - `dataset`: Categoría de logs que quieres recibir. Para obtener una lista de los conjuntos de datos admitidos, consulta los [campos de log de Cloudflare][12].
   - `logpull_options` (opcional): Para configurar campos, frecuencias de muestreo y formatos de marcas de tiempo, consulta las [opciones de API Logpush][13]. Datadog exige el uso del **formato RFC 3339 para las marcas de tiempo** de Cloudflare, que es la opción predeterminada utilizada por Cloudflare.

   **Ejemplo de solicitud**:

   ```bash
   curl -s -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs' \
   --header 'X-Auth-Key: <CLOUDFLARE_AUTH_KEY>' \
   --header 'X-Auth-Email: <CLOUDFLARE_AUTH_EMAIL>' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "name": "<NAME>",
      "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
      "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
      "dataset": "http_requests"
   }'
   ```

   **Ejemplo de respuesta**:

   ```bash
   {
    "errors": [],
    "messages": [],
    "result": {
      "id": 100,
      "dataset": "http_requests",
      "enabled": false,
      "name": "<DOMAIN_NAME>",
      "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
      "destination_conf": "datadog://http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?header_DD-API-KEY=<DD-API-KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
      "last_complete": null,
      "last_error": null,
      "error_message": null
    },
    "success": true
   }
   ```

   Fíjate en el valor de `id`. En el ejemplo anterior, es `100`.

2. Habilita el trabajo. Utiliza el ID de trabajo devuelto en la respuesta y envía `{"enabled": true}` en el cuerpo de la solicitud.

   **Ejemplo de solicitud**:

   ```bash
   curl -s -X PUT \
   https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID> -d'{"enabled":true}' | jq .
   ```

   **Ejemplo de respuesta**:

   ```bash
   {
     "errors": [],
     "messages": [],
     "result": {
       "id": 100,
       "dataset": "http_requests",
       "enabled": true,
       "name": "<DOMAIN_NAME>",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "destination_conf": "datadog://{{< region-param key="dd_site" >}}?header_DD-API-KEY=<DATADOG-API-KEY>",
       "last_complete": null,
       "last_error": null,
       "error_message": null
     },
     "success": true
   }
   ```

#### Dashboard de Cloudflare

1. Una vez que hayas conectado un servicio con la sección Logpush del dashboard de Cloudflare, selecciona el conjunto de datos, los campos de datos y, a continuación, en seleccionar destino, elige Datadog.
2. En **Introducir información del destino**, introduce el endpoint de la URL de Datadog:

   ```
   http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?ddsource=cloudflare
   ```

   **Nota**: `ddsource=cloudflare` es obligatorio. Para diferenciar entre logs, también puedes añadir los parámetros opcionales de `service`, `host` y `ddtags`.

   **Ejemplo**:

   ```
   http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
   ```

3. Introduce la clave de API Datadog que utilizaste para configurar el cuadro de la integración Cloudflare en Datadog.
4. Después de validar el acceso, deberías ver "Listo para enviar" en **Probar propiedad**. Haz clic en `Push` para finalizar.

## Datos recopilados

### Métricas

{{< get-metrics-from-git "cloudflare" >}}

#### Categorías de métricas

En la siguiente tabla se describen los tipos de métricas recopiladas y sus prefijos de métricas asociados.

| **Tipo**          | **Descripción**                                    | **Prefijos de métricas recopilados**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Análisis web** | Métricas relacionadas con el tráfico web y el rendimiento.    | `cloudflare.requests.all`<br>`cloudflare.requests.cached`<br>`cloudflare.requests.uncached`<br>`cloudflare.requests.ssl.encrypted`<br>`cloudflare.requests.ssl.unencrypted`<br>`cloudflare.requests.country`<br>`cloudflare.requests.status`<br>`cloudflare.requests.content_type`<br>`cloudflare.requests.ip_class`<br>`cloudflare.bandwidth.all`<br>`cloudflare.bandwidth.cached`<br>`cloudflare.bandwidth.uncached`<br>`cloudflare.bandwidth.ssl.encrypted`<br>`cloudflare.bandwidth.ssl.unencrypted`<br>`cloudflare.bandwidth.country`<br>`cloudflare.bandwidth.content_type`<br>`cloudflare.threats.all`<br>`cloudflare.threats.type`<br>`cloudflare.threats.country`<br>`cloudflare.pageviews.all`<br>`cloudflare.pageviews.search_engine`<br>`cloudflare.uniques.all`<br>`cloudflare.requests.cross_zone_sub_requests.avg`<br>`cloudflare.requests.edge_dns_response_time.avg`<br>`cloudflare.requests.edge_time_to_first_byte.avg`<br>`cloudflare.requests.origin_response_duration.avg` |
| **DNS**           | Métricas relacionadas con las consultas DNS y los tiempos de respuesta. | `cloudflare.dns.query.all`<br>`cloudflare.dns.query.uncached`<br>`cloudflare.dns.query.stale`<br>`cloudflare.dns.response_time.avg`<br>`cloudflare.dns.response_time.median`<br>`cloudflare.dns.response_time.90p`<br>`cloudflare.dns.response_time.99p`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Balanceador de carga** | Métricas relacionadas con grupos de balanceo de carga.           | `cloudflare.load_balancer.pool.round_trip_time.average`<br>`cloudflare.load_balancer.pool.health.status`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Script del worker** | Métricas relacionadas con scripts de workers de Cloudflare.     | `cloudflare.workers.requests.all`<br>`cloudflare.workers.requests.errors`<br>`cloudflare.workers.requests.subrequests`<br>`cloudflare.workers.response_time.75p`<br>`cloudflare.workers.response_time.99p`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### Eventos

La integración Cloudflare no incluye eventos.

### Checks de servicios

La integración Cloudflare no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][14].

[1]: https://developers.cloudflare.com/analytics/graphql-api/
[2]: https://docs.datadoghq.com/es/integrations/cloudflare/#metric-categories
[3]: https://docs.datadoghq.com/es/integrations/cloudflare/#log-collection
[4]: https://docs.datadoghq.com/es/security/cloud_siem/
[5]: https://www.datadoghq.com/free-datadog-trial/
[6]: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
[7]: https://developers.cloudflare.com/logs/about
[8]: https://www.support.cloudflare.com/s/?language=en_US
[9]: https://app.datadoghq.com/integrations/cloudflare
[10]: https://app.datadoghq.com/logs/pipelines
[11]: https://docs.datadoghq.com/es/api/latest/logs/
[12]: https://developers.cloudflare.com/logs/log-fields
[13]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[14]: https://docs.datadoghq.com/es/help/