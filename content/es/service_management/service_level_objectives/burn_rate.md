---
aliases:
- /es/monitors/service_level_objectives/burn_rate/
description: Utilizar monitores para alertar de la tasa de consumo de un SLO
further_reading:
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: Blog
  text: La tasa de consumo es mejor que la tasa de errores
title: Alertas para la tasa de consumo
---
{{< jqmath-vanilla >}}

## Información general

Las alertas para la tasa de consumo de SLO te notifican cuando la tasa de consumo de tu presupuesto para errores de un SLO ha superado el umbral especificado y se mantiene durante un período específico. Por ejemplo, puedes configurar una alerta si se mide una tasa de consumo de 14,4 o más durante la última hora en los últimos 5 minutos para el objetivo de 30 días de tu SLO. Y puedes configurarlo para que te avise opcionalmente en caso de superar un umbral ligeramente inferior para el que desearías una alerta, por ejemplo, si se observa una tasa de consumo de 7,2 o más.

Las alertas de tasa de consumo están disponibles para los siguientes tipos de SLO:

- [SLOs basados en métricas][1], 
- [SLOs basados en monitores][2] que solo se componen de tipos de monitores de métricas (monitores de métrica, integración, métrica de APM, anomalía, predicción o monitores outlier) y
- [SLOs de fragmento de tiempo][7]

{{< img src="service_management/service_level_objectives/slo-burn-rate-alert-v2.png" alt="Configuración de alertas para la tasa de consumo">}}

## Cómo funcionan las alertas para la tasa de consumo

Una tasa de consumo es un valor sin unidades [acuñado por Google][3] que indica la rapidez con la que se consume tu presupuesto para errores en relación con la duración objetivo de tu SLO. Por ejemplo, para un objetivo de 30 días, una tasa de consumo de 1 significa que tu presupuesto para errores se consumiría por completo en exactamente 30 días si la tasa de 1 se mantuviera constante. Una tasa de consumo de 2 significa que el presupuesto para errores se agotaría en 15 días si se mantiene constante, y una tasa de consumo de 3 significa 10 días, etc.

Esta relación se representa mediante la siguiente fórmula:

$${\text"length of SLO target" \text" (7, 30 or 90 days)"} / \text"burn rate" = \text"time until error budget is fully consumed"\$$

Una alerta para la tasa de consumo utilizará la "tasa de error" reciente en su cálculo para medir la tasa de consumo observada. Ten en cuenta que "tasa de error" significa la proporción de comportamiento incorrecto sobre el comportamiento total durante un *periodo dado*:

$$\text"error rate" = 1 - {\text"good behavior during time period" / \text"total behavior during time period"}$$

Las unidades de "comportamiento" variarán en función del tipo de SLO. Los SLO basados en métricas hacen un seguimiento del número de ocurrencias de algo (como el número de solicitudes exitosas o fallidas), mientras que los SLO basados en monitores siguen cantidades de tiempo (como la caída del sistema y el tiempo de actividad de los monitores).

Cuando fijas un objetivo para tu SLO (como el 99,9%), tu presupuesto para errores es la cantidad de falta de fiabilidad que te permites tener:

$$\text"error budget" = 100% - \text"SLO Target"$$

En otras palabras, tu presupuesto para errores (en forma fraccionaria) es la tasa de errores ideal que deberías mantener. Por lo tanto, una tasa de consumo puede interpretarse como un multiplicador de tu tasa de errores ideal. Por ejemplo, para un SLO del 99,9% durante 30 días, si el SLO experimenta una tasa de consumo de 10, significa que el presupuesto para errores se agotará por completo en 3 días y que la tasa de errores observada es 10 veces la tasa de errores ideal: 

$$(\text"burn rate") (\text"ideal error rate") = \text"observed error rate"$$
$$(10)(0.001) = 0.01$$

Idealmente, siempre deberías intentar mantener una tasa de consumo de 1 durante el transcurso del objetivo de tu SLO (a medida que inviertes en mejorar tu aplicación con nuevas funciones). Sin embargo, en la práctica, tu tasa de consumo fluctuará a medida que los problemas o incidencias hagan que la tasa de consumo aumente rápidamente hasta que se resuelva el problema. Por lo tanto, alertar sobre las tasas de consumo te permite recibir una notificación de forma proactiva cuando un problema está consumiendo tu presupuesto para errores a un ritmo elevado que potencialmente podría causar que no cumplas tu objetivo de SLO.

Cuando configuras una alerta de tasa de consumo, especificas el umbral de la tasa de consumo junto con un "intervalo de alerta largo" y un "intervalo de alerta corto" en los que se medirá la tasa de consumo observada. El intervalo de alerta largo se especifica en horas y garantiza que monitor mida la tasa de consumo durante un período lo suficientemente largo como para corresponder a un problema significativo. De este modo se evita que monitor active alertas erróneas por problemas menores. El intervalo de alerta corto se especifica en minutos. Garantiza que el monitor se recupere rápidamente una vez finalizado el problema real y comprueba si la tasa de consumo reciente sigue estando por encima del umbral. Google recomienda que el intervalo corto sea 1/12 del intervalo largo. Sin embargo, podrás personalizar el intervalo corto mediante programación en Datadog a través de la API o con Terraform. Aquí está la fórmula completa de cómo la alerta de la tasa de consumo evalúa:

$$(\text"long window error rate" / {1 - \text"SLO target"} ≥ \text"burn rate threshold") ∧ (\text"short window error rate" / {1 - \text"SLO target"} ≥ \text"burn rate threshold") = \text"ALERT"$$

## Valores máximos de la tasa de consumo

Como se ha indicado anteriormente, puedes utilizar esta fórmula para evaluar la tasa de consumo observada tanto para el intervalo largo como para el intervalo corto: 

$$\text"error rate" / {1 - \text"SLO target"}$$

La tasa de error máxima que se puede observar es 1 (por ejemplo, cuando el 100% del comportamiento total es deficiente durante el período dado). Esto significa que hay un valor máximo posible de tasa de consumo que puedes utilizar en tus alertas de tasa de consumo: 

$$\text"max burn rate" = 1 / {1 - \text"SLO target"}$$

Cuanto más bajo sea tu objetivo de SLO, más bajo será tu valor máximo de tasa de consumo posible. Si intentaras establecer un umbral de tasa de consumo superior a este valor, sería imposible que se activara la alerta. Si estableces la condición de una alerta para la tasa de consumo en un valor superior al máximo determinado por la fórmula anterior, le estarás diciendo a la alerta para tasa de consumo que te notifique cuando el SLO alcance una tasa de error superior al 100% (lo cual es imposible). Por lo tanto, para evitar que se creen accidentalmente alertas inútiles, Datadog bloquea la creación de alertas que establezcan un valor para la tasa de consumo superior a su máximo.

## Selección de los valores de la tasa de consumo

La elección de los valores de alerta para la tasa de consumo depende del objetivo y del intervalo de tiempo que utilice tu SLO. Cuando configuras una alerta para la tasa de consumo, tu foco principal debe estar en fijar el umbral de la tasa de consumo en sí mismo y fijar el intervalo largo. Datadog recomienda inicialmente mantener el intervalo corto como 1/12 del intervalo largo, como sugiere Google y, luego, ajustar el valor si es necesario después de usar la alerta. Tu tasa de consumo máxima posible estará limitada por la relación descrita en la sección anterior.

### Enfoque nº 1: tiempo hasta agotar el presupuesto para errores

Para el umbral de la tasa de consumo, recuerda la relación anterior:

$$\text"length of SLO target (7, 30, or 90 days)" / \text"burn rate" = \text"time until error budget is fully consumed"$$
Resuelve la tasa de consumo y elige un tiempo para que el presupuesto para errores se agote por completo de manera que se lo considere un problema importante. 

Para el intervalo largo, elige un período en el que una tasa de consumo elevada tendría que mantenerse para indicar un problema real en lugar de un problema transitorio menor. Cuanto mayor sea la tasa de consumo seleccionada, menor deberá ser el intervalo largo (para que los problemas de mayor gravedad se detecten antes).

### Enfoque nº 2: consumo teórico del presupuesto para errores

Alternativamente, puedes pensar en una tasa de consumo y un intervalo largo coincidente en términos del consumo teórico del presupuesto para errores:

$$\text"burn rate" = {\text"length of SLO target (in hours) " * \text" percentage of error budget consumed"} / {\text"long window (in hours) " * 100%}$$

Por ejemplo, para un SLO de 7 días, para recibir una alerta si el consumo teórico del presupuesto para errores es del 10% con 1 hora como intervalo largo, la tasa de consumo seleccionada debería ser:

$$\text"burn rate" = {7 \text"days" * 24 \text"hours" * 10% \text"error budget consumed"} / {1 \text"hour" * 100%} = 16.8$$

**Nota:** Para los SLOs basados en métricas, la relación del Enfoque nº 2 extrapola el número total de ocurrencias contenidas en el intervalo largo a toda la duración del objetivo de SLO. En la práctica, el consumo del presupuesto para errores observado no se corresponderá exactamente con esta relación, ya que el total de ocurrencias rastreadas por el SLO basado en métricas en un intervalo flexible probablemente variará a lo largo del día. El objetivo de una alerta para la tasa de consumo es predecir cantidades significativas de consumo del presupuesto para errores antes de que se produzcan. Para los SLOs basados en monitores, el consumo teórico del presupuesto para errores y el consumo real del presupuesto para errores son iguales porque el tiempo siempre se mueve a una velocidad constante. Por ejemplo, 60 minutos de datos de monitor siempre están contenidos en el intervalo de 1 hora.

## Creación de un monitor

1. Navega hasta la [página de estado de SLO][4].
2. Crea un nuevo SLO o edita uno existente y, a continuación, haz clic en el botón **Save and Set Alert** (Guardar y configurar alerta). Para los SLOs existentes, también puedes hacer clic en el botón **Set up Alerts** (Configurar alertas) del panel lateral de detalles del SLO para acceder directamente a la configuración de la alerta.
3. Selecciona la pestaña **Burn Rate** (Tasa de consumo) en **Step 1: Setting alerting conditions** (Paso 1: Establecer las condiciones de la alerta).
4. Configura una alerta para que se active cuando se mida una determinada tasa de consumo durante un intervalo largo específico:
   * El valor de la tasa de consumo debe estar en el rango de
     $$0 < \text"burn rate" ≤ 1 / {1 - \text"SLO target"}$$
   * Datadog admite un valor máximo de 48 horas para el intervalo largo. Tu intervalo largo debe estar en el rango de `1 hour <= long window <= 48 hours`.
   * A continuación, el intervalo corto se calcula automáticamente en la interfaz de usuario como `short window = 1/12 * long window`.
   * Puedes especificar un valor de intervalo corto diferente utilizando la [API o Terraform](#api-and-terraform), pero siempre debe ser menor que el intervalo largo.
5. Añade [información de notificación][4] en la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones).
6. Haz clic en el botón **Save and Exit** (Guardar y salir) de la página de configuración de SLO.

### Alertas para SLOs con grupos

Para los SLO de Time Slice que contienen grupos, puedes establecer alertas de tasa de consumo basadas en los grupos de SLO o en el SLO global. Si la alerta se basa en los grupos, puedes confiar en la [agregación de alertas][8] para utilizar alertas simples o múltiples. Para los SLOs basados en métricas y en monitores, sólo puedes establecer alertas de tasa de consumo basadas en el SLO global.

### Ejemplos

A continuación, se muestran las tablas de los valores recomendados de Datadog para objetivos de 7, 30 y 90 días.

- Estos ejemplos suponen un objetivo del 99,9%, pero son razonables para objetivos tan bajos como el 96% (la tasa de consumo máxima para el 96% es 25). Sin embargo, si utilizas objetivos más bajos, es posible que necesites umbrales más bajos, como se describe en la sección [Valores máximos de la tasa de consumo](#maximum-burn-rate-values). Datadog recomienda que utilices el [Enfoque nº 2](#approach-2-theoretical-error-budget-consumption) con un valor más pequeño para el consumo teórico del presupuesto para errores o un valor más alto para el intervalo largo.
- Para los SLO basados en métricas, el consumo teórico del presupuesto para errores se calcula extrapolando el número de ocurrencias totales observadas en el intervalo largo de alerta a la duración total del objetivo de SLO. 

Para objetivos de 7 días:

| Tasa de consumo | Intervalo largo | Intervalo corto | Consumo teórico del presupuesto para errores |
|---|---|---|---|
| 16.8  | 1 hora  | 5 minutos  | 10%  |
| 5.6  | 6 horas  | 30 minutos  | 20%  |
| 2.8  | 24 horas  | 120 minutos  | 40%  |

Para objetivos a 30 días:

| Tasa de consumo | Intervalo largo | Intervalo corto | Consumo teórico del presupuesto para errores |
|---|---|---|---|
| 14.4  | 1 hora  | 5 minutos  | 2%  |
| 6  | 6 horas  | 30 minutos  | 5%  |
| 3  | 24 horas  | 120 minutos  | 10%  |

Para objetivos a 90 días:

| Tasa de consumo | Intervalo largo | Intervalo corto | Consumo teórico del presupuesto para errores |
|---|---|---|---|
| 21.6  | 1 hora  | 5 minutos  | 1%  |
| 10.8  | 6 horas  | 30 minutos  | 3%  |
| 4.5  | 24 horas  | 120 minutos  | 5%  |

**Recomendación:** Si encuentras que tu alerta para la tasa de consumo es constantemente demasiado inestable, esto es una indicación de que alargar un poco tu intervalo corto. Sin embargo, ten en cuenta que cuanto mayor sea el intervalo corto, más lenta será la recuperación del monitor después de que un problema ha terminado.

### API y Terraform

Puedes crear alertas para la tasa de consumo del SLO mediante el [endpoint de la API create-monitor][5]. A continuación, se muestra un ejemplo de consulta para una alerta de tasa de consumo, que envía una alerta cuando se mide una tasa de consumo de 14,4 durante la última hora y los últimos 5 minutos. Sustituye *slo_id* por el ID alfanumérico del SLO en el que deseas configurar una alerta de tasa de consumo y sustituye *time_window* por un intervalo de 7d, 30d o 90d, según qué objetivo utilices para configurar tu SLO:

```
burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
```

Además, también se pueden crear alertas de tasa de consumo de SLO utilizando el [recurso datadog_monitor en Terraform][6]. A continuación, se muestra un ejemplo .tf para configurar una alerta de tasa de consumo para un SLO basado en métricas utilizando el mismo ejemplo de consulta anterior.

**Nota:** Las alertas de tasa de consumo de SLO sólo se admiten en el proveedor Terraform v2.7.0 o anterior y en el proveedor v2.13.0 o posterior. Las versiones entre v2.7.0 y v2.13.0 no son compatibles.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Burn Rate Alert Example"
    type  = "slo alert"

    query = <<EOT
    burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
    EOT

    message = "Example monitor message"
    monitor_thresholds {
      critical = 14.4
    }
    tags = ["foo:bar", "baz"]
}
```


[1]: /es/service_management/service_level_objectives/metric/
[2]: /es/service_management/service_level_objectives/monitor/
[3]: https://sre.google/workbook/alerting-on-slos/
[4]: https://app.datadoghq.com/slo
[5]: /es/api/v1/monitors/#create-a-monitor
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[7]: /es/service_management/service_level_objectives/time_slice
[8]: /es/monitors/configuration/#set-alert-aggregation