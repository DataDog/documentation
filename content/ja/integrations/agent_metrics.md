---
"app_id": "datadog-agent"
"app_uuid": "4af17310-84ad-4bac-b05d-85917bc378cb"
"assets":
  "integration":
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": "metadata.csv"
      "prefix": "datadog.agent."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "Agent Metrics"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories": []
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/agent_metrics/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "agent_metrics"
"integration_id": "datadog-agent"
"integration_title": "Agent Metrics"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "agent_metrics"
"public_title": "Agent Metrics"
"short_description": "agent_metrics description."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": "agent_metrics description."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Agent Metrics"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get internal metrics from the Datadog Agent to create visualizations and monitors in Datadog.

**Note:** The list of metrics collected by this integration may change between minor Agent versions. Such changes may not be mentioned in the Agent's changelog.

## Setup

### Installation

The Agent Metrics integration, based on the [go_expvar][1] check, is included in the [Datadog Agent][2] package, so you don't need to install anything else on your servers.

### Configuration

1. Rename the [`go_expvar.d/agent_stats.yaml.example`][3] file, in the `conf.d/` folder at the root of your [Agent's configuration directory][4], to `go_expvar.d/agent_stats.yaml`.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `go_expvar` under the Checks section.

## Data Collected

### Metrics

The Agent Metrics integration collects the metrics defined in [`agent_stats.yaml.example`][3].

### Events

The Agent Metrics integration does not include any events.

### Service Checks

The Agent Metrics integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://docs.datadoghq.com/integrations/go_expvar/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/go_expvar.d/agent_stats.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/help/

