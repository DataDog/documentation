---
app_id: fastly
categories:
- caching
- log collection
- metrics
custom_kind: integración
description: Ve las métricas clave de Fastly en contexto con el resto de tus métricas
  de Datadog.
integration_version: 1.4.1
media:
- caption: Dashboard de Fastly
  image_url: images/fastly_dashboard_1.png
  media_type: imagen
- caption: Dashboard de Fastly
  image_url: images/fastly_dashboard_2.png
  media_type: imagen
- caption: Dashboard de Fastly
  image_url: images/fastly_dashboard_3.png
  media_type: imagen
title: Fastly
---
## Información general

Conecta Fastly a Datadog para obtener visibilidad en tiempo real del rendimiento y los servicios de entrega perimetral. Utilizando la [API Real-Time Analytics de Fastly](https://www.fastly.com/documentation/reference/api/metrics-stats/realtime/), esta integración recopila métricas clave como relaciones de aciertos de caché, tasas de error, latencia de solicitudes y volumen de tráfico. También es compatible con funciones específicas de Fastly como Compute, On-the-Fly Packager, Image Optimizer y Origin Shield. Los dashboards y los monitores predefinidos te ayudan a visualizar tendencias, pivotar entre métricas y logs y crear alertas basadas en umbrales o anomalías.

Además de las métricas, Fastly admite [Streaming de logs en tiempo real](https://www.fastly.com/documentation/guides/integrations/logging-endpoints/log-streaming-datadog/) para enviar logs a nivel de solicitud, con encabezados, estados de caché y detalles de geolocalización, directamente a Datadog. Cuando se combinan con otra telemetría, los logs de Fastly proporcionan contexto para el análisis de la causa raíz, la depuración del tráfico y análisis enriquecidos. [Activa la recopilación de logs de Fastly](https://docs.datadoghq.com/integrations/fastly/#log-collection) para obtener una capacidad de observación unificada en toda tu infraestructura central y de CDN.

Por último, utiliza la [integración de Cloud Cost Management de Fastly](https://app.datadoghq.com/integrations?integrationId=fastly-cost-management) para integrar Fastly con [Cloud Cost Management de Datadog](https://www.datadoghq.com/product/cloud-cost-management/) y obtener detalles sobre el gasto total mensual, recomendaciones de optimización de recursos y monitores de cambio de costos.

## Configuración

### Instalación

No requiere pasos de instalación.

### Configuración

#### Recopilación de métricas

Crea un token de API de acceso de solo lectura en la página de gestión de tokens de Fastly, obtén tu ID de servicio del panel de control e introdúcelo en el [cuadro de integración de Fastly](https://app.datadoghq.com/account/settings#integrations/fastly).

<div class="alert alert-info">
El ServiceID es el código alfanumérico, por ejemplo: <code>5VqE6MOOy1QFJbgmCK41pY</code> (ejemplo de la <a href="https://docs.fastly.com/api/auth">Documentación de la API de Fastly</a>).
</div>

Si utilizas varios ID de servicio de una cuenta, ingresa un token de API en cada línea.

El nombre de la cuenta es una forma de organizar tus cuentas y no se usa como parte del proceso de ingesta de datos.

#### Recopilación de logs

{{< site-region region="us3" >}}

La recopilación de logs no es compatible con este sitio.

{{< /site-region >}}

{{< site-region region="us,us5,eu,gov" >}}

Configura el endpoint de Datadog para reenviar logs de Fastly a Datadog. Puedes elegir el endpoint de `Datadog` o `Datadog (via Syslog)`. Se recomienda el endpoint de `Datadog` para una entrega más confiable de logs a través de Syslog.

##### Seleccionar el endpoint de registro

1. Inicia sesión en la interfaz web de Fastly y haz clic en **Configure link** (Configurar enlace).
1. En el menú **Service** (Servicio), selecciona el servicio adecuado.
1. Haz clic en el botón **Configuration** (Configuración) y, a continuación, selecciona **Clone active** (Clonar activo). Aparecerá la página de dominios.
1. Haz clic en el enlace **Logging** (Registro). Aparecerá la página de endpoints de registro. Haz clic en **Create Endpoint** (Crear endpoint) en **Datadog** o en las opciones **Datadog (with Syslog)** (Datadog [con Syslog]).

##### Configurar el endpoint de Datadog (recomendado)

1. Asigna un nombre al endpoint, por ejemplo: `Datadog`.
1. Configura el formato de logs. En forma predeterminada, ya se proporciona el formato recomendado [formato de logs de Datadog y Fastly](https://docs.fastly.com/en/guides/log-streaming-datadog#using-the-json-logging-format) y se puede personalizar.
1. Selecciona tu región para que coincida con la región de tu cuenta de Datadog: {{< region-param key="dd_site_name" code="true" >}}
1. Añade tu [clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys).
1. Haz clic en **Create** (Crear) en la parte inferior.
1. Haz clic en **Activate** (Activar) en la parte superior derecha para activar la configuración nueva. Después de unos minutos, los logs deberían empezar a llegar a tu cuenta.

##### Configurar el endpoint de Syslog

1. Asigna un nombre al endpoint, por ejemplo: `Datadog`.

1. Configura el formato de log para incluir el formato recomendado de log de Datadog-Fastly con [tu clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys) al principio. Consulta [Uso del formato de log JSON](https://docs.fastly.com/en/guides/log-streaming-datadog#using-the-json-logging-format) en la documentación de Fastly para ver un ejemplo.

   ```text
   <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
   ```

   **Nota**: Tu clave de API de Datadog DEBE estar delante del formato de log de Datadog-Fastly para que tus logs se muestren en Datadog. Consulta [Variables útiles para log](https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log) para obtener más detalles.

1. Configura **Syslog Address** (Dirección de Syslog) en: {{< region-param key="web_integrations_endpoint" code="true" >}}

1. Configura **Port** (Puerto) en: {{< region-param key="web_integrations_port" code="true" >}}

1. Configura **TLS** en `yes`

1. Configura **TLS Hostname** (Nombre de host de TLS) en: {{< region-param key="web_integrations_endpoint" code="true" >}}

1. En la sección de opciones avanzadas, selecciona `Blank` como **formato de línea del log**

1. Por último, guarda el endpoint y despliega el servicio. Consulta los logs en tu [Explorer de logs de Datadog](https://app.datadoghq.com/logs).

{{< /site-region >}}

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **fastly.all_status_500** <br>(gauge) | Número de respuestas recibidas con el código de estado 500 (Error interno del servidor) desde el origen.<br>_Se muestra como respuesta_ |
| **fastly.all_status_501** <br>(gauge) | Número de respuestas recibidas con el código de estado 501 (No implementado) desde el origen.<br>_Se muestra como respuesta_ |
| **fastly.all_status_502** <br>(gauge) | Número de respuestas recibidas con el código de estado 502 (Puerta de enlace defectuosa) desde el origen.<br>_Se muestra como respuesta_ |
| **fastly.all_status_503** <br>(gauge) | Número de respuestas recibidas con el código de estado 503 (Servicio no disponible) desde el origen.<br>_Se muestra como respuesta_ |
| **fastly.all_status_504** <br>(gauge) | Número de respuestas recibidas con el código de estado 504 (Tiempo de espera del gateway) desde el origen.<br>_Se muestra como respuesta_ |
| **fastly.attack_blocked_req_body_bytes** <br>(gauge) | Total de bytes del cuerpo recibidos de solicitudes que activaron una regla WAF que fue bloqueada<br>_Se muestra como byte_ |
| **fastly.attack_blocked_req_header_bytes** <br>(gauge) | Total de bytes de encabezado recibidos de solicitudes que activaron una regla WAF que fue bloqueada<br>_Se muestra como byte_ |
| **fastly.attack_logged_req_body_bytes** <br>(gauge) | Total de bytes del cuerpo recibidos de solicitudes que activaron una regla WAF que se registró<br>_Se muestra como byte_ |
| **fastly.attack_logged_req_header_bytes** <br>(gauge) | Total de bytes de encabezado recibidos de solicitudes que activaron una regla WAF que se registró<br>_Se muestra como byte_ |
| **fastly.attack_passed_req_body_bytes** <br>(gauge) | Total de bytes del cuerpo recibidos de solicitudes que activaron una regla WAF que se pasó<br>_Se muestra como byte_ |
| **fastly.attack_passed_req_header_bytes** <br>(gauge) | Número total de bytes de encabezado recibidos de solicitudes que activaron una regla WAF que se pasó<br>_Se muestra como byte_ |
| **fastly.attack_req_body_bytes** <br>(gauge) | Total de bytes del cuerpo recibidos de solicitudes que activaron una regla WAF<br>_Se muestra como byte_ |
| **fastly.attack_req_header_bytes** <br>(gauge) | Total de bytes de encabezado recibidos de solicitudes que activaron una regla WAF<br>_Se muestra como byte_ |
| **fastly.attack_resp_synth_bytes** <br>(gauge) | Total de bytes entregados para solicitudes que activaron una regla WAF y devolvieron una respuesta sintética<br>_Se muestra como byte_ |
| **fastly.attack_synth** <br>(gauge) | |
| **fastly.bandwidth** <br>(gauge) | Ancho de banda enviado.<br>_Se muestra como byte_ |
| **fastly.blacklist** <br>(gauge) | |
| **fastly.body_size** <br>(gauge) | Ancho de banda del cuerpo de la solicitud enviada.<br>_Se muestra como byte_ |
| **fastly.compute_bereq_errors** <br>(gauge) | Número de errores de solicitud de backend, incluidos los tiempos de espera<br>_Se muestra como solicitud_ |
| **fastly.compute_bereqs** <br>(gauge) | Número de solicitudes de backend iniciadas<br>_Se muestra como solicitud_ |
| **fastly.compute_execution_time_ms** <br>(gauge) | Cantidad de tiempo de CPU activo utilizado para procesar tus solicitudes (en milisegundos)<br>_Se muestra en milisegundos_ |
| **fastly.compute_ram_used** <br>(gauge) | Cantidad de RAM utilizada para tu servicio por Fastly (en bytes)<br>_Se muestra como byte_ |
| **fastly.compute_request_time_ms** <br>(gauge) | Cantidad real total de tiempo utilizado para procesar tus solicitudes, incluido el tiempo de CPU activo (en milisegundos)<br>_Se muestra en milisegundos_ |
| **fastly.compute_requests** <br>(gauge) | Número total de solicitudes que Fastly ha recibido para tu servicio<br>_Se muestra como solicitud_ |
| **fastly.compute_resource_limit_exceeded** <br>(gauge) | Número de veces que un invitado ha excedido su límite de recursos, incluidos montón, stack tecnológico, globales y tiempo de espera de ejecución de código<br>_Se muestra como tiempo_ |
| **fastly.edge_hit_requests** <br>(gauge) | Número de solicitudes enviadas por los usuarios finales a Fastly que han dado lugar a un éxito en el borde<br>_Se muestra como solicitud_ |
| **fastly.edge_hit_resp_body_bytes** <br>(gauge) | Bytes de cuerpo entregados para éxitos perimetrales<br>_Se muestra como byte_ |
| **fastly.edge_hit_resp_header_bytes** <br>(gauge) | Bytes de encabezado entregados para éxitos perimetrales<br>_Se muestra como byte_ |
| **fastly.edge_miss_requests** <br>(gauge) | Número de solicitudes enviadas por los usuarios finales a Fastly que han fallado en el borde<br>_Se muestra como solicitud_. |
| **fastly.edge_miss_resp_body_bytes** <br>(gauge) | Bytes de cuerpo entregados por fallos perimetrales<br>_Se muestra como byte_ |
| **fastly.edge_miss_resp_header_bytes** <br>(gauge) | Bytes de encabezado entregados para fallos perimetrales<br>_Se muestra como byte_ |
| **fastly.edge_requests** <br>(gauge) | Número de solicitudes enviadas por los usuarios finales a Fastly<br>_Se muestra como solicitud_ |
| **fastly.edge_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo entregados desde Fastly al usuario final<br>_Se muestra como byte_ |
| **fastly.edge_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado entregados por Fastly al usuario final<br>_Se muestra como byte_ |
| **fastly.errors** <br>(gauge) | Número de errores.<br>_Se muestra como solicitud_ |
| **fastly.fanout_bereq_body_bytes** <br>(gauge) | Total de bytes del cuerpo o contenido del mensaje enviados a los backends a través de connections (conexiones) de Fanout.<br>_Se muestra como byte_ |
| **fastly.fanout_bereq_header_bytes** <br>(gauge) | Total de bytes de encabezado enviados a backends a través de connections (conexiones) de Fanout.<br>_Se muestra como byte_ |
| **fastly.fanout_beresp_body_bytes** <br>(gauge) | Total de bytes del cuerpo o contenido del mensaje recibidos de backends a través de connections (conexiones) de Fanout.<br>_Se muestra como byte_ |
| **fastly.fanout_beresp_header_bytes** <br>(gauge) | Total de bytes de encabezado recibidos de backends a través de connections (conexiones) de Fanout.<br>_Se muestra como byte_ |
| **fastly.fanout_conn_time_ms** <br>(gauge) | Duración total de las connections (conexiones) de Fanout con los usuarios finales.<br>_Se muestra en milisegundos_ |
| **fastly.fanout_recv_publishes** <br>(gauge) | Total de mensajes publicados recibidos desde el endpoint de la API de publicación.<br>_Se muestra como solicitud_ |
| **fastly.fanout_req_body_bytes** <br>(gauge) | Total de bytes del cuerpo o contenido del mensaje recibidos de usuarios finales a través de connections (conexiones) de Fanout.<br>_Se muestra como byte_ |
| **fastly.fanout_req_header_bytes** <br>(gauge) | Total de bytes de encabezado recibidos de usuarios finales a través de connections (conexiones) de Fanout.<br>_Se muestra como byte_ |
| **fastly.fanout_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo o contenido del mensaje enviados a los usuarios finales a través de connections (conexiones) de Fanout, excluido el contenido del mensaje publicado.<br>_Se muestra como byte_ |
| **fastly.fanout_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado enviados a usuarios finales a través de connectons (conexiones) de Fanout.<br>_Se muestra como byte_ |
| **fastly.fanout_send_publishes** <br>(gauge) | Total de mensajes publicados enviados a usuarios finales.<br>_Se muestra como solicitud_ |
| **fastly.header_size** <br>(gauge) | Ancho de banda del encabezado de la solicitud enviada.<br>_Se muestra como byte_ |
| **fastly.hit_ratio** <br>(gauge) | Relación entre aciertos y fallos de caché.<br>_Se muestra como porcentaje_. |
| **fastly.hits** <br>(gauge) | Número de aciertos en la caché.<br>_Se muestra como solicitud_ |
| **fastly.hits_time** <br>(gauge) | Cantidad de tiempo empleado en procesar los accesos a la caché.<br>_Se muestra como segundo_ |
| **fastly.http2** <br>(gauge) | Número de solicitudes recibidas a través de HTTP2<br>_Se muestra como solicitud_ |
| **fastly.http3** <br>(gauge) | Número de solicitudes recibidas a través de HTTP/3<br>_Se muestra como solicitud_ |
| **fastly.imgopto** <br>(gauge) | Número de respuestas procedentes del servicio Image Optimizer de Fastly<br>_Se muestra como respuesta_. |
| **fastly.imgopto_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo entregados desde el servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.imgopto_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado entregados desde el servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.imgopto_shield_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo entregados a través de un escudo del servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.imgopto_shield_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado entregados a través de un escudo del servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.imgvideo** <br>(gauge) | Número de respuestas de vídeo procedentes del servicio Image Optimizer de Fastly<br>_Se muestra como respuesta_. |
| **fastly.imgvideo_frames** <br>(gauge) | Número de fotogramas de vídeo procedentes del servicio Image Optimizer de Fastly<br>_Se muestra como respuesta_ |
| **fastly.imgvideo_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo del vídeo entregado desde el servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.imgvideo_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado de vídeo entregados desde el servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.imgvideo_shield** <br>(gauge) | Número de respuestas de vídeo entregadas a través de un escudo procedente del servicio Image Optimizer de Fastly<br>_Se muestra como respuesta_. |
| **fastly.imgvideo_shield_frames** <br>(gauge) | Número de fotogramas de vídeo entregados a través de un escudo procedente del servicio Image Optimizer de Fastly<br>_Se muestra como respuesta_ |
| **fastly.imgvideo_shield_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo del vídeo entregado a través de un escudo del servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.imgvideo_shield_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado de vídeo entregados a través de un escudo del servicio Image Optimizer de Fastly<br>_Se muestra como byte_ |
| **fastly.ipv6** <br>(gauge) | Número de solicitudes recibidas a través de IPv6<br>_Se muestra como solicitud_ |
| **fastly.log** <br>(gauge) | Número de líneas de logs enviadas|
| **fastly.log_bytes** <br>(gauge) | Bytes de logs totales enviados<br>_Se muestra como byte_ |
| **fastly.miss** <br>(gauge) | Número de fallos de caché.<br>_Se muestra como solicitud_ |
| **fastly.miss_time** <br>(gauge) | Cantidad de tiempo empleado en procesar las pérdidas de caché.<br>_Se muestra como segundo_ |
| **fastly.object_size_100k** <br>(gauge) | Número de objetos servidos que tenían un tamaño entre 10 KB y 100 KB<br>_Se muestra como objeto_ |
| **fastly.object_size_100m** <br>(gauge) | Número de objetos servidos con un tamaño comprendido entre 10 MB y 100 MB<br>_Se muestra como objeto_ |
| **fastly.object_size_10k** <br>(gauge) | Número de objetos servidos que tenían un tamaño comprendido entre 1 KB y 10 KB<br>_Se muestra como objeto_ |
| **fastly.object_size_10m** <br>(gauge) | Número de objetos servidos con un tamaño comprendido entre 1 MB y 10 MB<br>_Se muestra como objeto_ |
| **fastly.object_size_1g** <br>(gauge) | Número de objetos servidos con un tamaño comprendido entre 100 MB y 1 GB<br>_Se muestra como objeto_ |
| **fastly.object_size_1k** <br>(gauge) | Número de objetos servidos con un tamaño inferior a 1 KB<br>_Se muestra como objeto_ |
| **fastly.object_size_1m** <br>(gauge) | Número de objetos servidos con un tamaño comprendido entre 100 KB y 1 MB<br>_Se muestra como objeto_ |
| **fastly.orig_req_body_size** <br>(gauge) | Total de bytes del cuerpo enviados al origen<br>_Se muestra como byte_ |
| **fastly.orig_req_header_size** <br>(gauge) | Total de bytes de encabezado enviados al origen<br>_Se muestra como byte_ |
| **fastly.orig_resp_body_size** <br>(gauge) | Total de bytes del cuerpo enviados desde el origen<br>_Se muestra como byte_ |
| **fastly.orig_resp_header_size** <br>(gauge) | Total de bytes de encabezado enviados desde el origen<br>_Se muestra como byte_ |
| **fastly.origin_cache_fetch_resp_body_bytes** <br>(gauge) | Bytes del cuerpo recibidos del origen para contenido almacenable en caché<br>_Se muestra como byte_ |
| **fastly.origin_cache_fetch_resp_header_bytes** <br>(gauge) | Bytes de encabezado recibidos de un origen para contenido almacenable en caché<br>_Se muestra como byte_ |
| **fastly.origin_cache_fetches** <br>(gauge) | Número total de solicitudes completadas realizadas a backends (orígenes) que devolvieron contenido almacenable en caché<br>_Se muestra como solicitud_ |
| **fastly.origin_fetch_body_bytes** <br>(gauge) | Total de bytes del cuerpo de la solicitud enviados al origen<br>_Se muestra como byte_ |
| **fastly.origin_fetch_header_bytes** <br>(gauge) | Total de bytes de encabezado de solicitud enviados al origen<br>_Se muestra como byte_ |
| **fastly.origin_fetch_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo recibidos del origen<br>_Se muestra como byte_ |
| **fastly.origin_fetch_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado recibidos del origen<br>_Se muestra como byte_ |
| **fastly.origin_fetches** <br>(gauge) | Número de solicitudes enviadas al origen<br>_Se muestra como solicitud_ |
| **fastly.origin_revalidations** <br>(gauge) | Número de respuestas recibidas desde el origen con un código de estado 304 en respuesta a una solicitud Si se modifica desde o Si ninguno coincide. En situaciones normales, una revalidación implica un éxito de caché. Sin embargo, si se utiliza Image Optimizer de Fastly o una caché segmentada, se puede perder la caché<br>_Se muestra como respuesta_ |
| **fastly.otfp** <br>(gauge) | Número de respuestas procedentes del servicio On-the-Fly-Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra como respuesta_ |
| **fastly.otfp_deliver_time** <br>(gauge) | Tiempo total empleado en entregar una respuesta del servicio On-the-Fly Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra en segundos_. |
| **fastly.otfp_manifests** <br>(gauge) | Número de respuestas que eran archivos de manifiesto del servicio On-the-Fly Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra como respuesta_ |
| **fastly.otfp_resp_body_bytes** <br>(gauge) | Total de bytes de cuerpo entregados desde el servicio On-the-Fly Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra como byte_ |
| **fastly.otfp_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado entregados desde el servicio On-the-Fly Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra como byte_ |
| **fastly.otfp_shield_resp_body_bytes** <br>(gauge) | Total de bytes de cuerpo entregados a través de un escudo para el servicio On-the-Fly Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra como byte_ |
| **fastly.otfp_shield_resp_header_bytes** <br>(gauge) | Total de bytes de cabecera entregados a través de un escudo para el servicio On-the-Fly Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra como byte_ |
| **fastly.otfp_shield_time** <br>(gauge) | Tiempo total empleado en entregar una respuesta a través de un escudo del servicio On-the-Fly Packager for On Demand Streaming de Fastly para vídeo a la carta<br>_Se muestra en segundos_. |
| **fastly.pass** <br>(gauge) | Número de solicitudes pasadas por la CDN sin ser almacenadas en caché.<br>_Se muestra como solicitud_ |
| **fastly.pass_time** <br>(gauge) | Cantidad de tiempo empleado en procesar los pases de caché<br>_Se muestra como segundo_ |
| **fastly.pci** <br>(gauge) | Número de respuestas que tienen activada la marca PCI<br>_Se muestra como respuesta_ |
| **fastly.pipe** <br>(gauge) | Número de operaciones de pipelines realizadas.<br>_Se muestra como operación_ |
| **fastly.req_body_bytes** <br>(gauge) | Total de bytes del cuerpo recibidos<br>_Se muestra como byte_ |
| **fastly.req_header_bytes** <br>(gauge) | Total de bytes de encabezado recibidos<br>_Se muestra como byte_ |
| **fastly.requests** <br>(gauge) | Número de solicitudes procesadas.<br>_Se muestra como solicitud_ |
| **fastly.resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo entregados<br>_Se muestra como byte_ |
| **fastly.resp_header_bytes** <br>(gauge) | Total de bytes de encabezado entregados.<br>_Se muestra como byte_ |
| **fastly.restarts** <br>(gauge) | Número de reinicios realizados|
| **fastly.shield** <br>(gauge) | Número de solicitudes del borde al escudo POP.<br>_Se muestra como solicitud_ |
| **fastly.shield_cache_fetches** <br>(gauge) | Número total de solicitudes completadas realizadas a escudos que devolvieron contenido almacenable en caché<br>_Se muestra como solicitud_ |
| **fastly.shield_fetch_body_bytes** <br>(gauge) | Total de bytes del cuerpo de la solicitud enviados a un escudo<br>_Se muestra como byte_ |
| **fastly.shield_fetch_header_bytes** <br>(gauge) | Total de bytes de encabezado de solicitud enviados a un escudo<br>_Se muestra como byte_ |
| **fastly.shield_fetch_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo de respuesta enviados desde un escudo al borde<br>_Se muestra como byte_ |
| **fastly.shield_fetch_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado de respuesta enviados desde un escudo al borde<br>_Se muestra como byte_ |
| **fastly.shield_fetches** <br>(gauge) | Número de solicitudes realizadas de un POP Fastly a otro, como parte del blindaje<br>_Se muestra como solicitud_. |
| **fastly.shield_hit_requests** <br>(gauge) | Número de solicitudes que han dado lugar a un acierto en un escudo<br>_Se muestra como solicitud_ |
| **fastly.shield_hit_resp_body_bytes** <br>(gauge) | Bytes de cuerpo entregados por impactos de escudo<br>_Se muestra como byte_ |
| **fastly.shield_hit_resp_header_bytes** <br>(gauge) | Bytes de encabezado entregados para impactos de escudo<br>_Se muestra como byte_ |
| **fastly.shield_miss_requests** <br>(gauge) | Número de solicitudes que han fallado en un escudo<br>_Se muestra como solicitud_ |
| **fastly.shield_miss_resp_body_bytes** <br>(gauge) | Bytes del cuerpo entregados para fallos del escudo<br>_Se muestra como byte_ |
| **fastly.shield_miss_resp_header_bytes** <br>(gauge) | Bytes de encabezado entregados para fallos de escudo<br>_Se muestra como byte_ |
| **fastly.shield_resp_body_bytes** <br>(gauge) | Total de bytes del cuerpo entregados a través de un escudo<br>_Se muestra como byte_ |
| **fastly.shield_resp_header_bytes** <br>(gauge) | Total de bytes de encabezado entregados a través de un escudo<br>_Se muestra como byte_ |
| **fastly.shield_revalidations** <br>(gauge) | Número de respuestas recibidas desde el origen con un código de estado 304, en respuesta a una solicitud Si se modifica desde o Si ninguno coincide a un escudo. En situaciones normales, una revalidación implica un acierto de caché. Sin embargo, si se utiliza una caché segmentada, esto puede dar lugar a una pérdida de caché<br>_Se muestra como respuesta_ |
| **fastly.status_1xx** <br>(gauge) | Número de respuestas enviadas con un código de estado Informativo.<br>_Se muestra como respuesta_ |
| **fastly.status_200** <br>(gauge) | Número de respuestas enviadas con el código de estado 200 (Éxito).<br>_Se muestra como respuesta_ |
| **fastly.status_204** <br>(gauge) | Número de respuestas enviadas con el código de estado 204 (Sin contenido).<br>_Se muestra como respuesta_ |
| **fastly.status_2xx** <br>(gauge) | Número de respuestas enviadas con un código de estado Éxito.<br>_Se muestra como respuesta_ |
| **fastly.status_301** <br>(gauge) | Número de respuestas enviadas con el código de estado 301 (Movido permanentemente).<br>_Se muestra como respuesta_ |
| **fastly.status_302** <br>(gauge) | Número de respuestas enviadas con el código de estado 302 (Encontrado).<br>_Se muestra como respuesta_ |
| **fastly.status_304** <br>(gauge) | Número de respuestas enviadas con el código de estado 304 (No modificado).<br>_Se muestra como respuesta_ |
| **fastly.status_3xx** <br>(gauge) | Número de respuestas enviadas con un código de estado de redirección.<br>_Se muestra como respuesta_ |
| **fastly.status_400** <br>(gauge) | Número de respuestas enviadas con el código de estado 400 (Solicitud incorrecta)<br>_Se muestra como respuesta_ |
| **fastly.status_401** <br>(gauge) | Número de respuestas enviadas con el código de estado 401 (No autorizado)<br>_Se muestra como respuesta_ |
| **fastly.status_403** <br>(gauge) | Número de respuestas enviadas con el código de estado 403 (Prohibido)<br>_Se muestra como respuesta_ |
| **fastly.status_404** <br>(gauge) | Número de respuestas enviadas con el código de estado 404 (No encontrado)<br>_Se muestra como respuesta_ |
| **fastly.status_416** <br>(gauge) | Número de respuestas enviadas con el código de estado 416 (Rango no satisfecho)<br>_Se muestra como respuesta_ |
| **fastly.status_4xx** <br>(gauge) | Número de respuestas enviadas con un código de estado Error de cliente.<br>_Se muestra como respuesta_ |
| **fastly.status_500** <br>(gauge) | Número de respuestas enviadas con el código de estado 500 (Error interno del servidor)<br>_Se muestra como respuesta_ |
| **fastly.status_501** <br>(gauge) | Número de respuestas enviadas con el código de estado 501 (No implementado)<br>_Se muestra como respuesta_ |
| **fastly.status_502** <br>(gauge) | Número de respuestas enviadas con el código de estado 502 (Puerta de enlace incorrecta)<br>_Se muestra como respuesta_ |
| **fastly.status_503** <br>(gauge) | Número de respuestas enviadas con el código de estado 503 (Servicio no disponible).<br>_Se muestra como respuesta_ |
| **fastly.status_504** <br>(gauge) | Número de respuestas enviadas con el código de estado 504 (Tiempo de espera de puerta de enlace)<br>_Se muestra como respuesta_ |
| **fastly.status_505** <br>(gauge) | Número de respuestas enviadas con el código de estado 505 (Versión HTTP no admitida)<br>_Se muestra como respuesta_ |
| **fastly.status_5xx** <br>(gauge) | Número de respuestas enviadas con un código de estado Error de servidor.<br>_Se muestra como respuesta_ |
| **fastly.synth** <br>(gauge) | |
| **fastly.tls** <br>(gauge) | Número de solicitudes recibidas a través de TLS<br>_Se muestra como solicitud_ |
| **fastly.tls_v10** <br>(gauge) | Número de solicitudes recibidas a través de TLS 1.0<br>_Se muestra como solicitud_ |
| **fastly.tls_v11** <br>(gauge) | Número de solicitudes recibidas a través de TLS 1.1<br>_Se muestra como solicitud_ |
| **fastly.tls_v12** <br>(gauge) | Número de solicitudes recibidas a través de TLS 1.2<br>_Se muestra como solicitud_ |
| **fastly.tls_v13** <br>(gauge) | Número de solicitudes recibidas a través de TLS 1.3<br>_Se muestra como solicitud_ |
| **fastly.uncacheable** <br>(gauge) | Número de solicitudes que se indicó que no se pueden almacenar en caché.<br>_Se muestra como petición_ |
| **fastly.video** <br>(gauge) | Número de respuestas con segmento de vídeo o manifiesto de vídeo Tipo MIME<br>_Se muestra como respuesta_ |
| **fastly.waf_blocked** <br>(gauge) | Número de solicitudes que activaron una regla WAF y se bloquearon<br>_Se muestra como solicitud_ |
| **fastly.waf_logged** <br>(gauge) | Número de solicitudes que activaron una regla WAF y se registraron<br>_Se muestra como solicitud_ |
| **fastly.waf_passed** <br>(gauge) | Número de solicitudes que activaron una regla WAF y se pasaron<br>_Se muestra como solicitud_ |

### Eventos

La integración de Fastly no incluye eventos.

### Checks de servicio

La integración de Fastly no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitoriza el rendimiento de Fastly con Datadog](https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/)
- [Crea y administra tus cuentas de Fastly con Terraform](https://app.datadoghq.com/organization-settings/api-keys)
- [Crea y administra tus servicios Fastly con Terraform](https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log)