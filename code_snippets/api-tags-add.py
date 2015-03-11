from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

api.Tag.create('hostname', ['role:webserver', 'env:production'])
