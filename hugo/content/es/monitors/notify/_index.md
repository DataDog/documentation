---
aliases:
- /es/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /es/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /es/developers/faq/what-do-notifications-do-in-datadog
- /es/monitors/notifications/
description: Envíe notificaciones a sus equipos cuando los seguimientos activen alertas.
further_reading:
- link: /monitors/
  tag: Documentación
  text: Cree seguimientos.
- link: /monitors/manage/
  tag: Documentación
  text: Administre seguimientos.
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centro de aprendizaje
  text: Tome un curso para personalizar las notificaciones de seguimiento de alerta.
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirija sus alertas de seguimiento con las reglas de notificación de seguimiento
    de Datadog.
title: Notifications
---
## Descripción general {#overview}

Las notificaciones son un componente clave de los seguimientos que mantienen a su equipo informado sobre problemas y ayudan en la resolución de errores. Al [crear su seguimiento][1], configure su respuesta para:
- Elabore un mensaje procesable.
- Active un flujo de trabajo o cree un flujo de trabajo desde un seguimiento.
- [Cree automáticamente un elemento de trabajo][2].
- Cree automáticamente un incidente.

## Cómo redactar títulos y mensajes efectivos {#constructing-effective-titles-and-messages}

Este enfoque ayuda a asegurar que los títulos y mensajes de sus seguimientos sean claros, procesables y adaptados a las necesidades de su audiencia.
- **Títulos únicos**: Agregue un título único a su seguimiento (esto es obligatorio). Para seguimientos de alertas múltiples, algunas etiquetas que identifican su contexto de activación se insertan automáticamente. Puede usar [variables de etiqueta][3] para mejorar la especificidad.
- **Campo de mensaje**: El campo de mensaje admite [formato Markdown][4] estándar y [variables][5]. Utilice [variables condicionales][6] para modular el texto de notificación enviado a diferentes contactos con [@notifications](#notifications). Utilice [variables de plantilla de Synthetics][23] para enriquecer el mensaje de alerta con el contexto de fallos de Synthetics.

<div class="alert alert-info"> El soporte de formato Markdown difiere según el método de notificación. Algunos canales solo admiten un subconjunto de la sintaxis de Markdown.
<ul> 
  <li/>Notificaciones de Slack: Admiten formato básico (negrita, cursiva, código en línea, enlaces). Encabezados de Markdown (por ejemplo, <code>#</code>, <code>##</code>) y las tablas no se renderizan; aparecen como texto sin formato.
  <li/>Notificaciones por correo electrónico: Admiten formato básico (negrita, cursiva, código en línea, enlaces). Las tablas no se renderizan como tablas de Markdown y aparecen como texto sin formato en el cuerpo del mensaje.
</ul>
</div>

{{% collapse-content title="Ejemplo de mensaje de seguimiento" level="h3" expanded=false %}}
Un caso de uso común para el mensaje de seguimiento es incluir una forma paso a paso de resolver el problema, por ejemplo:

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


## Destinatarios de la notificación {#notification-recipients}
Datadog recomienda utilizar [reglas de notificación de seguimiento][22] para administrar las notificaciones de seguimiento. Con las reglas de notificación, puede automatizar qué destinatarios de notificación se agregan a un seguimiento según conjuntos de condiciones predefinidos. Cree diferentes reglas para enrutar las alertas de seguimiento según las etiquetas de la notificación de seguimiento para que no tenga que configurar manualmente los destinatarios ni la lógica de enrutamiento de notificaciones para cada seguimiento individual.

Tanto en las reglas de notificación como en los monitores individuales, puede usar un `@notification` para agregar un miembro del equipo, una integración, un flujo de trabajo o un elemento de trabajo a su notificación. A medida que escribe, Datadog recomienda automáticamente las opciones existentes en un menú desplegable. Haga clic en una opción para agregarla a su notificación. Alternativamente, haga clic en {{< ui >}}@ Add Mention{{< /ui >}}, {{< ui >}}Add Workflow{{< /ui >}} o {{< ui >}}Add Case{{< /ui >}}.

Una @notificación debe tener un espacio entre ella y el último carácter de la línea:

| Formato correcto | Formato incorrecto |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Integraciones" level="h3" expanded=false %}}
{{% notifications-integrations %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h3" expanded=false %}}
{{% notifications-teams %}}
{{% /collapse-content %}}

{{% collapse-content title="Incidencias" level="h3" expanded=false %}}
{{% notifications-cases %}}
{{% /collapse-content %}}

{{% collapse-content title="Correo electrónico" level="h3" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

### Edición masiva de @-handles de seguimientos {#bulk-editing-monitor-handles}
Datadog permite editar los destinatarios de los mensajes de alerta en varios seguimientos a la vez. Utilice esta función para agregar, eliminar o reemplazar `@-handles` de manera eficiente en el cuerpo del mensaje del seguimiento. Los casos de uso incluyen:

- **Intercambiar un handle**: Reemplace un handle por otro en varios seguimientos. Por ejemplo, cambie `@pagerduty-sre` por `@oncall-sre`. También puede intercambiar un solo handle por varios handles, como reemplazar `@pagerduty-sre` por `@pagerduty-sre` y `@oncall-sre`, para admitir la paginación dual o una cobertura de alertas ampliada.
- **Agregar un handle**: Agregue un nuevo destinatario sin eliminar los existentes. Por ejemplo, agregue `@slack-infra-leads` a todos los seguimientos seleccionados.
- **Eliminar un handle**: Elimine un handle específico de los mensajes del seguimiento. Por ejemplo, elimine `@webhook-my-legacy-event-intake`.

## Flujos de trabajo {#workflows}
Puede activar una [automatización de flujo de trabajo][8] o crear un nuevo flujo de trabajo desde un seguimiento.

Antes de agregar un flujo de trabajo a un seguimiento, [agregue un activador de seguimiento al flujo de trabajo][9].

Después de agregar el activador del seguimiento, [agregue un flujo de trabajo existente a su seguimiento][10] o cree un nuevo flujo de trabajo. Para crear un nuevo flujo de trabajo desde la página de seguimientos:

1. Haga clic en {{< ui >}}Add Workflow{{< /ui >}}.
1. Haga clic en el icono {{< ui >}}+{{< /ui >}} y seleccione un Blueprint, o seleccione {{< ui >}}Start From Scratch{{< /ui >}}.
   {{< img src="/monitors/notifications/create-workflow.png" alt="Haga clic en el botón + para agregar un nuevo flujo de trabajo" style="width:90%;">}}

Para obtener más información sobre cómo crear un flujo de trabajo, consulte [Build workflows][11].

## Incidentes {#incidents}
Los incidentes pueden crearse automáticamente desde un seguimiento cuando este cambia a un estado `alert`, `warn` o `no data`. Haga clic en {{< ui >}}Add Incident{{< /ui >}} y seleccione una opción de `@incident-`. Los administradores pueden crear opciones de `@incident-` en [Incident Settings][12].

Cuando se crea un incidente desde un seguimiento, los [valores de campo][13] del incidente se completan automáticamente según las etiquetas del seguimiento. Por ejemplo, si su seguimiento tiene una etiqueta `service:payments`, el campo de servicio del incidente se establecerá en "payments". Para recibir notificaciones de estos incidentes, asegúrese de que las etiquetas del seguimiento coincidan con sus reglas de notificación de incidentes. **Nota**: Las reglas de notificación de incidentes se configuran por separado de las reglas de notificación del seguimiento y deben configurarse de forma independiente. Para obtener más información, consulte [Incident Notification][14].

## Alternar contenido adicional {#toggle-additional-content}

Las notificaciones de seguimiento incluyen contenido como la consulta del seguimiento, las @-menciones utilizadas, instantáneas de métricas (para seguimientos de métricas) y enlaces a páginas relevantes en Datadog. Usted tiene la opción de elegir qué contenido desea incluir o excluir de las notificaciones para seguimientos individuales.

<div class="alert alert-danger">Las métricas de distribución con agregadores de percentiles (como `p50`, `p75`, `p95` o `p99`) no generan un gráfico de instantánea en las notificaciones. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Establezca un ajuste preestablecido de seguimiento." style="width:70%;" >}}

Las opciones son:

- {{< ui >}}Default{{< /ui >}}: No se oculta ningún contenido.
- {{< ui >}}Hide Query{{< /ui >}}: Elimine la consulta del seguimiento del mensaje de notificación.
- {{< ui >}}Hide Handles{{< /ui >}}: Elimine las @-menciones que se utilizan en el mensaje de notificación.
- {{< ui >}}Hide All{{< /ui >}}: El mensaje de notificación no incluye la consulta, los handles, ninguna instantánea (para seguimientos de métricas) ni enlaces adicionales en los pies de página.

**Nota**: Dependiendo de la integración, es posible que cierto contenido no se muestre de forma predeterminada.

## Renotificar {#renotify}

Habilite la renotificación del seguimiento (opcional) para recordarle a su equipo que un problema no se ha resuelto.

  {{< img src="monitors/notifications/renotify_options.png" alt="Habilitar renotificación" style="width:90%;" >}}

Configure el intervalo de renotificación, los estados del seguimiento desde los cuales el seguimiento vuelve a notificar (dentro de `alert`, `no data` y `warn`) y, opcionalmente, establezca un límite en la cantidad de mensajes de renotificación enviados.

Por ejemplo, configure el seguimiento en `stop renotifying after 1 occurrence` para recibir un único mensaje de escalada después de la alerta principal.
**Nota:** Las [variables de atributos y etiquetas][3] en la renotificación se completan con los datos disponibles para el seguimiento durante el período de tiempo de la renotificación.

Si la renotificación está habilitada, se le da la opción de incluir un mensaje de escalada que se envía si el seguimiento permanece en uno de los estados elegidos durante el período de tiempo especificado.

El mensaje de escalada se puede agregar de las siguientes maneras:

* En el `{{#is_renotify}}` bloque en el mensaje de notificación original (recomendado).
* En el campo {{< ui >}}Renotification message{{< /ui >}} en la sección {{< ui >}}Configure notifications and automations{{< /ui >}}.
* Con el atributo `escalation_message` en la API.

Si utiliza el bloque `{{#is_renotify}}`, el mensaje de notificación original también se incluye en la renotificación, por lo que:

1. Incluya solo detalles adicionales en el bloque `{{#is_renotify}}` block y no repita los detalles del mensaje original.
2. Envíe el mensaje de escalada a un subconjunto de grupos.

Aprenda a configurar sus monitores para esos casos de uso en la [sección de ejemplos][15].

## Metadatos {#metadata}

Agregue metadatos (Prioridad, Etiquetas, Datadog Team) a su monitor. La Prioridad del monitor le permite establecer la importancia de su monitor mediante un nivel P (de P1 a P5). Las etiquetas de monitor (que son diferentes de las etiquetas de métricas) se utilizan en la interfaz de usuario para agrupar y buscar monitores. Si las políticas de etiquetas están configuradas, es necesario agregar las etiquetas y los valores de etiqueta requeridos. Para obtener más información, consulte [Políticas de etiquetas][16]. Datadog Teams le permite establecer una capa de propiedad para este monitor y ver todos los monitores vinculados a su equipo. Para obtener más información, consulte [Datadog Teams][17].

{{< img src="monitors/notifications/notifications_metadata.png" alt="Vista de la configuración de etiquetas de política. Debajo de 'Etiquetas de política' hay tres etiquetas de ejemplo, cost_center, product_id y env, junto a un menú desplegable 'Seleccionar valor'." style="width:100%;" >}}

{{% collapse-content title="Prioridad" level="h3" expanded=false %}}

Agregue una prioridad (opcional) asociada a sus monitores. Los valores van de P1 a P5, siendo P1 la prioridad más alta y P5 la más baja.
Para anular la prioridad del monitor en el mensaje de notificación, use `{{override_priority 'Pi'}}` where `Pi` está entre P1 y P5.

Por ejemplo, puede establecer diferentes prioridades para las notificaciones de `alert` y `warning`:

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


## Agregación {#aggregation}

Si la consulta del monitor está agrupada, puede eliminar una o más dimensiones de la agrupación de notificaciones, o eliminarlas todas y notificar como una Alerta simple.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="Vista de la configuración de agregación establecida en multi-alert." style="width:100%;" >}}

Encuentre más información sobre esta función en [Configure Monitors][18]

## Notificaciones de prueba {#test-notifications}

Después de definir su monitor, pruebe las notificaciones con el botón {{< ui >}}Test Notifications{{< /ui >}} en la parte inferior derecha de la página del monitor.

Las notificaciones de prueba son compatibles con los [tipos de monitor][19]: servidor, métrica, anomalía, valor anómalo, pronóstico, logs, RUM, APM, integración (solo verificación), proceso (solo verificación), red (solo verificación), verificación personalizada, evento y composite.

1. Desde la ventana emergente de notificaciones de prueba, elija la transición del monitor que desea probar y el grupo (disponible solo si la consulta tiene [grouping][20]). Solo puede probar los estados que están disponibles en la configuración del monitor para los umbrales especificados en las condiciones de alerta. Los [umbrales de recuperación][21] son una excepción, ya que Datadog envía una notificación de recuperación una vez que el monitor ya no está en alerta o no tiene condiciones de alerta.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="Pruebe las notificaciones para este monitor" style="width:70%;" >}}

1. Haga clic en {{< ui >}}Run Test{{< /ui >}} para enviar notificaciones a las personas y servicios listados en el monitor.

### Events {#events}

Las notificaciones de prueba generan eventos que se pueden buscar dentro del Event Explorer. Estas notificaciones indican quién inició la prueba en el cuerpo del mensaje con `[TEST]` en el título de la notificación.

Las variables de etiqueta solo se completan en el texto de los eventos secundarios de Datadog. El evento principal solo muestra un resumen de agregación.

### Variables {#variables-test-notification}

Las variables de mensaje se completan automáticamente con un grupo seleccionado al azar según el contexto de la definición de su monitor, por ejemplo:

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration
[2]: /es/incident_response/work_management/create_work_item/#automatic-work-item-creation
[3]: /es/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /es/monitors/notify/variables/
[6]: /es/monitors/notify/variables/#conditional-variables
[8]: /es/actions/workflows/
[9]: /es/actions/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /es/actions/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /es/actions/workflows/build/
[12]: https://app.datadoghq.com/incidents/settings?section=global-settings
[13]: /es/incident_response/incident_management/setup_and_configuration/property_fields
[14]: /es/incident_response/incident_management/notification
[15]: /es/monitors/notify/variables/?tab=is_renotify#examples
[16]: /es/monitors/settings/#tag-policies
[17]: /es/account_management/teams/
[18]: /es/monitors/configuration/#set-alert-aggregation
[19]: /es/monitors/types
[20]: /es/monitors/configuration/
[21]: /es/monitors/guide/recovery-thresholds/
[22]: /es/monitors/notify/notification_rules
[23]: /es/synthetics/notifications/template_variables/