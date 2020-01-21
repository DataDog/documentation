#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X PUT \
-H 'content-type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
	"index_names": [
    "<INDEX_NAME_2>",
		"<INDEX_NAME_1>"
	]
}' \
"https://api.datadoghq.com/api/v1/logs/config/index-order"
