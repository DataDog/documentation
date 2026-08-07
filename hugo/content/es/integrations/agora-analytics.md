---
aliases:
- /es/integrations/agora_analytics
app_id: agora-analytics
categories:
- colaboración
custom_kind: integración
description: Ver métricas del recopilador de Agora Analytics en Datadog
integration_version: 1.0.0
media:
- caption: 'Información general de Agora Analytics: dashboard'
  image_url: images/agora_analytics_dashboard.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Agora Analytics
---
## Información general

Agora Analytics rastrea e interpreta el uso, la calidad y el rendimiento del chat, la voz en tiempo real y el vídeo. Analytics es una extensión para Voice Calling, Video Calling, Interactive Live Streaming y el chat de Agora que ayuda a localizar problemas de calidad, encontrar las causas raíz y solucionar problemas para mejorar la experiencia del usuario final.

Esta integración envía métricas incluyendo datos de uso, calidad y rendimiento directamente a tu cuenta de Datadog.

## Configuración

Consulta la [documentación] de integración de Agora Analytics (https://docs.agora.io/en/agora-analytics/analyze/video-voice-sdk/datadog-integration) para obtener información detallada sobre la configuración del Agora Analytics Datadog Connector.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **agora.rtc.app_id.online_user** <br>(count) | Número de usuarios en línea.|
| **agora.rtc.app_id.online_channel** <br>(count) | Número de canales en línea.|
| **agora.rtc.app_id.audio_freeze_rate** <br>(rate) | Tasa de congelación de audio.|
| **agora.rtc.app_id.video_freeze_rate** <br>(rate) | Tasa de congelación de vídeo.|
| **agora.rtc.app_id.network_delay_rate** <br>(rate) | Tasa de retardo de la red.|
| **agora.rtc.app_id.join_attempt** <br>(count) | Número de intentos de unión.|
| **agora.rtc.app_id.join_success_count** <br>(count) | Número de uniones correctas.|
| **agora.rtc.app_id.join_success_rate** <br>(rate) | Tasa de éxito de las uniones.|
| **agora.rtc.app_id.join_success_in_5s_rate** <br>(rate) | Porcentaje de éxito de la unión en 5 segundos.|
| **agora.chat.group.total** <br>(count) | Total de grupos de chat.|
| **agora.chat.group.new** <br>(count) | Nuevos grupos de chat diarios.|
| **agora.chat.group.disbanded** <br>(count) | Grupos de chat disueltos diariamente.|
| **agora.chat.group.active** <br>(count) | Grupos de chat activos a diario.|
| **agora.chat.room.total** <br>(count) | Total de salas de chat.|
| **agora.chat.room.new** <br>(count) | Nuevas salas de chat diarias.|
| **agora.chat.room.disbanded** <br>(count) | Salas de chat disueltas diariamente.|
| **agora.chat.room.active** <br>(count) | Salas de chat activas a diario.|
| **agora.chat.room.pcu** <br>(count) | Pico diario de la sala de chat de los usuarios actuales.|
| **agora.chat.user.total** <br>(count) | Total de usuarios registrados.|
| **agora.chat.user.dnu** <br>(count) | Nuevos usuarios diarios.|
| **agora.chat.user.dau** <br>(count) | Usuarios activos diarios.|
| **agora.chat.user.maxdau** <br>(count) | Máximo mensual de usuarios activos diarios.|

### Eventos

Agora Analytics no incluye ningún evento.

### Checks de servicio

Agora Analytics no incluye ningún check de servicio.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de Agora](mailto:support@agora.io).