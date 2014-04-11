api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
dash_id=2532

curl  -X PUT -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Sum of Memory Free",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "sum:system.mem.free{*}"}
              ]
          },
          "viz": "timeseries"
      }],
      "title" : "Sum Memory Free Shell",
      "description" : "A dashboard with memory info."
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
    }' \
"https://app.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
