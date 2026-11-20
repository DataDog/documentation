<!-- code-example-accordion: /api/latest/monitors/create-a-monitor/ -->

{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
# Use a Personal Access Token or Service Access Token
export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"

curl -X POST "https://api.${DD_SITE}/api/v1/monitor" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}" \
-d @- << EOF
{
  "name": "Example Monitor",
  "type": "cost alert",
  "query": "formula(\"exclude_null(query1)\").last(\"7d\").anomaly(direction=\"above\", threshold=10) >= 5",
  "message": "some message Notify: @hipchat-channel",
  "tags": [
    "test:examplemonitor",
    "env:ci"
  ],
  "priority": 3,
  "options": {
    "thresholds": {
      "critical": 5,
      "warning": 3
    },
    "variables": [
      {
        "data_source": "cloud_cost",
        "query": "sum:aws.cost.net.amortized.shared.resources.allocated{aws_product IN (amplify ,athena, backup, bedrock ) } by {aws_product}.rollup(sum, 86400)",
        "name": "query1",
        "aggregator": "sum"
      }
    ],
    "include_tags": true
  }
}
EOF
```

```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
# Use a Personal Access Token or Service Access Token
export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"

curl -X POST "https://api.${DD_SITE}/api/v1/monitor" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}" \
-d @- << EOF
{
  "name": "Example-Monitor",
  "type": "rum alert",
  "query": "formula(\"query2 / query1 * 100\").last(\"15m\") >= 0.8",
  "message": "some message Notify: @hipchat-channel",
  "tags": [
    "test:examplemonitor",
    "env:ci"
  ],
  "priority": 3,
  "options": {
    "thresholds": {
      "critical": 0.8
    },
    "variables": [
      {
        "data_source": "rum",
        "name": "query2",
        "search": {
          "query": ""
        },
        "indexes": [
          "*"
        ],
        "compute": {
          "aggregation": "count"
        },
        "group_by": []
      },
      {
        "data_source": "rum",
        "name": "query1",
        "search": {
          "query": "status:error"
        },
        "indexes": [
          "*"
        ],
        "compute": {
          "aggregation": "count"
        },
        "group_by": []
      }
    ]
  }
}
EOF
```
{% /tab %}
