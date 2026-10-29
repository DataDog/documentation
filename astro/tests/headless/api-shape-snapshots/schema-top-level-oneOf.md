<!-- schema-top-level-oneOf: /api/latest/rendering-shapes/create-or-update-kinds/ -->

### Request

#### Body Data (required)

Kind YAML or JSON.

{% tabs %}
{% tab label="Model" %}
| Parent field | Field             | Type   | Description                                                                  |
| ------------ | ----------------- | ------ | ---------------------------------------------------------------------------- |
|              | Option 1          | object | Schema for kind.                                                             |
| Option 1     | description       | string | Short description of the kind.                                               |
| Option 1     | displayName       | string | The display name of the kind. Automatically generated if not provided.       |
| Option 1     | kind [*required*] | string | The name of the kind to create or update. This must be in kebab-case format. |
|              | Option 2          | string | Kind definition in raw JSON or YAML representation.                          |
{% /tab %}

{% tab label="Example" %}
```json
{
  "description": "string",
  "displayName": "string",
  "kind": "my-job"
}
```
{% /tab %}
{% /tabs %}
