---
aliases:
- /es/monitors/faq/anomaly-monitor.md
kind: guía
title: Monitores de anomalía
---

### ¿Debo utilizar la detección de anomalía para todo?

No. La detección de anomalía ayuda a visualizar y monitorizar que tienen patrones predecibles. Por ejemplo, `my_site.page_views{*}` se rige por el tráfico de usuarios y varía de forma predecible según la hora del día y el día de la semana. Por lo tanto, es muy adecuado para la detección de anomalía.

**Nota**: La detección de anomalía requiere datos históricos para hacer buenas predicciones. Si solo llevas unas horas o unos días recopilando una métrica, la detección de anomalía no será útil.

### ¿Por qué no puedo utilizar la detección de anomalía sobre grupos en el dashboard?

Añadir muchas series temporales separadas en un único gráfico puede provocar [spaghettification][1], y el problema empeora cuando se añade la visualización de la detección de anomalía:

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" alt="Spaghettification" style="width:80%;">}}

Sin embargo, es posible añadir varias series a un mismo gráfico de una en una. La banda gris sólo aparece al pasar el ratón por encima:

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" alt="múltiples líneas de anomalía" style="width:80%;" >}}

### ¿Las anomalías pasadas afectan a las predicciones actuales?

Todos los algoritmos, excepto `basic`, utilizan grandes cantidades de datos históricos, por lo que son sólidos ante la mayoría de las anomalías. En el primer gráfico, la banda gris se mantiene cerca de 400K incluso después de que la métrica haya bajado a 0.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="anomalous_history" style="width:80%;">}}

El segundo gráfico muestra la misma métrica un día después. Aunque utiliza el día anterior en el cálculo de la banda, no se ve afectado por la anomalía que se produjo anteriormente.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="sin efecto" style="width:80%;">}}

### ¿Por qué "desaparece" una anomalía cuando hago zoom?

A distintos niveles de zoom, la misma consulta puede dar lugar a series temporales con características diferentes. Cuando se observan periodos más largos, cada punto representa el agregado de muchos puntos más detallados. Por lo tanto, cada uno de estos puntos agregados puede ocultar el ruido observado en los puntos más detallados. Por ejemplo, los gráficos que muestran una semana a menudo parecen más suaves (menos ruidosos) que los gráficos que muestran solo 10 minutos.

La anchura de la banda de grises es clave para la precisión de la monitorización de la anomalía. La banda debe ser lo suficientemente ancha como para que el ruido ordinario quede mayoritariamente dentro de la banda y no aparezca como anómalo. Desafortunadamente, cuando la banda es lo suficientemente ancha como para incluir el ruido ordinario, también puede ser lo suficientemente ancha como para ocultar algunas anomalías, en especial cuando se visualiza un intervalo corto.

Por ejemplo, la métrica `app.requests` es ruidosa, pero tiene un valor medio constante de 8. Un día, aparece un periodo anómalo de 10 minutos, que empieza a las 9:00, durante el cual la métrica tiene un valor medio de 10. El gráfico siguiente muestra una serie con un intervalo de un día; cada punto del gráfico resume 5 minutos.

{{< img src="monitors/monitor_types/anomaly/disappearing_day.png" alt="día que desaparece" style="width:70%;" >}}

La banda gris tiene sentido aquí. Es lo bastante ancha para captar el ruido de la serie temporal, pero lo bastante estrecha para que la anomalía a las 9:00 destaque claramente. El siguiente gráfico muestra una vista ampliada de una ventana temporal de media hora que incluye los 10 minutos de anomalía; cada punto del gráfico resume 10 segundos.

{{< img src="monitors/monitor_types/anomaly/disappearing_half_hour.png" alt="media hora que desaparece" style="width:70%;" >}}

De nuevo, la banda parece tener un tamaño razonable, porque los datos no anómalos de 8:50 - 9:00 y de 9:10 - 9:20 están dentro de la banda. Una banda más estrecha empezaría a resaltar los datos normales como anómalos. Observa que la banda de este gráfico es cerca de 8 veces más ancha que la del gráfico anterior. El periodo anómalo de 9:00 - 9:10 parece diferente del resto de la serie, pero no es tan extremo como para quedar fuera de la banda.

En general, si una anomalía desaparece al ampliar la imagen, esto no significa que no sea una anomalía. Significa que, aunque los puntos individuales de la vista ampliada no son anómalos de forma aislada, muchos puntos ligeramente inusuales que ocurren juntos sí son anómalos.

### ¿Por qué aparece un error de parseo de consulta al intentar combinar algunas funciones con la detección de anomalía?

No todas las funciones pueden anidarse dentro de llamadas a la función `anomalies()`. En particular, no puedes incluir ninguna de las siguientes funciones en un monitor de detección de anomalía o consulta del dashboard: `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()`, o `trend_line()`.

La detección de anomalía utiliza datos históricos para establecer una línea de base del comportamiento normal de una serie. Las funciones anteriores son sensibles a la ubicación del intervalo de consulta. El valor de la serie en una sola marca temporal puede cambiar significativamente en función de dónde se encuentre dentro del intervalo de consulta. Esta sensibilidad impide que la detección de anomalía determine una línea de base coherente para la serie.

### ¿Qué ha pasado con el algoritmo adaptativo?

Datadog ha mejorado nuestros algoritmos para que ya no utilicen el algoritmo adaptativo. Los monitores existentes que utilizan el algoritmo `adaptive` no se han modificado y siguen funcionando.

### ¿Qué es el argumento count_default_zero?

Anteriormente, Datadog trataba las métricas Count como gauges y, por lo tanto, interpolaba entre los puntos informados. Las anomalías ya no interpolan entre Counts, pero para monitores de legacy, se conserva el antiguo comportamiento utilizando el argumento `count_default_zero`.

### ¿Y si quiero que mi métrica Count sea tratada como gauge?

No interpolar entre Counts tiene sentido si tu métrica Count incluye algo como errores. Sin embargo, si tienes trabajos programados regularmente que ocurren cada hora, podría tener más sentido si la métrica no está reportando un valor de 0.0 entre ejecuciones. Hay dos maneras diferentes de lograr esto:

1. Configura el rollup (en la sección de opciones avanzadas) en una hora.
2. Establece explícitamente `count_default_zero='false'` utilizando la API.

### ¿En qué se diferencia la configuración del intervalo rollup en "Opciones avanzadas" de la configuración en la consulta mediante .rollup()?

Si rollup se establece explícitamente en la consulta, se ignora la opción del intervalo rollup para el monitor de anomalía.

### No me importa si mi métrica es anómala si su valor es inferior a X, ¿puedo ignorar de alguna manera esas anomalías?

Crea **A**: un monitor de anomalía para alertar sobre valores por encima de los límites; y **B**: un [monitor de métrica][2] individual con una alerta de umbral que se activa con los valores superiores a X. A continuación, crea un [monitor compuesto][3] sobre **A y B**.

### ¿Por qué se me impide guardar un monitor con el mensaje "los criterios de alerta y de recuperación de alerta son tales que el monitor puede estar simultáneamente en estado de alerta y de recuperación de alerta"?

Establecer diferentes intervalos para los periodos de alerta y recuperación de alerta podría conducir a un estado ambiguo. Los tamaños de los intervalos de alerta y recuperación de alerta deben establecerse de forma que ambos no puedan alcanzarse al mismo tiempo. Por ejemplo, establecer un umbral de alerta al 50% para un intervalo de 2 horas (es decir, 1 hora tiene que ser anómala para activar la alerta) y el [umbral de recuperación][4] al 50% para un intervalo de 10 minutos (es decir, 5 minutos tienen que ser no anómalos para recuperarse) podría provocar la activación de los estados de alerta y de recuperación de alerta simultáneamente. Si los últimos 5 minutos no son anómalos, pero la hora anterior _fue_ anómala, se activan tanto la alerta como la recuperación de alerta.

### ¿Cómo afecta el horario de verano a los monitores de detección de anomalía?

Los monitores de Datadog utilizan la hora UTC y, por defecto, son independientes de las zonas horarias locales. La actividad del usuario cambia con respecto a la hora UTC porque la actividad suele ser la misma para la hora local del usuario. Esto podría detectarse como una anomalía inesperada.

Datadog te permite configurar una zona horaria para cada monitor de detección de anomalía que corrige automáticamente el cambio horario. Para obtener más información, consulta [Cómo actualizar un monitor de detección de anomalía para tener en cuenta la zona horaria local][5].

[1]: https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101
[2]: /es/monitors/types/metric/
[3]: /es/monitors/types/composite/
[4]: /es/monitors/guide/recovery-thresholds/
[5]: /es/monitors/guide/how-to-update-anomaly-monitor-timezone/