---
description: Aprende a consultar los registros almacenados en los índices de BYOC
  Logs utilizando el servidor MCP de Datadog
further_reading:
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Presentamos el servidor MCP de Datadog
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: Documentación
  text: Extensión de Datadog para VS Code y Cursor
- link: /cloudprem/operate/search_logs/
  tag: Documentación
  text: Buscar registros en BYOC Logs
title: Consultar BYOC Logs con el servidor MCP de Datadog
---
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="BYOC Logs está en vista previa" >}}
  Únete a la vista previa de BYOC Logs para acceder a nuevas funciones de gestión de registros autohospedadas.
{{< /callout >}}

## Resumen {#overview}

El [servidor MCP de Datadog (Modelo de Protocolo de Contexto)][1] te permite consultar tus registros de Datadog, incluidos los registros almacenados en los índices de BYOC Logs, directamente a través de herramientas e integraciones impulsadas por IA. Consultar BYOC Logs con el servidor MCP de Datadog desbloquea varias capacidades valiosas, incluyendo:

- **Solución de Problemas Unificada y Consciente del Contexto**: Consulta y correlaciona registros, métricas y trazas de cualquier entorno en un solo lugar, y pivota entre tipos de telemetría para identificar las causas raíz más rápido.
- **Interacción en Lenguaje Natural**: Haz preguntas en lenguaje sencillo y deja que la IA genere las consultas de registro apropiadas sin necesidad de recordar la sintaxis.

## Requisitos Previos {#prerequisites}

- Un despliegue de BYOC Logs en funcionamiento con registros ingeridos.
- Acceso al [servidor MCP de Datadog][1].
- El nombre de tu índice de BYOC Logs (visible en el [Explorador de Registros de Datadog][2] bajo {{< ui >}}BYOC INDEXES{{< /ui >}}).

## Consultando BYOC Logs {#querying-byoc-logs}

Para consultar los registros almacenados en los índices de BYOC Logs, debes especificar dos parámetros críticos además de tu consulta de registro estándar:

- (Requerido) **`indexes`**: El/Los nombre(s) de tu(s) índice(s) de BYOC Logs.
- (Requerido) **`storage_tier`**: Debe establecerse en `"cloudprem"`.

Sin ambos parámetros, las consultas se ajustarán a buscar índices de registro estándar de Datadog en lugar de Registros BYOC.

Para obtener los mejores resultados, su aviso **también debe incluir**:
- (Recomendado) Rango de tiempo (por ejemplo, "en la última hora", "de las últimas 24 horas").
- (Recomendado) Filtros de consulta (servicio, estado, contenido del registro).

### Parámetros de consulta {#query-parameters}
La siguiente tabla describe los parámetros clave utilizados al consultar registros con el servidor MCP:

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `query` | Consulta de búsqueda de registros utilizando la sintaxis de consulta de Datadog | `"*"` (todos los registros), `"service:web"`, `"status:error"` |
| `indexes` | Array de nombres de índices de Registros BYOC a buscar | `["cloudprem--dev--main"]` |
| `storage_tier` | Nivel de almacenamiento a consultar (debe ser `"cloudprem"` para Registros BYOC) | `"cloudprem"` |
| `from` | Hora de inicio para la consulta | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | Hora de finalización para la consulta | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Orden de clasificación para los resultados | `"-timestamp"` (descendente), `"timestamp"` (ascendente) |

Para ejemplos de parámetros y consultas en lenguaje natural, consulte [Ejemplos de consultas avanzadas](#advanced-query-examples).

### Encontrando el nombre de su índice de Registros BYOC {#finding-your-byoc-logs-index-name}

Para encontrar el nombre de su índice de Registros BYOC:

1. Navegue a [Datadog Log Explorer][2].
2. Busque la {{< ui >}}BYOC INDEXES{{< /ui >}} sección en el panel de facetas de la izquierda.
3. Sus índices de CloudPrem están listados allí, en el formato `cloudprem--<cluster_name>--<index_name>`.

También puedes encontrar los nombres de tus índices en la consola de [BYOC Logs][3] seleccionando un clúster y haciendo clic en {{< ui >}}View Indexes{{< /ui >}}.

## Ejemplos avanzados de consultas {#advanced-query-examples}

Al utilizar herramientas impulsadas por IA con el servidor MCP de Datadog, puedes hacer preguntas en lenguaje natural. El servidor MCP traducirá automáticamente estas en consultas de BYOC Logs correctamente formateadas.

### Registros de errores de un servicio específico {#error-logs-from-a-specific-service}
**Solicitud**:
"Muéstrame los registros de errores del servicio nginx en el índice cloudprem--dev--main en la última hora."

**Se traduce a**:

```json
{
  "query": "service:nginx status:error",
  "indexes": ["cloudprem--dev--main"],
  "storage_tier": "cloudprem",
  "from": "now-1h",
  "to": "now"
}
```

### Buscar contenido de registro específico {#search-for-specific-log-content}
**Solicitud**:
"Encuentra registros que contengan 'tiempo de espera de conexión' del servicio API en cloudprem--prod--main de las últimas 24 horas."

**Se traduce a**:

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["cloudprem--prod--main"],
  "storage_tier": "cloudprem",
  "from": "now-24h",
  "to": "now"
}
```

### Filtrar por código de estado HTTP {#filter-by-http-status-code}
**Solicitud**:
"Obtén todos los registros con código de estado 500 del índice cloudprem--prod--main en el último día."

**Se traduce a**:

```json
{
  "query": "status:500",
  "indexes": ["cloudprem--prod--main"],
  "storage_tier": "cloudprem",
  "from": "now-1d",
  "to": "now"
}
```

## Notas importantes {#important-notes}

- **Tanto `storage_tier` como `indexes` son requeridos** al consultar BYOC Logs. Sin estos parámetros, las consultas buscarán en los índices estándar de Datadog en su lugar.
- `storage_tier` siempre debe estar configurado en `"cloudprem"`.
- El parámetro `indexes` debe contener nombres de índices de BYOC Logs válidos (en el formato `cloudprem--<cluster_name>--<index_name>`).
- Al utilizar consultas en lenguaje natural, menciona explícitamente el nombre de tu índice de BYOC Logs en tu solicitud.
- Los datos de los registros de BYOC son consultables en tiempo real tan pronto como se indexan.
- La sintaxis de consulta sigue la sintaxis estándar de búsqueda de registros de [Datadog][4].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/cloudprem
[4]: /es/logs/explorer/search_syntax/