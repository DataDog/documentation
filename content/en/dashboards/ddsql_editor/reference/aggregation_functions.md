---
title: DDSQL Aggregation Functions
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Aggregation functions

Aggregate functions compute a single result from a set of input values, usually used in conjunction with a `GROUP BY` statement.

### avg
| Name | Return type | Description |
|------|-------------|-------------|
| avg(numeric *n1*, *n2* ...) | numeric | Computes the average (arithmetic mean) of all the non-null input values. |

### max
| Name | Return type | Description |
|------|-------------|-------------|
| max(expr *e*) | variable | Computes the maximum of the non-null input values. Types of input values must be comparable. |

### min
| Name | Return type | Description |
|------|-------------|-------------|
| min(expr *e*) | variable | Computes the minimum of the non-null input values. Types of input values must be comparable. |

### sum
| Name | Return type | Description |
|------|-------------|-------------|
| sum(numeric *n1*, *n2* ...) | numeric | Computes the sum of the non-null input values. |

### count
| Name | Return type | Description |
|------|-------------|-------------|
| count(expr *e*) | integer | Computes the number of input rows in which the input value is not null. |
| count(distinct expr *e1*, *e2* ...) | integer | Computes the number of input values in which the input value is not null. |
| count(*) | integer | Computes the number of input rows. |