<!-- schema-ref-with-siblings: /api/latest/rendering-shapes/create-cases-for-security-findings/ -->

### Request

#### Body Data (required)

{% tabs %}
{% tab label="Model" %}
| Parent field | Field             | Type     | Description                                                                                                                                                                               |
| ------------ | ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|              | data [*required*] | [object] | Array of case creation request data objects.                                                                                                                                              |
| data         | attributes        | object   | Attributes of the case to create.                                                                                                                                                         |
| attributes   | priority          | enum     | Priority of the case. If not provided, the priority will be automatically set to "NOT_DEFINED". Allowed enum values: `NOT_DEFINED`, `P1`, `P2`, `P3`, `P4`, `P5`. Default: `NOT_DEFINED`. |
| data         | type [*required*] | enum     | Cases resource type. Allowed enum values: `cases`. Default: `cases`.                                                                                                                      |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": [
    {
      "attributes": {
        "priority": "P4"
      },
      "type": "cases"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
