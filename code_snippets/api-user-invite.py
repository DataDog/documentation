from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Send invites
api.User.invite(["jack@example.com", "jill@example.com"])
