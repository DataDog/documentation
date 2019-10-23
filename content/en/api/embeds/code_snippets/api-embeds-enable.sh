api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"
embed_id="5f585b01c81b12ecdf5f40df0382738d0919170639985d3df5e2fc4232865b0c"

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/graph/embed/${embed_id}/enable"

