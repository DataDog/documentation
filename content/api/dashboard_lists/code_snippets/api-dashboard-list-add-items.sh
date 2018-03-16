api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff

list_id=4741

curl -X POST -H "Content-type: application/json" \
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
"https://app.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"

