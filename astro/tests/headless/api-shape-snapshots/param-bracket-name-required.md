<!-- param-bracket-name-required: /api/latest/rendering-shapes/get-service-list/ -->

### Arguments

#### Query Strings

| Field                    | Type   | Description                                                                                       |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------- |
| filter[env] [*required*] | string | Filter services by environment. Can be set to `*` to return all services across all environments. |

{% tab label="Curl" %}
```bash
# Required query arguments
export filter_env="CHANGE_ME"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.${DD_SITE}/api/v2/apm/services?filter%5Benv%5D=${filter_env}" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
