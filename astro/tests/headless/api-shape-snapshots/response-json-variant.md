<!-- response-json-variant: /api/latest/rendering-shapes/get-usage-attribution-types/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Usage attribution types response.

| Parent field | Field      | Type     | Description                      |
| ------------ | ---------- | -------- | -------------------------------- |
|              | data       | object   | Usage attribution types data.    |
| data         | attributes | object   | List of usage attribution types. |
| attributes   | values     | [string] | List of usage attribution types. |
| data         | id         | string   | Unique ID of the response.       |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "values": [
        "infra_host"
      ]
    },
    "id": "string"
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
