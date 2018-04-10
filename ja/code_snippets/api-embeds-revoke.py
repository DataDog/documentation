from datadog import initialize, api

# Intialize request parameters including API/APP key
options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Set Embed ID (token)
embed_id = "5f585b01c81b12ecdf5f40df0382738d0919170639985d3df5e2fc4232865b0c"

# Call Embed API function
api.Embed.revoke(embed_id)
