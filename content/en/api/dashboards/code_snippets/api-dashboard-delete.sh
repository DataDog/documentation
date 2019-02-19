api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
dashboard_id="<DASHBOARD_ID>"

curl -X DELETE "https://api.datadoghq.com/api/v1/dashboard/${dashboard_id}?api_key=${api_key}&application_key=${app_key}"
