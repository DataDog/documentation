---
title: AGGR Functions in DDSQL
kind: documentation
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

<div class="alert alert-warning">AGGR functions are experimental, and subject to change.</div>

`AGGR` functions are functions that can be used in the `AGGR` statement and executed by the metrics query system. `AGGR` functions take one parameter, which can be either a string name of the metric being queried, or a subquery (for [multi-layer aggregation]).

## avg
| Name | Description |
|------|-------------|
| avg("metric" | DQLexpr ...) | For direct metrics queries, this calculates the true average of all data points in each group & time bucket (sum/count). For multi-layer aggregation, this calculates the average of all underlying timeseries values in each time bucket. |

## max
| Name | Description |
|------|-------------|
| max("metric" | DQLexpr ...) | Returns the space & time maximum for each bucket. |

## min
| Name | Description |
|------|-------------|
| min("metric" | DQLexpr ...) | Returns the space & time minimum for each bucket. |

## sum
| Name | Description |
|------|-------------|
| sum("metric" | DQLexpr ...) | Returns the sum of all values in each space/time bucket. |

## gauge_sum
| Name | Description |
|------|-------------|
| gauge_sum("metric") | Returns the sum of all values in each space/time bucket for gauge metrics. Use this instead of sum for gauge metrics, as sum("gauge_metric") will not set the correct space/time aggregators and return invalid results. Not available in multi-layer aggregation. This aggregator will be deprecated once DDSQL can resolve metric types, and handle automatically whether to use gauge_sum or sum |

## count
| Name | Description |
|------|-------------|
| count("metric" | DQLexpr ...) | Counts the number of timeseries at each point in time - i.e. counts the number of timeseries in each time bucket, and sums them up across each group. |

## context_count
| Name | Description |
|------|-------------|
| context_count("metric") | Counts the number of contexts* per group. Not available in multi-layer aggregation. |

## p50
| Name | Description |
|------|-------------|
| p50("metric") | Returns the 50th percentile for a sketch metric. Not available in multi-layer aggregation. |

## p75
| Name | Description |
|------|-------------|
| p75("metric") | Returns the 75th percentile for a sketch metric. Not available in multi-layer aggregation. |

## p90
| Name | Description |
|------|-------------|
| p90("metric") | Returns the 90th percentile for a sketch metric. Not available in multi-layer aggregation. |

## p99
| Name | Description |
|------|-------------|
| p99("metric") | Returns the 99th percentile for a sketch metric. Not available in multi-layer aggregation. |

## p999
| Name | Description |
|------|-------------|
| p999("metric") | Returns the 99.9th percentile for a sketch metric. Not available in multi-layer aggregation. |

## percentile
| Name | Description |
|------|-------------|
| percentile("metric" 0.NNNN) | Returns the NN.NNth percentile for a sketch metric. Not available in multi-layer aggregation. |

## total
| Name | Description |
|------|-------------|
| total("metric") | Returns the sum of all values in each space/time bucket with the as_count() modifier applied. Can't be used on gauge metrics. |

## rate
| Name | Description |
|------|-------------|
| rate("metric) | Returns the sum of all values in each space/time bucket with the as_rate() modifier applied. Can't be used on gauge metrics. |

## auto_sum
| Name | Description |
|------|-------------|
| auto_sum("metric") | Returns an automatic sum aggregation (based on metric type) following the F+F system behavior. For rate / gauge metrics, returns the space sum & time average for each bucket. For count / distribution metrics, returns the sum of all values in each bucket. |

## auto_avg
| Name | Description |
|------|-------------|
| auto_avg("metric") | Returns an automatic average aggregation (based on metric type) following the F+F system behavior. For rate / count metrics, returns the space average & time sum for each bucket. For gauge metrics returns the space & time trueavg for each bucket with the as_rate() modifier applied. For distribution metrics, returns the space & time trueavg for each bucket. |

