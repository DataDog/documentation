---
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentación
  text: Métricas personalizadas
- link: /metrics/guide/custom_metrics_governance/
  tag: Documentación
  text: Prácticas recomendadas para la gobernanza de métricas personalizadas
private: true
title: Eventos generados a partir de métricas con límites de tasas
---

## Información general

Enviar métricas a Datadog con un gran número de valores únicos de etiquetas (tags) en una clave determinada puede dar lugar a una [cardinalidad][1] elevada. En la mayoría de los casos, esto se debe a que las etiquetas no tienen límites.

Los envíos sin límites y las etiquetas de alta cardinalidad pueden afectar el rendimiento y la estabilidad de tu cuenta. Para proteger tu cuenta, Datadog monitoriza los aumentos en las métricas y te notifica cuando estos envíos tienen límites de tasa.

En esta guía, se explica lo siguiente:
- Eventos con límites de tasa
- Monitorización de eventos e identificación de métricas con límites de tasa
- Gestión de etiquetas sin límites y eliminación de las limitaciones de tasa de las métricas


## Eventos de límites de tasa de Datadog

{{< img src="/metrics/guide/rate_limit/rate_limit_events.png" alt="Eventos de límites de tasa en el explorador de eventos con un evento de ejemplo en el panel lateral de detalles" style="width:100%;" >}}

Cuando Datadog detecta un aumento de la cardinalidad, antes de que se aplique ningún límite de tasa, se crea un [evento][2] de advertencia. Si la cardinalidad de las métricas sigue aumentando, es posible que se aplique un límite de tasa. Si la métrica tiene un límite de tasa, se genera un segundo evento con la indicación de que se ha puesto un límite de tasa. Puedes ver estos eventos en el [Explorador de eventos][3]. 

<div class="alert alert-danger">Datadog no envía una notificación por cada evento de límite de tasa subsiguiente. Como práctica recomendada, crea un monitor de eventos para enviar alertas cuando las métricas se limiten en el futuro.</div>

## Monitorizar eventos de límites de tasa

Un [Monitor de eventos][3] puede configurarse para enviar una notificación sobre cualquier evento de límite de tasa. 

1. Define la consulta de la siguiente manera: 
   ```
   tags:metric-rate-limit source:datadog
   ```
1. Establece el umbral de alerta como `above or equal to 1`.  
1. En el mensaje del monitor, configura los destinatarios a los que se notificará cuando se active el monitor. 

{{< img src="/metrics/guide/rate_limit/event_monitor_config.png" alt="Configuración del monitor de eventos para un evento de límite de tasa" style="width:90%;" >}}

## Qué hacer con las etiquetas sin límites

Para eliminar el límite de tasa, tienes que revisar las etiquetas sin límites que se muestran en el evento. En primer lugar, determina si todos los valores de etiquetas que se muestran en el evento son necesarios. Luego, ajusta el envío de métricas de modo que se incluyan solo las etiquetas que aporten información importante.

Para obtener más información, consulta la guía [Prácticas recomendadas para la gobernanza de métricas personalizadas][4].

## Enviar una solicitud para eliminar el límite de tasa

<div class="alert alert-danger">Solo un administrador de Datadog puede solicitar la eliminación de un límite de tasa de métricas. Si no eres administrador, asegúrate de incluir a un administrador en el ticket de soporte que pueda confirmar la solicitud.</div>

Después de hacer los cambios para eliminar las etiquetas sin límites, envía una solicitud al [Soporte de Datadog][5] para eliminar el límite de tasa. En la solicitud, facilita la siguiente información: 
- Nombre de la métrica con el límite de tasa 
- Enlace al evento de límite de tasa en la plataforma del evento
- Confirmación de que se eliminaron las etiquetas sin límites mediante un cambio en la configuración


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/billing/custom_metrics/?tab=countrate#effect-of-adding-tags
[2]: https://docs.datadoghq.com/es/service_management/events/
[3]: https://docs.datadoghq.com/es/monitors/types/event/
[4]: https://docs.datadoghq.com/es/metrics/guide/custom_metrics_governance/
[5]: https://docs.datadoghq.com/es/help/