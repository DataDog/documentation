---
"app_id": "trino"
"app_uuid": "5d6fa7f8-e827-408c-9cf1-8f2bd64b45d3"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": trino.memory.reserved_distributed_bytes
      "metadata_path": metadata.csv
      "prefix": trino.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10282"
    "source_type_name": Trino
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories": []
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/trino/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "trino"
"integration_id": "trino"
"integration_title": "Trino"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "trino"
"public_title": "Trino"
"short_description": "Collects performance and usage stats on Trino clusters"
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
  "description": Collects performance and usage stats on Trino clusters
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Trino
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check collects [Trino][1] metrics, such as the following examples:

- Overall activity metrics: completed/failed queries, data input/output size, execution time.
- Performance metrics: cluster memory, input CPU, execution CPU time.

## Setup

### Installation

For Agent v7.33.0+, follow the instructions below to install the Trino check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-trino==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### Configuration

1. Edit the `trino.d/conf.yaml` file, in the `conf.d/` folder at the root of your
   Agent's configuration directory, to start collecting your Trino performance data.
   See the [sample trino.d/conf.yaml][4] for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated when running the Datadog Agent [status command][5].
   You can specify the metrics you are interested in by editing the [configuration][4].
   To learn how to customize the metrics to collect, read  [JMX Checks][6].
   If you need to monitor more metrics, contact [Datadog support][7].

2. [Restart the Agent][8]

### Validation

[Run the Agent's `status` subcommand][5] and look for Trino under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "trino" >}}


### Events

The Trino integration does not include any events.

### Service Checks

The Trino integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][7].


[1]: https://trino.io/
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/trino/datadog_checks/trino/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/integrations/java/
[7]: https://docs.datadoghq.com/help/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-extras/blob/master/trino/metadata.csv

