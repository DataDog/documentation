#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl --request POST 'https://api.datadoghq.com/api/v2/users' \
--header 'Content-Type: application/json' \
--header "DD-API-KEY: ${api_key}" \
--header "DD-APPLICATION-KEY: ${app_key}" \
--data-raw '{
  "data": {
    "type": "users",
    "relationships": {
      "roles": {
        "data": [
          {
            "type": "roles",
            "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
          }
        ]
      }
    },
    "attributes": {
      "email": "test@datadoghq.com",
      "name": "Test",
      "title": "Test title"
    }
  }
}'
