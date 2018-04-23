api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

# Find a host to remove a tag from
host_name=$(curl -G "https://api.datadoghq.com/api/v1/search" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "q=hosts:" | jq -r '.results.hosts[0]')
# Add tags to the host
curl  -X POST -H "Content-type: application/json" \
-d "{\"tags\" : [\"environment:production\", \"role:webserver\"]}" \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}"


curl -X DELETE "https://api.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}"
