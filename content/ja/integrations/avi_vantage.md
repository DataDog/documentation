---
"app_id": "avi-vantage"
"app_uuid": "a3f11e6a-fdb7-421d-ad5c-dbfa987b8df8"
"assets":
  "dashboards":
    "Avi Vantage - Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - avi_vantage.controller_stats.avg_cpu_usage
      - avi_vantage.pool_healthscore
      - avi_vantage.service_engine_healthscore
      - avi_vantage.virtual_service_healthscore
      "metadata_path": metadata.csv
      "prefix": avi_vantage.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10189"
    "source_type_name": Avi Vantage
  "monitors":
    "Avi Vantage - Error Rate Monitor": assets/monitors/error_rate_monitor.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cloud
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/avi_vantage/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "avi_vantage"
"integration_id": "avi-vantage"
"integration_title": "Avi Vantage"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "avi_vantage"
"public_title": "Avi Vantage"
"short_description": "Monitor the health and performance of your Avi Vantage instances."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of your Avi Vantage instances.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Avi Vantage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Avi Vantage][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Avi Vantage check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

1. Edit the `avi_vantage.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your avi_vantage performance data. See the [sample avi_vantage.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `avi_vantage` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "avi_vantage" >}}


### Events

Avi Vantage does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][9].

[1]: https://avinetworks.com/why-avi/multi-cloud-load-balancing/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/datadog_checks/avi_vantage/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/

