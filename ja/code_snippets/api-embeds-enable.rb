require 'rubygems'
require 'dogapi'

# Initialize API Client
api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Initialize Embed Token/ID
embed_id = "5f585b01c81b12ecdf5f40df0382738d0919170639985d3df5e2fc4232865b0c"

# Enable with API Call
dog.enable_embed(embed_id)
