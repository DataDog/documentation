require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Update a timeboard
dash_id = '2551'
title = 'New and Improved Timeboard'
description = 'This has all the new hotness.'
graphs =  [{
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
}],
read_only = true

dog.update_dashboard(dash_id, title, description, graphs, template_variables, read_only)
