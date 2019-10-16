require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# search with a list of IDs
slo_ids = ["<YOUR_SLO_ID>", "<YOUR_SLO_ID>"]

api.search_service_level_objective(:slo_ids => slo_ids, :offset => 0)

# search with a query
query = "tags:app:frontend"

dog.search_service_level_objective(:query => query, :offset => 0)
