<!-- response-readonly-writeonly: /api/latest/rendering-shapes/get-a-custom-destination/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
The custom destination.

| Parent field | Field      | Type   | Description                                            |
| ------------ | ---------- | ------ | ------------------------------------------------------ |
|              | data       | object | The definition of a custom destination.                |
| data         | attributes | object | The attributes associated with the custom destination. |
| attributes   | name       | string | The custom destination name.                           |
| data         | id         | string | The custom destination ID. Read-only.                  |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "name": "Nginx logs"
    },
    "id": "be5d7a69-d0c8-4d4d-8ee8-bba292d98139"
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
