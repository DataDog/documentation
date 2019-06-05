api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

list_id=4741

curl -X GET \
"https://api.datadoghq.com/api/v2/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"
