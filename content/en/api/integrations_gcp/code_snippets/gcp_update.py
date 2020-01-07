from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.GcpIntegration.update(
    project_id="<GCP_PROJECT_ID>",
    client_email="<GCP_CLIENT_EMAIL>",
    automute=True,
    host_filters="<NEW>:<FILTERS>"
)
