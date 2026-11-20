<!-- operation-method: /api/latest/rendering-shapes/delete-a-rum-application/ -->

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | DELETE https://api.datadoghq.com/api/v2/rum/applications/{id}     |
| us3.datadoghq.com | DELETE https://api.us3.datadoghq.com/api/v2/rum/applications/{id} |
| us5.datadoghq.com | DELETE https://api.us5.datadoghq.com/api/v2/rum/applications/{id} |
| app.datadoghq.eu  | DELETE https://api.datadoghq.eu/api/v2/rum/applications/{id}      |
| ap1.datadoghq.com | DELETE https://api.ap1.datadoghq.com/api/v2/rum/applications/{id} |
| ap2.datadoghq.com | DELETE https://api.ap2.datadoghq.com/api/v2/rum/applications/{id} |
| app.ddog-gov.com  | DELETE https://api.ddog-gov.com/api/v2/rum/applications/{id}      |
| uk1.datadoghq.com | DELETE Not supported in the UK1 region                            |
| us2.ddog-gov.com  | DELETE Not supported in the US2-FED region                        |

{% tab label="Curl" %}
```bash
# Path parameters
export id="CHANGE_ME"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X DELETE "https://api.${DD_SITE}/api/v2/rum/applications/${id}" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}
