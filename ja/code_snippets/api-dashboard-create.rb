require 'rubygems'
require 'dogapi'

api_key='<YOUR_API_KEY>'
app_key='<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Create a timeboard.
title = 'My First Metrics'
description = 'And they are marvelous.'
graphs = [{
  "definition" => {
    "events" => [],
    "requests"=> [
      {"q" => "avg:system.mem.free{*}"}
    ],
  "viz" => "timeseries"
  },
  "title" => "Average Memory Free"
}]
template_variables = [{
	"name" => "host1",
	"prefix" => "host",
	"default" => "host:my-host"
}]

dog.create_dashboard(title, description, graphs, template_variables)
