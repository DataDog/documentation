from datadog import initialize, api

options = {
	'api_key': '<YOUR_API_KEY>',
	'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Search monitor groups
api.Monitor.search_groups()
