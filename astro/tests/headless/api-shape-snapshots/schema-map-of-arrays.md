<!-- schema-map-of-arrays: /api/latest/rendering-shapes/get-all-host-tags/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
In this object, the key is the tag, and the value is a list of host names that are reporting that tag.

| Parent field         | Field     | Type     | Description                                 |
| -------------------- | --------- | -------- | ------------------------------------------- |
|                      | tags      | object   | A mapping of tags to host names             |
| additionalProperties | <any-key> | [string] | A list of host names which contain this tag |
{% /tab %}

{% tab label="Example" %}
```json
{
  "tags": {
    "<any-key>": [
      "test.metric.host"
    ]
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
