<!-- response-error: /api/latest/rendering-shapes/delete-a-rum-based-metric/ -->

{% tab label="404" %}
Not Found

{% tabs %}
{% tab label="Model" %}
API error response.

| Field               | Type     | Description       |
| ------------------- | -------- | ----------------- |
| errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
