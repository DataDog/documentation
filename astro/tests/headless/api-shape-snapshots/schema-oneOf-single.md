<!-- schema-oneOf-single: /api/latest/rendering-shapes/retrieve-a-dependency-scan-result/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
The raw scan result document produced by the SCA processor.
The contents reflect the vulnerabilities and metadata produced for the libraries
submitted in the original scan request.

| Field    | Type   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| Option 1 | object | An arbitrary object value with additional properties. |
{% /tab %}

{% tab label="Example" %}
```json
{}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
