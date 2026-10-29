<!-- param-required-query: /api/latest/rendering-shapes/get-the-list-of-interfaces-of-the-device/ -->

### Arguments

#### Query Strings

| Field                  | Type    | Description                                        |
| ---------------------- | ------- | -------------------------------------------------- |
| device_id [*required*] | string  | The ID of the device to get interfaces from.       |
| get_ip_addresses       | boolean | Whether to get the IP addresses of the interfaces. |

{% tab label="Curl" %}
```bash
# Required query arguments
export device_id="example:1.2.3.4"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.${DD_SITE}/api/v2/ndm/interfaces?device_id=${device_id}" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
