<!-- request-description: /api/latest/rendering-shapes/re-order-retention-filters/ -->

### Request

#### Body Data (required)

The list of retention filters in the new order.

{% tabs %}
{% tab label="Model" %}
| Parent field | Field             | Type     | Description                          |
| ------------ | ----------------- | -------- | ------------------------------------ |
|              | data [*required*] | [object] | A list of retention filters objects. |
| data         | id [*required*]   | string   | The ID of the retention filter.      |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": [
    {
      "id": "7RBOb7dLSYWI01yc3pIH8w"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
