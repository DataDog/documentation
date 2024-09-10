---
aliases:
- /es/graphing/functions/rollup/
title: Rollup
---

Cada consulta de métricas se agrega de forma inherente. Sin embargo, si añades la función `.rollup()` al final de una consulta, podrás realizar una [agregación temporal][1] personalizada que anule los valores predeterminados. Esta función te permite definir:

* El `<interval>` de rollup: el intervalo de tiempo en el que se agregan tus datos ([si es mayor que el intervalo de rollup forzado por la consulta ](#rollup-interval-enforced-vs-custom)).
* El `<aggregator>` de rollup: la manera en que se agregan los puntos de datos en un intervalo de tiempo de rollup determinado.

Para aplicar un rollup, dirígete al botón **Add function** (Añadir función, Σ) del editor de gráficas: 

{{< img src="dashboards/functions/rollup/rollup_option_1.mp4" alt="Seleccionar la opción de Promedio de rollup desde el botón Añadir función" video=true >}}

**Nota**: El tipo de métrica de distribución no tiene un parámetro `aggregator` de rollup. Este tipo de métrica se agrega tanto en el tiempo como en el espacio. Consulta la documentación sobre [rollup para distribuciones con percentiles][2] a fin de obtener más información.

La función toma dos parámetros, `<AGGREGATOR>` y, de manera opcional, `<INTERVAL>`: `.rollup(<AGGREGATOR>,<INTERVAL>)` o `.rollup(<AGGREGATOR>)`.

| Parámetro  | Descripción                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | Puede ser `avg`, `sum`, `min`, `max` o `count`, y define cómo se agregan los puntos de datos en un intervalo de tiempo determinado. [Valor predeterminado forzado](#rollup-interval-enforced-vs-custom): `avg`. |
| `<INTERVAL>`   | Tiempo (en segundos) del intervalo entre dos puntos de datos mostrados. Es opcional.                                            |

Puedes utilizarlos de manera individual o juntos, por ejemplo `.rollup(sum,120)`. En la siguiente gráfica de barras se muestra el uso de la CPU durante una semana para un host **sin** utilizar la función `.rollup()`:

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

En la siguiente gráfica de barras se muestra la misma métrica, representada mediante un rollup de un día con `.rollup(avg,86400)`:

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## Rollup en movimiento


| Función        | Descripción                                    | Ejemplo |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | Rollup para combinar los puntos en los últimos X segundos. | `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


La aplicación de la función `moving_rollup()` a una consulta permite combinar puntos del intervalo de tiempo especificado más reciente, es decir, los últimos X segundos. Al igual que con `.rollup()`, `<AGGREGATOR>` puede ser `sum`/`min`/`max`/`count`/`avg` y define cómo se agregan los puntos de datos en el intervalo de tiempo determinado.

## Intervalo de rollup: obligatorio frente a personalizado

Al crear gráficas, Datadog establece un límite en la cantidad de puntos por serie temporal. Para mantener la claridad visual, una serie puede tener hasta 1500 puntos. Para respetar este límite, Datadog acumula los puntos de datos de manera automática, por defecto con el método `avg`, mostrando de manera efectiva el promedio de todos los puntos de datos en un intervalo de tiempo de una métrica determinada. El intervalo de tiempo de rollup predeterminado varía en función de cómo se visualizan los datos. Consulta el siguiente gráfico para obtener una referencia de estos intervalos de tiempo predeterminados:

| Período de tiempo           | Intervalo de rollup, gráfica de líneas | Intervalo de rollup, gráfica de barras | Intervalo de rollup, API |
|---------------------|-----------------------------|----------------------------|----------------------|
| La última hora       | 20 s                         | 1 m                         | 20 s                  |
| Las últimas cuatro horas    | 1 m                          | 2 m                         | 1 m                   |
| El último día        | 5 m                          | 20 m                        | 5 m                   |
| Los últimos dos días     | 10 m                         | 30 m                        | 10 m                  |
| La última semana       | 1 hora                         | 2 horas                        | 1 hora                  |
| El último mes      | 4 horas                         | 12 horas                       | 4 horas                  |

Se puede utilizar una función `.rollup()` personalizada para forzar el tipo de agregación temporal aplicado (`avg`, `min`, `max`, `count` o `sum`) y, de manera opcional, el intervalo de tiempo para realizar el rollup. Con esta función, se puede establecer el intervalo de tiempo de rollup en un valor diferente al predeterminado, hasta un límite de 1500 puntos. Esto admite hasta un punto por minuto a lo largo de un día.

**Nota**: A las consultas de métricas de tipo `COUNT` y `RATE` se les agrega de manera automática el modificador `.as_count()` en la interfaz de usuario, que establece el método de rollup que se utiliza en `sum` y deshabilita la interpolación. Este `.as_count()` es explícitamente visible al final de la consulta:

  {{< img src="dashboards/functions/rollup/as_count_dropdown.png" alt="as_count" style="width:100%;">}}

Para obtener más detalles sobre cómo utilizar `.as_count()` y `.as_rate()`, consulta la entrada del blog [Visualizar métricas de StatsD][3], o conoce más sobre los efectos de esas funciones con la documentación sobre los [modificadores en la aplicación][4].

## Rollup con consultas alineadas con el calendario 

{{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

Puedes personalizar cómo se agrupan los datos de tus métricas a lo largo del tiempo cuando se utiliza la función `.rollup()` con consultas alineadas con el calendario. Esta característica te ofrece la flexibilidad de definir:

* Consultas mensuales alineadas con el calendario con fecha de inicio y zonas horarias ajustables. Por ejemplo, puedes comparar los errores mensuales de tus clientes de febrero y diciembre del año pasado.
* Rollups semanales con fecha de inicio y zonas horarias ajustables. Por ejemplo, conoce cuántas transacciones semanales se encuentran abiertas (si tu semana comienza los lunes).
* Rollups diarios con hora de inicio y zonas horarias ajustables. Por ejemplo, conoce cuántos eventos de interés se produjeron en el día actual (si tu día comienza a medianoche, hora del Pacífico).

## Rollups en monitores

Por lo general, se deben evitar los rollups en las consultas de [monitor][5], debido a la posibilidad de desalineación entre el intervalo de rollup y el período de evaluación del monitor. El inicio y el final de los intervalos de rollup se encuentran alineados con la hora UNIX, no con el inicio y el final de las consultas del monitor. Por lo tanto, un monitor puede evaluar (y activar) un intervalo de rollup incompleto que contenga solo una pequeña muestra de datos. Para evitar este problema, retrasa la evaluación del monitor (al menos) durante el intervalo de rollup de la configuración.

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o outliers en la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en la métrica.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Conteo: cuenta el valor distinto de cero o no nulo de la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye ciertos valores de la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: solo selecciona un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning a la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/dashboards/functions/#add-a-function
[2]: /es/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /es/metrics/custom_metrics/type_modifiers/
[5]: /es/monitors/types/metric/