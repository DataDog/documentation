---
"app_id": "mongodb-atlas"
"app_uuid": "d7f734da-a1f7-4e3f-a590-ea154018a8d8"
"assets":
  "dashboards":
    "MongoDB-Atlas-Overview": assets/dashboards/MongoDB-Atlas-Overview_dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": mongodb.atlas.connections.current
      "metadata_path": metadata.csv
      "prefix": mongodb.atlas.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "230"
    "source_type_name": MongoDB Atlas
  "monitors":
    "[MongoDB Atlas] CPU usage is higher than average on host: {{host.name}}": assets/monitors/high_cpu.json
    "[MongoDB Atlas] Efficiency of queries is degrading": assets/monitors/query_efficiency.json
    "[MongoDB Atlas] Memory usage is higher than average on host: {{host.name}}": assets/monitors/memory.json
    "[MongoDB Atlas] Read Latency is higher than average for host: {{host.name}}": assets/monitors/read_latency.json
    "[MongoDB Atlas] Write Latency is higher than average for host: {{host.name}}": assets/monitors/write_latency.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "mongodb_atlas"
"integration_id": "mongodb-atlas"
"integration_title": "MongoDB Atlas"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "mongodb_atlas"
"public_title": "MongoDB Atlas"
"short_description": "MongoDB Atlas"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Metrics"
  "configuration": "README.md#Setup"
  "description": MongoDB Atlas
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/"
  - "resource_type": other
    "url": "https://www.mongodb.com/products/platform/atlas-for-government"
  "support": "README.md#Support"
  "title": MongoDB Atlas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

MongoDB Atlas can push calculated metrics into Datadog to:

- Visualize key MongoDB Atlas metrics.
- Correlate MongoDB Atlas performance with the rest of your applications.

The integration includes out-of-the-box monitors and dashboard that enable you to view Atlas health and performance metrics, monitor throughput metrics, track the average latency of read and write operations over time, and create monitors that alert you when the number of current connections is approaching the maximum limit.

**Note**: The MongoDB Atlas integration is only available on M10+ clusters.

## Setup

### Installation

You can install the MongoDB Atlas integration by logging in to your Atlas portal.

### Configuration

1. Retrieve or create a Datadog [API key][1].
2. In the [Atlas portal][2], enter a Datadog API key under **Integrations** -> **Datadog Settings**.

## Data Collected

### Metrics
{{< get-metrics-from-git "mongodb_atlas" >}}


### Events

MongoDB Atlas can push [alerts][4] to Datadog as events.

### Service Checks

The MongoDB Atlas integration does not include any service checks.

## Troubleshooting

Need help? [Contact Datadog Support][5]

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor MongoDB Atlas with Datadog][6]
- [MongoDB Atlas for Government][7]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/metadata.csv
[4]: https://www.mongodb.com/docs/atlas/configure-alerts/#std-label-notification-options
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
[7]: https://www.mongodb.com/products/platform/atlas-for-government

