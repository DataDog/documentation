---
further_reading:
- link: service_management/events/correlation/triage_and_notify
  tag: Documentación
  text: Más información sobre la clasificación y notificación de casos
title: Correlación inteligente
---

## Información general

La correlación inteligente utiliza un enfoque de modelización de Machine Learning. Correlaciona automáticamente eventos de monitor de Datadog, utilizando la telemetría subyacente recopilada en Datadog y otros heurísticos.
## Activar la correlación inteligente

Para empezar:
1. Ve a la página [Ajustes de correlación][1] y haz clic en [Preview Cases][2] (Previsualizar casos).
1. Desde ahí, puedes previsualizar las correlaciones inteligentes que se crean desde tu organización.


{{< img src="service_management/events/correlation/intelligent/intelligent_config_updated.png" alt="Configurar la correlación inteligente" style="width:100%;" >}}


## Recibir tu primer caso

{{< img src="service_management/events/correlation/intelligent/intelligent_project.png" alt="Gestión de eventos - Correlación inteligente" style="width:100%;" >}}

Cuando estés en [Correlaciones de eventos][3], busca un proyecto llamado **Correlación Inteligente**. Desde este proyecto, puedes ver los casos creados por la correlación inteligente. 

La correlación inteligente genera casos automáticamente después de encontrar alertas relacionadas:
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="Página de detalles de casos del caso creado a partir de la correlación inteligente, donde se muestra las alertas relacionadas en la pestaña Investigación" style="width:100%;" >}}




## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new?tab=intelligent
[3]: https://app.datadoghq.com/event/correlation