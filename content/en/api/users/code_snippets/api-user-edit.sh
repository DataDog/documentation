#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
user_id="<USER_ID>"

curl --request PATCH "https://api.datadoghq.com/api/v2/users/${user_id}" \
--header 'Content-Type: application/json' \
--header "DD-API-KEY: ${api_key}" \
--header "DD-APPLICATION-KEY: ${app_key}" \
--data-raw '{
  "data": {
    "attributes": {
      "disabled": false,
      "email": "<USER_EMAIL>",
      "name": "<USER_NAME>"
    },
    "type": "users",
    "id": "<USER_ID>"
  }
}'