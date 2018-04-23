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
"https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}&run_check=true"

curl -v -X PUT -H "Content-type: application/json" \
-d '{
    "hooks": [
      {
        "name": "anotherone",
        "url": "http://requestb.in/v1srg7v1"
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}&run_check=true"

curl -v "https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}"

curl -v -X DELETE "https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}"
