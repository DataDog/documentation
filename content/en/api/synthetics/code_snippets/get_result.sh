api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
test_id=<TEST_ID>
result_id=<TEST_RESULT_ID>

curl "https://api.datadoghq.com/api/v1/synthetics/tests/${test_id}/results/${result_id}?api_key=${api_key}&application_key=${app_key}"