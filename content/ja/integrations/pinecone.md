---
"app_id": "pinecone"
"app_uuid": "dd7ebeb0-9910-4897-81b3-d8bc73003413"
"assets":
  "dashboards":
    "pinecone": assets/dashboards/pinecone_overview.json
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - pinecone.index.fullness
      "metadata_path": metadata.csv
      "prefix": pinecone.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10363"
    "source_type_name": Pinecone
  "monitors":
    "[Pinecone] Index approaching maximum capacity": assets/monitors/index_fullness.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
- data stores
- ai/ml
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "pinecone"
"integration_id": "pinecone"
"integration_title": "Pinecone"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "pinecone"
"public_title": "Pinecone"
"short_description": "Cloud based Vector Database for high-performance AI applications."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Data Stores"
  - "Category::AI/ML"
  - "Submitted Data Type::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Cloud based Vector Database for high-performance AI applications.
  "media":
  - "caption": Pinecone Dashboard Overview
    "image_url": images/pinecone-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Pinecone
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

- **Optimize performance and control usage:** Observe and track specific actions (e.g. request count) within Pinecone to identify application requests with high latency or usage. Monitor trends and gain actionable insights to improve resource utilization and reduce spend.

- **Automatically alert on metrics:** Get alerted when index fullness reaches a certain threshold. You can also create your own customized monitors to alert on specific metrics and thresholds.

- **Locate and triage unexpected spikes in usage or latency:** Quickly visualize anomalies in usage or latency in Pinecone’s Datadog dashboard. View metrics over time to better understand trends and determine the severity of a spike.

## Setup

### Installation

1. Login to your [Pinecone account][1].
2. Navigate to **API Keys** tab.
3. Create an API key.
4. Copy the created API Key to your clipboard.

### Configuration

1. Navigate to the configuration tab inside Datadog [Pinecone integration tile][2].
2. Enter your project Id.
3. Enter your environment, which could be found when copying your API key to clipboard.
4. Enter your copied API key.

## Data Collected

### Metrics
{{< get-metrics-from-git "pinecone" >}}


### Logs

Pinecone does not include collectings logs.

### Service Checks

Pinecone does not include any service checks.

### Events

Pinecone does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://app.pinecone.io/
[2]: https://app.datadoghq.com/account/settings#integrations/pinecone
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/pinecone/metadata.csv
[4]: https://docs.datadoghq.com/help/

