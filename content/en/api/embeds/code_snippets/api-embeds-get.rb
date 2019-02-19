require 'rubygems'
require 'dogapi'

# Initialize API Client
api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Initialize Embed Token / ID
embed_id = "5f585b01c81b12ecdf5f40df0382738d0919170639985d3df5e2fc4232865b0c"

# Get embed with API Call
dog.enable_embed(embed_id)