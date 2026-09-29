---
description: Administre los análisis post mortem y las tareas de seguimiento después
  de la resolución de incidentes
further_reading:
- link: /incident_response/incident_management/post_incident/postmortems
  tag: Documentación
  text: Genere y administre análisis post mortem
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentación
  text: Configure plantillas de análisis post mortem y de mensajes
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: Documentación
  text: Administre las tareas de seguimiento de incidentes
- link: /incident_response/work_management/
  tag: Documentación
  text: Realice seguimiento de los seguimientos con Work Management
title: Post-incidente
---
## Descripción general {#overview}

Después de que un incidente se resuelve o alcanza un estado estable, comienza la fase posterior al incidente. Esta fase crítica se centra en documentar lo que sucedió, capturar las lecciones aprendidas y realizar un seguimiento de las acciones para evitar incidentes similares en el futuro. El flujo de trabajo posterior al incidente garantiza la mejora continua de su proceso de respuesta a incidentes y ayuda a construir el conocimiento organizacional.

Utilice las actividades posteriores al incidente para:

- Genere análisis post mortem que documenten los detalles del incidente, la causa raíz y los aprendizajes
- Cree y administre tareas de seguimiento para la remediación y las mejoras de procesos
- Comunique el estado y la resolución del incidente a las partes interesadas
- Cree una base de conocimientos de patrones y resoluciones de incidentes

## Análisis post mortem {#postmortems}

Los análisis post mortem son esenciales para la mejora continua de su proceso de respuesta a incidentes. Después de que se resuelve un incidente, puede generar un análisis post mortem que se completa automáticamente con la información del incidente mediante un notebook de Datadog, una página de Confluence o un documento de Google Drive.

Un análisis post mortem de un incidente generalmente incluye:

- **Resumen del incidente**: descripción general de alto nivel de lo que ocurrió
- **Cronología**: secuencia cronológica de eventos durante el incidente
- **Análisis de causa raíz**: Investigación detallada de las causas subyacentes
- **Evaluación de impacto**: Métricas de impacto en el cliente y el servicio
- **Elementos de acción**: Tareas específicas para evitar la recurrencia
- **Lecciones aprendidas**: Conclusiones clave para la organización

Para obtener más información sobre la generación de análisis post mortem y la configuración de plantillas, consulte [Incident Postmortems][2].

## Seguimientos {#follow-ups}

Durante una investigación de incidentes, su equipo podría identificar problemas que necesitan atención pero que no están directamente relacionados con la resolución del problema inmediato. Los seguimientos le permiten capturar estos elementos para una acción posterior sin perderlos de vista en la prisa por restaurar el servicio.

Ejemplos comunes incluyen mejoras de infraestructura, deuda técnica, brechas de procesos y correcciones de causa raíz que requieren más tiempo que la mitigación inmediata.

Los seguimientos se pueden crear en cualquier momento durante o después de un incidente desde la pestaña **Remediación** del incidente o desde Slack. Después de la resolución, puede exportar los seguimientos a [Jira][3] (sincronización unidireccional) o [Work Management][4] (sincronización bidireccional con Jira y ServiceNow) para integrarlos en los flujos de trabajo existentes de su equipo.

Para obtener información detallada sobre cómo crear, gestionar y exportar seguimientos de incidentes, consulte [Incident Follow-ups][5].

## Páginas de estado {#status-pages}

Comunique el estado y la resolución de los incidentes a las partes interesadas mediante páginas de estado. Puede crear y actualizar avisos de páginas de estado directamente desde los incidentes para compartir la disponibilidad del servicio y los detalles del incidente con los clientes o equipos internos. Las actualizaciones de la página de estado se pueden conectar a componentes de incidentes específicos para reflejar automáticamente el impacto de los incidentes en curso.

Para obtener más información sobre cómo integrar las páginas de estado con su flujo de trabajo de incidentes, consulte [Status Pages][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /es/incident_response/incident_management/post_incident/postmortems
[3]: /es/integrations/jira/
[4]: /es/incident_response/work_management/
[5]: /es/incident_response/incident_management/post_incident/follow-ups
[6]: /es/incident_response/status_pages/