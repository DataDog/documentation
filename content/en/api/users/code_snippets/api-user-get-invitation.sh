api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
user_invitation_uuid="<USER_INVITATION_UUID>"

curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{}' \
"https://api.datadoghq.com/api/v2/user_invitations/${user_invitation_uuid}"
