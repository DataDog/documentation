require 'rubygems'
require 'dogapi'

api_key='<YOUR_API_KEY>'
app_key='<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Search by `host` facet.
dog.search("hosts:database")

# Search by `metric` facet.
dog.search("metrics:system")

# Search all facets.
dog.search("test")
