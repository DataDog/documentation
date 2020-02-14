api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
public_id=<DD_APP_PUBLIC_ID>

# Upload IdP file using multipart/form-data
curl -X POST \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-F "idp_file=@metadata.xml" \
"https://api.datadoghq.com/api/v1/org/${public_id}/idp_metadata"

# OR

# Upload IdP file using application/xml
curl -X POST \
-H "Content-Type: application/xml" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
--data-binary "@metadata.xml" \
"https://api.datadoghq.com/api/v1/org/${public_id}/idp_metadata"
