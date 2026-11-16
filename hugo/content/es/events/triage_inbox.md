---
aliases:
- /es/service_management/events/triage_inbox/
further_reading:
- link: /events/ingest/
  tag: doc
  text: Envíe eventos a Datadog
- link: /events/correlation/
  tag: doc
  text: Obtenga más información sobre la correlación de eventos
- link: https://www.datadoghq.com/blog/datadog-event-management/
  tag: Blog
  text: Agregue, correlacione y actúe sobre las alertas más rápido con AIOps-powered
    Event Management
site_support_id: case_management
title: Event Management Triage Inbox
---
## Descripción general {#overview}

Datadog Event Management [Triage Inbox][4] simplifica la respuesta a incidentes al consolidar eventos relacionados de cualquier fuente en elementos de trabajo procesables. Esta vista centralizada reduce el ruido y ayuda a los equipos a clasificar, investigar y colaborar de manera más efectiva. Con vistas guardadas personalizables, puede mantenerse enfocado en elementos de trabajo de alta prioridad y revisar alertas correlacionadas, cambios relacionados y telemetría, todo en un solo lugar.

## Clasificación e investigación de elementos de trabajo {#triaging-and-investigating-work-items}

La clasificación e investigación de elementos de trabajo comienza en el Triage Inbox, donde puede ordenar, filtrar y gestionar los elementos de trabajo entrantes. Colabore con sus compañeros de equipo, tanto dentro como fuera de Datadog, para coordinar las respuestas. Desde allí, puede priorizar, asignar, investigar y escalar elementos de trabajo según sea necesario para lograr una resolución más rápida.

{{< img src="/events/triage_inbox/event_mgmt_inbox.mp4" alt="Event Management Inbox, clasificación por prioridad, resaltando el menú desplegable de cambio de estado y prioridad" video=true >}}

## Introducción {#getting-started}

1. Navegue a [{{< ui >}}Event Management{{< /ui >}} > {{< ui >}}Triage Inbox{{< /ui >}}][4].
2. Seleccione un proyecto del panel izquierdo para mostrar vistas de estado listas para usar como {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Closed{{< /ui >}} y {{< ui >}}Archived{{< /ui >}}.
3. Utilice el icono de configuración de pantalla para elegir entre {{< ui >}}split view{{< /ui >}} (para una investigación detallada de elementos de trabajo) o {{< ui >}}table view{{< /ui >}} (para la revisión masiva de elementos de trabajo y la configuración de columnas). Personalice la clasificación de su Event Management Inbox con el menú desplegable {{< ui >}}Sort By{{< /ui >}}; las opciones incluyen {{< ui >}}Priority{{< /ui >}}, {{< ui >}}Created at{{< /ui >}} o {{< ui >}}Last Updated{{< /ui >}}. Haga clic en {{< ui >}}Save{{< /ui >}} para reutilizar su Event Management Inbox personalizada en el futuro.
5. Actualice el estado, la prioridad y la asignación directamente en las tarjetas de elementos de trabajo durante la clasificación.
6. Maximice el espacio de la pantalla contrayendo el panel izquierdo de proyectos de elementos de trabajo y la barra de navegación de Datadog.
7. Pase el cursor sobre la tarjeta de elemento de trabajo en el recuento de **alerta** para obtener una vista previa de las alertas correlacionadas.

## Próximos pasos {#next-steps}

Ahora que ha aprendido a clasificar e investigar elementos de trabajo, utilice estas herramientas para [colaborar](#collaborate-and-integrate) con su equipo, [tomar medidas](#take-action) sobre las causas raíz y agilizar los esfuerzos de respuesta.

## Colaborar e integrar {#collaborate-and-integrate}

En el panel lateral derecho de vista dividida, puedes realizar lo siguiente:

- {{< ui >}}Tag and comment{{< /ui >}}: Colabore con sus compañeros de equipo en la línea de tiempo del elemento de trabajo etiquetando usuarios y añadiendo notas.
- {{< ui >}}Send notifications{{< /ui >}}: Alerte a las partes interesadas mediante Slack, Microsoft Teams, correo electrónico o webhooks.
- {{< ui >}}Escalate issues{{< /ui >}}: Inicie un incidente o contacte a un responsable On-Call mediante [Incident Management][1], [On-Call][2], [Workflow Automation][3] o herramientas de terceros.
- {{< ui >}}Sync with external tools{{< /ui >}}: Mantenga sincronizados los registros de Jira y ServiceNow para asegurar que las partes interesadas externas se mantengan actualizadas.

   {{< img src="/events/triage_inbox/event_mgmt_inbox_right_hand_panel.png" alt="Panel derecho de Event Management Inbox, resaltando el menú desplegable Escalate" style="width:100%;" >}}

## Tomar acción {#take-action}

- {{< ui >}}Mark root cause{{< /ui >}}: Identifique y marque un evento relacionado, como un cambio defectuoso, como la causa raíz.
- {{< ui >}}Run workflows{{< /ui >}}: Ejecute los runbooks de remediación manualmente o actívelos condicionalmente con [Work Item Automation Rules][5].
- {{< ui >}}Merge work items{{< /ui >}}: Combine elementos de trabajo relacionados para agilizar las investigaciones.
- {{< ui >}}Split work items{{< /ui >}}: Separe las alertas que requieren una investigación individual.

**Nota**: Cuando todas las alertas en un elemento de trabajo se resuelven, el sistema cierra automáticamente el elemento de trabajo. También puede marcar manualmente un elemento de trabajo como resuelto.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/
[2]: /es/incident_response/on-call/
[3]: /es/actions/workflows/
[4]: https://app.datadoghq.com/event/correlation
[5]: /es/incident_response/work_management/automation_rules/