---
aliases:
- /es/monitors/monitor_types/metric
- /es/monitors/faq/what-is-the-do-not-require-a-full-window-of-data-for-evaluation-monitor-parameter
- /es/monitors/create/types/metric
description: Compara los valores de una métrica con un umbral definido por el usuario
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de su monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programe un tiempo de inactividad para silenciar un monitor
- link: /monitors/status/
  tag: Documentación
  text: Consulte el estado de su monitor
- link: /monitors/types/change-alert
  tag: Documentación
  text: Solucione problemas de los monitores de alerta de cambio
title: Metric Monitor
---
## Resumen {#overview}

Los monitores de métricas son útiles para un flujo continuo de datos. Cualquier métrica enviada a Datadog puede generar alertas si supera un umbral durante un período de tiempo determinado.

Para crear un Metric Monitor en Datadog, navegue a [**Monitors > New Monitor**][1] y seleccione el tipo de monitor **Metric**.

## Elija el método de detección {#choose-the-detection-method}

{{< tabs >}}
{{% tab "Umbral" %}}

Una alerta de umbral compara los valores de métricas con un umbral estático.

En cada evaluación de alerta, Datadog calcula el promedio, mínimo, máximo o suma durante el período seleccionado y verifica si está por encima, por debajo, igual o diferente al umbral. Esto es para casos de alerta estándar donde conoce los valores esperados. El [Distribution metric type][1] ofrece la opción adicional de umbral de calcular percentiles durante el período seleccionado.

Para más información, consulte la sección [Set alert conditions](#set-alert-conditions).

[1]: /es/metrics/distributions/
{{% /tab %}}
{{% tab "Change" %}}

Una alerta de cambio compara el cambio absoluto o relativo (%) en el valor entre hace `N` minutos y ahora con un umbral dado. Los puntos de datos comparados no son puntos únicos, sino que se calculan utilizando los parámetros en la sección *Defina la métrica*.

En cada evaluación de alerta, Datadog calcula la diferencia bruta (un valor positivo o negativo) entre la serie actual y hace `N` minutos, luego calcula el promedio/mínimo/máximo/suma durante el período seleccionado. Se activa una alerta cuando esta serie calculada cruza el umbral.

Este tipo de alerta es útil para rastrear picos, caídas o cambios lentos en una métrica cuando no hay un umbral inesperado.

Para más información, consulte la guía de [monitores de alerta de cambio][1].

[1]: /es/monitors/types/change-alert/
{{% /tab %}}
{{% tab "Anomalía" %}}

Una alerta de detección de anomalías utiliza el comportamiento pasado para detectar cuando una métrica se comporta de manera anormal.

Las alertas de anomalía calculan un rango esperado de valores para una serie basado en el pasado. Algunos de los algoritmos de anomalía utilizan la hora del día y el día de la semana para determinar el rango esperado, capturando así anormalidades que no podrían ser detectadas por una alerta de umbral simple. Por ejemplo, la serie es inusualmente alta a las 5 AM, aunque se consideraría normal a las 10 AM.

En cada evaluación de alerta, Datadog calcula el porcentaje de la serie que se encuentra por encima, por debajo y fuera del rango esperado. Se activa una alerta cuando este porcentaje cruza el umbral configurado.

Para más información, consulte la página de [Monitor de Anomalías][1].

[1]: /es/monitors/types/anomaly/
{{% /tab %}}
{{% tab "Valores anómalos" %}}

Los monitores de valores anómalos detectan cuando un miembro de un grupo (servidores, Availability Zones, particiones, etc.) se comporta de manera inusual en comparación con el resto.

En cada evaluación de alerta, Datadog verifica si todos los grupos están agrupados en un clúster y exhiben el mismo comportamiento. Se activa una alerta cuando uno o más grupos se desvían del resto de los grupos.

Para más información, consulte la página de [Outlier Monitor][1].

[1]: /es/monitors/types/outlier/
{{% /tab %}}
{{% tab "Pronóstico" %}}

Una alerta de pronóstico predice el comportamiento futuro de una métrica y lo compara con un umbral estático. Es adecuada para métricas con tendencias fuertes o patrones recurrentes.

En cada evaluación de alerta, una alerta de pronóstico predice los valores futuros de la métrica junto con los límites de desviación esperados. Se activa una alerta cuando cualquier parte de los límites cruza el umbral configurado.

Para más información, consulte la página de [Forecast Monitor][1].

[1]: /es/monitors/types/forecasts/
{{% /tab %}}
{{< /tabs >}}

## Defina la métrica {#define-the-metric}

Cualquier métrica que informe a Datadog está disponible para monitors. Utilice el editor y los pasos a continuación para definir la métrica. Los parámetros de consulta varían ligeramente según el método de detección elegido.

{{< tabs >}}
{{% tab "Umbral" %}}

{{< img src="monitors/monitor_types/metric/metric_threshold_config.png" alt="Defina la métrica para el Threshold Detection Metric Monitor" style="width:100%;">}}

| Paso                              | Requerido | Predeterminado        | Ejemplo           |
|-----------------------------------|----------|----------------|-------------------|
| Seleccione una métrica                   | Sí      | Ninguno           | `system.cpu.user` |
| Defina el `from`                 | No       | En todas partes     | `env:prod`        |
| Especifique la agregación de la métrica        | Sí      | `avg by`       | `sum by`          |
| Agrupar por                          | No       | Todo     | `host`            |
| Especifique la agregación de la consulta del monitor | No       | `average`      | `sum`             |
| Ventana de evaluación                 | No       | `5 minutes`    | `1 day`           |

**Definiciones**

| Opción           | Descripción                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| promedio          | La serie se promedia para producir un solo valor que se verifica contra el umbral. Se agrega la `avg()` función a su consulta de monitor.                                   |
| máx              | Si cualquier valor individual en la serie generada supera el umbral, se activa una alerta. Se agrega la función max() a su consulta de monitor. Consulte la sección de Notas para obtener un comportamiento adicional del umbral. |
| mín              | Si todos los puntos en la ventana de evaluación de su consulta superan el umbral, se activa una alerta. Se agrega la función min() a su consulta de monitor. Consulte la sección de Notas para obtener un comportamiento adicional del umbral.|
| suma              | Si la suma de cada punto en la serie supera el umbral, se activa una alerta. Se agrega la `sum()` función a su consulta de monitor.                               |
| percentil(pXX)  | Si el pXX por ciento de los puntos en la ventana de evaluación de su consulta superan el umbral, se activa una alerta. Esta opción agrega una `percentile` función a su consulta de seguimiento. Solo disponible para el tipo de métrica de distribución.
| Ventana de evaluación| El período de tiempo que el monitor evalúa. Utilice ventanas de tiempo preestablecidas como `5 minutes`, `15 minutes`, `1 hour` o `custom` para establecer un valor entre 1 minuto y 730 horas (1 mes). |

{{% /tab %}}
{{% tab "Change" %}}

{{< img src="monitors/monitor_types/metric/metric_change_alert_config.png" alt="Defina la métrica para el Change Detection Metric Monitor" style="width:100%;">}}

| Paso                              | Requerido | Predeterminado        | Ejemplo           |
|-----------------------------------|----------|----------------|-------------------|
| Seleccione una métrica                   | Sí      | Ninguno           | `system.cpu.user` |
| Defina el `from`                 | No       | En todas partes     | `env:prod`        |
| Especifique la agregación de la métrica        | No       | `avg by`       | `sum by`          |
| Agrupar por                          | No       | Todo     | `host`            |
| Especifique la agregación de la consulta del monitor | No       | `average`      | `sum`             |
| Seleccione un tipo de cambio              | No       | `change `      | `% change`        |
| Ventana de evaluación                 | No       | `5 minutes`    | `1 day`           |
| Ventana de comparación                 | No       | `5 minutes`    | `1 month`         |

**Definiciones**

| Opción           | Descripción                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cambio           | El cambio absoluto del valor.                                                                                                                                             |
| %&nbsp;cambio    | El cambio porcentual del valor en comparación con su valor anterior. Por ejemplo, el cambio porcentual para un valor anterior de 2 con un valor actual de 4 es del 100%.            |
| promedio          | La serie se promedia para producir un solo valor que se verifica contra el umbral. Agrega la función `avg()` a su consulta de monitor.                                   |
| máx              | Si algún valor individual en la serie generada cruza el umbral, se activa una alerta. Se agrega la función max() a su consulta de seguimiento. Consulte la sección de Notas para obtener un comportamiento adicional del umbral. |
| mín              | Si todos los puntos en la ventana de evaluación para su consulta cruzan el umbral, se activa una alerta. Se agrega la función min() a su consulta de seguimiento. Consulte la sección de Notas para obtener un comportamiento adicional del umbral. |
| sum              | Si la suma de cada punto en la serie supera el umbral, se activa una alerta. Agrega la `sum()` función a su consulta de monitor.                               |
| percentil(pXX)  | Si el porcentaje pXX de puntos en la ventana de evaluación para su consulta de monitor supera el umbral, entonces se activa una alerta. Esta opción agrega una función `percentile` a su consulta de monitor. Solo disponible para el tipo de métrica de distribución.
| Ventana de evaluación| El período de tiempo que el monitor evalúa. Utiliza ventanas de tiempo preestablecidas como `5 minutes`, `15 minutes`, `1 hour` o `custom` para establecer un valor entre 1 minuto y 730 horas (1 mes). |

{{% /tab %}}
{{< /tabs >}}

**Notas:**
  - Si se utiliza una métrica de distribución con un agregador de percentiles, se especifica automáticamente un umbral de percentil coincidente. Las métricas con agregadores de percentiles no generan un gráfico instantáneo en el mensaje de notificaciones.
  - **max/min**: Estas descripciones de max y min asumen que el monitor alerta cuando la métrica supera el umbral. Para monitores que alertan cuando están por debajo del umbral, el comportamiento de max y min se invierte.
  - Definir métricas para monitores es similar a definir métricas para gráficos. Para detalles sobre el uso de la `Advanced...` opción, consulta [Gráficos avanzados][2].
  - Existen diferentes comportamientos al utilizar `as_count()`. Consulta [as_count() en Evaluaciones de Monitor][3] para más detalles.
  - `N/A` los grupos no están incluidos en los monitores, por lo que las claves de etiqueta deben tener un valor. 

## Establecer condiciones de alerta {#set-alert-conditions}

Activar cuando la métrica sea una de las siguientes:
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

Si el valor está entre cero y uno, se requiere un cero inicial. Por ejemplo, `0.3`.

### Condiciones avanzadas de alerta {#advanced-alert-conditions}

#### Ventana de datos {#data-window}

`Require` o `Do not require` una ventana completa de datos para evaluación.

Esta configuración permite cambiar cuándo el motor de alertas considera un monitor como candidato para evaluación.

**No requerir** (Predeterminado): Un monitor se evalúa tan pronto como es reconocido. Considere usar este valor si sus puntos de datos pueden ser escasos. Con esta configuración, el monitor se evalúa incluso si hay un solo punto de datos en el período de evaluación.

**Requerir**: Un monitor no se evalúa hasta que la ventana de evaluación se considera `filled` con datos. Para ser notificado si hay datos durante todo el período de evaluación, use esta opción.

Para definir si el período de evaluación es `filled` con datos, el período se divide en intervalos más pequeños.

La siguiente lógica determina el tamaño del intervalo:

* Período de evaluación en minutos: el tamaño del intervalo es de 1 minuto
* Período de evaluación en horas: el tamaño del intervalo es de 10 minutos
* Período de evaluación en días: el tamaño del intervalo es de 1 hora
* Período de evaluación en mes: el tamaño del intervalo es de 4 horas

Para ser considerado como una "ventana completa", el monitor requiere:

1. Al menos un punto de datos en el primer intervalo. El primer intervalo es cronológicamente el más antiguo en la ventana.
2. No más de tres intervalos en total sin puntos de datos.

Si se cumplen las condiciones, se evalúa el monitor. De lo contrario, la evaluación se cancela y el estado del monitor no cambia.

Por ejemplo, un monitor que evalúa en los últimos `2h` se divide en 12 intervalos de 10 minutos. El monitor se considera completo si el primer intervalo tiene datos y a lo sumo tres intervalos en total están vacíos.

| datos   | B0 | B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10 | B11 | ¿Ventana completa?|
|--------|----|----|----|----|----|----|----|----|----|----|-----|-----|-------------|
| caso 1 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Sí         |
| caso 2 | x  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | No          |
| caso 3 | 1  | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Sí         |
| caso 4 | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | x  | x  | 1   | 1   | No          |

Para más información sobre la Ventana de Evaluación, consulte la página de [Monitor configuration][5].

#### Otras opciones {#other-options}

Para instrucciones sobre las opciones avanzadas de alerta (sin datos, resolución automática), consulte la página de [Monitor configuration][6].

## Notifications {#notifications}

Para instrucciones sobre la sección **Configurar Notifications y automatizaciones**, consulte las páginas [Notifications][7] y [Monitor configuration][8].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: /es/dashboards/querying/#advanced-graphing
[3]: /es/monitors/guide/as-count-in-monitor-evaluations/
[5]: /es/monitors/configuration/?tab=thresholdalert#evaluation-window
[6]: /es/monitors/configuration/#advanced-alert-conditions
[7]: /es/monitors/notify/
[8]: /es/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations