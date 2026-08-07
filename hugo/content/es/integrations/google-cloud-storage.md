---
aliases:
- /es/integrations/google_cloud_storage
app_id: google-cloud-storage
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
custom_kind: integración
description: Almacenamiento de objetos unificado para el servicio de datos en tiempo
  real, análisis de datos, machine learning y archivo de datos.
media: []
title: Google Cloud Storage
---
## Información general

Google Cloud Storage es un servicio de almacenamiento de objetos unificado para desarrolladores y empresas, desde los datos en directo para su análisis/ML hasta el archivado de datos.

Obtén métricas de Google Storage para:

- Visualizar el rendimiento de tus servicios de almacenamiento.
- Correlacionar el rendimiento de tus servicios de almacenamiento con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

#### Configuración

Para recopilar etiquetas (labels) Cloud Storage personalizadas como etiquetas (tags), activa el permiso de inventario de recursos en la nube.

### Recopilación de logs

Los logs de Google Cloud Storage se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Storage de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Storage.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.storage.api.lro_count** <br>(count) | Recuento de operaciones de larga duración completadas, desde la última muestra.|
| **gcp.storage.api.request_count** <br>(count) | El número de llamadas a la API.<br>_Se muestra como solicitud_ |
| **gcp.storage.authn.authentication_count** <br>(count) | El número de solicitudes firmadas HMAC/RSA.<br>_Se muestra como solicitud_ |
| **gcp.storage.authz.acl_based_object_access_count** <br>(count) | Número de solicitudes en las que se ha concedido acceso a un objeto únicamente debido a las ACL de objetos.<br>_Se muestra como solicitud_ |
| **gcp.storage.authz.acl_operations_count** <br>(count) | El uso de las operaciones de ACL.<br>_Se muestra como operación_ |
| **gcp.storage.authz.object_specific_acl_mutation_count** <br>(count) | Número de cambios realizados en ACLs específicas de objeto.|
| **gcp.storage.autoclass.transition_operation_count** <br>(count) | Número total de operaciones de transición de clase de almacenamiento iniciadas por Autoclass.|
| **gcp.storage.autoclass.transitioned_bytes_count** <br>(count) | Total de bytes transitados por Autoclass.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.client.attempt.duration.avg** <br>(gauge) | La media del tiempo acumulado que se tarda en completar un intento de RPC, incluido el tiempo que se tarda en elegir un subcanal.<br>_Se muestra como segundo_ |
| **gcp.storage.client.grpc.client.attempt.duration.samplecount** <br>(gauge) | El recuento de muestras del tiempo acumulado que se tarda en completar un intento de RPC, incluido el tiempo que se tarda en elegir un subcanal.<br>_Se muestra como segundo_ |
| **gcp.storage.client.grpc.client.attempt.duration.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para el tiempo acumulado que se tarda en completar un intento de RPC, incluido el tiempo que se tarda en elegir un subcanal.<br>_Se muestra como segundo_ |
| **gcp.storage.client.grpc.client.attempt.rcvd_total_compressed_message_size.avg** <br>(count) | Promedio de bytes acumulados (comprimidos pero no cifrados) recibidos en todos los mensajes de respuesta (metadatos excluidos) por intento de RPC; no incluye gRPC ni bytes de trama de transporte.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.client.attempt.rcvd_total_compressed_message_size.samplecount** <br>(count) | El recuento de muestras para los bytes acumulados (comprimidos pero no cifrados) recibidos a través de todos los mensajes de respuesta (metadatos excluidos) por intento de RPC; no incluye gRPC ni bytes de marco de transporte.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.client.attempt.rcvd_total_compressed_message_size.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de los bytes acumulados (comprimidos pero no cifrados) recibidos en todos los mensajes de respuesta (metadatos excluidos) por intento de RPC; no incluye gRPC ni bytes de marco de transporte.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.client.attempt.sent_total_compressed_message_size.avg** <br>(count) | Promedio de bytes acumulados (comprimidos pero no cifrados) enviados a través de todos los mensajes de solicitud (metadatos excluidos) por intento de RPC; no incluye gRPC ni bytes de marco de transporte.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.client.attempt.sent_total_compressed_message_size.samplecount** <br>(count) | El recuento de muestra para los bytes acumulados (comprimidos pero no cifrados) enviados a través de todos los mensajes de solicitud (metadatos excluidos) por intento de RPC; no incluye gRPC ni bytes de marco de transporte.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.client.attempt.sent_total_compressed_message_size.sumsqdev** <br>(count) | Suma de la desviación al cuadrado de los bytes acumulados (comprimidos pero no cifrados) enviados a través de todos los mensajes de solicitud (metadatos excluidos) por intento de RPC; no incluye gRPC ni bytes de marco de transporte.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.client.attempt.started** <br>(count) | Número acumulado de intentos de RPC iniciados, incluidos los que no se han completado.|
| **gcp.storage.client.grpc.client.call.duration.avg** <br>(gauge) | La media del tiempo acumulado que tarda la biblioteca gRPC en completar una RPC desde la perspectiva de la aplicación.<br>_Se muestra como segundo_ |
| **gcp.storage.client.grpc.client.call.duration.samplecount** <br>(gauge) | El recuento de muestras para el tiempo acumulado que la biblioteca gRPC tarda en completar una RPC desde la perspectiva de la aplicación.<br>_Se muestra como segundo_ |
| **gcp.storage.client.grpc.client.call.duration.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado del tiempo acumulado que la biblioteca gRPC tarda en completar una RPC desde la perspectiva de la aplicación.<br>_Se muestra como segundo_ |
| **gcp.storage.client.grpc.lb.rls.cache_entries** <br>(gauge) | Número de entradas en la caché RLS.<br>_Se muestra como entrada_ |
| **gcp.storage.client.grpc.lb.rls.cache_size** <br>(gauge) | El tamaño actual de la caché RLS.<br>_Se muestra como byte_ |
| **gcp.storage.client.grpc.lb.rls.default_target_picks** <br>(count) | Número acumulado de picks LB enviados al objetivo por defecto.|
| **gcp.storage.client.grpc.lb.rls.failed_picks** <br>(count) | Número acumulado de picks LB fallidos debido a una solicitud RLS fallida o a que el canal RLS está siendo limitado.|
| **gcp.storage.client.grpc.lb.rls.target_picks** <br>(count) | Número acumulado de picks LB enviados a cada objetivo RLS.  Ten en cuenta que si el objetivo predeterminado también es devuelto por el servidor RLS, las RPC enviadas a ese objetivo desde la caché se contabilizan en esta métrica, no en `grpc.rls.default_target_picks`.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weight_not_yet_usable** <br>(count) | Número acumulado de endpoints de cada actualización del programador que aún no disponen de información de peso utilizable (o bien aún no se ha recibido el informe de carga, o bien se encuentra dentro del periodo de bloqueo).|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weight_stale** <br>(count) | Número acumulado de endpoints de cada actualización del programador cuyo último peso es más antiguo que el periodo de caducidad.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weights.avg** <br>(count) | La media de los recuentos de buckets acumulados. Los buckets del histograma serán rangos de peso de los endpoints. Cada bucket será un contador que se incrementa una vez por cada endpoint cuyo peso esté dentro de ese rango. Ten en cuenta que los endpoints sin pesos utilizables tendrán peso 0.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weights.samplecount** <br>(count) | El recuento de muestra de los recuentos de buckets acumulados. Los buckets del histograma serán rangos de peso de los endpoints. Cada bucket será un contador que se incrementa una vez por cada endpoint cuyo peso esté dentro de ese rango. Ten en cuenta que los endpoints sin pesos utilizables tendrán peso 0.|
| **gcp.storage.client.grpc.lb.wrr.endpoint_weights.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de los recuentos de buckets acumulados. Los buckets del histograma serán rangos de peso de los endpoints. Cada bucket será un contador que se incrementa una vez por cada endpoint cuyo peso esté dentro de ese rango. Ten en cuenta que los endpoints sin pesos utilizables tendrán peso 0.|
| **gcp.storage.client.grpc.lb.wrr.rr_fallback** <br>(count) | Número acumulado de actualizaciones del programador en las que no había suficientes endpoints con peso válido, lo que provocó que la política WRR volviera al comportamiento RR.|
| **gcp.storage.client.grpc.xds_client.connected** <br>(gauge) | Si el cliente xDS tiene o no un flujo ADS en funcionamiento hacia el servidor xDS. Para un servidor dado, esto se establecerá a 1 cuando el flujo se crea inicialmente. Se pondrá a 0 cuando tengamos un fallo de conectividad o cuando el flujo ADS falle sin ver un mensaje de respuesta, según A57. Una vez establecido a 0, se restablecerá a 1 cuando recibamos la primera respuesta en un flujo ADS.|
| **gcp.storage.client.grpc.xds_client.resource_updates_invalid** <br>(count) | Recuento acumulado de recursos recibidos que se han considerado no válidos.<br>_Se muestra como recurso_ |
| **gcp.storage.client.grpc.xds_client.resource_updates_valid** <br>(count) | Recuento acumulativo de recursos recibidos que se han considerado válidos. El contador se incrementará incluso para los recursos que no hayan cambiado.<br>_Se muestra como recurso_ |
| **gcp.storage.client.grpc.xds_client.resources** <br>(gauge) | Número de recursos xDS.<br>_Se muestra como recurso_ |
| **gcp.storage.client.grpc.xds_client.server_failure** <br>(count) | Recuento acumulativo de servidores xDS que pasan de buen estado a mal estado. Un servidor pasa a mal estado cuando tenemos un fallo de conectividad o cuando el flujo ADS falla sin ver un mensaje de respuesta, según gRFC A57.|
| **gcp.storage.network.received_bytes_count** <br>(count) | El número de bytes recibidos a través de la red.<br>_Se muestra como byte_ |
| **gcp.storage.network.sent_bytes_count** <br>(count) | El número de bytes enviados a través de la red.<br>_Se muestra como byte_ |
| **gcp.storage.quota.dualregion_google_egress_bandwidth.limit** <br>(gauge) | Límite actual de la métrica de cuota `storage.googleapis.com/dualregion_google_egress_bandwidth`.<br>_Se muestra como bit_ |
| **gcp.storage.quota.dualregion_google_egress_bandwidth.usage** <br>(count) | Utilización actual en la métrica de cuota `storage.googleapis.com/dualregion_google_egress_bandwidth`.<br>_Se muestra como bit_ |
| **gcp.storage.quota.dualregion_internet_egress_bandwidth.limit** <br>(gauge) | Límite actual de la métrica de cuota `storage.googleapis.com/dualregion_internet_egress_bandwidth`.<br>_Se muestra como bit_ |
| **gcp.storage.quota.dualregion_internet_egress_bandwidth.usage** <br>(count) | Utilización actual en la métrica de cuota `storage.googleapis.com/dualregion_internet_egress_bandwidth`.<br>_Se muestra como bit_ |
| **gcp.storage.replication.meeting_rpo** <br>(gauge) | Valor booleano que indica si los objetos cumplen o no el RPO. Para ASYNC_TURBO, el RPO es de 15 minutos; para DEFAULT, el RPO es de 12 horas.|
| **gcp.storage.replication.missing_rpo_minutes_last_30d** <br>(gauge) | Número total de minutos en los que se incumplió el objetivo de punto de recuperación (RPO), medido en los 30 días más recientes. La métrica se retrasa en `storage.googleapis.com/replication/time_since_metrics_updated`.|
| **gcp.storage.replication.object_replications_last_30d** <br>(gauge) | Número total de réplicas de objetos, medido en los últimos 30 días. La métrica puede desglosarse en función de si cada replicación de objetos cumplió o no el Objetivo de punto de recuperación (RPO). La métrica se retrasa en `storage.googleapis.com/replication/time_since_metrics_updated`.|
| **gcp.storage.replication.time_since_metrics_updated** <br>(gauge) | Segundos transcurridos desde la última vez que se calcularon las métricas de `storage.googleapis.com/replication/*`.<br>_Se muestra como segundo_ |
| **gcp.storage.replication.turbo_max_delay** <br>(gauge) | El retraso representa la edad en segundos del objeto más antiguo que no ha sido replicado. Los objetos cargados antes de este tiempo han sido replicados.<br>_Se muestra como segundo_ |
| **gcp.storage.replication.v2.object_replications_last_30d** <br>(gauge) | Número total de réplicas de objetos, medido en los últimos 30 días. La métrica puede desglosarse en función de si cada réplica de objeto cumplió o no el objetivo de diseño. La métrica se retrasa en `storage.googleapis.com/replication/v2/time_since_metrics_updated`.|
| **gcp.storage.replication.v2.time_since_metrics_updated** <br>(gauge) | Segundos transcurridos desde la última vez que se calcularon las métricas `storage.googleapis.com/replication/missing_rpo_minutes_last_30d` y `/replication/v2/object_replications_last_30d`.<br>_Se muestra como segundo_ |
| **gcp.storage.storage.object_count** <br>(gauge) | El número total de objetos por bucket.<br>_Se muestra como objeto_ |
| **gcp.storage.storage.total_byte_seconds** <br>(gauge) | El almacenamiento diario total en bytes segundos utilizados.<br>_Se muestra como segundo_ |
| **gcp.storage.storage.total_bytes** <br>(gauge) | El tamaño total de todos los objetos del bucket.<br>_Se muestra como byte_ |
| **gcp.storage.storage.v2.deleted_bytes** <br>(count) | Recuento delta de bytes eliminados por bucket, agrupados por clase de almacenamiento. Este valor se mide e informa una vez al día, y puede haber un retraso después de la medición antes de que el valor esté disponible en Datadog. En los días sin borrados, no se exporta ningún punto de datos para esta métrica.<br>_Se muestra como byte_ |
| **gcp.storage.storage.v2.total_byte_seconds** <br>(gauge) | Almacenamiento diario total en bytes*segundos utilizado por el bucket, agrupado por clase y tipo de almacenamiento, donde tipo puede ser live-object, noncurrent-object, soft-deleted-object y multipart-upload. Este valor se mide una vez al día, y puede haber un retraso después de la medición antes de que el valor esté disponible en Datadog. Una vez disponible, el valor se repite en cada intervalo de muestreo a lo largo del día.|
| **gcp.storage.storage.v2.total_bytes** <br>(gauge) | Tamaño total de todos los objetos y cargas multiparte del bucket, agrupados por clase y tipo de almacenamiento, donde el tipo puede ser live-object, noncurrent-object, soft-deleted-object y multipart-upload. Este valor se mide una vez al día, y puede haber un retraso después de la medición antes de que el valor esté disponible en Datadog. Una vez disponible, el valor se repite en cada intervalo de muestreo a lo largo del día.<br>_Se muestra como byte_ |
| **gcp.storage.storage.v2.total_count** <br>(gauge) | Número total de objetos y cargas multiparte por bucket, agrupados por clase y tipo de almacenamiento, donde el tipo puede ser live-object, noncurrent-object, soft-deleted-object y multipart-upload. Este valor se mide una vez al día, y puede haber un retraso después de la medición antes de que el valor esté disponible en Datadog. Una vez disponible, el valor se repite en cada intervalo de muestreo a lo largo del día.|

### Eventos

La integración Google Cloud Storage no incluye eventos.

### Checks de servicio

La integración Google Cloud Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).