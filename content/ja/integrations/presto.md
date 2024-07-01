---
"app_id": "presto"
"app_uuid": "b725cadc-d041-4199-8b86-c714ee9a318f"
"assets":
  "dashboards":
    "Presto Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": presto.failure_detector.active_count
      "metadata_path": metadata.csv
      "prefix": presto.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10057"
    "source_type_name": Presto
  "saved_views":
    "4xx_errors": assets/saved_views/4xx_errors.json
    "5xx_errors": assets/saved_views/5xx_errors.json
    "error_patterns": assets/saved_views/error_patterns.json
    "response_time_overview": assets/saved_views/response_time.json
    "status_code_overview": assets/saved_views/status_code_overview.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/presto/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "presto"
"integration_id": "presto"
"integration_title": "Presto"
"integration_version": "2.8.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "presto"
"public_title": "Presto"
"short_description": "Collects performance and usage stats on PrestoSQL cluster, and much more."
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
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Collects performance and usage stats on PrestoSQL cluster, and much more.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Presto
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check collects [Presto][1] metrics, for example:

- Overall activity metrics: completed/failed queries, data input/output size, execution time.
- Performance metrics: cluster memory, input CPU, execution CPU time.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Presto check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server. Install the Agent on each Coordinator and Worker node from which you wish to collect usage and performance metrics.

### Configuration

1. Edit the `presto.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Presto performance data. See the [sample presto.d/conf.yaml][4] for all available configuration options.

    This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page][5]. You can specify the metrics you are interested in by editing the configuration below. To learn how to customize the metrics to collect, see the [JMX Checks documentation][6] for more detailed instructions. If you need to monitor more metrics, contact [Datadog support][7].

2. [Restart the Agent][8].

#### Metric collection

Use the default configuration of your `presto.d/conf.yaml` file to activate the collection of your Presto metrics. See the sample [presto.d/conf.yaml][4] for all available configuration options.

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `presto.d/conf.yaml` file to start collecting your Presto logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/presto/*.log
       source: presto
       service: "<SERVICE_NAME>"
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the sample [presto.d/conf.yaml][4] for all available configuration options.

3. [Restart the Agent][8].

### Validation

Run the [Agent's status subcommand][5] and look for `presto` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "presto" >}}


### Events

Presto does not include any events.

### Service Checks
{{< get-service-checks-from-git "presto" >}}


## Troubleshooting

Need help? Contact [Datadog support][7].


[1]: https://docs.datadoghq.com/integrations/presto/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/integrations/java/
[7]: https://docs.datadoghq.com/help/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-core/blob/master/presto/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/presto/assets/service_checks.json

