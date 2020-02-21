#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

test_id="<SYNTHETICS_TEST_PUBLIC_ID>"

curl -X PUT \
-H "Content-type: application/json" \
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
   "message": "test-edited",
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
"https://api.datadoghq.com/api/v1/synthetics/tests/${test_id}"
