<!-- request-multipart: /api/latest/rendering-shapes/upload-idp-metadata/ -->

### Request

#### Body Data (required)

{% tabs %}
{% tab label="Model" %}
| Field    | Type   | Description               |
| -------- | ------ | ------------------------- |
| idp_file | binary | The IdP metadata XML file |
{% /tab %}

{% tab label="Example" %}
```bash
-F 'idp_file=@/path/to/file'
```
{% /tab %}
{% /tabs %}

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X POST "https://api.${DD_SITE}/api/v2/saml_configurations/idp_metadata" \
-H "Accept: application/json" \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-F idp_file=@string
```
{% /tab %}
