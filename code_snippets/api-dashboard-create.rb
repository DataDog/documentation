require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Create a timeboard.
title = 'My First Metrics'
description = 'And they are marvelous.'
graphs = [{
  "definition" => {
    "events" => [],
    "requests "=> [
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
