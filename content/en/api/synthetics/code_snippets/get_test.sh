api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
test_id=,your_test_id>

curl "https://api.datadoghq.com/api/v1/synthetics/tests/{test_id}?api_key=${api_key}&application_key=${app_key}"