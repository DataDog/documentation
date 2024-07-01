---
"app_id": "temporal"
"app_uuid": "6fbb6b85-e9f0-4d0e-af82-3c82871b857c"
"assets":
  "dashboards":
    "Temporal Server Overview": assets/dashboards/server_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": temporal.server.task.requests.count
      "metadata_path": metadata.csv
      "prefix": temporal.
    "process_signatures":
    - temporal-server
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10337"
    "source_type_name": Temporal
  "monitors":
    "frontend latency": assets/monitors/FrontendLatency.json
    "history latency": assets/monitors/HistoryLatency.json
    "matching latency": assets/monitors/MatchingLatency.json
    "persistence latency": assets/monitors/PersistenceLatency.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- developer tools
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/temporal/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "temporal"
"integration_id": "temporal"
"integration_title": "Temporal"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "temporal"
"public_title": "Temporal"
"short_description": "Monitor the health and performance of Temporal Cluster."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Log Collection"
  - "Category::Developer Tools"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of Temporal Cluster.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Temporal
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Temporal][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Temporal check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

1. Configure your Temporal services to expose metrics via a `prometheus` endpoint by following the [official Temporal documentation][4].

2. Edit the `temporal.d/conf.yaml` file located in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Temporal performance data. 

To get started, configure the `openmetrics_endpoint` option to match the `listenAddress` and `handlerPath` options from your Temporal server configuration.

Note that when Temporal services in a cluster are deployed independently, every service exposes its own metrics. As a result, you need to configure the `prometheus` endpoint for every service that you want to monitor and define a separate `instance` on the integration's configuration for each of them.

See the [sample temporal.d/conf.yaml][5] for all available configuration options.

#### Log collection

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Configure your Temporal Cluster to output logs to a file by following the [official documentation][6].

3. Uncomment and edit the logs configuration block in your `temporal.d/conf.yaml` file, and set the `path` to point to the file you configured on your Temporal Cluster:

  ```yaml
  logs:
    - type: file
      path: /var/log/temporal/temporal-server.log
      source: temporal
  ```

4. [Restart the Agent][7].

### Validation

[Run the Agent's status subcommand][8] and look for `temporal` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "temporal" >}}


### Events

The Temporal integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "temporal" >}}


### Logs

The Temporal integration can collect logs from the Temporal Cluster and forward them to Datadog. 

## Troubleshooting

Need help? Contact [Datadog support][11].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor the health of your Temporal Server with Datadog][12]


[1]: https://temporal.io/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.temporal.io/references/configuration#prometheus
[5]: https://github.com/DataDog/integrations-core/blob/master/temporal/datadog_checks/temporal/data/conf.yaml.example
[6]: https://docs.temporal.io/references/configuration#log
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/temporal/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/temporal/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/
[12]: https://www.datadoghq.com/blog/temporal-server-integration/

