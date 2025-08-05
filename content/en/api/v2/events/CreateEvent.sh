curl -X POST "https://event-management-intake.datadoghq.com/api/v2/events" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-d @- << EOF
{
  "data": {
    "type": "event",
    "attributes": {
      "aggregation_key": "aggregation_key_123",
      "attributes": {
        "custom": {
          "threshold": 95,
          "current_value": 98,
          "metric": "cpu.utilization"
        },
        "links": [
          {
            "category": "runbook",
            "title": "CPU Alert Runbook",
            "url": "https://example.com/runbooks/cpu-alert"
          },
          {
            "category": "dashboard",
            "url": "https://example.com/dashboards/cpu-usage"
          }
        ],
        "priority": "2",
        "status": "error"
      },
      "category": "alert",
      "integration_id": "custom-events",
      "message": "CPU usage exceeded the 95% threshold for more than 5 minutes.",
      "tags": [
        "env:production",
        "team:infrastructure"
      ],
      "timestamp": "2025-08-05T10:30:00Z",
      "title": "High CPU usage on production nodes"
    }
  }
}
EOF