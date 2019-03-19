#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X POST https://app.datadoghq.com/api/v1/logs-queries/list?api_key=${api_key}&application_key=${app_key}
     -H "Content-Type: application/json" \
     -d '{query: "service:nginx query -method:POST Windows",time: {offset: -3600, from: "2001-01-01 12:00:00", to: "2001-01-01 14:00:00"} sort: "desc", limit: 50}'
