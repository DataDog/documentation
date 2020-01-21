from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.AzureIntegration.create(
    tenant_name="<AZURE_TENANT_NAME>",
    host_filters="<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>",
    client_id="<AZURE_CLIENT_ID>",
    client_secret="<AZURE_CLIENT_SECRET>"
)
