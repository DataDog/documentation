api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"
user_id=test@datadoghq.com

curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"email":"test+1@datadoghq.com","name":"alt user", "access_role":"ro"}' \
"https://api.datadoghq.com/api/v1/user/${user_id}"
