<!-- request-multiple-content-types: /api/latest/rendering-shapes/send-logs/ -->

### Request

#### Body Data (required)

Log to send (JSON format).

{% tabs %}
{% tab label="Model" %}
| Field                | Type   | Description                                                       |
| -------------------- | ------ | ----------------------------------------------------------------- |
| message [*required*] | string | The message of your log.                                          |
| service              | string | The name of the application or service generating the log events. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "message": "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World",
  "service": "payment"
}
```
{% /tab %}
{% /tabs %}
