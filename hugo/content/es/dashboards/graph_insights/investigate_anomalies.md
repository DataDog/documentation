---
description: Detecte y agrupe automáticamente anomalías en los gráficos de un dashboard,
  identifique las etiquetas que contribuyen a ellas y delegue el análisis de causa
  raíz a Bits Investigation.
further_reading:
- link: /dashboards/graph_insights/watchdog_explains/
  tag: Documentación
  text: Analice una sola anomalía con Watchdog Explains
- link: /bits_ai/bits_investigation/
  tag: Documentación
  text: Aprenda cómo Bits Investigation analiza la causa raíz
site_support_id: dashboard_anomaly_detection
title: Investigue anomalías en el Dashboard
---
## Descripción general {#overview}

Datadog detecta anomalías en los gráficos de series temporales de su dashboard, agrupa las anomalías concurrentes en problemas e identifica las etiquetas que más contribuyen a cada una. Desde una anomalía, puede limitar la causa en un solo gráfico con [Watchdog Explains][2], o delegar el análisis de causa raíz a [Bits Investigation][1].

<div class="alert alert-info">La detección de anomalías está disponible para <a href="/dashboards/widgets/timeseries/">widgets de series temporales</a> con datos {{< ui >}}Metrics{{< /ui >}} (<code>avg</code>, <code>sum</code>, <code>min</code>, y <code>max</code> agregación). Los widgets que utilizan funciones como <code>cumsum</code>, <code>anomalies</code>, o <code>outliers</code> no son elegibles.</div>

La detección se ejecuta cuando abre un dashboard y las incidencias aparecen en unos 20 segundos. Si Datadog no detecta anomalías, el menú {{< ui >}}Investigate{{< /ui >}} y los controles descritos en esta página no aparecen.

Datadog no ejecuta la detección de anomalías en:

- Dashboards públicos (compartidos), porque no hay un visor con sesión iniciada que pueda actuar sobre un resultado
- Dashboards integrados en la aplicación móvil
- Dashboards en modo TV
- Dashboards en modo de impresión
- Dashboards donde desactivó {{< ui >}}Auto-detect issues{{< /ui >}}

## Cómo detecta anomalías Datadog {#how-datadog-detects-anomalies}

Datadog aplica la detección de anomalías a los gráficos de su dashboard analizando tanto la forma como el valor de las series temporales subyacentes. Identifica desviaciones de los patrones históricos, marcando picos, caídas o derivas graduales que no se alinean con el comportamiento esperado.

Para tener en cuenta la estacionalidad, el algoritmo analiza hasta tres semanas atrás. Por ejemplo, si aparece un pico un lunes a las 9:00 a. m., Datadog compara ese punto de datos con los lunes anteriores a la misma hora. Si aparecen patrones similares de manera consistente, el pico se trata como **estacional** y no se marca como una anomalía. Esto ayuda a reducir los falsos positivos para que Datadog muestre solo las desviaciones inesperadas.

Las anomalías pueden ser picos o caídas pronunciadas, pero también pueden ser tendencias más sutiles, como cambios de paso o cambios de pendiente.

## Encuentre las incidencias detectadas en un Dashboard {#find-detected-issues-on-a-dashboard}

Haga clic en {{< ui >}}Investigate{{< /ui >}} en la parte superior del Dashboard para ver las incidencias que Datadog detectó. Cada incidencia nombra la métrica que se desvió y cuándo se detectó. Expandir una incidencia también muestra sus etiquetas influyentes y el {{< ui >}}Widget affected{{< /ui >}}.

Seleccionar una incidencia desplaza el tablero hasta el gráfico afectado.

Las anomalías que ocurren en varios widgets a la vez se agrupan en una sola incidencia, como `Anomalies co-occur on 18 widgets`.

{{< img src="dashboards/graph_insights/investigate_anomalies/investigate_menu.png" alt="El menú Investigar abierto en un Dashboard, que enumera cuatro incidencias detectadas con un interruptor de detección automática de incidencias." style="width:100%;" >}}

## Revisar una anomalía {#review-an-anomaly}

Las anomalías detectadas se resaltan en rosa en el gráfico.

1. Pase el cursor sobre una región resaltada. Aparece una tarjeta que resume la anomalía y qué tanto se desvía del rango esperado, por ejemplo: `The spike is 70% higher than the expected range as inferred from the past 3 weeks of data.`
1. Haga clic en la tarjeta para expandirla. La tarjeta expandida siempre contiene:
   - **Etiquetas influyentes**: las etiquetas que más contribuyen a la anomalía.
   - **Próximos pasos**: acciones de seguimiento sugeridas, como ver el servicio afectado o crear un monitor.

   Algunas anomalías también incluyen una sección **Co-occurs with**, que enumera otras métricas que se desviaron durante el mismo período.

{{< img src="dashboards/graph_insights/investigate_anomalies/anomaly_chip.png" alt="Un chip de anomalía expandido que muestra una etiqueta influyente, los próximos pasos y el botón Investigate With AI." style="width:100%;" >}}

## Analizar un solo gráfico con Watchdog Explains {#analyze-a-single-graph-with-watchdog-explains}

Para limitar una anomalía a una etiqueta específica, abra el gráfico en pantalla completa y haga clic en {{< ui >}}Findings{{< /ui >}}. Este panel funciona con Watchdog Explains.

Cada hallazgo nombra una etiqueta que probablemente explique la anomalía. También muestra el gráfico antes y después de filtrar esa etiqueta, para que pueda confirmar si eliminarla aplana el pico.

Para obtener más información, consulte [Watchdog Explains][2].

## Investigar la causa raíz con Bits Investigation {#investigate-root-cause-with-bits-investigation}

Haga clic en {{< ui >}}Investigate With AI{{< /ui >}} desde un chip de anomalía expandido, desde el menú {{< ui >}}Investigate{{< /ui >}} o desde un hallazgo de Watchdog Explains. Datadog abre [Bits Investigation][1] en una pestaña nueva, donde analiza la anomalía e informa una causa raíz, una evaluación de impacto y una cronología.

Si ya existen investigaciones relacionadas, el botón dice {{< ui >}}See _N_ Related Investigations{{< /ui >}}, donde _N_ es el recuento. Haga clic en el botón para abrir una lista filtrada de investigaciones. Para abrir una sola investigación, haga clic en {{< ui >}}Review Completed Investigation{{< /ui >}}.

<div class="alert alert-info">El recuento de investigaciones relacionadas está limitado a todo el Dashboard y al intervalo de tiempo, no a la anomalía que está viendo. Un recuento de uno puede significar que una investigación comenzó desde un gráfico diferente en el mismo Dashboard.</div>

Las investigaciones iniciadas de esta manera registran {{< ui >}}Dashboard Anomaly{{< /ui >}} como su fuente y llevan una etiqueta `dashboard_id`. Utilice la fuente o la etiqueta para encontrar una investigación más tarde en la lista de Bits Investigation.

## Desactivar la detección de anomalías {#turn-off-anomaly-detection}

Para dejar de analizar un Dashboard en busca de anomalías, haga clic en {{< ui >}}Investigate{{< /ui >}} y desactive {{< ui >}}Auto-detect issues{{< /ui >}}.

Esta preferencia se aplica a un Dashboard y se almacena en su navegador. Otros usuarios que vean el mismo Dashboard seguirán viendo las anomalías a menos que ellos mismos desactiven la detección. La preferencia tampoco se traslada a un navegador o dispositivo diferente.

Para excluir un solo widget de la detección de anomalías, edite el widget, expanda {{< ui >}}Anomaly Detection{{< /ui >}} y seleccione {{< ui >}}Hide{{< /ui >}}. Esta configuración es parte de la definición del widget, por lo que se aplica a todos los que vean el Dashboard.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_investigation/
[2]: /es/dashboards/graph_insights/watchdog_explains/