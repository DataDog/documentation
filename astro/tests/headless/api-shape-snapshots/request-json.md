<!-- request-json: /api/latest/rendering-shapes/save-new-value-for-on-demand-concurrency-cap/ -->

### Request

#### Body Data (required)

.

{% tabs %}
{% tab label="Model" %}
| Field                     | Type   | Description                             |
| ------------------------- | ------ | --------------------------------------- |
| on_demand_concurrency_cap | double | Value of the on-demand concurrency cap. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "on_demand_concurrency_cap": "number"
}
```
{% /tab %}
{% /tabs %}
