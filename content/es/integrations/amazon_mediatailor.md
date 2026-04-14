---
app_id: amazon_mediatailor
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de AWS Elemental MediaTailor.
title: AWS Elemental MediaTailor
---
## Información general

AWS Elemental MediaTailor es un servicio de personalización y monetización que permite la inserción escalable de anuncios en el servidor.

Habilita esta integración para ver todas tus métricas de Elemental MediaTailor en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MediaTailor` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS Elemental MediaTailor](https://app.datadoghq.com/integrations/amazon-mediatailor).

### Recopilación de logs

#### Activar logging

Configura AWS Elemental MediaTailor para enviar logs ya sea a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mediatailor` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Elemental MediaTailor en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.mediatailor.4xx_error_count** <br>(count) | El número de errores 4xx.<br>_Se muestra como error_ |
| **aws.mediatailor.5xx_error_count** <br>(count) | El número de errores 5xx.<br>_Se muestra como error_ |
| **aws.mediatailor.ad_decision_server_ads** <br>(count) | El recuento de anuncios incluidos en las respuestas del servidor de decisiones sobre anuncios (ADS) para el periodo que se ha especificado.|
| **aws.mediatailor.ad_decision_server_duration** <br>(gauge) | La duración total en milisegundos de todos los anuncios que MediaTailor recibió de los anuncios en el periodo que se especificó.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.ad_decision_server_errors** <br>(count) | El número de respuestas no HTTP con código de estado 200, respuestas vacías y respuestas fuera de tiempo que MediaTailor recibió del anuncio en el periodo que se especificó.<br>_Se muestra como error_ |
| **aws.mediatailor.ad_decision_server_fill_rate** <br>(gauge) | La media simple de los porcentajes en que las respuestas del anuncio llenan los tiempos disponibles para el anuncio correspondiente.<br>_Se muestra en porcentaje_ |
| **aws.mediatailor.ad_decision_server_latency** <br>(gauge) | El tiempo de respuesta en milisegundos de las solicitudes realizadas por MediaTailor al anuncio.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.ad_decision_server_timeouts** <br>(count) | El número de solicitudes de tiempo de espera al anuncio en el periodo especificado.|
| **aws.mediatailor.ad_not_ready** <br>(count) | El número de veces que el anuncio apuntó a un anuncio que aún no había sido transcodificado por el servicio interno de transcodificación.|
| **aws.mediatailor.ads_billed** <br>(count) | Número de anuncios por los que MediaTailor factura a los clientes en función de la inserción.|
| **aws.mediatailor.avail_duration** <br>(gauge) | La duración total en milisegundos de todos los anuncios disponibles que MediaTailor encontró en el periodo especificado.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.avail_fill_rate** <br>(gauge) | La media simple de la tasa a la que MediaTailor rellenó los anuncios disponibles.<br>_Se muestra como porcentaje_ |
| **aws.mediatailor.avail_filled_duration** <br>(gauge) | La duración total en milisegundos de todos los anuncios que MediaTailor llenó en el periodo que se especificó.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.avail_impression** <br>(count) | El número de anuncios con eventos de seguimiento de impresiones que MediaTailor ve durante las balizas del lado del servidor (no el número de impresiones).|
| **aws.mediatailor.avail_observed_duration** <br>(gauge) | El número total observado de milisegundos de disponibilidad de anuncios que se produjeron dentro del periodo de CloudWatch. Avail.ObservedDuration se emite al final de la disponibilidad del anuncio y se basa en la duración de los segmentos notificados en el manifiesto durante la disponibilidad del anuncio.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.avail_observed_fill_rate** <br>(gauge) | La media simple observada de los porcentajes a los que MediaTailor llenó las disponibilidades de anuncios individuales en el periodo de CloudWatch.<br>_Se muestra como porcentaje_ |
| **aws.mediatailor.avail_observed_filled_duration** <br>(gauge) | El número observado de milisegundos de tiempo de disponibilidad de anuncios que MediaTailor llenó con anuncios dentro del periodo de CloudWatch.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.avail_observed_slate_duration** <br>(gauge) | El número total observado de milisegundos de slate que se insertó dentro del periodo de CloudWatch.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.get_manifest_errors** <br>(count) | El número de errores recibidos cuando MediaTailor está generando manifiestos.<br>_Se muestra como error_ |
| **aws.mediatailor.get_manifest_latency** <br>(gauge) | El tiempo de respuesta de MediaTailor en milisegundos para la solicitud de generación de manifiestos.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.origin_errors** <br>(count) | El número de respuestas sin código de estado HTTP 200 y respuestas con tiempo de espera que MediaTailor recibió del servidor de origen en el periodo especificado.<br>_Se muestra como error_ |
| **aws.mediatailor.origin_latency** <br>(gauge) | El tiempo de respuesta de las solicitudes realizadas por MediaTailor a tu servidor de origen de contenidos.<br>_Se muestra en milisegundos_ |
| **aws.mediatailor.origin_manifest_file_size_bytes** <br>(gauge) | El tamaño del archivo del manifiesto de origen en bytes tanto para HLS como para DASH. Normalmente, esta métrica se utiliza junto con Origin.ManifestFileSizeTooLarge.<br>_Se muestra como byte_ |
| **aws.mediatailor.origin_manifest_file_size_too_large** <br>(count) | El número de respuestas del origen que tienen un tamaño de manifiesto superior a la cantidad configurada. Normalmente, esta métrica se utiliza junto con Origin.ManifestFileSizeBytes.|
| **aws.mediatailor.origin_timeouts** <br>(count) | El número de solicitudes expiradas al servidor de origen en el periodo especificado.|
| **aws.mediatailor.request_count** <br>(count) | El número total de solicitudes. El recuento de transacciones depende en gran medida de la frecuencia con la que los jugadores solicitan manifiestos actualizados y del número de jugadores. Cada solicitud de un jugador cuenta como una transacción.<br>_Se muestra como solicitud_ |
| **aws.mediatailor.requests** <br>(count) | Número de transacciones simultáneas por segundo en todos los tipos de solicitud. El número de transacciones depende principalmente del número de jugadores y de la frecuencia con la que los jugadores solicitan manifiestos actualizados. Cada solicitud de un jugador cuenta como una transacción.<br>_Se muestra como solicitud_ |
| **aws.mediatailor.skipped_reason_duration_exceeded** <br>(count) | Número de anuncios que no se insertaron en una disponibilidad porque el anuncio devolvió una duración de los anuncios superior a la duración de la disponibilidad especificada. Un valor alto para esta métrica podría contribuir a una discrepancia entre la métrica Avail.Ads y AdDecisionServer.Ads.|
| **aws.mediatailor.skipped_reason_early_cue_in** <br>(count) | Número de anuncios omitidos debido a un CUE-IN anticipado.|
| **aws.mediatailor.skipped_reason_internal_error** <br>(count) | Número de anuncios omitidos debido a un error interno de MediaTailor.|
| **aws.mediatailor.skipped_reason_new_creative** <br>(count) | El número de anuncios que no se insertaron en una disponibilidad porque era la primera vez que el activo había sido solicitado por un cliente. Un valor alto de esta métrica puede contribuir temporalmente a un Avail.FillRate general bajo, hasta que los activos puedan transcodificarse correctamente.|
| **aws.mediatailor.skipped_reason_no_variant_match** <br>(count) | Número de anuncios omitidos debido a que no hay coincidencia de variante entre el anuncio y el contenido.|
| **aws.mediatailor.skipped_reason_personalization_threshold_exceeded** <br>(count) | La duración de los anuncios que superan el umbral de personalización establecido en esta configuración.|
| **aws.mediatailor.skipped_reason_profile_not_found** <br>(count) | Número de anuncios omitidos debido a que no se ha encontrado el perfil de transcodificación.|
| **aws.mediatailor.skipped_reason_transcode_error** <br>(count) | Número de anuncios omitidos debido a un error de transcodificación.|
| **aws.mediatailor.skipped_reason_transcode_in_progress** <br>(count) | El recuento del número de anuncios que no se insertaron en una disponibilidad porque el anuncio aún no se había transcodificado. Un valor alto de esta métrica puede contribuir temporalmente a un bajo Avail.FillRate general, hasta que los activos puedan transcodificarse correctamente.|
| **aws.mediatailor.total_time** <br>(gauge) | La cantidad de tiempo que el servidor de aplicaciones tardó en procesar la solicitud, incluyendo el tiempo utilizado para recibir y escribir bytes desde y hacia el cliente y la red.<br>_Se muestra en milisegundos_ |

### Eventos

La integración de AWS Elemental MediaTailor no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaTailor no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).