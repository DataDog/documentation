api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"

list_id=4741

curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "dashboards": [
            {
                "type": "custom_screenboard",
                "id": "rys-xwq-geh"
            },
            {
                "type": "custom_timeboard",
                "id": "qts-q2k-yq6"
            },
            {
                "type": "integration_screenboard",
                "id": "87"
            },
            {
                "type": "integration_timeboard",
                "id": "23"
            },
            {
                "type": "host_timeboard",
                "id": "3245468"
            }
        ]
}' \
"https://api.datadoghq.com/api/v2/dashboard/lists/manual/${list_id}/dashboards"
