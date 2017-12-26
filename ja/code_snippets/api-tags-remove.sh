api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff

# Find a host to remove a tag from
host_name=$(curl -G "https://app.datadoghq.com/api/v1/search" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "q=hosts:" | jq -r '.results.hosts[0]')
# Add tags to the host
curl  -X POST -H "Content-type: application/json" \
-d "{\"tags\" : [\"environment:production\", \"role:webserver\"]}" \
"https://app.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}"


curl -X DELETE "https://app.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}"
