---
"app_id": "reboot-required"
"app_uuid": "673a1136-68ad-46f4-ba6f-4203df10db6a"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": "metadata.csv"
      "prefix": "reboot-required."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10209"
    "source_type_name": "Reboot required"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Community"
  "sales_email": "support@krugerheavyindustries.com"
  "support_email": "support@krugerheavyindustries.com"
"categories":
- "developer tools"
- "os & system"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "reboot_required"
"integration_id": "reboot-required"
"integration_title": "Reboot Required"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "reboot_required"
"public_title": "Reboot Required"
"short_description": "Monitor systems that require a reboot after software update"
"supported_os":
- "linux"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Developer Tools"
  - "Category::OS & System"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": "Monitor systems that require a reboot after software update"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Reboot Required"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Linux systems that are configured to autoinstall packages may not be configured to autoreboot (it may be desirable to time this manually). This check enables alerts to be fired in the case where reboots are not performed in a timely manner.

## Setup

The Reboot Required check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Reboot Required check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-reboot_required==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `reboot_required.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4]. See the [sample reboot_required.d/conf.yaml][5] for all available configuration options.

2. Make sure you create a dd-agent (user that runs the Datadog agent) writable directory for the agent, and used by this check. The default of `/var/run/dd-agent` is ideal. The snippet below should suffice.

   ```shell
   sudo mkdir /var/run/dd-agent
   sudo chown dd-agent:dd-agent /var/run/dd-agent
   ```

3. [Restart the Agent][6].

### Validation

[Run the Agent's `status` subcommand][7] and look for `reboot_required` under the Checks section.

## Data Collected

### Metrics

No metrics are collected.

### Events

The reboot_required check does not include any events.

### Service Checks
{{< get-service-checks-from-git "reboot_required" >}}


## Troubleshooting

Need help? Contact [Datadog support][9].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/assets/service_checks.json
[9]: http://docs.datadoghq.com/help

