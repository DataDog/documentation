currenttime=$(date +%s)

curl  -X POST -H "Content-type: application/json" \
-d "{
      \"check\": \"app.is_ok\",
      \"host_name\": \"app1\",
      \"timestamp\": $currenttime,
      \"status\": 0,
      \"tags\": [\"env:test\"]
}" \
"https://api.datadoghq.com/api/v1/check_run?api_key=<YOUR_API_KEY>"
