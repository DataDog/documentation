---
app_id: cloudflare
categories:
- métricas
- recopilación de logs
- almacenamiento en caché
- seguridad
custom_kind: integración
description: Monitoriza el tráfico web de Cloudflare, las consultas de DNS, las amenazas
  de seguridad y más.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: blog
  text: Monitorizar Cloudflare Zero Trust con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloudflare-monitoring-datadog/
  tag: blog
  text: Monitorización de logs y métricas de Cloudflare con Datadog
integration_version: 1.2.2
media:
- caption: Dashboard de información general de Cloudflare
  image_url: images/cloudflare_overview_dashboard_1.png
  media_type: imagen
- caption: Dashboard de información general de Cloudflare
  image_url: images/cloudflare_overview_dashboard_2.png
  media_type: imagen
- caption: Dashboard de información general de Cloudflare
  image_url: images/cloudflare_overview_dashboard_3.png
  media_type: imagen
- caption: Dashboard de información general de Cloudflare
  image_url: images/cloudflare_overview_dashboard_4.png
  media_type: imagen
title: Cloudflare
---
## Información general

Integra con Cloudflare para obtener las métricas de tu zona, incluido el tráfico web, las consultas DNS y la información sobre amenazas. La integración se basa en [la API de análisis de Cloudflare](https://developers.cloudflare.com/analytics/graphql-api/). Encuentre más información sobre qué recursos se corresponden con qué métricas en [nuestra documentación](https://docs.datadoghq.com/integrations/cloudflare/#metric-categories).

**Recopilación de logs**: además de estas métricas, Cloudflare permite a los clientes enviar logs directamente a Datadog utilizando Cloudflare Logpush. Estos logs detallados contienen metadatos generados por los productos de Cloudflare y son útiles para depurar y crear análisis, especialmente cuando se combinan con logs de otras fuentes. [Habilita la recopilación de logs de Cloudflare](https://docs.datadoghq.com/integrations/cloudflare/#log-collection) en combinación con estas métricas para obtener una visibilidad completa de tu entorno de Cloudflare.

El dashboard listo para usar mejora la seguridad y el rendimiento de tus aplicaciones. Este panel único te brinda visibilidad de:

- amenazas a la seguridad
- volumen de solicitudes HTTP y tasas de error
- balanceo de carga, incluido el tiempo de ida y vuelta y cualquier cambio en el flujo de tráfico
- problemas de rendimiento en los scripts de workers

Con logs enriquecidos y métricas detalladas que te brindan una visión profunda de tu infraestructura de Cloudflare, puedes crear el contexto que necesitas para resolver problemas.

La integración funciona con [Datadog Cloud SIEM](https://docs.datadoghq.com/security/cloud_siem/) para proporcionar una detección de amenazas predeterminada para

- viaje imposible
- errores de configuración peligrosos
- ataques DDoS

Mitiga las amenazas de seguridad más rápidamente con los planes de automatización de flujo de trabajo incluidos, como bloquear una dirección IP o crear un caso en Datadog.

## Configuración

Antes de empezar, necesitas una [cuenta de Datadog](https://www.datadoghq.com/free-datadog-trial/), con un [token de API](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) y acceso a [Cloudflare Logpush](https://developers.cloudflare.com/logs/about), que requiere un plan de cuenta Enterprise.

Para crear un token de API de Cloudflare, sigue la [documentación de token de API de Cloudflare](https://docs.datadoghq.com/integrations/cloudflare/#metric-categories) y asegúrate de que tienes los permisos necesarios que se indican a continuación para cada cuenta. Si tienes problemas de autenticación con tu token, ponte en contacto con el [soporte de Cloudflare](https://www.support.cloudflare.com/s/?language=en_US).

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

Instala la integración con el [cuadro de integración de Cloudflare] de Datadog (https://app.datadoghq.com/integrations/cloudflare) introduciendo el token de API que creaste anteriormente.

### Configuración

1. Ve a la pestaña **Configure** (Configurar) en el [cuadro de integración de Cloudflare] de Datadog (https://app.datadoghq.com/integrations/cloudflare).
1. Introduce tu dirección de correo electrónico y el token de API creado anteriormente para las cuentas que deseas monitorizar. Puedes encontrar tu token de API de Cloudflare en tu cuenta de Cloudflare en **My Profile** > **API Tokens** (Mi perfil > Token de API). Ten en cuenta que las claves de API de Cloudflare se consideran ahora [métodos de autenticación heredados](https://www.support.cloudflare.com/s/?language=en_US). Si estás utilizando una clave de API, te recomendamos que la sustituyas por un token de API.
1. Proporciona un nombre para la cuenta. Este nombre es arbitrario y se utilizará en la etiqueta (tag) `account` en tus métricas.

### Recopilación de logs

Cloudflare permite a los clientes enviar logs directamente a Datadog mediante Cloudflare Logpush. Puedes gestionar el trabajo de Logpush con la [API Cloudflare](#cloudflare-api) o directamente en tu [dashboard de Cloudflare](#cloudflare-dashboard).

Si instalas el pipeline de la integración Cloudflare, se reasignarán automáticamente determinados atributos. Para ver los atributos reasignados:

1. Navega hasta [Pipelines de logs](https://app.datadoghq.com/logs/pipelines).
1. Haz clic en **Browse Pipeline Library** (Consultar la librería del pipeline) en la esquina superior derecha.
1. Introduce `Cloudflare` en la barra de búsqueda.
1. Haz clic en **Cloudflare** para ver la lista de reasignadores y otros procesadores instalados.

#### API Cloudflare

1. Crea un trabajo de Logpush realizando una solicitud POST al endpoint de trabajos de Logpush. Incluye los siguientes campos:

   - `name` (opcional): Utiliza tu nombre de dominio como nombre del trabajo.
   - `destination_conf`: Destino de logs que consta de los siguientes parámetros:
     - `<DATADOG_ENDPOINT_URL>`: el endpoint de admisión de logs HTTP de Datadog, que puede ser cualquiera de los siguientes. Puedes encontrar la diferencia en la [referencia de API de Datadog](https://docs.datadoghq.com/api/latest/logs/).
       - **v1:** `http-intake.logs.{{< region-param key="dd_site" >}}/v1/input`
       - **v2 (más reciente):** `http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs`
     - `<DATADOG_API_KEY>`: Tu clave de API Datadog.
     - `ddsource`: Configurar como `cloudflare`.
     - `service` (opcional): Especifica el nombre del servicio.
     - `host` (opcional): Especifica el nombre del host.
     - `ddtags` (opcional): Especifica etiquetas.
   - `dataset`: la categoría de logs que deseas recibir. Consulta los [campos de logs de Cloudflare](https://developers.cloudflare.com/logs/log-fields) para obtener una lista de los conjuntos de datos admitidos.
   - `logpull_options` (opcional): para configurar los campos, la frecuencia de muestreo y el formato de la marca de tiempo, consulta las [opciones de la API de Logpush](https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options). Datadog ordena el uso del formato **RFC 3339 para las marcas de tiempo** de Cloudflare, que es la opción predeterminada utilizada por Cloudflare.

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

1. Habilita el trabajo. Utiliza el ID de trabajo devuelto en la respuesta y envía `{"enabled": true}` en el cuerpo de la solicitud.

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

1. En **Introducir información del destino**, introduce el endpoint de la URL de Datadog:

   ```
   http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?ddsource=cloudflare
   ```

   **Nota**: `ddsource=cloudflare` es obligatorio. Para diferenciar entre logs, también puedes añadir los parámetros opcionales de `service`, `host` y `ddtags`.

   **Ejemplo**:

   ```
   http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
   ```

1. Introduce la clave de API Datadog que utilizaste para configurar el cuadro de la integración Cloudflare en Datadog.

1. Después de validar el acceso, deberías ver "Listo para enviar" en **Probar propiedad**. Haz clic en `Push` para finalizar.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cloudflare.requests.all** <br>(count) | Recuento total de solicitudes<br>_Se muestra como solicitud_ |
| **cloudflare.requests.cached** <br>(count) | Recuento de solicitudes en caché<br>_Se muestra como solicitud_ |
| **cloudflare.requests.uncached** <br>(count) | Recuento de solicitudes no almacenadas<br>_Se muestra como solicitud_ |
| **cloudflare.requests.ssl.encrypted** <br>(count) | Recuento de solicitudes encriptadas SSL<br>_Se muestra como solicitud_ |
| **cloudflare.requests.ssl.unencrypted** <br>(count) | Recuento de solicitudes no cifradas<br>_Se muestra como solicitud_ |
| **cloudflare.requests.country** <br>(count) | Recuento de solicitudes, etiquetado por código de país IATA<br>_Se muestra como solicitud_ |
| **cloudflare.requests.status** <br>(count) | Recuento de solicitudes, etiquetado por código de respuesta HTTP<br>_Se muestra como solicitud_ |
| **cloudflare.requests.content_type** <br>(count) | Recuento de solicitudes, etiquetado por tipo de contenido<br>_Se muestra como solicitud_ |
| **cloudflare.requests.ip_class** <br>(count) | Recuento de solicitudes, etiquetado por clase IP<br>_Se muestra como solicitud_ |
| **cloudflare.requests.cross_zone_sub_requests.avg** <br>(gauge) | La proporción de solicitudes que fueron iniciadas por un worker de Cloudflare en otra zona<br>_Se muestra como solicitud_ |
| **cloudflare.requests.edge_dns_response_time.avg** <br>(gauge) | Tiempo medio de respuesta dns edge en milisegundos<br>_Se muestra en milisegundos_ |
| **cloudflare.requests.edge_time_to_first_byte.avg** <br>(gauge) | Tiempo medio hasta el primer byte en milisegundos<br>_Se muestra en milisegundos_ |
| **cloudflare.requests.origin_response_duration.avg** <br>(gauge) | La media de originResponseDuration en milisegundos excluyendo los valores 0 (es decir, los almacenados en caché)<br>_Se muestra en milisegundos_ |
| **cloudflare.bandwidth.all** <br>(count) | Ancho de banda total<br>_Se muestra como byte_ |
| **cloudflare.bandwidth.cached** <br>(count) | Ancho de banda en caché<br>_Se muestra como byte_ |
| **cloudflare.bandwidth.uncached** <br>(count) | Ancho de banda sin caché<br>_Se muestra como byte_ |
| **cloudflare.bandwidth.ssl.encrypted** <br>(count) | Ancho de banda cifrado SSL<br>_Se muestra como byte_ |
| **cloudflare.bandwidth.ssl.unencrypted** <br>(count) | Ancho de banda sin cifrar<br>_Se muestra como byte_ |
| **cloudflare.bandwidth.country** <br>(count) | Ancho de banda etiquetado por código de país IATA<br>_Se muestra como byte_ |
| **cloudflare.bandwidth.content_type** <br>(count) | Ancho de banda etiquetado por tipo de contenido<br>_Se muestra como byte_ |
| **cloudflare.threats.all** <br>(count) | Total de amenazas<br>_Se muestra como operación_ |
| **cloudflare.threats.type** <br>(count) | Amenazas etiquetadas por tipo<br>_Se muestra como operación_ |
| **cloudflare.threats.country** <br>(count) | Amenazas etiquetadas con el código de país de la IATA<br>_Se muestra como operación_ |
| **cloudflare.pageviews.all** <br>(count) | Total de vistas de la página<br>_Se muestra como página_ |
| **cloudflare.pageviews.search_engine** <br>(count) | Vistas de la página etiquetadas por motor de búsqueda<br>_Se muestra como página_ |
| **cloudflare.uniques.all** <br>(count) | Recuento de visitantes únicos<br>_Se muestra como conexión_ |
| **cloudflare.dns.query.all** <br>(count) | Recuento de consultas DNS<br>_Se muestra como solicitud_ |
| **cloudflare.dns.query.uncached** <br>(count) | Recuento de consultas DNS no almacenadas<br>_Se muestra como solicitud_ |
| **cloudflare.dns.query.stale** <br>(count) | Recuento de consultas DNS antiguas<br>_Se muestra como solicitud_ |
| **cloudflare.dns.response_time.avg** <br>(gauge) | Tiempo medio de respuesta a una consulta DNS<br>_Se muestra en milisegundos_ |
| **cloudflare.dns.response_time.median** <br>(gauge) | Tiempo medio de respuesta de una consulta DNS<br>_Se muestra en milisegundos_ |
| **cloudflare.dns.response_time.90p** <br>(gauge) | Tiempo de respuesta de la consulta DNS al percentil 90<br>_Se muestra en milisegundos_ |
| **cloudflare.dns.response_time.99p** <br>(gauge) | Tiempo de respuesta de la consulta DNS al percentil 99<br>_Se muestra en milisegundos_ |
| **cloudflare.workers.requests.all** <br>(count) | El recuento de solicitudes al script del worker (las métricas pueden no mostrarse sin permisos de clave de API activados)<br>_Se muestra como solicitud_ |
| **cloudflare.workers.requests.errors** <br>(count) | El recuento de errores para el script del worker (las métricas pueden no mostrarse sin permisos de clave de API habilitados)<br>_Se muestra como solicitud_ |
| **cloudflare.workers.requests.subrequests** <br>(count) | El recuento de subsolicitudes al script del worker (las métricas pueden no mostrarse sin permisos de clave de API habilitados)<br>_Se muestra como solicitud_ |
| **cloudflare.workers.response_time.75p** <br>(gauge) | El tiempo de respuesta del worker al percentil 75 (es posible que las métricas no se muestren sin permisos de clave de API activados)<br>_Se muestra en microsegundos_ |
| **cloudflare.workers.response_time.99p** <br>(gauge) | El tiempo de respuesta del worker al percentil 99 (es posible que las métricas no se muestren sin permisos de clave de API activados)<br>_Se muestra en microsegundos_ |
| **cloudflare.load_balancer.pool.round_trip_time.average** <br>(gauge) | El tiempo medio de ida y vuelta para llegar al grupo de equilibradores de carga<br>_Se muestra en milisegundos_ |
| **cloudflare.load_balancer.pool.health.status** <br>(count) | El estado del equilibrador de carga<br>_Se muestra como solicitud_ |

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

### Checks de servicio

La integración Cloudflare no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).
