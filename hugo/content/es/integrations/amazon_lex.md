---
app_id: amazon_lex
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Lex.
title: Amazon Lex
---
## Información general

Amazon Lex es un servicio para crear interfaces conversacionales en aplicaciones que utilizan voz y texto.

Habilita esta integración para ver todas tus métricas de Lex en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [page (página) de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Lex` esté activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Lex](https://app.datadoghq.com/integrations/amazon-lex).

### Recopilación de logs

#### Activar logging

Configura Amazon Lex para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_lex` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Datadog Forwarder Lambda](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon Lex en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el grupo de logs de CloudWatch](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.lex.assisted_slot_resolution_model_access_denied_error_count** <br>(count) | El número de veces que se denegó el acceso de Amazon Lex V2 a Amazon Bedrock.<br>_Mostrado como error_. |
| **aws.lex.assisted_slot_resolution_model_invocation_count** <br>(count) | El número de veces que se invocó a Amazon Bedrock.<br>_Mostrado como invocación_. |
| **aws.lex.assisted_slot_resolution_model_system_error_count** <br>(count) | El número de veces que se produjo un 5xx al llamar a Amazon Bedrock.<br>_Mostrado como error_ |
| **aws.lex.assisted_slot_resolution_model_throttling_error_count** <br>(count) | El número de veces que Amazon Bedrock limiitó Amazon Lex.<br>_Mostrado como limitación_ |
| **aws.lex.assisted_slot_resolution_resolved_slot_count** <br>(count) | El número de veces que Amazon Bedrock devolvió un valor de ranura.<br>_Mostrado como evento_ |
| **aws.lex.bot_channel_auth_errors** <br>(count) | El número de errores de autenticación devueltos por el canal de mensajería en el periodo de tiempo especificado.<br>_Mostrado como error_ |
| **aws.lex.bot_channel_configuration_errors** <br>(count) | El número de errores de configuración en el período especificado.<br>_Mostrado como error_ |
| **aws.lex.bot_channel_inbound_throttled_events** <br>(count) | El número de veces que Amazon Lex limitó los mensajes enviados por el canal de mensajería en el periodo especificado.<br>_Mostrado como limitación_ |
| **aws.lex.bot_channel_outbound_throttled_events** <br>(count) | El número de veces que se limitaron los eventos salientes de Amazon Lex al canal de mensajería en el periodo de tiempo especificado.<br>_Mostrado como limitación_ |
| **aws.lex.bot_channel_request_count** <br>(count) | El número de solicitudes realizadas en un canal en el periodo de tiempo especificado.<br>_Mostrado como solicitud_ |
| **aws.lex.bot_channel_response_card_errors** <br>(count) | El número de veces que Amazon Lex no pudo publicar tarjetas de respuesta en el periodo especificado.<br>_Mostrado como error_ |
| **aws.lex.bot_channel_system_errors** <br>(count) | El número de errores internos que se produjeron en Amazon Lex para un canal en el periodo especificado.<br>_Mostrado como error_ |
| **aws.lex.conversation_logs_audio_delivery_failure** <br>(count) | El número de logs de audio que no se pudieron entregar al bucket de S3 en el período de tiempo especificado.<br>_Mostrado como evento_ |
| **aws.lex.conversation_logs_audio_delivery_success** <br>(count) | El número de audio logs entregado con éxito al bucket de S3 en el período de tiempo especificado.<br>_Mostrado como evento_ |
| **aws.lex.conversation_logs_text_delivery_failure** <br>(count) | El número de logs de texto que no se pudieron entregar a CloudWatch Logs en el período de tiempo especificado.<br>_Mostrado como evento_ |
| **aws.lex.conversation_logs_text_delivery_success** <br>(count) | El número de logs de texto entregados con éxito a CloudWatch Logs en el período de tiempo especificado.<br>_Mostrado como evento_ |
| **aws.lex.missed_utterance_count** <br>(count) | El número de enunciados no reconocidos en el periodo especificado.<br>_Mostrado como evento_ |
| **aws.lex.runtime_concurrency** <br>(gauge) | El número de conexiones concurrentes en el periodo de tiempo especificado.<br>_Mostrado como connection (conexión)_ |
| **aws.lex.runtime_invalid_lambda_responses** <br>(count) | El número de respuestas inválidas de AWS Lambda en el periodo especificado.<br>_Mostrado como respuesta_ |
| **aws.lex.runtime_kendra_index_access_error** <br>(count) | El número de veces que Amazon Lex V2 no pudo acceder a tu índice de Amazon Kendra.<br>_Mostrado como error_ |
| **aws.lex.runtime_kendra_latency** <br>(gauge) | La cantidad de tiempo que tarda Amazon Kendra en responder a una solicitud de la AMAZON.KendraSearchIntent.<br>_Mostrado como milisegundo_. |
| **aws.lex.runtime_kendra_success** <br>(count) | El número de solicitudes realizadas con éxito desde AMAZON.KendraSearchIntent a tu índice de Amazon Kendra.<br>_Mostrado como solicitud_ |
| **aws.lex.runtime_kendra_system_errors** <br>(count) | El número de veces que Amazon Lex V2 no pudo consultar el índice de Amazon Kendra.<br>_Mostrado como error_ |
| **aws.lex.runtime_kendra_throttled_events** <br>(count) | El número de veces que Amazon Kendra limitó las solicitudes de AMAZON.KendraSearchIntent.<br>_Mostrado como limitación_. |
| **aws.lex.runtime_lambda_errors** <br>(count) | El número de errores de ejecución de AWS Lambda en el período de tiempo especificado.<br>_Mostrado como error_ |
| **aws.lex.runtime_polly_errors** <br>(count) | El número de respuestas inválidas de Amazon Polly en el periodo de tiempo especificado.<br>_Mostrado como error_. |
| **aws.lex.runtime_request_count** <br>(count) | El número de solicitudes de tiempo de ejecución en el período de tiempo especificado.<br>_Mostrado como solicitud_ |
| **aws.lex.runtime_request_length** <br>(gauge) | Duración total de una conversación con un bot de Amazon Lex V2. Solo aplicable a la operación StartConversation.<br>_Mostrado como milisegundo_. |
| **aws.lex.runtime_successful_request_latency** <br>(gauge) | La latencia de las solicitudes correctas entre el momento en que se realiza la solicitud y se devuelve la respuesta.<br>_Mostrado en milisegundos_ |
| **aws.lex.runtime_system_errors** <br>(count) | El número de errores del sistema en el periodo especificado.<br>_Mostrado como error_ |
| **aws.lex.runtime_throttled_events** <br>(count) | El número de solicitudes limitadas. Amazon Lex limita una solicitud cuando recibe más solicitudes que el límite de transacciones por segundo establecido para tu cuenta.<br>_Mostrado como limitación_. |
| **aws.lex.runtime_user_errors** <br>(count) | El número de errores de usuario en el período especificado.<br>_Mostrado como error_ |

### Eventos

La integración de Amazon Lex no incluye ningún evento.

### Checks de servicio

La integración de Amazon Lex no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).