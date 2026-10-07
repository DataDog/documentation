---
aliases:
- /es/integrations/google_cloud_pubsub
app_id: google-cloud-pubsub
categories:
- nube
- google cloud
- recopilación de logs
- colas de mensajes
custom_kind: integración
description: Una solución de middleware empresarial orientada a mensajes escalable,
  flexible y fiable en Google Cloud.
media: []
title: Google Cloud Pubsub
---
## Información general

Google Cloud Pub/Sub lleva a la nube la escalabilidad, la flexibilidad y la fiabilidad del middleware empresarial dirigido a mensajes.

Obtén métricas de Google Pub/Sub para:

- Visualizar el rendimiento de tus temas y suscripciones Pub/Sub.
- Correlacionar el rendimiento de tus temas y suscripciones Pub/Sub con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

#### Configuración

Para recopilar etiquetas Pub/Sub personalizadas como tags (etiquetas), habilita el permiso de inventario de activos en la nube en la cuenta de servicio de Datadog en Google Cloud.

### Recopilación de logs

Los logs de Google Cloud Pub/Sub se recopilan con Google Cloud Logging y se envían a un job (generic) de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Pub/Sub de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [page (página) de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google Cloud Pub/Sub.

1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.

1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporta logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.pubsub.snapshot.backlog_bytes** <br>(gauge) | Tamaño total en bytes de los mensajes retenidos en una instantánea.<br>_Mostrado como byte_ |
| **gcp.pubsub.snapshot.backlog_bytes_by_region** <br>(gauge) | Tamaño total en bytes de los mensajes conservados en una instantánea, desglosado por región de la nube.<br>_Mostrado como byte_ |
| **gcp.pubsub.snapshot.config_updates_count** <br>(count) | Count acumulado de cambios de configuración, agrupados por tipo de operación y resultado.<br>_Mostrado como actualización_ |
| **gcp.pubsub.snapshot.num_messages** <br>(gauge) | Número de mensajes conservados en una instantánea.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.snapshot.num_messages_by_region** <br>(gauge) | Número de mensajes retenidos en una instantánea, desglosados por región de la nube.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.snapshot.oldest_message_age** <br>(gauge) | Antigüedad (en segundos) del mensaje más antiguo conservado en una instantánea.<br>_Mostrado como segundo_ |
| **gcp.pubsub.snapshot.oldest_message_age_by_region** <br>(gauge) | Antigüedad (en segundos) del mensaje más antiguo conservado en una instantánea, desglosado por región de la nube.<br>_Mostrado como segundo_ |
| **gcp.pubsub.subscription.ack_latencies.avg** <br>(gauge) | Media de latencias acuse de recibo.<br>_Mostrado como milisegundo_ |
| **gcp.pubsub.subscription.ack_latencies.samplecount** <br>(count) | Count de ejemplos para latencias de acuse de recibo.<br>_Mostrado como milisegundo_ |
| **gcp.pubsub.subscription.ack_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado para latencias de acuse de recibo.<br>_Mostrado como milisegundo_ |
| **gcp.pubsub.subscription.ack_message_count** <br>(count) | Count acumulado de mensajes con acuse de recibo por solicitudes de acuse de recibo, agrupados por tipo de entrega.<br>_Mostrado como byte_ |
| **gcp.pubsub.subscription.backlog_bytes** <br>(gauge) | Tamaño total en bytes de los mensajes sin acuse de recibo (también denominados mensajes de trabajo pendiente) en una suscripción.<br>_Mostrado como byte_ |
| **gcp.pubsub.subscription.billable_bytes_by_region** <br>(gauge) | Tamaño total en bytes de los mensajes facturables en una suscripción, desglosado por región y tipo de Nube. Consulta <a href=https://cloud.google.com/pubsub/pricing#storage_costs>los precios de la page (página) de Pub/Sub</a> para obtener más información sobre los precios por retener mensajes no confirmados en las suscripciones durante más de 24 horas.<br>_Mostrado como byte_ |
| **gcp.pubsub.subscription.byte_cost** <br>(count) | Costo de las operaciones por suscripción medida.<br>_Mostrado como byte_ |
| **gcp.pubsub.subscription.config_updates_count** <br>(count) | Número de cambios de configuración para las suscripciones.<br>_Mostrado como ocurrencia_ |
| **gcp.pubsub.subscription.dead_letter_message_count** <br>(count) | Count acumulado de mensajes publicados en el tema de los mensajes fallidos.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.delivery_latency_health_score** <br>(gauge) | Puntuación que mide el estado de una suscripción.<br>_Mostrado como ocurrencia_ |
| **gcp.pubsub.subscription.exactly_once_warning_count** <br>(count) | Count de instancias (acuses de recibo y de modificaciones de acuse de recibo que pueden haber fallado) que pueden dar lugar a reenvíos de mensajes.<br>_Mostrado como ocurrencia_ |
| **gcp.pubsub.subscription.expired_ack_deadlines_count** <br>(count) | Count acumulado de mensajes cuyo plazo de acuse de recibo expiró mientras el mensaje estaba pendiente para un cliente suscriptor.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.export_push_subscription_details** <br>(gauge) | Tipo y estado de la suscripción push de exportación.|
| **gcp.pubsub.subscription.mod_ack_deadline_message_count** <br>(count) | Count acumulado de mensajes cuya fecha límite se actualizó mediante solicitudes de modificación de vencimiento de acuse de recibo.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.mod_ack_deadline_request_count** <br>(count) | Número de solicitudes modificación de vencimiento de acuse de recibo.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.subscription.mod_ack_latencies.avg** <br>(count) | La distribución media de las latencias de modificación de acuse de recibo. Para cada intento de entrega de mensaje, la latencia de modificación de acuse de recibo es la duración entre el momento en que el servicio CPS entrega el mensaje a un cliente suscriptor y el momento en que el servicio CPS recibe una solicitud de modificación de acuse de recibo para ese mensaje.<br>_Mostrado como milisegundo_. |
| **gcp.pubsub.subscription.mod_ack_latencies.samplecount** <br>(count) | El count de ejemplos para la distribución de latencias de modificación de acuse de recibo. Para cada intento de entrega de mensaje, la latencia de modificación de acuse de recibo es la duración entre el momento en que el servicio CPS entrega el mensaje a un cliente suscriptor y el momento en que el servicio CPS recibe una solicitud de modificación de acuse de recibo para ese mensaje.<br>_Mostrado como milisegundo_. |
| **gcp.pubsub.subscription.mod_ack_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de las latencias de modificación de acuse de recibo. Para cada intento de entrega de mensaje, la latencia de modificación de acuse de recibo es la duración entre el momento en que el servicio CPS entrega el mensaje a un cliente suscriptor y el momento en que el servicio CPS recibe una solicitud de modificación de acuse de recibo para ese mensaje.<br>_Mostrado como milisegundo_. |
| **gcp.pubsub.subscription.nack_requests** <br>(gauge) | Count acumulado de mensajes sin acuse de recibo. Un mensaje sin acuse de recibo varias veces se contará varias veces.|
| **gcp.pubsub.subscription.num_outstanding_messages** <br>(gauge) | Mensajes entregados pero aún sin acuse de recibo.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.num_retained_acked_messages** <br>(gauge) | Número de mensajes con acuse de recibo retenidos en una suscripción.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.num_retained_acked_messages_by_region** <br>(gauge) | Número de mensajes con acuse de recibo retenidos en una suscripción, desglosados por región de la nube.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.num_unacked_messages_by_region** <br>(gauge) | Número de mensajes sin acuse de recibo en una suscripción, desglosados por región de la nube.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.num_undelivered_messages** <br>(gauge) | Número de mensajes sin acuse de recibo (también denominados mensajes de trabajo pendiente) en una suscripción.|
| **gcp.pubsub.subscription.oldest_retained_acked_message_age** <br>(gauge) | Antigüedad (en segundos) del mensaje con acuse de recibo más antiguo conservado en una suscripción.<br>_Mostrado como segundo_ |
| **gcp.pubsub.subscription.oldest_retained_acked_message_age_by_region** <br>(gauge) | Antigüedad (en segundos) del mensaje con acuse de recibo más antiguo retenido en una suscripción, desglosado por región de la nube.<br>_Mostrado como segundo_ |
| **gcp.pubsub.subscription.oldest_unacked_message_age** <br>(gauge) | Antgüedad (en segundos) del mensaje sin acuse de recibo más antiguo (también denominado mensaje de trabajo pendiente) en una suscripción.<br>_Mostrado como segundo_ |
| **gcp.pubsub.subscription.oldest_unacked_message_age_by_region** <br>(gauge) | Antigüedad (en segundos) del mensaje sin acuse de recibo más antiguo de una suscripción, desglosado por región de la nube.<br>_Mostrado como segundo_ |
| **gcp.pubsub.subscription.open_streaming_pulls** <br>(gauge) | Número de secuencias StreamingPull abiertas por suscripción, agrupadas por estado.|
| **gcp.pubsub.subscription.pull_ack_request_count** <br>(count) | Count delta de solicitudes de acuse de recibo de envío de mensajes.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.subscription.pull_request_count** <br>(count) | Número de solicitudes de extracción de mensajes.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.subscription.push_request_count** <br>(count) | Número de intentos de envío de mensajes.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.subscription.push_request_latencies.avg** <br>(gauge) | Media de las latencias de las solicitudes push.<br>_Mostrado como microsegundo_ |
| **gcp.pubsub.subscription.push_request_latencies.samplecount** <br>(count) | Count de ejemplos para latencias de solicitudes push.<br>_Mostrado como microsegundo_ |
| **gcp.pubsub.subscription.push_request_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de las latencias de las solicitudes push.<br>_Mostrado como microsegundo_ |
| **gcp.pubsub.subscription.retained_acked_bytes** <br>(gauge) | Tamaño total en bytes de los mensajes con acuse de recibo retenidos en una suscripción.<br>_Mostrado como byte_ |
| **gcp.pubsub.subscription.retained_acked_bytes_by_region** <br>(gauge) | Tamaño total en bytes de los mensajes con acuse de recibo retenidos en una suscripción, desglosado por región de nube.<br>_Mostrado como bytes_ |
| **gcp.pubsub.subscription.seek_request_count** <br>(count) | Count acumulado de intentos de búsqueda, agrupados por resultado.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.subscription.sent_message_count** <br>(count) | Count acumulado de mensajes enviados por Cloud Pub/Sub a los clientes suscriptores.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.subscription.streaming_pull_ack_request_count** <br>(count) | Count acumulad de solicitudes de envío de streaming con ID de acuse de recibo no vacíos, agrupadas por resultado.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.subscription.streaming_pull_mod_ack_deadline_request_count** <br>(count) | Count acumulado de solicitudes de envío con campos de modificación de vencimiento de acuse de recibo no vacíos, agrupadas por resultado.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.subscription.streaming_pull_response_count** <br>(count) | Count acumulado de respuestas de envío de streaming, agrupadas por resultado.<br>_Mostrado como respuesta_ |
| **gcp.pubsub.subscription.unacked_bytes_by_region** <br>(gauge) | Tamaño total en bytes de los mensajes sin acuse de recibo en una suscripción, desglosado por región de la nube.<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.byte_cost** <br>(count) | Costo en bytes de las operaciones por tema.<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.config_updates_count** <br>(count) | Número de cambios de configuración para los temas.<br>_Mostrado como ocurrencia_ |
| **gcp.pubsub.topic.ingestion_byte_count** <br>(count) | Count de bytes de mensajes ingeridos por tipo de source (fuente) de ingesta y partición de importación (por ejemplo, ID de partición de AWS Kinesis).<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.ingestion_data_source_state** <br>(gauge) | Estado de los datos de source (fuente) de ingesta por tipo source (fuente) de ingesta.|
| **gcp.pubsub.topic.ingestion_failure_count** <br>(count) | Número de errores encontrados al ingerir datos por tipo de source (fuente) de ingesta, nombre de source (fuente), partición de importación y motivo del error.|
| **gcp.pubsub.topic.ingestion_message_count** <br>(count) | Número de mensajes ingeridos por tipo de source (fuente) de ingesta y partición de importación (por ejemplo, ID de partición de AWS Kinesis).|
| **gcp.pubsub.topic.message_sizes.avg** <br>(gauge) | Media de los tamaños de los mensajes publicados.<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.message_sizes.samplecount** <br>(count) | Count de ejemplos de tamaños de mensajes publicados.<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.message_sizes.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de tamaños de mensajes publicados.<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.num_retained_acked_messages_by_region** <br>(gauge) | Número de mensajes con acuse de recibo retenidos en un tema, desglosados por región de la nube.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.topic.num_retained_messages** <br>(gauge) | Número de mensajes retenidos en un tema.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.topic.num_unacked_messages_by_region** <br>(gauge) | Número de mensajes sin acuse de recibo en un tema, desglosados por región de la nube.<br>_Mostrado como mensaje_ |
| **gcp.pubsub.topic.oldest_retained_acked_message_age_by_region** <br>(gauge) | Antigüedad (en segundos) del mensaje con acuse de recibo más antiguo retenido en un tema, desglosado por región de la nube.<br>_Mostrado como segundo_ |
| **gcp.pubsub.topic.oldest_retained_message_age** <br>(gauge) | Antigüedad (en segundos) del mensaje más antiguo conservado en un tema.<br>_Mostrado como segundo_ |
| **gcp.pubsub.topic.oldest_unacked_message_age_by_region** <br>(gauge) | Antigüedad (en segundos) del mensaje sin acuse de recibo más antiguo de un tema, desglosado por región de la nube.<br>_Mostrado como segundo_ |
| **gcp.pubsub.topic.retained_acked_bytes_by_region** <br>(gauge) | Tamaño total en bytes de los mensajes con acuse de recibo retenidos en un tema, desglosado por región de la nube.<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.retained_bytes** <br>(gauge) | Tamaño total en bytes de los mensajes retenidos en un tema.<br>_Mostrado como byte_ |
| **gcp.pubsub.topic.schema_validation_latencies.avg** <br>(count) | La distribución media de las latencias de validación de esquemas en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.pubsub.topic.schema_validation_latencies.samplecount** <br>(count) | El recuento de ejemplos para la distribución de las latencias de validación del esquema en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.pubsub.topic.schema_validation_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de las latencias de validación del esquema en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.pubsub.topic.send_request_count** <br>(count) | Número de solicitudes de envío de mensajes.<br>_Mostrado como solicitud_ |
| **gcp.pubsub.topic.send_request_latencies.avg** <br>(gauge) | Media de las latencias de las solicitudes de envío de temas.<br>_Mostrado microsegundo_ |
| **gcp.pubsub.topic.send_request_latencies.samplecount** <br>(count) | Count de ejemplos para latencias de solicitud de envío de temas.<br>_Mostrado como microsegundo_ |
| **gcp.pubsub.topic.send_request_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado para las latencias de solicitud de envío de temas.<br>_Mostrado como microsegundo_. |
| **gcp.pubsub.topic.unacked_bytes_by_region** <br>(gauge) | Tamaño total en bytes de los mensajes con acuse de recibo en un tema, desglosado por región de la nube.<br>_Mostrado como byte_ |

### Eventos

La integración Google Cloud Pub/Sub no incluye eventos.

### Checks de servicio

La integración Google Cloud Pub/Sub no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).