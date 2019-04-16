api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
test_id=<your_test id>

curl "https://api.datadoghq.com/api/v1/synthetics/tests/{test_id}/results?api_key=${api_key}&application_key=${app_key}"