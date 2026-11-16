<!-- param-location-path: /api/latest/rendering-shapes/delete-an-application-key-for-this-service-account/ -->

### Arguments

#### Path Parameters

| Field                           | Type   | Description                    |
| ------------------------------- | ------ | ------------------------------ |
| service_account_id [*required*] | string | The ID of the service account. |
| app_key_id [*required*]         | string | The ID of the application key. |

{% tab label="Curl" %}
```bash
# Path parameters
export service_account_id="00000000-0000-1234-0000-000000000000"
export app_key_id="CHANGE_ME"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X DELETE "https://api.${DD_SITE}/api/v2/service_accounts/${service_account_id}/application_keys/${app_key_id}" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
