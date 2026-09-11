api_key=XXXXXXX
app_key=XXXXXXXXX

curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "Number of Agents or EC2 reporting",
        "widgets": [
            {
                "type": "event_stream",
                "title": "New Agents reporting, past week",
                "height": 57,
                "width": 59,

                "y": 30,
                "x": 24,

                "query": "Datadog agent started",
                "time": {
                    "live_span": "1w"
                }
            },
            {"type": "timeseries",

               "title": true,
               "title_size": 16,
               "title_align": "left",
               "title_text": "Agent host count reporting (system.cpu.user)",

               "height": 26,
               "width": 47,

               "y": 1,
               "x": 1,

               "time": {
                    "live_span": "1w"
                },
                 "tile_def": {
                   "viz": "timeseries",
                   "requests": [
                      {
                           "q": "count:system.cpu.user{*}.rollup(max,3600)",
                           "aggregator": "avg",
                           "conditional_formats": [],
                           "type": "line"

                      }
                      ]
                 }
            },
    {"type": "timeseries",

               "title": true,
               "title_size": 16,
               "title_align": "left",
               "title_text": "AWS host count reporting (ec2.host_ok)",

               "height": 26,
               "width": 47,

               "y": 1,
               "x": 50,

               "time": {
                    "live_span": "1w"
                },
                 "tile_def": {
                   "viz": "timeseries",
                   "requests": [
                      {
                           "q": "count:aws.ec2.host_ok{*}.rollup(max,3600)",
                           "aggregator": "avg",
                           "conditional_formats": [],
                           "type": "line"

                      }
                      ]
                     }

                 }
        ]
    }' \
"https://app.datadoghq.com/api/v1/screen?api_key=XXXXXXX&application_key=XXXX"