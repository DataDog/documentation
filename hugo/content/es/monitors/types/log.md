---
aliases:
- /es/monitors/monitor_types/log
- /es/monitors/create/types/log/
description: Monitoree los registros indexados para detectar amenazas de seguridad,
  solucionar problemas y alertar cuando los patrones de registros superen los umbrales
  definidos.
further_reading:
- link: /logs/
  tag: Documentación
  text: Descripción general de Log Management
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
- link: /monitors/downtimes/
  tag: Documentación
  text: Programe un tiempo de inactividad para silenciar un seguimiento
- link: /monitors/status/
  tag: Documentación
  text: Verifique el estado de su seguimiento
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilice consultas con notación CIDR para filtrar sus registros de tráfico
    de red
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: Centro de aprendizaje
  text: Seguimiento de registros para Alerting e investigaciones
title: Monitor de registros
---
## Descripción general {#overview}

Los registros son esenciales para las investigaciones de seguridad, ya que ayudan en la detección de amenazas, el seguimiento del cumplimiento y el monitoreo de seguridad. Los sistemas de Log Management correlacionan los registros con datos de observabilidad para una detección rápida de la causa raíz. Log Management también permite solucionar problemas, resolver incidencias y realizar auditorías de seguridad de manera eficiente.

Una vez que [Log Management esté habilitado][1] para su organización, puede crear un monitor de registros para alertarlo cuando un tipo de registro especificado supere un umbral definido por el usuario durante un período de tiempo determinado. El monitor de registros solo evalúa [registros indexados][2].

**Nota**: Los monitores de registros tienen una ventana de tiempo móvil máxima de `2 days`.

## Creación de un seguimiento {#monitor-creation}

Para crear un monitor de registros en Datadog, utilice la navegación principal: [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Logs{{< /ui >}}][3].

<div class="alert alert-info">Existe un límite predeterminado de 1000 monitores de registros por cuenta. Si alcanza este límite, considere usar <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">alertas de varios grupos</a> o <a href="/help/">Contact Support</a>.</div>

### Defina la consulta de búsqueda {#define-the-search-query}

A medida que define la consulta de búsqueda, el gráfico sobre los campos de búsqueda se actualiza.

1. Construya una consulta de búsqueda utilizando la misma lógica que una [búsqueda en Log Explorer][4]. Tenga en cuenta que los [registros de Flex Tier][10], que pueden mostrarse en Log Explorer, no son compatibles con los monitores. Solo se admiten los registros de Standard Tier.
2. Elija monitorear según un recuento de registros, una [faceta][5], un atributo o una [medida][6]:
    * {{< ui >}}Monitor over a log count{{< /ui >}}: Utilice la barra de búsqueda (opcional) y **no** seleccione un atributo o medida. Datadog evalúa la cantidad de registros durante un período de tiempo seleccionado y luego la compara con las condiciones de umbral.
    * {{< ui >}}Monitor over a facet or an attribute{{< /ui >}}: Si se selecciona un atributo, el monitor alerta en función del {{< ui >}}Unique value count{{< /ui >}} del atributo. Por ejemplo, si tiene un atributo como `user.email`, el recuento de valores únicos es el número de correos electrónicos de usuario únicos. Cualquier atributo puede utilizarse en un monitor, pero solo las facetas se muestran en el autocompletado.
    * {{< ui >}}Monitor over measure{{< /ui >}}: Si se selecciona una [medida][6], el monitor alerta en función del valor numérico de la faceta del registro (similar a un monitor de métricas) y se debe seleccionar una agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
3. Agrupe registros por múltiples dimensiones (opcional):

   Datadog agrupa todos los registros que coinciden con la consulta según los valores de las etiquetas, los atributos y hasta cuatro facetas. Cuando hay múltiples dimensiones, los valores principales se determinan de acuerdo con la primera dimensión, luego de acuerdo con la segunda dimensión dentro de los valores principales de la primera dimensión, y así sucesivamente hasta la última dimensión. El límite de dimensiones depende del número total de dimensiones:
   * **1 faceta**: 1000 valores principales
   * **2 facetas**: 30 valores principales por faceta (como máximo 900 grupos)
   * **3 facetas**: 10 valores principales por faceta (como máximo 1000 grupos)
   * **4 facetas**: 5 valores principales por faceta (como máximo 625 grupos)

   Si hay varias consultas o fórmulas definidas en un monitor de registros, puede seleccionar la cantidad de valores más altos o más bajos para cada dimensión.

   El límite total, independientemente del número de facetas, es de 1000 valores principales. Si aumenta este valor por encima de 1000, Datadog ajusta los valores más altos de las otras dimensiones para garantizar que la cantidad de combinaciones resultantes sea inferior a 1000. La cantidad predeterminada de valores más altos para cada agrupación es 10, excepto para la cuarta, que tiene un valor predeterminado de 5.

   Por ejemplo, un monitor de registros con cuatro agrupaciones en la consulta de búsqueda podría tener:
   * **Primera faceta**: 10 valores principales
   * **Segunda faceta**: 10 valores principales
   * **Tercera faceta**: 5 valores principales
   * **Cuarta faceta**: 2 valores principales

4. Opcionalmente, utilice el menú {{< ui >}}Σ Modify Query{{< /ui >}} para refinar la consulta con:
   * **Functions and formulas**: Transforme y combine los resultados de su consulta. Consulte [funciones][11] y [fórmulas][12].
   * **Advanced search**: Delimite las alertas a conjuntos de datos seleccionados, como listas de entidades, niveles de clientes o eventos correlacionados. Consulte [subconsultas][13] y [Reference Tables][14].

   También puede crear un monitor directamente desde una búsqueda avanzada en el [Log Explorer][4].

5. Configure la estrategia de agrupación de alertas (opcional):
    * {{< ui >}}Simple-Alert{{< /ui >}}: Las alertas simples agregan los datos de todas las fuentes que los envían. Usted recibe una alerta cuando el valor agregado cumple con las condiciones establecidas. Esto funciona mejor para hacer un seguimiento de una métrica desde un solo servidor o la suma de una métrica en muchos servidores. Esta estrategia puede seleccionarse para reducir el ruido de las notificaciones.
    * {{< ui >}}Multi Alert{{< /ui >}}: Las alertas múltiples aplican la alerta a cada fuente de acuerdo con sus parámetros de grupo. Se genera un evento de alerta para cada grupo que cumple con las condiciones establecidas. Por ejemplo, podría agrupar `system.disk.in_use` por `device` para recibir una alerta separada por cada dispositivo que se esté quedando sin espacio.

### Establecer condiciones de alerta {#set-alert-conditions}

Activar cuando la consulta cumpla una de las siguientes condiciones en comparación con un valor de umbral:
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

#### Alertas por ausencia de datos y por valores inferiores a {#no-data-and-below-alerts}

De forma predeterminada, un monitor de registros no entra en el estado NO DATA. Las consultas de recuento evalúan los datos faltantes como cero frente a los umbrales, y otras agregaciones, como el promedio, muestran el último estado conocido. Para mostrar NO DATA cuando no hay registros que coincidan con la consulta, o cuando un grupo que anteriormente reportaba datos deja de hacerlo, establezca la opción de datos faltantes en {{< ui >}}Show NO DATA{{< /ui >}} o {{< ui >}}Show NO DATA and notify{{< /ui >}}.

Para recibir una notificación cuando todos los grupos que coinciden con una consulta específica hayan dejado de enviar registros, establezca la condición en `below 1`. Esto notifica cuando no hay registros que coincidan con la consulta del monitor en un marco de tiempo determinado en todos los grupos agregados.

Al dividir el monitor por cualquier dimensión (etiqueta o faceta) y usar una condición `below`, la alerta se activa **si y solo si** hay registros para un grupo determinado y el recuento está por debajo del umbral, o si no hay registros en **ninguno** de los grupos.

**Ejemplos**:

* Este monitor se activa si y solo si no hay registros en ninguno de los servicios:
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Monitor dividido por servicio que se muestra a continuación" style="width:60%;" >}}
* Este monitor se activa si no hay registros para el servicio `backend`:
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Monitor para el servicio backend que se muestra a continuación" style="width:60%;" >}}

#### Condiciones de alerta avanzadas {#advanced-alert-conditions}

Para obtener instrucciones detalladas sobre las opciones de alerta avanzadas (retraso de evaluación, retraso de grupo nuevo, etc.), consulte la página de [Monitor configuration][7].

### Notifications {#notifications}

Para obtener instrucciones detalladas sobre la sección {{< ui >}}Configure notifications and automations{{< /ui >}}, consulte la página de [Notifications][8].

#### Lista de los principales valores que superan el umbral y muestras de registros {#log-samples-and-breaching-values-toplist}

Cuando se activa un monitor de registros, se pueden agregar muestras o valores al mensaje de notificación. Los registros sin mensaje no se incluyen en las muestras. Para agregar el contenido de un atributo de registro al mensaje del monitor, utilice las [variables de plantilla][9] del monitor de registros directamente en el cuerpo del mensaje del monitor.

| Configuración del monitor                    | Se pueden agregar al mensaje de notificación |
|----------------------------------|--------------------------------------|
| Recuento de registros de alerta simple no agrupada | Hasta 10 muestras de registro.                |
| Recuento de registros de alerta simple agrupada   | Hasta 10 valores de faceta o medida.    |
| Recuento de registros de alerta múltiple agrupada    | Hasta 10 muestras de registro.                |
| Medida de alerta simple no agrupada   | Hasta 10 muestras de registro.                |
| Medida de alerta simple agrupada     | Hasta 10 valores de faceta o medida.    |
| Medida de registro de alerta múltiple agrupada  | Hasta 10 valores de faceta o medida.    |

Estas están disponibles para las notificaciones enviadas a Slack, Jira, webhooks, Microsoft Teams, Pagerduty y correo electrónico. **Nota**: Las muestras no se muestran para las notificaciones de recuperación.

Para desactivar las muestras de registros, desmarque la casilla al final de la sección {{< ui >}}Configure notification & automations{{< /ui >}}. El texto junto a la casilla depende de la agrupación del monitor (como se indicó anteriormente).

#### Ejemplos {#examples}

Incluya una tabla de los 10 valores más altos que superan el umbral:
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="10 valores que más exceden el límite" style="width:60%;" >}}

Incluya una muestra de 10 registros en la notificación de alerta:
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="10 valores que más exceden el límite" style="width:60%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/
[2]: /es/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/monitors/create/log
[4]: /es/logs/explorer/search/
[5]: /es/logs/explorer/facets/
[6]: /es/logs/explorer/facets/#measures
[7]: /es/monitors/configuration/#advanced-alert-conditions
[8]: /es/monitors/notify/
[9]: /es/monitors/notify/variables/?tab=is_alert#matching-attributetag-variables
[10]: /es/logs/log_configuration/flex_logs/
[11]: /es/logs/explorer/analytics/#functions
[12]: /es/logs/explorer/analytics/#formulas
[13]: /es/logs/explorer/advanced_search/#filter-logs-with-subqueries
[14]: /es/logs/explorer/advanced_search/#filter-logs-based-on-reference-tables