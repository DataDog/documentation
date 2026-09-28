---
description: Descubra las posibles causas raíz utilizando Metric Correlations, Watchdog
  Explains y la detección de anomalía en los tableros para analizar el comportamiento
  irregular de las métricas.
disable_toc: false
further_reading:
- link: /watchdog/insights/
  tag: Documentación
  text: Obtenga más información sobre Watchdog Insights
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: Blog
  text: 'Detección de anomalías, correlaciones predictivas: uso de monitoreo de métricas
    asistido por IA'
title: Graph Insights
---
## Descripción general {#overview}

Graph Insights puede ayudarle a encontrar posibles causas raíz de un problema observado mediante la búsqueda de otras métricas que mostraron un comportamiento irregular aproximadamente al mismo tiempo. Metric Correlations analiza sus métricas de diferentes fuentes, como tableros, integraciones, APM y métricas personalizadas.

## Metric Correlations {#metric-correlations}

<div class="alert alert-info">Metric Correlations está disponible para <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de series temporales</a> con la fuente de datos <strong>Metric</strong>.</div>

Para dirigir la búsqueda de manera más efectiva, Metric Correlations utiliza información sobre tableros y servicios relacionados. Las correlaciones pueden examinar métricas de diversas fuentes, incluyendo APM, integraciones y tableros, así como espacios de nombres de métricas arbitrarios que usted seleccione. Busca irregularidades en otras métricas durante el período de tiempo correspondiente, lo que permite a Datadog proporcionar automáticamente pistas que facilitan un análisis de causa raíz más eficiente.

Para obtener más información, consulte la documentación de [Metric Correlations][1].

## Watchdog Explains {#watchdog-explains}

<div class="alert alert-info">Watchdog Explains está disponible para <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de series temporales</a> con la fuente de datos <strong>Metric</strong>.</div>

Datadog recopila varios tipos de datos para proporcionar información sobre el rendimiento de las aplicaciones, incluyendo métricas, trazas y registros, los cuales le indican qué, cómo y por qué está sucediendo algo. Watchdog Explains analiza tendencias de alto nivel como la latencia, las tasas de error o la evolución del recuento de solicitudes para detectar señales críticas. Al observar un pico en estos gráficos, Watchdog Explains le ayuda a investigar las preguntas inmediatas:
- ¿Cuál es la fuente del pico?
- ¿Esta anomalía afecta a todos o es un incidente aislado?

Para obtener más información, consulte la documentación de [Watchdog Explains][2].

## Detección de anomalías en los tableros {#dashboard-anomaly-detection}

<div class="alert alert-info">La detección de anomalías está disponible para <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de series temporales</a> con la fuente de datos <strong>Metric</strong> data source.</div>

Datadog detecta anomalías en los gráficos de sus tableros y agrupa aquellas que ocurren juntas en incidentes. Para cada incidente, Datadog identifica las etiquetas que más contribuyen a la anomalía. Puede analizar un solo gráfico con Watchdog Explains o delegar el análisis de causa raíz a Bits Investigation.

Para obtener más información, consulte [Investigar anomalías en los tableros][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/graph_insights/correlations/
[2]: /es/dashboards/graph_insights/watchdog_explains/
[3]: /es/dashboards/graph_insights/investigate_anomalies/