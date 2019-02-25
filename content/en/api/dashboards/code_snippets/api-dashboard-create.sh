api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl  -X POST -H "Content-type: application/json" \
-d '{
      "title" : "Average Memory Free Shell",
      "widgets" : [{
          "definition": {
              "type": "timeseries",
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "title": "Average Memory Free"
          }
      }],
      "layout_type": "ordered",
      "description" : "A dashboard with memory info.",
      "is_read_only": true,
      "notify_list": ["user@domain.com"],
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "my-host"
      }]
}' \
"https://api.datadoghq.com/api/v1/dashboard?api_key=${api_key}&application_key=${app_key}"
