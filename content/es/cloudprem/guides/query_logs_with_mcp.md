---
description: Aprende a consultar los registros almacenados en los índices de CloudPrem
  utilizando el servidor MCP de Datadog
further_reading:
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Presentamos el servidor MCP de Datadog
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: Documentation
  text: Extensión de Datadog para VS Code y Cursor
- link: /cloudprem/operate/search_logs/
  tag: Documentation
  text: Buscar registros en CloudPrem
title: Consulta los registros de CloudPrem con el servidor MCP de Datadog
---
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a nuevas funciones de gestión de registros autohospedadas.
{{< /callout >}}

## Resumen

El [servidor MCP de Datadog (Protocolo de Contexto del Modelo)][1] te permite consultar tus registros de Datadog, incluidos los registros almacenados en los índices de CloudPrem, directamente a través de herramientas e integraciones impulsadas por IA. Consultar los registros de CloudPrem con el servidor MCP de Datadog desbloquea varias capacidades valiosas, incluyendo:

- **Solución de Problemas Unificada y Consciente del Contexto**: Consulta y correlaciona registros, métricas y trazas de cualquier entorno en un solo lugar, y pivota entre tipos de telemetría para identificar las causas raíz más rápido.
- **Interacción en Lenguaje Natural**: Haz preguntas en lenguaje sencillo y deja que la IA genere las consultas de registro apropiadas sin necesidad de recordar la sintaxis.

## Requisitos Previos

- Una implementación de CloudPrem en funcionamiento con registros ingeridos.
- Acceso al [servidor MCP de Datadog][1].
- El nombre de tu índice de CloudPrem (visible en el [Explorador de Registros de Datadog][2] bajo **ÍNDICES DE CLOUDPREM**).

## Consultando los registros de CloudPrem

Para consultar los registros almacenados en los índices de CloudPrem, usted **debe** especificar dos parámetros críticos además de su consulta estándar de registros:

- (Requerido) **`indexes`**: El/los nombre(s) de su(s) índice(s) de CloudPrem.
- (Requerido) **`storage_tier`**: Debe establecerse en `"cloudprem"`.

Sin ambos parámetros, las consultas se predeterminarán a buscar en los índices de registros estándar de Datadog en lugar de CloudPrem.

Para obtener los mejores resultados, su solicitud **también debería incluir**:
- (Recomendado) Rango de tiempo (por ejemplo, "en la última hora", "de las últimas 24 horas").
- (Recomendado) Filtros de consulta (servicio, estado, contenido del registro).

### Parámetros de consulta
La siguiente tabla describe los parámetros clave utilizados al consultar registros con el servidor MCP:

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `query` | Consulta de búsqueda de registros utilizando la sintaxis de consulta de Datadog | `"*"` (todos los registros), `"service:web"`, `"status:error"` |
| `indexes` | Array de nombres de índices de CloudPrem a buscar | `["cloudprem-dev"]` |
| `storage_tier` | Nivel de almacenamiento a consultar (debe ser `"cloudprem"` para los registros de CloudPrem) | `"cloudprem"` |
| `from` | Hora de inicio para la consulta | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | Hora de finalización para la consulta | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Orden de clasificación para los resultados | `"-timestamp"` (descendente), `"timestamp"` (ascendente) |

Para ejemplos de parámetros y consultas en lenguaje natural, consulte [Ejemplos avanzados de consultas](#advanced-query-examples).

### Encontrando el nombre de su índice de CloudPrem

Para encontrar el nombre de su índice de CloudPrem:

1. Navegue hasta el [Explorador de Registros de Datadog][2].
2. Busque la sección **ÍNDICES DE CLOUDPREM** en el panel de facetas a la izquierda.
3. Sus índices de CloudPrem están listados allí, típicamente en el formato `cloudprem-<cluster_id>`.

También puede encontrar el nombre de su índice en la [consola de CloudPrem][3], donde se muestra su ID de clúster.

## Ejemplos avanzados de consultas

Al utilizar herramientas impulsadas por IA con el servidor MCP de Datadog, puede hacer preguntas en lenguaje natural. El servidor MCP traducirá automáticamente estas en consultas de CloudPrem correctamente formateadas.

### Registros de errores de un servicio específico
**Indicación**:
"Muéstrame los registros de errores del servicio nginx en el índice cloudprem-dev en la última hora."

**Se traduce a**:

```json
{
  "query": "service:nginx status:error",
  "indexes": ["cloudprem-dev"],
  "storage_tier": "cloudprem",
  "from": "now-1h",
  "to": "now"
}
```

### Busca contenido específico de registros
**Indicación**:
"Encuentra registros que contengan 'tiempo de conexión agotado' del servicio API en cloudprem-prod de las últimas 24 horas."

**Se traduce a**:

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["cloudprem-prod"],
  "storage_tier": "cloudprem",
  "from": "now-24h",
  "to": "now"
}
```

### Filtra por código de estado HTTP
**Indicación**:
"Obtén todos los registros con código de estado 500 del índice cloudprem-prod en el último día."

**Se traduce a**:

```json
{
  "query": "status:500",
  "indexes": ["cloudprem-prod"],
  "storage_tier": "cloudprem",
  "from": "now-1d",
  "to": "now"
}
```

## Notas importantes

- **Tanto `storage_tier` como `indexes` son requeridos** al consultar registros de CloudPrem. Sin estos parámetros, las consultas buscarán en los índices estándar de Datadog en su lugar.
- `storage_tier` debe establecerse siempre en `"cloudprem"`.
- El parámetro `indexes` debe contener nombres válidos de índices de CloudPrem (típicamente en el formato `cloudprem-<cluster_id>`).
- Al usar consultas en lenguaje natural, menciona explícitamente el nombre de tu índice de CloudPrem en tu indicación.
- Los registros de CloudPrem son consultables en tiempo real tan pronto como son indexados.
- La sintaxis de consulta sigue la sintaxis estándar de búsqueda de registros de [Datadog][4].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/cloudprem
[4]: /es/logs/explorer/search_syntax/