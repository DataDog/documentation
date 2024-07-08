---
aliases:
- /es/guides/forecasts/
- /es/monitors/monitor_types/forecasts
- /es/monitors/create/types/forecasts/
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Consultar el estado de tu monitor
title: Monitor de predicción
---

## Información general

La predicción es una función algorítmica que permite predecir la evolución futura de una métrica. Es muy adecuada para métricas con fuertes tendencias o patrones recurrentes. Por ejemplo, si tu aplicación empieza a registrar datos a un ritmo más rápido, las predicciones pueden alertarte una semana antes de que se llene un disco, dándote tiempo suficiente para actualizar tu política de rotación del log. O bien, puedes hacer una predicción de las métricas de negocio, como las inscripciones de usuarios, para realizar un seguimiento del progreso con respecto a tus objetivos trimestrales.

## Creación de un monitor

Para crear un [monitor de predicción][1] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Forecast* (Monitores > Nuevo monitor > Predicción).

### Definir la métrica

Cualquier métrica que informe actualmente a Datadog está disponible para monitores. Para más información, consulta la página [Monitor de métrica][2].

Después de definir la métrica, el monitor de predicción proporciona dos gráficos de vista previa en el editor:
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="Gráficos del editor" style="width:95%;">}}

* La **Vista Histórica** te permite explorar los datos de métrica pasados en diferentes escalas temporales.
* La **Vista previa de evaluación** muestra una combinación de datos históricos y previstos de métrica.

### Definir las condiciones de alerta

* Activa una alerta cuando el extremo de los límites de confianza de la predicción pase a ser `above` o `below`.
* el umbral dentro de las siguientes `24 hours`, `1 week`, `1 month`, etc. o `custom` para fijar un valor entre 12 horas y 3 meses.
* Umbral de alerta: >= `<NUMBER>`
* Umbral de alerta: >= `<NUMBER>`
* Alerta [umbral de recuperación][3]: < `<NUMBER>`
* Advertencia [umbral de recuperación][3]: < `<NUMBER>`

#### Opciones avanzadas

Datadog analiza automáticamente la métrica elegida y establece varios parámetros por ti. Sin embargo, las opciones se pueden editar en **Advanced Options** (Opciones avanzadas):

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="Opciones avanzadas" style="width:80%;">}}

| Opción                     | Descripción                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Algoritmo](#algorithms)   | El algoritmo de predicción (`linear` o `seasonal`)                                                                         |
| Modelo                      | El modelo de predicción (`default`, `simple`, o `reactive`) para el algoritmo lineal                                        |
| Estacionalidad                | La estacionalidad de la predicción (`hourly`, `daily`, o `weekly`) para el algoritmo estacional                         |
| [Ahorro por horario de verano][4] | Disponible para los monitores de predicción `seasonal` con la estacionalidad `daily` o `weekly`.                            |
| [Rollup][5]                | El intervalo rollup: intervalos más largos entre puntos evitan la influencia del ruido en la predicción.                        |
| Desviaciones                 | La amplitud del intervalo de valores previstos: un valor de 1 ó 2 suele ser suficiente para la mayoría de los puntos "normales". |

##### Algoritmos

Los algoritmos disponibles para la predicción son `linear` y `seasonal`:

{{< tabs >}}
{{% tab "Linear" %}}

Utiliza el algoritmo lineal para métricas que tienen tendencias constantes, pero no un patrón estacional repetitivo. Existen tres _modelos_ diferentes que controlan la sensibilidad del algoritmo lineal a los cambios de nivel:

| Modelo    | Descripción                                                                                |
|----------|--------------------------------------------------------------------------------------------|
| Predeterminada  | Se ajusta a la tendencia más reciente y extrapola los datos sin dejar de ser robusto frente al ruido reciente. |
| Simple   | Hace una regresión lineal robusta a través de toda la historia.                                |
| Reactivo | Extrapola mejor el comportamiento reciente a riesgo de sobreajustarse al ruido, los picos o las caídas.  |

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="Lineal predeterminado" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="Lineal simple" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="Lineal reactivo" style="width:80%;" >}}

{{% /tab %}}
{{% tab "Seasonal" %}}

Utiliza el algoritmo estacional para métricas con patrones repetitivos. Hay tres opciones diferentes de _estacionalidad_:

| Opción  | Descripción                                                                                                                                        |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Por hora  | El algoritmo espera que el mismo minuto después de la hora se comporte como minutos pasados después de la hora, por ejemplo 5:15 se comporta como 4:15, 3:15, etc.      |
| Diario   | El algoritmo espera que la misma hora de hoy se comporte como la de días pasados, por ejemplo las 17:00 de hoy se comportan como las 17:00 de ayer.                                |
| Semanal  | El algoritmo espera que un determinado día de la semana se comporte como los días de la semana anteriores, por ejemplo, este martes se comporta como los martes anteriores.        |

**Nota**: Este algoritmo requiere al menos dos temporadas de historial y utiliza hasta seis temporadas para la predicción.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="estacional" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones de alerta avanzadas (faltante de datos, retraso en la evaluación, etc.), consulta la página [Configuración del monitor][6]. Para el intervalo de datos completo de la opción específica de la métrica, consulta la página [Monitor de la métrica][7].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][8].

## API

Para crear monitores de predicción mediante programación, consulta la [referencia de la API de Datadog][9]. Datadog **recomienda encarecidamente** [exportar un JSON de monitor][10] para crear la consulta de la API. Al utilizar la [página de creación del monitor][1] en Datadog, los clientes se benefician del gráfico de vista previa y del ajuste automático de parámetros para evitar una mala configuración de monitor.

Los monitores de predicción se gestionan utilizando la [misma API][11] que otros monitores, pero el contenido de la propiedad `query` merece una explicación más detallada.

La propiedad `query` del cuerpo de la solicitud debe contener una cadena de consulta con el siguiente formato:

```text
<aggregator>(<query_window>):forecast(<metric_query>, '<algorithm>', <deviations>, interval=<interval>[, history='<history>'][, model='<model>'][, seasonality='<seasonality>']) <comparator> <threshold>
```

* `aggregator`: utiliza `min` si la alerta debe activarse cuando la predicción esté por debajo del umbral. Utiliza `max` si la alerta debe activarse cuando la predicción supere el umbral.
* `query_window`: un marco temporal, por ejemplo: `next_4h` o `next_7d`.
* `metric_query`: una consulta estándar de métrica de Datadog, por ejemplo: `min:system.disk.free{service:database,device:/data}by{host}`.
* `algorithm`: `linear` o `seasonal`
* `deviations`: un número mayor o igual que uno. Este parámetro controla el tamaño de los límites de confianza, lo que permite que el monitor sea más o menos sensible.
* `interval`: un número entero positivo que representa el número de segundos en el intervalo rollup.
* `history`: una cadena que representa la cantidad de datos pasados que deben utilizarse para realizar la predicción, por ejemplo: `1w`, `3d`. Este parámetro solo se utiliza con el algoritmo `linear`.
* `model`: el tipo de modelo a utilizar: `default`, `simple`, o `reactive`. Este parámetro solo se utiliza con el algoritmo `linear`.
* `seasonality`: la estacionalidad a utilizar: `hourly`, `daily`, o `weekly`. Este parámetro solo se utiliza con el algoritmo `seasonal`
* `comparator`: utiliza `<=` para alertar cuando la predicción esté por debajo del umbral. Utiliza `>=` para alertar cuando la predicción supere el umbral.
* `threshold`: se activará una alerta crítica cuando los límites de confianza de la predicción alcancen este umbral.

## Solucionar problemas

Las siguientes funciones no pueden anidarse dentro de llamadas a las funciones `forecast()`:<br>
`anomalies` `cumsum`, `integral`, `outliers`, `piecewise_constant`, `robust_trend`, o `trend_line`

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /es/monitors/types/metric/#define-the-metric
[3]: /es/monitors/guide/recovery-thresholds/
[4]: /es/monitors/guide/how-to-update-anomaly-monitor-timezone/
[5]: /es/dashboards/functions/rollup/
[6]: /es/monitors/configuration/#advanced-alert-conditions
[7]: /es/monitors/types/metric/#data-window
[8]: /es/monitors/notify/
[9]: /es/api/v1/monitors/#create-a-monitor
[10]: /es/monitors/manage/status/#settings
[11]: /es/api/v1/monitors/