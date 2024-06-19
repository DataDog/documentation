---
aliases:
- /es/monitors/notify/downtimes/
cascade:
  algolia:
    subcategory: Tiempos de inactividad
    tags:
    - Tiempos de inactividad
    - Silenciar monitores
description: Programar tiempos de inactividad en tus monitores Datadog para evitar
  recibir alertas durante periodos de tiempo específicos
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guía
  text: Suprimir alertas con tiempos de inactividad
- link: /monitors/guide/scoping_downtimes
  tag: Guía
  text: Delimitar los cronogramas de tiempos de inactividad
- link: /monitors/quality/
  tag: Documentación
  text: Ver monitores silenciados durante un periodo prolongado
- link: /monitors/
  tag: Documentación
  text: Crear monitores
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de monitores
kind: documentation
title: Tiempos de inactividad
---

## Información general

Programa tiempos de inactividad para cierres del sistema, mantenimientos fuera de línea o actualizaciones, sin que se activen tus monitores. Los tiempos de inactividad silencian todas las alertas y notificaciones de monitores, pero no impiden las transiciones de estado de los monitores.

{{< img src="/monitors/downtimes/downtime_overview.png" alt="Example of a downtime" (Ejemplo de tiempo de inactividad) style="width:100%;" >}}

## Configuración

### Crear el cronograma de un tiempo de inactividad

Para programar el tiempo de inactividad de un monitor, ve a la página [**Gestionar tiempos de inactividad**][1]. Luego, haz clic en el botón **Schedule Downtime** (Programar tiempo de inactividad), en la parte superior derecha.

Para silenciar un monitor individual, haz clic en el botón **Mute** (Silenciar), en la parte superior de la página de estado del monitor. Esta acción programa un tiempo de inactividad para ese monitor específico.

### Para elegir qué silenciar

Aplica cronogramas de tiempos de inactividad a monitores específicos por nombre, o a un amplio rango de monitores, por etiquetas (tags) de monitor. Aplica filtros adicionales a través de [*Rango de grupo*](#downtime-scope). Haz clic en **Preview affected monitors** (Previsualizar monitores afectados) para ver los monitores incluidos. Para ver más ejemplos y casos de uso, consulta la [delimitación de cronogramas de tiempos de inactividad][2].

**Nota**: Cualquier monitor creado o editado después de programar el tiempo de inactividad se incluye automáticamente en el tiempo de inactividad, si coincide con el contexto.

{{< tabs >}}
{{% tab "By Monitor Name" (Por nombre de monitor) %}}

Busca o utiliza el menú desplegable para elegir qué monitores silenciar. Si el campo se deja vacío, todos los monitores se silencian por defecto. También puedes seleccionar un rango para restringir tu tiempo de inactividad a un host, un dispositivo o una etiqueta (tag) arbitraria específica. Sólo se silencian los monitores que tienen **TODOS los rangos seleccionados**.
{{% /tab %}}
{{% tab "By Monitor Tags" (Por etiquetas de monitor) %}}

Programa un tiempo de inactividad en función de una o varias [etiquetas de monitor)][3]. El número máximo de etiquetas que se pueden seleccionar para un único tiempo de inactividad es 32. Cada etiqueta puede tener un máximo de 256 caracteres. Sólo se silencian los monitores que tienen **TODAS las etiquetas seleccionadas**. También puedes seleccionar rangos para restricciones adicionales.

[3]: /es/monitors/manage/#monitor-tags
{{% /tab %}}
{{% /tabs %}}

#### Delimitación del tiempo de inactividad
Utiliza el rango de grupo para aplicar filtros adicionales a tu tiempo de inactividad y tener un mayor control sobre qué monitores silenciar. El rango de grupo de un tiempo de inactividad se empareja con el objetivo específico del monitor. Si seleccionas varios monitores utilizando etiquetas de monitor, se buscarán los monitores etiquetados antes del emparejamiento con el rango de grupo.

Por ejemplo, imagina que tienes un monitor que observa el promedio de latencia de todos tus servicios. Estás planeando ejecutar una actualización en el servicio `web-store` y estás anticipando solicitudes lentas y errores potenciales.

Quieres asegurarte de que las notificaciones relacionadas con `service:web-store` se silencian y que las demás alertas críticas para el resto de los servicios se envían como de costumbre. Introduce `service:web-store` en el rango de grupo del tiempo de inactividad después de seleccionar los objetivo del monitor.

**Nota**: Esto también funciona con grupos que tienen múltiples dimensiones, por ejemplo `service` y `host`. La creación de un tiempo de inactividad en `service:web-store` silenciaría todos los grupos que incluyen dicho servicio, por ejemplo `service:web-store,host:a` o `service:web-store,host:b`.

#### Sintaxis del rango del tiempo de inactividad
La consulta del rango del tiempo de inactividad sigue la misma [sintaxis de búsqueda][3] común que muchos otros productos compatibles de la plataforma. Para incluir todos los grupos en el rango de un tiempo de inactividad, escribe `*` para el `Group scope`. Otros ejemplos de rangos de grupo incluyen:

| Rango de grupo del tiempo de inactividad | Explicación |
| ------------------- | ---------------------- |
| `service:web-store`       | Silencia todas los notificaciones del servicio `web-store`. |
| `service:web-store AND env:dev`       | Silencia todas los notificaciones del servicio `web-store` que se ejecutan en el entorno`dev`. |
| `env:(dev OR staging)`       | Silencia cualquier notificación relacionada con el entorno `dev` o `staging`. |
| `service:web-store AND env:(dev OR staging)`       | Silencia cualquier notificación relacionada con el servicio `web-store` que se ejecuta en el entorno `dev` o `staging`. |
| `host:authentication-*`       | Silencia cualquier notificación relacionada con un host cuyo nombre lleva el prefijo `authentication-`. |
| `host:*-prod-cluster`       | Silencia cualquier notificación relacionada con un host cuyo nombre lleva el sufijo `-prod-clúster`. |
| `host:*-prod-cluster`       | Silencia cualquier notificación relacionada con un host cuyo nombre lleva el sufijo `-prod-clúster`. |
| `service:webstore AND -env:prod`       | Silencia cualquier notificación del servicio `web-store` que **no** se está ejecutando en el entorno `prod`. |

#### Limitaciones del alcance del tiempo de inactividad
Existen algunas limitaciones que **no son compatibles**, entre las que se incluyen:

* No se admiten más de dos niveles de anidamiento como el siguiente:`team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`. Los tiempos de inactividad aceptan un máximo de dos niveles de anidamiento. Para descomponer esa lógica, utiliza tiempos de inactividad separados.
* La negación sólo se es compatible con pares clave/valor y etiquetas con `OR`. Por ejemplo, `-key:value` and `-key(A OR B)`. Scopes such as `-service:(A AND B)`, `service:(-A OR -B)`, or `-service(A B)` no son compatibles.
* No se admiten los OR de nivel superior, por ejemplo, `service:A OR host:X`. En este caso se requieren dos tiempos de inactividad distintos.
* No se admiten las etiquetas sin clave, como `prod AND service:(A or B)` o simplemente `prod`. Las etiquetas deben tener una clave, por ejemplo `env:prod` en este caso.
* No se admiten los comodines de interrogación: `service:auth?`. Si necesitas aplicar comodines, utiliza `*`.
* Caracteres no válidos dentro de la clave: `en&v:prod` no es un rango de tiempo de inactividad válido y será rechazado.

### Programar el cronograma de un tiempo de inactividad

#### Una vez

Establece un tiempo de inactividad para una única vez introduciendo la fecha de inicio, la hora y la zona horaria. También puedes establecer una fecha y una hora de finalización.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="Fields for scheduling one time downtime" (Campos de programación de un tiempo de inactividad para una única vez) style="width:90%;">}}

#### Recurrente

Los tiempos de inactividad recurrentes son útiles para los periodos de mantenimiento recurrentes. Establece un tiempo de inactividad recurrente introduciendo la fecha de inicio, la hora, la zona horaria, la repetición y la duración. También puedes especificar una fecha de finalización o el número de repeticiones.

Cuando finaliza un único tiempo de inactividad de un tiempo de inactividad recurrente, se cancela el único tiempo de inactividad y se crea un nuevo tiempo de inactividad con las mismas restricciones, y horas de inicio y fin actualizadas. <br>
**Nota**: El creador original se asocia a todos los tiempos de inactividad recién creados.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Downtimes configuration using recurring schedule to mute alerts over the outside of business hours and during the weekend" (Configuración de tiempos de inactividad utilizando un cronograma recurrente para silenciar las alertas fuera del horario laboral y durante el fin de semana) style="width:100%;" >}}

Utiliza [reglas de recurrencia][4] (RRULE) para definir los cronogramas de los tiempos de inactividad. Utiliza el [generador de RRULE][5] oficial como herramienta para generar reglas recurrentes. Un caso de uso común consiste en utilizar las RRULE para definir tiempos de inactividad para días específicos del mes, por ejemplo, el tercer lunes de cada mes. Para ver más casos de uso de recurrencias, consulta la guía para [suprimir alertas con tiempos de inactividad][6].

**Nota**: No se admiten atributos que especifiquen la duración en RRULE (por ejemplo, `DTSTART`, `DTEND`, `DURATION`).

## Notificaciones
### Añadir un mensaje

Introduce un mensaje para alertar a tu equipo sobre este tiempo de inactividad. El campo de mensaje admite el formato markdown estándar y la sintaxis de `@-notification` de Datadog. Consulta la [página de notificaciones][7] para obtener más información sobre las opciones de formato.

### Configurar notificaciones y automatizaciones

Configura notificaciones y automatizaciones especificando los miembros del equipo o enviando el mensaje a una [integración][8] de servicios. Datadog envía notificaciones a los destinos especificados cada vez que un tiempo de inactividad se programa, se inicia, se cancela o expira. Estas notificaciones de auditoría permiten a tu equipo estar al corriente de los tiempos de inactividad en tu sistema.

### Desactivar la notificación de una primera recuperación

Por defecto, Datadog envía una notificación de recuperación de los monitores que se activan **antes** de un tiempo de inactividad y que terminan recuperándose **durante** un tiempo de inactividad. Esto es útil cuando se utilizan integraciones de terceros para cerrar automáticamente incidentes abiertos. Al seleccionar la casilla de verificación se silencian estas notificaciones.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="Mute first recovery notification" (Silenciar la notificación de una primera recuperación) style="width:80%;">}}

La opción de desactivar la notificación de una primera recuperación es aditiva entre varios tiempos de inactividad. Por ejemplo, si varios tiempos de inactividad se superponen y silencian el mismo monitor, la notificación de la primera recuperación se silencia si **al menos un** tiempo de inactividad ha seleccionado la opción para desactivarla.

**Nota**: Esta opción silencia la **primera** notificación de recuperación. Si un monitor se activa y se recupera nuevamente durante un tiempo de inactividad, las notificaciones correspondientes se silencian siempre, independientemente de la configuración de esta opción.

## Gestión

La página [Gestionar tiempos de inactividad][1] muestra la lista de los tiempos de inactividad activos y programados. Selecciona un tiempo de inactividad para ver los detalles, editarlo o eliminarlo. Los detalles incluyen su creador, su contexto y un lista de los monitors a los que se aplica.
Utiliza el panel de facetas y la barra de búsqueda para filtrar la lista con los parámetros `Creator`, `Scope`, `monitor Tags`, o `Active`, `Automuted`, `Recurring`.

{{< img src="monitors/downtimes/downtime_manage.png" alt="Página de gestión de tiempos de inactividad" style="width:100%;">}}

### Historial

El historial de tiempos de inactividad se puede ver en la página [Estado del monitor][9], superpuesto al historial de transición del grupo, y en el [Explorador de eventos][10], buscando `tags:audit downtime` o un tiempo de inactividad específico por ID con `tags:audit downtime_id:<DOWNTIME_ID>`.

### Silenciar

Los monitores activan eventos cuando cambian entre los estados posibles: `ALERT` `WARNING` , `RESOLVED` y `NO DATA`. Cuando un monitor está silenciado o tiene un tiempo de inactividad programado, las transiciones de `RESOLVED` a otro estado **no** activan eventos o notificaciones.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="Monitor status graph showing state transition to alert during downtime, will not create an alert event" (Gráfico de estado de un monitor que muestra que la alerta de transición de estado durante el tiempo de inactividad no crea un evento de alerta) style="width:80%;">}}

**Nota**: Cuando se silencia o se anular el silenciamiento de un monitor desde la página de estado del monitor no se eliminan los tiempos de inactividad programados asociados al monitor. Para editar o eliminar un tiempo de inactividad, consulta la página [Gestionar tiempos de inactividad][1] o utiliza la [API][11].

### Finalización

Por defecto, si un monitor se encuentra en un estado de alerta (`ALERT`, `WARNING` o `NO DATA`) cuando finaliza un tiempo de inactividad, el monitor activa una nueva notificación. Esto se aplica a los monitores que cambian de estado durante los tiempos de inactividad (como de `OK` a `ALERT`, `WARNING` o `NO DATA`) y a los monitores que ya tienen un estado de alerta cuando comienza el tiempo de inactividad. Si se cancela manualmente un tiempo de inactividad, no se envían notificaciones, aunque el monitor haya entrado en estado de alerta.

Para anular el comportamiento predeterminado, especifica qué notificaciones deben enviarse al finalizar un tiempo de inactividad, utilizando las opciones de la sección **Configurar notificaciones y automatizaciones**. En los tiempos de inactividad creados con la API, el comportamiento predeterminado es excluir la opción `Is cancelled`.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="The Configure notifications and automations section of a monitor with specific downtime conditions" (Sección de configuración de notificaciones y automatizaciones de un monitor con condiciones específicas para los tiempos de inactividad) style="width:100%;">}}

**Ejemplo 1:** Si un monitor se encuentra en estado de alerta *antes* de que comience el tiempo de inactividad y *continúa así* mientras dura el tiempo de inactividad:
1. Durante el tiempo de inactividad, se suprimen las notificaciones de esta alerta.
2. El monitor permanece en estado de alerta (porque se siguen cumpliendo las condiciones).
3. El tiempo de inactividad termina.
4. Las condiciones de la alerta se siguen cumpliendo, por lo que se envía una notificación.

**Ejemplo 2:** Si un monitor se encuentra en estado de alerta *antes* de que comience un tiempo de inactividad y se recupera *durante* ese tiempo de inactividad:
1. El estado cambia de `ALERT` a `OK`.
2. La notificación de recuperación se envía durante el tiempo de inactividad, pero sólo para la primera recuperación durante ese tiempo de inactividad.

### Informe del monitor

Todos los estados alertados se incluyen en el [informe semanal del monitor][12], aunque el monitor se encuentre en tiempo de inactividad.

## Auto-silenciar

Datadog puede silenciar proactivamente monitores relacionados con el apagado manual de ciertas cargas de trabajo en la nube. Para el apagado, se admiten los siguientes escenarios de auto-silenciamiento:

- **[Instancias de Amazon EC2][13]** y finalización de instancias mediante el escalado automático AWS, en función de los estados de host de la API CloudWatch.
- **Instancias [Google Compute Engine (GCE)][14]** y finalización de instancias activadas por el escalado automática GCE, en función de los estados de host de la API GCE.
- **[Azure VMs][15]**, tanto si el apagado se ha activado manualmente o por escalado automático Azure, en función de los estados de salud disponibles a través de la API Azure Resource Health.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /es/monitors/guide/scoping_downtimes
[3]: /es/logs/explorer/search_syntax/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
[6]: /es/monitors/guide/suppress-alert-with-downtimes/
[7]: /es/monitors/notify/#overview
[8]: /es/integrations/#cat-notification
[9]: /es/monitors/manage/status/
[10]: /es/service_management/events/explorer
[11]: /es/api/latest/downtimes/#cancel-a-downtime
[12]: /es/account_management/#preferences
[13]: /es/integrations/amazon_ec2/#ec2-automuting
[14]: /es/integrations/google_compute_engine/#gce-automuting
[15]: /es/integrations/azure_vm/#automuting-monitors