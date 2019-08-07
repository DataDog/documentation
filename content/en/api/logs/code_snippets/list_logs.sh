#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X POST \
  "https://api.datadoghq.com/api/v1/logs-queries/list?api_key=${api_key}&application_key=${app_key}" \
  -H 'content-type: application/json' \
  -d '{"query": "service:nginx -@http.method:POST","time": {"from": "now - 1h", "to": "now"}, "sort": "desc", "limit": 50, "startAt": "AAAAAWgN8Xwgr1vKDQAAAABBV2dOOFh3ZzZobm1mWXJFYTR0OA"}'
