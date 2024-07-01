---
"app_id": "gnatsd"
"app_uuid": "91ef7414-0d7b-4ccd-b1a0-d23ef8b6780f"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "gnatsd.connz.connections.in_bytes"
      "metadata_path": "metadata.csv"
      "prefix": "gnatsd."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10234"
    "source_type_name": "Gnatsd"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Community"
  "sales_email": "dev@goldstar.com"
  "support_email": "dev@goldstar.com"
"categories":
- "message queues"
- "notifications"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/gnatsd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gnatsd"
"integration_id": "gnatsd"
"integration_title": "Gnatsd"
"integration_version": "2.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "gnatsd"
"public_title": "Gnatsd"
"short_description": "Monitor gnatsd cluster with Datadog."
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
  - "Category::Message Queues"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": "Monitor gnatsd cluster with Datadog."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Gnatsd"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Gnatsd service in real time to:

- Visualize and monitor Gnatsd states
- Be notified about Gnatsd failovers and events.

## Setup

The Gnatsd check is not included in the [Datadog Agent][1] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the Gnatsd check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-gnatsd==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `gnatsd.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Gnatsd [metrics](#metrics). See the [sample gnatsd.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6]

### Validation

Run the [Agent's status subcommand][7] and look for `gnatsd` under the Checks section.

## Compatibility

The gnatsd check is compatible with all major platforms

## Data Collected

### Metrics
{{< get-metrics-from-git "gnatsd" >}}


**Note**: If you use custom Nats cluster names, your metrics may look like this:
`gnatsd.connz.connections.cluster_name.in_msgs`

### Events

The gnatsd check does not include any events.

### Service Checks
{{< get-service-checks-from-git "gnatsd" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

