#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X GET "https://api.datadoghq.com/api/v1/integration/aws/logs?api_key=${api_key}&application_key=${app_key}"
