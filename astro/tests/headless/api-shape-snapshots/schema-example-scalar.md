<!-- schema-example-scalar: /api/latest/rendering-shapes/submit-a-service-check/ -->

### Request

#### Body Data (required)

Service Check request body.

{% tabs %}
{% tab label="Model" %}
| Field                  | Type     | Description                                                                                                                                        |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| check [*required*]     | string   | The check.                                                                                                                                         |
| host_name [*required*] | string   | The host name correlated with the check.                                                                                                           |
| message                | string   | Message containing check status.                                                                                                                   |
| status [*required*]    | enum     | The status of a service check. Set to `0` for OK, `1` for warning, `2` for critical, and `3` for unknown. Allowed enum values: `0`, `1`, `2`, `3`. |
| tags [*required*]      | [string] | Tags related to a check.                                                                                                                           |
| timestamp              | int64    | Time of check.                                                                                                                                     |
{% /tab %}

{% tab label="Example" %}
```json
{
  "check": "app.ok",
  "host_name": "app.host1",
  "message": "app is running",
  "status": 0,
  "tags": [
    "environment:test"
  ],
  "timestamp": "integer"
}
```
{% /tab %}
{% /tabs %}
