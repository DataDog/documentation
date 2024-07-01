---
"app_id": "unifi-console"
"app_uuid": "224a050d-7ed3-4e7a-ada6-410f61393fc0"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": unifi.device.status
      "metadata_path": metadata.csv
      "prefix": unifi.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10298"
    "source_type_name": Unifi Console
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": antonin.bruneau@gmail.com
  "support_email": antonin.bruneau@gmail.com
"categories": []
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/unifi_console/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "unifi_console"
"integration_id": "unifi-console"
"integration_title": "Unifi Console"
"integration_version": "1.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "unifi_console"
"public_title": "Unifi Console"
"short_description": "This check collects metrics from the Unifi Controller"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": This check collects metrics from the Unifi Controller
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Troubleshooting"
  "title": Unifi Console
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Unifi Console][1] through the Datadog Agent.

## Setup

The Unifi check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Unifi check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-unifi_console==1.2.0
   ```

2. Configure your integration similar to core [integrations][4].

### Configuration

1. Edit the `unifi_console.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Unifi Console performance data. See the [sample unifi_console.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `unifi_console` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "unifi_console" >}}


### Events

The Unifi Console integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "unifi_console" >}}



## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://ui.com/consoles
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/datadog_checks/unifi_console/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

