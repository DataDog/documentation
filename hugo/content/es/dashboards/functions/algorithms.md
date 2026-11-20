---
algolia:
  tags:
  - anomalía
  - gráfica de anomalías
aliases:
- /es/graphing/functions/algorithms/
title: Algoritmos
---

## Anomalías

| Función      | Descripción                                                                                | Ejemplo                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | Coloca una banda gris sobre la métrica que muestra el comportamiento esperado de una serie en función del pasado. | `anomalies(<METRIC_NAME>{*}, '<ALGORITHM>', <BOUNDS>)` |

La función `anomalies()` tiene dos parámetros:

* `ALGORITHM`: metodología que se utiliza para detectar anomalías.
* `BOUNDS`: ancho de la banda gris. `bounds` se puede interpretar como las desviaciones estándar de tu algoritmo; un valor de 2 o 3 debería ser lo suficientemente grande como para incluir la mayoría de los puntos «normales».

**Nota**: Si utilizas los algoritmos de detección de anomalías ágiles o robustos con estacionalidad semanal o diaria, puedes actualizar el monitor de detección de anomalías para tener en cuenta una zona horaria local utilizando tanto la API como la interfaz de usuario.

Aquí tienes un videotutorial de dos minutos de duración:

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/188833506/rendition/1080p/file.mp4?loc=external&signature=96eacc46a18438ce0f45d5b57952cd924482f8f18e011ceb7b76b6ce1b4587a2" poster="/images/poster/algorithms.png" >}}

**Estacionalidad**: de manera predeterminada, los algoritmos `robust` y `agile` utilizan la [estacionalidad semanal][4], que requiere tres semanas de datos históricos para calcular la línea base.

Para obtener más información, consulta la página de [Monitor de anomalías][1].

## Outliers

| Función     | Descripción                | Ejemplo                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | Destaca las series de outliers. | `outliers(<METRIC_NAME>{*}, '<ALGORITHM>', <TOLERANCE>, <PERCENTAGE>)` |

La función `outliers()` tiene tres parámetros:

* `ALGORITHM`: el algoritmo de outliers a utilizar.
* `TOLERANCE`: la tolerancia del algoritmo de outliers.
* `PERCENTAGE`: el porcentaje de puntos atípicos necesarios para marcar una serie como outlier (solo disponible para los algoritmos MAD y scaledMAD).

{{< img src="dashboards/functions/algorithms/outlier.mp4" alt="Detección de outliers" video="true" width="70%" >}}

Para obtener más información, consulta la página de [Monitor de outliers][2].

## Predicción

| Función     | Descripción                | Ejemplo                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `forecast()`  | Predice hacia dónde se dirige una métrica en el futuro. | `forecast(<METRIC_NAME>{*}, '<ALGORITHM>', <DEVIATIONS>)` |

La función `forecast()` tiene dos parámetros:

* `ALGORITHM`: el algoritmo de predicción a utilizar; selecciona `linear` o `seasonal`. Para obtener más información sobre estos algoritmos, consulta la sección de [Algoritmos de predicción][3].
* `DEVIATIONS`: la amplitud del rango de valores pronosticados. Un valor de 1 o 2 debería ser lo suficientemente grande como para predecir la mayoría de los puntos «normales» con precisión.

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Conteo: cuenta el valor distinto de cero o no nulo de la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye ciertos valores de la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: solo selecciona un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning a la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla la cantidad de puntos de datos sin procesar utilizados en la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/monitors/types/anomaly/
[2]: /es/monitors/types/outlier/
[3]: /es/monitors/types/forecasts/?tab=linear#algorithms
[4]: /es/monitors/types/anomaly/?s=anomaly%20algorithm#seasonality