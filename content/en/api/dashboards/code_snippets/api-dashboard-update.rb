require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dashboard_id = '<DASHBOARD_ID>'

title = 'Sum of Memory Free'
widgets = [{
    'definition': {
        'type' => 'timeseries',
        'requests' => [
            {'q' => 'sum:system.mem.free{*}'}
        ],
        'title' => 'Sum Memory Free Shell'
    }
}]
layout_type = 'ordered'
description = 'An updated dashboard with memory info.'
is_read_only = true
notify_list = ['user@domain.com']
template_variables = [{
    'name' => 'host1',
    'prefix' => 'host',
    'default' => 'my-host'
}]

saved_view = [{
  'name': 'Saved views for hostname 2',
  'template_variables': [{'name': 'host', 'value': '<HOSTNAME_2>'}]}
  ]

dog.update_board(dashboard_id, title, widgets, layout_type, {
    'description' => description,
    'is_read_only' => is_read_only,
    'notify_list' => notify_list,
    'template_variables' => template_variables,
    'template_variable_presets' => saved_view
    })
