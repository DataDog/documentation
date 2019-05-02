api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
datadog_org_public_id=<DATADOG_ORG_PUBLIC_ID>

curl -X GET "https://api.datadoghq.com/api/v1/org/${datadog_org_public_id}?api_key=${api_key}&application_key=${app_key}"
