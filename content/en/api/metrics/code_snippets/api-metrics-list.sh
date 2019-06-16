api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

from_time=$(date -v -1d +%s)

curl -G \
    "https://api.datadoghq.com/api/v1/metrics" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "from=${from_time}" \
    -d "host=<HOSTNAME>"
