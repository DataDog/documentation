from datadog import initialize, api

options = {
    'api_key': '<DD_API_KEY>',
    'app_key': '<DD_APP_KEY>'
}

initialize(**options)

api.Azure.update(
    tenant_name="<EXISTING_AZURE_TENANT_NAME>",
    new_tenant_name="<NEW_AZURE_TENANT_NAME>",
    host_filters="new:filters",
    client_id="<EXISTING_AZURE_CLIENT_ID>",
    new_client_id="<NEW_AZURE_CLIENT_ID>",
    client_secret="<EXISTING_CLIENT_SECRET>"
)
