---
aliases:
- /es/service_management/case_management/mcp_server/
- /es/incident_response/case_management/mcp_server/
- /es/incident_response/case_management/ai/
description: Datadog Work Management se integra con herramientas de IA para ayudar
  a automatizar la clasificación, asignación y resolución de elementos de trabajo
  mediante el MCP Server y agentes personalizados.
site_support_id: work_management_ai_site_support
title: Herramientas de IA para Work Management
---
Datadog Work Management le permite asignar elementos de trabajo a agentes de IA junto con personas. Se integra con el Datadog MCP Server y agentes personalizados creados con Bits Agent Builder para automatizar la clasificación, asignación y resolución de elementos de trabajo.

## MCP Server {#mcp-server}

El Datadog MCP Server expone un conjunto de herramientas `cases` para que los agentes de IA que admiten el [Model Context Protocol (MCP)][2] puedan acceder a los datos de Work Management. El `cases`conjunto de herramientas permite a los agentes de IA crear, buscar, actualizar y gestionar elementos de trabajo. Los flujos de trabajo admitidos incluyen:

- **Búsqueda de elementos de trabajo** según el estado, la prioridad, el proyecto u otros filtros
- **Recuperación de detalles de un elemento de trabajo** para comprender la cronología más reciente de acciones y el trabajo restante
- **Creación de un nuevo elemento de trabajo** para realizar un seguimiento de la información relacionada con una investigación en curso
- **Actualización de un elemento de trabajo existente** con nuevos hallazgos, enlaces a tickets de Jira relacionados o prioridad escalada

Para obtener instrucciones de configuración y detalles completos sobre el `cases`conjunto de herramientas, consulte la [documentación del Datadog MCP Server][1].

## Agentes personalizados {#custom-agents}

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="Únase a la vista previa">}} La integración de Work Management con agentes personalizados está en vista previa.{{< /callout >}}

Asigne elementos de trabajo a agentes especializados creados con [Bits Agent Builder][3] para automatizar el ciclo de vida completo del elemento de trabajo, desde la clasificación inicial hasta el seguimiento y la resolución. Para ver casos de uso de ejemplo, arquetipos de agentes y asignación manual y automatizada, consulte [Custom Agents][4].

[1]: /es/mcp_server
[2]: https://modelcontextprotocol.io/
[3]: /es/actions/agents/
[4]: /es/incident_response/work_management/ai/custom_agents/