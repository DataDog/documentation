---
aliases:
- /es/integrations/amazon_medialive
app_id: amazon-medialive
categories:
- aws
- métricas
- nube
custom_kind: integración
description: AWS Elemental MediaLive es un servicio de procesamiento de vídeo de transmisión
  en directo.
media: []
title: Amazon MediaLive
---
## Información general

AWS Elemental MediaLive es un servicio de procesamiento de vídeo de transmisión en directo.

Habilita esta integración para ver todas tus métricas de MediaLive en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En el [cuadro de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MediaLive` está marcado.
   en la pestaña de recopilación de métricas.
1. Instala la [integración de Datadog y MediaLive](https://app.datadoghq.com/integrations/amazon-medialive).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.medialive.active_alerts** <br>(gauge) | Número medio de alertas activas.|
| **aws.medialive.active_outputs** <br>(gauge) | Número medio de salidas que se producen y se escriben correctamente en el destino.|
| **aws.medialive.channel_input_error_seconds** <br>(count) | El número de segundos en los que la entrada del canal contenía uno o más paquetes irrecuperables.<br>_Se muestra como segundo_ |
| **aws.medialive.configured_bitrate** <br>(rate) | La tasa de bits máxima media configurada.<br>_Se muestra como bit_ |
| **aws.medialive.configured_bitrate.p90** <br>(rate) | El percentil 90 de la tasa de bits máxima configurada.<br>_Se muestra como bit_ |
| **aws.medialive.configured_bitrate_available** <br>(gauge) | La parte media de la tasa de bits configurada que el dispositivo puede satisfacer en función de las condiciones de la red.<br>_Se muestra como porcentaje_ |
| **aws.medialive.configured_bitrate_available.p90** <br>(gauge) | El percentil 90 de la parte de la tasa de bits configurada que el dispositivo puede satisfacer en función de las condiciones de la red.<br>_Se muestra como porcentaje_ |
| **aws.medialive.encoder_bitrate** <br>(rate) | La tasa de bits media codificada activamente.<br>_Se muestra como bit_ |
| **aws.medialive.encoder_bitrate.p90** <br>(rate) | El percentil 90 de la tasa de bits codificada activamente.<br>_Se muestra como bit_ |
| **aws.medialive.encoder_running** <br>(gauge) | Indicador de si el codificador está procesando correctamente la señal de entrada (valor medio en el tiempo).|
| **aws.medialive.error_seconds** <br>(count) | Número de segundos en los que se han perdido uno o más paquetes y no se han recuperado.<br>_Se muestra como segundo_ |
| **aws.medialive.fec_column_packets_received** <br>(count) | El número de paquetes de columna FEC recibidos en ambos flujos FEC (puerto 5002 y puerto 5004). Un valor distinto de cero indica que FEC está funcionando. Esta métrica solo es útil si el canal tiene una entrada RTP que incluye FEC.<br>_Se muestra como paquete_ |
| **aws.medialive.fec_row_packets_received** <br>(count) | El número de paquetes de fila de corrección de errores hacia adelante (FEC) recibidos en ambos flujos FEC (puerto 5002 y puerto 5004). Un valor distinto de cero indica que FEC está funcionando. Esta métrica solo es útil si el canal tiene una entrada RTP que incluye FEC.<br>_Se muestra como paquete_ |
| **aws.medialive.fill_msec** <br>(gauge) | La duración media actual (el periodo de relleno) durante la cual MediaLive ha llenado la salida de vídeo con fotogramas de relleno. El periodo de relleno comienza cuando el pipeline no recibe contenido de la entrada en el tiempo previsto.<br>_Se muestra como milisegundo_ |
| **aws.medialive.input_locked** <br>(gauge) | Indica si el dispositivo ha bloqueado correctamente la señal de entrada. Valor medio del indicador a lo largo del tiempo.|
| **aws.medialive.input_timecodes_present** <br>(gauge) | Valor medio de un indicador de si un pipeline está recibiendo una entrada que incluye códigos de tiempo incrustados. El código de tiempo incrustado puede estar incrustado en la fuente, o puede estar incrustado en datos auxiliares SMPTE-2038. 0 (false) significa que no está presente. 1 (true) significa que está presente.|
| **aws.medialive.input_video_frame_rate** <br>(rate) | La frecuencia de imagen media del vídeo fuente. Esta métrica es un indicador del estado de la entrada. Si el valor no es estable, investiga para determinar cualquier problema con tu fuente o la red entre MediaLive y el sistema de entrada.|
| **aws.medialive.linked_to_stream_endpoint** <br>(gauge) | El dispositivo está conectado al endpoint de streaming en AWS (valor medio en el tiempo).|
| **aws.medialive.network_in** <br>(gauge) | La tasa media de tráfico que llega a MediaLive. Este número incluye todo el tráfico recibido en MediaLive: entradas push, entradas pull, respuestas del sistema entrante de una entrada pull, respuestas del sistema saliente para cualquier salida y tráfico de instancia como resolución DNS y NTP. Incluso cuando un canal no está en proceso de ingesta, hay algo de tráfico.|
| **aws.medialive.network_out** <br>(gauge) | La tasa media de tráfico que sale de MediaLive. Este número incluye todo el tráfico enviado desde MediaLive: la salida de medios, las solicitudes HTTP GET para entradas pull, el tráfico NTP y el tráfico DNS. Incluso cuando un canal no está entregando salidas, hay algo de tráfico.|
| **aws.medialive.not_recovered_packets** <br>(count) | Número de paquetes que se perdieron durante el tránsito y no se recuperaron mediante corrección de errores.<br>_Se muestra como paquete_ |
| **aws.medialive.output_4xx_errors** <br>(count) | Número de errores HTTP 4xx que se han recibido del destino durante la entrega de la salida.<br>_Se muestra como error_ |
| **aws.medialive.output_5xx_errors** <br>(count) | Número de errores HTTP 5xx que se han recibido del destino durante la entrega de la salida.<br>_Se muestra como error_ |
| **aws.medialive.output_audio_level_dbfs** <br>(gauge) | El nivel medio de audio de salida en decibelios relativos a la escala completa (dBFS).|
| **aws.medialive.output_audio_level_lkfs** <br>(gauge) | El nivel medio de audio de salida en sonoridad, ponderado K, relativo a la escala completa (LKFS).|
| **aws.medialive.output_video_frame_rate** <br>(rate) | Frecuencia de imagen media del vídeo de salida.|
| **aws.medialive.pipelines_locked** <br>(gauge) | Valor medio de un indicador de si los dos pipelines están sincronizados entre sí. Esta métrica solo se aplica a los canales estándar y solo a las salidas HLS, MediaPackage, Microsoft Smooth y UDP de ese canal. MediaLive utiliza el bloqueo de pipeline para garantizar que los dos pipelines estén sincronizados entre sí.|
| **aws.medialive.primary_input_active** <br>(gauge) | Valor medio de un indicador de si la entrada primaria de un par de conmutación automática de entradas está activa. Un valor de 1 significa que la entrada primaria está activa y, por tanto, en buen estado. Un valor de 0 significa que está inactiva.|
| **aws.medialive.recovered_packets** <br>(count) | Número de paquetes perdidos durante el tránsito, pero recuperados mediante corrección de errores.<br>_Se muestra como paquete_ |
| **aws.medialive.rtp_packets_lost** <br>(count) | Número de paquetes RTP perdidos en la transmisión entrante. Perdidos significa paquetes que no pudieron ser recuperados por FEC.<br>_Se muestra como paquete_ |
| **aws.medialive.rtp_packets_received** <br>(count) | El número de paquetes RTP recibidos en una entrada RTP. Este número incluye la fuente RTP principal (puerto 5000) y los datos FEC (puertos 5002 y 5004).<br>_Se muestra como paquete_ |
| **aws.medialive.rtp_packets_recovered_via_fec** <br>(count) | El número de paquetes RTP recuperados a través de FEC.<br>_Se muestra como paquete_ |
| **aws.medialive.streaming** <br>(gauge) | El dispositivo transmite correctamente la señal de entrada a MediaLive (valor medio en el tiempo).|
| **aws.medialive.svq_time** <br>(gauge) | El porcentaje de tiempo, promediado en los últimos 10 segundos, que el codificador ha reducido las optimizaciones de calidad para acelerar el proceso de codificación y que MediaLive pueda seguir funcionando en tiempo real.<br>_Se muestra como porcentaje_ |
| **aws.medialive.temperature** <br>(gauge) | La temperatura media del dispositivo en grados centígrados. Consulta la documentación del dispositivo para conocer las condiciones de funcionamiento recomendadas.<br>_Se muestra en grados centígrados_ |
| **aws.medialive.total_packets** <br>(count) | Número total de paquetes entregados correctamente al endpoint de streaming de AWS.<br>_Se muestra como paquete_ |
| **aws.medialive.udp_input_loss_seconds** <br>(count) | El número de segundos (el periodo de pérdida de entrada) durante el cual el canal no ha recibido paquetes de la fuente de una entrada RTP o MediaConnect. Cada punto de datos tiene un valor entre 0 y 10 segundos.<br>_Se muestra como segundo_ |
| **aws.medialive.using_hdmi** <br>(gauge) | Indica si HDMI es la entrada seleccionada actualmente para el dispositivo. Valor medio durante un periodo de tiempo.|
| **aws.medialive.using_sdi** <br>(gauge) | Indica si SDI es la entrada seleccionada actualmente para el dispositivo. Valor medio durante un periodo de tiempo.|
| **aws.medialive.active_alerts.maximum** <br>(gauge) | Número máximo de alertas activas.|
| **aws.medialive.active_alerts.minimum** <br>(gauge) | Número mínimo de alertas activas.|
| **aws.medialive.active_outputs.maximum** <br>(gauge) | El número máximo de salidas que se producen y escriben con éxito en el destino.|
| **aws.medialive.active_outputs.minimum** <br>(gauge) | El número mínimo de salidas que se producen y se escriben correctamente en el destino.|
| **aws.medialive.encoder_running.maximum** <br>(gauge) | Indicador de si el codificador está procesando correctamente la señal de entrada (valor máximo en el tiempo).|
| **aws.medialive.encoder_running.minimum** <br>(gauge) | Indicador de si el codificador está procesando correctamente la señal de entrada (valor mínimo en el tiempo).|
| **aws.medialive.fill_msec.maximum** <br>(gauge) | La duración máxima actual (el periodo de relleno) durante el cual MediaLive ha llenado la salida de vídeo con fotogramas de relleno. El periodo de relleno comienza cuando el pipeline no recibe contenido de la entrada en el tiempo previsto.<br>_Se muestra como milisegundo_ |
| **aws.medialive.fill_msec.minimum** <br>(gauge) | La duración mínima actual (el periodo de relleno) durante la cual MediaLive ha llenado la salida de vídeo con fotogramas de relleno. El periodo de relleno comienza cuando pipeline no recibe contenido de la entrada en el tiempo previsto.<br>_Se muestra como milisegundo_ |
| **aws.medialive.input_locked.maximum** <br>(gauge) | Indica si el aparato ha bloqueado correctamente la señal de entrada (valor máximo del indicador en el tiempo).|
| **aws.medialive.input_locked.minimum** <br>(gauge) | Indica si el aparato ha bloqueado correctamente la señal de entrada (valor mínimo del indicador en el tiempo).|
| **aws.medialive.input_timecodes_present.maximum** <br>(gauge) | Valor máximo de un indicador de si un pipeline está recibiendo una entrada que incluye códigos de tiempo incrustados. El código de tiempo incrustado puede estar incrustado en la fuente, o puede estar incrustado en datos auxiliares SMPTE-2038. 0 (false) significa que no está presente. 1 (true) significa que está presente.|
| **aws.medialive.input_timecodes_present.minimum** <br>(gauge) | Valor mínimo de un indicador de si un pipeline está recibiendo una entrada que incluye códigos de tiempo incrustados. El código de tiempo incrustado puede estar incrustado en la fuente, o puede estar incrustado en datos auxiliares SMPTE-2038. 0 (false) significa que no está presente. 1 (true) significa que está presente.|
| **aws.medialive.input_video_frame_rate.maximum** <br>(rate) | La frecuencia de imagen máxima del vídeo fuente. Esta métrica es un indicador del estado de la entrada. Si el valor no es estable, investiga para determinar cualquier problema con tu fuente o la red entre MediaLive y el sistema de entrada.|
| **aws.medialive.input_video_frame_rate.minimum** <br>(rate) | La frecuencia de imagen mínima del vídeo fuente. Esta métrica es un indicador del estado de la entrada. Si el valor no es estable, investiga para determinar cualquier problema con tu fuente o la red entre MediaLive y el sistema de entrada.|
| **aws.medialive.linked_to_stream_endpoint.maximum** <br>(gauge) | El dispositivo está conectado al endpoint de streaming en AWS (valor máximo en el tiempo).|
| **aws.medialive.linked_to_stream_endpoint.minimum** <br>(gauge) | El dispositivo está conectado al endpoint de streaming en AWS (valor mínimo en el tiempo).|
| **aws.medialive.network_in.maximum** <br>(gauge) | La tasa máxima de tráfico que entra en MediaLive. Este número incluye todo el tráfico recibido en MediaLive: entradas push, entradas pull, respuestas del sistema entrante de una entrada pull, respuestas del sistema saliente para cualquier salida y tráfico de instancia como resolución DNS y NTP. Incluso cuando un canal no está en proceso de ingesta, hay algo de tráfico.|
| **aws.medialive.network_in.minimum** <br>(gauge) | La tasa mínima de tráfico que llega a MediaLive. Este número incluye todo el tráfico recibido en MediaLive: entradas push, entradas pull, respuestas del sistema entrante de una entrada pull, respuestas del sistema saliente para cualquier salida y tráfico de instancia como resolución DNS y NTP. Incluso cuando un canal no está en proceso de ingesta, hay algo de tráfico.|
| **aws.medialive.network_out.maximum** <br>(gauge) | La tasa máxima de tráfico de salida de MediaLive. Este número incluye todo el tráfico enviado desde MediaLive: la salida de medios, las solicitudes HTTP GET para entradas pull, el tráfico NTP y el tráfico DNS. Incluso cuando un canal no está entregando salidas, hay algo de tráfico.|
| **aws.medialive.network_out.minimum** <br>(gauge) | La tasa mínima de tráfico que sale de MediaLive. Este número incluye todo el tráfico enviado desde MediaLive: la salida de medios, las solicitudes HTTP GET para entradas pull, el tráfico NTP y el tráfico DNS. Incluso cuando un canal no está entregando salidas, hay algo de tráfico.|
| **aws.medialive.output_audio_level_dbfs.maximum** <br>(gauge) | El nivel máximo de audio de salida en decibelios relativos a la escala completa (dBFS).|
| **aws.medialive.output_audio_level_dbfs.minimum** <br>(gauge) | El nivel mínimo de audio de salida en decibelios relativos a la escala completa (dBFS).|
| **aws.medialive.output_audio_level_lkfs.maximum** <br>(gauge) | El nivel máximo de audio de salida en volumen, ponderado K, relativo a la escala completa (LKFS).|
| **aws.medialive.output_audio_level_lkfs.minimum** <br>(gauge) | El nivel mínimo de audio de salida en sonoridad, ponderado K, relativo a la escala completa (LKFS).|
| **aws.medialive.output_video_frame_rate.maximum** <br>(rate) | Frecuencia de imagen máxima del vídeo de salida.|
| **aws.medialive.output_video_frame_rate.minimum** <br>(rate) | Frecuencia de imagen mínima del vídeo de salida.|
| **aws.medialive.pipelines_locked.maximum** <br>(gauge) | Valor máximo de un indicador de si los dos pipelines están sincronizados entre sí. Esta métrica solo se aplica a los canales estándar y solo a las salidas HLS, MediaPackage, Microsoft Smooth y UDP de ese canal. MediaLive utiliza el bloqueo de pipeline para garantizar que los dos pipelines estén sincronizados entre sí.|
| **aws.medialive.pipelines_locked.minimum** <br>(gauge) | Valor mínimo de un indicador de si los dos pipelines están sincronizados entre sí. Esta métrica solo se aplica a los canales estándar y solo a las salidas HLS, MediaPackage, Microsoft Smooth y UDP de ese canal. MediaLive utiliza el bloqueo de pipeline para garantizar que los dos pipelines están sincronizados entre sí.|
| **aws.medialive.primary_input_active.maximum** <br>(gauge) | Valor máximo de un indicador de si la entrada primaria en un par automático de conmutación por error de entrada está activa. Un valor de 1 significa que la entrada primaria está activa y, por tanto, en buen estado. Un valor de 0 significa que está inactiva.|
| **aws.medialive.primary_input_active.minimum** <br>(gauge) | Valor mínimo de un indicador de si la entrada primaria en un par automático de conmutación por error de entrada está activa. Un valor de 1 significa que la entrada primaria está activa y, por tanto, en buen estado. Un valor de 0 significa que está inactiva.|
| **aws.medialive.streaming.maximum** <br>(gauge) | El dispositivo está transmitiendo correctamente la señal de entrada a MediaLive (valor máximo en el tiempo).|
| **aws.medialive.streaming.minimum** <br>(gauge) | El dispositivo transmite correctamente la señal de entrada a MediaLive (valor mínimo en el tiempo).|
| **aws.medialive.temperature.maximum** <br>(gauge) | La temperatura máxima del dispositivo en grados Celsius. Consulta la documentación del dispositivo para conocer las condiciones de funcionamiento recomendadas.<br>_Se muestra en grados centígrados_ |
| **aws.medialive.temperature.minimum** <br>(gauge) | La temperatura mínima del dispositivo en grados Celsius. Consulta la documentación del dispositivo para conocer las condiciones de funcionamiento recomendadas.<br>_Se muestra en grados centígrados_ |
| **aws.medialive.using_hdmi.maximum** <br>(gauge) | Indica si HDMI es la entrada seleccionada actualmente para el dispositivo. Valor máximo durante el periodo de tiempo.|
| **aws.medialive.using_hdmi.minimum** <br>(gauge) | Indica si HDMI es la entrada seleccionada actualmente para el dispositivo. Valor mínimo durante el periodo de tiempo.|
| **aws.medialive.using_sdi.maximum** <br>(gauge) | Indica si SDI es la entrada seleccionada actualmente para el dispositivo. Valor máximo en el periodo de tiempo.|
| **aws.medialive.using_sdi.minimum** <br>(gauge) | Indica si SDI es la entrada seleccionada actualmente para el dispositivo. Valor mínimo en el periodo de tiempo.|

### Eventos

La integración de MediaLive no incluye ningún evento.

### Checks de servicio

La integración de MediaLive no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).