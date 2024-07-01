---
"app_id": "statsig"
"app_uuid": "57fb9235-151d-4ed9-b15e-a3e6f918dcca"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": statsig.log_event.count
      "metadata_path": metadata.csv
      "prefix": statsig.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10180"
    "source_type_name": Statsig
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Statsig
  "sales_email": support@statsig.com
  "support_email": support@statsig.com
"categories":
- configuration & deployment
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/statsig/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "statsig"
"integration_id": "statsig"
"integration_title": "Statsig"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "statsig"
"public_title": "Statsig"
"short_description": "Monitor Statsig changes in Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor Statsig changes in Datadog
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/"
  "support": "README.md#Support"
  "title": Statsig
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The Datadog-Statsig integration enables Statsig to send events and metrics to help you monitor your product and services and visualize how feature gate rollouts or configuration changes affect the rest of your ecosystem.

## Setup

### Installation

No installation is required to setup the Statsig integration.

### Configuration

1. Copy your Datadog API key.
2. [Navigate to the Integrations tab in the Statsig console][1].
3. Click on the Datadog card.
4. Paste in your API key in the top field and click Confirm.

## Data Collected

The Statsig integration does not collect any data from Datadog.

### Metrics
{{< get-metrics-from-git "statsig" >}}


### Service Checks

The Statsig integration does not include any service checks.

### Events

The Statsig integration sends configuration change events on Statsig to Datadog. For instance, updated feature gates or new integrations.

## Troubleshooting

Need help? Contact [Statsig support][3] or see the [Statsig website][4].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor feature releases with Statsig's offering in the Datadog Marketplace][5]

[1]: https://console.statsig.com/integrations
[2]: https://github.com/DataDog/integrations-extras/blob/master/statsig/metadata.csv
[3]: mailto:support@statsig.com
[4]: https://www.statsig.com/contact
[5]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/

