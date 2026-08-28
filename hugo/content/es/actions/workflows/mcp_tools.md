---
description: Utilice agentes de IA para crear, administrar, ejecutar y depurar flujos
  de trabajo con el conjunto de herramientas de flujos de trabajo del Datadog MCP
  Server.
further_reading:
- link: mcp_server/setup
  tag: Documentación
  text: Configure el Datadog MCP Server
- link: mcp_server
  tag: Documentación
  text: Descripción general del Datadog MCP Server
- link: mcp_server/tools
  tag: Documentación
  text: Herramientas del Datadog MCP Server
- link: actions/workflows/
  tag: Documentación
  text: Workflow Automation
title: Herramientas MCP de Workflow Automation
---
## Descripción general {#overview}

El [Datadog MCP Server][1] permite que los agentes de IA creen y administren flujos de trabajo a través del [Model Context Protocol (MCP)][2].

El conjunto de herramientas `workflows` brinda a los clientes de IA como Claude Code, Cursor y OpenAI Codex acceso a sus flujos de trabajo, Action Catalog, esquema de flujo de trabajo y datos de ejecución. Mediante el uso de lenguaje natural, puede crear y actualizar flujos de trabajo, validar sus especificaciones, ejecutar flujos de trabajo publicados e investigar los resultados de la ejecución.

## Casos de uso {#use-cases}

Utilice el conjunto de herramientas `workflows` para crear automatizaciones que:

- **Investigue alertas de seguimiento**: Cuando un seguimiento de tasa de errores de servicio envía una alerta, ejecute Bits Investigation para correlacionar la latencia, las implementaciones recientes y el estado del servicio descendente, luego envíe los hallazgos al equipo responsable en Slack.
- **Utilice agentes personalizados**: Cree un agente de Bits Agent Builder personalizado para un sistema especializado, como pagos, data pipelines o Kubernetes, e invóquelo desde un flujo de trabajo siempre que una alerta requiera esa experiencia en el dominio.
- **Automatice la escalada de incidentes**: Cuando se declara un incidente crítico, recopile el contexto de servicio relevante, avise al equipo de guardia correspondiente, cree una incidencia y notifique a las partes interesadas.
- **Investigue regresiones de implementación**: Después de una implementación, compare el comportamiento actual del servicio con los cambios recientes y, cuando se encuentre una posible regresión, inicie una sesión de Bits Code para investigar el código relevante y proponer una solución.
- **Active la corrección desde una alerta**: Cuando un seguimiento detecta una condición de falla conocida, ejecute una acción de corrección como reiniciar un servicio, invocar una función de AWS Lambda o llamar a un punto de conexión de corrección interno.
- **Cree correcciones de código**: Investigue un problema, haga que Bits Code proponga un cambio de código, requiera revisión humana e implemente el cambio después de que se apruebe la corrección propuesta.
- **Escale hallazgos de seguridad de alta gravedad**: Cuando se detecta un hallazgo crítico, cree una incidencia o ticket, notifique al equipo responsable y avise al respondedor correspondiente.

## Inicio rápido {#quickstart}

<div class="alert alert-info">El <code>workflows</code> el conjunto de herramientas no está habilitado de forma predeterminada para clientes MCP externos.</div>

1. [Configure el Datadog MCP Server][1].
1. Cuando conecte su cliente de IA al Datadog MCP Server, agregue `workflows` al parámetro `toolsets`. Por ejemplo, para el sitio Datadog US1:

    {{< code-block lang="none" >}}
https://mcp.datadoghq.com/v1/mcp?toolsets=core,workflows
{{< /code-block >}}

    **Nota**: Si se autentica mediante una clave de aplicación, habilite [Actions API access][3] para esa clave desde [**Organization Settings > Application Keys**][4]. Actions API access está deshabilitado para las claves de aplicación de forma predeterminada y es necesario para acceder a las Workflow Automation APIs.

1. Después de conectarse, puede realizar solicitudes y su cliente de IA llama a las herramientas adecuadas en su nombre.
    - "Busque los flujos de trabajo que pertenecen a mi equipo y que se activan mediante alertas de seguimiento."
    - "Cree un flujo de trabajo que ejecute Bits Investigation cuando este seguimiento emita una alerta, luego publique los hallazgos en Slack."
    - "Depure mi última ejecución de flujo de trabajo fallida."

## Permisos {#permissions}

Las herramientas MCP de Workflow Automation utilizan los permisos existentes del usuario en Datadog. Las operaciones se realizan en la organización de Datadog utilizada para autenticar el MCP.

| Permiso       | Capacidades                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| Lectura de flujos de trabajo   | Encuentre y recupere flujos de trabajo, esquemas y acciones, valide especificaciones e inspeccione ejecuciones |
| Escritura de flujos de trabajo  | Cree, actualice, publique, retirar de publicación y elimine flujos de trabajo de forma permanente                   |
| Ejecución de flujos de trabajo    | Inicie flujos de trabajo y cancele ejecuciones en ejecución                                          |

## Herramientas disponibles {#available-tools}

El conjunto de herramientas `workflows` expone las siguientes herramientas, agrupadas por la parte del ciclo de vida del flujo de trabajo que admiten. Esto incluye buscar e inspeccionar flujos de trabajo, descubrir especificaciones y acciones, crear y administrar flujos de trabajo, validar especificaciones, ejecutar e inspeccionar ejecuciones y depurar pasos. Cuando realiza una solicitud de automatización en lenguaje natural, su cliente de IA llama a estas herramientas en su nombre. Encadena sus resultados para producir el resultado deseado. Consulte la [Datadog MCP Server tools reference][5] para obtener detalles completos sobre cada herramienta, incluidos los permisos y ejemplos de solicitudes.

### Descubrimiento de flujos de trabajo {#workflow-discovery}

- [`list_datadog_workflows`][6]
- [`get_datadog_workflow`][7]

### Descubrimiento de especificaciones y acciones {#specification-and-action-discovery}

- [`get_datadog_workflow_spec_schema`][8]
- [`search_datadog_workflow_actions`][9]
- [`get_datadog_workflow_action`][10]

### Creación y gestión de flujos de trabajo {#workflow-creation-and-management}

- [`create_datadog_workflow`][11]
- [`update_datadog_workflow`][12]
- [`publish_datadog_workflow`][13]
- [`unpublish_datadog_workflow`][14]
- [`delete_datadog_workflow`][15]
- [`validate_datadog_workflow`][16]

### Ejecución de flujos de trabajo {#workflow-execution}

- [`execute_datadog_workflow`][17]
- [`get_datadog_workflow_instance`][18]
- [`list_datadog_workflow_instances`][19]
- [`cancel_datadog_workflow_instance`][20]
- [`get_datadog_workflow_step_data`][21]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /es/account_management/api-app-keys/#actions-api-access
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /es/mcp_server/tools/#workflows
[6]: /es/mcp_server/tools/#list_datadog_workflows
[7]: /es/mcp_server/tools/#get_datadog_workflow
[8]: /es/mcp_server/tools/#get_datadog_workflow_spec_schema
[9]: /es/mcp_server/tools/#search_datadog_workflow_actions
[10]: /es/mcp_server/tools/#get_datadog_workflow_action
[11]: /es/mcp_server/tools/#create_datadog_workflow
[12]: /es/mcp_server/tools/#update_datadog_workflow
[13]: /es/mcp_server/tools/#publish_datadog_workflow
[14]: /es/mcp_server/tools/#unpublish_datadog_workflow
[15]: /es/mcp_server/tools/#delete_datadog_workflow
[16]: /es/mcp_server/tools/#validate_datadog_workflow
[17]: /es/mcp_server/tools/#execute_datadog_workflow
[18]: /es/mcp_server/tools/#get_datadog_workflow_instance
[19]: /es/mcp_server/tools/#list_datadog_workflow_instances
[20]: /es/mcp_server/tools/#cancel_datadog_workflow_instance
[21]: /es/mcp_server/tools/#get_datadog_workflow_step_data
[22]: /es/actions/actions_catalog/