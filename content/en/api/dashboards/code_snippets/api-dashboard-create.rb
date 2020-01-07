require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Create a dashboard.
title = 'Average Memory Free Shell'
widgets = [{
    'definition': {
        'type' => 'timeseries',
        'requests' => [
            {'q' => 'avg:system.mem.free{*}'}
        ],
        'title' => 'Average Memory Free'
    }
}]
layout_type = 'ordered'
description = 'A dashboard with memory info.'
is_read_only = true
notify_list = ['user@domain.com']
template_variables = [{
    'name' => 'host1',
    'prefix' => 'host',
    'default' => 'my-host'
}]

dog.create_board(title, widgets, layout_type, {
    'description' => description,
    'is_read_only' => is_read_only,
    'notify_list' => notify_list,
    'template_variables' => template_variables
    })
