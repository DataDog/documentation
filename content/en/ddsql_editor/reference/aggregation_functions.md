---
title: DDSQL Aggregation Functions
aliases:
- /dashboards/ddsql_editor/reference/aggregation_functions
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Aggregation functions

Aggregate functions compute a single result from a set of input values, usually used in conjunction with a `GROUP BY` statement.

### avg
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| avg(expr *e*) | numeric | numeric | Computes the average (arithmetic mean) of all the non-null input values. |

### max
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| max(expr *e*) | variable | variable | Computes the maximum of the non-null input values. Types of input values must be comparable. |

### min
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| min(expr *e*) | variable | variable | Computes the minimum of the non-null input values. Types of input values must be comparable. |

### sum
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| sum(expr *e*) | numeric | numeric | Computes the sum of the non-null input values. |

### count
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| count(expr *e*) | numeric | integer | Computes the number of input rows in which the input value is not null. |
| count(distinct expr *e1*, *e2* ...) | | integer | Computes the number of input values in which the input value is not null. |
| count(*) | | integer | Computes the number of input rows. |

### string_agg
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| string_agg(expr *e*, delimiter *e*) | string, string | string | Concatenates the input values, seperated by a delimiter. |

### array_agg
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| string_agg(expr *e*) | variable | array<variable> | Concatenates the input values into an array. |
