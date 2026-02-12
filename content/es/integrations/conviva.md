---
app_id: conviva
categories:
- métricas
custom_kind: integración
description: Recopila métricas de MetricLens de calidad en Conviva.
title: Conviva
---
## Información general

Conecta Datadog con tu cuenta de Conviva para ver tus métricas de calidad de la experiencia (QoE) de MetricLens.

## Configuración

### Instalación

Instala la integración con el [cuadro de integración de Conviva] de Datadog (https://app.datadoghq.com/integrations/conviva).

### Configuración

1. Ve a la pestaña de configuración dentro del [cuadro de integración de Conviva] de Datadog (https://app.datadoghq.com/integrations/conviva).
1. Haz clic en **Add New Credentials** (Añadir nuevas credenciales) e introduce tu clave de API Conviva y tu secreto de API. Datadog busca cuentas asociadas a esas credenciales.
1. Una vez que Datadog encuentre las cuentas asociadas a tus credenciales, añade un MetricLens para determinar qué métricas se ingerirán en Datadog. Especifica un nombre para el MetricLens junto con un Filtro y una Dimensión. El nombre de ese MetricLens específico se etiqueta automáticamente.
1. También puedes añadir etiquetas (tags) a MetricLenses específicos o a cuentas. Cuando se añade una etiqueta a una cuenta, esa etiqueta se aplica a todos los MetricLenses asociados a esa cuenta.
1. Añade más MetricLenses haciendo clic en **Add New** (Añadir nuevo) y siguiendo las instrucciones.
1. Repite estos pasos con cualquier otra credencial de Conviva, utilizando el botón **Add New Credentials** (Añadir nuevas credenciales).

### Dashboard

Después de configurar la integración, utiliza el dashboard predefinido de Conviva para obtener una visión general de las métricas del MetricLens. Por defecto, se muestran todas las métricas recopiladas de todos los MetricLenses.

{{< img src="integrations/conviva/conviva_dashboard.png" alt="Dashboard predefinido de la integración Conviva" popup="true" style="width:100%" >}}

Filtra por `metriclens` para ver el desglose de las métricas por cada MetricLens correspondiente configurado en el cuadro. Filtra por `dimension` para ver las métricas de una sola entidad de dimensión.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **conviva.quality.total_attempts** <br>(count) | El número total de intentos de reproducción en el intervalo.<br>_Se muestra como intento_ |
| **conviva.quality.video_start_failures_percentage** <br>(gauge) | El porcentaje de fallos de inicio de vídeo en el intervalo.<br>_Se muestra como porcentaje_ |
| **conviva.quality.exit_before_video_start_percentage** <br>(gauge) | El porcentaje de salidas antes de que comience el vídeo en el intervalo.<br>_Se muestra como porcentaje_ |
| **conviva.quality.plays** <br>(count) | El número de reproducciones en el intervalo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.video_startup_time_s** <br>(gauge) | El tiempo de inicio del vídeo en segundos.<br>_Se muestra como segundo_ |
| **conviva.quality.rebuffering_ratio_percentage** <br>(gauge) | El porcentaje de recargas de vídeo rechazadas.<br>_Se muestra como porcentaje_ |
| **conviva.quality.average_bitrate_kbps** <br>(gauge) | La tasa de bits media en kilobits por segundo.|
| **conviva.quality.video_playback_failures_percentage** <br>(gauge) | El porcentaje de vídeos con fallos de reproducción.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ended_plays** <br>(count) | El número de reproducciones finalizadas.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.connection_induced_rebuffering_ratio_percentage** <br>(gauge) | El porcentaje de tasas de recargas inducidas por conexión.<br>_Se muestra como porcentaje_ |
| **conviva.quality.video_restart_time** <br>(gauge) | El número de segundos para reiniciar el vídeo.<br>_Se muestra como segundo_ |
| **conviva.quality.video_start_failures_technical_percentage** <br>(gauge) | El porcentaje de fallos de arranque desde una perspectiva técnica.<br>_Se muestra como porcentaje_ |
| **conviva.quality.video_start_failures_business_percentage** <br>(gauge) | El porcentaje de fallos de arranque desde el punto de vista empresarial.<br>_Se muestra como porcentaje_ |
| **conviva.quality.video_playback_failures_technical_percentage** <br>(gauge) | El porcentaje de fallos de reproducción desde un punto de vista técnico.<br>_Se muestra como porcentaje_ |
| **conviva.quality.video_playback_failures_business_percentage** <br>(gauge) | El porcentaje de fallos de reproducción desde una perspectiva empresarial.<br>_Se muestra como porcentaje_ |
| **conviva.quality.concurrent_plays** <br>(count) | El número de reproducciones concurrentes en este intervalo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.abandonment_count** <br>(count) | Número total de intentos de reproducción abandonados por los usuarios debido a retrasos o errores.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.abandonment_percentage** <br>(gauge) | Porcentaje de intentos de reproducción abandonados respecto al total de intentos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.abandonment_without_pre_roll_percentage** <br>(gauge) | El porcentaje de abandono en sesiones sin anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.abandonment_with_pre_roll_percentage** <br>(gauge) | El porcentaje de abandono que se produce en sesiones con anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ad_actual_duration** <br>(gauge) | Duración total de los anuncios reproducidos, dividida por el número de anuncios.<br>_Se muestra como segundo_ |
| **conviva.quality.ad_attempts_count** <br>(count) | Número total de intentos de búsqueda de anuncios.<br>_Se muestra como intento_ |
| **conviva.quality.ad_bitrate_bps** <br>(gauge) | La tasa media de bits de la reproducción de anuncios, medida en bits por segundo.<br>_Se muestra como bit_ |
| **conviva.quality.ad_completed_creative_plays** <br>(count) | El número de anuncios reproducidos hasta su finalización.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ad_concurrent_plays_count** <br>(count) | Recuento de reproducciones simultáneas de anuncios en un momento dado.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ad_connection_induced_rebuffering_ratio** <br>(gauge) | Proporción de recargas de anuncios causados por problemas de conexión.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ad_ended_plays_count** <br>(count) | El número de anuncios que se han reproducido completamente en el intervalo actual.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ad_ended_plays_per_unique_device** <br>(gauge) | El recuento de reproducciones de anuncios finalizadas dividido por el número de dispositivos únicos.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ad_framerate_fps** <br>(gauge) | La frecuencia de imagen media de los anuncios, en imágenes por segundo.|
| **conviva.quality.ad_impressions_count** <br>(count) | El número total de anuncios que se iniciaron con éxito.|
| **conviva.quality.ad_impressions_percentage** <br>(gauge) | Porcentaje de intentos de anuncios que se inician con éxito.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ad_minutes_played_count** <br>(count) | El total de minutos de contenido de anuncios reproducido en todas las sesiones.<br>_Se muestra como minuto_ |
| **conviva.quality.ad_minutes_played_per_ended_play** <br>(gauge) | Promedio de minutos de anuncios reproducidos por sesión de anuncios finalizada.<br>_Se muestra como minuto_ |
| **conviva.quality.ad_minutes_played_per_unique_device** <br>(gauge) | Promedio de minutos de anuncios reproducidos por dispositivo único con anuncios reproducidos.<br>_Se muestra como minuto_ |
| **conviva.quality.ad_percentage_complete_percentage** <br>(gauge) | El porcentaje de contenido del anuncio visto en relación con su longitud total.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ad_rebuffering_ratio** <br>(gauge) | Porcentaje de tiempo de visualización del anuncio durante el cual los espectadores experimentaron una recarga.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ad_unique_devices_count** <br>(count) | Recuento de dispositivos únicos que han reproducido al menos un anuncio.<br>_Se muestra como dispositivo_ |
| **conviva.quality.ad_video_playback_failures_count** <br>(count) | El recuento total de fallos de reproducción de anuncios.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ad_video_playback_failures_percentage** <br>(gauge) | Porcentaje de sesiones de anuncios que terminan en fallo de reproducción.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ad_video_restart_time** <br>(gauge) | El tiempo que se tarda en reiniciar la reproducción del anuncio tras la interrupción, en segundos.<br>_Se muestra como segundo_ |
| **conviva.quality.ad_video_start_failures_count** <br>(count) | Número total de intentos fallidos de iniciar la reproducción del anuncio.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ad_video_start_failures_percentage** <br>(gauge) | El porcentaje de intentos de inicio de anuncios que fallaron.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ad_video_start_time** <br>(gauge) | El tiempo transcurrido desde la solicitud de anuncio hasta el inicio de la reproducción del anuncio, en segundos.<br>_Se muestra como segundo_ |
| **conviva.quality.attempts_without_pre_roll_count** <br>(count) | Recuento de intentos de reproducción de vídeo sin anuncios previos.<br>_Se muestra como intento_ |
| **conviva.quality.attempts_without_pre_roll_percentage** <br>(gauge) | El porcentaje de intentos de reproducción de vídeo sin anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.attempts_with_pre_roll_count** <br>(count) | Recuento de intentos de reproducción de vídeo que incluyeron anuncios previos.<br>_Se muestra como intento_ |
| **conviva.quality.attempts_with_pre_roll_percentage** <br>(gauge) | El porcentaje de intentos de reproducción de vídeo con anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.bad_session_count** <br>(count) | El recuento de sesiones que experimentan una calidad de reproducción de vídeo deficiente.<br>_Se muestra como sesión_ |
| **conviva.quality.bad_session_percentage** <br>(gauge) | Porcentaje de sesiones con mala calidad de reproducción de vídeo.<br>_Se muestra como porcentaje_ |
| **conviva.quality.bad_session_average_life_playing_time_mins** <br>(gauge) | Tiempo medio de reproducción de las sesiones con mala calidad de reproducción de vídeo, en minutos.<br>_Se muestra como minuto_ |
| **conviva.quality.bad_unique_devices_count** <br>(count) | Recuento de dispositivos únicos que experimentan una calidad de reproducción de vídeo deficiente.<br>_Se muestra como dispositivo_ |
| **conviva.quality.bad_unique_devices_percentage** <br>(gauge) | Porcentaje de dispositivos que experimentan una calidad de reproducción de vídeo deficiente.<br>_Se muestra como porcentaje_ |
| **conviva.quality.bad_unique_viewers_count** <br>(count) | Recuento de espectadores únicos que experimentan una calidad de reproducción de vídeo deficiente.|
| **conviva.quality.bad_unique_viewers_percentage** <br>(gauge) | Porcentaje de espectadores que experimentan una mala calidad de reproducción de vídeo.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ended_plays_per_unique_device** <br>(gauge) | Relación entre reproducciones de vídeo finalizadas y dispositivos únicos que reprodujeron vídeos.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ended_plays_with_ads_count** <br>(count) | El recuento de reproducciones de vídeo que finalizaron e incluyeron anuncios.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ended_plays_with_ads_percentage** <br>(gauge) | Porcentaje de reproducciones de vídeo que finalizaron e incluyeron anuncios.<br>_Se muestra como porcentaje_ |
| **conviva.quality.ended_plays_without_ads_count** <br>(count) | El recuento de reproducciones de vídeo que finalizaron sin incluir anuncios.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.ended_plays_without_ads_percentage** <br>(gauge) | Porcentaje de reproducciones de vídeo que finalizaron sin incluir anuncios.<br>_Se muestra como porcentaje_ |
| **conviva.quality.exit_before_video_starts_count** <br>(count) | El número total de salidas antes de que comience la reproducción de vídeo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.exits_before_ad_start_count** <br>(count) | El recuento de salidas que se producen antes de que comience la reproducción del anuncio.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.exits_before_ad_start_percentage** <br>(gauge) | El porcentaje de salidas que se producen antes de que comience la reproducción del anuncio.<br>_Se muestra como porcentaje_ |
| **conviva.quality.exits_during_pre_roll_count** <br>(count) | El recuento de salidas que se producen durante la fase de anuncios previos.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.exits_during_pre_roll_percentage** <br>(gauge) | El porcentaje de salidas que se producen durante la fase de anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.framerate_fps** <br>(gauge) | La frecuencia media de fotogramas de la reproducción de vídeo, en fotogramas por segundo.|
| **conviva.quality.good_session_count** <br>(count) | El recuento de sesiones que experimentan una buena calidad de reproducción de vídeo.<br>_Se muestra como sesión_ |
| **conviva.quality.good_session_average_life_playing_time_mins** <br>(gauge) | Tiempo medio de reproducción de las sesiones con buena calidad de reproducción de vídeo, en minutos.<br>_Se muestra como minuto_ |
| **conviva.quality.good_unique_devices_count** <br>(count) | El recuento de dispositivos únicos que experimentan una buena calidad de reproducción de vídeo.<br>_Se muestra como dispositivo_ |
| **conviva.quality.good_unique_viewers_count** <br>(count) | El recuento de espectadores únicos que experimentan una buena calidad de reproducción de vídeo.|
| **conviva.quality.high_rebuffering_count** <br>(count) | El recuento de sesiones de reproducción de vídeo con alta recarga.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.high_rebuffering_percentage** <br>(gauge) | Porcentaje de sesiones de reproducción de vídeo con alta recarga.<br>_Se muestra como porcentaje_ |
| **conviva.quality.high_rebuffering_with_ads_percentage** <br>(gauge) | Porcentaje de sesiones de reproducción de anuncios con una alta recarga.<br>_Se muestra como porcentaje_ |
| **conviva.quality.high_rebuffering_without_ads_percentage** <br>(gauge) | Porcentaje de sesiones de reproducción excluidas por publicidad con alta recarga.<br>_Se muestra como porcentaje_ |
| **conviva.quality.high_startup_time_count** <br>(count) | Recuento de sesiones de reproducción de vídeo con un tiempo de arranque elevado.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.high_startup_time_percentage** <br>(gauge) | Porcentaje de sesiones de reproducción de vídeo con un tiempo de arranque elevado.<br>_Se muestra como porcentaje_ |
| **conviva.quality.high_startup_time_without_pre_roll_percentage** <br>(gauge) | Porcentaje de sesiones con un tiempo de inicio elevado, excluyendo los anuncios previos.<br>_Se muestra en porcentaje_ |
| **conviva.quality.high_startup_time_with_pre_roll_percentage** <br>(gauge) | Porcentaje de sesiones con un tiempo de inicio elevado, incluidos los anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.interval_minutes_played_count** <br>(count) | El total de minutos de reproducción de vídeo en un intervalo especificado.<br>_Se muestra como minuto_ |
| **conviva.quality.low_bitrate_count** <br>(count) | El recuento de sesiones de reproducción de vídeo con baja tasa de bits.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.low_bitrate_percentage** <br>(gauge) | El porcentaje de sesiones de reproducción de vídeo con tasa de bits baja.<br>_Se muestra como porcentaje_ |
| **conviva.quality.low_bitrate_with_ads_percentage** <br>(gauge) | Porcentaje de sesiones de reproducción con publicidad incluida con una tasa de bits baja.<br>_Se muestra como porcentaje_ |
| **conviva.quality.low_bitrate_without_ads_percentage** <br>(gauge) | Porcentaje de sesiones de reproducción excluidas por anuncio con tasa de bits baja.<br>_Se muestra como porcentaje_ |
| **conviva.quality.minutes_played_count** <br>(count) | El recuento total de minutos reproducidos en las sesiones de vídeo.<br>_Se muestra como minuto_ |
| **conviva.quality.minutes_played_per_ended_play** <br>(gauge) | Media de minutos reproducidos por sesión de vídeo finalizada.<br>_Se muestra como minuto_ |
| **conviva.quality.minutes_played_per_unique_device** <br>(gauge) | Media de minutos de vídeo reproducidos por dispositivo único.<br>_Se muestra como minuto_ |
| **conviva.quality.non_zero_cirr_ended_plays_count** <br>(count) | Recuento de reproducciones finalizadas con un ratio de recarga iniciada por el cliente (CIRR) distinto de cero.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.non_zero_cirr_ended_plays_percentage** <br>(gauge) | Porcentaje de reproducciones finalizadas con un ratio de recarga iniciada por el cliente (CIRR) distinto de cero.<br>_Se muestra como porcentaje_ |
| **conviva.quality.percentage_complete_percentage** <br>(gauge) | Porcentaje de reproducciones de vídeo completadas en el total de reproducciones.<br>_Se muestra como porcentaje_ |
| **conviva.quality.plays_percentage** <br>(gauge) | Porcentaje de reproducciones totales en comparación con el total de reproducciones posibles.<br>_Se muestra como porcentaje_ |
| **conviva.quality.spi_streams_count** <br>(count) | Recuento de transmisiones que contribuyen al Índice de Rendimiento de Transmisión (SPI).|
| **conviva.quality.spi_unique_devices_count** <br>(count) | Recuento de dispositivos únicos que contribuyen al Índice de Rendimiento de Transmisión (SPI).<br>_Se muestra como dispositivo_ |
| **conviva.quality.spi_unique_viewers_count** <br>(count) | Recuento de espectadores únicos que contribuyen al Índice de Rendimiento de Transmisión (SPI).|
| **conviva.quality.streaming_performance_index** <br>(gauge) | Un índice compuesto que representa el rendimiento general de la transmisión.|
| **conviva.quality.unique_devices_count** <br>(count) | Recuento de dispositivos únicos utilizados para la reproducción de vídeo.<br>_Se muestra como dispositivo_ |
| **conviva.quality.video_playback_failures_count** <br>(count) | Recuento total de fallos de reproducción de vídeo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.video_playback_failures_business_count** <br>(count) | Recuento de fallos de reproducción de vídeo relacionados con la empresa.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.video_playback_failures_tech_count** <br>(count) | Recuento de fallos técnicos de reproducción de vídeo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.video_playback_failures_tech_with_ads_percentage** <br>(gauge) | Porcentaje de fallos de reproducción relacionados con aspectos técnicos en sesiones con anuncios.<br>_Se muestra como porcentaje_ |
| **conviva.quality.video_playback_failures_tech_without_ads_percentage** <br>(gauge) | Porcentaje de fallos de reproducción relacionados con aspectos técnicos en sesiones sin anuncios.<br>_Se muestra como porcentaje_ |
| **conviva.quality.video_start_failures_count** <br>(count) | Recuento total de fallos al iniciar la reproducción de vídeo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.video_start_failures_business_count** <br>(count) | Recuento de fallos relacionados con la empresa para iniciar la reproducción de vídeo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.video_start_failures_tech_count** <br>(count) | Recuento de fallos técnicos para iniciar la reproducción de vídeo.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.video_start_failures_tech_without_pre_roll_percentage** <br>(gauge) | Porcentaje de fallos técnicos de arranque sin anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.video_start_failures_tech_with_pre_roll_percentage** <br>(gauge) | Porcentaje de fallos técnicos de inicio con anuncios previos.<br>_Se muestra como porcentaje_ |
| **conviva.quality.zero_cirr_ended_plays_count** <br>(count) | Recuento de reproducciones finalizadas con un ratio de recarga iniciada por el cliente (CIRR) de cero.<br>_Se muestra como ocurrencia_ |
| **conviva.quality.zero_cirr_ended_plays_percentage** <br>(gauge) | Porcentaje de reproducciones finalizadas con un ratio de recargas iniciadas por el cliente (CIRR) de cero.<br>_Se muestra en porcentaje_ |

### Eventos

La integración de Conviva envía alertas a tu [flujo de eventos de Datadog](https://docs.datadoghq.com/events/).

{{< img src="integrations/conviva/conviva_eventstream.png" alt="Alertas de monitor de Conviva en el flujo de eventos de Datadog" popup="true" style="width:100%" >}}

### Checks de servicio

La integración Conviva no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de Conviva con Datadog](https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/)