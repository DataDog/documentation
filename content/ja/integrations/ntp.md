---
"app_id": "ntp"
"app_uuid": "399b74d9-ece5-4517-ae16-c05cac6911b2"
"assets":
  "integration":
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": "ntp.offset"
      "metadata_path": "metadata.csv"
      "prefix": "ntp."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "NTP"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "network"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ntp/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ntp"
"integration_id": "ntp"
"integration_title": "NTP"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "ntp"
"public_title": "NTP"
"short_description": "Get alerts when your hosts drift out of sync with your chosen NTP server."
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
  - "Category::Network"
  "configuration": "README.md#Setup"
  "description": "Get alerts when your hosts drift out of sync with your chosen NTP server."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "NTP"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The Network Time Protocol (NTP) integration is enabled by default and reports the time offset from an ntp server every 15 minutes. When the local Agent's time is more than 15 seconds off from the Datadog service and other hosts you are monitoring, you may experience:

- Incorrect alert triggers
- Metric delays
- Gaps in graphs of metrics

By default, the check detects which cloud provider the Agent is running on and uses the private
NTP server of that cloud provider, if available. If no cloud provider is detected, the agent will
default to the NTP servers below:

- `0.datadog.pool.ntp.org`
- `1.datadog.pool.ntp.org`
- `2.datadog.pool.ntp.org`
- `3.datadog.pool.ntp.org`

**Note:** NTP requests do not support proxy settings.

## Setup

### Installation

The NTP check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your servers.

### Configuration

The Agent enables the NTP check by default. To configure the check yourself, edit the file `ntp.d/conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample ntp.d/conf.yaml][3] for all available configuration options.

**Note**: If you edit the Datadog-NTP check configuration file, [restart the Agent][4] to effect any configuration changes.

### Validation

[Run the Agent's `status` subcommand][5] and look for `ntp` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "ntp" >}}


### Events

The NTP check does not include any events.

### Service Checks
{{< get-service-checks-from-git "ntp" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ntp/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/ntp/assets/service_checks.json
[8]: https://docs.datadoghq.com/help/

