api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"
event_id=1377281704830403917

# Create an event to get
event_id=$(curl  -X POST -H "Content-type: application/json" -d "{\"title\": \"Did you hear the news today?\"}" "https://api.datadoghq.com/api/v1/events?api_key="<YOUR_API_KEY>"" | jq -r '.event.url|ltrimstr("https://app.datadoghq.com/event/event?id=")')
sleep 5

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/events/${event_id}"
