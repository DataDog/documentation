from datadog import initialize, api

options = {
    'api_key': '<DD_API_KEY>',
    'app_key': '<DD_APP_KEY>'
}

initialize(**options)

api.Gcp.create(
    type="service_account",
    project_id="<GCP_PROJECT_ID>",
    private_key_id="<GCP_PRIVATE_KEY_ID>",
    private_key="<GCP_PRIVATE_KEY>",
    client_email="<GCP_CLIENT_EMAIL>",
    client_id="<GCP_CLIENT_ID>",
    auth_uri="<GCP_AUTH_URI>",
    token_uri="<GCP_TOKEN_URI>",
    auth_provider_x509_cert_url="<GCP_AUTH_PROVIDER_X509_CERT_URL>",
    client_x509_cert_url="<GCP_CLIENT_X509_CERT_URL>",
    host_filters="<KEY>:<VALUE>,<KEY>:<VALUE>"
)
