---
algolia:
  rank: 70
  tags:
  - anomaly
  - anomaly monitor
aliases:
- /es/guides/anomalies
- /es/monitors/monitor_types/anomaly
- /es/monitors/create/types/anomaly/
description: Detecta comportamientos anómalos para una métrica basada en datos históricos
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configura las notificaciones de tu seguimiento
- link: /monitors/downtimes/
  tag: Documentación
  text: Programa un tiempo de inactividad para silenciar un seguimiento
- link: /monitors/status/
  tag: Documentación
  text: Consulta el estado de tu seguimiento
- link: dashboards/functions/algorithms/#anomalies
  tag: Documentación
  text: Función de anomalías
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: Blog
  text: Detección de anomalías, correlaciones predictivas - Usando seguimiento de
    métricas asistido por IA
title: Seguimiento de anomalías
---
## Resumen {#overview}

La detección de anomalías es una característica algorítmica que identifica cuándo una métrica se comporta de manera diferente a como lo ha hecho en el pasado, teniendo en cuenta tendencias, patrones estacionales del día de la semana y patrones de hora del día. Es adecuada para métricas con tendencias fuertes y patrones recurrentes que son difíciles de monitorear con alertas basadas en umbrales.

Por ejemplo, la detección de anomalías puede ayudarte a descubrir cuándo tu tráfico web es inusualmente bajo en una tarde de día laborable, incluso si ese mismo nivel de tráfico es normal más tarde en la noche. O considera una métrica que mide el número de inicios de sesión en tu sitio en crecimiento constante. Debido a que el número aumenta diariamente, cualquier umbral estaría desactualizado, mientras que la detección de anomalías puede alertarte si hay una caída inesperada, lo que podría indicar un problema con el sistema de inicio de sesión.

## Creación de seguimiento {#monitor-creation}

Para crear un [seguimiento de anomalías][1] en Datadog, utiliza la navegación principal: *Seguimientos --> Nuevo Seguimiento --> Anomalía*.

### Define la métrica {#define-the-metric}

Cualquier métrica que informe a Datadog está disponible para seguimientos. Para más información, consulta la página de [Seguimiento de Métricas][2].
**Nota**: La `anomalies` función utiliza el pasado para predecir lo que se espera en el futuro, por lo que usarla en una nueva métrica puede dar resultados pobres.

Después de definir la métrica, el seguimiento de detección de anomalías proporciona dos gráficos de vista previa en el editor:
{{< img src="monitors/monitor_types/anomaly/context.png" alt="contexto histórico" style="width:80%;">}}

* La **Vista Histórica** te permite explorar la consulta monitoreada en diferentes escalas de tiempo para entender mejor por qué los datos pueden considerarse anómalos o no anómalos.
* La **Vista Previa de Evaluación** es más larga que la ventana de alerta y proporciona información sobre lo que el algoritmo de anomalías toma en cuenta al calcular los límites.

### Establecer condiciones de alerta {#set-alert-conditions}

Disparar una alerta si los valores han estado `above or below`, `above` o `below` fuera de los límites durante los últimos `15 minutes`, `1 hour`, etc. o `custom` para establecer un valor entre 15 minutos y 2 semanas. Recuperar si los valores están dentro de los límites durante al menos `15 minutes`, `1 hour`, etc. o `custom` para establecer un valor entre 15 minutos y 2 semanas.

Detección de anomalías
: Con la opción predeterminada (`above or below`) se considera que una métrica es anómala si está fuera de la banda de anomalía gris. Opcionalmente, puedes especificar si estar solo `above` o `below` en las bandas se considera anómalo.

Ventana de activación
: Cuánto tiempo se requiere para que la métrica sea anómala antes de que se dispare la alerta. **Nota**: Si la ventana de alerta es demasiado corta, podrías recibir falsas alarmas debido a ruido espurio.

Ventana de recuperación
: La cantidad de tiempo requerida para que la métrica ya no se considere anómala, permitiendo que la alerta se recupere. Se recomienda establecer la **Ventana de Recuperación** al mismo valor que la **Ventana de Activación**. 

**Nota**: El rango de valores aceptados para la **Ventana de Recuperación** depende de la **Ventana de Activación** y del **Umbral de Alerta** para asegurar que el monitor no pueda satisfacer simultáneamente la condición de recuperación y la de alerta.
Ejemplo:
* `Threshold`: 50%
* `Trigger window`: 4h
El rango de valores aceptados para la ventana de recuperación está entre 121 minutos (`4h*(1-0.5) +1 min = 121 minutes`) y 4 horas. Establecer una ventana de recuperación por debajo de 121 minutos podría llevar a un marco de 4 horas con el 50% de puntos anómalos y los últimos 120 minutos sin puntos anómalos.

Otro ejemplo:
* `Threshold`: 80%
* `Trigger window`: 4h
El rango de valores aceptados para la ventana de recuperación está entre 49 minutos (`4h*(1-0.8) +1 min = 49 minutes`) y 4 horas.

### Opciones avanzadas {#advanced-options}

Datadog analiza automáticamente la métrica elegida y establece varios parámetros para ti. Sin embargo, las opciones están disponibles para que las edites en **Opciones Avanzadas**.

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="El menú de Opciones Avanzadas en la página de configuración del monitor de Anomalías con la configuración establecida para detectar anomalías 2 desviaciones de los datos predichos utilizando el algoritmo ágil con estacionalidad semanal, para tener en cuenta el horario de verano, y para usar un intervalo de consolidación de 60 segundos." style="width:80%;">}}


Desviaciones
: El ancho de la banda gris. Esto es equivalente al parámetro de límites utilizado en la [función de anomalías][3].

Algoritmo
: El [algoritmo de detección de anomalías](#anomaly-detection-algorithms) (`basic`, `agile` o `robust`).

Estacionalidad
: La [estacionalidad](#seasonality) (`hourly`, `daily` o `weekly`) del ciclo para el `agile` o `robust` algoritmo para analizar la métrica.

Horario de verano
: Disponible para `agile` o `robust` detección de anomalías con `weekly` o `daily` estacionalidad. Para más información, consulta [Detección de Anomalías y Zonas Horarias][4].

Consolidación
: El [intervalo de consolidación][5].

Umbrales
: El porcentaje de puntos que deben ser anómalos para la alerta, la advertencia y la recuperación.

### Estacionalidad {#seasonality}

Por hora
: El algoritmo espera que el mismo minuto después de la hora se comporte como los minutos pasados después de la hora, por ejemplo, 5:15 se comporta como 4:15, 3:15, etc.

Diario
: El algoritmo espera que la misma hora de hoy se comporte como la de días anteriores, por ejemplo, las 5 p.m. de hoy se comportan como las 5 p.m. de ayer.

Semanal
: El algoritmo espera que un día determinado de la semana se comporte como los días pasados de la semana, por ejemplo, este martes se comporta como los martes pasados.

**Historial de datos requerido para el algoritmo de Detección de Anomalías**: Los algoritmos de aprendizaje automático requieren al menos tres veces más datos históricos que el tiempo de estacionalidad elegido para calcular la línea base.
Por ejemplo:

* _la estacionalidad semanal_ requiere al menos tres semanas de datos
* _la estacionalidad diaria_ requiere al menos tres días de datos
* _la estacionalidad horaria_ requiere al menos tres horas de datos

Todos los algoritmos estacionales pueden utilizar hasta seis semanas de datos históricos al calcular el rango normal esperado de comportamiento de una métrica. Al utilizar una cantidad significativa de datos pasados, los algoritmos evitan dar demasiado peso a comportamientos anómalos que podrían haber ocurrido en el pasado reciente.

### Los algoritmos de detección de anomalías {#anomaly-detection-algorithms}
Básico
: Utilizar cuando las métricas no tienen un patrón estacional repetitivo. Básico utiliza un cálculo simple de cuantil móvil rezagado para determinar el rango de valores esperados. Utiliza pocos datos y se ajusta rápidamente a las condiciones cambiantes, pero no tiene conocimiento del comportamiento estacional o de tendencias más largas.

Ágil
: Utilizar cuando las métricas son estacionales y se espera que cambien. El algoritmo se ajusta rápidamente a los cambios en el nivel de la métrica. Una versión robusta del algoritmo [SARIMA][6], incorpora el pasado inmediato en sus predicciones, permitiendo actualizaciones rápidas para cambios de nivel a costa de ser menos robusto ante anomalías recientes y duraderas.

Robusto
: Utilizar cuando se espera que las métricas estacionales sean estables y los cambios de nivel lentos se consideren anomalías. Un algoritmo de [descomposición de tendencia estacional][7], es estable y las predicciones permanecen constantes incluso a través de anomalías duraderas a costa de tardar más en responder a cambios de nivel intencionados (por ejemplo, si el nivel de una métrica cambia debido a un cambio de código).

## Ejemplos {#examples}
Los gráficos a continuación ilustran cómo y cuándo estos tres algoritmos se comportan de manera diferente entre sí.

#### Comparación de detección de anomalías para estacionalidad horaria {#anomaly-detection-comparison-for-hourly-seasonality}
En este ejemplo, `basic` identifica con éxito anomalías que se desvían del rango normal de valores, pero no incorpora el patrón estacional repetitivo en su rango de valores predichos. Por el contrario, `robust` y `agile` reconocen ambos el patrón estacional y pueden detectar anomalías más matizadas, por ejemplo, si la métrica se mantuviera plana cerca de su valor mínimo. La tendencia también muestra un patrón horario, por lo que la estacionalidad horaria funciona mejor en este caso.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="comparación de algoritmos de detección de anomalías con estacionalidad diaria" style="width:90%;">}}

#### Comparación de detección de anomalías para estacionalidad semanal {#anomaly-detection-comparison-for-weekly-seasonality}
En este ejemplo, la métrica exhibe un cambio de nivel repentino. `Agile` se ajusta más rápidamente al cambio de nivel que `robust`. Además, el ancho de los límites de `robust` aumenta para reflejar una mayor incertidumbre después del cambio de nivel; el ancho de los límites de `agile` permanece sin cambios. `Basic` es claramente una mala opción para este escenario, donde la métrica exhibe un fuerte patrón estacional semanal.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="comparación de algoritmos de detección de anomalías con estacionalidad semanal" style="width:90%;">}}

#### Comparación de las reacciones de los algoritmos al cambio {#comparison-of-algorithm-reactions-to-change}
Este ejemplo muestra cómo los algoritmos reaccionan a una anomalía de una hora de duración. `Robust` no ajusta los límites para la anomalía en este escenario ya que reacciona más lentamente a los cambios abruptos. Los otros algoritmos comienzan a comportarse como si la anomalía fuera la nueva normalidad. `Agile` incluso identifica el regreso de la métrica a su nivel original como una anomalía.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="comparación de algoritmos de detección de anomalías con estacionalidad horaria" style="width:90%;">}}

#### Comparación de las reacciones de los algoritmos a la escala {#comparison-of-algorithm-reactions-to-scale}
Los algoritmos manejan la escala de manera diferente. `Basic` y `robust` son insensibles a la escala, mientras que `agile` no lo es. Los gráficos a la izquierda a continuación muestran que `agile` y `robust` marcan el cambio de nivel como anómalo. A la derecha, se añade 1000 a la misma métrica, y `agile` ya no señala el cambio de nivel como anómalo, mientras que `robust` continúa haciéndolo.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="comparación de algoritmos de escala" style="width:90%;">}}

#### Comparación de detección de anomalías para nuevas métricas {#anomaly-detection-comparison-for-new-metrics}
Este ejemplo muestra cómo cada algoritmo maneja una nueva métrica. `Robust` y `agile` no muestran ningún límite durante las primeras temporadas (semanales). `Basic` comienza a mostrar límites poco después de que la métrica aparece por primera vez.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="comparación de algoritmos nueva métrica" style="width:90%;">}}

## Condiciones de alerta avanzadas {#advanced-alert-conditions}

Para instrucciones detalladas sobre las opciones de alerta avanzadas (resolución automática, retraso de evaluación, etc.), consulte la página de [configuración del monitor][8]. Para la opción específica de métrica ventana de datos completa, consulte la página de [monitor de métricas][9].

## Notifications {#notifications}

Para instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulte la página de [Notifications][10].

## API {#api}

Los clientes en un plan empresarial pueden crear monitores de detección de anomalías utilizando el [create-monitor API endpoint][11]. Datadog **recomienda encarecidamente** [exporting a monitor's JSON][12] para construir la consulta para la API. Al utilizar la [página de creación de monitores][1] en Datadog, los clientes se benefician del gráfico de vista previa y la sintonización automática de parámetros para ayudar a evitar un monitor mal configurado.

Los monitores de anomalía se gestionan utilizando la [misma API][14] que otros monitores. Estos campos son únicos para los monitores de anomalía:

### `query` {#query}

La propiedad `query` en el cuerpo de la solicitud debe contener una cadena de consulta en el siguiente formato:

```text
avg(<query_window>):anomalies(<metric_query>, '<algorithm>', <deviations>, direction='<direction>', alert_window='<alert_window>', interval=<interval>, count_default_zero='<count_default_zero>' [, seasonality='<seasonality>']) >= <threshold>
```

`query_window`
: Un marco de tiempo como `last_4h` o `last_7d`. Este parámetro controla el rango de tiempo de los datos mostrados en los gráficos de Notifications. El `query_window` determina cuántos datos históricos aparecen en la visualización, pero no afecta la evaluación de alertas. Datadog recomienda que el `query_window` sea alrededor de cinco veces el `alert_window` para proporcionar contexto adicional. **Nota**: El `query_window` debe ser al menos tan grande como el `alert_window`. 

`metric_query`
: Una consulta de métrica estándar de Datadog (por ejemplo, `sum:trace.flask.request.hits{service:web-app}.as_count()`).

`algorithm`
: `basic`, `agile` o `robust`.

`deviations`
: Un número positivo; controla la sensibilidad de la detección de anomalías.

`direction`
: La direccionalidad de las anomalías que deberían activar una alerta: `above`, `below` o `both`.

`alert_window`
: El marco de tiempo a verificar para anomalías (por ejemplo, `last_5m`, `last_1h`).

`interval`
: Un número entero positivo que representa la cantidad de segundos en el intervalo de resumen. Debería ser menor o igual a una quinta parte de la duración de `alert_window`.

`count_default_zero`
: Usa `true` para la mayoría de los monitores. Establecer en `false` solo si se envía una métrica de conteo en la que la falta de un valor no debería _interpretarse_ como un cero.

`seasonality`
: `hourly`, `daily` o `weekly`. Excluye este parámetro al usar el algoritmo `basic`.

`threshold`
: Un número positivo no mayor que 1. La fracción de puntos en el `alert_window` que debe ser anómala para que se active una alerta crítica.

A continuación se muestra un ejemplo de consulta para un monitor de detección de anomalías, que alerta cuando el CPU promedio de un nodo de Cassandra está tres desviaciones estándar por encima del valor ordinario en los últimos 5 minutos:

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

Esta consulta utiliza `avg` en dos lugares:
- `avg(last_1h)` - Agrega puntos de datos anómalos a lo largo de la ventana de consulta para gráficos de Notifications
- `avg:system.cpu.system{name:cassandra}` - Agrega la métrica de CPU a través de los nodos de Cassandra antes de la detección de anomalías

### `options` {#options}

La mayoría de las propiedades bajo `options` en el cuerpo de la solicitud son las mismas que para otras alertas de consulta, excepto por `thresholds` y `threshold_windows`.

`thresholds`
: Los monitores de anomalías soportan umbrales de `critical`, `critical_recovery`, `warning` y `warning_recovery`. Los umbrales se expresan como números del 0 al 1, y se interpretan como la fracción de la ventana asociada que es anómala. Por ejemplo, un valor de umbral `critical` de `0.9` significa que se activa una alerta crítica cuando al menos el 90% de los puntos en el `trigger_window` (descrito a continuación) son anómalos. O, un valor de `warning_recovery` de 0 significa que el monitor se recupera del estado de advertencia solo cuando el 0% de los puntos en el `recovery_window` son anómalos.
: El `critical` `threshold` debe coincidir con el `threshold` utilizado en el `query`.

`threshold_windows`
: Los monitores de anomalías tienen una propiedad `threshold_windows` en `options`. `threshold_windows` debe incluir ambas propiedades—`trigger_window` y `recovery_window`. Estas ventanas se expresan como cadenas de tiempo, tales como `last_10m` o `last_1h`. El `trigger_window` debe coincidir con el `alert_window` del `query`. El `trigger_window` es el rango de tiempo que se analiza en busca de anomalías al evaluar si un monitor debe activarse. El `recovery_window` es el rango de tiempo que se analiza en busca de anomalías al evaluar si un monitor activado debe recuperarse.

Una configuración estándar de umbrales y ventana de umbral se ve así:

```json
"options": {
  ...
  "thresholds": {
    "critical": 1,
    "critical_recovery": 0
  },
  "threshold_windows": {
    "trigger_window": "last_30m",
    "recovery_window": "last_30m"
  }
}
```

## Solución de problemas {#troubleshooting}

* [Preguntas frecuentes sobre el monitor de anomalías][15]
* [Actualizar la zona horaria del monitor de anomalías][16]
* [Contactar al soporte de Datadog][17]

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/anomaly
[2]: /es/monitors/types/metric/#define-the-metric
[3]: /es/dashboards/functions/algorithms/#anomalies
[4]: /es/monitors/guide/how-to-update-anomaly-monitor-timezone/
[5]: /es/dashboards/functions/rollup/
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /es/monitors/configuration/#advanced-alert-conditions
[9]: /es/monitors/types/metric/#data-window
[10]: /es/monitors/notify/
[11]: /es/api/v1/monitors/#create-a-monitor
[12]: /es/monitors/status/#settings
[13]: mailto:billing@datadoghq.com
[14]: /es/api/v1/monitors/
[15]: /es/monitors/guide/anomaly-monitor/
[16]: /es/monitors/guide/how-to-update-anomaly-monitor-timezone/
[17]: /es/help/