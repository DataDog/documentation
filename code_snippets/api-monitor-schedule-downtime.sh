api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff

start=$(date +%s)
end=$(date -v+3H +%s)
end_recurrence=$(date -v+21d +%s)

curl -X POST -H "Content-type: application/json" \
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
    "https://app.datadoghq.com/api/v1/downtime?api_key=${api_key}&application_key=${app_key}"
