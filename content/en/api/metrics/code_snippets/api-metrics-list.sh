api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"

from_time=$((date +%s - 86400))

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "from=${from_time}" \
-d "host=<HOSTNAME>" \
"https://api.datadoghq.com/api/v1/metrics"
