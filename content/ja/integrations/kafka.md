---
"app_id": "kafka"
"app_uuid": "39640d5e-54be-48ff-abf1-8871499e2fd3"
"assets":
  "dashboards":
    "kafka": "assets/dashboards/kafka_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "kafka.net.bytes_out"
      - "kafka.net.bytes_out.rate"
      "metadata_path": "metadata.csv"
      "prefix": "kafka."
    "process_signatures":
    - "java kafka.kafka"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "64"
    "source_type_name": "Kafka"
  "monitors":
    "[Kafka] High produce latency on broker": "assets/monitors/broker_produce_latency.json"
    "[Kafka] High producer request rate": "assets/monitors/kafka_high_producer_request_rate.json"
    "[Kafka] Offline partition": "assets/monitors/kafka_offline_partition.json"
  "saved_views":
    "error_warning_status": "assets/saved_views/error_warning_status.json"
    "kafka_patterns": "assets/saved_views/kafka_patterns.json"
    "kafka_processes": "assets/saved_views/kafka_processes.json"
    "logger_overview": "assets/saved_views/logger_overview.json"
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
- "https://github.com/DataDog/integrations-core/blob/master/kafka/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kafka"
"integration_id": "kafka"
"integration_title": "Kafka Broker"
"integration_version": "2.16.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "kafka"
"public_title": "Kafka Broker"
"short_description": "Collect metrics for producers and consumers, replication, max lag, and more."
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
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": "Collect metrics for producers and consumers, replication, max lag, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Kafka Broker"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kafka Dashboard][1]

## Overview

View Kafka broker metrics collected for a 360-view of the health and performance of your Kafka clusters in real time. With this integration, you can collect metrics and logs from your Kafka deployment to visualize telemetry and alert on the performance of your Kafka stack. 

If you would benefit from visualizing the topology of your streaming data pipelines and identifying the root cause of bottlenecks, learn more about [Data Streams Monitoring][2].

**Note**: 
- This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in the Agent status output. Specify the metrics you are interested in by editing the configuration below. For more detailed instructions on customizing the metrics to collect, see the [JMX Checks documentation][3].
- This integration attached sample configuration works only for Kafka >= 0.8.2.
If you are running a version older than that, see the [Agent v5.2.x released sample files][4].
- To collect Kafka consumer metrics, see the [kafka_consumer check][5].

## Setup

### Installation

The Agent's Kafka check is included in the [Datadog Agent][6] package, so you don't need to install anything else on your Kafka nodes.

The check collects metrics from JMX with [JMXFetch][7]. A JVM is needed on each kafka node so the Agent can run JMXFetch. The same JVM that Kafka uses can be used for this.

**Note**: The Kafka check cannot be used with Managed Streaming for Apache Kafka (Amazon MSK). Use the [Amazon MSK integration][8] instead.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `kafka.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. Kafka bean names depend on the exact Kafka version you're running. Use the [example configuration file][2] that comes packaged with the Agent as a base since it is the most up-to-date configuration. **Note**: the Agent version in the example may be for a newer version of the Agent than what you have installed.

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Kafka uses the `log4j` logger by default. To activate logging to a file and customize the format edit the `log4j.properties` file:

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/kafka/server.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
   ```

2. By default, the Datadog integration pipeline supports the following conversion patterns:

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
     [%d] %p %m (%c)%n
   ```

    Clone and edit the [integration pipeline][4] if you have a different format.

3. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

4. Add the following configuration block to your `kafka.d/conf.yaml` file. Change the `path` and `service` parameter values based on your environment. See the [sample kafka.d/conf.yaml][2] for all available configuration options.

   ```yaml
   logs:
     - type: file
       path: /var/log/kafka/server.log
       source: kafka
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

5. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

##### Metric collection

For containerized environments, see the [Autodiscovery with JMX][1] guide.

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kafka", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][9] and look for `kafka` under the **JMXFetch** section:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    kafka
      instance_name : kafka-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Data Collected

### Metrics
{{< get-metrics-from-git "kafka" >}}


### Events

The Kafka check does not include any events.

### Service Checks
{{< get-service-checks-from-git "kafka" >}}


## Troubleshooting

- [Troubleshooting and Deep Dive for Kafka][10]
- [Agent failed to retrieve RMIServer stub][11]

## Further Reading

- [Monitoring Kafka performance metrics][12]
- [Collecting Kafka performance metrics][13]
- [Monitoring Kafka with Datadog][14]
- [Kafka Overview on the Knowledge Center][15]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Kafka Consumer Integration

![Kafka Dashboard][16]

## Overview

This Agent integration collects message offset metrics from your Kafka consumers. This check fetches the highwater offsets from the Kafka brokers, consumer offsets that are stored in Kafka (or Zookeeper for old-style consumers), and then calculates consumer lag (which is the difference between the broker offset and the consumer offset).

If you would benefit from visualizing the topology of your streaming data pipelines and identifying the root cause of bottlenecks, learn more about [Data Streams Monitoring][2].

**Note:** 
- This integration ensures that consumer offsets are checked before broker offsets; in the worst case, consumer lag may be a little overstated. Checking these offsets in the reverse order can understate consumer lag to the point of having negative values, which is a dire scenario usually indicating messages are being skipped.
- If you want to collect JMX metrics from your Kafka brokers or Java-based consumers/producers, see the [Kafka Broker integration][17].


## Setup

### Installation

The Agent's Kafka consumer check is included in the [Datadog Agent][6] package. No additional installation is needed on your Kafka nodes.

### Configuration

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### Host

To configure this check for an Agent running on a host running your Kafka consumers:

##### Metric collection

1. Edit the `kafka_consumer.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][18]. See the [sample kafka_consumer.d/conf.yaml][19] for all available configuration options.

2. [Restart the Agent][20].

##### Log collection

This check does not collect additional logs. To collect logs from Kafka brokers, see [log collection instructions for Kafka][21].

<!-- xxz tab xxx -->
<!-- xxx tab "Containerized" xxx -->

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][22] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `kafka_consumer`                     |
| `<INIT_CONFIG>`      | blank or `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"kafka_connect_str": <KAFKA_CONNECT_STR>}` <br/>For example, `{"kafka_connect_str": "server:9092"}` |

##### Log collection

This check does not collect additional logs. To collect logs from Kafka brokers, see [log collection instructions for Kafka][21].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Validation

[Run the Agent's status subcommand][9] and look for `kafka_consumer` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "kafka_consumer" >}}


### Events

**consumer_lag**:<br>
The Datadog Agent emits an event when the value of the `consumer_lag` metric goes below 0, tagging it with `topic`, `partition` and `consumer_group`.

### Service Checks

The Kafka-consumer check does not include any service checks.

## Troubleshooting

- [Troubleshooting and Deep Dive for Kafka][10]
- [Agent failed to retrieve RMIServer stub][11]

**Kerberos GSSAPI Authentication**

Depending on your Kafka cluster's Kerberos setup, you may need to configure the following:

* Kafka client configured for the Datadog Agent to connect to the Kafka broker. The Kafka client should be added as a Kerberos principal and added to a Kerberos keytab. The Kafka client should also have a valid kerberos ticket. 
* TLS certificate to authenticate a secure connection to the Kafka broker.
  * If JKS keystore is used, a certificate needs to be exported from the keystore and the file path should be configured with the applicable `tls_cert` and/or `tls_ca_cert` options. 
  * If a private key is required to authenticate the certificate, it should be configured with the `tls_private_key` option. If applicable, the private key password should be configured with the `tls_private_key_password`. 
* `KRB5_CLIENT_KTNAME` environment variable pointing to the Kafka client's Kerberos keytab location if it differs from the default path (for example, `KRB5_CLIENT_KTNAME=/etc/krb5.keytab`)
* `KRB5CCNAME` environment variable pointing to the Kafka client's Kerberos credentials ticket cache if it differs from the default path (for example, `KRB5CCNAME=/tmp/krb5cc_xxx`)
* If the Datadog Agent is unable to access the environment variables, configure the environment variables in a Datadog Agent service configuration override file for your operating system. The procedure for modifying the Datadog Agent service unit file may vary for different Linux operating systems. For example, in a Linux `systemd` environment: 

**Linux Systemd Example**

1. Configure the environment variables in an environment file.
   For example: `/path/to/environment/file`

  ```
  KRB5_CLIENT_KTNAME=/etc/krb5.keytab
  KRB5CCNAME=/tmp/krb5cc_xxx
  ```

2. Create a Datadog Agent service configuration override file: `sudo systemctl edit datadog-agent.service`

3. Configure the following in the override file:

  ```
  [Service]
  EnvironmentFile=/path/to/environment/file
  ```

4. Run the following commands to reload the systemd daemon, datadog-agent service, and Datadog Agent:

```
sudo systemctl daemon-reload
sudo systemctl restart datadog-agent.service
sudo service datadog-agent restart
```

## Further Reading

- [Monitoring Kafka performance metrics][12]
- [Collecting Kafka performance metrics][13]
- [Monitoring Kafka with Datadog][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png
[2]: https://www.datadoghq.com/product/data-streams-monitoring/
[3]: https://docs.datadoghq.com/integrations/java/
[4]: https://raw.githubusercontent.com/DataDog/dd-agent/5.2.1/conf.d/kafka.yaml.example
[5]: https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/jmxfetch
[8]: https://docs.datadoghq.com/integrations/amazon_msk/#pagetitle
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[11]: https://docs.datadoghq.com/integrations/guide/agent-failed-to-retrieve-rmiserver-stub/
[12]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[13]: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
[14]: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
[15]: https://www.datadoghq.com/knowledge-center/apache-kafka/
[16]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png
[17]: https://app.datadoghq.com/integrations/kafka?search=kafka
[18]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[19]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
[20]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[21]: https://docs.datadoghq.com/integrations/kafka/#log-collection
[22]: https://docs.datadoghq.com/containers/kubernetes/integrations/
