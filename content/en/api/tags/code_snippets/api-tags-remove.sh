api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

# Find a host to remove a tag from
host_name=$(curl -X GET \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "q=hosts:" | jq -r '.results.hosts[0]' \
    "https://api.datadoghq.com/api/v1/search")

# Add tags to the host
curl  -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "{\"tags\" : [\"environment:production\", \"role:webserver\"]}" \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}"

curl -X DELETE \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}"
