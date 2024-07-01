---
"app_id": "cassandra"
"app_uuid": "a930364f-ac97-4483-92d6-5a982da7b1c0"
"assets":
  "dashboards":
    "cassandra-overview": "assets/dashboards/cassandra_overview.json"
    "cassandra-overview-screenboard": "assets/dashboards/cassandra_overview_screenboard.json"
    "cassandra-read": "assets/dashboards/cassandra_read.json"
    "cassandra-sstables": "assets/dashboards/cassandra_sstable.json"
    "cassandra-write": "assets/dashboards/cassandra_write.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "cassandra.load.count"
      "metadata_path": "metadata.csv"
      "prefix": "cassandra."
    "process_signatures":
    - "java org.apache.cassandra.service.CassandraDaemon"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "33"
    "source_type_name": "Cassandra"
  "saved_views":
    "cassandra_processes": "assets/saved_views/cassandra_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "data stores"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cassandra"
"integration_id": "cassandra"
"integration_title": "Cassandra"
"integration_version": "1.18.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "cassandra"
"public_title": "Cassandra"
"short_description": "Track cluster performance, capacity, overall health, and much more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track cluster performance, capacity, overall health, and much more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Cassandra"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Cassandra default dashboard][1]

## Overview

Get metrics from Cassandra in real time to:

- Visualize and monitor Cassandra states.
- Be notified about Cassandra failovers and events.

## Setup

### Installation

The Cassandra check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Cassandra nodes. It's recommended to use Oracle's JDK for this integration.

**Note**: This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page][3]. You can specify the metrics you are interested in by editing the configuration below. To learn how to customize the metrics to collect see the [JMX documentation][4] for detailed instructions. If you need to monitor more metrics, contact [Datadog support][5].

### Configuration

##### Metric collection

1. The default configuration of your `cassandra.d/conf.yaml` file activate the collection of your [Cassandra metrics](#metrics). See the [sample cassandra.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7].

##### Log collection

_Available for Agent versions >6.0_

For containerized environments, follow the instructions on the [Kubernetes Log Collection][8] or [Docker Log Collection][9] pages.

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `cassandra.d/conf.yaml` file to start collecting your Cassandra logs:

   ```yaml
     logs:
       - type: file
         path: /var/log/cassandra/*.log
         source: cassandra
         service: myapplication
         log_processing_rules:
            - type: multi_line
              name: log_start_with_date
              # pattern to match: DEBUG [ScheduledTasks:1] 2019-12-30
              pattern: '[A-Z]+ +\[[^\]]+\] +\d{4}-\d{2}-\d{2}'
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample cassandra.d/conf.yaml][6] for all available configuration options.

    To make sure that stacktraces are properly aggregated as one single log, a [multiline processing rule][10] can be added.

3. [Restart the Agent][7].

### Validation

[Run the Agent's status subcommand][3] and look for `cassandra` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "cassandra" >}}


### Events

The Cassandra check does not include any events.

### Service Checks
{{< get-service-checks-from-git "cassandra" >}}


## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

- [How to monitor Cassandra performance metrics][11]
- [How to collect Cassandra metrics][12]
- [Monitoring Cassandra with Datadog][13]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Cassandra Nodetool Integration

![Cassandra default dashboard][14]

## Overview

This check collects metrics for your Cassandra cluster that are not available through [jmx integration][15]. It uses the `nodetool` utility to collect them.

## Setup

### Installation

The Cassandra Nodetool check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Cassandra nodes.

### Configuration

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

1. Edit the file `cassandra_nodetool.d/conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][16]. See the [sample cassandra_nodetool.d/conf.yaml][17] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param keyspaces - list of string - required
     ## The list of keyspaces to monitor.
     ## An empty list results in no metrics being sent.
     #
     - keyspaces:
         - "<KEYSPACE_1>"
         - "<KEYSPACE_2>"
   ```

2. [Restart the Agent][7].

#### Log collection

Cassandra Nodetool logs are collected by the Cassandra integration. See the [log collection instructions for Cassandra][18].

<!-- xxz tab xxx -->
<!-- xxx tab "Containerized" xxx -->

#### Containerized

For containerized environments, use the official [Prometheus exporter][19] in the pod, and then use Autodiscovery in the Agent to find the pod and query the endpoint.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Run the Agent's `status` subcommand][3] and look for `cassandra_nodetool` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "cassandra_nodetool" >}}


### Events

The Cassandra_nodetool check does not include any events.

### Service Checks
{{< get-service-checks-from-git "cassandra_nodetool" >}}


## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

- [How to monitor Cassandra performance metrics][11]
- [How to collect Cassandra metrics][12]
- [Monitoring Cassandra with Datadog][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard_2.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/integrations/java/
[5]: https://docs.datadoghq.com/help/
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/containers/kubernetes/log/
[9]: https://docs.datadoghq.com/containers/docker/log/
[10]: https://docs.datadoghq.com/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[11]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[12]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[13]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
[14]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard_2.png
[15]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[16]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[17]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[18]: https://github.com/DataDog/integrations-core/tree/master/cassandra#log-collection
[19]: https://github.com/prometheus/jmx_exporter
