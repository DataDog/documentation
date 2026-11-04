<!-- param-location-header: /api/latest/rendering-shapes/get-the-evidence-for-an-ownership-inference/ -->

### Arguments

#### Path Parameters

| Field                    | Type   | Description                                                                                                          |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------- |
| resource_id [*required*] | string | The identifier of the resource to retrieve evidence for.                                                             |
| owner_type [*required*]  | enum   | The owner type of the inference to retrieve evidence for. Allowed enum values: `user`, `team`, `service`, `unknown`. |

#### Header Parameters

| Field         | Type   | Description                                                                                                                       |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| If-None-Match | string | A previously returned weak `ETag` value. When supplied and the evidence has not changed, the endpoint returns `304 Not Modified`. |

{% tab label="Curl" %}
```bash
# Path parameters
export resource_id="test-resource"
export owner_type="team"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.${DD_SITE}/api/v2/csm/ownership/${resource_id}/${owner_type}/evidence" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
