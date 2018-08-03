from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Create user
api.User.create(handle='test@datadoghq.com', name='test user', access_role='st')
