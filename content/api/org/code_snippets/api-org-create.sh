api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST -H "Content-type: application/json" \
    -d '{
        "name" :"My Org",
        "subscription" :{"type":"pro"},
        "billing" :{"type":"parent_billing"}
}' \
    "https://api.datadoghq.com/api/v1/org?api_key=${api_key}&application_key=${app_key}"
