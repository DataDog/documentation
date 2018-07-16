from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Update user
api.User.update('test@datadoghq.com', name='alt name',
                email='test+1@datadoghq.com', access_role='ro')
