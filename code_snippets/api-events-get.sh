api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
event_id=1377281704830403917

# Create an event to get
event_id=$(curl  -X POST -H "Content-type: application/json" -d "{\"title\": \"Did you hear the news today?\"}" "https://app.datadoghq.com/api/v1/events?api_key=9775a026f1ca7d1c6c5af9d94d9595a4" | jq -r '.event.url|ltrimstr("https://app.datadoghq.com/event/event?id=")')
sleep 5

curl "https://app.datadoghq.com/api/v1/events/${event_id}?api_key=${api_key}&application_key=${app_key}"
