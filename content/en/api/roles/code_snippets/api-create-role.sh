curl -X POST \
        "https://app.datadoghq.com/api/v2/roles" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
            "data": {
                "type": "roles",
                    "attributes": {
                        "name": <ROLE_NAME>
                    }
            }
        }'