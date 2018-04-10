api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
host=YourHostName

# Find a host to add a tag to
host_name=$(curl -G "https://api.datadoghq.com/api/v1/search" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "q=hosts:$host" | cut -d'"' -f6)

curl  -X POST -H "Content-type: application/json" \
-d "{
      \"tags\" : [\"environment:production\", \"role:webserver\"]
    }" \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}"
