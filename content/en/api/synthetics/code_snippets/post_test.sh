#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

### To create an API test

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
   "config":{
      "assertions":[
         {
            "operator":"is",
            "type":"statusCode",
            "target":403
         },
         {
            "operator":"is",
            "property":"content-type",
            "type":"header",
            "target":"text/html"
         },
         {
            "operator":"lessThan",
            "type":"responseTime",
            "target":2000
         }
      ],
      "request":{
         "method":"GET",
         "url":"https://datadoghq.com",
         "timeout":30,
         "headers":{
            "header1":"value1",
            "header2":"value2"
         },
         "body":"body to send with the request"
      }
   },
   "locations":[
      "aws:us-east-2",
      "aws:eu-central-1",
      "aws:ca-central-1",
      "aws:eu-west-2",
      "aws:ap-northeast-1",
      "aws:us-west-2",
      "aws:ap-southeast-2"
   ],
   "message":"test",
   "name":"Test",
   "options":{
      "tick_every":60,
      "min_failure_duration":0,
      "min_location_failed":1,
      "follow_redirects":true
   },
   "tags":[
      "foo:bar"
   ],
   "type":"api"
}' \
"https://api.datadoghq.com/api/v1/synthetics/tests"

### To create a browser test

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl  -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
   "locations":[
      "aws:ca-central-1",
      "aws:us-east-2"
   ],
   "options":{
      "device_ids":[
         "laptop_large"
      ],
      "tick_every":3600,
      "min_failure_duration":0,
      "min_location_failed":1,
      "monitor_options": {
         "renotify_interval": 30
      },
      "retry": {
        "count": 2,
        "interval": 30
      }
   },
   "name":"Test Doc",
   "config":{
      "assertions":[

      ],
      "request":{
         "method":"GET",
         "url":"https://example.com/"
      }
   },
   "message":"Test message",
   "tags":[

   ],
   "type":"browser"
}' \
"https://api.datadoghq.com/api/v1/synthetics/tests"
