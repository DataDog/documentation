from datadog import initialize, api

options = {
    "api_key": "<DATADOG_API_KEY>",
    "app_key": "<DATADOG_APPLICATION_KEY>"
}

initialize(**options)

monitor_type = "metric alert"
query = "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 200"
monitor_options = {"thresholds": {"critical": 90.0}}

# Validate a monitor's definition
api.Monitor.validate(
    type=monitor_type,
    query=query,
    options=monitor_options,
)
