<!-- schema-map-of-objects: /api/latest/rendering-shapes/get-all-apm-service-dependencies/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
An object containing a list of APM services and their dependencies.

| Parent field         | Field              | Type     | Description                                         |
| -------------------- | ------------------ | -------- | --------------------------------------------------- |
| additionalProperties | <any-key>          | object   | An object containing an APM service's dependencies. |
| <any-key>            | calls [*required*] | [string] | A list of dependencies.                             |
{% /tab %}

{% tab label="Example" %}
```json
{
  "servica_a": {
    "calls": [
      "service_b",
      "service_c"
    ]
  },
  "service_b": {
    "calls": [
      "service_o"
    ]
  },
  "service_c": {
    "calls": [
      "service_o"
    ]
  },
  "service_o": {
    "calls": []
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
