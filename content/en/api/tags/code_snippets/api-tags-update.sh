api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
host_name="<YOUR_HOSTNAME>"

curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "tags" : ["environment:production", "role:webserver"]
}' \
"https://api.datadoghq.com/api/v1/tags/hosts/${host_name}"
