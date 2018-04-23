api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
public_id=axd2s

curl -X GET "https://api.datadoghq.com/api/v1/org/${public_id}?api_key=${api_key}&application_key=${app_key}"
