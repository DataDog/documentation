from datadog import initialize, api

options = {'api_key': '<YOUR_API_KEY>',
           'app_key': '<YOUR_APP_KEY>',
           'api_host': 'https://api.datadoghq.eu` #optional}

initialize(**options)
