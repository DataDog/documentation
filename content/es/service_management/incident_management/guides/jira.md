---
disable_toc: false
further_reading:
- link: integrations/jira/
  tag: Documentación
  text: Instalar la integración con Jira
- link: https://app.datadoghq.com/integrations/jira
  tag: Aplicación
  text: Cuadro de integración de Jira en la aplicación
title: Integrar Jira con la Gestión de incidencias de Datadog
---

## Información general

Jira es un sistema de seguimiento de problemas y proyectos para equipos de software. La integración de Datadog y Jira permite crear incidencias en Datadog y ver los problemas creados en Jira como eventos de Datadog. 

La integración de Jira con la gestión de incidencias de Datadog te ofrece las siguientes ventajas:
- **Mayor visibilidad**: garantiza que todas las partes interesadas estén inmediatamente informadas sobre las incidencias, facilitando una respuesta más rápida.
- **Compatibilidad con los flujos de trabajo existentes**: se integra perfectamente con tus procesos actuales, facilitando la planificación del trabajo y la gestión de prioridades con Jira.
- **Personalización al alcance de tu mano**: Con las plantillas dinámicas, puedes asignar gravedades de Datadog a prioridades de Jira, añadir etiquetas (labels) personalizadas, definir asignados dinámicos y mucho más.

## Requisitos previos

Para utilizar la creación automática de tickets, instala la integración a través del [cuadro de integración de Jira][1]. Para obtener más información, consulta la documentación de [Integración de Jira][2].

## Configuración

1. En la página [Configuración de integración][3], busca la integración Jira.
2. Haz clic en la opción **Automatically create a Jira Issue** (Crear automáticamente un problema de Jira).
3. Añade una condición para definir cuándo crear automáticamente un incidente en Jira. Si esta condición se deja en blanco, el problema en Jira se crea cuando se crea el incidente.
4. Define una plantilla con variables dinámicas para controlar el contenido del ticket de Jira. La plantilla asigna gravedades a las prioridades de Jira, añade etiquetas, define un asignado dinámico y más. Las variables dinámicas sólo funcionan para los [tipos de campo de Jira][5] **cadenas**.

{{< img src="service_management/incidents/guide/jira/incident_jira_template.png" alt="Plantilla de ejemplo para tickets de Jira creados automáticamente a partir de incidencias de Datadog" style="width:80%;" >}}

A medida que se crean incidentes, también se crea un problema en la instancia de Jira correspondiente. Este problema de Jira se vincula al incidente en Datadog como referencia.
El incidente en Jira se sincroniza unidireccionalmente con el incidente en función de la plantilla definida en la página [Configuración de integración][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /es/integrations/jira/
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://app.datadoghq.com/incidents
[5]: https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type