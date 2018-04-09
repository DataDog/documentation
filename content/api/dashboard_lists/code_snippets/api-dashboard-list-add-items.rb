require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "type" => "custom_screenboard",
        "id" => 1414
    },
    {
        "type" => "custom_timeboard",
        "id" => 5858
    },
    {
        "type" => "integration_screenboard",
        "id" => 67
    },
    {
        "type" => "integration_timeboard",
        "id" => 5
    },
    {
        "type" => "host_timeboard",
        "id" => 123456789
    }
]

result = dog.add_items_to_dashboard_list(list_id, dashboards)