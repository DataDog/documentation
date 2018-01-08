curl -v -X POST -H "Content-type: application/json" \
-d '{
    "hooks": [
      {
        "name": "somehook",
        "url": "http://requestb.in/v1srg7v1",
        "use_custom_payload": "false",
        "custom_payload": "",
        "encode_as_form": "false",
        "headers": ""
      }
    ]
  }' \
"https://app.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}&run_check=true" | python -mjson.tool

curl -v -X PUT -H "Content-type: application/json" \
-d '{
    "hooks": [
      {
        "name": "anotherone",
        "url": "http://requestb.in/v1srg7v1"
      }
    ]
  }' \
"https://app.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}&run_check=true" | python -mjson.tool

curl -v "https://app.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}" | python -mjson.tool

curl -v -X DELETE "https://app.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}" | python -mjson.tool
