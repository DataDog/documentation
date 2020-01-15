require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Search with a list of IDs
slo_ids = ['<YOUR_SLO_ID>']
dog.search_service_level_objective(slo_ids: slo_ids, offset: 0)

# Search with a query
query = 'tags:app:frontend'
dog.search_service_level_objective(query: query, offset: 0)
