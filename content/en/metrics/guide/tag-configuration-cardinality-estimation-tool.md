---
title: The Tag Configuration Cardinality Estimation Tool
kind: guide
is_beta: true
---

<div class="alert alert-warning">This functionality is in private beta and the endpoint is likely to change.</div>

## Overview

The tag configuration cardinality estimation tool helps you estimate how many distinct custom metrics result from a particular tag configuration for a given metric. Before you begin, you need a [Datadog API and app key][1].

### Path

```
GET https://api.datadoghq.com/api/metric/estimate
```

## Request

### Parameters

| Field                     | Type             | Description                                                                                                                                                                         |
|---------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `metric_name` (*required*) | string           | Name of the metric to estimate.                                                                                                                                                     |
| `groups[]`                | lists of strings | Groups to include when estimating output of a timeseries.                                                                                                                           |
| `hours_ago`               | integer          | The number of hours to go back to get historical data. Default value is 49, values lower than 49 are unlikely to produce accurate results.                                                                 |
| `timespan_h`              | integer          | The number of hours before the `hours_ago` value to track. Datadog recommends a one-hour time span.                                           |
| `pct`                     | boolean          | Calculates the number of percentile output series instead of distribution, count or gauge. Defaults to `false`. Only works for distribution metrics, otherwise it returns an error. |

### Example

```curl
https://api.datadoghq.com/metric/estimate?metric_name=dist.dd.dogweb.latency&groups[]=host&groups[]=page&hours_ago=120&pct=true
```

## Response

### Model

| Field                     | Type             | Description                                                                                                                                                                      |
|---------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `estimated_output_series` | integer          | A count of unique timeseries output as of the timespan specified by the request for the groups specified (from `hours_ago` from now to `hours_ago` minus `timespan_h` from now). |
| `estimate_type`           | string           | The type of metric being estimated. One of: [distribution][2], [percentile][3], [count][4], [gauge][5].                                                                                         |
| `as_of`                   | timestamp string | The UTC timestamp of the most recent data used ( `hours_ago` from now). Example: `2020-04-16 09:25:40.214469`.                                                              |

### Example

```json
{"estimated_output_series":35334,"estimate_type":"percentile","as_of":"2020-04-16 09:29:57.789176"}
```



[1]: /account_management/api-app-keys/
[2]: /developers/metrics/types/?tab=distribution#metric-types
[3]: /developers/metrics/types/?tab=distribution#calculation-of-percentile-aggregations
[4]: /developers/metrics/types/?tab=count#metric-types
[5]: /developers/metrics/types/?tab=gauge#metric-types
