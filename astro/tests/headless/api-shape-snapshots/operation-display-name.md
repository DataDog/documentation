<!-- operation-display-name: /api/latest/rendering-shapes/delete-a-case-type/ -->

# Delete a work item type

## v2 (latest)

{% tab label="Curl" %}
```bash
# Path parameters
export case_type_id="f98a5a5b-e0ff-45d4-b2f5-afe6e74de505"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X DELETE "https://api.${DD_SITE}/api/v2/cases/types/${case_type_id}" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
