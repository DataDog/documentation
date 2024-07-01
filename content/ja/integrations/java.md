---
"categories":
- "languages"
- "network"
- "oracle"
- "tracing"
"custom_kind": "integration"
"dependencies": []
"description": "Collect custom metrics from your applications using the Yammer Metrics library."
"doc_link": "https://docs.datadoghq.com/integrations/java/"
"draft": false
"further_reading":
- "link": "https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect"
  "tag": "FAQ"
  "text": "I Have a Matching Bean for my JMX integration but nothing on Collect!"
- "link": "https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/"
  "tag": "FAQ"
  "text": "View JMX data in jConsole and set up your jmx.yaml to collect them"
- "link": "https://docs.datadoghq.com/integrations/faq/jmx-yaml-error-include-section/"
  "tag": "FAQ"
  "text": "jmx.yaml error: Include Section"
- "link": "https://docs.datadoghq.com/integrations/faq/collecting-composite-type-jmx-attributes/"
  "tag": "FAQ"
  "text": "Collecting Composite type JMX attributes"
- "link": "https://docs.datadoghq.com/integrations/guide/running-jmx-commands-in-windows/"
  "tag": "Guide"
  "text": "Running JMX commands in Windows"
- "link": "https://docs.datadoghq.com/integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags/"
  "tag": "Guide"
  "text": "Use Bean regexes to filter your JMX metrics and supply additional tags"
"git_integration_title": "java"
"has_logo": true
"integration_id": "java"
"integration_title": "JMX"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "java"
"public_title": "Datadog-JMX Integration"
"short_description": "Collect custom metrics from your applications using the Yammer Metrics library."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Java integration allows you to collect metrics, traces, and logs from your Java application.

## Setup

### Metric collection
<div class="alert alert-warning">
JMX checks have a limit of 350 metrics per instance. See <a href="/integrations/java/?tab=host#configuration-options">configuration options</a>. If you require additional metrics, contact <a href="https://docs.datadoghq.com/help/">Datadog support.</a>
</div>

If your application exposes [JMX][1] metrics, a lightweight Java plugin named JMXFetch (only compatible with Java >= 1.7.) is called by the Datadog Agent to connect to the MBean Server and collect your application metrics. It also sends service checks that report on the status of your monitored instances. This plugin sends metrics to the Datadog Agent using the [DogStatsD][2] server running within the Agent. These integrations also use the JMX metrics:

- ActiveMQ
- Cassandra
- Solr
- Tomcat
- Kafka

**Note**: When submitting a RATE metric type through DogStatsD, the metric appears as a GAUGE in-app to ensure relevant comparison across different Agents. For more information, see the [Metric Submission: DogStatsD documentation][3].

#### Installation

Make sure [you can open a JMX remote connection][4]. A remote connection is required for the Datadog Agent to connect to the JVM, even when the two are on the same host. For security reasons, it is recommended not to use `0.0.0.0` for the listening address, and using `com.sun.management.jmxremote.host=127.0.0.1` for a colocated JVM and Agent is recommended.

#### Configuration

If running the Agent as a binary on a host, configure your JMX check as any [other Agent integrations][5]. If running the Agent as a DaemonSet in Kubernetes, configure your JMX check using [auto-discovery][6].

{{< tabs >}}
{{% tab "Host" %}}

- Configure the Agent to connect to JMX. Edit `jmx.d/conf.yaml` in the `conf.d/` folder at the root of your [Agent’s configuration directory][1]. Reference the [configuration options](#configuration-options) below or see the [init_config][2] and [instance][3] templates for all available configuration options.

    ```yaml
      init_config:
        is_jmx: true
        collect_default_metrics: true
        # custom_jar_paths:
        #  - <CUSTOM_JAR_FILE_PATH>.jar

      instances:
        - host: localhost
          port: port
          user: username
          password: password
          name: jmx_instance_name
    ```

- [Restart the Agent][4]

**Note**: To run more than one JMX check, create configuration files with the format `jmx_<INDEX>.d/conf.yaml`, for example:`jmx_1.d/conf.yaml`, `jmx_2.d/conf.yaml`, etc. Each folder should be stored in the `conf.d` directory. with the `is_jmx` option set to `true` in the configuration file.


[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/instances/jmx.yaml
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

The standard `gcr.io/datadoghq/agent:latest` image for running the [Datadog Agent container][1] does not have JMX installed. **Use the `gcr.io/datadoghq/agent:latest-jmx` image**, this image is based on `gcr.io/datadoghq/agent:latest`, but it includes a JVM, which the Agent needs to run [jmxfetch][2].

To run a JMX Check against one of your container:

1. Create a JMX check configuration file by referring to the [Host](?tab=host), or by using a JMX check configuration file for one of Datadog officially supported JMX integration:

    - [ActiveMQ][2]
    - [Cassandra][3]
    - [Solr][4]
    - [Tomcat][5]
    - [Kafka][6]

2. Mount this file inside the `conf.d/` folder of your Datadog Agent: `-v <HOST_FOLDER_PATH>:/conf.d`. See the [Setting up Check Templates][7] documentation to learn more.

**Note**: Using `%%port%%` has proven problematic in practice. If you experience an issue, the best workaround is to replace `%%port%%` with a hard-coded JMX port.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/docker/integrations/?tab=file#configuration
{{% /tab %}}
{{< /tabs >}}

##### Configuration options

| Option                                        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `custom_jar_paths`                            | No       | Allows specifying custom jars that are added to the classpath of the Agent's JVM.                                                                                                                                                                                                                                                                                                                                       |
| `jmx_url`                                     | No       | If the Agent needs to connect to a non-default JMX URL, specify it here instead of a host and port. If you use this you need to specify a `name` for the instance.                                                                                                                                                                                                                                                      |
| `is_jmx`                                      | No       | Allows creating different configuration files for each application rather than using a single long JMX file. Include the option in each configuration file as explained in the note from the [Configuration](#configuration) section.                                                                                                                                                                                   |
| `collect_default_jvm_metrics`                 | No       | Instructs the integration to collect the default JVM metrics (`jvm.*`). Default is true. </br>      **Note**: If you are using an integration that doesn't need JMX specific metrics, set `collect_default_jvm_metrics: false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `collect_default_metrics`                     | No       | Each integration contains a `metrics.yaml` file that contains a list of default beans to collect. Setting this to `True` automatically collects those metrics without explicitly adding them to the yaml file. This is typically used for setting up the configuration with Autodiscovery to reduce the size of the configuration object. This is not applicable to collecting [JMX metrics with the Java Tracing Agent][7]. |
| `java_bin_path`                               | No       | Specify the path to your Java executable or binary if the Agent cannot find it, for example: `C:/path/to/java.exe` or `/etc/alternatives/java`                                                                                                                                                                                                                                                                          |
| `java_options`                                | No       | Java JVM options                                                                                                                                                                                                                                                                                                                                                                                                        |
| `name`                                        | No       | Used in conjunction with `jmx_url`.                                                                                                                                                                                                                                                                                                                                                                                     |
| `new_gc_metrics`                              | No       | Set to true to use better metric names for garbage collection metrics. Default is `false`                                                                                                                                                                                                                                                                                                                               |
| `process_name_regex`                          | No       | Instead of specifying a host and port or `jmx_url`, the Agent can connect using the attach API. This requires the JDK to be installed and the path to `tools.jar` to be set.                                                                                                                                                                                                                                            |
| `refresh_beans`                               | No       | Refresh period for refreshing the matching MBeans list. Default is 600 seconds. Decreasing this value may result in increased CPU usage.                                                                                                                                                                                                                                                                                |
| `refresh_beans_initial`                       | No       | Refresh period for refreshing the matching MBeans list immediately post initialization. Default is the value of `refresh_beans`.                                                                                                                                                                                                                                                                                        |
| `rmi_connection_timeout`                      | No       | The connection timeout, in milliseconds, when connecting to a JVM using `host` and `port` or a `jmx_url`.                                                                                                                                                                                                                                                                                                               |
| `rmi_client_timeout`                          | No       | Specify the duration without reply from the connected JVM, in milliseconds, after which the Agent gives up on an existing connection and retries.                                                                                                                                                                                                                                                                      |
| `service`                                     | No       | Attach a `service:<SERVICE>` tag to every metric, event, and service check emitted by this integration.                                                                                                                                                                                                                                                                                                                 |
| `service_check_prefix`                        | No       | Custom service check prefix, for example `my_prefix` to get a service check called `my_prefix.can_connect`. Integration name is used as the default if not set.                                                                                                                                                                                                                                                                |
| `tools_jar_path`                              | No       | To be set when `process_name_regex` is set.                                                                                                                                                                                                                                                                                                                                                                             |
| `trust_store_path` and `trust_store_password` | No       | Should be set if SSL is enabled.                                                                                                                                                                                                                                                                                                                                                                                        |

The `conf` parameter is a list of dictionaries. Only 2 keys are allowed in this dictionary:

| Key       | Required | Description                                                                                                                                |
|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `include` | Yes      | A dictionary of filters - any attribute that matches these filters are collected unless it also matches the "exclude" filters (see below). |
| `exclude` | No       | A dictionary of filters - attributes that match these filters are not collected.                                                           |

Tags are automatically added to metrics based on the actual MBean name. You can explicitly specify supplementary tags. For instance, assuming the following MBean is exposed by your monitored application:

```text
mydomain:attr0=val0,attr1=val1
```

It would create a metric called `mydomain` (or some variation depending on the attribute inside the bean) with tags: `attr0:val0, attr1:val1, domain:mydomain, simple:val0, raw_value:my_chosen_value, multiple:val0-val1`.

If you specify an alias in an `include` key that is formatted as _camel case_, it is converted to _snake case_. For example, `MyMetricName` is shown in Datadog as `my_metric_name`.

##### Description of the filters

Each `include` or `exclude` dictionary supports the following keys:

| Key                   | Description                                                                                                                                                                                                             |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `domain`              | A domain name or list of domain names, for example: `java.lang`.                                                                                                                                                        |
| `domain_regex`        | A regex pattern or list of patterns matching the domain name, for example: `java\.lang.*`.                                                                                                                              |
| `bean` or `bean_name` | A bean name or list of full bean names, for example: `java.lang:type=Compilation`.                                                                                                                                      |
| `bean_regex`          | A regex pattern or list of patterns matching the full bean names, for example: `java\.lang.*[,:]type=Compilation.*`. You can use capture groups in your regex to supply as tag values. See example configuration above. |
| `class`               | A class of list of class names, for example: `org.datadog.jmxfetch.SimpleTestJavaApp`.                                                                                                                                  |
| `class_regex`         | A regex pattern or list of patterns matching the class names, for example: `org\.datadog\.jmxfetch\.SimpleTestJavaApp`.                                                                                                 |
| `exclude_tags`        | A list of tag keys to remove from the final metrics. This can be used to improve the metric tag cardinality, for example: `["attr1", "id", "partition-id"]`.                                                            |
| `attribute`           | A list or a dictionary of attribute names (see below for more details).                                                                                                                                                 |

**Notes**:

- The regexes defined in `domain_regex` and `bean_regex` must conform to [Java's regular expression format][8]. These filters were added in version 5.5.0.
- Except for regex patterns, all values are case sensitive.

On top of these parameters, the filters support "custom" keys which allows you to filter by bean parameters. For example, if you want to collect metrics regarding the Cassandra cache, you could use the `type: - Caches` filter:

```yaml
conf:
    - include:
          domain: org.apache.cassandra.db
          type:
              - Caches
```

#### Attribute filter

The `attribute` filter can accept two types of values:

- A dictionary whose keys match the target attribute names:

    ```yaml
    conf:
        - include:
              attribute:
                  maxThreads:
                      alias: tomcat.threads.max
                      metric_type: gauge
                  currentThreadCount:
                      alias: tomcat.threads.count
                      metric_type: gauge
                  bytesReceived:
                      alias: tomcat.bytes_rcvd
                      metric_type: counter
    ```

    - You can specify an `alias` for the attribute that becomes the metric name in Datadog. 
    - You can also specify the metric type: `gauge`, `histogram`, `counter`/`rate`, or `monotonic_count`. If you choose `counter`, a `rate` per second is computed for the metric and it is sent as a `gauge`.

- A list of target attribute names:

    ```yaml
    conf:
        - include:
              domain: org.apache.cassandra.db
              attribute:
                  - BloomFilterDiskSpaceUsed
                  - BloomFilterFalsePositives
                  - BloomFilterFalseRatio
                  - Capacity
                  - CompressionRatio
                  - CompletedTasks
                  - ExceptionCount
                  - Hits
                  - RecentHitRate
    ```

    - The metric type defaults to a gauge.
    - The metric name is `jmx.<DOMAIN_NAME>.<ATTRIBUTE_NAME>`.

Here is another filtering example:

```yaml
instances:
    - host: 127.0.0.1
      name: jmx_instance
      port: 9999

init_config:
    conf:
        - include:
              bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
              attribute:
                  - OneMinuteRate
                  - 75thPercentile
                  - 95thPercentile
                  - 99thPercentile
```

#### Validation

[Run the Agent's status subcommand][9] and look for your JMX check under the JMXFetch section.

Additionally, JMX checks have a default configuration that collect metrics from your JMX application. Check the [Metrics Explorer][10] for: `jvm.heap_memory`, `jvm.non_heap_memory`, or `jvm.gc.cms.count`.

### Log collection

_Available for Agent v6.0+_

See the dedicated documentation on how to [setup Java log collection][11] to forward your logs to Datadog.

### Trace collection

After [enabling trace collection with your Agent][12], see the dedicated documentation for [instrumenting your Java application][13] to send its traces to Datadog.

## Data Collected

### Metrics

{{< get-metrics-from-git >}}

**Note**: Set `new_gc_metrics: true` in your [jmx.d/conf.yaml][14] to replace the following metrics:

```text
jvm.gc.cms.count   => jvm.gc.minor_collection_count
                      jvm.gc.major_collection_count
jvm.gc.parnew.time => jvm.gc.minor_collection_time
                      jvm.gc.major_collection_time
```

### Service Checks
{{< get-service-checks-from-git "java" >}}


## Troubleshooting

Consult the list of [JMX troubleshooting commands and FAQs][16].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html
[2]: https://docs.datadoghq.com/developers/dogstatsd
[3]: https://docs.datadoghq.com/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: https://docs.oracle.com/en/java/javase/14/management/monitoring-and-management-using-jmx-technology.html
[5]: https://docs.datadoghq.com/getting_started/integrations/#setting-up-an-integration
[6]: https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=operator
[7]: https://docs.datadoghq.com/tracing/setup_overview/setup/java/#ddjmxfetchconfigdir-and-ddjmxfetchconfig
[8]: http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/metrics/explorer/
[11]: https://docs.datadoghq.com/logs/log_collection/java/
[12]: https://docs.datadoghq.com/tracing/send_traces/
[13]: https://docs.datadoghq.com/tracing/setup/java/
[14]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jmx.d/conf.yaml.example
[15]: https://github.com/DataDog/dogweb/blob/prod/integration/java/service_checks.json
[16]: https://docs.datadoghq.com/integrations/faq/troubleshooting-jmx-integrations/

