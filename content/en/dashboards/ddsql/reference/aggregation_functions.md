---
title: DDSQL Aggregation and AGGR Functions
kind: documentation
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

## Aggregation functions

Aggregate functions compute a single result from a set of input values, usually used in conjunction with a GROUP BY statement.

### avg
| Name | Return type | Description |
|------|-------------|-------------|
| avg(numeric) | numeric | Computes the average (arithmetic mean) of all the non-null input values. |

### max
| Name | Return type | Description |
|------|-------------|-------------|
| max(expr) | variable | Computes the maximum of the non-null input values. Available for types that are comparable. |

### min
| Name | Return type | Description |
|------|-------------|-------------|
| min(expr) | variable | Computes the minimum of the non-null input values. Available for types that are comparable. |

### sum
| Name | Return type | Description |
|------|-------------|-------------|
| sum(numeric) | numeric | Computes the sum of the non-null input values. |

### count
| Name | Return type | Description |
|------|-------------|-------------|
| count(expr) | integer | Computes the number of input rows in which the input value is not null. |
| count(distinct expr) | integer | Computes the number of input values in which the input value is not null |
| count(*) | integer | Computes the number of input rows. |

### string_agg
| Name | Return type | Description |
|------|-------------|-------------|
| string_agg(expr, delimiter) | text | Concatenates the non-null input values into a string. Each value after the first is preceded by the corresponding delimiter (if it's not null). |

### approx_percentile
| Name | Return type | Description |
|------|-------------|-------------|
| approx_percentile(expr, numeric) | real | Returns an approximated value for the desired percentile |

### array_agg
| Name | Return type | Description |
|------|-------------|-------------|
| array_agg(anynonarray) | array | Collects all the non-null input values into an array. |