---
description: Genere y administre postmortems para documentar incidentes e impulsar
  la mejora continua.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentación
  text: Configure plantillas de postmortem
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: Documentación
  text: Referencia de variables de incidente
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: Documentación
  text: Administre las tareas de seguimiento de incidentes
- link: /notebooks/
  tag: Documentación
  text: Datadog Notebooks
title: Postmortems de incidentes
---
## Descripción general {#overview}

Un postmortem es un documento estructurado que captura lo que sucedió durante un incidente, por qué sucedió y qué acciones tomar para evitar su recurrencia. Generar un postmortem después de un incidente ayuda a su equipo a:

- Documentar la causa raíz y el impacto para referencia futura
- Fomente la responsabilidad en el trabajo de remediación
- Desarrolle conocimiento organizacional para reducir la frecuencia y gravedad de futuros incidentes

Datadog completa automáticamente los postmortems con datos de incidentes utilizando las plantillas que usted defina. Puede generar postmortems en [Datadog Notebooks][1], [Confluence][2] o [Google Drive][3]. Los postmortems generados como Datadog Notebooks se integran directamente en la pestaña Post-Incident, donde puede visualizar, editar y realizar un seguimiento de su estado y propiedad sin salir del incidente.

## Permisos {#permissions}

- Para generar un postmortem, necesita el permiso **Incidents Write**.
- Para visualizar un postmortem generado en Datadog Notebooks, necesita el permiso **Notebooks Read**.

<div class="alert alert-danger">Para incidentes privados, los postmortems generados en Datadog Notebooks son accesibles para cualquier usuario con permiso de lectura de Notebooks, independientemente de si tienen acceso al incidente privado. Tome esto en consideración al generar postmortems para incidentes que contengan datos confidenciales.</div>

## Generar un postmortem {#generate-a-postmortem}

{{< img src="/incident_response/incident_management/post_incident/postmortems/post_incident_tab_generate_postmortem.png" alt="La pestaña Post-Incident que muestra el botón Generate Postmortem, la vista previa de la plantilla y la barra lateral Follow-Ups." style="width:100%;" >}}

Después de que un incidente se resuelva, puede generar un postmortem desde la pestaña **Post-Incident** del incidente.

Para generar un postmortem:

1. Abra el incidente y vaya a la pestaña **Post-Incident**.
1. Seleccione una plantilla de postmortem.
1. Haga clic en **Generar postmortem**. Datadog crea el postmortem en el destino configurado en la plantilla y lo vincula al incidente.

### Generar un postmortem con Workflow Automation {#generate-a-postmortem-with-workflow-automation}

También puede generar un postmortem desde un [flujo de trabajo][5] usando la acción **Generate postmortem**. La acción toma un incidente y una plantilla de postmortem, y adjunta el postmortem resultante a ese incidente. Use esta ruta para crear postmortems como parte de un proceso automatizado posterior al incidente, como después de que se resuelva un incidente.

<div class="alert alert-warning">Las variables generadas por IA disponibles para las plantillas de postmortem, como <code>{{incident.ai_summary}}</code>, se completan solo para los postmortems generados desde la pestaña <strong>Post-Incident</strong>. Un postmortem generado a través de la acción de flujo de trabajo <strong>Generate postmortem</strong> deja estas variables vacías. Para incluir contenido generado por IA, genere el postmortem desde la pestaña <strong>Post-Incident</strong>.</div>

Para obtener la lista completa de variables disponibles para las plantillas de postmortem, consulte [Templates][4] e [Incident variables][6].

## Visualizar y editar un postmortem {#view-and-edit-a-postmortem}

Visualice y edite su postmortem según su destino:

- **Datadog Notebooks**: Integrado en la pestaña **Post-Incident**. Lea y edite sin salir de Datadog. Varios usuarios pueden editar simultáneamente con marcadores de cursor. Agregue comentarios en línea. Los cambios se reflejan en el notebook subyacente.
- **Confluence**: Editar en Confluence (haga clic en el enlace de la pestaña **Post-Incident** para abrir su espacio de trabajo de Confluence).
- **Google Drive**: Editar en Google Docs (haga clic en el enlace de la pestaña **Post-Incident** para abrir Google Docs).

## Estado y propietario del postmortem {#postmortem-status-and-owner}

Los postmortems tienen dos campos para ayudar a realizar un seguimiento de la finalización y fomentar la responsabilidad:

| Campo | Descripción | Predeterminado |
|---|---|---|
| **Estado** | El estado de finalización actual del postmortem. | Borrador |
| **Propietario** | La persona responsable de completar el postmortem. | El usuario que generó el postmortem |

Los valores de estado del postmortem son:

| Estado | Descripción |
|---|---|
| **Borrador** | El postmortem está en curso. |
| **En revisión** | El postmortem está listo para su revisión. |
| **Completado** | El postmortem ha finalizado. |

El propietario del postmortem puede ser reasignado a cualquier usuario de su organización de Datadog. El propietario es un rol del sistema que aparece en el equipo de respuesta del incidente junto al Comandante de incidentes y el Responsable.

## Configurar plantillas de postmortem {#configure-postmortem-templates}

Para crear o administrar plantillas de postmortem, incluida la ubicación de guardado y las variables de plantilla, consulte [Templates][4].

## Adjuntar un postmortem existente {#attach-an-existing-postmortem}

Si ya existe un postmortem para un incidente fuera de Datadog, o si se creó antes de que se abriera el incidente, puede vincularlo directamente desde la pestaña **Post-Incident** sin generar uno nuevo. El postmortem vinculado puede ser cualquier URL: un Datadog notebook, una página de Confluence, un documento de Google o cualquier documento externo.

Para adjuntar un postmortem existente, abra la pestaña **Post-Incident** y utilice la opción **Attach existing post-mortem** para añadir el enlace.

## Eliminar un postmortem {#remove-a-postmortem}

Para eliminar un postmortem de un incidente, abra la pestaña **Post-Incident**, busque la entrada del postmortem y seleccione la opción para eliminarla. Eliminar el enlace no borra el documento subyacente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/notebooks/
[2]: /es/integrations/confluence/
[3]: /es/integrations/google_drive/
[4]: /es/incident_response/incident_management/setup_and_configuration/templates
[5]: /es/actions/workflows/
[6]: /es/incident_response/incident_management/setup_and_configuration/variables/#incident-variables