api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

# pass a single hostname as an argument to search for the specified host
host=$1
 
# Find a host to add a tag to
host_name=$(curl -G "https://api.datadoghq.com/api/v1/search" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
	-d "q=hosts:$host" | cut -d'"' -f6)
 
curl "https://api.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}"
