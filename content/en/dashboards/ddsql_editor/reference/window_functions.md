---
title: DDSQL Window Functions
kind: documentation
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Overview

A window function applies an aggregation to some subset of the rows selected by a query. The selected rows are preserved in the query output, rather than being grouped into a single output row as they would be in a non-window aggregation.

For details on how window functions work, see the [Postgres documentation for Window Function][1].

## Syntax

{{< code-block lang="sql" >}}
function_name ([expression [, expression ...]]) OVER (
  [ PARTITION BY expression [, ...] ]
  [ ORDER BY expression [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] ]
  [ frame_clause ]
)
{{< /code-block >}}

The optional `frame_clause` has the following syntax:

{{< code-block lang="sql" >}}
{ RANGE | ROWS } frame_start
| { RANGE | ROWS } BETWEEN frame_start AND frame_end
{{< /code-block >}}

The `frame_start` and `frame_end` expressions can be one of the following:

- `UNBOUNDED PRECEDING`
- `offset PRECEDING`
- `CURRENT ROW`
- `offset FOLLOWING`
- `UNBOUNDED FOLLOWING`

## Functions

The functions below can be used in windows, along with the [aggregation functions][2].

### row_number
| Name | Return type | Description |
|------|-------------|-------------|
| row_number() | integer | Returns the number of the current row within its partition, counting from 1. |

### rank
| Name | Return type | Description |
|------|-------------|-------------|
| rank() | integer | Returns the rank of the current row, with gaps (the row_number of the first row in its peer group). |

### dense_rank
| Name | Return type | Description |
|------|-------------|-------------|
| dense_rank() | integer | Returns the rank of the current row, without gaps. This function effectively counts peer groups. |

### first_value
| Name | Return type | Description |
|------|-------------|-------------|
| first_value(value *T*) | *T* | Returns the value evaluated at the row that is the first row of the window frame. |

### last_value
| Name | Return type | Description |
|------|-------------|-------------|
| last_value(value *T*) | *T* | Returns the value evaluated at the row that is the last row of the window frame. |

[1]: https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS
[2]: /dashboards/ddsql_editor/reference/aggregation_functions