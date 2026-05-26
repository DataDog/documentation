---
aliases:
- /es/integrations/google_cloud_firebase
app_id: google-cloud-firebase
categories:
- nube
- google cloud
- recopilación de logs
- móvil
custom_kind: integración
description: Firebase es una plataforma móvil que te ayuda a desarrollar aplicaciones
  rápidamente.
media: []
title: Google Cloud Firebase
---
## Información general

Firebase es una plataforma móvil que te ayuda a desarrollar rápidamente aplicaciones de alta calidad, a hacer crecer tu base de usuarios y a ganar más dinero.

Obtén métricas de Google Firebase para:

- Visualizar el rendimiento de tus bases de datos y tus servicios de alojamiento Firebase.
- Correlacionar el rendimiento de tus herramientas Firebase con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Firebase se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Firebase desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Firebase.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.firebaseappcheck.resources.verification_count** <br>(count) | Verificaciones realizadas por un servicio de integración para un recurso de destino.|
| **gcp.firebaseappcheck.services.verification_count** <br>(count) | Verificaciones realizadas por un servicio integrador.|
| **gcp.firebaseauth.phone_auth.phone_verification_count** <br>(count) | Recuento detallado de la verificación telefónica.|
| **gcp.firebasedatabase.io.database_load** <br>(gauge) | Porcentaje de carga de la base de datos de E/S agrupada por tipo.<br>_Se muestra como porcentaje_ |
| **gcp.firebasedatabase.io.persisted_bytes_count** <br>(count) | Bytes de datos persistentes en disco.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.io.sent_responses_count** <br>(count) | Número de respuestas enviadas o transmitidas a los clientes.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.io.utilization** <br>(gauge) | Porcentaje de uso de E/S.<br>_Se muestra como porcentaje_ |
| **gcp.firebasedatabase.network.active_connections** <br>(gauge) | Número de conexiones pendientes.<br>_Se muestra como conexión_ |
| **gcp.firebasedatabase.network.api_hits_count** <br>(count) | Número de aciertos en tu base de datos agrupados por tipo.|
| **gcp.firebasedatabase.network.broadcast_load** <br>(gauge) | Uso del tiempo necesario para preparar y enviar transmisiones a los clientes.|
| **gcp.firebasedatabase.network.disabled_for_overages** <br>(gauge) | Indica si la base de datos Firebase ha sido desactivada por excesos en la red.|
| **gcp.firebasedatabase.network.https_requests_count** <br>(count) | Número de solicitudes HTTPS recibidas.|
| **gcp.firebasedatabase.network.monthly_sent** <br>(gauge) | Total de bytes salientes enviados agregados y restablecidos mensualmente.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.network.monthly_sent_limit** <br>(gauge) | Límite de red mensual para la base de datos Firebase.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.network.sent_bytes_count** <br>(count) | Uso de ancho de banda saliente para la base de datos Firebase.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.network.sent_payload_and_protocol_bytes_count** <br>(count) | Uso de ancho de banda saliente sin sobrecarga de cifrado.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.network.sent_payload_bytes_count** <br>(count) | Uso de ancho de banda saliente sin cifrado ni protocolo.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.rules.evaluation_count** <br>(count) | Número de evaluaciones de reglas de seguridad de bases de datos en tiempo real de Firebase realizadas.|
| **gcp.firebasedatabase.storage.disabled_for_overages** <br>(gauge) | Indica si la base de datos Firebase ha sido desactivada por exceso de almacenamiento.|
| **gcp.firebasedatabase.storage.limit** <br>(gauge) | Límite de almacenamiento para la base de datos Firebase.<br>_Se muestra en bytes_ |
| **gcp.firebasedatabase.storage.total_bytes** <br>(gauge) | Tamaño total del almacenamiento de la base de datos Firebase.<br>_Se muestra en bytes_ |
| **gcp.firebasedataconnect.connector.datasource_latencies.avg** <br>(count) | Media de la latencia de las fuentes de datos consultadas por la operación predefinida ejecutada por el conector.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.connector.datasource_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia de las fuentes de datos consultadas por la operación predefinida ejecutada por el conector.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.connector.datasource_latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la latencia de las fuentes de datos consultadas por la operación predefinida ejecutada por el conector.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.connector.datasource_request_bytes_count** <br>(count) | Número de bytes enviados a la fuente de datos consultada por la operación predefinida ejecutada por el conector.<br>_Se muestra en bytes_ |
| **gcp.firebasedataconnect.connector.datasource_response_bytes_count** <br>(count) | Número de bytes devueltos por la fuente de datos consultada por la operación predefinida ejecutada por el conector.<br>_Se muestra en bytes_ |
| **gcp.firebasedataconnect.connector.network.sent_bytes_count** <br>(count) | Número de bytes transferidos por el conector.<br>_Se muestra en bytes_ |
| **gcp.firebasedataconnect.connector.operation_count** <br>(count) | Número de operaciones predefinidas ejecutadas por el conector.|
| **gcp.firebasedataconnect.connector.operation_latencies.avg** <br>(count) | Media de la latencia de las operaciones predefinidas ejecutadas por el conector.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.connector.operation_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia de las operaciones predefinidas ejecutadas por el conector.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.connector.operation_latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la latencia de las operaciones predefinidas ejecutadas por el conector.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.service.datasource_latencies.avg** <br>(count) | Media de la latencia de las fuentes de datos consultadas por por operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.service.datasource_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia de las fuentes de datos consultadas por operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.service.datasource_latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la latencia de las fuentes de datos consultadas por operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.service.datasource_request_bytes_count** <br>(count) | Número de bytes enviados a la fuente de datos consultada por operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en bytes_ |
| **gcp.firebasedataconnect.service.datasource_response_bytes_count** <br>(count) | Número de bytes devueltos por las fuentes de datos consultadas por operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en bytes_ |
| **gcp.firebasedataconnect.service.network.sent_bytes_count** <br>(count) | Número de bytes transferidos por operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en bytes_ |
| **gcp.firebasedataconnect.service.operation_count** <br>(count) | Número de operaciones administrativas arbitrarias ejecutadas directamente en el servicio.|
| **gcp.firebasedataconnect.service.operation_latencies.avg** <br>(count) | Media de la latencia de las operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.service.operation_latencies.samplecount** <br>(count) | Recuento de muestras de la latencia de las operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en milisegundos_ |
| **gcp.firebasedataconnect.service.operation_latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la latencia de las operaciones administrativas arbitrarias ejecutadas directamente en el servicio.<br>_Se muestra en milisegundos_ |
| **gcp.firebaseextensions.extension.version.active_instances** <br>(gauge) | Número de instancias activas de la versión de extensión publicada.|
| **gcp.firebasehosting.network.monthly_sent** <br>(gauge) | Total de bytes salientes enviados, agregados y restablecidos mensualmente.<br>_Se muestra en bytes_ |
| **gcp.firebasehosting.network.monthly_sent_limit** <br>(gauge) | Límite de red mensual para Firebase Hosting.<br>_Se muestra en bytes_ |
| **gcp.firebasehosting.network.sent_bytes_count** <br>(count) | Uso de ancho de banda saliente para Firebase Hosting.<br>_Se muestra en bytes_ |
| **gcp.firebasehosting.storage.limit** <br>(gauge) | Límite de almacenamiento para Firebase Hosting.<br>_Se muestra en bytes_ |
| **gcp.firebasehosting.storage.total_bytes** <br>(gauge) | Tamaño del almacenamiento de Firebase Hosting.<br>_Se muestra en bytes_ |
| **gcp.firebasestorage.rules.evaluation_count** <br>(count) | Número de evaluaciones de reglas de seguridad de almacenamiento en la nube de Firebase realizadas en respuesta a solicitudes de escritura o lectura.|

### Eventos

La integración Google Firebase no incluye eventos.

### Checks de servicio

La integración Google Firebase no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).