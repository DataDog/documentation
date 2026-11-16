<!-- schema-oneOf-primitive-variant: /api/latest/rendering-shapes/upsert-rows/ -->

### Request

#### Body Data (required)

{% tabs %}
{% tab label="Model" %}
| Parent field         | Field               | Type     | Description                                                                                                               |
| -------------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
|                      | data [*required*]   | [object] | List of row resources to create or update in the reference table. The request payload can be up to 1 MiB.                 |
| data                 | attributes          | object   | Attributes containing row data values for row creation or update operations.                                              |
| attributes           | values [*required*] | object   | Key-value pairs representing row data, where keys are schema field names and values match the corresponding column types. |
| additionalProperties | <any-key>           | <oneOf>  | Types allowed for Reference Table row values.                                                                             |
| <any-key>            | Object 1            | string   |                                                                                                                           |
| <any-key>            | Object 2            | int32    |                                                                                                                           |
| data                 | id [*required*]     | string   | The primary key value that uniquely identifies the row to create or update.                                               |
| data                 | type [*required*]   | enum     | Row resource type. Allowed enum values: `row`. Default: `row`.                                                            |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": [
    {
      "attributes": {
        "values": {
          "<any-key>": {
            "example": "undefined",
            "type": "undefined"
          }
        }
      },
      "id": "primary_key_value",
      "type": "row"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
