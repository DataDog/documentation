api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
dashboard_id="<DASHBOARD_ID>"

curl  -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "title" : "Sum of Memory Free",
      "widgets" : [{
          "definition": {
              "type": "timeseries",
              "requests": [
                  {"q": "sum:system.mem.free{*}"}
              ],
              "title": "Sum Memory Free Shell"
          }
      }],
      "layout_type": "ordered",
      "description" : "An updated dashboard with memory info.",
      "is_read_only": true,
      "notify_list": ["user@domain.com"],
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "my-host"
      }]
}' \
"https://api.datadoghq.com/api/v1/dashboard/${dashboard_id}"
