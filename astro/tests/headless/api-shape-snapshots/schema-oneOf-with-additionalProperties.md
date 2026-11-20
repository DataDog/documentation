<!-- schema-oneOf-with-additionalProperties: /api/latest/rendering-shapes/create-or-update-entities/ -->

### Request

#### Body Data (required)

Entity YAML or JSON.

{% tabs %}
{% tab label="Model" %}
| Parent field | Field             | Type    | Description                                                              |
| ------------ | ----------------- | ------- | ------------------------------------------------------------------------ |
|              | Option 1          | <oneOf> | Entity schema v3.                                                        |
| Option 1     | <kind=api>        | object  | Schema for API entities.                                                 |
| <kind=api>   | kind [*required*] | enum    | The definition of Entity V3 API Kind object. Allowed enum values: `api`. |
| <kind=api>   | spec              | object  | The definition of Entity V3 API Spec object.                             |
| spec         | interface         | <oneOf> | The API definition.                                                      |
| interface    | Object 1          | object  | The definition of `EntityV3APISpecInterfaceFileRef` object.              |
| Object 1     | fileRef           | string  | The reference to the API definition file.                                |
| interface    | Object 2          | object  | The definition of `EntityV3APISpecInterfaceDefinition` object.           |
| Object 2     | definition        | object  | The API definition.                                                      |
|              | Option 2          | string  | Entity definition in raw JSON or YAML representation.                    |
{% /tab %}

{% tab label="Example" %}
```json
{}
```
{% /tab %}
{% /tabs %}
