from datadog import initialize, api

options = {'api_key': '<DATADOG_API_KEY>',
           'app_key': '<DATADOG_APPLICATION_KEY>',
           'api_host': 'https://api.datadoghq.com'}

initialize(**options)
