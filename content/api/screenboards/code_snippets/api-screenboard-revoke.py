from datadog import initialize, api


options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Share it
api.Screenboard.share(812)

# Revoke the sharing
api.Screenboard.revoke(812)
