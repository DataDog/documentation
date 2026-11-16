<!-- request-json-variant: /api/latest/rendering-shapes/submit-distribution-points/ -->

### Request

#### Body Data (required)

{% tabs %}
{% tab label="Model" %}
| Parent field | Field               | Type     | Description                                                       |
| ------------ | ------------------- | -------- | ----------------------------------------------------------------- |
|              | series [*required*] | [object] | A list of distribution points series to submit to Datadog.        |
| series       | host                | string   | The name of the host that produced the distribution point metric. |
| series       | metric [*required*] | string   | The name of the distribution points metric.                       |
{% /tab %}

{% tab label="Example" %}
```json
{
  "series": [
    {
      "host": "test.example.com",
      "metric": "system.load.1"
    }
  ]
}
```
{% /tab %}
{% /tabs %}

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X POST "https://api.${DD_SITE}/api/v1/distribution_points" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
{
  "series": [
    {
      "host": "test.example.com",
      "metric": "system.load.1"
    }
  ]
}
EOF
```
{% /tab %}
