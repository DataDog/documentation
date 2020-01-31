api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl --request POST 'https://api.datadoghq.com/v2/user_invitations' \
--header "DD-API-KEY: ${api_key}" \
--header "DD-APPLICATION-KEY: ${app_key}"
--header 'Content-Type: application/json' \
--data-raw '{
  "data": [
    {
      "type": "user_invitations",
      "relationships": {
        "user": {
          "data": {
            "type": "users",
            "id": "00000000-0000-0000-0000-000000000000"
          }
        }
      },
      "attributes": {
        "login_method": "string"
      }
    }
  ]
}'