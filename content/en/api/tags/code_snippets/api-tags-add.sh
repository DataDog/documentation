api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

host_name= "<HOSTNAME>"

curl  -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "{
      \"tags\" : [\"environment:production\", \"role:webserver\"]
}" \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}"
