---
aliases:
- /es/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /es/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /es/developers/faq/what-do-notifications-do-in-datadog
- /es/monitors/notifications/
description: Enviar notificaciones a tus equipos cuando los monitores activan alertas
further_reading:
- link: /monitors/
  tag: Documentación
  text: Crear Monitors
- link: /monitors/manage/
  tag: Documentación
  text: Gestionar los monitores
kind: documentación
title: Notificaciones
---

## Información general

Las notificaciones son un componente clave de los monitores que mantienen a tu equipo informado sobre los problemas y dan soporte para solucionar problemas. Al [crear tu monitor][1], añade a la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones).

## Configurar notificaciones y automatizaciones

Utiliza la sección **Configure notifications and automations**( Configurar notificaciones y automatizaciones) para:
- Envía las notificaciones a tu equipo a través de correo electrónico, Slack, PagerDuty y otras integraciones.
- Activar un flujo de trabajo o crear un flujo de trabajo a partir de monitor.
- Añade un estuche a tu monitor.

### Título

Añade un título único a tu monitor (obligatorio). Para las alertas de múltiples monitores, se insertan automáticamente algunas etiquetas (tags) que identifican tu contexto desencadenante. Además, puedes utilizar [variables de etiqueta][2].

### Mensaje

El campo de mensaje admite [formato Markdown][3] y [variables][4] estándar. Utiliza [variables condicionales][5] para modular el texto de la notificación enviado a diferentes contactos con [@notifications](#notifications).

Un caso de uso común para el mensaje de monitor es incluir una forma de resolver el problema paso a paso, por ejemplo:

```Texto
Pasos para liberar espacio en disco:
1. Eliminar los paquetes que no utilices
2. Borrar la caché de APT
3. Desinstalar aplicaciones innecesarias
4. Eliminar archivos duplicados
```

### Notificaciones

Utiliza una `@notification` para añadir un miembro del equipo, una integración, un flujo de trabajo o un caso a tu notificación. A medida que escribes, Datadog te recomienda las opciones existentes en un menú desplegable. Haz clic en una opción para añadirla a tu notificación. También puedes hacer clic en **@ Add Mention**, **Add Workflow**, o **Add Case** (@ Añadir mención, Añadir flujo de trabajo o Añadir caso).

**Nota**: Una `@notification` debe tener un espacio entre ella y el último carácter de línea, por ejemplo:

```text
Disk space is low @ops-team@company.com
```
`@notifications` pueden enviarse a:

#### Correo electrónico

{{% notifications-email %}}

#### Equipos

Si se establece un canal de notificación, puedes dirigir notificaciones a un equipo específico. Las alertas de monitor dirigidas a @team-handle se redirigen al canal de comunicación seleccionado. Para obtener más información sobre la configuración de un canal de notificación para tu equipo, consulta la documentación [Equipos][6].

#### Integraciones

{{% notifications-integrations %}}

### Flujos de trabajo
Puedes activar una [automatización del flujo de trabajo][7] o crear un nuevo flujo de trabajo a partir de un monitor.

**Para añadir un flujo de trabajo existente a un monitor**:
1. En la sección de mensajes, añade el nombre completo de la mención del flujo de trabajo:
   - El nombre de la mención debe empezar por `@workflow-`. Por ejemplo, `@workflow-my-workflow`
   - Para pasar variables de activación al flujo de trabajo, utiliza una lista separada por comas con la sintaxis `@workflow-name(key=value, key=value)`. Puedes utilizar las variables de plantilla del mensaje como variables desencadenantes. Por ejemplo: `@workflow-my-workflow(hostname=host.name)`

1. También puedes hacer clic en **Add Workflow** (Añadir flujo de trabajo) y buscarlo en el menú desplegable.

Para obtener más información sobre cómo activar un flujo de trabajo, consulta [Activar un flujo de trabajo][8].

**Para crear un flujo de trabajo**:
1. Haz clic en **Add Workflow** (Añadir flujo de trabajo).
1. Haz clic en el icono **+** y selecciona un Blueprint (Proyecto), o selecciona **Start From Scratch** (Empezar desde cero).
   {{< img src="/monitors/notifications/create-workflow.png" alt="Haz clic en el botón + para añadir un nuevo flujo de trabajo" style="width:90%;">}}

Para obtener más información sobre cómo crear un flujo de trabajo, consulta [Crear flujos de trabajo][9].

### Prioridad

Añade una prioridad (opcional) asociada a tus monitores. Los valores van de P1 a P5, siendo P1 la prioridad más alta y P5 la más baja.
Para anular la prioridad del monitor en el mensaje de notificación, utiliza `{{override_priority 'Pi'}}` donde `Pi` está entre P1 y P5.

Por ejemplo, puedes establecer prioridades diferentes para notificaciones `alert` y `warning`:

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}
{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```

### Alternar contenido adicional

Las notificaciones del monitor incluyen contenidos como la consulta de monitor, las @-mentions utilizadas, las snapshots de métrica (para monitores de métrica), y enlaces a páginas relevantes en Datadog. Tienes la opción de elegir qué contenido deseas incluir o excluir de notificaciones para monitores individuales.

Las métricas de distribución con agregadores de percentil (como `p50`, `p75`, `p95`, o `p99`) no generan un gráfico de snapshot en notificaciones.

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Establecer una configuración previa de un monitor" style="width:70%;" >}}

Las opciones son:

- **Por defecto**: no se oculta ningún contenido.
- **Ocultar consulta**: elimina la consulta del monitor del mensaje de notificación.
- **Ocultar identificadores**: eliminar las @-mentions que se utilizan en el mensaje de notificación.
- **Ocultar todo**: el mensaje de notificación no incluye consultas, identificadores, snapshots (para monitores de métrica), ni enlaces adicionales en los pies de página.

**Nota**: Según la integración, es posible que algunos contenidos no se muestren por defecto.

### Metadatos

Añade metadatos (prioridad, etiquetas, equipo de Datadog) a tu monitor. La prioridad del monitor te permite establecer la importancia de tu monitor a través del nivel P (P1 a P5). Las etiquetas de monitor, que son diferentes de las etiquetas de métrica, se utilizan en la interfaz de usuario para agrupar y buscar monitores. Si se configuran las políticas de etiqueta, es necesario añadir los valores de etiqueta y las etiquetas necesarias. Para obtener más información, consulta [Políticas de etiqueta][10]. Los equipos de Datadog te permiten establecer un nivel de propiedad a este monitor y ver todos los monitores vinculados a tu equipo. Para obtener más información, consulta [Equipos de Datadog][11].

{{< img src="monitors/notifications/notifications_metadata.png" alt="Ver una configuración de etiqueta de política. En 'Policy tags' (Etiquetas de política) hay tres ejemplos de etiquetas: cost_center, product_id y env, al lado del menú desplegable 'Select value' (Seleccionar valor)." style="width:100%;" >}}

### Renotificación

Activa la renotificación (opcional) para recordar a tu equipo que un problema no está resuelto.

  {{< img src="monitors/notifications/renotify_options.png" alt="Activar la renotificación" style="width:90%;" >}}

Configura el intervalo de renotificación, los estados del monitor desde los que el monitor vuelve a notificar (dentro de `alert`, `no data` y `warn`) y, opcionalmente, establece un límite al número de mensajes de renovación enviados.

Por ejemplo, configura el monitor en `stop renotifying after 1 occurrence` para recibir un único mensaje de escalada después de la alerta principal.
**Nota:** [Las variables de atributo y etiqueta][12] en la renotificación se rellenan con los datos disponibles en el monitor durante el periodo de la renotificación.

Si se activa la renotificación, se te da la opción de incluir un mensaje de escalada que se envía si el monitor permanece en uno de los estados elegidos durante el periodo especificado.


El mensaje de escalada puede añadirse de las siguientes maneras:

* En el bloque `{{#is_renotify}}` del mensaje original de notificación (recomendado).
* En el campo *Renotification message* (Mensaje de renotificación) de la sección `Configure notifications and automations`.
* Con el atributo `escalation_message` de la API.

Si utilizas el bloque `{{#is_renotify}}`, el mensaje original de notificación también se incluye en la nueva notificación, por lo tanto:

1. Incluye solo detalles adicionales en el bloque `{{#is_renotify}}` y no repitas los detalles del mensaje original.
2. Envía el mensaje de escalada a un subconjunto de grupos.

Descubre cómo configurar tus monitores para esos casos de uso en la [sección de ejemplos][13].


## Definición de permisos y notificaciones de auditoría

### Modificaciones

Se crea un [evento][14] cada vez que se crea, modifica, silencia o elimina un monitor. Configura la opción `Notify` para notificar a los miembros del equipo, a los servicios de chat y al creador del monitor de estos eventos.

### Permisos

Todos los usuarios pueden leer todos los monitores, independientemente del rol al que estén asociados.

Por defecto, solo los usuarios asociados a roles con el [permiso de escritura de monitores][15] pueden editar monitores. [El rol de administrador de Datadog y el rol estándar de Datadog][16] tienen el permiso de escritura de monitores por defecto. Si tu organización utiliza [Roles personalizados][17], otros roles personalizados pueden tener el permiso de escritura de monitores.

Puedes restringir aún más tu monitor especificando una lista de [roles][18] autorizados para editarlo. El creador del monitor siempre puede editar el monitor.

  {{< img src="monitors/notifications/monitor_rbac_restricted.jpg" alt="Monitor restringido por RBAC" style="width:90%;" >}}

La edición incluye cualquier actualización de la configuración de tu monitor, la eliminación del monitor y el silenciamiento del monitor durante cualquier periodo.

**Nota**: Las limitaciones se aplican tanto en la interfaz de usuario como en la API.

Para obtener más información sobre la configuración de RBAC para monitores y la migración de monitores de la configuración bloqueada al uso de restricciones de rol, consulta [Cómo configurar RBAC para monitores][19].

## Notificaciones de prueba

Las notificaciones de prueba son compatibles con los [tipos de monitores][20]: host, métrica, anomalía, outlier, predicción, logs, rum, APM, integración (check solamente), proceso (check solamente), red (check solamente), check personalizado, evento y compuesto.

### Ejecutar la prueba

1. Después de definir tu monitor, prueba las notificaciones con el botón **Test Notifications** (Notificaciones de prueba) situado en la parte inferior derecha de la página del monitor.

2. En la ventana emergente de las notificaciones de prueba, elige el caso de monitor que deseas probar. Solo puedes probar los estados disponibles en la configuración del monitor para los umbrales especificados en las condiciones de alerta. Los [umbrales de recuperación][21] son una excepción, ya que Datadog envía una notificación de recuperación una vez que el monitor ya no está en alerta, o no tiene condiciones de alerta.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Probar las notificaciones de este monitor" style="width:70%;" >}}

3. Haz clic en **Run Test** (Ejecutar prueba) para enviar notificaciones a las personas y servicios que figuran en el monitor.

### Eventos

Las notificaciones de prueba producen eventos que se pueden buscar en el explorador de eventos. Estas notificaciones indican quién inició la prueba en el cuerpo del mensaje con `[TEST]` en el título de la notificación.

Las variables de etiqueta solo se rellenan en el texto de eventos secundarios de Datadog. El evento principal solo muestra un resumen de agregación.

### Variables {#variables-test-notificación}

Las variables de mensaje se rellenan automáticamente con un grupo seleccionado aleatoriamente según la definición de contexto de tu monitor, por ejemplo:

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```
## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration
[2]: /es/monitors/notify/variables/#tag-variables
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /es/monitors/notify/variables/
[5]: /es/monitors/notify/variables/#conditional-variables
[6]: /es/account_management/teams/#send-notifications-to-a-specific-communication-channel
[7]: /es/service_management/workflows/
[8]: /es/service_management/workflows/trigger/#trigger-a-workflow-from-a-monitor
[9]: /es/service_management/workflows/build/
[10]: /es/monitors/settings/#tag-policies
[11]: /es/account_management/teams/
[12]: /es/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[13]: /es/monitors/notify/variables/?tab=is_renotify#examples
[14]: /es/events/
[15]: /es/account_management/rbac/permissions/#monitors
[16]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[17]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[18]: /es/account_management/rbac/?tab=datadogapplication
[19]: /es/monitors/guide/how-to-set-up-rbac-for-monitors/
[20]: /es/monitors/types
[21]: /es/monitors/guide/recovery-thresholds/