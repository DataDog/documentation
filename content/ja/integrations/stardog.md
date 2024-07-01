---
"app_id": "stardog"
"app_uuid": "a4d874ba-7173-4c43-8cc8-09f966186be8"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": "stardog.dbms.memory.native.max"
      "metadata_path": "metadata.csv"
      "prefix": "stardog."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10206"
    "source_type_name": "Stardog"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Stardog"
  "sales_email": "support@stardog.com"
  "support_email": "support@stardog.com"
"categories":
- "data stores"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/stardog/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "stardog"
"integration_id": "stardog"
"integration_title": "Stardog"
"integration_version": "2.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "stardog"
"public_title": "Stardog"
"short_description": "A Stardog data collector for Datadog."
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
  - "Category::Data Stores"
  "configuration": "README.md#Setup"
  "description": "A Stardog data collector for Datadog."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Stardog"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from the Stardog service in real time to:

- Visualize and monitor Stardog states.
- Be notified about Stardog failovers and events.

## Setup

The Stardog check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Stardog check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-stardog==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `stardog.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Stardog [metrics](#metrics). See the [sample stardog.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

## Validation

[Run the Agent's status subcommand][7] and look for `stardog` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "stardog" >}}


### Events

The Stardog check does not include any events.

### Service Checks

The Stardog check does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][9].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/stardog/datadog_checks/stardog/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/stardog/metadata.csv
[9]: http://docs.datadoghq.com/help

