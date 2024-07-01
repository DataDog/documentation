---
"app_id": "pulsar"
"app_uuid": "2a3a1555-3c19-42a9-b954-ce16c4aa6308"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": pulsar.active_connections
      "metadata_path": metadata.csv
      "prefix": pulsar.
    "process_signatures":
    - java org.apache.pulsar.PulsarStandaloneStarter
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10143"
    "source_type_name": pulsar
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- message queues
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/pulsar/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pulsar"
"integration_id": "pulsar"
"integration_title": "Pulsar"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "pulsar"
"public_title": "Pulsar"
"short_description": "Monitor your Pulsar clusters."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Message Queues"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor your Pulsar clusters.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Pulsar
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Pulsar][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Pulsar check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

1. Edit the `pulsar.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your pulsar performance data. See the [sample pulsar.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `pulsar` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "pulsar" >}}



### Log collection

1. The Pulsar log integration supports Pulsar's [default log format][8]. Clone and edit the [integration pipeline][9] if you have a different format.

2. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:
   ```yaml
   logs_enabled: true
   ```

3. Uncomment and edit the logs configuration block in your `pulsar.d/conf.yaml` file. Change the path parameter value based on your environment. See the [sample pulsar.d/conf.yaml][4] for all available configuration options.
   ```yaml
    logs:
      - type: file
        path: /pulsar/logs/pulsar.log
        source: pulsar
   ```
4. [Restart the Agent][5]

### Events

The Pulsar integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "pulsar" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].


[1]: https://pulsar.apache.org
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/pulsar/metadata.csv
[8]: https://pulsar.apache.org/docs/en/reference-configuration/#log4j
[9]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[10]: https://github.com/DataDog/integrations-core/blob/master/pulsar/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

