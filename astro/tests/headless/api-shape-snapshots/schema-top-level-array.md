<!-- schema-top-level-array: /api/latest/rendering-shapes/fetch-uptime-for-multiple-tests/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK.

{% tabs %}
{% tab label="Model" %}
| Parent field | Field     | Type    | Description                                                                                                                                                                                                                                                                                                                                         |
| ------------ | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|              | overall   | object  | Object containing the uptime information.                                                                                                                                                                                                                                                                                                           |
| overall      | history   | [array] | The state transition history for the monitor, represented as an array of pairs. Each pair is an array where the first element is the transition timestamp in Unix epoch format (integer) and the second element is the state (integer). For the state, an integer value of `0` indicates uptime, `1` indicates downtime, and `2` indicates no data. |
|              | public_id | string  | A Synthetic test ID.                                                                                                                                                                                                                                                                                                                                |
{% /tab %}

{% tab label="Example" %}
```json
{
  "overall": {
    "history": [
      [
        1579212382,
        0
      ]
    ]
  },
  "public_id": "abc-def-123"
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
