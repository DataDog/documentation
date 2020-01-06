api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"

# pass a single hostname as an argument to search for the specified host
host=$1

# Find a host to add a tag to
host_name=$(curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "api_key=${api_key}" \
-d "application_key=${app_key}" \
-d "q=hosts:$host" | cut -d'"' -f6 \
"https://api.datadoghq.com/api/v1/search")

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}"
