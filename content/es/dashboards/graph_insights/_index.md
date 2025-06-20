---
disable_toc: false
further_reading:
- link: /watchdog/insights/
  tag: Documentación
  text: Obtener más información sobre Watchdog Insights
title: Información de gráficos
---

## Información general

La información de gráficos puede ayudarte a encontrar posibles causas raíz de un problema observado mediante la búsqueda de otras métricas que exhibieron un comportamiento irregular en el mismo momento. Las correlaciones de métricas analizan tus métricas desde diferentes fuentes, como dashboards, integraciones, APM y métricas personalizadas.

## Correlaciones de métricas

<div class="alert alert-info">Las correlaciones de métricas se encuentran disponible para los <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de serie temporal</a> con la fuente de datos de la <strong>métrica</strong>.</div>

Para orientar la búsqueda de manera más eficaz, las correlaciones de métricas utilizan información sobre los dashboards y servicios relacionados. Las correlaciones pueden filtrar métricas desde varias fuentes, como APM, integraciones y dashboards, así como espacios de nombres de métricas arbitrarios que selecciones. Buscan irregularidades en otras métricas durante el período de tiempo correspondiente, lo que permite que Datadog proporcione automáticamente pistas que faciliten un análisis de causa raíz más eficiente.

Para más información, consulta la documentación [Correlaciones de métricas][1].

## Watchdog Explains

<div class="alert alert-info">Watchdog Explains está disponible para los <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de Timeseries</a> con la fuente de datos de <strong>métricas</strong>.</div>

Datadog recopila distintos tipos de datos para brindar información sobre el rendimiento de las aplicaciones, incluidas métricas, trazas (traces) y logs que te indican qué sucede, cómo y por qué. Watchdog Explains analiza tendencias de alto nivel, como latencia, tasas de error o evolución del recuento de solicitudes, para detectar señales críticas. Al observar un pico en estos gráficos, Watchdog Explains ayuda a investigar las preguntas inmediatas:
- ¿Cuál es el origen del pico?
- ¿Esta anomalía afecta a todos o es un incidente aislado?

Para obtener más información, consulta la documentación de [Watchdog Explains][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/graph_insights/correlations/
[2]: /es/dashboards/graph_insights/watchdog_explains/