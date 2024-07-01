---
"app_id": "amazon-memorydb"
"app_uuid": "1e1fabb3-32b3-4d8e-866d-79b8d09207e7"
"assets":
  "dashboards":
    "amazon-memorydb": assets/dashboards/amazon_memorydb_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - aws.memorydb.cpuutilization
      "metadata_path": metadata.csv
      "prefix": aws.memorydb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10425"
    "source_type_name": Amazon MemoryDB
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- cloud
- metrics
- data stores
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_memorydb"
"integration_id": "amazon-memorydb"
"integration_title": "Amazon MemoryDB"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_memorydb"
"public_title": "Amazon MemoryDB"
"short_description": "Amazon MemoryDB is a fully-managed Redis-compatible in-memory database service."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::Metrics"
  - "Category::Data Stores"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Amazon MemoryDB is a fully-managed Redis-compatible in-memory database service.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Amazon MemoryDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon MemoryDB for Redis is a durable, in-memory database service delivering both in-memory performance and multi-Availability Zone durability.

Enable this integration to see all your MemoryDB metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `MemoryDB` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon MemoryDB integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_memorydb" >}}


### Events

The Amazon MemoryDB integration does not include any events.

### Service Checks

The Amazon MemoryDB integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-memorydb
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_memorydb/metadata.csv
[5]: https://docs.datadoghq.com/help/

