<!-- schema-oneOf-array-variant: /api/latest/rendering-shapes/list-agent-observability-dataset-records/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Response containing a paginated list of Agent Observability dataset records.

| Parent field | Field              | Type           | Description                                           |
| ------------ | ------------------ | -------------- | ----------------------------------------------------- |
|              | data [*required*]  | [object]       | List of dataset records.                              |
| data         | id [*required*]    | string         | Unique identifier of the record.                      |
| data         | input [*required*] | object <oneOf> | Represents any valid JSON value.                      |
| input        | Object 1           | string         | A scalar value represented as a string.               |
| input        | Object 2           | double         | A scalar numeric value.                               |
| input        | Object 3           | object         | An arbitrary object value with additional properties. |
| input        | Object 4           | [<oneOf>]      | An array of arbitrary values.                         |
| Object 4     | Object 1           | string         | A scalar value represented as a string.               |
| Object 4     | Object 2           | double         | A scalar numeric value.                               |
| Object 4     | Object 3           | object         | An arbitrary object value with additional properties. |
| Object 4     | Object 4           | boolean        | A scalar boolean value.                               |
| input        | Object 5           | boolean        | A scalar boolean value.                               |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": [
    {
      "id": "rec-7c3f5a1b-9e2d-4f8a-b1c6-3d7e9f0a2b4c",
      "input": {
        "description": "undefined",
        "type": "undefined"
      }
    }
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
