api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
user_uuid="<USER_UUID>"

curl --request GET "https://api.datadoghq.com/api/v2/users/${user_uuid}/permissions" \
--header "DD-API-KEY: ${api_key}" \
--header "DD-APPLICATION-KEY: ${app_key}"
