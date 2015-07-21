api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
# pass a single hostname as an argument to search for the specified host
query=$1

# used to determine if jq is installed on the current host
Findjq="$(which jq)"

# Determine if jq is installed
if [ ! -z $Findjq ]; then
# Find a host to add a tag to and parse using jq
    host_name=$(curl -s -G "https://app.datadoghq.com/api/v1/search" \
        -d "api_key=${api_key}" \
        -d "application_key=${app_key}" \
        -d "q=hosts:$query" | jq -r '.results.hosts[0]')

    curl -s "https://app.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}" | jq .
else
    # if jq is not installed on the host, parse output using cut 
    host_name=$(curl -s -G "https://app.datadoghq.com/api/v1/search" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "q=hosts:$query" | cut -d'"' -f6)

    curl -s "https://app.datadoghq.com/api/v1/tags/hosts/${host_name}?api_key=${api_key}&application_key=${app_key}"
