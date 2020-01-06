

curl  -X POST -H "Content-type: application/json" \
-d '{
      "title": "Did you hear the news today?",
      "text": "Oh boy!",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}' \
"https://api.datadoghq.com/api/v1/events?api_key="<YOUR_API_KEY>""
