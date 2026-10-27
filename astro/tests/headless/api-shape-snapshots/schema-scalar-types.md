<!-- schema-scalar-types: /api/latest/rendering-shapes/get-a-given-apm-retention-filter/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
The retention filters definition.

| Parent field | Field                   | Type    | Description                                                                                                           |
| ------------ | ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
|              | data                    | object  | The definition of the retention filter.                                                                               |
| data         | attributes [*required*] | object  | The attributes of the retention filter.                                                                               |
| attributes   | created_at              | int64   | The creation timestamp of the retention filter.                                                                       |
| attributes   | created_by              | string  | The creator of the retention filter.                                                                                  |
| attributes   | enabled                 | boolean | The status of the retention filter (Enabled/Disabled).                                                                |
| attributes   | rate                    | double  | Sample rate to apply to spans going through this retention filter. A value of 1.0 keeps all spans matching the query. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "created_at": "integer",
      "created_by": "string",
      "enabled": true,
      "rate": 1
    }
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
