#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST -H "Content-type: application/json" \
-d '{
      "type": "monitor",
      "name": "Critical Foo Host Uptime",
      "description": "Track the uptime of host foo which is critical to the core business.",
      "tags": ["app:core", "kpi"],
      "monitor_ids": [42],
      "thresholds": [
        {"timeframe": "30d", "target": 95, "warning": 98}
      ]
}' \
    "https://api.datadoghq.com/api/v1/slo?api_key=${api_key}&application_key=${app_key}"
