api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

list_id=4741

curl -X PUT -H "Content-type: application/json" \
-d '{
        "dashboards": [
            {
                "type": "custom_screenboard",
                "id": 1414
            },
            {
                "type": "custom_timeboard",
                "id": 5858
            },
            {
                "type": "integration_screenboard",
                "id": 67
            },
            {
                "type": "integration_timeboard",
                "id": 5
            },
            {
                "type": "host_timeboard",
                "id": 123456789
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"

