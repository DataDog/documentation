---
disable_toc: false
further_reading:
- link: monitors/manage/status/
  tag: Documentación
  text: Más información sobre la página Estado del monitor
- link: monitors/guide/monitor_aggregators/
  tag: Documentación
  text: Más información sobre agregadores de monitor
kind: Guía
title: Gráficos de historia y evaluación del monitor
---

## Información general

La página [Estado del monitor][1] contiene dos gráficos, el gráfico de historia y el gráfico de evaluación, que ofrecen información sobre las evaluaciones del monitor. Esta guía aborda:
- [Definición del gráfico de historia y del gráfico de evaluación](#evaluation-vs-history-graph)
- [Qué valores muestran los dos gráficos](#why-are-the-graphs-different)
- [Replicación del resultado del gráfico de evaluación fuera de monitor](#troubleshooting-evaluation-graph-values)


## Gráfico de evaluación frente al gráfico de historia

Gráfico de historia
: muestra los puntos de datos sin formato enviados para la consulta de monitor. La página de estado del monitor utiliza el mismo widget de gráfico en notebooks y dashboards.

Gráfico de evaluación
: muestra los resultados de los puntos de datos sin formato de una métrica aplicados contra las condiciones de alerta definidas por el usuario. Los datos de este gráfico se han agregado y reducido debido al intervalo de evaluación, por lo que los resultados de la consulta son similares al widget del valor de consulta para cada punto de datos.

Cuando envías tus puntos de datos sin formato a Datadog para la monitorización, esta información se visualiza en el gráfico de historia. Por ejemplo, tienes los siguientes puntos de datos en los últimos 5 minutos: [10, 15, 12, 8, 11]. El gráfico de historia muestra cada valor.

{{< img src="monitors/guide/history_and_evaluation_graphs/history_graph_query_config.png" alt="Configuración de la consulta de métrica del monitor que destaca la sección que muestra el gráfico de historia" style="width:100%;" >}}

Cuando configuras tu evaluación de la consulta, esto añade otra agregación a los valores de métrica para que tu monitor alerte. Por ejemplo, configuras tu monitor para evaluar la media de los últimos 5 minutos. El gráfico de evaluación muestra el valor de 11,2 como un único punto de datos.

`(10+15+12+8+11)/5 = 11.2`

{{< img src="monitors/guide/history_and_evaluation_graphs/eval_graph_evaluation_config.png" alt="Configuración de la evaluación de un monitor de métrica que destaca la sección que muestra el gráfico de evaluación" style="width:100%;" >}}


## ¿Por qué son diferentes los gráficos?

Normalmente, los dos gráficos no visualizan los mismos valores de puntos de datos. Además, otros múltiples factores pueden contribuir a las diferencias en los gráficos de visualización.

### Métricas as_count()

Las consultas con las métricas `as_count` en la fórmula utilizan una ruta de evaluación diferente. La evaluación aplica cualquier agregación antes de la fórmula. Por ejemplo, si estás utilizando `A / B` y ambos están utilizando la ruta de evaluación `as_count`, se evaluaría como:
```
(1+2+3+4+5) / (10+10+10+10+10) 
```

Para obtener más información, consulta la guía [as_count() en las Evaluaciones de monitor][2].

### Utilizar fórmulas

Al utilizar fórmulas, los monitores aplican la función de agregación para la evaluación del monitor en la fórmula, no en las consultas individuales. Esto significa que, si estás utilizando la función de agregación AVG (`avg by`) en tus consultas, pero estás utilizando SUM (`sum by`) sobre los últimos X minutos en tu configuración de evaluación, entonces los valores del gráfico de edición de página/historia no coinciden con los valores del gráfico de evaluación. Para ver un ejemplo, consulta la sección [solucionar problemas](#troubleshooting-different-graph-values).

### Retraso de la evaluación

Cuando se utiliza un retraso de evaluación, el gráfico de evaluación no coincide uno a uno con el gráfico de historia. Por ejemplo, si añades un retraso de evaluación de 5 minutos, tendrás que mirar el punto de datos del gráfico de historia de 5 minutos antes para correlacionarlo con el gráfico de evaluación.

### Método de agregación de métrica

Puedes ver diferentes resultados según el método de agregación que estés utilizando en tu consulta y tu agregación de evaluación. La historia y la página de edición utilizan los métodos de agregación de tus consultas, mientras que el gráfico de evaluación utiliza el método de agregación determinado por la opción **Evaluate the** (Evaluar el).

Según el método de agregación que estés eligiendo en tu configuración de monitor, esto puede mostrar un valor diferente comparado con lo que estás viendo en la página de edición. Por ejemplo, si tus consultas de monitor están usando AVG pero estás buscando alertar sobre el valor MINIMUM durante los últimos X minutos/horas, entonces el gráfico de evaluación muestra el valor MIN mientras que los gráficos de tu historia/página de edición muestran los valores AVG. Esto se debe a que el monitor está alertando en el método de agregación establecido en la evaluación del monitor, no el método de agregación establecido en la consulta de métrica.

## Solucionar problemas de valores del gráfico de evaluación

Puedes visualizar lo que el monitor está evaluando en un punto temporal específico utilizando un [Widget de valor de consulta][3] del notebook. Toma la consulta en tu monitor (con cualquier fórmula o funciones) y luego establece tu marco temporal para el gráfico a tu intervalo de evaluación. Esto muestra los datos agregados en un único punto.

En el siguiente ejemplo, toma un intervalo de tiempo del gráfico de evaluación que desees investigar. Pasa el ratón sobre el punto de datos del gráfico de evaluación para ver el valor y la hora. Por ejemplo, quieres investigar por qué tu gráfico de evaluación muestra un punto de datos de `0.38` a las 10:50:35, cuando tu gráfico de historia muestra `0.26` alrededor de la misma hora.

Para solucionar este problema, puedes abrir la página de edición del monitor y transferir la configuración del monitor a un widget de valor de consulta del notebook.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_monitor_eval_config.png" alt="Configuración de ejemplo que muestra la métrica con una agregación de consulta de p95 y una agregación de evaluación de monitor de p95 en los últimos 5 minutos" style="width:90%;" >}}

Campos de configuración de la página de edición del monitor:
- Consulta de métrica **a**: `proc.test_process.cpu.total_pct` p95 por (todo)
- Agregación de la evaluación de monitor: evaluar el `percentile (p95)` de la consulta
- Intervalo de evaluación del monitor: los `last 5 minutes`

Transfiere la misma configuración al widget de valor de consulta del notebook.
1. El desplegable del widget debe mostrar **Query Value** (Valor de la consulta).
1. Selecciona el marco temporal correspondiente al punto de datos del que deseas solucionar problemas.
1. Introduce la consulta de métrica de tu configuración de monitor: `proc.test_process.cpu.total_pct`. Añade la agregación de métrica `p95 by`.
1. Verifica que la evaluación coincide con la evaluación del monitor, `percentile (p95)`.
1. Verifica que el valor de la consulta coincide con el punto de datos de evaluación en tu monitor.

| Configuración                 | Monitor     | Widget de valor de la consulta |
| -------------                 | ----------- | ------------------ |
| Consulta de métrica                  |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_query.png" alt="Configuración de ejemplo que muestra la métrica con una agregación de consulta de p95 y una agregación de evaluación del monitor de p95 en los últimos 5 minutos" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_query.png" alt="Configuración del widget de valor de consulta que destaca el campo que coincide con la consulta de métrica" style="width:100%;" >}}|
| Agregación del monitor            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_aggregation.png" alt="Configuración de ejemplo que muestra la métrica con una agregación de consulta de p95 que destaca la agregación de evaluación del monitor de p95" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_aggregation.png" alt="Configuración del widget de valor de consulta que destaca el campo que coincide la agregación del monitor" style="width:100%;" >}}|
| Intervalo de evaluación            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_eval_window.png" alt="Configuración de ejemplo que muestra la métrica con una agregación de consulta de p95 que destaca el intervalo de evaluación del monitor de los últimos 5 minutos" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_eval_window.png" alt="Configuración del widget del valor de consulta que destaca el campo que coincide con el intervalo de evaluación del monitor" style="width:100%;" >}}|

### Solucionar problemas de un gráfico de evaluación con fórmulas

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_eval_graph.png" alt="Gráfico de evaluación que muestra el punto de datos de 9.17 a las 13:55:29 en hover" style="width:100%;" >}}

En este ejemplo, soluciona un valor en el gráfico de evaluación del monitor con múltiples consultas y una fórmula, en un widget de valor de consulta del notebook. En el gráfico de evaluación, pasa el cursor sobre el punto de datos que deseas investigar; en este ejemplo, deseas solucionar el problema del valor del gráfico de evaluación de `9.17` a las 13:55:29.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_monitor_config.png" alt="Configuración del monitor que muestra dos consultas de métrica y una fórmula 'a+b', que evalúa el mínimo de la consulta en los últimos 5 minutos" style="width:80%;" >}}

Campos de configuración de la página de edición del monitor:
- Consulta de métrica **a**: `proc.test_process.cpu.total_pct` avg por (todo)
- Consulta de métrica **b**: `system.cpu.user` avg por (todo)
- Agregación de la evaluación de monitor: evaluar el `min` de la consulta
- Intervalo de evaluación del monitor: los `last 5 minutes`

Transfiere la misma configuración al widget de valor de consulta del notebook, una métrica a la vez.

**Métrica a**
1. El desplegable del widget debe mostrar **Query Value** (Valor de la consulta).
1. Selecciona la franja horaria correspondiente a 5 minutos alrededor de las 13:55:29. En este caso, 13:50 - 13:55 (1:50 - 1:55).
1. Introduce la consulta de métrica de tu configuración de monitor: `proc.test_process.cpu.total_pct`. Añade la agregación de métrica `avg`.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_a.png" alt="Widget de valor de consulta que muestra una métrica con la agregación avg" style="width:80%;" >}}

**Métrica b**
1. El desplegable del widget debe mostrar **Query Value** (Valor de la consulta).
1. Selecciona la franja horaria correspondiente a 5 minutos alrededor de las 13:55:29. En este caso, 13:50 - 13:55 (1:50 - 1:55).
1. Introduce la consulta de métrica de tu configuración de monitor: `system.cpu.user`. Añade la agregación de métrica `avg`.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_b.png" alt="Widget de valor de consulta que muestra una métrica con la agregación avg" style="width:80%;" >}}

La evaluación del monitor `Min` toma el valor mínimo de las consultas de los últimos 5 minutos.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_formulas_multi_query.png" alt="Widget de valor de consulta que muestra dos consultas, cada una con una agregación de métrica avg, y una agregación de evaluación min" style="width:80%;" >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/manage/status
[2]: /es/monitors/guide/as-count-in-monitor-evaluations/
[3]: /es/dashboards/widgets/query_value/