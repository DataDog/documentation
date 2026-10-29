<!-- request-curl-examples-one: /api/latest/rendering-shapes/save-new-value-for-on-demand-concurrency-cap/ -->

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X POST "https://api.${DD_SITE}/api/v2/synthetics/settings/on_demand_concurrency_cap" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
{
  "on_demand_concurrency_cap": 20
}
EOF
```
{% /tab %}
