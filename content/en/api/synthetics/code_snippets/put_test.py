from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

test_id='<SYNTHETICS_TEST_PUBLIC_ID>'

# To create an API test

name = "test"
api_test_type = "api"
api_config = {
  "assertions": [
            {"operator": "is", "type": "statusCode", "target": 403},
            {"operator": "is", "property": "content-type", "type": "header", "target": "text/html"},
            {"operator": "lessThan", "type": "responseTime", "target": 2000}
         ], 
  "request": {"method": "GET", "url": "https://datadoghq.com", "timeout": 30, "headers": {"header1": "value1", "header2": "value2"}}
}
message = "test-edited"
api_test_options = {"tick_every": 60, "min_failure_duration": 0,
    "min_location_failed": 1, "follow_redirects": True}
locations = ["aws:us-east-2", "aws:eu-central-1", "aws:ca-central-1",
    "aws:eu-west-2", "aws:ap-northeast-1", "aws:us-west-2", "aws:ap-southeast-2"]
tags = ["foo:bar"]


api.Synthetics.edit_test(id=test_id, name=name, type=api_test_type, config=api_config, options=api_test_options,
                           message=message, locations=locations, tags=tags)
