---
"app_id": "yarn"
"app_uuid": "427f8f08-00a1-455a-a0e5-9b2ec7ffb0a5"
"assets":
  "dashboards":
    "hadoop": "assets/dashboards/hadoop_dashboard.json"
    "yarn": "assets/dashboards/yarn_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "yarn.metrics.total_mb"
      "metadata_path": "metadata.csv"
      "prefix": "yarn."
    "process_signatures":
    - "java org.apache.hadoop.yarn.server.resourcemanager.ResourceManager"
    - "java org.apache.hadoop.yarn.server.nodemanager.NodeManager"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "134"
    "source_type_name": "Yarn"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/yarn/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "yarn"
"integration_id": "yarn"
"integration_title": "Yarn"
"integration_version": "5.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "yarn"
"public_title": "Yarn"
"short_description": "Collect cluster-wide health metrics and track application progress."
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
  "description": "Collect cluster-wide health metrics and track application progress."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Yarn"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Hadoop Yarn][1]

## Overview

This check collects metrics from your YARN ResourceManager, including (but not limited to):

- Cluster-wide metrics, such as number of running apps, running containers, unhealthy nodes, and more.
- Per-application metrics, such as app progress, elapsed running time, running containers, memory use, and more.
- Node metrics, such as available vCores, time of last health update, and more.

### Deprecation notice

`yarn.apps.<METRIC>` metrics are deprecated in favor of `yarn.apps.<METRIC>_gauge` metrics because `yarn.apps` metrics are incorrectly reported as a `RATE` instead of a `GAUGE`.

## Setup

### Installation

The YARN check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your YARN ResourceManager.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `yarn.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1].

   ```yaml
   init_config:

   instances:
     ## @param resourcemanager_uri - string - required
     ## The YARN check retrieves metrics from YARNS's ResourceManager. This
     ## check must be run from the Master Node and the ResourceManager URI must
     ## be specified below. The ResourceManager URI is composed of the
     ## ResourceManager's hostname and port.
     ## The ResourceManager hostname can be found in the yarn-site.xml conf file
     ## under the property yarn.resourcemanager.address
     ##
     ## The ResourceManager port can be found in the yarn-site.xml conf file under
     ## the property yarn.resourcemanager.webapp.address
     #
     - resourcemanager_uri: http://localhost:8088

       ## @param cluster_name - string - required - default: default_cluster
       ## A friendly name for the cluster.
       #
       cluster_name: default_cluster
   ```

    See the [example check configuration][2] for a comprehensive list and description of all check options.

2. [Restart the Agent][3] to start sending YARN metrics to Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `yarn`                                                                                  |
| `<INIT_CONFIG>`      | blank or `{}`                                                                           |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "http://%%host%%:%%port%%", "cluster_name": "<CLUSTER_NAME>"}` |

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Uncomment and edit the logs configuration block in your `yarn.d/conf.yaml` file. Change the `type`, `path`, and `service` parameter values based on your environment. See the [sample yarn.d/conf.yaml][2] for all available configuration options.

    ```yaml
    logs:
      - type: file
        path: <LOG_FILE_PATH>
        source: yarn
        service: <SERVICE_NAME>
        # To handle multi line that starts with yyyy-mm-dd use the following pattern
        # log_processing_rules:
        #   - type: multi_line
        #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
        #     name: new_log_start_with_date
    ```

3. [Restart the Agent][3].

To enable logs for Docker environments, see [Docker Log Collection][4].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

Run the [Agent's status subcommand][3] and look for `yarn` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "yarn" >}}


### Events

The Yarn check does not include any events.

### Service Checks
{{< get-service-checks-from-git "yarn" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

- [Hadoop architectural overview][5]
- [How to monitor Hadoop metrics][6]
- [How to collect Hadoop metrics][7]
- [How to monitor Hadoop with Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/yarn/images/yarn_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
