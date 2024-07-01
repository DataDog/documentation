---
"app_id": "statsd"
"app_uuid": "847f92f2-77e2-4429-844f-50f4d9c8097f"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "statsd.counters.count"
      "metadata_path": "metadata.csv"
      "prefix": "statsd."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10086"
    "source_type_name": "StatsD"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/statsd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "statsd"
"integration_id": "statsd"
"integration_title": "StatsD"
"integration_version": "1.12.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "statsd"
"public_title": "StatsD"
"short_description": "Monitor the availability of StatsD servers and track metric counts."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Monitor the availability of StatsD servers and track metric counts."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "StatsD"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors the availability and uptime of non-Datadog StatsD servers. It also tracks the number of metrics, by metric type, received by StatsD.

This check does **NOT** forward application metrics from StatsD servers to Datadog. It collects metrics about StatsD itself.

## Setup

### Installation

The StatsD check is included in the [Datadog Agent][1] package, so you don't need to install anything else on any servers that run StatsD.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `statsd.d/conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample statsd.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 8126 # or wherever your statsd listens
   ```

2. [Restart the Agent][3] to start sending StatsD metrics and service checks to Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                 |
| -------------------- | ------------------------------------- |
| `<INTEGRATION_NAME>` | `statsd`                              |
| `<INIT_CONFIG>`      | blank or `{}`                         |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"8126"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `statsd.d/conf.yaml` file to start collecting your Supervisord Logs:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: statsd
   ```

   Change the `path` parameter value and configure it for your environment. 
   See the [sample statsd.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

### Validation

Run the [Agent's status subcommand][4] and look for `statsd` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "statsd" >}}


### Events

The StatsD check does not include any events.

### Service Checks
{{< get-service-checks-from-git "statsd" >}}


## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

Additional helpful documentation, links, and articles:

- [StatsD, what it is and how it can help you][6]
- [Visualize StatsD metrics with Counts Graphing][7]



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/statsd
[7]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
