api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
user_handle="<USER_HANDLE>"

curl --request GET "https://api.datadoghq.com/api/v2/users/${user_handle}/application_keys" \
--header "DD-API-KEY: ${api_key}" \
--header "DD-APPLICATION-KEY: ${app_key}"
