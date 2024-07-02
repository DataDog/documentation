---
title: DDSQL Aggregation Functions
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Aggregation functions

Aggregate functions compute a single result from a set of input values, usually used in conjunction with a `GROUP BY` statement.

### avg
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| avg(numeric *n1*, *n2* ...) | numeric | Computes the average (arithmetic mean) of all the non-null input values. |

### 最大
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| max(expr *e*) | variable | Computes the maximum of the non-null input values. Types of input values must be comparable. |

### 最小
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| min(expr *e*) | variable | Computes the minimum of the non-null input values. Types of input values must be comparable. |

### 合計
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| sum(numeric *n1*, *n2* ...) | numeric | Computes the sum of the non-null input values. |

### count
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| count(expr *e*) | 整数 | Computes the number of input rows in which the input value is not null. |
| count(distinct expr *e1*, *e2* ...) | 整数 | Computes the number of input values in which the input value is not null. |
| count(*) | 整数 | Computes the number of input rows. |