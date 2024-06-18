---
title: AGGR Functions in DDSQL
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

<div class="alert alert-warning">AGGR functions are experimental, and subject to change.</div>

`AGGR` functions are functions that can be used in the `AGGR` statement and executed by the metrics query system. `AGGR` functions take one parameter, which can be either a string name of the metric being queried, or a [DQLExpr][1] subquery (for [multilayer aggregation]).

## avg
| Name | Description |
|------|-------------|
| avg("metric.name" &#124; [DQLExpr][1]) | For direct metrics queries, this calculates the true average of all data points in each group and time bucket (sum/count). For multilayer aggregation, this calculates the average of all underlying timeseries values in each time bucket. |

## max
| Name | Description |
|------|-------------|
| max("metric.name" &#124; [DQLExpr][1]) | Returns the space and time maximum for each bucket. |

## mins
| Name | Description |
|------|-------------|
| min("metric.name" &#124; [DQLExpr][1]) | Returns the space and time minimum for each bucket. |

## sum
| Name | Description |
|------|-------------|
| sum("metric.name" &#124; [DQLExpr][1]) | Returns the sum of all values in each space and time bucket. |

## gauge_sum
| Name | Description |
|------|-------------|
| gauge_sum("metric.name") | Returns the sum of all values in each space and time bucket for gauge metrics. Use this instead of `sum` for gauge metrics, as `sum("gauge_metric")` does not set the correct space and time aggregators and returns invalid results. Not available in multilayer aggregation. |

## count
| Name | Description |
|------|-------------|
| count("metric.name" &#124; [DQLExpr][1]) | Counts the number of timeseries in each time bucket, and sums them up across each group. |

## context_count
| Name | Description |
|------|-------------|
| context_count("metric.name") | Counts the number of contexts per group. Not available in multilayer aggregation. |

## p50
| Name | Description |
|------|-------------|
| p50("metric.name") | Returns the 50th percentile for a sketch metric. Not available in multilayer aggregation. |

## p75
| Name | Description |
|------|-------------|
| p75("metric.name") | Returns the 75th percentile for a sketch metric. Not available in multilayer aggregation. |

## p90
| Name | Description |
|------|-------------|
| p90("metric.name") | Returns the 90th percentile for a sketch metric. Not available in multilayer aggregation. |

## p99
| Name | Description |
|------|-------------|
| p99("metric.name") | Returns the 99th percentile for a sketch metric. Not available in multilayer aggregation. |

## p999
| Name | Description |
|------|-------------|
| p999("metric.name") | Returns the 99.9th percentile for a sketch metric. Not available in multilayer aggregation. |

## percentile
| Name | Description |
|------|-------------|
| percentile("metric.name", 0.NNNN) | Returns the NN.NNth percentile for a sketch metric. Not available in multilayer aggregation. |

## total
| Name | Description |
|------|-------------|
| total("metric.name") | Returns the sum of all values in each space and time bucket with the `as_count()` modifier applied. Can't be used on gauge metrics. |

## rate
| Name | Description |
|------|-------------|
| rate("metric.name") | Returns the sum of all values in each space and time bucket with the `as_rate()` modifier applied. Can't be used on gauge metrics. |

## auto_sum
| Name | Description |
|------|-------------|
| auto_sum("metric.name") | Returns an automatic sum aggregation (based on metric type). For rate and gauge metrics, returns the space sum and time average for each bucket. For count and distribution metrics, returns the sum of all values in each bucket. |

## auto_avg
| Name | Description |
|------|-------------|
| auto_avg("metric.name") | Returns an automatic average aggregation (based on metric type). For rate and count metrics, returns the space average and time sum for each bucket. For gauge metrics, returns the space and time true average for each bucket with the `as_rate()` modifier applied. For distribution metrics, returns the space and time true average for each bucket. |

[1]: /dashboards/ddsql_editor/reference#supported-sql-syntax