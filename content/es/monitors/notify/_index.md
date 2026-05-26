---
aliases:
- /es/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /es/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /es/developers/faq/what-do-notifications-do-in-datadog
- /es/monitors/notifications/
description: Envía notificaciones a tus equipos cuando los seguimientos disparen alertas.
further_reading:
- link: /monitors/
  tag: Documentación
  text: Crea seguimientos
- link: /monitors/manage/
  tag: Documentación
  text: Gestiona seguimientos
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centro de Aprendizaje
  text: Toma un curso para personalizar las notificaciones de los seguimientos de
    alerta
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirige tus alertas de seguimiento con las reglas de notificación de seguimientos
    de Datadog
title: Notificaciones
---
## Resumen {#overview}

Las notificaciones son un componente clave de los seguimientos que mantienen a tu equipo informado sobre los problemas y facilitan su resolución. Al [crear tu seguimiento][1], configura tu respuesta a:
- Elabora un mensaje accionable.
- Activa un flujo de trabajo o crea un flujo de trabajo a partir de un seguimiento.
- [Crea una incidencia automáticamente][2].
- Crea un incidente automáticamente.

## Construyendo títulos y mensajes efectivos {#constructing-effective-titles-and-messages}

Este enfoque ayuda a garantizar que los títulos y mensajes de tu seguimiento sean claros, accionables y adaptados a las necesidades de tu audiencia.
- **Títulos únicos**: Agrega un título único a tu seguimiento (esto es obligatorio). Para seguimientos de múltiples alertas, algunas etiquetas que identifican tu contexto de activación se insertan automáticamente. Puedes usar [variables de etiqueta][3] para mejorar la especificidad.
- **Campo de mensaje**: El campo de mensaje admite [formato estándar de Markdown][4] y [variables][5]. Usa [variables condicionales][6] para modular el texto de notificación enviado a diferentes contactos con [@notifications](#notifications). Usa [variables de plantilla sintéticas][23] para enriquecer el mensaje de alerta con el contexto de fallos sintéticos.

<div class="alert alert-info"> El soporte para formato Markdown varía según el método de notificación. Algunos canales solo admiten un subconjunto de la sintaxis de Markdown.
<ul> 
  <li/>Notificaciones de Slack: Admiten formato básico (negrita, cursiva, código en línea, enlaces). Los encabezados de Markdown (por ejemplo, <code>#</code>, <code>##</code>) y las tablas no se renderizan; aparecen como texto plano.
  <li/>Notificaciones por correo electrónico: Admiten formato básico (negrita, cursiva, código en línea, enlaces). Las tablas no se renderizan como tablas de Markdown y aparecen como texto plano en el cuerpo del mensaje.
</ul>
</div>

{{% collapse-content title="Ejemplo de mensaje de seguimiento" level="h4" expanded=false %}}
Un caso de uso común para el mensaje de seguimiento es incluir un paso a paso para resolver el problema, por ejemplo:

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


## Destinatarios de notificación {#notification-recipients}
Datadog recomienda usar [reglas de notificación de seguimiento][22] para gestionar las notificaciones de seguimiento. Con las reglas de notificación puedes automatizar qué destinatarios de notificación se añaden a un seguimiento según conjuntos de condiciones predefinidos. Crea diferentes reglas para dirigir las alertas de seguimiento según las etiquetas de la notificación de seguimiento para que no tengas que configurar manualmente los destinatarios ni la lógica de enrutamiento de notificaciones para cada seguimiento individual.

En las reglas de notificación y en los monitores individuales, puedes usar un `@notification` para agregar a un miembro del equipo, una integración, un flujo de trabajo o una incidencia a tu notificación. A medida que escribes, Datadog recomienda automáticamente opciones existentes en un menú desplegable. Haz clic en una opción para agregarla a tu notificación. Alternativamente, haz clic en **@ Agregar Mención**, **Agregar Flujo de Trabajo**, o **Agregar Incidencia**.

Una @notification debe tener un espacio entre ella y el último carácter de línea:

| Formato Correcto | Formato Incorrecto |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Integrations" level="h4" expanded=false %}}
{{% notifications-integrations %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h4" expanded=false %}}
{{% notifications-teams %}}
{{% /collapse-content %}}

{{% collapse-content title="Incidencias" level="h4" expanded=false %}}
{{% notifications-cases %}}
{{% /collapse-content %}}

{{% collapse-content title="Correo Electrónico" level="h4" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

### Edición masiva de @-handles de seguimiento {#bulk-editing-monitor-handles}
Datadog admite la edición de los destinatarios de mensajes de alerta en múltiples seguimientos a la vez. Utiliza esta función para agregar, eliminar o reemplazar eficientemente `@-handles` en el cuerpo del mensaje del seguimiento. Los casos de uso incluyen:

- **Intercambiar un handle**: Reemplaza un handle por otro en múltiples seguimientos. Por ejemplo, cambia `@pagerduty-sre` por `@oncall-sre`. También puedes intercambiar un solo handle por múltiples handles, como reemplazar `@pagerduty-sre` con `@pagerduty-sre` y `@oncall-sre`, para soportar paginación dual o cobertura de alertas ampliada.
- **Agregar un handle**: Agregar un nuevo destinatario sin eliminar los existentes. Por ejemplo, agrega `@slack-infra-leads` a todos los seguimientos seleccionados.
- **Remove a handle**: Eliminar un handle específico de los mensajes del seguimiento. Por ejemplo, elimina `@webhook-my-legacy-event-intake`.

## Flujos de trabajo {#workflows}
Puedes activar una [automatización de flujo de trabajo][8] o crear un nuevo flujo de trabajo desde un seguimiento.

Antes de agregar un flujo de trabajo a un seguimiento, [agrega un disparador de seguimiento al flujo de trabajo][9].

Después de agregar el disparador de seguimiento, [agrega un flujo de trabajo existente a tu seguimiento][10] o crea un nuevo flujo de trabajo. Para crear un nuevo flujo de trabajo desde la página de seguimientos:

1. Haz clic en **Agregar flujo de trabajo**.
1. Haz clic en el icono **+** y selecciona un Plano, o selecciona **Comenzar desde cero**.
   {{< img src="/monitors/notifications/create-workflow.png" alt="Haz clic en el botón + para agregar un nuevo flujo de trabajo" style="width:90%;">}}

Para más información sobre cómo construir un flujo de trabajo, consulta [Construir flujos de trabajo][11].

## Incidentes {#incidents}
Los incidentes pueden crearse automáticamente a partir de un seguimiento cuando este cambia a un estado `alert`, `warn` o `no data`. Haz clic en **Agregar incidente** y selecciona una opción de `@incident-`. Los administradores pueden crear `@incident-` opciones en [Configuraciones de incidentes][12].

Cuando se crea un incidente a partir de un seguimiento, los [valores de campo][13] del incidente se rellenan automáticamente según las etiquetas del seguimiento. Por ejemplo, si tu seguimiento tiene una etiqueta `service:payments`, el campo de servicio del incidente se establecerá en "pagos". Para recibir notificaciones sobre estos incidentes, asegúrate de que las etiquetas del seguimiento se alineen con tus reglas de notificación de incidentes. **Nota**: Las reglas de notificación de incidentes se configuran por separado de las reglas de notificación de seguimientos y deben configurarse de manera independiente. Para más información, consulte [Notificación de Incidente][14].

## Alternar contenido adicional {#toggle-additional-content}

Las notificaciones de monitor incluyen contenido como la consulta del monitor, las menciones @ utilizadas, instantáneas de métricas (para monitores métricos), y enlaces de regreso a páginas relevantes en Datadog. Tiene la opción de elegir qué contenido le gustaría incluir o excluir de las notificaciones para monitor individuales.

<div class="alert alert-danger">Las métricas de distribución con agregadores de percentiles (como `p50`, `p75`, `p95` o `p99`) no generan un gráfico de instantánea en las notificaciones. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Establecer un preajuste de seguimiento" style="width:70%;" >}}

Las opciones son:

- **Predeterminado**: No se oculta contenido.
- **Hide Query**: Eliminar la consulta del seguimiento del mensaje de notificación.
- **Ocultar Menciones**: Eliminar las menciones @ que se utilizan en el mensaje de notificación.
- **Hide All**: El mensaje de notificación no incluye consulta, menciones, ninguna instantánea (para seguimientos métricos) o enlaces adicionales en los pies de página.

**Nota**: Dependiendo de la integración, es posible que algunos contenidos no se muestren de forma predeterminada.

## Re-notificar {#renotify}

Habilitar la re-notificación del seguimiento (opcional) para recordar a tu equipo que un problema no está resuelto.

  {{< img src="monitors/notifications/renotify_options.png" alt="Habilitar re-notificación" style="width:90%;" >}}

Configura el intervalo de re-notificación, los estados del seguimiento desde los cuales se envía la re-notificación (dentro de `alert`, `no data` y `warn`) y opcionalmente establece un límite al número de mensajes de re-notificación enviados.

Por ejemplo, configura el seguimiento para `stop renotifying after 1 occurrence` para recibir un solo mensaje de escalación después de la alerta principal.
**Nota:** [Variables de atributo y etiqueta][3] en la re-notificación se completan con los datos disponibles para el seguimiento durante el período de tiempo de la re-notificación.

Si la re-notificación está habilitada, se te ofrece la opción de incluir un mensaje de escalación que se envía si el seguimiento permanece en uno de los estados elegidos durante el período de tiempo especificado.

El mensaje de escalación se puede agregar de las siguientes maneras:

* En el `{{#is_renotify}}` bloque en el mensaje de notificación original (recomendado).
* En el campo *Mensaje de Renotificación* en la `Configure notifications and automations` sección.
* Con el atributo `escalation_message` en la API.

Si utilizas el `{{#is_renotify}}` bloque, el mensaje de notificación original también se incluye en la renotificación, así que:

1. Incluye solo detalles adicionales en el `{{#is_renotify}}` bloque y no repitas los detalles del mensaje original.
2. Envía el mensaje de escalación a un subconjunto de grupos.

Aprende a configurar tus seguimientos para esos casos de uso en la [sección de ejemplos][15].

## Metadatos {#metadata}

Agrega metadatos (Prioridad, Etiquetas, Equipo de Datadog) a tu monitor. La Prioridad del Monitor te permite establecer la importancia de tu monitor a través del nivel P (P1 a P5). Las etiquetas del monitor--que son diferentes de las etiquetas de métrica--se utilizan en la interfaz de usuario para agrupar y buscar monitores. Si se configuran políticas de etiquetas, se deben agregar las etiquetas y valores de etiqueta requeridos. Para aprender más, consulta [Políticas de Etiquetas][16]. Los Equipos de Datadog te permiten establecer un nivel de propiedad para este monitor y ver todos los monitores vinculados a tu equipo. Para aprender más, consulta [Equipos de Datadog][17].

{{< img src="monitors/notifications/notifications_metadata.png" alt="Vista de la configuración de etiquetas de política. Debajo de 'Etiquetas de política' hay tres etiquetas de ejemplo, cost_center, product_id y env, junto a un menú desplegable 'Seleccionar valor'." style="width:100%;" >}}

{{% collapse-content title="Prioridad" level="h4" expanded=false %}}

Agrega una prioridad (opcional) asociada con tus monitores. Los valores van de P1 a P5, siendo P1 la prioridad más alta y P5 la más baja.
Para anular la prioridad del monitor en el mensaje de notificación, usa `{{override_priority 'Pi'}}` where `Pi` está entre P1 y P5.

Por ejemplo, puedes establecer diferentes prioridades para `alert` y `warning` notificaciones:

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

Si la consulta del monitor está agrupada, puedes eliminar una o más de las dimensiones de la agrupación de notificación, o eliminarlas todas y notificar como una alerta simple.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="Vista de la configuración de agregación establecida en multi-alerta." style="width:100%;" >}}

Encuentra más información sobre esta función en [Configurar Monitores][18]

## Notificaciones de prueba {#test-notifications}

Después de definir tu monitor, prueba las notificaciones con el botón **Notificaciones de Prueba** en la parte inferior derecha de la página del monitor.

Las notificaciones de prueba son compatibles con los [tipos de monitores][19]: host, métrica, anomalía, valor anómalo, pronóstico, registro, rum, apm, integración (solo verificación), proceso (solo verificación), red (solo verificación), verificación personalizada, evento y composite.

1. Desde el pop-up de notificaciones de prueba, elige la transición del monitor para probar y el grupo (disponible solo si la consulta tiene [agrupación][20]). Solo puedes probar estados que están disponibles en la configuración del monitor para los umbrales especificados en las condiciones de alerta. [Umbrales de recuperación][21] son una excepción, ya que Datadog envía una notificación de recuperación una vez que el monitor ya no está en alerta, o no tiene condiciones de advertencia.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="Prueba las notificaciones para este monitor" style="width:70%;" >}}

1. Haz clic en **Ejecutar Prueba** para enviar notificaciones a las personas y servicios listados en el monitor.

### Eventos {#events}

Las notificaciones de prueba producen eventos que pueden ser buscados dentro del explorador de eventos. Estas notificaciones indican quién inició la prueba en el cuerpo del mensaje con `[TEST]` en el título de la notificación.

Las variables de etiqueta solo se completan en el texto de los eventos secundarios de Datadog. El evento principal solo muestra un resumen de agregación.

### Variables {#variables-test-notification}

Las variables de mensaje se completan automáticamente con un grupo seleccionado aleatoriamente según el contexto de la definición de tu monitor, por ejemplo:

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration
[2]: /es/incident_response/case_management/create_case/#automatic-case-creation
[3]: /es/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /es/monitors/notify/variables/
[6]: /es/monitors/notify/variables/#conditional-variables
[8]: /es/service_management/workflows/
[9]: /es/service_management/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /es/service_management/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /es/service_management/workflows/build/
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