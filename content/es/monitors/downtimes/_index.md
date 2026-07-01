---
aliases:
- /es/monitors/notify/downtimes/
cascade:
  algolia:
    subcategory: Downtimes
    tags:
    - downtimes
    - mute monitors
description: Programe tiempos de inactividad para sus Datadog monitors para evitar
  alertas durante períodos específicos.
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guía
  text: Suprimir alertas con tiempos de inactividad
- link: /monitors/guide/scoping_downtimes
  tag: Guía
  text: Definiendo horarios de tiempos de inactividad
- link: /monitors/quality/
  tag: Documentación
  text: Ver monitors que están silenciados por un período prolongado.
- link: /monitors/
  tag: Documentación
  text: Crear monitors
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de monitors.
title: Tiempos de inactividad
---
## Resumen {#overview}

Programe tiempos de inactividad para apagones del sistema, mantenimiento fuera de línea o actualizaciones sin activar sus monitors. Los tiempos de inactividad silencian todas las alertas y notificaciones de los monitors, pero no evitan las transiciones de estado de los monitors.

{{< img src="/monitors/downtimes/downtime_overview.png" alt="Ejemplo de un tiempo de inactividad" style="width:100%;" >}}

## Configuración {#setup}

### Crear un horario de tiempo de inactividad {#create-a-downtime-schedule}

Para programar un tiempo de inactividad de un monitor en Datadog, navegue a la página [**Manage Downtime**][1]. Luego, haga clic en el botón **Schedule Downtime** en la parte superior derecha.

Para silenciar un monitor individual, haga clic en el botón **Mute** en la parte superior de la página de estado del monitor. Esto crea un horario de tiempo de inactividad para ese monitor en particular.

### Elija qué silenciar {#choose-what-to-silence}

Aplica horarios de inactividad a monitors específicos por nombre o a un amplio rango de monitors mediante etiquetas de monitor. Aplica filtros adicionales a través del [*contexto del grupo*](#downtime-scope). Haga clic en **Preview affected monitors** para ver los monitors incluidos. Para más ejemplos y casos de uso, consulte [Scoping downtimes schedules][2].

**Nota**: Cualquier monitor creado o editado después de que se programe el tiempo de inactividad se incluye automáticamente en el mismo si coincide con el contexto.

{{< tabs >}}
{{% tab "Por nombre de monitor" %}}

Busque o utilice el menú desplegable para elegir qué monitors silenciar. Si el campo se deja vacío, todos los monitors se silencian por defecto. También puede seleccionar un contexto para restringir su tiempo de inactividad a un servidor, dispositivo o etiqueta arbitraria específicos. Solo los monitors que tienen **TODOS los contextos seleccionados** son silenciados.
{{% /tab %}}
{{% tab "Por etiquetas de monitor." %}}

Programe un tiempo de inactividad basado en una o más [etiquetas de monitor][3]. El número máximo de etiquetas de monitor que se pueden seleccionar para un solo tiempo de inactividad es 32. Cada etiqueta puede tener un máximo de 256 caracteres. Solo los monitors que tienen **TODAS las etiquetas seleccionadas** son silenciados. También puede seleccionar contextos para restricciones adicionales.

[3]: /es/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

#### Contexto de inactividad {#downtime-scope}
Utilice el contexto del grupo para aplicar filtros adicionales a su tiempo de inactividad y tener más control sobre qué monitors silenciar. El contexto de grupo de un tiempo de inactividad se evalúa después del objetivo específico del monitor. Si apunta a múltiples monitors utilizando etiquetas de monitor, se encuentran monitors que están etiquetados antes de que coincida con el contexto del grupo.

Por ejemplo, un monitor que observa la latencia promedio de todos sus servicios puede encontrar solicitudes lentas y posibles errores al realizar una actualización en el servicio `web-store`.

Le gustaría asegurarse de que las Notifications relacionadas con `service:web-store` estén silenciadas y que otras alertas críticas para los servicios restantes se entreguen como de costumbre. Ingrese `service:web-store` en el contexto del grupo del tiempo de inactividad después de seleccionar los monitors objetivo.

**Nota**: esto también funciona con grupos que tienen múltiples dimensiones, por ejemplo `service` y `host`. Crear un tiempo de inactividad en `service:web-store` silenciaría todos los grupos que incluyen dicho servicio, por ejemplo `service:web-store,host:a` o `service:web-store,host:b`.

#### Sintaxis del contexto de tiempo de inactividad {#downtime-scope-syntax}
La consulta del contexto de tiempo de inactividad sigue la misma [Sintaxis de Búsqueda][3] común que muchos otros productos en la plataforma admiten. Para incluir todos los grupos en el contexto de un tiempo de inactividad, escriba `*` para el `Group scope`. Ejemplos adicionales de contextos de grupo incluyen:

| Contexto de grupo de tiempo de inactividad | Explicación |
| ------------------- | ---------------------- |
| `service:web-store`       | Silencia todas las Notifications sobre el servicio `web-store`. |
| `service:web-store AND env:dev`       | Silencia todas las Notifications sobre el servicio `web-store` que se ejecuta en el entorno `dev`. |
| `env:(dev OR staging)`       | Silencia cualquier Notification relacionada con el entorno `dev` o `staging`. |
| `service:web-store AND env:(dev OR staging)`       | Silencia cualquier Notification relacionada con el servicio `web-store` que se ejecuta en el entorno `dev` o `staging`. |
| `host:authentication-*`       | Silencia cualquier Notification que se relacione con un host cuyo nombre esté precedido por `authentication-`. |
| `host:*-prod-cluster`       | Silencia cualquier Notification que esté relacionada con un host cuyo nombre termina en `-prod-cluster`. |
| `host:*-prod-cluster`       | Silencia cualquier Notification que esté relacionada con un host cuyo nombre termina en `-prod-cluster`. |
| `service:webstore AND -env:prod`       | Silencia cualquier Notification sobre el servicio `web-store` que **no** se esté ejecutando en el entorno `prod`. |

#### Limitaciones del contexto de tiempo de inactividad {#downtime-scope-limitations}
Existen algunas limitaciones que **no son soportadas**, las cuales incluyen:

* Más de dos niveles de anidamiento, como `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`, no son soportados. Como máximo, los tiempos de inactividad aceptan dos niveles de anidamiento. En su lugar, utilice tiempos de inactividad separados para desglosar la lógica.
* La negación solo es soportada para pares clave/valor y etiquetas con `OR`. Por ejemplo, `-key:value` y `-key(A OR B)`. Contextos como `-service:(A AND B)`, `service:(-A OR -B)` o `-service(A B)` no son soportados.
* Los ORs de nivel superior no son soportados. Por ejemplo, `service:A OR service:B` es válido, pero `service:A OR host:X` no funciona. Un `OR` entre dos etiquetas de nivel superior diferentes requiere dos tiempos de inactividad separados.
* Las etiquetas sin clave, como `prod AND service:(A or B)` o solo `prod`, no son soportadas. Las etiquetas necesitan tener una clave, en este caso, por ejemplo, `env:prod`.
* Los comodines de signo de interrogación: `service:auth?` no son compatibles. Utilice `*` en su lugar si necesita usar comodines.
* Caracteres inválidos dentro de la clave: `en&v:prod` no es un contexto de tiempo de inactividad válido y será rechazado.

### Establezca un horario de tiempo de inactividad {#set-a-downtime-schedule}

#### Una vez {#one-time}

Establezca un tiempo de inactividad único ingresando la fecha de inicio, la hora y la zona horaria. Opcionalmente, establezca una fecha y hora de finalización.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="campos para programar tiempo de inactividad único" style="width:90%;">}}

#### Recurrente {#recurring}

Los tiempos de inactividad recurrentes son útiles para ventanas de mantenimiento recurrentes. Establezca un tiempo de inactividad recurrente ingresando la fecha de inicio, la hora, la zona horaria, la repetición y la duración. Opcionalmente, especifique una fecha de finalización o el número de ocurrencias.

Cuando un tiempo de inactividad único de un tiempo de inactividad recurrente termina, el tiempo de inactividad único se cancela y se crea un nuevo tiempo de inactividad con las mismas restricciones y tiempos de inicio y finalización actualizados. <br>
**Nota**: El creador original está asociado con todos los nuevos tiempos de inactividad creados.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Configuración de tiempos de inactividad utilizando un horario recurrente para silenciar alertas fuera del horario laboral y durante el fin de semana." style="width:100%;" >}}

Utilice [reglas de recurrencia][4] (RRULEs) para definir horarios de tiempo de inactividad. Utilice el [generador de RRULE oficial][5] como herramienta para generar reglas recurrentes. Un caso de uso común es utilizar RRULES para definir tiempos de inactividad en días específicos del mes, por ejemplo, el tercer lunes de cada mes. Para más casos de uso sobre recurrencia, consulte la guía para [Suppress alerts with Downtimes][6].

**Nota**: Los atributos que especifican la duración en RRULE no son compatibles (por ejemplo, `DTSTART`, `DTEND`, `DURATION`).

## Notifications {#notifications}
### Agregue un mensaje {#add-a-message}

Ingrese un mensaje para alertar a su equipo sobre este tiempo de inactividad. El campo de mensaje permite el formato markdown estándar y la sintaxis de Datadog `@-notification`. Consulte la [Notifications page][7] para obtener más información sobre las opciones de formato.

### Configurar Notifications y automatizaciones {#configure-notifications-and-automations}

Configure Notifications y automatizaciones especificando miembros del equipo o enviando el mensaje a una [integration][8]. Datadog envía Notifications a los destinos especificados cada vez que se programa, inicia, cancela o expira el tiempo de inactividad. Estas notificaciones de auditoría permiten que su equipo esté al tanto de los tiempos de inactividad en su sistema.

### Deshabilitar la primera notificación de recuperación {#disable-first-recovery-notification}

Por defecto, Datadog envía una notificación de recuperación para los monitores que se activan **antes** de un tiempo de inactividad y terminan recuperándose **durante** un tiempo de inactividad. Esto es útil al usar integraciones de terceros para cerrar automáticamente incidentes abiertos. Seleccionar la casilla de verificación silencia estas notificaciones.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="silenciar la primera notificación de recuperación" style="width:80%;">}}

La opción para deshabilitar la primera notificación de recuperación es aditiva entre múltiples tiempos de inactividad. Por ejemplo, si múltiples tiempos de inactividad se superponen y silencian el mismo monitor, la primera notificación de recuperación se silencia si **al menos uno** de los tiempos de inactividad marcó la opción para deshabilitarla.

**Nota**: Esta opción silencia la **primera** notificación de recuperación. Si un monitor vuelve a activarse y recuperarse durante un tiempo de inactividad, entonces las notificaciones correspondientes siempre se silencian, independientemente de la configuración de esta opción.

## Administrar {#manage}

La [Manage Downtime page][1] muestra la lista de tiempos de inactividad activos y programados. Seleccione un tiempo de inactividad para ver detalles, editar o eliminarlo. Los detalles incluyen su creador, su contexto y una lista de los monitores a los que se aplica.
Utilice el panel de facetas y la barra de búsqueda para filtrar la lista en los parámetros `Creator`, `Scope`, `Monitor Tags`, `Active`, `Automuted`, `Recurring`.

{{< img src="monitors/downtimes/downtime_manage.png" alt="Manage Downtime page" style="width:100%;">}}

### History {#history}

El historial de tiempos de inactividad se puede ver en la [Monitor Status][9] page, superpuesto en el historial de transición del grupo, y en el [Events explorer][10] buscando `tags:audit downtime`, o un tiempo de inactividad específico por ID con `tags:audit downtime_id:<DOWNTIME_ID>`.

### Silenciando {#muting}

Los monitores generan eventos cuando cambian entre posibles estados: `ALERT`, `WARNING`, `RESOLVED` y `NO DATA`. Cuando un monitor está silenciado o tiene un tiempo de inactividad programado, las transiciones de `RESOLVED` a otro estado **no** generan eventos ni notificaciones.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="Gráfico de estado del monitor que muestra la transición de estado a alerta durante el tiempo de inactividad, no creará un evento de alerta." style="width:80%;">}}

**Nota**: Silenciar o desilenciar un monitor desde la Monitor Status page no elimina los tiempos de inactividad programados asociados con el monitor. Para editar o eliminar un tiempo de inactividad, utilice la [Manage Downtime][1] page o la [API][11].

### Expiración {#expiration}

Por defecto, si un monitor está en un estado digno de alerta (`ALERT`, `WARNING` o `NO DATA`) cuando un tiempo de inactividad expira, el monitor genera una nueva notificación. Esto se aplica a los monitores que cambian de estado durante el tiempo de inactividad (como de `OK` a `ALERT`, `WARNING` o `NO DATA`), y a los monitores que ya tienen un estado de alerta cuando comienza el tiempo de inactividad. Si un tiempo de inactividad se cancela manualmente, no se envían notificaciones, incluso si el monitor ha entrado en un estado de alerta.

Para anular el comportamiento predeterminado, especifique qué notificaciones deben enviarse al final del tiempo de inactividad con las opciones en la sección **Configure notifications and automations**. Para los tiempos de inactividad creados con la API, el comportamiento predeterminado es excluir la opción `Is cancelled`.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="La sección <i>Configure notifications and automations</i> de un monitor con condiciones específicas de inactividad." style="width:100%;">}}

**Ejemplo 1:** Si un monitor está en un estado de alerta *antes* de que comience el tiempo de inactividad y *continúa* durante la duración del tiempo de inactividad:
1. Durante el tiempo de inactividad, las notificaciones para esta alerta están suprimidas.
2. El monitor permanece en un estado de alerta (porque las condiciones aún se cumplen).
3. El tiempo de inactividad termina.
4. Las condiciones de alerta aún se cumplen, por lo que se envía una notificación.

**Ejemplo 2:** Si un monitor está en un estado de alerta *antes* de que comience un tiempo de inactividad y se recupera *durante* ese tiempo de inactividad:
1. El estado cambia de `ALERT` a `OK`.
2. La notificación de recuperación se envía durante el tiempo de inactividad, pero solo para la primera recuperación durante ese tiempo de inactividad.

### Monitor report {#monitor-report}

Todos los estados alertados están incluidos en el [weekly monitor report][12] incluso si el monitor está en un tiempo de inactividad.

## Auto-muting {#auto-muting}

Datadog puede silenciar proactivamente monitores relacionados con el apagado manual de ciertas cargas de trabajo en la nube. Los siguientes escenarios de auto-silenciamiento para apagado son compatibles:

- **[Amazon EC2 instances][13]** y terminación de instancias por escalado automático de AWS basado en los estados del servidor desde la API de CloudWatch.
- **[Google Compute Engine (GCE)][14]** y terminación de instancias desencadenada por escalado automático de GCE basado en los estados del servidor desde la API de GCE.
- **[Azure VMs][15]**, ya sea que el apagado haya sido desencadenado manualmente o por el escalado automático de Azure, basado en los estados de salud disponibles a través de la Azure Resource Health API.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /es/monitors/guide/scoping_downtimes
[3]: /es/logs/explorer/search_syntax/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
[6]: /es/monitors/guide/suppress-alert-with-downtimes/
[7]: /es/monitors/notify/#overview
[8]: /es/integrations/#cat-notification
[9]: /es/monitors/status/
[10]: /es/events/explorer
[11]: /es/api/latest/downtimes/#cancel-a-downtime
[12]: /es/account_management/#preferences
[13]: /es/integrations/amazon_ec2/#ec2-automuting
[14]: /es/integrations/google_compute_engine/#gce-automuting
[15]: /es/integrations/azure_vm/#automuting-monitors