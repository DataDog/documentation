api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"

curl -POST \
    -d 'graph_json={"requests":[{"q":"avg:system.load.1{*}"}],"viz":"timeseries","events":[]}' \
    -d "timeframe=1_hour" \
    -d "size=medium" \
    -d "legend=yes" \
    "https://api.datadoghq.com/api/v1/graph/embed?api_key=${api_key}&application_key=${app_key}"
