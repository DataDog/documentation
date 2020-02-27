api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

start=$(date +%s)
end=$(date -v+3H +%s)
end_recurrence=$(date -v+21d +%s)

curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "scope": "env:prod",
      "start": '"${start}"',
      "end": '"${end}"',
      "recurrence": {
        "type": "weeks",
        "period": 1,
        "week_days": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "until_date": '"${end_recurrence}"'
      }
}' \
    "https://api.datadoghq.com/api/v1/downtime"

# OR use RRULE reccurence

-d '{
      "scope": "env:prod",
      "start": '"${start}"',
      "end": '"${end}"',
      "recurrence": {
        "type": "rrule",
        "rrule": "FREQ=MONTHLY;BYSETPOS=3;BYDAY=WE;INTERVAL=1"
      }
}' \
    "https://api.datadoghq.com/api/v1/downtime"
