api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
public_id=<SYNTHETICS_TEST_PUBLIC_ID>

curl "https://api.datadoghq.com/api/v1/synthetics/tests/${public_id}/results?api_key=${api_key}&application_key=${app_key}"