require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "type" => "custom_screenboard",
        "id" => "rys-xwq-geh"
    },
    {
        "type" => "custom_timeboard",
        "id" => "qts-q2k-yq6"
    },
    {
        "type" => "integration_screenboard",
        "id" => "87"
    },
    {
        "type" => "integration_timeboard",
        "id" => "23"
    },
    {
        "type" => "host_timeboard",
        "id" => "3245468"
    }
]

result = dog.v2.delete_items_from_dashboard_list(list_id, dashboards)
