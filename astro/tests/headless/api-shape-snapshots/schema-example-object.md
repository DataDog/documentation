<!-- schema-example-object: /api/latest/rendering-shapes/validate-csv-budget/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Response containing validation errors.

| Parent field | Field                | Type     | Description                                                                                    |
| ------------ | -------------------- | -------- | ---------------------------------------------------------------------------------------------- |
|              | errors               | [object] | The `ValidationResponse` `errors`.                                                             |
| errors       | meta [*required*]    | object   | Describes additional metadata for validation errors, including field names and error messages. |
| meta         | field                | string   | The field name that caused the error.                                                          |
| meta         | id                   | string   | The ID of the component in which the error occurred.                                           |
| meta         | message [*required*] | string   | The detailed error message.                                                                    |
| errors       | title [*required*]   | string   | A short, human-readable summary of the error.                                                  |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    {
      "meta": {
        "field": "region",
        "id": "datadog-agent-source",
        "message": "Field 'region' is required"
      },
      "title": "Field 'region' is required"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
