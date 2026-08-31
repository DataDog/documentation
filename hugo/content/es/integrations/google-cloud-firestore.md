---
aliases:
- /es/integrations/google_cloud_firestore
app_id: google-cloud-firestore
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
- móvil
custom_kind: integración
description: Base de datos flexible y escalable para el desarrollo móvil, web y de
  servidor de Firebase y Google Cloud.
media: []
title: Google Cloud Firestore
---
## Información general

Google Cloud Firestore es una base de datos flexible y escalable para el desarrollo móvil, web y de servidor de Firebase y Google Cloud Platform.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Firestore.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Firestore se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Firestore de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google Cloud Firestore.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.firestore.api.request_count** <br>(count) | Recuento de llamadas a la API de Firestore.|
| **gcp.firestore.api.request_latencies.avg** <br>(count) | Latencia media de las solicitudes de Firestore v1, Datastore v1 y Datastore v3 desde el frontend.<br>_Se muestra en segundos_ |
| **gcp.firestore.api.request_latencies.samplecount** <br>(count) | Recuento de muestras de las latencias de las solicitudes de Firestore v1, Datastore v1 y Datastore v3 de no-transmisión desde el frontend.<br>_Se muestra en segundos_ |
| **gcp.firestore.api.request_latencies.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de las latencias de las solicitudes de Firestore v1, Datastore v1 y Datastore v3 de no-transmisión desde el frontend.<br>_Se muestra en segundos_ |
| **gcp.firestore.composite_indexes_per_database** <br>(gauge) | Número actual de índices compuestos por base de datos.|
| **gcp.firestore.document.delete_count** <br>(count) | Número de documentos eliminados con éxito.|
| **gcp.firestore.document.delete_ops_count** <br>(count) | Número de documentos eliminados con éxito.|
| **gcp.firestore.document.read_count** <br>(count) | Número de lecturas de documentos correctas a partir de consultas o búsquedas.|
| **gcp.firestore.document.read_ops_count** <br>(count) | Número de lecturas de documentos correctas a partir de consultas o búsquedas.|
| **gcp.firestore.document.ttl_deletion_count** <br>(count) | Recuento total de documentos eliminados por servicios TTL.|
| **gcp.firestore.document.ttl_expiration_to_deletion_delays.avg** <br>(count) | Tiempo medio transcurrido entre la expiración de un documento con TTL y su eliminación efectiva.<br>_Se muestra en segundos_ |
| **gcp.firestore.document.ttl_expiration_to_deletion_delays.samplecount** <br>(count) | Recuento de muestras del tiempo transcurrido entre la expiración de un documento con TTL y su eliminación efectiva.<br>_Se muestra en segundos_ |
| **gcp.firestore.document.ttl_expiration_to_deletion_delays.sumsqdev** <br>(count) | Suma de la desviación al cuadrado del tiempo transcurrido entre la expiración de un documento con TTL y su eliminación efectiva.<br>_Se muestra en segundos_ |
| **gcp.firestore.document.write_count** <br>(count) | Número de escrituras de documentos realizadas con éxito.|
| **gcp.firestore.document.write_ops_count** <br>(count) | Número de escrituras de documentos realizadas con éxito.|
| **gcp.firestore.field_configurations_per_database** <br>(gauge) | Número actual de configuraciones de campo por base de datos.|
| **gcp.firestore.network.active_connections** <br>(gauge) | Número de conexiones activas. Cada cliente móvil tendrá una conexión. Cada escuchador en un SDK de administración tendrá una conexión.|
| **gcp.firestore.network.snapshot_listeners** <br>(gauge) | Número de escuchadores de snapshots registrados actualmente en todos los clientes conectados.|
| **gcp.firestore.query_stat.per_query.result_counts.avg** <br>(count) | Distribución media del número de resultados obtenidos por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.result_counts.samplecount** <br>(count) | Recuento de muestras de la distribución del número de resultados obtenidos por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.result_counts.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la distribución del número de resultados obtenidos por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.scanned_documents_counts.avg** <br>(count) | Distribución media del número de documentos analizados por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.scanned_documents_counts.samplecount** <br>(count) | Recuento de muestras de la distribución del número de documentos analizados por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.scanned_documents_counts.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la distribución del número de documentos analizados por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.scanned_index_entries_counts.avg** <br>(count) | Distribución media del número de entradas de índice analizadas por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.scanned_index_entries_counts.samplecount** <br>(count) | Recuento de muestras de la distribución del número de entradas de índice analizadas por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.query_stat.per_query.scanned_index_entries_counts.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de la distribución del número de entradas de índice analizadas por consulta. Se excluyen las consultas en tiempo real. Nota: Esta métrica sirve para observar el rendimiento. No es relevante para los cálculos de facturación. Para entender cómo contribuyen las operaciones de lectura a tu factura, utiliza `firestore.googleapis.com/document/read_ops_count`.|
| **gcp.firestore.quota.composite_indexes_per_database.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `firestore.googleapis.com/composite_indexes_per_database`.|
| **gcp.firestore.quota.composite_indexes_per_database.limit** <br>(gauge) | Límite actual de la métrica de cuota `firestore.googleapis.com/composite_indexes_per_database`.|
| **gcp.firestore.quota.composite_indexes_per_database.usage** <br>(gauge) | Uso actual de la métrica de cuota `firestore.googleapis.com/composite_indexes_per_database`.|
| **gcp.firestore.rules.evaluation_count** <br>(count) | Número de evaluaciones de reglas de seguridad de Cloud Firestore realizadas en respuesta a solicitudes de escritura (crear, actualizar, eliminar) o lectura (obtener, enumerar).|

### Eventos

La integración Google Cloud Firestore no incluye eventos.

### Checks de servicio

La integración Google Cloud Firestore no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).