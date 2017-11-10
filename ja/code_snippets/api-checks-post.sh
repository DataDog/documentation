currenttime=$(date +%s)
curl  -X POST -H "Content-type: application/json" \
-d "{
      \"check\": \"app.is_ok\",
      \"host_name\": \"app1\",
      \"timestamp\": $currenttime,
      \"status\": 0
  }" \
'https://app.datadoghq.com/api/v1/check_run?api_key=9775a026f1ca7d1c6c5af9d94d9595a4'
