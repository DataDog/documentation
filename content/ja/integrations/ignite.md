---
"app_id": "ignite"
"app_uuid": "0e1f1ef2-ea62-4ae4-a99f-8c40171b729c"
"assets":
  "dashboards":
    "Ignite Overview": assets/dashboards/ignite_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": ignite.received_messages
      "metadata_path": metadata.csv
      "prefix": ignite.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10100"
    "source_type_name": Ignite
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- data stores
- log collection
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ignite/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ignite"
"integration_id": "ignite"
"integration_title": "ignite"
"integration_version": "2.4.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "ignite"
"public_title": "ignite"
"short_description": "Collect metrics from your Ignite server."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Collect metrics from your Ignite server.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": ignite
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Ignite][1].

## Setup

### Installation

The Ignite check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### Configuration

#### Ignite setup

JMX metrics exporter is enabled by default, but you may need to choose the port exposed, or enable authentication depending on your network security. The official docker image uses `49112` by default.

For logging, it's strongly suggested to enable [log4j][3] to benefit from a log format with full dates.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `ignite.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your ignite performance data. See the [sample ignite.d/conf.yaml][1] for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page][2].
   You can specify the metrics you are interested in by editing the configuration below.
   To learn how to customize the metrics to collect see the [JMX Checks documentation][3] for more information.
   If you need to monitor more metrics, contact [Datadog support][4].

2. [Restart the Agent][5]

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `ignite.d/conf.yaml` file to start collecting your Ignite logs:

   ```yaml
     logs:
       - type: file
         path: <IGNITE_HOME>/work/log/ignite-*.log
         source: ignite
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample ignite.d/conf.yaml][1] for all available configuration options.

3. [Restart the Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/integrations/java/
[4]: https://docs.datadoghq.com/help/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

To collect metrics with the Datadog-Ignite integration, see the [Autodiscovery with JMX][2] guide.

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker log collection][3].

| Parameter      | Value                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ignite", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/agent/autodiscovery/integrations/
[2]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][4] and look for `ignite` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "ignite" >}}


### Events

The Ignite integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "ignite" >}}


## Troubleshooting

Need help? Contact [Datadog support][5].



[1]: https://ignite.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
