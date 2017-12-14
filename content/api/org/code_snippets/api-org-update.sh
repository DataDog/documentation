api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
public_id=axd2s

curl -X PUT -H "Content-type: application/json" \
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
    "https://app.datadoghq.com/api/v1/org/${public_id}?api_key=${api_key}&application_key=${app_key}"
