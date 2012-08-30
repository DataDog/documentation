curl  -X POST -H "Content-type: application/json" \
-d '{
      "title": "Did you hear the news today?"
      "text": "Oh boy!",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
  }' \
'https://app.datadoghq.com/api/v1/events?api_key=9775a026f1ca7d1c6c5af9d94d9595a4'
