<!-- operation-auth-none: /api/latest/rendering-shapes/validate-csv-budget/ -->

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com

curl -X POST "https://api.${DD_SITE}/api/v2/cost/budget/csv/validate" \
-H "Accept: application/json"
```
{% /tab %}
