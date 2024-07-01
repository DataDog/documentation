---
"app_id": "snmpwalk"
"app_uuid": "bc37c561-7ac5-4799-a56b-d85347bc9ff1"
"assets": {}
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Community"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "notifications"
- "network"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmpwalk"
"integration_id": "snmpwalk"
"integration_title": "SNMP walk"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "snmpwalk"
"public_title": "SNMP walk"
"short_description": "snmpwalk description."
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
  - "Category::Notifications"
  - "Category::Network"
  "configuration": "README.md#Setup"
  "description": "snmpwalk description."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "SNMP walk"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from SNMP walk service in real time to:

- Visualize and monitor SNMP walk states
- Be notified about SNMP walk failovers and events.

## Setup

The SNMP walk check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the SNMP walk check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-snmpwalk==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `snmpwalk.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your SNMP walk [metrics](#metrics). See the [sample snmpwalk.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

## Validation

[Run the Agent's `status` subcommand][7] and look for `snmpwalk` under the Checks section.

## Data Collected

### Metrics

The SNMP walk check does not include any metrics.

### Events

The SNMP walk check does not include any events.

### Service Checks

See [service_checks.json][8] for a list of service checks provided by this integration.

## Troubleshooting

Need help? Contact [Datadog support][9].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/assets/service_checks.json
[9]: http://docs.datadoghq.com/help

