---
aliases:
- /es/cloudprem/guides/query_logs_with_mcp/
description: Aprenda a consultar registros almacenados en índices de BYOC Logs usando
  el Datadog MCP Server
further_reading:
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: Documentación
  text: Datadog Extension for VS Code & Cursor
- link: /byoc-logs/operate/search_logs/
  tag: Documentación
  text: Buscar registros en BYOC Logs
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Introducción al Datadog MCP Server
- link: https://www.datadoghq.com/blog/byoc-cross-cluster-queries/
  tag: Blog
  text: Unifique datos en Datadog BYOC con consultas entre clústeres para equipos
    y agentes de IA
title: Consulte BYOC Logs con el Datadog MCP Server
---
## Descripción general {#overview}

Use la herramienta `search_datadog_logs` en el [Datadog MCP Server (Model Context Protocol)][1] para consultar registros almacenados en índices de BYOC (Bring Your Own Cloud) Logs. Puede acceder a la herramienta a través de herramientas e integraciones impulsadas por IA.

**Nota**: Los índices de BYOC Logs solo son compatibles con `search_datadog_logs`. La herramienta `analyze_datadog_logs` y la habilidad `datadog/querying-patterns` no admiten índices de BYOC Logs.

## Requisitos previos {#prerequisites}

- Una implementación de BYOC Logs en ejecución con registros ingeridos.
- Acceso al [Datadog MCP Server][1].
- El nombre de su índice de BYOC Logs (visible en el [Datadog Log Explorer][2] bajo {{< ui >}}BYOC INDEXES{{< /ui >}}).

## Consulta de BYOC Logs {#querying-byoc-logs}

Para consultar registros almacenados en índices de BYOC Logs, use `search_datadog_logs` y especifique el nombre de su índice de BYOC Logs además de su consulta de registro estándar.

Para obtener mejores resultados, su prompt **también debe incluir**:
- (Recomendado) Rango de tiempo (por ejemplo, "en la última hora", "de las últimas 24 horas").
- (Recomendado) Filtros de consulta (servicio, estado, contenido del registro).

### Parámetros de consulta {#query-parameters}
La siguiente tabla describe los parámetros clave utilizados con `search_datadog_logs`:

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `query` | Consulta de búsqueda de registros mediante la sintaxis de consulta de Datadog | `"*"` (todos los registros), `"service:web"`, `"status:error"` |
| `indexes` | Matriz de nombres de índices de BYOC Logs para buscar | `["byoc--dev--main"]` |
| `from` | Hora de inicio de la consulta | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | Hora de finalización de la consulta | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Orden de clasificación de los resultados | `"-timestamp"` (descendente), `"timestamp"` (ascendente) |

Para ver ejemplos de parámetros y consultas en lenguaje natural, consulte [Ejemplos de consultas avanzadas](#advanced-query-examples).

### Cómo encontrar el nombre de su índice de BYOC Logs {#finding-your-byoc-logs-index-name}

Para encontrar el nombre de su índice de BYOC Logs:

1. Vaya al [Datadog Log Explorer][2].
2. Busque la sección {{< ui >}}BYOC INDEXES{{< /ui >}} en el panel de facetas de la izquierda.
3. Sus índices de BYOC Logs aparecen allí, en el formato `byoc--<cluster_name>--<index_name>`.

También puede encontrar los nombres de sus índices en la [consola de BYOC Logs][3] seleccionando un clúster y haciendo clic en {{< ui >}}View Indexes{{< /ui >}}.

## Ejemplos de consultas avanzadas {#advanced-query-examples}

Al utilizar herramientas con IA con `search_datadog_logs`, puede hacer preguntas en lenguaje natural. La herramienta traduce estas preguntas a consultas de BYOC Logs con el formato correcto.

### Registros de errores de un servicio específico {#error-logs-from-a-specific-service}
**Prompt**:
"Muéstreme los registros de errores del servicio nginx en el índice byoc--dev--main en la última hora."

**Se traduce a**:

```json
{
  "query": "service:nginx status:error",
  "indexes": ["byoc--dev--main"],
  "from": "now-1h",
  "to": "now"
}
```

### Buscar contenido de registro específico {#search-for-specific-log-content}
**Prompt**:
"Busque registros que contengan 'connection timeout' del servicio API en byoc--prod--main de las últimas 24 horas."

**Se traduce a**:

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["byoc--prod--main"],
  "from": "now-24h",
  "to": "now"
}
```

### Filtrar por código de estado HTTP {#filter-by-http-status-code}
**Prompt**:
"Obtenga todos los registros con código de estado 500 del índice byoc--prod--main en el último día."

**Se traduce a**:

```json
{
  "query": "status:500",
  "indexes": ["byoc--prod--main"],
  "from": "now-1d",
  "to": "now"
}
```

## Notas importantes {#important-notes}

- El parámetro `indexes` debe contener nombres válidos de índices de BYOC Logs (en el formato `byoc--<cluster_name>--<index_name>`).
- Al usar consultas en lenguaje natural, mencione explícitamente el nombre de su índice de BYOC Logs en su prompt.
- Los datos de BYOC Logs se pueden consultar en tiempo real tan pronto como se indexan.
- La sintaxis de consulta sigue la [sintaxis de búsqueda de registros de Datadog][4] estándar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/byoc-logs
[4]: /es/logs/explorer/search_syntax/