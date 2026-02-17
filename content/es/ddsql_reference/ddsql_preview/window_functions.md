---
aliases:
- /es/dashboards/ddsql_editor/reference/window_functions/
- /es/ddsql_editor/reference/window_functions/
private: true
title: Funciones de ventana DDSQL (Vista previa)
---

## Información general

Una función de ventana aplica una agregación a un subconjunto de las filas seleccionadas por una consulta. Las filas seleccionadas se conservan en el resultado de la consulta, en lugar de agruparse en una única fila como ocurriría en una agregación sin ventana.

Para obtener más información sobre el funcionamiento de las funciones de ventana, consulta la [documentación de Postgres para funciones de ventana][1].

## Sintaxis

{{< code-block lang="sql" >}}
function_name ([expression [, expression ...]]) OVER (
  [ PARTITION BY expression [, ...] ]
  [ ORDER BY expression [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] ]
  [ frame_clause ]
)
{{< /code-block >}}

La `frame_clause` opcional tiene la siguiente sintaxis:

{{< code-block lang="sql" >}}
{ RANGE | ROWS } frame_start
| { RANGE | ROWS } BETWEEN frame_start AND frame_end
{{< /code-block >}}

Las expresiones `frame_start` y `frame_end` pueden ser una de las siguientes:

- `UNBOUNDED PRECEDING`
- `offset PRECEDING`
- `CURRENT ROW`
- `offset FOLLOWING`
- `UNBOUNDED FOLLOWING`

## Funciones

Las siguientes funciones pueden utilizarse en ventanas, junto con [funciones de agregación][2].

### número_de_fila
| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| número_filas() | entero | Devuelve el número de la fila actual dentro de su partición, contando desde 1. |

### rango
| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| rango() | entero | Devuelve el rango de la fila actual, con espacios (el `row_number` de la primera fila en su grupo de pares). |

### rango_denso
| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| rango_denso() | entero | Devuelve el rango de la fila actual, sin espacios. Esta función efectivamente cuenta grupos de pares. |

### primer_valor
| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| primer_valor(valor *T*) | *T* | Devuelve el valor evaluado en la fila que es la primera fila del marco de la ventana. |

### último_valor
| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| último_valor(valor *T*) | *T* | Devuelve el valor evaluado en la fila que es la última fila del marco de la ventana. |

[1]: https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS
[2]: /es/ddsql_reference/ddsql_preview/functions/#aggregation-functions