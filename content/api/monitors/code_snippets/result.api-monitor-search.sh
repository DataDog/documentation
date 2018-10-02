{
  "counts": {
    "status": [
      {
        "count": 4,
        "name": "No Data"
      },
      {
        "count": 2,
        "name": "OK"
      }
    ],
    "muted": [
      {
        "count": 3,
        "name": false
      },
      {
        "count": 3,
        "name": true
      }
    ],
    "tag": [
      {
        "count": 6,
        "name": "service:cassandra"
      }
    ],
    "type": [
      {
        "count": 6,
        "name": "metric"
      }
    ]
  },
  "monitors": [
    {
      "status": "No Data",
      "scopes": [
        "!availability-zone:us-east-1c",
        "name:cassandra"
      ],
      "classification": "metric",
      "creator": {
        "handle": "xxxx@datadoghq.com",
        "name": "xxxx@datadoghq.com",
        "id": {
          "handle": "xxxx@datadoghq.com",
          "id": 1234,
          "name": null
        }
      },
      "metrics": [
        "system.cpu.user"
      ],
      "notifications": [
        {
          "handle": "xxxx@datadoghq.com",
          "name": "xxxx@datadoghq.com"
        }
      ],
      "last_triggered_ts": null,
      "id": 2699850,
      "name": "Cassandra CPU is high on {{host.name}} in {{availability-zone.name}}",
      "tags": [
        "service:cassandra"
      ],
      "org_id": 1234,
      "type": "metric alert"
    },
    {
      "status": "OK",
      (...)
    },
  ],
  "metadata": {
    "total_count": 6,
    "page_count": 6,
    "page": 0,
    "per_page": 30
  }
}