---
aliases:
- /es/service_management/on-call/processing_rules/
- /es/service_management/on-call/routing_rules/
further_reading:
- link: /incident_response/on-call/
  tag: Documentación
  text: Datadog On-Call
title: Reglas de enrutamiento
---
## Descripción general {#overview}

Las reglas de enrutamiento determinan cómo se dirigen las alertas dentro de su equipo. En lugar de enviar todas las alertas a través de una única política de escalamiento, puede crear reglas que enruten las alertas según metadatos como prioridad, etiquetas, estado del seguimiento o la hora del día.

## Crear una regla de enrutamiento {#create-a-routing-rule}

Las reglas se evalúan de arriba hacia abajo. La última regla debe ser una alternativa que enrute todas las alertas no coincidentes a una política de escalamiento.

Para crear una regla de enrutamiento:

1. Vaya a [**On-Call** > **Teams**][1] y seleccione un equipo.
1. Busque la sección **Page Routing** y haga clic en **Edit**. Se abre la ventana **Configure Page Routing**.
 
   {{< img src="incident_response/on-call/routing_rules/configure-page-routing2.png" alt="La ventana Configure Page Routing en Datadog On-Call, que muestra los campos de condición de enrutamiento y las opciones de configuración de destino" style="width:100%;" >}}

1. Haga clic en **Add Conditions** para agregar una regla de enrutamiento. 
1. Defina una consulta de coincidencia utilizando la [sintaxis de reglas de enrutamiento](#routing-rule-syntax).
1. Opcionalmente, configure el [horario de soporte](#support-hours):

   1. Active **Use support hours**.
   1. Haga clic en **Add** para agregar un intervalo de tiempo. Para cada intervalo, seleccione una zona horaria y los días de la semana, luego establezca la hora de inicio y de finalización.
   1. Opcionalmente, active el interruptor **Fuera de las horas de apoyo, mantenga las notificaciones de políticas de escalamiento hasta la siguiente habilitación de ventana**.

   {{< img src="incident_response/on-call/routing_rules/page-routing-support-hours.png" alt="El panel de configuración del horario de soporte en una condición de enrutamiento, que muestra los campos de intervalo de tiempo y la opción para retener las notificaciones de la política de escalamiento fuera del horario de soporte" style="width:60%;" >}}

1. En **Set targets**, haga clic en **Add** y seleccione un tipo de destino. El tipo de destino determina qué sucede cuando la regla coincide:
   - **Page escalation policy**: Seleccione una [política de escalamiento][3] y establezca la urgencia en `DYNAMIC` (según el estado de la alerta), `HIGH` o `LOW`.
   - **Send Slack message** (Preview): Seleccione un espacio de trabajo y un canal de Slack.
   - **Send Microsoft Teams message** (Preview): Seleccione un tenant, un equipo y un canal de Teams.
   - **Run Workflow** (Preview): Seleccione un [flujo de trabajo][4] existente.
   - **Sync with a ServiceNow Incident** (Preview): Seleccione una conexión de ServiceNow. Datadog crea un incidente de ServiceNow para cada Page y lo mantiene sincronizado. Consulte [Integrar ServiceNow con Datadog On-Call][5].

1. Si seleccionó **Page escalation policy**, configure opcionalmente el [tiempo de espera de confirmación](#acknowledgment-timeout):
   1. Active **Acknowledgment timeout**.
   1. Establezca la duración del tiempo de espera.

1. Agregue más reglas según sea necesario y haga clic en **Save**.

### Sintaxis de reglas de enrutamiento {#routing-rule-syntax}

Las reglas de enrutamiento utilizan la [sintaxis de consulta de Datadog][2] y admiten múltiples condiciones `if/else`.

<div class="alert alert-info">La sintaxis de las reglas de enrutamiento distingue entre mayúsculas y minúsculas. Por ejemplo, <code>tags.env:Prod</code> no coincide con <code>tags.env:prod</code>.</div>

**Los atributos admitidos incluyen:**

| Atributo      | Descripción                                                                 | Ejemplo                               |
|----------------|-----------------------------------------------------------------------------|---------------------------------------|
| `tags`         | Etiquetas en la alerta entrante                                                  | `tags.env:prod`                       |
| `groups`       | Nombres de grupos de seguimiento                                                         | `groups.service:checkout-service`     |
| `priority`     | Prioridad del seguimiento (1–5)                                                      | `priority:(1 OR 2)`                   |
| `alert_status` | Estado del seguimiento (`error`, `warn`, `success`)                                 | `alert_status:(error OR warn)`        |

### Horario de soporte {#support-hours}

El horario de soporte define cuándo una política de escalamiento puede notificar a los responsables.

Cuando una regla de enrutamiento incluye horario de soporte, Datadog compara la hora actual con los intervalos configurados y procede de la siguiente manera:
- **Dentro del horario de soporte**: Datadog ejecuta la política de escalamiento inmediatamente y notifica a los responsables.
- **Fuera del horario de soporte**:
  - Si **Fuera de las horas de apoyo, mantenga las notificaciones de política de escalamiento hasta la siguiente ventana** está activado, Datadog crea el Page de inmediato, pero pospone las notificaciones de la política de escalamiento hasta que comience la siguiente ventana de soporte. Datadog agrega una entrada de línea de tiempo para registrar el retraso.
  - Si esta opción está desactivada, Datadog omite la regla de enrutamiento y no crea un Page. Luego evalúa la siguiente regla coincidente.

#### Ejemplos de configuraciones de horario de soporte {#example-support-hour-configurations}

**Nota**: Los siguientes ejemplos suponen que el interruptor **Fuera de las horas de apoyo, mantenga las notificaciones de política de escalamiento hasta la siguiente ventana** está activado.

{{% collapse-content title="Horario laboral estándar" level="h5" %}}

Agregue un intervalo: seleccione de lunes a viernes, establezca el rango de tiempo de 9 a. m. a 5 p. m. y seleccione la zona horaria `America/New_York`. Los Pages fuera de esta ventana se posponen hasta las 9 a. m. del lunes siguiente.

{{< img src="incident_response/on-call/routing_rules/support-hours-biz.png" alt="El modal emergente de horario de soporte con un intervalo de tiempo definido de 9 a. m. a 5 p. m. de lunes a viernes" style="width:60%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="Turno de soporte dividido (mañanas y tardes)" level="h5" %}}

Agregue dos intervalos: uno de 9 a. m. a 12 p. m. y otro de 2 p. m. a 6 p. m., ambos con lunes a viernes seleccionados. Los Pages que llegan entre las 12 p. m. y las 2 p. m. se posponen hasta que se abra la ventana de la tarde.

{{% /collapse-content %}}

### Tiempo de espera de confirmación {#acknowledgment-timeout}

Cuando agrega una política de escalamiento como destino, puede activar **Acknowledgment timeout**. Cuando esta opción está activada, si un Page se confirma pero no se resuelve dentro del tiempo configurado, Datadog lo devuelve al estado activado y vuelve a notificar al responsable de guardia activo.

Para configurar el tiempo de espera de confirmación:

1. En **Set targets**, seleccione **Page escalation policy** como tipo de destino.
1. Active **Acknowledgment timeout**.
1. Establezca la duración del tiempo de espera.

### Pages en Slack y Microsoft Teams {#pages-in-slack-and-microsoft-teams}

{{< img src="incident_response/on-call/routing_rules/page_in_slack_or_ms_teams.png" alt="Una regla de enrutamiento de ejemplo que dirige todos los Pages entrantes a Slack y Microsoft Teams" style="width:100%;" >}}

Cuando dirige Pages a Slack o Microsoft Teams, Datadog envía una notificación al canal configurado y crea un Page. Los miembros del equipo pueden usar botones para confirmar, escalar o resolver el Page.

{{< img src="incident_response/on-call/routing_rules/page_representation_in_slack.png" alt="Una notificación de Page en Slack con botones para confirmar, escalar o resolver" style="width:70%;" >}}

Cuando se confirma o resuelve un Page en Slack o Teams, Datadog actualiza la notificación original en el mismo lugar, sin enviar mensajes adicionales. Esto minimiza el volumen de notificaciones y mantiene visible el estado actual del Page en el hilo original.

## Ejemplos de reglas de enrutamiento {#routing-rule-examples}

- **Enrutar alertas por prioridad:**
  - Envíe las alertas de **prioridad 1** a su política de escalamiento principal.
  - Envíe las alertas de **prioridad 2–4** a Slack o Microsoft Teams.

- **Enrute las alertas según la hora del día:**
  - Durante el horario laboral, enrute las alertas a una política de escalamiento.
  - Fuera del horario laboral, dirija las alertas críticas a una política de escalamiento y las alertas no críticas a un canal de Slack o Teams.

- **Retrase el escalamiento fuera del horario de soporte:**
  - Defina [horario de soporte](#support-hours) en una condición de enrutamiento para retener las notificaciones de la política de escalamiento hasta la siguiente ventana activa.

- **Utilice `DYNAMIC` urgencia para establecer la urgencia según el estado de la alerta de seguimiento:** 
  - Si la alerta de seguimiento tiene el estado `warn`, establezca la urgencia en `LOW`.
  - Si la alerta de seguimiento tiene el estado `error`, establezca la urgencia en `HIGH`.

  La urgencia determina cómo se notifica a los responsables según sus preferencias de notificación.

## Mejores prácticas {#best-practices}

- **Equilibre la visibilidad con la urgencia:**
  - Utilice el envío de avisos y las políticas de escalamiento para las alertas críticas que requieran una acción inmediata.
  - Utilice Slack o Teams para los problemas de menor gravedad de los que se deba estar al tanto, pero que no justifiquen una respuesta de guardia.

- **Utilice el horario de soporte para proteger a los responsables de las notificaciones fuera de ese horario:**
  - Para alertas no críticas, configure el horario de soporte para que coincida con el horario laboral de su equipo. Datadog crea el Page de inmediato, pero solo notifica a los responsables durante los períodos activos.
  - Para alertas críticas que requieran atención inmediata sin importar la hora, no configure el horario de soporte en la regla de enrutamiento.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/teams
[2]: /es/tracing/trace_explorer/query_syntax/
[3]: /es/incident_response/on-call/escalation_policies/
[4]: /es/actions/workflows/
[5]: /es/incident_response/on-call/integrations/servicenow/