api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
user_id="<USER_ID>"

curl --request GET "https://api.datadoghq.com/api/v2/users/${user_id}/orgs" \
--header "DD-API-KEY: ${api_key}" \
--header "DD-APPLICATION-KEY: ${app_key}"
