curl -X POST \
         "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/users" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data": {
                 "type": "users",
                 "id": <USER_UUID>
             }
         }'