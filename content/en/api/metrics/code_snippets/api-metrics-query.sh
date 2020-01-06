api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
to_time=$(date +%s)
from_time=$(date --date='1 day ago' +%s)

curl -X GET \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    "https://api.datadoghq.com/api/v1/query?&query=avg:system.cpu.user\{*\}by\{host\}&from=${from_time}&to=${to_time}"
