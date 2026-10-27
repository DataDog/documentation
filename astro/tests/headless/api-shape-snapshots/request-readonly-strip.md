<!-- request-readonly-strip: /api/latest/rendering-shapes/create-a-workflow/ -->

### Request

#### Body Data (required)

{% tabs %}
{% tab label="Model" %}
| Parent field | Field                   | Type   | Description                                                                                                |
| ------------ | ----------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
|              | data [*required*]       | object | Data related to the workflow.                                                                              |
| data         | attributes [*required*] | object | The definition of `WorkflowDataAttributes` object.                                                         |
| attributes   | name [*required*]       | string | Name of the workflow.                                                                                      |
| attributes   | webhookSecret           | string | If a Webhook trigger is defined on this workflow, a webhookSecret is required and should be provided here. |
| data         | type [*required*]       | enum   | The definition of `WorkflowDataType` object. Allowed enum values: `workflows`. Default: `workflows`.       |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "name": "",
      "webhookSecret": "string"
    },
    "type": "workflows"
  }
}
```
{% /tab %}
{% /tabs %}
