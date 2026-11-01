<!-- region-servers-override: /api/latest/rendering-shapes/resolve-on-call-page/ -->

| Datadog site      | API endpoint                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| app.datadoghq.com | POST https://navy.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve    |
| us3.datadoghq.com | POST https://teal.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve    |
| us5.datadoghq.com | POST https://coral.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve   |
| app.datadoghq.eu  | POST https://beige.oncall.datadoghq.eu/api/v2/on-call/pages/{page_id}/resolve    |
| ap1.datadoghq.com | POST https://saffron.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve |
| ap2.datadoghq.com | POST https://lava.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve    |
| uk1.datadoghq.com | POST https://scarlet.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve |
| app.ddog-gov.com  | POST https://navy.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve    |
| us2.ddog-gov.com  | POST https://navy.oncall.datadoghq.com/api/v2/on-call/pages/{page_id}/resolve    |

{% tab label="Curl" %}
```bash
# Path parameters
export page_id="15e74b8b-f865-48d0-bcc5-453323ed2c8f"

# Set your Datadog credentials
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

# For sites other than datadoghq.com, replace the host below with: teal.oncall.datadoghq.com (us3.datadoghq.com), coral.oncall.datadoghq.com (us5.datadoghq.com), beige.oncall.datadoghq.eu (datadoghq.eu), saffron.oncall.datadoghq.com (ap1.datadoghq.com), lava.oncall.datadoghq.com (ap2.datadoghq.com), scarlet.oncall.datadoghq.com (uk1.datadoghq.com), navy.oncall.datadoghq.com (ddog-gov.com), navy.oncall.datadoghq.com (us2.ddog-gov.com)
curl -X POST "https://navy.oncall.datadoghq.com/api/v2/on-call/pages/${page_id}/resolve" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
