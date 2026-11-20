<!-- param-ref-with-siblings: /api/latest/rendering-shapes/list-org-group-policies/ -->

### Arguments

#### Query Strings

| Field                             | Type   | Description                                                                                                              |
| --------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| filter[org_group_id] [*required*] | string | Filter policies by org group ID.                                                                                         |
| filter[policy_type]               | enum   | Filter policies by policy type. Supported values are `org_config` and `role`. Allowed enum values: `org_config`, `role`. |

{% tab label="Curl" %}
```bash
# Required query arguments
export filter_org_group_id="a1b2c3d4-e5f6-7890-abcd-ef0123456789"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.${DD_SITE}/api/v2/org_group_policies?filter%5Borg_group_id%5D=${filter_org_group_id}" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
