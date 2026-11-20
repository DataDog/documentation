---
aliases:
- /es/monitors/notify/downtimes/
cascade:
  algolia:
    subcategory: Downtimes
    tags:
    - downtimes
    - mute monitors
description: Programe tiempos de inactividad para sus seguimientos de Datadog para
  evitar alertas durante periodos específicos
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guía
  text: Suprima alertas con tiempos de inactividad
- link: /monitors/guide/scoping_downtimes
  tag: Guía
  text: Definición del contexto de los horarios de tiempo de inactividad
- link: /monitors/quality/
  tag: Documentación
  text: Visualice los seguimientos que están silenciados durante un periodo prolongado
- link: /monitors/
  tag: Documentación
  text: Cree seguimientos.
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de seguimiento
title: Tiempos de inactividad
---
## Descripción general {#overview}

Programe tiempos de inactividad para apagados del sistema, mantenimiento fuera de línea o actualizaciones sin activar sus seguimientos. Los tiempos de inactividad silencian todas las alertas y notificaciones de los seguimientos, pero no impiden las transiciones de estado de los seguimientos.

{{< img src="/monitors/downtimes/downtime_overview.png" alt="Ejemplo de un tiempo de inactividad" style="width:100%;" >}}

## Configuración {#setup}

### Crear un horario de tiempo de inactividad {#create-a-downtime-schedule}

Para programar un tiempo de inactividad de un seguimiento en Datadog, navegue a la página [{{< ui >}}Manage Downtime{{< /ui >}}][1]. Luego, haga clic en el botón {{< ui >}}Schedule Downtime{{< /ui >}} en la parte superior derecha.

Para silenciar un seguimiento individual, haga clic en el icono de silencio (<i class="icon-volume-wui"></i>) en la parte superior de la página de estado del seguimiento. Esto crea un horario de tiempo de inactividad para ese seguimiento en particular. Si no tiene permiso para silenciar el seguimiento, el icono de silencio estará deshabilitado. Consulte [Permisos](#permissions).

### Elija qué silenciar {#choose-what-to-silence}

Aplique horarios de tiempo de inactividad a seguimientos específicos por nombre o a una amplia gama de seguimientos mediante etiquetas de seguimiento. Aplique filtros adicionales a través de [{{< ui >}}Group scope{{< /ui >}}](#downtime-scope). Haga clic en {{< ui >}}Preview affected monitors{{< /ui >}} para ver los seguimientos incluidos. Si su organización utiliza [controles de acceso a tiempos de inactividad](#permissions-and-access-controls), la vista previa solo enumera los seguimientos que tiene permiso para silenciar. Para obtener más ejemplos y casos de uso, consulte [Definición del contexto de los horarios de tiempo de inactividad][2].

**Nota**: Cualquier seguimiento creado o editado después de programar el tiempo de inactividad se incluye automáticamente en el tiempo de inactividad si coincide con el contexto.

{{< tabs >}}
{{% tab "Por nombre de seguimiento" %}}

Busque o utilice el menú desplegable para elegir qué seguimientos silenciar. Si el campo se deja vacío, todos los seguimientos se silencian de forma predeterminada. También puede seleccionar un contexto para limitar el tiempo de inactividad a un servidor, dispositivo o etiqueta arbitraria específicos. Solo se silencian los seguimientos que tienen **TODOS los contextos seleccionados**.
{{% /tab %}}
{{% tab "Por etiquetas de seguimiento" %}}

Programe un tiempo de inactividad basado en una o más [etiquetas de seguimiento][3]. El número máximo de etiquetas que se pueden seleccionar para un solo tiempo de inactividad es 32. Cada etiqueta puede tener un máximo de 256 caracteres de longitud. Solo se silencian los seguimientos que tienen **TODAS las etiquetas seleccionadas**. También puede seleccionar contextos para establecer restricciones adicionales.

[3]: /es/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

#### Contexto del tiempo de inactividad {#downtime-scope}
Utilice el contexto de grupo para aplicar filtros adicionales a su tiempo de inactividad y tener más control sobre qué seguimientos silenciar. El contexto de grupo de un tiempo de inactividad se compara después del objetivo específico del seguimiento. Si selecciona varios seguimientos mediante etiquetas de seguimiento, primero se encuentran los seguimientos etiquetados y luego se compara el contexto de grupo.

Por ejemplo, un seguimiento que analiza la latencia promedio de todos sus servicios puede detectar solicitudes lentas y posibles errores mientras se ejecuta una actualización en el servicio `web-store`.

Usted desea asegurarse de que las notificaciones relacionadas con `service:web-store` se silencien y que otras alertas críticas para los servicios restantes se entreguen como de costumbre. Ingrese `service:web-store` en el contexto de grupo del tiempo de inactividad después de seleccionar los objetivos de seguimiento.

**Nota**: esto también funciona con grupos que tienen múltiples dimensiones, por ejemplo `service` y `host`. Crear un tiempo de inactividad en `service:web-store` silenciaría todos los grupos que incluyen dicho servicio, por ejemplo `service:web-store,host:a` o `service:web-store,host:b`.

#### Sintaxis del contexto del tiempo de inactividad {#downtime-scope-syntax}
La consulta del contexto del tiempo de inactividad sigue la misma [sintaxis de búsqueda][3] habitual que admiten muchos otros productos de la plataforma. Para incluir todos los grupos en el contexto de un tiempo de inactividad, escriba `*` para `Group scope`. Otros ejemplos de contextos de grupo incluyen:

| Contexto de grupo del tiempo de inactividad | Explicación |
| ------------------- | ---------------------- |
| `service:web-store`       | Silencia todas las notificaciones sobre el servicio `web-store`. |
| `service:web-store AND env:dev`       | Silencia todas las notificaciones sobre el servicio `web-store` que se ejecuta en el entorno `dev`. |
| `env:(dev OR staging)`       | Silencia cualquier notificación relacionada con el entorno `dev` o `staging`. |
| `service:web-store AND env:(dev OR staging)`       | Silencia cualquier notificación relacionada con el servicio `web-store` que se ejecuta en el entorno `dev` o `staging`. |
| `host:authentication-*`       | Silencia cualquier notificación relacionada con un servidor cuyo nombre tenga el prefijo `authentication-`. |
| `host:*-prod-cluster`       | Silencia cualquier notificación relacionada con un servidor cuyo nombre tenga el sufijo `-prod-cluster`. |
| `host:*-prod-cluster`       | Silencia cualquier notificación relacionada con un servidor cuyo nombre tenga el sufijo `-prod-cluster`. |
| `service:webstore AND -env:prod`       | Silencia cualquier notificación sobre el servicio `web-store` que **no** se esté ejecutando en el entorno `prod`. |

#### Limitaciones del contexto del tiempo de inactividad {#downtime-scope-limitations}
Hay algunas restricciones; **no se admiten** las siguientes opciones:

* No se admiten más de dos niveles de anidamiento, como `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`. Como máximo, los tiempos de inactividad aceptan dos niveles de anidamiento. En su lugar, utilice tiempos de inactividad separados para desglosar la lógica.
* La negación solo se admite para pares clave/valor y etiquetas con `OR`. Por ejemplo, `-key:value` y `-key(A OR B)`. Contextos como `-service:(A AND B)`, `service:(-A OR -B)` o `-service(A B)` no son compatibles.
* Los OR de nivel superior no son compatibles. Por ejemplo, `service:A OR service:B` es válido, pero `service:A OR host:X` no funciona. Un `OR` entre dos etiquetas de nivel superior diferentes requiere dos tiempos de inactividad separados.
* Las etiquetas sin clave, como `prod AND service:(A or B)` o simplemente `prod`, no son compatibles. Las etiquetas deben tener una clave, en este caso, por ejemplo, `env:prod`.
* Comodines de signo de interrogación: `service:auth?` no son compatibles. Use `*` en su lugar si necesita usar comodines.
* Caracteres no válidos dentro de la clave: `en&v:prod` no es un contexto de tiempo de inactividad válido y se rechazará.

### Establecer un horario de tiempo de inactividad {#set-a-downtime-schedule}

#### Una vez {#one-time}

Establezca un tiempo de inactividad único ingresando la fecha de inicio, la hora y la zona horaria. Opcionalmente, establezca una fecha y hora de finalización.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="campos para programar un tiempo de inactividad único" style="width:90%;">}}

#### Recurrente {#recurring}

Los tiempos de inactividad recurrentes son útiles para ventanas de mantenimiento recurrentes. Establezca un tiempo de inactividad recurrente ingresando la fecha de inicio, la hora, la zona horaria, la repetición y la duración. Opcionalmente, especifique una fecha de finalización o un número de ocurrencias.

Cuando finaliza un tiempo de inactividad único de un tiempo de inactividad recurrente, el tiempo de inactividad único se cancela y se crea uno nuevo con las mismas restricciones y con las horas de inicio y finalización actualizadas. <br>
**Nota**: El creador original está asociado con todos los tiempos de inactividad recién creados.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Configuración de tiempos de inactividad mediante un horario recurrente para silenciar alertas fuera del horario laboral y durante el fin de semana" style="width:100%;" >}}

Utilice [reglas de recurrencia][4] (RRULEs) para definir los horarios de tiempos de inactividad. Utilice el [generador de RRULE][5] oficial como herramienta para generar reglas recurrentes. Un caso de uso común es utilizar RRULES para definir tiempos de inactividad en días específicos del mes, por ejemplo, el tercer lunes de cada mes. Para obtener más casos de uso sobre recurrencia, consulte la guía para [Suprimir alertas con tiempos de inactividad][6].

**Nota**: Los atributos que especifican la duración en RRULE no son compatibles (por ejemplo, `DTSTART`, `DTEND`, `DURATION`).

## Notifications {#notifications}
### Agregar un mensaje {#add-a-message}

Ingrese un mensaje para alertar a su equipo sobre este tiempo de inactividad. El campo de mensaje permite formato markdown estándar y la sintaxis `@-notification` de Datadog. Consulte la [página de Notifications][7] para obtener más información sobre las opciones de formato.

### Configure las notificaciones y automatizaciones {#configure-notifications-and-automations}

Configure notificaciones y automatizaciones especificando miembros del equipo o enviando el mensaje a una [integración][8] de servicio. Datadog envía notificaciones a los destinos especificados cada vez que el tiempo de inactividad se programa, inicia, cancela o vence. Estas notificaciones de auditoría permiten que su equipo esté al tanto de los tiempos de inactividad en su sistema.

### Desactivar primera notificación de recuperación {#disable-first-recovery-notification}

De forma predeterminada, Datadog envía una notificación de recuperación para los seguimientos que se activan **antes** de un tiempo de inactividad y terminan recuperándose **durante** un tiempo de inactividad. Esto es útil cuando se utilizan integraciones de terceros para cerrar automáticamente los incidentes abiertos. Al seleccionar la casilla de verificación se silencian estas notificaciones.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="silenciar la primera notificación de recuperación" style="width:80%;">}}

La opción para deshabilitar la primera notificación de recuperación es aditiva entre múltiples tiempos de inactividad. Por ejemplo, si varios tiempos de inactividad se superponen y silencian el mismo seguimiento, la primera notificación de recuperación se silencia si **al menos un** tiempo de inactividad marcó la opción para deshabilitarla.

**Nota**: Esta opción silencia la **primera** notificación de recuperación. Si un seguimiento vuelve a activarse y recuperarse durante un tiempo de inactividad, las notificaciones correspondientes siempre se silencian, independientemente de la configuración de esta opción.

## Permisos y controles de acceso {#permissions-and-access-controls}

{{< callout url="#" btn_hidden="true" header="Preview" >}}
El nivel de acceso Muter y los controles de acceso a tiempos de inactividad están en Preview.
{{< /callout >}}

Para programar, editar o cancelar tiempos de inactividad, necesita el [permiso Manage Downtimes][16].

Con los controles de acceso a tiempos de inactividad, un tiempo de inactividad solo silencia los seguimientos que usted tiene permiso para silenciar (nivel de [acceso][17] **Muter** o **Editor**). Los equipos de Teams pueden delegar el silenciamiento a ingenieros de guardia o cuentas de servicio sin el riesgo de que un tiempo de inactividad silencie seguimientos que no les pertenecen.

**Nota**: Un tiempo de inactividad se ejecuta con el acceso de su creador y no puede cambiarlo después de que se haya creado. Si un equipo central programa tiempos de inactividad para seguimientos restringidos a otros equipos, otorgue a ese equipo acceso de Muter a esos seguimientos.

## Manage {#manage}

La página [{{< ui >}}Manage Downtime{{< /ui >}}][1] muestra la lista de tiempos de inactividad activos y programados. Seleccione un tiempo de inactividad para visualizar sus detalles, editarlo o eliminarlo. Los detalles incluyen su creador, su contexto y una lista de los seguimientos a los que se aplica.
Utilice el panel de facetas y la barra de búsqueda para filtrar la lista según los parámetros {{< ui >}}Creator{{< /ui >}}, {{< ui >}}Scope{{< /ui >}}, {{< ui >}}Monitor Tags{{< /ui >}} o {{< ui >}}Active{{< /ui >}}, {{< ui >}}Automuted{{< /ui >}}, {{< ui >}}Recurring{{< /ui >}}.

{{< img src="monitors/downtimes/downtime_manage.png" alt="página de administración de tiempos de inactividad" style="width:100%;">}}

### Historial {#history}

El historial de tiempos de inactividad se puede visualizar en la página [Monitor Status][9], superpuesto al historial de transiciones de grupo, y en [Events explorer][10] buscando `tags:audit downtime` o un tiempo de inactividad específico por ID con `tags:audit downtime_id:<DOWNTIME_ID>`.

### Silenciamiento {#muting}

Los seguimientos activan eventos cuando cambian entre los estados posibles: `ALERT`, `WARNING`, `RESOLVED` y `NO DATA`. Cuando un seguimiento está silenciado o tiene un tiempo de inactividad programado, las transiciones de `RESOLVED` a otro estado **no** activan eventos ni notificaciones.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="Gráfico del estado del seguimiento que muestra la transición al estado de alerta durante el tiempo de inactividad; no se creará un evento de alerta" style="width:80%;">}}

**Nota**: Silenciar o reactivar un seguimiento desde la página de estado del seguimiento no elimina los tiempos de inactividad programados asociados con ese seguimiento. Para editar o eliminar un tiempo de inactividad, utilice la página [{{< ui >}}Manage Downtime{{< /ui >}}][1] o la [API][11].

### Vencimiento {#expiration}

De forma predeterminada, si un seguimiento se encuentra en un estado que merece una alerta (`ALERT`, `WARNING` o `NO DATA`) cuando vence un tiempo de inactividad, el seguimiento activa una nueva notificación. Esto se aplica a los seguimientos que cambian de estado durante el tiempo de inactividad (como de `OK` a `ALERT`, `WARNING` o `NO DATA`), y a los seguimientos que ya tienen un estado que merece una alerta cuando comienza el tiempo de inactividad. Si un tiempo de inactividad se cancela manualmente, no se envían notificaciones, incluso si el seguimiento ha entrado en un estado que merece una alerta.

Para anular el comportamiento predeterminado, especifique qué notificaciones deben enviarse al finalizar los tiempos de inactividad con las opciones en la sección {{< ui >}}Configure notifications and automations{{< /ui >}}. Para los tiempos de inactividad creados con la API, el comportamiento predeterminado es excluir la opción `Is cancelled`.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="La sección Configure notifications and automations de un seguimiento con condiciones de tiempo de inactividad específicas" style="width:100%;">}}

**Ejemplo 1:** Si un seguimiento está en estado de alerta *antes* de que comience el tiempo de inactividad y *continúa* así durante todo ese período:
1. Durante el tiempo de inactividad, las notificaciones para esta alerta se suprimen.
2. El seguimiento permanece en estado de alerta (porque las condiciones aún se cumplen).
3. El tiempo de inactividad termina.
4. Las condiciones de alerta aún se cumplen, por lo que se envía una notificación.

**Ejemplo 2:** Si un seguimiento está en estado de alerta *antes* de que comience un tiempo de inactividad y se recupera *durante* ese tiempo de inactividad:
1. El estado cambia de `ALERT` a `OK`.
2. La notificación de recuperación se envía durante el tiempo de inactividad, pero solo para la primera recuperación durante ese tiempo de inactividad.

### Informe de seguimiento {#monitor-report}

Todos los estados de alerta se incluyen en el [informe semanal de seguimiento][12] incluso si el seguimiento está en tiempo de inactividad.

## Silenciamiento automático {#auto-muting}

Datadog puede silenciar de forma proactiva los seguimientos relacionados con el apagado manual de ciertas cargas de trabajo en la nube. Se admiten los siguientes escenarios de silenciamiento automático por apagado:

- **[Instancias de Amazon EC2][13]** y terminación de instancias mediante el escalado automático de AWS según los estados de los servidores obtenidos de la API de CloudWatch.
- **Instancias de [Google Compute Engine (GCE)][14]** y terminación de instancias activada por el escalado automático de GCE según los estados de los servidores obtenidos de la API de GCE.
- **[Azure VMs][15]**, ya sea que el apagado se haya activado manualmente o por escalado automático de Azure, según los estados de salud disponibles a través de la API de Azure Resource Health.

## Lecturas adicionales {#further-reading}

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
[16]: /es/account_management/rbac/permissions/#monitors
[17]: /es/monitors/configuration/#access-levels