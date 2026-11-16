<!-- request-required: /api/latest/rendering-shapes/ingest-stix-threat-intelligence/ -->

### Request

#### Body Data (required)

{% tabs %}
{% tab label="Model" %}
| Field             | Type   | Description                                                       |
| ----------------- | ------ | ----------------------------------------------------------------- |
| id [*required*]   | string | The STIX bundle identifier.                                       |
| type [*required*] | enum   | The STIX object type for a bundle. Allowed enum values: `bundle`. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "id": "bundle--11111111-1111-4111-8111-111111111111",
  "type": "bundle"
}
```
{% /tab %}
{% /tabs %}
