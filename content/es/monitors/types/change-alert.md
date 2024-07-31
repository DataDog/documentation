---
aliases:
- /es/monitors/guide/change-alert
disable_toc: false
further_reading:
- link: /monitors/types/metric/?tab=change#choose-the-detection-method
  tag: Documentación
  text: Elegir el método de detección de los monitores de métricas
- link: /monitors/configuration/
  tag: Documentación
  text: Aprender a configurar un monitor
title: Monitor de alerta de cambios
---

## Información general

Los monitores de métricas son uno de los tipos de monitores más utilizados. Esta guía aclara el comportamiento del método de detección de alertas de cambios y sus opciones adicionales. Obtén información sobre cómo funcionan los monitores de alertas de cambios y cómo solucionar los problemas de las evaluaciones de alertas de cambios.

## ¿Qué son los monitores de alertas de cambios?
El siguiente es un desglose del funcionamiento de los monitores con el método de detección de cambios: 
1. El monitor toma una consulta de puntos de datos en el momento actual.
1. Toma una consulta de puntos de datos de hace N minutos, horas o días.
1. A continuación, toma una consulta de la diferencia de los valores entre (1) y (2).
1. La agregación se aplica sobre la consulta en (3), que devuelve un único valor.
1. El umbral definido en **Set alert conditions** (Establecer condiciones de alerta) se compara con el valor único devuelto en (4).

## Creación de un monitor

Para crear un [monitor de alerta de cambios][2] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Change* (Monitores > Nuevo monitor > Cambio).

## Condiciones de evaluación

Las siguientes son las diferentes opciones que necesitas configurar en un monitor de alertas de cambios.

{{< img src="/monitors/monitor_types/change-alert/configure_define_the_metrics.png" alt="Opciones de configuración del método de detección de alertas de cambios" style="width:100%;" >}}

El ejemplo muestra la siguiente condición de alerta:
El **promedio** del **cambio** durante **1 hora** comparado con **5 minutos**.
| Opciones seleccionadas | Descripción | Opciones |
| --------------- | ------------------------------------------------------------------------------------------------| ----------- |
| promedio      | La agregación que se utiliza en la consulta.                                                      | `Average`, `Maximum`, `Minimum`, `Sum` |
| cambio        | Elige entre el cambio absoluto o porcentual del valor.                                  | `change` o `% change`|
| 1 hora         | La ventana de evaluación. Para obtener más información, consulta la documentación [Configuración de monitores][1].  | Pueden ser N minutos, horas, días, semanas o como máximo un mes. |
| 5 minutos      | El intervalo de tiempo que quieres aplicar a la consulta.                                              | Pueden ser N minutos, horas, días, semanas, o como máximo un mes atrás. |

### Cambio y % de cambio

A la hora de configurar la detección de una alerta de cambios, existen dos opciones: **Cambio** y **% de cambio**. 

Estas determinan la forma en que el monitor evalúa lo que se expresa en la sección de la fórmula, en la siguiente tabla:

| Opción   | Descripción                                                        | Fórmula              |
| -------  | ------------------------------------------------------------------ | -------------------- |
| Cambio   | Cambio absoluto del valor.                                  | `a - b`              |
| % de cambio | Cambio porcentual del valor en comparación con su valor anterior. | `((a - b) / b) * 100`|

En ambos casos, `Change` y `% Change` pueden ser positivos o negativos. 

## Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta las página [Notificaciones][7] y [Configuración de monitores][8].

## Solucionar problemas de evaluación de una alerta de cambios

Para verificar los resultados de la evaluación de una alerta de cambios, vuelve a crear las consultas de métricas utilizando un notebook. 
Toma este monitor de alerta de cambios con la siguiente configuración. 

{{< img src="monitors/monitor_types/change-alert/example_monitor_config.png" alt="Página de creación de monitores con la alerta de cambios seleccionada para evaluar el cambio porcentual del promedio de la métrica system.load.1 durante los últimos 5 minutos, en comparación con los últimos 30 minutos" ="width:100%;" >}}

Consulta de monitor:
```pct_change(avg(last_5m),last_30m):<METRIC> > -50```

El siguiente es un desglose de la consulta con las siguientes condiciones:
1. Agregación de **avg**.
2. Utiliza **% de cambio**.
3. Ventana de evaluación de **5 minutos**.
4. Cambio del intervalo de **30 minutos** o 1800 segundos.
5. Umbral de **> -50**.

### Para volver a crear una consulta

1. Utiliza un [notebook][2] y la [función de cambio del intervalo][3] para volver a crear los datos utilizados por el monitor durante una evaluación específica. 
    - Consulta de puntos de datos en el momento actual (es la consulta normal <QUERY>).
    - Consulta de puntos de datos de hace N minutos (es la consulta normal + el intervalo(-1800)).
    - La función de intervalo utiliza una duración **negativa** porque estás desplazando los datos hacia atrás. Combina estas consultas con la fórmula de % de cambio de la tabla.
    - **Nota**: Dado que este ejemplo sólo tiene un métrica, también es posible utilizar una consulta (a) única y añadir la fórmula `((a - timeshift(a, -1800)) / timeshift(a, -1800)) * 100`
    {{< img src="monitors/monitor_types/change-alert/notebook_query_reconstruct_timeshift.png" alt="Pantalla de edición de una celda en un notebook, llamada Volver a crear la consulta de alerta de cambios, configurada como una serie temporal que utiliza el promedio de system.load.1 de la métrica desde todas las fuentes, con la fórmula ((a - timeshift(a, -1800)) / timeshift(a, -1800)) * 100 aplicada" style="width:100%;" >}}
2. Compara el gráfico del historial del monitor con el gráfico del notebook. ¿Son comparables los valores?
3. Aplica la agregación. 
    - Para comparar el gráfico del notebook con la evaluación del monitor de alerta de cambios, delimita tu intervalo de tiempo para que coincida con la alerta de cambios. 
    - Por ejemplo, si quieres verificar el valor de una evaluación de monitor durante los últimos 5 minutos en el momento 1:30, ajusta tu notebook con el lapso 1:25 - 1:30. 

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration/#evaluation-window
[2]: /es/monitors/manage/status/#investigate-a-monitor-in-a-notebook
[3]: /es/dashboards/functions/timeshift/
[7]: /es/monitors/notify/
[8]: /es/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[9]: https://app.datadoghq.com/monitors/create/metric/change