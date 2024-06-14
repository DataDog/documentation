---
further_reading:
- link: /api/latest/monitors/#edit-a-monitor
  tag: Documentación
  text: Obtener más información sobre la actualización de los parámetros de monitor
    a través de la API
- link: /dashboards/functions/interpolation/#default-zero
  tag: Documentación
  text: Obtener más información sobre la interpolación
kind: Guía
title: Monitorizar métricas dispersas
---

## Información general

Los monitores que informan datos con poca frecuencia pueden tener resultados inesperados y las consultas pueden no evaluarse según lo previsto. Existen herramientas y comportamientos que puedes utilizar para asegurarte de que la configuración de un monitor es adecuada para tus datos y evaluaciones. 

Esta guía cubre las siguientes estrategias de resolución de problemas y de configuración de monitores con datos dispersos:
- [Determinar si tienes métricas dispersas](#how-to-determine-whether-you-have-a-sparse-metric)
- Considerar el origen de tu monitor -> [monitor basado en métricas](#metric-based-monitor) o [monitor basado en eventos](#event-based-monitor)
- [¿El monitor funciona según un cronograma?](#schedule-based-monitoring)


## Para determinar si tienes métricas dispersas

Puedes utilizar un widget de dashboard, un notebook o incluso un [gráfico del historial de un monitor existente][1] y pasar el cursor sobre los puntos de datos para ver si parecen continuos, comparados con las líneas rectas que rellenan los espacios entre cada punto.

En un notebook o un widget, selecciona la opción de visualización **Bars** (Barras), para ver los puntos de datos y sus frecuencias.

Una métrica mostrada en un widget puede tener la siguiente apariencia:

{{< img src="monitors/guide/sparse_metrics/line_graph_sparse.png" alt="Gráfico de una métrica, que muestra un gráfico de líneas que sube y baja en línea recta" style="width:90%;" >}}

Pero cuando se aplica la opción **Bars** (Barras), tiene la siguiente apariencia:

{{< img src="monitors/guide/sparse_metrics/bar_graph_sparse.png" alt="Los mismos datos que en el gráfico de la métrica anterior, excepto que tiene barras para cada punto de datos, donde se resaltan los espacios con métricas dispersas entre las barras" style="width:90%;" >}}

El gráfico de barras te permite visualizar con mayor claridad los espacios entre los puntos de datos. 

Si el editor de gráficos no dispone de varias opciones para cambiar el estilo del gráfico, puedes aplicar la función `default_zero()` a la métrica, lo que ayuda a revelar los espacios en los datos. Para obtener más información sobre esta función, consulta la documentación [Interpolación][2].

## Monitor basado en métricas

¿Se trata de un monitor de [métricas][3], [cambios][4], [anomalías][5], [predicción][6] o [outliers][7]? Ajusta los siguientes parámetros:

* En *Advanced options* (Opciones avanzadas), selecciona **No requerir** una ventana completa para la evaluación de datos.
* ¿Se retrasan a menudo los datos? Considera la posibilidad de añadir tiempo (en segundos) al periodo de espera de evaluación del monitor. En *Advanced options* (Opciones avanzadas), añade un valor al campo **Delay monitor evaluation by X seconds** (Retrasar X segundos la evaluación del monitor).
* Ajusta la evaluación (avg by, max by, min by, sum by) en función de la frecuencia esperada. La evaluación por defecto es **avg by**, que podría no ser adecuada para métricas dispersas.
* Si estás utilizando el agregador **avg by**, considera añadir una [función de interpolación][2] como `default_zero()` para asegurarte de que los espacios en la métrica se evalúan como cero.
* Si utilizas la aritmética en tu consulta, consulta [Monitorizar la aritmética y las métricas dispersas][8] para obtener más información.

## Monitor basado en eventos

¿Se trata de un monitor de [logs][9], [eventos][10], [Audit Trail][11] o [seguimiento de errores][12]? Observa lo siguiente:

* Verifica que la configuración de "Missing data" (Datos faltantes) corresponde al comportamiento esperado para el monitor: **Evaluate as zero**, **Show NO DATA**, **Show NO DATA and notify** o **Show OK** (Evaluar como cero, NO mostrar NINGÚN dato, NO mostrar NINGÚN dato y notificar, o Mostrar OK).
  {{< img src="monitors/guide/sparse_metrics/data_is_missing.png" alt="Opciones de selección de datos faltantes en la sección "Configurar condiciones de alerta" de configuraciones del monitor" style="width:80%;" >}}
* Ajusta el periodo de evaluación. Si se espera que los puntos de datos estén disponibles cada 30 minutos, el periodo de evaluación debe tenerlo en cuenta.

## Monitorización basada en cronogramas

¿Estás monitorizando un evento que tiene que ocurrir en determinados momentos del día, de la semana o del mes? ¿Por ejemplo una tarea CRON, como un trabajo de copia de seguridad o de exportación? Puedes utilizar [cronogramas personalizados][13], que te permiten establecer reglas RRULE para definir en qué momentos el monitor debe evaluar y notificar.

## Resolución de problemas

[Ponte en contacto con el equipo de asistencia de Datadog][14] si tienes alguna pregunta sobre la monitorización de datos dispersos.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/manage/status/#investigate-a-monitor-in-a-notebook
[2]: /es/dashboards/functions/interpolation/#default-zero
[3]: /es/monitors/types/metric/?tab=threshold
[4]: /es/monitors/types/metric/?tab=change
[5]: /es/monitors/types/anomaly/
[6]: /es/monitors/types/forecasts/?tab=linear
[7]: /es/monitors/types/outlier/?tab=dbscan
[8]: /es/monitors/guide/monitor-arithmetic-and-sparse-metrics
[9]: /es/monitors/types/log/
[10]: /es/monitors/types/event/
[11]: /es/monitors/types/audit_trail/
[12]: /es/monitors/types/error_tracking/?tab=count
[13]: /es/monitors/guide/custom_schedules/?tab=day
[14]: /es/help/