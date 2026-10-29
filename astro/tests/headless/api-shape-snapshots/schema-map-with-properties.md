<!-- schema-map-with-properties: /api/latest/rendering-shapes/get-a-workflow-instance/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
The state of the given workflow instance.

| Parent field | Field      | Type   | Description                                   |
| ------------ | ---------- | ------ | --------------------------------------------- |
|              | data       | object | The data of the instance response.            |
| data         | attributes | object | The attributes of the instance response data. |
| attributes   | id         | string | The id of the instance.                       |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "id": "string"
    }
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
