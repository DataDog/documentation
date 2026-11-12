<!-- region-servers-subdomain: /api/latest/rendering-shapes/list-ip-ranges/ -->

| Datadog site      | API endpoint                             |
| ----------------- | ---------------------------------------- |
| app.datadoghq.com | GET https://ip-ranges.datadoghq.com/     |
| us3.datadoghq.com | GET https://ip-ranges.us3.datadoghq.com/ |
| us5.datadoghq.com | GET https://ip-ranges.us5.datadoghq.com/ |
| app.datadoghq.eu  | GET https://ip-ranges.datadoghq.eu/      |
| ap1.datadoghq.com | GET https://ip-ranges.ap1.datadoghq.com/ |
| ap2.datadoghq.com | GET https://ip-ranges.ap2.datadoghq.com/ |
| uk1.datadoghq.com | GET https://ip-ranges.uk1.datadoghq.com/ |
| app.ddog-gov.com  | GET https://ip-ranges.ddog-gov.com/      |
| us2.ddog-gov.com  | GET https://ip-ranges.us2.ddog-gov.com/  |

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, uk1.datadoghq.com, ddog-gov.com, us2.ddog-gov.com

curl -X GET "https://ip-ranges.${DD_SITE}/" \
-H "Accept: application/json"
```
{% /tab %}
