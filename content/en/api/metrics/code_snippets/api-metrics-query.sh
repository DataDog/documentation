api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
to_time=$(date +%s)
from_time=$(date -v -1d +%s)

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "from=${from_time}" \
-d "to=${to_time}" \
-d "query=system.cpu.idle{*}by{host}" \
"https://api.datadoghq.com/api/v1/query"
