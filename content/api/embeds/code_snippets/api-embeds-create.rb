require 'rubygems'
require 'dogapi'

# Initialize API Client
api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Prepare parameters
graph_json = '{
"requests": [{
    "q": "avg:system.load.1{*}"
}],
"viz": "timeseries",
"events": []
}
'
timeframe = "1_hour"
size = "medium"
legend = "no"
title = "Embed created through API"

# Create parameter hash
description = {:timeframe => timeframe, :size => size, :legend => legend, :title => title
}

# Make API Call
status, result = dog.create_embed(graph_json, description)