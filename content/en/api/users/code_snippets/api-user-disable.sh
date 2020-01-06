api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"
user_id=test@datadoghq.com

curl -X DELETE \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/user/${user_id}"
