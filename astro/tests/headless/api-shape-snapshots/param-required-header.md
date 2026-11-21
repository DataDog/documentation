<!-- param-required-header: /api/latest/rendering-shapes/ingest-stix-threat-intelligence/ -->

### Arguments

#### Header Parameters

| Field                  | Type   | Description                                                                                                                                                                                                                   |
| ---------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ti_vendor [*required*] | string | Vendor identifier for the feed. The value must not exceed 10 characters. Datadog normalizes the accepted value to lowercase, converts non-alphanumeric characters to underscores, and trims leading and trailing underscores. |
| Content-Encoding       | enum   | Content encoding for the request body. Use gzip for a compressed STIX bundle. Allowed enum values: `gzip`.                                                                                                                    |

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X POST "https://api.${DD_SITE}/api/v2/security/threat-intel/stix" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "ti_vendor: acme" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
{
  "id": "bundle--11111111-1111-4111-8111-111111111111",
  "type": "bundle"
}
EOF
```
{% /tab %}
