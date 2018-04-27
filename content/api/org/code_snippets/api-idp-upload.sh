api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
public_id=axd2s

curl -X POST -H "Content-Type: multipart/form-data" -F "idp_file=@metadata.xml" \
"https://api.datadoghq.com/api/v1/org/${public_id}/idp_metadata?api_key=${api_key}&application_key=${app_key}"
