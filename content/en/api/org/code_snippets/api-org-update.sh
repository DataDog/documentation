api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
public_id=axd2s

curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "settings": {
            "saml": {
                "enabled": true
            },
            "saml_strict_mode": {
                "enabled": true
            },
            "saml_idp_initiated_login": {
                "enabled": true
            },
            "saml_autocreate_users_domains": {
                "enabled": true,
                "domains": [
                    "my-org.com",
                    "example.com"
                ]
            }
        }
}' \
"https://api.datadoghq.com/api/v1/org/${public_id}"
