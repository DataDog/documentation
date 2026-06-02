---
aliases:
- /es/service_management/incident_management/guides/jira
- /es/service_management/incident_management/integrations/jira/
- /es/incident_response/incident_management/integrations/jira/
further_reading:
- link: integrations/jira/
  tag: Documentación
  text: Instalar la integración con Jira
- link: https://app.datadoghq.com/integrations/jira
  tag: Aplicación
  text: Cuadro de integración de Jira en la aplicación
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: Documentación
  text: Exportar seguimientos a Jira
title: Integrar Jira con Incident Management de Datadog
---

## Información general

Jira es un sistema de seguimiento de problemas y projects (proyecto) para equipos de software. La integración Datadog y Jira permite crear problemas a partir de incidents (incidentes) en Datadog y ver los problemas creados en Jira como eventos de Datadog.

**Nota**: Esta integración solo sincroniza los datos de Datadog con Jira. Las actualizaciones realizadas en Jira no se sincronizan con los incidents (incidentes) de Datadog.

La integración de Jira con Incident Management de Datadog te ofrece las siguientes ventajas:
- **Mayor visibilidad**: garantiza que todas las partes interesadas estén inmediatamente informadas sobre las incidencias, facilitando una respuesta más rápida.
- **Compatibilidad con los flujos de trabajo existentes**: se integra perfectamente con tus procesos actuales, facilitando la planificación del trabajo y la gestión de prioridades con Jira.
- **Asignación y configuración flexibles**: Con las plantillas dinámicas, puedes asignar gravedades de Datadog a prioridades de Jira, asignar estados de incident (incidente) a estados de Jira, añadir etiquetas personalizadas y definir cesionarios dinámicos.

## Requisitos previos

Para utilizar la creación automática de tickets, instala la integración a través del [cuadro de integración de Jira][1]. Para obtener más información, consulta la documentación de [Integración de Jira][2].

## Instalación

1. En la [page (página) de configuración de integración][3], busca la integración de Jira.
2. Haz clic en **Enable Jira issue creation** (Activar creación de problemas de Jira) para permitir la creación manual o automática de Jira.
3. Selecciona tu cuenta de Jira, project (proyecto) y el tipo de problema.
4. Añade una condición para definir cuándo crear automáticamente un problema de Jira. Si esta condición se deja en blanco, se crea un problema de Jira para todos los incidents (incidentes) nuevos.
5. Define una plantilla con variables dinámicas para rellenar los campos del ticket de Jira. Escribe `{{` para insertar variables de plantilla de incident (incidente) en campos como **Summary** (Resumen), **Reporter** (Informador) y **Description** (Descripción). Las variables dinámicas solo funcionan con **string** (cadenas) [tipos de campo de Jira][5].

{{< img src="service_management/incidents/guide/jira/incident_jira_settings.png" alt="Configuraciones de integración de Jira en las que se muestran ajustes de la cuenta, reglas de creación condicionales y propiedades de Jira con variables de plantilla" style="width:80%;" >}}

6. Configura las asignaciones de estado y gravedad para sincronizar los estados y gravedad de incident (incidente) con los estados y prioridades de Jira.

{{< img src="service_management/incidents/guide/jira/incident_jira_mappings.png" alt="Asignaciones de estado y de gravedad de Jira en las que se muestran estados de incident (incidente) asignados a estados y niveles de gravedad de Jira asignados a propiedades de Jira" style="width:80%;" >}}

A medida que se crean incidents (incidentes), también se crea un problema en la instancia de Jira correspondiente. Este problema de Jira se vincula al incident (incidente) en Datadog como referencia.
El problema de Jira se sincroniza unidireccionalmente con el incident (incidente) en función de la plantilla y de las asignaciones definidas en la [page (página) de Configuración de integración][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /es/integrations/jira/
[3]: https://app.datadoghq.com/incidents/settings?integration=jira&section=integrations
[4]: https://app.datadoghq.com/incidents
[5]: https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type