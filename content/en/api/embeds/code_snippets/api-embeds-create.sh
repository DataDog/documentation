api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d 'graph_json={"requests":[{"q":"avg:system.load.1{*}"}],"viz":"timeseries","events":[]}' \
-d "timeframe=1_hour" \
-d "size=medium" \
-d "legend=yes" \
"https://api.datadoghq.com/api/v1/graph/embed"
