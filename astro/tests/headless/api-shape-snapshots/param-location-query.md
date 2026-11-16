<!-- param-location-query: /api/latest/rendering-shapes/get-the-list-of-devices/ -->

### Arguments

#### Query Strings

| Field       | Type   | Description                                                                                                                                     |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| sort        | string | The field to sort devices by. Defaults to `name`. Prefix the field with `-` to sort in descending order, for example, `-name`. Default: `name`. |
| filter[tag] | string | Filter devices by tag.                                                                                                                          |

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.${DD_SITE}/api/v2/ndm/devices" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
