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
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centro de aprendizaje
  text: Realiza un curso para personalizar las notificaciones de monitor de alertas
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirigir tus alertas de monitor con las reglas de notificación de monitor de
    Datadog
title: Notificaciones
---

## Información general

Las notificaciones son un componente clave de los monitores, que mantienen a tu equipo informado de los problemas y ayudan a solucionarlos. Al [crear tu monitor][1], configura tu respuesta para:
- Crear un mensaje procesable.
- Activa un flujo de trabajo o crea un flujo de trabajo a partir de un monitor.
- [Crear automáticamente un incidente][2].
- Crear automáticamente un incidente.

## Crear títulos y mensajes eficaces

Este enfoque ayuda a garantizar que los títulos y mensajes de monitor sean claros, prácticos y adaptados a las necesidades de tu público.
- **Títulos exclusivos**: Añade un título único a tu monitor (obligatorio). Para los monitores de alertas múltiples, se insertan automáticamente algunas etiquetas (tags) que identifican tu contexto de activación. Puedes utilizar [variables de etiqueta][3] para mejorar la especificidad.
- **Campo de mensaje**: El campo de mensaje admite el [formato Markdown][4] y [variables][5] estándar. Utiliza [variables condicionales][6] para modular el texto de notificación enviado a diferentes contactos con [@notificaciones](#notifications).

{{% collapse-content title="Ejemplo de mensaje monitor" level="h4" expanded=false %}}
Un caso de uso frecuente de un mensaje de monitor consiste en incluir una forma de resolver el problema paso a paso, por ejemplo:

```text
{{#is_alert}} <-- conditional variable

Steps to free up disk space on {{host.name}}: <-- tag variable

1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files

@slack-incident-response <-- channel to send notification

{{/is_alert}}

```

{{% /collapse-content %}}


## Destinatarios de notificaciones
Datadog recomienda utilizar [reglas de notificación de monitor][22] para gestionar las notificaciones de monitores. Con las reglas de notificación puedes definir de forma automática qué destinatarios de notificaciones se añaden a un monitor, en función de una serie de condiciones predefinidas. Crea diferentes reglas para dirigir las alertas de monitor en función de las etiquetas de notificación de monitor, para no tener que configurar manualmente los destinatarios ni la lógica de enrutamiento de notificaciones para cada monitor individual.

Tanto en las reglas de notificación como en los monitores individuales, puedes utilizar una`@notification` para añadir un miembro del equipo, una integración, un flujo de trabajo o un caso a tu notificación. A medida que escribes, Datadog te recomienda automáticamente las opciones existentes en un menú desplegable. Haz clic en una opción para añadirla a tu notificación. También puedes hacer clic en **@ Add Mention**, **Add Workflow** o **Add Case** (@ Añadir mención, Añadir flujo de trabajo o **Añadir caso).

Una @notificación debe tener un espacio entre ella y el último carácter de la línea:

| 🟢 Formato correcto | ❌ Formato incorrecto |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Correo electrónico" level="h4" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h4" expanded=false %}}
Si se configura un canal de notificación, puedes dirigir las notificaciones a un equipo específico. Las alertas de monitor dirigidas a @team-handle se redirigen al canal de comunicación seleccionado. Para obtener más información sobre cómo configurar un canal de notificación para tu equipo, consulta la documentación [Teams][7].
{{% /collapse-content %}}

{{% collapse-content title="Integraciones" level="h4" expanded=false %}}

{{% notifications-integrations %}}

{{% /collapse-content %}}

### Edición en bloque de @-handles de monitor
Datadog permite editar los destinatarios de los mensajes de alerta en varios monitores a la vez. Utiliza esta función para añadir, eliminar o sustituir eficazmente `@-handles` en el cuerpo del mensaje del monitor. Los casos de uso incluyen:

- **Intercambiar un manejador**: Sustituye un identificador por otro en varios monitores. Por ejemplo, cambia `@pagerduty-sre` por `@oncall-sre`. También puedes cambiar un único identificador por varios identificadores, como por ejemplo sustituyendo `@pagerduty-sre` por `@pagerduty-sre` y `@oncall-sre`, para admitir la doble paginación o ampliar la cobertura de las alertas.
- **Añadir un identificador**: Añade un nuevo destinatario sin eliminar los existentes. Por ejemplo, añade `@slack-infra-leads` a todos los monitores seleccionados.
- **Eliminar un identificador**: Elimina un identificador específico de los mensajes de monitor. Por ejemplo, elimina `@webhook-my-legacy-event-intake`.

## Flujos de trabajo
Puedes activar una [automatización de flujo de trabajo][8] o crear un nuevo flujo de trabajo a partir de un monitor.

Antes de añadir un flujo de trabajo a un monitor, [añade un activador de monitor al flujo de trabajo][9].

Después de añadir el activador de monitor, [añade un flujo de trabajo a tu monitor][10] o crea un nuevo flujo de trabajo. Para crear un nuevo flujo de trabajo a partir de la página de monitores:

1. Haz clic en **Add Workflow** (Añadir flujo de trabajo).
1. Haz clic en el icono **+** y selecciona un Blueprint (Proyecto), o selecciona **Start From Scratch** (Empezar desde cero).
   {{< img src="/monitors/notifications/create-workflow.png" alt="Haz clic en el botón + para añadir un nuevo flujo de trabajo" style="width:90%;">}}

Para obtener más información sobre la creación de un flujo de trabajo, consulta [Crear flujos de trabajo][11].

## Incidentes
Los incidentes pueden crearse automáticamente a partir de un monitor cuando el monitor pasa a un estado `alert`, `warn` o `no data`. Haz clic en **Add Incident** (Añadir incidente) y selecciona una opción de `@incident (incidente)-`. Los administradores pueden crear opciones de `@incident (incidente)-` en [Configuración de incidentes][12].

Cuando se crea un incidente a partir de un monitor, los [valores de campo][13] del incidente se rellenan automáticamente en función de las etiquetas de monitor. Por ejemplo, si tu monitor tiene una etiqueta `service:payments`, el campo de servicio del incidente se definirá para "pagos". Para recibir notificaciones de estos incidentes, asegúrate de que las etiquetas de monitor coinciden con tus reglas de notificación de incidentes. **Nota**: Las reglas de notificación de incidentes se configuran por separado de las reglas de notificación de monitor y deben configurarse de forma independiente. Para obtener más información, consulta [Notificación de incidentes][14].

## Alternar contenido adicional

Las notificaciones del monitor incluyen contenidos como la consulta de monitor, las @-mentions utilizadas, las snapshots de métrica (para monitores de métrica) y enlaces a páginas relevantes en Datadog. Tienes la opción de elegir qué contenido deseas incluir o excluir de notificaciones para monitores individuales.

<div class="alert alert-danger">Las métricas de distribución con agregadores de percentiles (como `p50`, `p75`, `p95` o `p99`) no generan un gráfico de snapshot en las notificaciones. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Establecer una configuración previa de un monitor" style="width:70%;" >}}

Las opciones son:

- **Por defecto**: no se oculta ningún contenido.
- **Ocultar consulta**: elimina la consulta del monitor del mensaje de notificación.
- **Ocultar identificadores**: eliminar las @-mentions que se utilizan en el mensaje de notificación.
- **Ocultar todo**: el mensaje de notificación no incluye consultas, identificadores, snapshots (para monitores de métrica), ni enlaces adicionales en los pies de página.

**Nota**: Según la integración, es posible que algunos contenidos no se muestren por defecto.

## Renotificación

Activa la renotificación (opcional) para recordar a tu equipo que un problema no está resuelto.

  {{< img src="monitors/notifications/renotify_options.png" alt="Activar la renotificación" style="width:90%;" >}}

Configura el intervalo de renotificación, los estados del monitor desde los que el monitor vuelve a notificar (dentro de `alert`, `no data` y `warn`) y, opcionalmente, establece un límite al número de mensajes de renovación enviados.

Por ejemplo, configura el monitor para `stop renotifying after 1 occurrence`, para recibir un único mensaje de escalado después de la alerta principal.
**Nota:** Las [variables de atributos y etiquetas][3] en la renotificación se rellenan con los datos disponibles para el monitor durante el periodo de tiempo de la renotificación.

Si se activa la renotificación, se te da la opción de incluir un mensaje de escalada que se envía si el monitor permanece en uno de los estados elegidos durante el periodo especificado.

El mensaje de escalada puede añadirse de las siguientes maneras:

* En el bloque `{{#is_renotify}}` del mensaje original de notificación (recomendado).
* En el campo *Renotification message* (Mensaje de renotificación) de la sección `Configure notifications and automations`.
* Con el atributo `escalation_message` de la API.

Si utilizas el bloque `{{#is_renotify}}`, el mensaje original de notificación también se incluye en la nueva notificación, por lo tanto:

1. Incluye solo detalles adicionales en el bloque `{{#is_renotify}}` y no repitas los detalles del mensaje original.
2. Envía el mensaje de escalada a un subconjunto de grupos.

Aprende a configurar tus monitores para esos casos de uso en la [sección de ejemplos][15].

## Metadatos

Añade metadatos (Prioridad, Etiquetas, Equipo Datadog) a tu monitor. monitor. La prioridad de un monitor te permite definir la importancia de tu monitor a través del nivel P (P1 a P5). Las etiquetas de monitores, que son diferentes de las etiquetas de métricas, se utilizan en la interfaz de usuario para agrupar y buscar monitores. Si se configuran políticas de etiquetas, es necesario añadir las etiquetas y los valores de etiqueta necesarios. Para obtener más información, consulta [Políticas de etiquetas][16]. Datadog Teams te permite definir una capa de propiedad para este monitor y ver todos los monitores vinculados a tu equipo. Para obtener más información, consulta [Datadog Teams][17].

{{< img src="monitors/notifications/notifications_metadata.png" alt="Ver una configuración de etiqueta de política. En 'Policy tags' (Etiquetas de política) hay tres ejemplos de etiquetas: cost_center, product_id y env, al lado del menú desplegable 'Select value' (Seleccionar valor)." style="width:100%;" >}}

{{% collapse-content title="Prioridad" level="h4" expanded=false %}}

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
{{% /collapse-content %}}


## Agregación

Si la consulta del monitor está agrupada, puedes eliminar una o más de las dimensiones de la agrupación de notificaciones, o eliminarlas todas y notificar como una Alerta simple.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="Vista de configuración agregada establecida en multialerta." style="width:100%;" >}}

Encontrarás más información sobre esta función en [Configurar monitores][18]

## Notificaciones de test

Después de definir tu monitor, prueba las notificaciones con el botón **Test Notifications** (Notificaciones de test) situado en la parte inferior derecha de la página del monitor.

Se admiten notificaciones de tests para los siguientes [tipos de monitor][19]: hosts, métricas, anomalías, outliers, previsión, logs, rum, apm, integraciones (sólo check), procesos (sólo check), redes (sólo check), checks personalizados, eventos y compuestos.

1. En la ventana emergente de notificaciones de tests, elige la transición de monitor a probar y el grupo (disponible sólo si la consulta tiene [agrupación][20]). Sólo puedes probar estados que estén disponibles en la configuración del monitor para ver los umbrales especificados en las condiciones de alerta. Los [umbrales de recuperación][21] son una excepción, ya que Datadog envía una notificación de recuperación una vez que el monitor deja de estar en alerta o no tiene condiciones de alerta.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="Prueba las notificaciones para este monitor" style="width:70%;" >}}

1. Haz clic en **Run Test** (Ejecutar test) para enviar notificaciones a las personas y servicios que figuran en el monitor.

### Eventos

Las notificaciones de test producen eventos que se pueden buscar en el Event Explorer. Estas notificaciones indican quién inició el test en el cuerpo del mensaje con `[TEST]` en el título de la notificación.

Las variables de etiqueta solo se rellenan en el texto de eventos secundarios de Datadog. El evento principal solo muestra un resumen de agregación.

### Variables {#variables-test-notification}

Las variables de mensaje se rellenan automáticamente con un grupo seleccionado aleatoriamente según la definición de contexto de tu monitor, por ejemplo:

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration
[2]: /es/service_management/case_management/create_case/#automatic-case-creation
[3]: /es/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /es/monitors/notify/variables/
[6]: /es/monitors/notify/variables/#conditional-variables
[7]: /es/account_management/teams/#send-notifications-to-a-specific-communication-channel
[8]: /es/service_management/workflows/
[9]: /es/service_management/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /es/service_management/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /es/service_management/workflows/build/
[12]: https://app.datadoghq.com/incidents/settings?section=global-settings
[13]: /es/service_management/incident_management/incident_settings/property_fields
[14]: /es/service_management/incident_management/notification
[15]: /es/monitors/notify/variables/?tab=is_renotify#examples
[16]: /es/monitors/settings/#tag-policies
[17]: /es/account_management/teams/
[18]: /es/monitors/configuration/#set-alert-aggregation
[19]: /es/monitors/types
[20]: /es/monitors/configuration/
[21]: /es/monitors/guide/recovery-thresholds/
[22]: /es/monitors/notify/notification_rules