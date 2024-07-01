---
"app_id": "rabbitmq"
"app_uuid": "a10b582b-71ef-4773-b7b8-b7751c724620"
"assets":
  "dashboards":
    "rabbitmq": "assets/dashboards/rabbitmq_dashboard.json"
    "rabbitmq_screenboard": "assets/dashboards/rabbitmq_screenboard_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "rabbitmq.queue.messages"
      "metadata_path": "metadata.csv"
      "prefix": "rabbitmq."
    "process_signatures":
    - "rabbitmq"
    - "rabbitmq-server"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "51"
    "source_type_name": "RabbitMQ"
  "monitors":
    "consumers_at_zero": "assets/monitors/consumers_at_zero.json"
    "disk_usage": "assets/monitors/disk_usage.json"
    "disk_usage_prometheus": "assets/monitors/disk_usage_prometheus.json"
    "message_ready": "assets/monitors/message_ready.json"
    "message_unack_prometheus": "assets/monitors/message_unack_prometheus.json"
    "message_unacknowledge_rate_anomaly": "assets/monitors/message_unacknowledge_rate_anomaly.json"
  "saved_views":
    "pid_overview": "assets/saved_views/status_overview.json"
    "rabbitmq_pattern": "assets/saved_views/rabbitmq_pattern.json"
    "rabbitmq_processes": "assets/saved_views/rabbitmq_processes.json"
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
- "https://github.com/DataDog/integrations-core/blob/master/rabbitmq/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rabbitmq"
"integration_id": "rabbitmq"
"integration_title": "RabbitMQ"
"integration_version": "5.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "rabbitmq"
"public_title": "RabbitMQ"
"short_description": "Track queue size, consumer count, unacknowledged messages, and more."
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
  "description": "Track queue size, consumer count, unacknowledged messages, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "RabbitMQ"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![RabbitMQ Dashboard][1]

## Overview

This check monitors [RabbitMQ][2] through the Datadog Agent. It allows you to:

- Track queue-based stats: queue size, consumer count, unacknowledged messages, redelivered messages, and more.
- Track node-based stats: waiting processes, used sockets, used file descriptors, and more.
- Monitor vhosts for aliveness and number of connections.

## Setup

### Installation

The RabbitMQ check is included in the [Datadog Agent][3] package. No additional installation is needed on your server.

### Configuration

RabbitMQ exposes metrics in two ways: the [RabbitMQ Management Plugin][4] and the [RabbitMQ Prometheus Plugin][5]. The Datadog integration supports both versions. Follow the configuration instruction in this file that pertain to the version you intend to use. The Datadog integration also comes with an out-of-the-box dashboard and monitors for each version, as labeled by the Dashboard and Monitor titles.

#### Prepare RabbitMQ

##### [RabbitMQ Prometheus Plugin][5].

*Starting with RabbitMQ v3.8, the [RabbitMQ Prometheus Plugin][5] is enabled by default.*

*The Prometheus plugin version of RabbitMQ requires Python 3 support by the Datadog Agent, and so can only be supported by Agent v6 or later. Please ensure your agent is updated before configuring the Prometheus plugin version of the integration.*

Configure the `prometheus_plugin` section in your instance configuration. When using the `prometheus_plugin` option, settings related to the Management Plugin are ignored.

 ```yaml
 instances:
   - prometheus_plugin:
       url: http://<HOST>:15692
 ```

 This enables scraping of the [`/metrics` endpoint][6] on one RabbitMQ node. Datadog can also collect data from the [`/metrics/detailed` endpoint][7].

 ```yaml
 instances:
   - prometheus_plugin:
       url: http://<HOST>:15692
       unaggregated_endpoint: detailed?family=queue_coarse_metrics
 ```
 This enables scraping of the [`/metrics/detailed` endpoint][7] to collect queue coarse metrics.

##### [RabbitMQ Management Plugin][4].

Enable the plugin. The Agent user then needs at least the `monitoring` tag and these required permissions:

| Permission | Command            |
| ---------- | ------------------ |
| **conf**   | `^aliveness-test$` |
| **write**  | `^amq\.default$`   |
| **read**   | `.*`               |

Create an Agent user for your default vhost with the following commands:

```text
rabbitmqctl add_user datadog <SECRET>
rabbitmqctl set_permissions  -p / datadog "^aliveness-test$" "^amq\.default$" ".*"
rabbitmqctl set_user_tags datadog monitoring
```

Here, `/` refers to the default host. Set this to your specified virtual host name. See the [RabbitMQ documentation][8] for more information.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `rabbitmq.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your RabbitMQ metrics. See the [sample rabbitmq.d/conf.yaml][2] for all available configuration options.

    **Note**: The Agent checks all queues, vhosts, and nodes by default, but you can provide lists or regexes to limit this. See the [rabbitmq.d/conf.yaml][2] for examples.

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. To modify the default log file location either set the `RABBITMQ_LOGS` environment variable or add the following to your RabbitMQ configuration file (`/etc/rabbitmq/rabbitmq.conf`):

   ```conf
     log.dir = /var/log/rabbit
     log.file = rabbit.log
   ```

2. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

3. Edit the `logs` section of your `rabbitmq.d/conf.yaml` file to start collecting your RabbitMQ logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/rabbit/*.log
       source: rabbitmq
       service: myservice
       log_processing_rules:
         - type: multi_line
           name: logs_starts_with_equal_sign
           pattern: "="
   ```

4. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

You can take advantage of Datadog's [Docker container Autodiscovery][1], see the `auto_conf.yaml` example configuration for RabbitMQ-specific settings.

For container environments such as Kubernetes, see the [Autodiscovery Integration Templates][2] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `rabbitmq`                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                |
| `<INSTANCE_CONFIG>`  | `{"prometheus_plugin": {"url": "http://%%host%%:15692"}}` |

##### Log collection

_Available for Agent v6.0 or later_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][3].

| Parameter      | Value                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "rabbitmq", "service": "rabbitmq", "log_processing_rules": [{"type":"multi_line","name":"logs_starts_with_equal_sign", "pattern": "="}]}` |

[1]: https://docs.datadoghq.com/containers/docker/integrations/?tab=dockeradv2
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][9] and look for `rabbitmq` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "rabbitmq" >}}


### Events

### Service Checks
{{< get-service-checks-from-git "rabbitmq" >}}


## Troubleshooting

### Migrating to Prometheus Plugin

The Prometheus Plugin exposes a different set of metrics from the Management Plugin.
Here is what to be aware of as you migrate from the Management to the Prometheus Plugin.

- Look up your metrics in [this table][10]. If a metric's description contains an `[OpenMetricsV2]` tag, then it is available in the Prometheus Plugin. Metrics available only in the Management Plugin do not have any tags in their descriptions.
- Any dashboards and monitors using Management Plugin metrics do not function. Switch to the dashboards and monitors marked as *OpenMetrics Version*.
- The default configuration collects aggregated metrics. This means, for example, that there are no metrics tagged by queue. Configure the option `prometheus_plugin.unaggregated_endpoint` to get metrics without aggregation.
- The `rabbitmq.status` service check is replaced by `rabbitmq.openmetrics.health`. The service check `rabbitmq.aliveness` has no equivalent in the Prometheus Plugin.

The Prometheus Plugin changes some tags. The table below describes the changes to the more common tags.

| Management          | Prometheus                               |
|:--------------------|:-----------------------------------------|
| `queue_name`        | `queue`                                  |
| `rabbitmq_vhost`    | `vhost`, `exchange_vhost`, `queue_vhost` |
| `rabbitmq_exchange` | `exchange`                               |

For more information, see [Tagging RabbitMQ queues by tag family][11].

Need help? Contact [Datadog support][12].

## Further Reading

Additional helpful documentation, links, and articles:

- [Key metrics for RabbitMQ monitoring][13]
- [Collecting metrics with RabbitMQ monitoring tools][14]
- [Monitoring RabbitMQ performance with Datadog][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png
[2]: https://www.rabbitmq.com
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.rabbitmq.com/management.html
[5]: https://www.rabbitmq.com/prometheus.html
[6]: https://www.rabbitmq.com/prometheus.html#default-endpoint
[7]: https://www.rabbitmq.com/prometheus.html#detailed-endpoint
[8]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/integrations/rabbitmq/?tab=host#metrics
[11]: https://docs.datadoghq.com/integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[12]: https://docs.datadoghq.com/help/
[13]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[14]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[15]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
