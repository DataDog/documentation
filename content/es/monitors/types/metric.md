---
aliases:
- /es/monitors/monitor_types/metric
- /es/monitors/faq/what-is-the-do-not-require-a-full-window-of-data-for-evaluation-monitor-parameter
- /es/monitors/create/types/metric
description: Comparar los valores de una métrica con un umbral definido por el usuario
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
- link: /monitors/types/change-alert
  tag: Documentación
  text: Solución de problemas de los monitores de alerta de cambios
title: Monitor de métrica
---

## Información general

Los monitores de métrica son útiles para un flujo (stream) continuo de datos. Cualquier métrica enviada a Datadog puede dar una alerta si cruza un umbral en un periodo determinado.

Para crear un monitor de métrica en Datadog, navega hasta [**Monitors > New Monitor**][1] (Monitores > Nuevo monitor) y selecciona el tipo de monitor **Metric** (Métrica).

## Elegir el método de detección

{{< tabs >}}
{{% tab "Threshold" %}}

Una alerta de umbral compara los valores de métrica con un umbral estático.

En cada evaluación de alerta, Datadog calcula la media, el mínimo, el máximo o la suma durante el periodo seleccionado y comprueba si está por encima, por debajo, es igual o no es igual al umbral. Esto es para casos de alerta estándar en los que se conocen los valores esperados. El [tipo de métrica de distribución][1] ofrece la opción de umbral adicional de calcular percentiles sobre el periodo seleccionado.

Para más información, consulta la sección [Establecer condiciones de alerta](#set-alert-conditions).

[1]: /es/metrics/distributions/
{{% /tab %}}
{{% tab "Change" %}}

Una alerta de cambio compara el cambio absoluto o relativo (%) en el valor entre `N` minutos atrás y ahora contra un umbral dado. Los puntos de datos comparados no son puntos individuales, sino que se calculan utilizando los parámetros de la sección *Definir la métrica*.

En cada evaluación de alerta, Datadog calcula la diferencia bruta (un valor positivo o negativo) entre la serie actual y la de hace `N` minutos y, a continuación, calcula la media/mínimo/máximo/suma a lo largo del periodo seleccionado. Se activa una alerta cuando esta serie calculada supera el umbral.

Este tipo de alerta es útil para rastrear picos, caídas o cambios lentos en una métrica cuando no hay un umbral inesperado.

Para más información, consulta la guía [Monitores de alerta de cambio][1].

[1]: /es/monitors/types/change-alert/
{{% /tab %}}
{{% tab "Anomaly" %}}

Una alerta de detección de anomalía utiliza el comportamiento pasado para detectar cuándo una métrica se comporta de forma anormal.

Las alertas de anomalía calculan un rango esperado de valores para una serie basándose en el pasado. Algunos de los algoritmos de anomalía utilizan la hora del día y el día de la semana para determinar el rango esperado, captando así anomalías que no podrían detectarse con una simple alerta de umbral. Por ejemplo, la serie es inusualmente alta a las 5 de la mañana, aunque se consideraría normal a las 10 de la mañana.

En cada evaluación de alerta, Datadog calcula el porcentaje de la serie que está por encima, por debajo y fuera del rango esperado. Se activa una alerta cuando este porcentaje supera el umbral configurado.

Para más información, consulta la página [Monitor de anomalía][1].

[1]: /es/monitors/types/anomaly/
{{% /tab %}}
{{% tab "Outliers" %}}

Los monitores outlier detectan cuando un miembro de un grupo (hosts, zonas de disponibilidad, particiones, etc.) se comporta de forma inusual en comparación con el resto.

En cada evaluación de alerta, Datadog comprueba si todos los grupos están unidos y presentan el mismo comportamiento. Se activa una alerta cuando uno o varios grupos divergen del resto de los grupos.

Para más información, consulta la página [Monitor outlier][1].

[1]: /es/monitors/types/outlier/
{{% /tab %}}
{{% tab "Forecast" %}}

Una alerta de predicción predice el comportamiento futuro de una métrica y lo compara con un umbral estático. Es adecuada para métricas con fuertes tendencias o patrones recurrentes.

En cada evaluación de alerta, una alerta de predicción predice los valores futuros de métrica junto con los límites de desviación previstos. Se activa una alerta cuando cualquier parte de los límites supera el umbral configurado.

Para más información, consulta la página [Monitor de predicción][1].

[1]: /es/monitors/types/forecasts/
{{% /tab %}}
{{< /tabs >}}

## Definir la métrica

Cualquier métrica que informe a Datadog está disponible para monitores. Utiliza el editor y los pasos siguientes para definir la métrica. Los parámetros de consulta varían ligeramente en función del método de detección elegido.

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="monitors/monitor_types/metric/metric_threshold_config.png" alt="definir la métrica para el monitor de métrica de detección del umbral" style="width:100%;">}}

| Paso                              | Obligatorio | Predeterminada        | Ejemplo           |
|-----------------------------------|----------|----------------|-------------------|
| Selecciona una métrica                   | Sí      | Ninguna           | `system.cpu.user` |
| Definir el `from`                 | No       | En todas partes     | `env:prod`        |
| Especifica la agregación de métrica        | Sí      | `avg by`       | `sum by`          |
| Agrupar por                          | No       | Todo     | `host`            |
| Especifica la agregación de consultas del monitor | No       | `average`      | `sum`             |
| Intervalo de evaluación                 | No       | `5 minutes`    | `1 day`           |

**Definiciones**

| Opción           | Descripción                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| average          | Se hace una media para obtener un único valor que se compara con el umbral. Esta opción añade la función `avg()` a la consulta de tu monitor.                                   |
| max              | Si algún valor de la serie generada supera el umbral, se activa una alerta. Añade la función max() a tu consulta de monitor. Consulta la sección Notas para conocer el comportamiento adicional del umbral. |
| min              | Si todos los puntos de la ventana de evaluación de tu consulta superan el umbral, se activa una alerta. Añade la función min() a tu consulta de monitor. Consulta la sección Notas para conocer el comportamiento adicional del umbral.|
| sum              | Si la suma de todos los puntos de la serie supera el umbral, se activa una alerta. Añade la función `sum()` a tu consulta de monitor.                               |
| percentile(pXX)  | Si el porcentaje pXX de puntos del intervalo de evaluación de tu consulta supera el umbral, se activa una alerta. Esta opción añade una función `percentile` a tu consulta de monitor. Solo disponible para el tipo de métrica de distribución.
| Intervalo de evaluación| El periodo por el que evalúa el monitor. Utiliza los intervalos preestablecidos como `5 minutes`, `15 minutes`, `1 hour`, o `custom` para establecer un valor entre 1 minuto y 730 horas (1 mes). |

{{% /tab %}}
{{% tab "Change" %}}

{{< img src="monitors/monitor_types/metric/metric_change_alert_config.png" alt="definir la métrica para el monitor de métrica de detección de cambio" style="width:100%;">}}

| Paso                              | Obligatorio | Predeterminada        | Ejemplo           |
|-----------------------------------|----------|----------------|-------------------|
| Selecciona una métrica                   | Sí      | Ninguna           | `system.cpu.user` |
| Definir el `from`                 | No       | En todas partes     | `env:prod`        |
| Especifica la agregación de métrica        | No       | `avg by`       | `sum by`          |
| Agrupar por                          | No       | Todo     | `host`            |
| Especifica la agregación de consultas del monitor | No       | `average`      | `sum`             |
| Selecciona un tipo de cambio              | No       | `change `      | `% change`        |
| Intervalo de evaluación                 | No       | `5 minutes`    | `1 day`           |
| Intervalo de comparación                 | No       | `5 minutes`    | `1 month`         |

**Definiciones**

| Opción           | Descripción                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cambio           | El cambio absoluto del valor.                                                                                                                                             |
| Cambio porcentual    | El cambio porcentual del valor comparado con su valor anterior. Por ejemplo, el cambio porcentual para un valor anterior de 2 con un valor actual de 4 es del 100%.            |
| average          | Se hace una media para obtener un único valor que se compara con el umbral. Esta opción añade la función `avg()` a la consulta de tu monitor.                                   |
| max              | Si algún valor de la serie generada supera el umbral, se activa una alerta. Añade la función max() a tu consulta de monitor. Consulta la sección Notas para conocer el comportamiento adicional del umbral. |
| min              | Si todos los puntos de la ventana de evaluación de tu consulta superan el umbral, se activa una alerta. Añade la función min() a tu consulta de monitor. Consulta la sección Notas para conocer el comportamiento adicional del umbral. |
| sum              | Si la suma de todos los puntos de la serie supera el umbral, se activa una alerta. Añade la función `sum()` a tu consulta de monitor.                               |
| percentile(pXX)  | Si el porcentaje pXX de puntos del intervalo de evaluación de tu consulta supera el umbral, se activa una alerta. Esta opción añade una función `percentile` a tu consulta de monitor. Solo disponible para el tipo de métrica de distribución.
| Intervalo de evaluación| El periodo por el que evalúa el monitor. Utiliza los intervalos preestablecidos como `5 minutes`, `15 minutes`, `1 hour`, o `custom` para establecer un valor entre 1 minuto y 730 horas (1 mes). |

{{% /tab %}}
{{< /tabs >}}

**Notas:**
  - Si se utiliza una métrica de distribución con un agregador de percentil, se especifica automáticamente un umbral de percentil coincidente. Las métricas con agregadores de percentiles no generan un gráfico de snapshot en el mensaje de notificaciones.
  - **max/min*: estas descripciones de max y min asumen que el monitor envía una alerta cuando la métrica supera el umbral. Para monitores que alertan cuando la métrica está por debajo del umbral se aplica la lógica inversa.
  - La definición de métricas para monitores es similar a la definición de métricas para gráficos. Para más detalles sobre el uso de la opción `Advanced...`, consulta [Crear gráficas avanzadas][2].
  - Existen diferentes comportamientos cuando se utiliza `as_count()`. Consulta [as_count() en evaluaciones de monitor][3] para obtener más detalles.

## Definir condiciones de alerta

Se activa cuando la métrica es una de las siguientes:
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

Si el valor está entre cero y uno, se requiere un cero inicial. Por ejemplo, `0.3`.

### Condiciones de alerta avanzadas

#### Intervalo de datos

`Require` o `Do not require` un intervalo completo de datos para tu evaluación.

Esta configuración te permite cambiar el momento en que el motor de alerta considera que un monitor es candidato a ser evaluado.

**Do not require** (No obligatorio) (Por defecto): un monitor se evalúa tan pronto como se reconoce. Considera el uso de este valor si tus puntos de datos pueden ser escasos. Con esta configuración, el monitor se evalúa incluso si hay un solo punto de datos en el marco temporal de evaluación.

**Require** (Obligatorio): un monitor no se evalúa hasta que la ventana de evaluación se considera `filled` con datos. Para que se te notifique si hay datos durante todo el plazo de evaluación, utiliza esta opción.

Para definir si el marco temporal de la evaluación es `filled` con datos, el marco temporal se divide en buckets más pequeños.

La siguiente lógica determina el tamaño del bucket:

* Periodo de evaluación en minutos: el tamaño del bucket es de 1 minuto
* Tiempo de evaluación en horas: el tamaño del bucket es de 10 minutos
* Periodo de evaluación en días: el tamaño del bucket es de 1 hora
* Periodo de evaluación en meses: el tamaño del bucket es de 4 horas

Para que se considere "intervalo completo", el monitor exige:

1. Al menos un punto de datos en el primer bucket. El primer bucket es cronológicamente el bucket más antiguo de la ventana.
2. Como máximo tres buckets en total sin puntos de datos (incluido el primero).

Si se cumplen las condiciones, se evalúa el monitor. En caso contrario, se cancela la evaluación y el estado del monitor no cambia.

Por ejemplo, un monitor que evalúa sobre las últimas `2h` se divide en 12 buckets de 10 minutos. Se considera que el monitor está lleno si el primer bucket tiene datos y como máximo tres bucket en total están vacíos.

| datos   | B0 | B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10 | B11 | ¿Intervalo completo?|
|--------|----|----|----|----|----|----|----|----|----|----|-----|-----|-------------|
| caso 1 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Sí         |
| caso 2 | x  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | No          |
| caso 3 | 1  | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Sí         |
| caso 4 | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | x  | x  | 1   | 1   | No          |

Para más información sobre el intervalo de evaluación, consulta la página [Configuración del monitor][5].

#### Otras opciones

Para obtener instrucciones sobre las opciones avanzadas de alerta (sin datos, resolución automática), consulta la página [Configuración del monitor][6].

## Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][7] y [Configuración del monitor][8].

## Referencias adicionales

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: /es/dashboards/querying/#advanced-graphing
[3]: /es/monitors/guide/as-count-in-monitor-evaluations/
[5]: /es/monitors/configuration/?tab=thresholdalert#evaluation-window
[6]: /es/monitors/configuration/#advanced-alert-conditions
[7]: /es/monitors/notify/
[8]: /es/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations