---
aliases:
- /es/graphing/correlations/
- /es/dashboards/correlations/
further_reading:
- link: /watchdog/insights/
  tag: Documentación
  text: Más información sobre Watchdog Insights
title: Watchdog Explains
---

## Información general

{{<callout url="https://www.datadoghq.com/private-beta/watchdog-explains-graph-insights/" header="Access the Preview!">}}
Watchdog Explains está disponible en vista previa. Para solicitar acceso, rellena el formulario.
{{</callout >}}

<div class="alert alert-info">Watchdog Explains está disponible para los <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de series temporale</a> con la fuente de datos de <strong>métricas</strong>.</div>

{{< img src="dashboards/graph_insights/watchdog_explains/watchdog_explains_walkthrough.mp4" alt="Una demostración del producto Watchdog Explains" video=true >}}

Watchdog Explains es un asistente de investigación que te guía hasta la causa raíz de las anomalías en cualquier gráfico de series temporales. 

En Datadog, una investigación suele comenzar con gráficos y luego se ramifica para investigar activos individuales. Watchdog Explains hace que las investigaciones sean más eficientes al mostrar automáticamente qué cuenta individual de etiquetas (tags) podría ser responsable de un pico determinado. Esto te permite centrar tu investigación en áreas problemáticas de la infraestructura o el stack tecnológico de software.

## ¿Cómo funciona?

1. **Watchdog Explains ejecuta la detección anomalías** y determina si la forma o el valor del gráfico han cambiado con respecto al patrón histórico. Analiza los gráficos basados en métrica en busca de anomalías y disecciona anomalía para mostrar qué etiquetas (tags) son responsables. 

2. **A continuación, ejecuta la misma consulta filtrada en cada grupo de etiquetas aplicable**. Compara los mismos datos de series temporales en cada grupo de etiquetas aplicable con el gráfico de origen para identificar cuáles representan ese comportamiento anómalo. 
   - Si la forma de un gráfico cambia de manera significativa al eliminar un grupo individual de etiquetas, infiere que es muy probable que la etiqueta sea la causa del pico. 
   - Watchdog Explains te muestra pruebas para cuantificar exactamente la influencia de una determinada etiqueta.


## Investigar anomalías

Inicia tu investigación desde cualquier gráfico de métricas de series temporales. Abre un gráfico en pantalla completa para activar Watchdog Explains.

{{< img src="dashboards/graph_insights/watchdog_explains/graph_anomaly_detection.png" alt="Watchdog Explains destaca las partes anómalas de un gráfico en función de datos históricos" style="width:90%;" >}}

Watchdog Explains destaca las anomalías con un recuadro rosa. En el panel lateral derecho, puedes ver las etiquetas responsables del pico. Haz clic en una etiqueta para ver pruebas de cómo contribuye a la forma del gráfico.

{{< img src="dashboards/graph_insights/watchdog_explains/graph_filter_tag.png" alt="Filtrar la etiqueta incorrecta, en este caso researcher-query, para comparar el original con el gráfico sin la etiqueta incorrecta" style="width:90%;" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}