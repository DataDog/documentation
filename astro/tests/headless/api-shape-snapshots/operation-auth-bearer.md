<!-- operation-auth-bearer: /api/latest/rendering-shapes/delete-user/ -->

{% tab label="Curl" %}
```bash
# Path parameters
export user_uuid="CHANGE_ME"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_BEARER_TOKEN="<DD_BEARER_TOKEN>"

curl -X DELETE "https://api.${DD_SITE}/api/v2/scim/Users/${user_uuid}" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}"
```
{% /tab %}
