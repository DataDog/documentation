<!-- operation-oauth-scopes: /api/latest/rendering-shapes/delete-status-page/ -->

### Overview

Deletes a status page by its ID.

This endpoint requires the `status_pages_settings_write` permission.

OAuth apps require the `status_pages_settings_write` authorization [scope](https://docs.datadoghq.com/api/latest/scopes.md#rendering-shapes) to access this endpoint.

{% tab label="Curl" %}
```bash
# Path parameters
export page_id="1234abcd-12ab-34cd-56ef-123456abcdef"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
# Use a Personal Access Token or Service Access Token
export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"

curl -X DELETE "https://api.${DD_SITE}/api/v2/statuspages/${page_id}" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}"
```
{% /tab %}
