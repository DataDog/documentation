api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
to_time=$(date +%s)
from_time=$(date -v -1d +%s)

curl -G \
    "https://api.datadoghq.com/api/v1/query" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "from=${from_time}" \
    -d "to=${to_time}" \
    -d "query=system.cpu.idle{*}by{host}"
