---
app_id: amazon_mediaconnect
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de AWS Elemental MediaConnect.
title: AWS Elemental MediaConnect
---
## Información general

AWS Elemental MediaConnect es un servicio de transporte para vídeos en directo.

Habilita esta integración para ver todas tus métricas de Elemental MediaConnect en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MediaConnect` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS Elemental MediaConnect](https://app.datadoghq.com/integrations/amazon-mediaconnect).

### Recopilación de logs

#### Activar logging

Configura AWS Elemental MediaConnect para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mediaconnect` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Elemental MediaConnect en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.mediaconnect.arqrecovered** <br>(count) | El número de paquetes perdidos que se recuperaron mediante la solicitud de repetición automática (ARQ).<br>_Se muestra como paquete_ |
| **aws.mediaconnect.arqrequests** <br>(count) | Número de paquetes retransmitidos que se solicitaron a través de la solicitud de repetición automática (ARQ) y se recibieron.<br>_Se muestra como solicitud_ |
| **aws.mediaconnect.bit_rate** <br>(rate) | La tasa de bits media del vídeo en bits/seg<br>_Se muestra como bit_ |
| **aws.mediaconnect.bit_rate.maximum** <br>(rate) | La tasa de bits máxima del vídeo en bits/seg<br>_Se muestra como bit_ |
| **aws.mediaconnect.bit_rate.minimum** <br>(rate) | La tasa de bits mínima del vídeo en bits/seg<br>_Se muestra como bit_ |
| **aws.mediaconnect.caterror** <br>(count) | El número de veces que se ha producido un error de tabla de acceso condicional (CAT).<br>_Se muestra como error_ |
| **aws.mediaconnect.connected** <br>(gauge) | El estado de la fuente (valor medio). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.connected.maximum** <br>(gauge) | El estado de la fuente (valor máximo). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.connected.minimum** <br>(gauge) | El estado de la fuente (valor mínimo). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.connected_outputs** <br>(gauge) | El número medio de salidas que están conectadas actualmente.|
| **aws.mediaconnect.connected_outputs.maximum** <br>(gauge) | El número máximo de salidas que están conectadas actualmente.|
| **aws.mediaconnect.connected_outputs.minimum** <br>(gauge) | El número mínimo de salidas que están conectadas actualmente.|
| **aws.mediaconnect.continuity_counter** <br>(count) | El número de veces que se ha producido un error de continuidad.<br>_Se muestra como error_ |
| **aws.mediaconnect.crcerror** <br>(count) | Número de veces que se ha producido un error de comprobación de redundancia cíclica (CRC).<br>_Se muestra como error_ |
| **aws.mediaconnect.disconnections** <br>(count) | El número de veces que el estado de la fuente cambió de conectado a desconectado.|
| **aws.mediaconnect.dropped_packets** <br>(count) | El número de paquetes que se perdieron durante el tránsito. Este valor se mide antes de que tenga lugar cualquier corrección de errores.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.failover_switches** <br>(count) | El número total de veces que el flujo cambia de una fuente a otra cuando se utiliza el modo de conmutación por error para la conmutación por error de la fuente.|
| **aws.mediaconnect.fecpackets** <br>(count) | El número de paquetes que se transmitieron utilizando la corrección de errores hacia adelante (FEC) y se recibieron.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.fecrecovered** <br>(count) | El número de paquetes que se transmitieron utilizando corrección de errores hacia adelante (FEC) perdidos durante el tránsito y recuperados.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.maintenance_canceled** <br>(gauge) | MediaConnect cancela el mantenimiento de este flujo.|
| **aws.mediaconnect.maintenance_failed** <br>(gauge) | El mantenimiento no se ha completado correctamente para este flujo.|
| **aws.mediaconnect.maintenance_rescheduled** <br>(gauge) | MediaConnect no puede realizar el mantenimiento en la fecha y hora programadas anteriormente. MediaConnect ha asignado automáticamente una nueva fecha y hora para el mantenimiento de este flujo.|
| **aws.mediaconnect.maintenance_scheduled** <br>(gauge) | El mantenimiento está programado para el flujo.|
| **aws.mediaconnect.maintenance_started** <br>(gauge) | El mantenimiento de este flujo ha comenzado y está en curso.|
| **aws.mediaconnect.maintenance_succeeded** <br>(gauge) | Mantenimiento completado con éxito para este flujo.|
| **aws.mediaconnect.merge_active** <br>(gauge) | Estado de fusión de todas las fuentes del flujo. Un valor de 1 indica que todas las fuentes están fusionadas.|
| **aws.mediaconnect.merge_latency** <br>(gauge) | El valor máximo para SourceMergeLatency.<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.not_recovered_packets** <br>(count) | El número de paquetes que se perdieron durante el tránsito y nunca se recuperaron.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.output_connected** <br>(gauge) | El estado de la salida (valor medio). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.output_connected.maximum** <br>(gauge) | El estado de la salida (valor máximo). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.output_connected.minimum** <br>(gauge) | El estado de la salida (valor mínimo). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.output_disconnections** <br>(count) | Número de veces que el estado de la salida cambió de conectado a desconectado.|
| **aws.mediaconnect.output_dropped_payloads** <br>(count) | Cargas útiles que se perdieron durante el tránsito desde MediaConnect a la salida. Una carga útil es un fotograma de vídeo o una muestra de audio. Las cargas útiles pueden estar formadas por varios paquetes. Las métricas de carga útil sólo son aplicables cuando se utiliza CDI.|
| **aws.mediaconnect.output_late_payloads** <br>(count) | Paquetes de una carga útil que llegan a la salida fuera del búfer interno de MediaConnect. Una carga útil es un fotograma de vídeo o una muestra de audio. Las cargas útiles pueden estar formadas por varios paquetes. Las métricas de carga útil sólo son aplicables cuando se utiliza CDI.|
| **aws.mediaconnect.output_total_bytes** <br>(count) | Cantidad total de bytes transferidos desde MediaConnect a la salida.<br>_Se muestra como byte_ |
| **aws.mediaconnect.output_total_payloads** <br>(count) | Cantidad total de cargas útiles entregadas desde MediaConnect a la salida. Una carga útil es un fotograma de vídeo o una muestra de audio. Las cargas útiles pueden constar de varios paquetes. Las métricas de carga útil sólo son aplicables cuando se utiliza CDI.|
| **aws.mediaconnect.overflow_packets** <br>(count) | El número de paquetes que se perdieron en tránsito porque el vídeo requería más búfer del disponible.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.packet_loss_percent** <br>(gauge) | Porcentaje medio de paquetes que se han perdido durante el tránsito aunque se hayan recuperado.<br>_Se muestra como porcentaje_ |
| **aws.mediaconnect.packet_loss_percent.maximum** <br>(gauge) | Porcentaje máximo de paquetes que se han perdido durante el tránsito, aunque se hayan recuperado.<br>_Se muestra como porcentaje_ |
| **aws.mediaconnect.packet_loss_percent.minimum** <br>(gauge) | Porcentaje mínimo de paquetes que se han perdido durante el tránsito aunque se hayan recuperado.<br>_Se muestra como porcentaje_ |
| **aws.mediaconnect.paterror** <br>(count) | Número de veces que se ha producido un error en la tabla de asociación de programas (PAT). Este error indica que falta la PAT.<br>_Se muestra como error_ |
| **aws.mediaconnect.pcraccuracy_error** <br>(count) | Número de veces que se ha producido un error de precisión en el registro de reloj de programa (PCR).<br>_Se muestra como error_ |
| **aws.mediaconnect.pcrerror** <br>(count) | Número de veces que se ha producido un error de PCR. Este error se produce cuando los valores de PCR no se envían con la frecuencia suficiente.<br>_Se muestra como error_ |
| **aws.mediaconnect.piderror** <br>(count) | Número de veces que se ha producido un error de identificador de paquete (PID).<br>_Se muestra como error_ |
| **aws.mediaconnect.pmterror** <br>(count) | Número de veces que se ha producido un error en la tabla de asignación de programas (PMT).<br>_Se muestra como error_ |
| **aws.mediaconnect.ptserror** <br>(count) | Número de veces que se ha producido un error de marca de tiempo de presentación (PTS). Este error se produce cuando no se recibe una marca de tiempo de presentación (PTS) al menos cada 700 ms.<br>_Se muestra como error_ |
| **aws.mediaconnect.recovered_packets** <br>(count) | El número de paquetes que se perdieron durante el tránsito pero se recuperaron.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.round_trip_time** <br>(gauge) | El tiempo medio que tarda la fuente en enviar una señal y recibir una aceptación de AWS Elemental MediaConnect.<br>_Se muestra en milisegundos_ |
| **aws.mediaconnect.round_trip_time.maximum** <br>(gauge) | La cantidad máxima de tiempo que tarda la fuente en enviar una señal y recibir una aceptación de AWS Elemental MediaConnect MediaConnect.<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.round_trip_time.minimum** <br>(gauge) | El tiempo mínimo que tarda la fuente en enviar una señal y recibir una aceptación de AWS Elemental MediaConnect MediaConnect.<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.source_arqrecovered** <br>(count) | El número de paquetes perdidos que fueron recuperados por solicitud de repetición automática (ARQ). Esta métrica sólo se aplica a las fuentes que utilizan el protocolo RIST o el protocolo Zixi. No se aplica a los flujos que reciben contenido de una asignación de derechos.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_arqrequests** <br>(count) | Número de paquetes retransmitidos que se solicitaron a través de la solicitud de repetición automática (ARQ) y se recibieron.<br>_Se muestra como solicitud_ |
| **aws.mediaconnect.source_bit_rate** <br>(rate) | La tasa de bits media del vídeo entrante (fuente).<br>_Se muestra como bit_ |
| **aws.mediaconnect.source_bit_rate.maximum** <br>(rate) | La tasa de bits máxima del vídeo entrante (fuente).<br>_Se muestra como bit_ |
| **aws.mediaconnect.source_bit_rate.minimum** <br>(rate) | La tasa de bits mínima del vídeo entrante (fuente).<br>_Se muestra como bit_ |
| **aws.mediaconnect.source_caterror** <br>(count) | El número de veces que se ha producido un error de tabla de acceso condicional (CAT).<br>_Se muestra como error_ |
| **aws.mediaconnect.source_connected** <br>(gauge) | El estado de la fuente (valor medio). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.source_connected.maximum** <br>(gauge) | El estado de la fuente (valor máximo). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.source_connected.minimum** <br>(gauge) | El estado de la fuente (valor mínimo). Un valor de 1 indica que la fuente está conectada y un valor de 0 (cero) indica que la fuente está desconectada.|
| **aws.mediaconnect.source_continuity_counter** <br>(count) | El número de veces que se ha producido un error de continuidad.<br>_Se muestra como error_ |
| **aws.mediaconnect.source_crcerror** <br>(count) | Número de veces que se ha producido un error de comprobación de redundancia cíclica (CRC).<br>_Se muestra como error_ |
| **aws.mediaconnect.source_disconnections** <br>(count) | El número de veces que el estado de la fuente cambió de conectado a desconectado.|
| **aws.mediaconnect.source_dropped_packets** <br>(count) | El número de paquetes que se perdieron durante el tránsito. Este valor se mide antes de que tenga lugar cualquier corrección de errores.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_dropped_payloads** <br>(count) | Las cargas útiles que se perdieron durante el tránsito hacia MediaConnect desde la fuente. Una carga útil es un fotograma de vídeo o una muestra de audio. Las cargas útiles pueden estar formadas por varios paquetes. Las métricas de carga útil sólo son aplicables cuando se utiliza CDI.|
| **aws.mediaconnect.source_fecpackets** <br>(count) | El número de paquetes que se transmitieron utilizando la corrección de errores hacia adelante (FEC) y se recibieron.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_fecrecovered** <br>(count) | El número de paquetes que se transmitieron utilizando corrección de errores hacia adelante (FEC) perdidos durante el tránsito y recuperados.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_late_payloads** <br>(count) | Paquetes de una carga útil que llegan fuera del intervalo configurado del búfer de sincronización máxima. Una carga útil es un fotograma de vídeo o una muestra de audio. Las cargas útiles pueden constar de varios paquetes. Las métricas de carga útil sólo son aplicables cuando se utiliza CDI.|
| **aws.mediaconnect.source_merge_active** <br>(gauge) | Indicación del estado de la fuente con respecto a otras fuentes. Esta métrica es útil cuando el flujo tiene varias fuentes para la conmutación por error y se utiliza el modo de conmutación por error Merge. Un valor de 1 indica que el flujo tiene múltiples fuentes y que esta fuente está en uso activo, con 2022-7 merge. Un valor de 0 (cero) indica que el flujo no está utilizando la fuente para formar el flujo.|
| **aws.mediaconnect.source_merge_latency** <br>(gauge) | La cantidad media de tiempo que esta fuente sigue a la fuente primaria. Si esta fuente es la fuente primaria, el valor es 0 (cero).<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.source_merge_latency.maximum** <br>(gauge) | La cantidad máxima de tiempo que esta fuente sigue a la fuente primaria. Si esta fuente es la fuente primaria, el valor es 0 (cero).<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.source_merge_latency.minimum** <br>(gauge) | La cantidad mínima de tiempo que esta fuente sigue a la fuente primaria. Si esta fuente es la fuente primaria, el valor es 0 (cero).<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.source_merge_status_warn_mismatch** <br>(gauge) | Una métrica de estado que advierte de que el flujo está recibiendo fuentes no coincidentes (valor medio). Esto significa que los paquetes perdidos no se recuperarán y darán lugar a una fiabilidad deficiente de la red. Esta métrica solo se aplica a las fuentes que utilizan la conmutación por error en modo Merge.|
| **aws.mediaconnect.source_merge_status_warn_mismatch.maximum** <br>(gauge) | Una métrica de estado que advierte de que el flujo está recibiendo fuentes no coincidentes (valor máximo). Esto significa que los paquetes perdidos no se recuperarán y darán lugar a una fiabilidad deficiente de la red. Esta métrica solo se aplica a las fuentes que utilizan la conmutación por error en modo Merge.|
| **aws.mediaconnect.source_merge_status_warn_mismatch.minimum** <br>(gauge) | Una métrica de estado que advierte de que el flujo está recibiendo fuentes no coincidentes (valor mínimo). Esto significa que los paquetes perdidos no se recuperarán y darán lugar a una fiabilidad deficiente de la red. Esta métrica solo se aplica a las fuentes que utilizan la conmutación por error en modo Merge.|
| **aws.mediaconnect.source_merge_status_warn_solo** <br>(gauge) | Una métrica de estado que advierte de que el flujo sólo está recibiendo una fuente (valor medio). Esto significa que cualquier paquete perdido no será recuperado y resultará en una fiabilidad de la red deficiente. Esta métrica solo se aplica a las fuentes que utilizan la conmutación por error en modo Merge.|
| **aws.mediaconnect.source_merge_status_warn_solo.maximum** <br>(gauge) | Una métrica de estado que advierte de que el flujo sólo está recibiendo una fuente (valor máximo). Esto significa que cualquier paquete perdido no será recuperado y resultará en una fiabilidad de la red deficiente. Esta métrica solo se aplica a las fuentes que utilizan la conmutación por error en modo Merge.|
| **aws.mediaconnect.source_merge_status_warn_solo.minimum** <br>(gauge) | Una métrica de estado que advierte de que el flujo sólo está recibiendo una fuente (valor mínimo). Esto significa que cualquier paquete perdido no será recuperado y resultará en una fiabilidad de la red deficiente. Esta métrica solo se aplica a las fuentes que utilizan la conmutación por error en modo Merge.|
| **aws.mediaconnect.source_missing_packets** <br>(count) | Ha faltado un paquete en ambos flujos de fuente, esto significa que el paquete no ha podido ser recuperado. Esta métrica sólo se aplica a las fuentes que utilizan la conmutación por error en modo Merge.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_not_recovered_packets** <br>(count) | Número de paquetes que se perdieron durante el tránsito y no se recuperaron mediante corrección de errores.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_overflow_packets** <br>(count) | El número de paquetes que se perdieron en tránsito porque el vídeo requería más búfer del disponible.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_packet_loss_percent** <br>(gauge) | Porcentaje medio de paquetes que se han perdido durante el tránsito aunque se hayan recuperado.<br>_Se muestra como porcentaje_ |
| **aws.mediaconnect.source_packet_loss_percent.maximum** <br>(gauge) | Porcentaje máximo de paquetes que se han perdido durante el tránsito, aunque se hayan recuperado.<br>_Se muestra como porcentaje_ |
| **aws.mediaconnect.source_packet_loss_percent.minimum** <br>(gauge) | Porcentaje mínimo de paquetes que se han perdido durante el tránsito aunque se hayan recuperado.<br>_Se muestra como porcentaje_ |
| **aws.mediaconnect.source_paterror** <br>(count) | Número de veces que se ha producido un error en la tabla de asociación de programas (PAT). Este error indica que falta la PAT.<br>_Se muestra como error_ |
| **aws.mediaconnect.source_pcraccuracy_error** <br>(count) | Número de veces que se ha producido un error de precisión en el registro de reloj de programa (PCR).<br>_Se muestra como error_ |
| **aws.mediaconnect.source_pcrerror** <br>(count) | Número de veces que se ha producido un error de PCR. Este error se produce cuando los valores de PCR no se envían con la frecuencia suficiente.<br>_Se muestra como error_ |
| **aws.mediaconnect.source_piderror** <br>(count) | Número de veces que se ha producido un error de identificador de paquete (PID).<br>_Se muestra como error_ |
| **aws.mediaconnect.source_pmterror** <br>(count) | Número de veces que se ha producido un error en la tabla de asignación de programas (PMT).<br>_Se muestra como error_ |
| **aws.mediaconnect.source_ptserror** <br>(count) | Número de veces que se ha producido un error de marca de tiempo de presentación (PTS). Este error se produce cuando no se recibe una marca de tiempo de presentación (PTS) al menos cada 700 ms.<br>_Se muestra como error_ |
| **aws.mediaconnect.source_recovered_packets** <br>(count) | El número de paquetes que se perdieron durante el tránsito pero se recuperaron.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_round_trip_time** <br>(gauge) | El tiempo medio que tarda la fuente en enviar una señal y recibir una aceptación de AWS Elemental MediaConnect.<br>_Se muestra en milisegundos_ |
| **aws.mediaconnect.source_round_trip_time.maximum** <br>(gauge) | La cantidad máxima de tiempo que tarda la fuente en enviar una señal y recibir una aceptación de AWS Elemental MediaConnect MediaConnect.<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.source_round_trip_time.minimum** <br>(gauge) | El tiempo mínimo que tarda la fuente en enviar una señal y recibir una aceptación de AWS Elemental MediaConnect MediaConnect.<br>_Se muestra como milisegundo_ |
| **aws.mediaconnect.source_selected** <br>(gauge) | Indicación de si se está utilizando la fuente como entrada para la ingesta de flujos.|
| **aws.mediaconnect.source_total_bytes** <br>(count) | Cantidad total de bytes transferidos a MediaConnect desde la fuente.<br>_Se muestra como byte_ |
| **aws.mediaconnect.source_total_packets** <br>(count) | Número total de paquetes recibidos.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.source_total_payloads** <br>(count) | Cantidad total de cargas útiles entregadas a MediaConnect desde la fuente. Una carga útil es un fotograma de vídeo o una muestra de audio. Las cargas útiles pueden constar de varios paquetes. Las métricas de carga útil sólo son aplicables cuando se utiliza CDI.|
| **aws.mediaconnect.source_transport_error** <br>(count) | Número de veces que se ha producido un error de transporte primario.<br>_Se muestra como error_ |
| **aws.mediaconnect.source_tsbyte_error** <br>(count) | Número de veces que se ha producido un error de byte en la secuencia de transporte (TS).<br>_Se muestra como error_ |
| **aws.mediaconnect.source_tssync_loss** <br>(count) | El número de veces que se produjo un error de pérdida de sincronización TS.<br>_Se muestra como error_ |
| **aws.mediaconnect.total_packets** <br>(count) | Número total de paquetes recibidos.<br>_Se muestra como paquete_ |
| **aws.mediaconnect.transport_error** <br>(count) | Número de veces que se ha producido un error de transporte primario.<br>_Se muestra como error_ |
| **aws.mediaconnect.tsbyte_error** <br>(count) | Número de veces que se ha producido un error de byte en la secuencia de transporte (TS).<br>_Se muestra como error_ |
| **aws.mediaconnect.tssync_loss** <br>(count) | El número de veces que se ha producido un error de pérdida de sincronización TS.<br>_Se muestra como error_ |

### Eventos

La integración de AWS Elemental MediaConnect no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaConnect no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).