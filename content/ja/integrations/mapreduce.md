---
"app_id": "mapreduce"
"app_uuid": "25ae6f45-147b-478c-9f0c-5013c3859796"
"assets":
  "dashboards":
    "mapreduce": "assets/dashboards/mapreduce_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "mapreduce.job.elapsed_time.max"
      "metadata_path": "metadata.csv"
      "prefix": "mapreduce."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "133"
    "source_type_name": "MapReduce"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "mapreduce"
"integration_id": "mapreduce"
"integration_title": "Map Reduce"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "mapreduce"
"public_title": "Map Reduce"
"short_description": "Monitor the status and duration of map and reduce tasks."
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
  "description": "Monitor the status and duration of map and reduce tasks."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Map Reduce"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![MapReduce Dashboard][1]

## Overview

Get metrics from mapreduce service in real time to:

- Visualize and monitor mapreduce states
- Be notified about mapreduce failovers and events.

## Setup

### Installation

The Mapreduce check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `mapreduce.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to point to your server and port, set the masters to monitor. See the [sample mapreduce.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Uncomment and edit the logs configuration block in your `mapreduce.d/conf.yaml` file. Change the `type`, `path`, and `service` parameter values based on your environment. See the [sample mapreduce.d/conf.yaml][2] for all available configuration options.

    ```yaml
    logs:
      - type: file
        path: <LOG_FILE_PATH>
        source: mapreduce
        service: <SERVICE_NAME>
        # To handle multi line that starts with yyyy-mm-dd use the following pattern
        # log_processing_rules:
        #   - type: multi_line
        #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
        #     name: new_log_start_with_date
    ```

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `mapreduce`                                                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<MAPREDUCE_CLUSTER_NAME>"}` |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see the [Docker Log Collection][2].

Then, set [log integrations][3] as Docker labels:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "mapreduce", "service": "<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/docker/log/
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validation

Run the [Agent's status subcommand][3] and look for `mapreduce` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "mapreduce" >}}


### Events

The Mapreduce check does not include any events.

### Service Checks
{{< get-service-checks-from-git "mapreduce" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

- [Hadoop architectural overview][5]
- [How to monitor Hadoop metrics][6]
- [How to collect Hadoop metrics][7]
- [How to monitor Hadoop with Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
