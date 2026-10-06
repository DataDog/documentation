---
algolia:
  tags:
  - follow ups
  - follow-up
  - follow up
aliases:
- /es/service_management/incident_management/follow-ups/
- /es/incident_response/incident_management/follow-ups
description: Administre las tareas de seguimiento definidas durante su proceso de
  respuesta a incidentes.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: Documentación
  text: Configuración de incidentes
- link: /service_management/incident_management/integrations/slack/
  tag: Documentación
  text: Integre Slack con Datadog Incident Management
title: Seguimientos de incidentes
---
## Resumen {#overview}

Los seguimientos de incidentes son tareas realizadas después de que se resuelve un incidente. Durante una investigación de incidentes, su equipo podría identificar problemas que necesitan atención pero que no están directamente relacionados con la resolución del problema inmediato. En lugar de perder el rastro de estos elementos en la prisa por restaurar el servicio, puede capturarlos como seguimientos para abordarlos después de que se resuelva el incidente.

Ejemplos comunes para crear seguimientos incluyen:

- **Mejoras en la infraestructura**: registros mal configurados, alertas faltantes o cobertura de monitoreo inadecuada descubierta durante el incidente
- **Deuda técnica**: código que necesita refactorización, sistemas frágiles que necesitan fortalecimiento o documentación que necesita actualización
- **Mejoras en los procesos**: brechas en los manuales de procedimientos, rutas de escalamiento poco claras o permisos de acceso faltantes
- **Correcciones de la causa raíz**: problemas subyacentes que requieren más tiempo para abordarse que la mitigación inmediata

Al capturar estos elementos como seguimientos, su equipo puede mantenerse enfocado en la resolución del incidente mientras asegura que no se olviden las mejoras importantes.

## Tareas de seguimiento sugeridas por IA {#ai-suggested-follow-up-tasks}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Las tareas de seguimiento sugeridas por IA no son compatibles con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Después de que se resuelve un incidente, la IA de incidentes escanea el canal del incidente en busca de tareas de seguimiento que los responsables mencionaron durante el incidente. Luego, le solicita que las revise y cree con un solo clic. Las tareas guardadas de esta manera aparecen como seguimientos de incidentes en Datadog Incident Management.

Para ver las tareas de seguimiento sugeridas por IA:
1. Navegue al incidente relevante en Datadog.
1. Abra la pestaña **Post-Incident** para ver una lista de todas las tareas de seguimiento guardadas desde Slack.

## Crear y gestionar seguimientos {#create-and-manage-follow-ups}

Los seguimientos se pueden crear en cualquier momento durante un incidente (incluso antes de que se resuelva), lo que permite a los responsables documentar el trabajo necesario a medida que lo descubren. Después de la resolución, puede [exportar seguimientos](#export-follow-ups) a Jira o Work Management para integrarlos en los flujos de trabajo existentes de su equipo.

**Desde Datadog**: Vaya a la pestaña **Post-Incident** del incidente para ver, crear, editar y rastrear todos los seguimientos asociados con el incidente.

**Desde Slack**: En el canal del incidente, ejecute `/datadog followup` para crear un nuevo seguimiento o `/datadog followup list` para ver y gestionar los seguimientos existentes. Para obtener más comandos de Slack, consulte [Integrate Slack with Datadog Incident Management][5].

## Seguimientos en notebooks de postmortem {#follow-ups-in-postmortem-notebooks}

Puede mostrar los seguimientos directamente en un notebook de postmortem usando la variable de plantilla `{{incident.follow-ups}}` variables de plantilla. Cuando se agrega a una plantilla de postmortem de Datadog Notebooks, esta variable genera una lista de elementos de seguimiento. Desde la vista de lista en su notebook, puede establecer fechas de entrega, asignar elementos o crear nuevos elementos de seguimiento. Para obtener más información, consulte [Incident Postmortems][6].

## Exportar seguimientos {#export-follow-ups}

Puede exportar seguimientos desde Incident Management a Work Management o Jira, lo que le permite rastrearlos y gestionarlos dentro de los flujos de trabajo existentes de su equipo. Puede exportar seguimientos manualmente o configurar Incident Management para exportar automáticamente todos los seguimientos a un proyecto seleccionado de Work Management o Jira.

Para exportar seguimientos:
1. Navegue a [**Incident Management settings > Follow-Ups**][1].
1. Agregue o defina una **plantilla de exportación**. Una plantilla de exportación describe la forma en que Datadog puede exportar y sincronizar un seguimiento.
1. Se admiten los siguientes tipos de plantillas de exportación:
   1. [Work Management](#work-management-exports)
   1. [Jira](#jira-exports)
1. Al definir una plantilla, puede configurar cómo debe establecer Datadog los campos en el elemento de trabajo de Datadog o el issue de Jira resultante, utilizando variables proporcionadas por el seguimiento y su incidente. Por ejemplo:
   * `{{ title }}` representa el título del incidente
   * `{{ severity }}` representa la gravedad del incidente
   * `{{ follow_up_description }}` representa la descripción del seguimiento
   * `{{ follow_up_due_date }}` representa la fecha de vencimiento del seguimiento
1. (Opcional) Puede definir cómo se asigna el estado entre plataformas para garantizar que los cambios de estado permanezcan sincronizados en ambas plataformas. Los seguimientos tienen dos estados: **Open** y **Done**.

### Exportaciones manuales y automáticas {#manual-and-automatic-exports}

Después de definir una plantilla de exportación, tiene dos opciones:

| Opción de exportación      | Descripción                                                                                      | Cuándo usar                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Exportación manual**  | Exporte seguimientos individuales bajo demanda desde la pestaña Post-Incidente del incidente.                      | Utilícelo si prefiere exportar selectivamente solo ciertos seguimientos.                            |
| **Exportación automática** | Configure Incident Management para exportar automáticamente todos los seguimientos usando la plantilla cada vez que se creen. | Elija esto si desea que todos los seguimientos sean rastreados en su sistema externo de forma predeterminada.         |

### Exportaciones de Work Management {#work-management-exports}

Cuando exporta sus seguimientos a [Work Management][2], puede gestionar, rastrear y analizar sus seguimientos directamente en Datadog. Por ejemplo, puede:

* Ver todos los elementos de trabajo de seguimiento abiertos asignados a un usuario en particular en Datadog
* Crear un tablero de Datadog que muestre los elementos de trabajo de seguimiento por equipo
* Sincronizar automáticamente estos elementos de trabajo con cualquier aplicación externa con la que se integre Work Management, incluyendo Jira y ServiceNow

Cuando Datadog exporta un seguimiento de incidente a Work Management, crea un elemento de trabajo para el seguimiento en el proyecto que seleccionó en la plantilla de exportación.

**Sincronización de estado:** Datadog sincroniza el estado entre el seguimiento y el elemento de trabajo **en ambas direcciones**, siguiendo el mapeo que definió en la plantilla de exportación.

**Sincronización de asignado:** Datadog sincroniza el asignado entre el seguimiento y el elemento de trabajo **en ambas direcciones**. Debido a que un elemento de trabajo solo puede tener un asignado, solo se agrega el primer asignado del seguimiento.


### Exportaciones a Jira {#jira-exports}

Para exportar seguimientos a Jira, primero debe instalar la integración de Jira. Para obtener más información, consulte [Integrar Jira con Datadog Incident Management][4].

Cuando Datadog exporta un seguimiento de incidente a Jira, crea un Jira issue para el seguimiento en el proyecto que seleccionó en la plantilla de exportación.

**Sincronización de estado:** Cuando cierra o abre un seguimiento de incidente, Datadog sincroniza automáticamente el estado del Jira issue conectado según la asignación que definió en la plantilla de exportación. **Esta es una sincronización unidireccional.**

Las organizaciones que necesiten una sincronización bidireccional deben exportar a un proyecto de Work Management que esté configurado para la sincronización bidireccional con un proyecto de Jira.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=follow-ups
[2]: /es/service_management/case_management
[4]: /es/integrations/jira/
[5]: /es/service_management/incident_management/integrations/slack/#slack-commands
[6]: /es/incident_response/incident_management/post_incident/postmortems