---
"app_id": "hive"
"app_uuid": "827ff57e-83db-45b4-8a59-2f0270d389e8"
"assets":
  "dashboards":
    "Hive Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": hive.server.memory.total.used
      "metadata_path": metadata.csv
      "prefix": hive.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10062"
    "source_type_name": Hive
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/hive/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "hive"
"integration_id": "hive"
"integration_title": "Hive"
"integration_version": "1.10.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "hive"
"public_title": "Hive"
"short_description": "Gathers various JMX metrics from HiveServer2 and Hive MetaStore"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Gathers various JMX metrics from HiveServer2 and Hive MetaStore
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Hive
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors two parts of [Hive][1]: Hive Metastore and HiveServer2.

## Setup

### Installation

The Hive check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### Configuration

#### Hive setup

1. Edit the Hive configuration file in [`HIVE_HOME/conf/hive-site.xml`][3] to enable the Hive Metastore and HiveServer2 metrics by adding these properties:

   ```xml
   <property>
     <name>hive.metastore.metrics.enabled</name>
     <value>true</value>
   </property>
   <property>
     <name>hive.server2.metrics.enabled</name>
     <value>true</value>
   </property>
   ```

2. Enable a JMX remote connection for the HiveServer2 and/or for the Hive Metastore. For example, set the `HADOOP_CLIENT_OPTS` environment variable:

   ```conf
   export HADOOP_CLIENT_OPTS="$HADOOP_CLIENT_OPTS -Dcom.sun.management.jmxremote \
   -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false \
   -Dcom.sun.management.jmxremote.port=8808"
   ```

   Then restart the HiveServer2 or the Hive Metastore. Hive Metastore and HiveServer2 cannot share the same JMX connection.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

##### Metric collection

1. Edit the `hive.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your hive performance data. See the [sample hive.d/conf.yaml][1] for all available configuration options.

    This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page][2]. You can specify the metrics you are interested in by editing the configuration below.
    To learn how to customize the metrics to collect, see the [JMX Checks documentation][3] for more detailed instructions. If you need to monitor more metrics, contact [Datadog support][4].

2. [Restart the Agent][5].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `hive.d/conf.yaml` file to start collecting your Hive logs:

   ```yaml
     logs:
       - type: file
         path: /tmp/<USER>/hive.log
         source: hive
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample hive.d/conf.yaml][1] for all available configuration options.

3. [Restart the Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/integrations/java/
[4]: https://docs.datadoghq.com/help/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

To collect metrics with the Datadog-Hive integration, see the [Autodiscovery with JMX][2] guide.

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][3].

| Parameter      | Value                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hive", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][4] and look for `Hive` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "hive" >}}


### Events

The Hive check does not include any events.

### Service Checks
{{< get-service-checks-from-git "hive" >}}


## Troubleshooting

Need help? Contact [Datadog support][5].


[1]: https://cwiki.apache.org/confluence/display/Hive/Home
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Metrics
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
