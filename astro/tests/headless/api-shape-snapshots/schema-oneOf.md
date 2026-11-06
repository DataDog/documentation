<!-- schema-oneOf: /api/latest/rendering-shapes/list-distinct-metric-volumes-by-metric-name/ -->

### Response

{% tabs %}
{% tab label="200" %}
Success

{% tabs %}
{% tab label="Model" %}
Response object which includes a single metric's volume.

| Parent field                   | Field                          | Type    | Description                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                | data                           | <oneOf> | Possible response objects for a metric's volume.                                                                                                                                                                                                                                                   |
| data                           | <type=distinct_metric_volumes> | object  | Object for a single metric's distinct volume.                                                                                                                                                                                                                                                      |
| <type=distinct_metric_volumes> | attributes                     | object  | Object containing the definition of a metric's distinct volume.                                                                                                                                                                                                                                    |
| attributes                     | distinct_volume                | int64   | Distinct volume for the given metric.                                                                                                                                                                                                                                                              |
| <type=distinct_metric_volumes> | id                             | string  | The metric name for this resource.                                                                                                                                                                                                                                                                 |
| <type=distinct_metric_volumes> | type                           | enum    | The metric distinct volume type. Allowed enum values: `distinct_metric_volumes`. Default: `distinct_metric_volumes`.                                                                                                                                                                               |
| data                           | <type=metric_volumes>          | object  | Object for a single metric's ingested and indexed volume.                                                                                                                                                                                                                                          |
| <type=metric_volumes>          | attributes                     | object  | Object containing the definition of a metric's ingested and indexed volume.                                                                                                                                                                                                                        |
| attributes                     | indexed_volume                 | int64   | Estimated average hourly number of indexed time series for the given metric over the last hour. For organizations on Metric Name Pricing, this represents the estimated sum of indexed data points over the last hour.                                                                             |
| attributes                     | ingested_volume                | int64   | Estimated average hourly number of ingested time series for the given metric over the last hour. This value is `0` for metrics not configured with Metrics Without Limits. For organizations on Metric Name Pricing, this represents the estimated sum of ingested data points over the last hour. |
| <type=metric_volumes>          | id                             | string  | The metric name for this resource.                                                                                                                                                                                                                                                                 |
| <type=metric_volumes>          | type                           | enum    | The metric ingested and indexed volume type. Allowed enum values: `metric_volumes`. Default: `metric_volumes`.                                                                                                                                                                                     |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "distinct_volume": 10
    },
    "id": "test.metric.latency",
    "type": "distinct_metric_volumes"
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
