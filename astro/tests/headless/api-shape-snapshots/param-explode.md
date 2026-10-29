<!-- param-explode: /api/latest/rendering-shapes/get-rows-by-id/ -->

### Arguments

#### Path Parameters

| Field           | Type   | Description                                               |
| --------------- | ------ | --------------------------------------------------------- |
| id [*required*] | string | Unique identifier of the reference table to get rows from |

#### Query Strings

| Field               | Type  | Description                                                                |
| ------------------- | ----- | -------------------------------------------------------------------------- |
| row_id [*required*] | array | List of row IDs (primary key values) to retrieve from the reference table. |

{% tab label="Curl" %}
```bash
# Path parameters
export id="table-123"
# Required query arguments
export row_id_0="row_id_0"
export row_id_1="row_id_1"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.${DD_SITE}/api/v2/reference-tables/tables/${id}/rows?row_id=${row_id_0}&row_id=${row_id_1}" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
