api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

host=YourHostName
source=YourSource

# Find a host to add a tag to
host_name=$(curl -X GET \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "q=hosts:$host" | cut -d'"' -f6 \
    "https://api.datadoghq.com/api/v1/search")

curl  -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "{
      \"tags\" : [\"environment:production\", \"role:webserver\"]
}" \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}?source=${source}"
