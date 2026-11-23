---
aliases:
- /es/monitors/monitor_types/event
- /es/monitors/create/types/event/
description: Haga un seguimiento de los eventos recopilados por Datadog
further_reading:
- link: /events/
  tag: Documentación
  text: Descripción general de Event Management
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
- link: /monitors/downtimes/
  tag: Documentación
  text: Programe un tiempo de inactividad para silenciar un seguimiento
- link: /monitors/status/
  tag: Documentación
  text: Verifique el estado de su seguimiento
title: Seguimiento de eventos
---
## Descripción general {#overview}

Datadog crea automáticamente eventos a partir de varios productos, incluidos seguimientos, Watchdog y Error Tracking. También puede realizar un seguimiento de los eventos generados desde el Agent y las integraciones instaladas, e ingerir eventos de fuentes, incluidos eventos de alerta de terceros, solicitudes de cambio, implementaciones y cambios de configuración.

<div class="alert alert-info">Los seguimientos de eventos no alertan sobre <a href="/monitors/status/events/">eventos de seguimiento</a> ya que esto puede crear un bucle infinito.</a></div>

Los seguimientos de eventos alertan sobre eventos ingeridos que coinciden con una consulta de búsqueda, lo que le permite centrar la atención en los eventos que son más importantes para su equipo.

## Creación de un seguimiento {#monitor-creation}

Para crear un seguimiento de eventos en Datadog, navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Event{{< /ui >}}][1].

<div class="alert alert-info">Existe un límite predeterminado de 1000 seguimientos de eventos por cuenta. Si alcanza este límite, considere usar <a href="/monitors/configuration/#set-alert-aggregation">alertas múltiples</a> o <a href="/help/">Contact Support</a>.</div>

### Defina la consulta de búsqueda {#define-the-search-query}

A medida que define la consulta de búsqueda, el gráfico superior se actualiza.

1. Construya una consulta de búsqueda utilizando la [sintaxis de búsqueda del Event Explorer][2].
2. Elija hacer un seguimiento según un recuento de eventos, faceta, etiquetas o atributos:
    * Datadog evalúa la cantidad de eventos durante un período de tiempo seleccionado y luego la compara con las condiciones de umbral.
    * Para algunos atributos y etiquetas, Datadog evalúa los valores agregados (por ejemplo, promedio, mediana, mínimo o suma).
    * {{< ui >}}Monitor over a facet{{< /ui >}}: Si se selecciona una faceta, el seguimiento alerta sobre el recuento de valores únicos de la faceta.
      
3. Agrupe eventos por múltiples dimensiones (opcional): 

   Todos los eventos que coinciden con la consulta se agregan en grupos según el valor de hasta cuatro facetas de evento. Cuando hay múltiples dimensiones, los valores principales se determinan de acuerdo con la primera dimensión, luego de acuerdo con la segunda dimensión dentro de los valores principales de la primera dimensión, y así sucesivamente hasta la última dimensión. El límite de dimensiones depende del número total de dimensiones:
   * **1 faceta**: 1000 valores principales
   * **2 facetas**: 30 valores principales por faceta (como máximo 900 grupos)
   * **3 facetas**: 10 valores principales por faceta (como máximo 1000 grupos)
   * **4 facetas**: 5 valores principales por faceta (como máximo 625 grupos)

   Si hay varias consultas o fórmulas definidas en un seguimiento de eventos, puede seleccionar el número de valores principales o inferiores para cada dimensión.

   El límite total para los valores principales es 1,000, independientemente del número de facetas. Si aumenta el valor principal a un número mayor que 1,000, Datadog ajusta los valores principales para las otras dimensiones para garantizar que el número de combinaciones resultantes sea menor que 1,000. Los valores principales predeterminados para cada agrupación son 10, con la excepción de la cuarta faceta, que tiene como valor predeterminado los cinco valores principales.

   Como ejemplo, un seguimiento de eventos con cuatro agrupaciones en la consulta de búsqueda podría tener:
   * **Primera faceta**: 10 valores principales
   * **Segunda faceta**: 10 valores principales
   * **Tercera faceta**: 5 valores principales
   * **Cuarta faceta**: 2 valores principales

### Establecer condiciones de alerta {#set-alert-conditions}

Activar cuando la consulta cumpla una de las siguientes condiciones en comparación con un valor de umbral:
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

**Nota**: Algunos proveedores introducen un retraso significativo entre el momento en que se **publica** un evento y el momento en que se inicia. En este caso, Datadog retroactúa el evento a la hora en que ocurrió, lo que podría situar un evento entrante fuera de la ventana de evaluación actual del seguimiento. Ampliar su ventana de evaluación puede ayudar a compensar la diferencia horaria.

#### Condiciones de alerta avanzadas {#advanced-alert-conditions}

Para obtener instrucciones detalladas sobre las opciones de alerta avanzadas (resolución automática, retraso de evaluación, etc.), consulte la página de [Monitor configuration][4].

### Notifications {#notifications}

Para obtener instrucciones detalladas sobre la sección {{< ui >}}Configure notifications & automations{{< /ui >}}, consulte la página de [Notifications][5].

#### Variables de plantilla de eventos {#event-template-variables}

Los seguimientos de eventos tienen variables de plantilla específicas que puede incluir en el mensaje de notificación:

| Variable de plantilla          | Definición                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | The ID of the event.                                                           |
| `{{event.title}}`          | The title of the event.                                                        |
| `{{event.text}}`           | The text of the event.                                                         |
| `{{event.host.name}}`      | The name of the host that generated the event.                                 |
| `{{event.tags}}`           | A list of tags attached to the event.                                          |
| `{{event.tags.<TAG_KEY>}}` | El valor de una clave de etiqueta específica adjunta al evento. Consulte el ejemplo a continuación. |

##### Sintaxis de `key:value` etiquetas {#tags-keyvalue-syntax}

Para las etiquetas `env:test`, `env:staging` y `env:prod`:

* `env` es la clave de etiqueta.
* `test`, `staging` y `prod` son los valores de etiqueta.

La variable de plantilla es `{{event.tags.env}}`. The result of using this template variable is `test`, `staging`, or `prod`.

###  Agregación de notificaciones {#notification-aggregation}

Configure la estrategia de agrupación de alertas:
    * {{< ui >}}Simple-Alert{{< /ui >}}: Las alertas simples se agregan sobre todas las fuentes de informes. Usted recibe una alerta cuando el valor agregado cumple con las condiciones establecidas. Esto funciona mejor para hacer un seguimiento de una métrica desde un solo servidor o la suma de una métrica en muchos servidores. Esta estrategia puede seleccionarse para reducir el ruido de las notificaciones.
    * {{< ui >}}Multi Alert{{< /ui >}}: Las alertas múltiples aplican la alerta a cada fuente de acuerdo con sus parámetros de grupo, hasta 1000 grupos coincidentes. Se genera un evento de alerta para cada grupo que cumple con las condiciones establecidas. Por ejemplo, puede agrupar por `host` para recibir alertas separadas para cada servidor.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/event
[2]: /es/events/explorer/searching
[3]: /es/help/
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/notify/