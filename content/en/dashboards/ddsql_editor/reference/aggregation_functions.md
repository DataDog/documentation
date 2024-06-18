---
title: DDSQL Aggregation Functions
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

## Aggregation functions

Aggregate functions compute a single result from a set of input values, usually used in conjunction with a GROUP BY statement.

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

### string_agg
| Name | Return type | Description |
|------|-------------|-------------|
| string_agg(expr *e*, text *delimiter*) | text | Concatenates the non-null input values into a string. Each value after the first is preceded by the corresponding *delimiter* (if it's not `NULL`). |

### approx_percentile
| Name | Return type | Description |
|------|-------------|-------------|
| approx_percentile(expr *e*, numeric *n*) | real | Returns an approximated value for the desired percentile *n*. |

### array_agg
| Name | Return type | Description |
|------|-------------|-------------|
| array_agg(value *v1*, *v2* ...) | array | Collects all the non-null input values into an array. |