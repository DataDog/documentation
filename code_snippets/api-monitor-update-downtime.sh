api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
downtime_id=4336

curl -X PUT -H "Content-type: application/json" \
-d '{
      "scope": "env:staging",
      "message": "Doing some testing on staging"
    }' \
    "https://app.datadoghq.com/api/v1/downtime/${downtime_id}?api_key=${api_key}&application_key=${app_key}"
