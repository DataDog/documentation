---
"app_id": "activemq"
"app_uuid": "ab0b15e8-b7ae-4570-bde2-433a079cdb83"
"assets":
  "dashboards":
    "activemq": "assets/dashboards/activemq_dashboard.json"
    "artemis": "assets/dashboards/artemis_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "activemq.queue.size"
      - "activemq.artemis.queue.message_count"
      "metadata_path": "metadata.csv"
      "prefix": "activemq."
    "process_signatures":
    - "activemq"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "40"
    "source_type_name": "ActiveMQ"
  "monitors":
    "[ActiveMQ Artemis] High disk store usage": "assets/monitors/activemq_artemis_high_disk_store.json"
    "[ActiveMQ Artemis] High unrouted messages": "assets/monitors/activemq_artemis_unrouted_messages.json"
  "saved_views":
    "activemq_processes": "assets/saved_views/activemq_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "message queues"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/activemq/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "activemq"
"integration_id": "activemq"
"integration_title": "ActiveMQ"
"integration_version": "3.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "activemq"
"public_title": "ActiveMQ"
"short_description": "Collect metrics for brokers and queues, producers and consumers, and more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Message Queues"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Collect metrics for brokers and queues, producers and consumers, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "ActiveMQ"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The ActiveMQ check collects metrics for brokers, queues, producers, consumers, and more.

**Note:** This check also supports ActiveMQ Artemis (future ActiveMQ version `6`) and reports metrics under the `activemq.artemis` namespace. See [metadata.csv][1] for a list of metrics provided by this integration.

**Note**: If you are running an ActiveMQ version older than 5.8.0, see the [Agent 5.10.x released sample files][2].

## Setup

### Installation

The Agent's ActiveMQ check is included in the [Datadog Agent][3] package, so you don't need to install anything else on your ActiveMQ nodes.

The check collects metrics from JMX with [JMXFetch][4]. A JVM is needed on each node so the Agent can run JMXFetch. Datadog recommends using an Oracle-provided JVM.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. **Make sure that [JMX Remote is enabled][1] on your ActiveMQ server.**
2. Configure the Agent to connect to ActiveMQ. Edit `activemq.d/conf.yaml`, in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample activemq.d/conf.yaml][3] for all available configuration options. See the [`metrics.yaml` file][4] for the list of default collected metrics.

   ```yaml
   init_config:
     is_jmx: true
     collect_default_metrics: true

   instances:
     - host: localhost
       port: 1616
       user: username
       password: password
       name: activemq_instance
   ```

3. [Restart the agent][5]

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `activemq.d/conf.yaml` file to start collecting your ActiveMQ logs:

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [Restart the Agent][5].

[1]: https://activemq.apache.org/jmx.html
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `activemq`                           |
| `<INIT_CONFIG>`      | `"is_jmx": true`                     |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%","port":"1099"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "activemq", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=containeragent
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][5] and look for `activemq` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "activemq" >}}
 Metrics associated with ActiveMQ Artemis flavor have `artemis` in their metric name, all others are reported for ActiveMQ "classic".

### Events

The ActiveMQ check does not include any events.

### Service Checks
{{< get-service-checks-from-git "activemq" >}}


## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

Additional helpful documentation, links, and articles:

- [ActiveMQ architecture and key metrics][7]
- [Monitor ActiveMQ metrics and performance][8]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## ActiveMQ XML Integration

## Overview

Get metrics from ActiveMQ XML in real time to:

- Visualize and monitor ActiveMQ XML states.
- Be notified about ActiveMQ XML failovers and events.

## Setup

### Installation

The ActiveMQ XML check is included in the [Datadog Agent][3] package, so you don't need to install anything else on your servers.

### Configuration

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

To configure this check for an Agent running on a host:

1. Edit `activemq_xml.d/conf.yaml`, in the `conf.d/` folder at the root of your [Agent's configuration directory][9] with your stats `url`. See the [sample activemq_xml.d/conf.yaml][10] for all available configuration options.

   **Note**: The ActiveMQ XML integration can potentially emit [custom metrics][11], which may impact your [billing][12]. By default, there is a limit of 350 metrics. If you require additional metrics, contact [Datadog support][6].

2. [Restart the Agent][13].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `activemq_xml.d/conf.yaml` or `activemq.d/conf.yaml` file to start collecting your ActiveMQ logs:

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [Restart the Agent][13].

<!-- xxz tab xxx -->
<!-- xxx tab "Containerized" xxx -->

#### Containerized

For containerized environments, see the [Autodiscovery with JMX][14] guide.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Run the Agent's status subcommand][5] and look for `activemq_xml` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "activemq_xml" >}}


### Events

The ActiveMQ XML check does not include any events.

### Service Checks

The ActiveMQ XML check does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

- [Monitor ActiveMQ metrics and performance][8]


[1]: https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv
[2]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/jmxfetch
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
[8]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[9]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example
[11]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[12]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
[13]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
