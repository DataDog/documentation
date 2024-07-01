---
"app_id": "tomcat"
"app_uuid": "9497c2d8-63cb-4d90-b73c-f32065349fe1"
"assets":
  "dashboards":
    "tomcat": "assets/dashboards/metrics.json"
    "tomcat--overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "tomcat.threads.count"
      "metadata_path": "metadata.csv"
      "prefix": "tomcat."
    "process_signatures":
    - "java tomcat"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "43"
    "source_type_name": "Tomcat"
  "monitors":
    "[Tomcat] % of busy threads is high for host: {{host.name}}": "assets/monitors/thread_busy.json"
    "[Tomcat] % of thread count managed by the thread pool is high for host: {{host.name}}": "assets/monitors/thread_count_max.json"
    "[Tomcat] Anomalous average processing time for host {{host.name}}": "assets/monitors/processing_time.json"
    "[Tomcat] Anomalous max processing time for host {{host.name}}": "assets/monitors/max_proc_time.json"
    "[Tomcat] Anomalous request rate for host {{host.name}}": "assets/monitors/req_count.json"
    "[Tomcat] Increase of the errors/second rate for host: {{host.name}}": "assets/monitors/error_count.json"
  "saved_views":
    "tomcat_4xx": "assets/saved_views/tomcat_4xx.json"
    "tomcat_5xx": "assets/saved_views/tomcat_5xx.json"
    "tomcat_overview": "assets/saved_views/tomcat_overview.json"
    "tomcat_processes": "assets/saved_views/tomcat_processes.json"
    "tomcat_status_code_overview": "assets/saved_views/tomcat_status_code_overview.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/tomcat/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tomcat"
"integration_id": "tomcat"
"integration_title": "Tomcat"
"integration_version": "2.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "tomcat"
"public_title": "Tomcat"
"short_description": "Track requests per second, bytes served, cache hits, servlet metrics, and more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track requests per second, bytes served, cache hits, servlet metrics, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Tomcat"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Tomcat Dashboard][1]

## Overview

This check collects Tomcat metrics, for example:

- Overall activity metrics: error count, request count, processing times, etc.
- Thread pool metrics: thread count, number of threads busy, etc.
- Servlet processing times

## Setup

### Installation

The Tomcat check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Tomcat servers.

This check is JMX-based, so you need to enable JMX Remote on your Tomcat servers. Follow the instructions in [Monitoring and Managing Tomcat][3].

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `tomcat.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to collect Tomcat metrics and [logs](#log-collection). See the [sample tomcat.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3].

See the [JMX Check documentation][4] for a list of configuration options usable by all JMX-based checks.

#### List of metrics

The `conf` parameter is a list of metrics to be collected by the integration. Only two keys are allowed:

- `include` (**mandatory**): A dictionary of filters. Any attribute that matches these filters is collected unless it also matches the `exclude` filters (see below).
- `exclude` (**optional**): A dictionary of filters. Attributes that match these filters are not collected.

For a given bean, metrics get tagged in the following manner:

```text
mydomain:attr0=val0,attr1=val1
```

In this example, your metric is `mydomain` (or some variation depending on the attribute inside the bean) and has the tags `attr0:val0`, `attr1:val1`, and `domain:mydomain`.

If you specify an alias in an `include` key that is formatted as _camel case_, it is converted to _snake case_. For example, `MyMetricName` is shown in Datadog as `my_metric_name`.

##### The attribute filter

The `attribute` filter can accept two types of values:

- A dictionary whose keys are attributes names (see below). For this case, you can specify an alias for the metric that becomes the metric name in Datadog. You can also specify the metric type as a gauge or counter. If you choose counter, a rate per second is computed for the metric.

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

- A list of attributes names (see below). For this case, the metric type is a gauge, and the metric name is `jmx.\[DOMAIN_NAME].\[ATTRIBUTE_NAME]`.

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

#### Log collection


1. To submit logs to Datadog, Tomcat uses the `log4j` logger. For versions of Tomcat before 8.0, `log4j` is configured by default. For Tomcat 8.0+, you must configure Tomcat to use `log4j`, see [Using Log4j][5]. In the first step of those instructions, edit the `log4j.properties` file in the `$CATALINA_BASE/lib` directory as follows:

   ```conf
     log4j.rootLogger = INFO, CATALINA

     # Define all the appenders
     log4j.appender.CATALINA = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.CATALINA.File = /var/log/tomcat/catalina.log
     log4j.appender.CATALINA.Append = true

     # Roll-over the log once per day
     log4j.appender.CATALINA.layout = org.apache.log4j.PatternLayout
     log4j.appender.CATALINA.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.LOCALHOST = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.LOCALHOST.File = /var/log/tomcat/localhost.log
     log4j.appender.LOCALHOST.Append = true
     log4j.appender.LOCALHOST.layout = org.apache.log4j.PatternLayout
     log4j.appender.LOCALHOST.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.MANAGER = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.MANAGER.File = /var/log/tomcat/manager.log
     log4j.appender.MANAGER.Append = true
     log4j.appender.MANAGER.layout = org.apache.log4j.PatternLayout
     log4j.appender.MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.HOST-MANAGER = org.apache.log4j.DailyRollingFileAppender
     log4j.appender.HOST-MANAGER.File = /var/log/tomcat/host-manager.log
     log4j.appender.HOST-MANAGER.Append = true
     log4j.appender.HOST-MANAGER.layout = org.apache.log4j.PatternLayout
     log4j.appender.HOST-MANAGER.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     log4j.appender.CONSOLE = org.apache.log4j.ConsoleAppender
     log4j.appender.CONSOLE.layout = org.apache.log4j.PatternLayout
     log4j.appender.CONSOLE.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n

     # Configure which loggers log to which appenders
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost] = INFO, LOCALHOST
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager] =\
       INFO, MANAGER
     log4j.logger.org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager] =\
       INFO, HOST-MANAGER
   ```
   Then follow the remaining steps in [the Tomcat docs][5] for configuring `log4j`.

2. By default, Datadog's integration pipeline support the following conversion patterns:

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
   ```

    Clone and edit the [integration pipeline][6] if you have a different format. See [Logging in Tomcat][7] for details on Tomcat logging capabilities.

3. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

4. Add this configuration block to your `tomcat.d/conf.yaml` file to start collecting your Tomcat Logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/tomcat/*.log
       source: tomcat
       service: "<SERVICE>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample tomcat.yaml][2] for all available configuration options.

5. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/integrations/java/
[5]: https://tomcat.apache.org/tomcat-8.0-doc/logging.html#Using_Log4j
[6]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[7]: https://tomcat.apache.org/tomcat-7.0-doc/logging.html
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery with JMX][1] guide.

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][4] and look for `tomcat` under the **Checks** section.

## Data Collected

### Metrics
{{< get-metrics-from-git "tomcat" >}}


### Events

The Tomcat check does not include any events.

### Service Checks
{{< get-service-checks-from-git "tomcat" >}}


## Troubleshooting

### Missing `tomcat.*` metrics

The Datadog Agent collects JMX metrics with either `Catalina` or `Tomcat` as bean domain names with the Datadog Agent version **7.49.0** or later. Older versions only collect metrics with `Catalina` as the bean domain name.
Standalone Tomcat deployments have metrics under domain `Catalina`, but embedded Tomcat deployments (such as with Spring Boot) have metrics under domain `Tomcat`.

If the Datadog Agent version is older than **7.49.0**, and if the exposed Tomcat metrics are prefixed with a different bean domain name such as `Tomcat`, copy the default metrics from the `metrics.yaml` file to the `conf` section of the `tomcat.d/conf.yaml` file and modify the `domain` filter to use the applicable bean domain name.

```yaml
- include:
    domain: Tomcat
    type: ThreadPool
    attribute:
      maxThreads:
        alias: tomcat.threads.max
        metric_type: gauge
      currentThreadCount:
        alias: tomcat.threads.count
        metric_type: gauge
      currentThreadsBusy:
        alias: tomcat.threads.busy
        metric_type: gauge
```

See the [JMX Check documentation][5] for more detailed information.

### Commands to view the available metrics

The `datadog-agent jmx` command allows you to run troubleshooting commands on JMXFetch integrations. On Linux systems, you will need to prepend the command with `sudo -u dd-agent` so that the Datadog Agent runs as the correct user.

#### datadog-agent jmx collect
Running `datadog-agent jmx collect` starts the collection of metrics based on your current configuration and displays them in the console.

#### datadog-agent jmx list
The `datadog-agent jmx list` has a number of available subcommands:
- `collected` - List attributes that will actually be collected by your current instance's configuration.
- `everything` - List every attribute available that has a type supported by JMXFetch.
- `limited` - List attributes that match one of your instances' configurations but that are not being collected because it would exceed the number of metrics that can be collected.
- `matching` - List attributes that match at least one of your instances' configurations.
- `not-matching` - List attributes that don't match any of your instances' configurations.
- `with-metrics` - List attributes and metrics data that match at least one of your instances' configurations.
- `with-rate-metrics` - List attributes and metrics data that match at least one of your instances' configurations, including rates and counters.

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Tomcat metrics with Datadog][6]
- [Key metrics for monitoring Tomcat][7]
- [Analyzing Tomcat logs and metrics with Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tomcat/images/tomcat_dashboard_2.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://tomcat.apache.org/tomcat-10.1-doc/monitoring.html
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/integrations/java/
[6]: https://www.datadoghq.com/blog/monitor-tomcat-metrics
[7]: https://www.datadoghq.com/blog/tomcat-architecture-and-performance
[8]: https://www.datadoghq.com/blog/analyzing-tomcat-logs-and-metrics-with-datadog
