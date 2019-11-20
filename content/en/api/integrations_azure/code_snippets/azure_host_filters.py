from datadog import initialize, api

options = {
    'api_key': '<DD_API_KEY>',
    'app_key': '<DD_APP_KEY>'
}

initialize(**options)

api.AzureIntegration.update_host_filters(
    tenant_name="<AZURE_TENANT_NAME>",
    host_filters="new:filters",
    client_id="<AZURE_CLIENT_ID>"
)
