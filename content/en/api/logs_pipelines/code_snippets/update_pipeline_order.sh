#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X PUT "https://api.datadoghq.com/api/v1/logs/config/pipeline-order?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json' \
  -d '{
    "pipeline_ids": [
        "<PIPELINE_1_ID>",
        "<PIPELINE_2_ID>",
        "<PIPELINE_3_ID>"
    ]
}'
