api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
dash_id=2471

# Create a dashboard to delete. Use jq (http://stedolan.github.io/jq/download/) to get the dash id.
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Average Memory Free",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ]
          },
          "viz": "timeseries"
      }],
      "title" : "Average Memory Free Shell",
      "description" : "A dashboard with memory info.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
    }' \
"https://app.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl -X DELETE "https://app.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"

