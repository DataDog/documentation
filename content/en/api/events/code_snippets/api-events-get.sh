api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

event_id=<EVENT_ID>

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/events/${event_id}"
