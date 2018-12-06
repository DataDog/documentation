api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

start_hr=$(date -v -10d +%Y-%m-%dT%H)
end_hr=$(date +%Y-%m-%dT%H)

curl -G \
    "https://api.datadoghq.com/api/v1/usage/traces" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "start_hr=${start_hr}" \
    -d "end_hr=${end_hr}"
