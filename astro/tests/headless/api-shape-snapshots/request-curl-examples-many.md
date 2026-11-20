<!-- request-curl-examples-many: /api/latest/rendering-shapes/send-logs/ -->

{% tab label="Curl" %}
```bash
## default

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X POST "https://api.${DD_SITE}/api/v2/logs" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
{
  "message": "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World",
  "service": "payment"
}
EOF

## Multi JSON Messages
# Pass multiple log objects at once.

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X POST "https://api.${DD_SITE}/api/v2/logs" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
[
  {
    "message": "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello",
    "service": "payment"
  },
  {
    "message": "2019-11-19T14:37:58,995 INFO [process.name][20081] World",
    "service": "payment"
  }
]
EOF

## Simple JSON Message
# Log attributes can be passed as `key:value` pairs in valid JSON messages.

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X POST "https://api.${DD_SITE}/api/v2/logs" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
{
  "message": "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World",
  "service": "payment"
}
EOF
```
{% /tab %}
