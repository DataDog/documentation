#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X PUT \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "pipeline_ids": [
        "<PIPELINE_1_ID>",
        "<PIPELINE_2_ID>",
        "<PIPELINE_3_ID>"
    ]
}' \
"https://api.datadoghq.com/api/v1/logs/config/pipeline-order"
