---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentación
  text: Configurar monitores
kind: Guía
title: Agregadores para monitores
---
{{< jqmath-vanilla >}}

## Información general

{{< img src="monitors/guide/monitor_aggregators/aggregator_dropdown.png" alt="Menú desplegable bajo Configuración de monitores, que muestra los cuatro agregadores" style="width:100%;" >}}

Configura tu consulta de monitor para enviar alertas basadas en cómo se agregan los datos con uno de los cuatro métodos de agregación: promedio, máximo, mínimo y suma. Para esta guía, toma el mismo ejemplo de valores de métricas en un periodo de evaluación de 10 minutos y aplica los diferentes agregadores para ver cómo reaccionaría cada monitor. 

{{< img src="monitors/guide/monitor_aggregators/metric_values_example.png" alt="Ejemplo de valores de métricas en un periodo de evaluación de 10 minutos [10, 15, 12, 8, 11, 14, 13, 25, 37, 45, 50]" style="width:100%;" >}}

Todos los ejemplos suponen que:
- Las consultas se calculan con la [`classic_eval_path`][1].
- El monitor alerta cuando los valores están *por encima* de un determinado umbral. 

## Promedio

El monitor toma los valores del periodo de evaluación y calcula el promedio de todos los puntos de datos. Este valor promedio se compara con el umbral definido. Un caso de uso común para este agregador es comprobar si los datos de las métricas son demasiado altos o demasiado bajos.

##### Ejemplo

Quieres que el monitor envíe una notificación cuando el promedio de los últimos 10 minutos es superior a 30. ¿En qué estado se encuentra el monitor en el minuto 3:10?

$$(\10+15+12+8+11+14+13+25+37+45+50\)/10 = 24$$

##### Respuesta

Estado **OK**, este monitor no va a emitir alertas.

## Máximo y superior

El monitor toma los valores del periodo de evaluación y compara **cada valor** con el umbral definido. Si algún punto de la ventana de evaluación está *por encima* del umbral, el monitor emite una alerta. 

En los monitores configurados para emitir alertas cuando se encuentran *por debajo* del umbral, el comportamiento es inverso.

##### Ejemplo

1. Quieres que el monitor envíe una notificación cuando el promedio de los últimos 10 minutos es superior a 40. ¿En qué estado se encuentra el monitor en el minuto 3:10?

2. Quieres que el monitor envíe una notificación cuando el promedio de los últimos 10 minutos es superior a 50. ¿En qué estado se encuentra el monitor en el minuto 3:10?

##### Respuesta

1. Estado de **ALERTA**, los dos últimos valores en los últimos 10 minutos son 45 y 50. Este monitor va a emitir alertas.

2. Estado **OK**, el umbral es 50 y el último valor no es superior a 50. Este monitor no va a emitir alertas.

## Mínimo y superior

El monitor toma los valores de la ventana de evaluación y compara **cada valor** con el umbral definido. Todos los valores de la ventana deben ser superiores al umbral. Si el valor mínimo está *por encima* del umbral, significa que todos los puntos de la ventana están también por encima del umbral. 

En los monitores configurados para emitir alertas cuando se encuentran *por debajo* del umbral, el comportamiento se revierte.

##### Ejemplo

Quieres que el monitor emita alertas si el valor mínimo de la métrica es superior a 10 en cualquier momento de los últimos 10 minutos. ¿En qué estado se encuentra el monitor en el minuto 3:10?

##### Respuesta

Estado de **ALERTA**, el valor en el minuto 3:01 (15) es superior a 10.

## Suma

El monitor toma los valores de la ventana de evaluación y compara **el valor de la suma** con el umbral definido. Este agregador suma el valor de cada punto de datos, no el número de puntos de datos. Un caso de uso sería cuando una métrica cuenta ocurrencias de errores o reinicios. Esta es la razón por la que las métricas *as_count()* tienen que utilizar el agregador de suma. Para obtener más información, consulta la guía [as_count() en evaluaciones de monitor][2].

##### Ejemplo

Quieres que el monitor envíe un notificación cuando la suma de los valores de los últimos 10 minutos supere 250. ¿En qué estado se encuentra este monitor en el minuto 3:10?

$$10+15+12+8+11+14+13+25+37+45+50 = 240$$

##### Respuesta

Estado **OK**, este monitor no va a emitir alertas.

## Visualización de agregadores

Puedes ver diferentes resultados según el método de agregación que estés utilizando en tu consulta y tu agregación de evaluación. Los siguientes métodos de agregación utilizan la misma métrica. Puedes ver cómo cada método afecta a la forma en que se agrega la métrica a una serie temporal.

| Agregación | Gráfico resultante | 
| ---  | ----------- | 
| Promedio (`avg by`): valor promedio de la métrica | {{< img src="monitors/guide/monitor_aggregators/AVG_aggregation.png" alt="Gráfico de visualización de la métrica agregada por promedio" style="width:100%;" >}} |
| Máximo (`max by`): valor máximo de la métrica | {{< img src="monitors/guide/monitor_aggregators/MAX_aggregation.png" alt="Gráfico de visualización de la métrica agregada por valor máximo, que muestra valores más altos que el gráfico del promedio" style="width:100%;" >}} |
| Mínimo (`min by`): valor mínimo de la métrica | {{< img src="monitors/guide/monitor_aggregators/MIN_aggregation.png" alt="Gráfico de visualización de la métrica agregada por el mínimo, que muestra visualmente valores menores que los gráficos del promedio y el máximo" style="width:100%;" >}} |
| Suma (`sum by`): suma total de todos los valores de métricas | {{< img src="monitors/guide/monitor_aggregators/SUM_aggregation.png" alt="Gráfico de visualización de la métrica agregada por la suma, muestra visualmente valores mayores que los gráficos del promedio y el máximo" style="width:100%;" >}} | 

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/guide/as-count-in-monitor-evaluations/#2-ways-to-calculate
[2]: /es/monitors/guide/as-count-in-monitor-evaluations