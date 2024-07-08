---
aliases:
- /es/monitors/monitor_types/event
- /es/monitors/create/types/event/
description: Monitor de eventos recopilados por Datadog
further_reading:
- link: /service_management/events/
  tag: Documentación
  text: Descripción general de gestión de eventos
- link: /monitors/notify/
  tag: Documentación
  text: Configurar tus notificaciones de monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado del monitor
title: Monitor de eventos
---

## Información general

Datadog crea automáticamente eventos a partir de varios productos, incluidos monitores, Watchdog y rastreo de errores. También puedes rastrear de eventos generados a partir del Agent, integraciones integradas e ingesta de eventos de fuentes, incluidos eventos de alertas de terceros, solicitudes de cambio, despliegues y cambios de configuración.

Los monitores de eventos alertan sobre los eventos incorporados que coinciden con una consulta de búsqueda, lo que te permite centrar la atención en los eventos que más importan a tu equipo.

## Creación de un monitor

Para crear un [monitor de evento][1] en Datadog, navega hasta [**Monitors** > **New Monitor** > **Event**][3] (Monitores > Nuevo monitor > Evento).

<div class="alert alert-info"><strong>Nota</strong>: Existe un límite predeterminado de 1000 monitores de evento por cada cuenta. Si estás por alcanzar este límite, considera la posibilidad de utilizar <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">alertas múltiples</a> o <a href="/help/">ponte en contacto con el servicio de asistencia</a>.</div>

### Definir la consulta de búsqueda

A medida que se define la consulta de búsqueda, el gráfico superior se actualiza.

1. Crea una consulta de búsqueda utilizando la [sintaxis de búsqueda de Event Explorer][2].
2. Elige monitorizar un recuento de eventos o una faceta:
    * **Monitorizar en base a un número de eventos**: utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta. Datadog evalúa el número de eventos en un marco temporal seleccionado y luego lo compara con las condiciones del umbral.
    * **Monitorizar en base a una faceta**: si seleccionas una faceta, el monitor alerta sobre el recuento de valor único de la faceta.
3. Configura la estrategia de agrupación de alertas (opcional):
    * **Alerta simple**: las alertas simples agregan todas las fuentes de información. Recibirás una alerta cuando el valor agregado cumpla las condiciones establecidas. Esto funciona mejor para monitorizar una métrica de un solo host o la suma de una métrica a través de muchos hosts. Esta estrategia puede seleccionarse para reducir el ruido de notificación.
    * **Alerta múltiple**: las alertas múltiples aplican la alerta a cada fuente según tus parámetros de grupo, hasta 1000 grupos coincidentes. Se genera un evento de alerta para cada grupo que cumpla las condiciones establecidas. Por ejemplo, puedes agrupar por `host` para recibir alertas separadas para cada host.

4. Agrupar eventos por múltiples dimensiones (opcional):

   Todos los eventos que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas. Cuando hay varias dimensiones, los valores máximos se determinan según la primera dimensión, luego según la segunda dimensión dentro de los valores máximos de la primera dimensión, y así sucesivamente, hasta la última dimensión. El límite de dimensiones depende del número total de dimensiones:
   * **1 faceta**: 1000 valores máximos
   * **2 facetas**: 30 valores principales por faceta (900 grupos como máximo)
   * **3 facetas**: 10 valores principales por faceta (como máximo 1000 grupos)
   * **4 facetas**: 5 valores principales por faceta (625 grupos como máximo)

### Definir condiciones de alerta

* El recuento era `above`, `above or equal to`, `below`, o `below or equal to`
* `<THRESHOLD_NUMBER>`
* durante los últimos `5 minutes`, `15 minutes`, `1 hour`, etc. o `custom` para fijar un valor entre 5 minutos y 48 horas.

**Nota**: Algunos proveedores introducen un retraso significativo entre el momento en que se **publica** un evento y el momento en que se inicia el evento. En este caso, Datadog retrocede la fecha de evento hasta el momento en que se produce, lo que podría situar una entrada de evento fuera del intervalo de evaluación actual del monitor. La ampliación de tu intervalo de evaluación puede ayudar a tener en cuenta la diferencia horaria. Si necesitas ayuda para ajustar tu configuración de monitor adecuadamente, ponte en contacto con el [soporte de Datadog][3].

#### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (resolución automática, retraso en la evaluación, etc.), consulta la página [Configuración del monitor][4].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][5].

#### Variables de plantilla de evento

Los monitores de evento tienen variables de plantilla específicos que puedes incluir en el mensaje de notificación:

| Variable de plantilla          | Definición                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | El ID del evento.                                                           |
| `{{event.title}}`          | El título del evento.                                                        |
| `{{event.text}}`           | El texto del evento.                                                         |
| `{{event.host.name}}`      | El nombre del host que generó el evento.                                 |
| `{{event.tags}}`           | Una lista de etiquetas adjuntas al evento.                                          |
| `{{event.tags.<TAG_KEY>}}` | El valor de una clave de etiqueta específica adjunta al evento. Consulta el ejemplo siguiente. |

##### Sintaxis de etiquetas `key:value`

Para las etiquetas `env:test` , `env:staging` y `env:prod`:

* `env` es la clave de etiqueta.
* `test`, `staging` y `prod` son los valores de etiqueta.

La variable de plantilla es `{{event.tags.env}}`. El resultado de utilizar esta variable de plantilla es `test`, `staging`, o `prod`.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/event
[2]: /es/service_management/events/explorer/searching
[3]: /es/help/
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/notify/