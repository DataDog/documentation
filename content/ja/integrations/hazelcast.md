---
"app_id": "hazelcast"
"app_uuid": "00434289-3c74-4c25-8841-9e0c826510c2"
"assets":
  "dashboards":
    "Hazelcast Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - hazelcast.mc.license_expiration_time
      - hazelcast.instance.running
      "metadata_path": metadata.csv
      "prefix": hazelcast.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10095"
    "source_type_name": Hazelcast
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- caching
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/hazelcast/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "hazelcast"
"integration_id": "hazelcast"
"integration_title": "Hazelcast"
"integration_version": "3.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "hazelcast"
"public_title": "Hazelcast"
"short_description": "Monitor Hazelcast members and the Management Center."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Caching"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor Hazelcast members and the Management Center.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Hazelcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Hazelcast][1] v4.0+.

## Setup

### Installation

The Hazelcast check is included in the [Datadog Agent][2] package.
No additional installation is needed on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `hazelcast.d/conf.yaml` file, in the `conf.d/` folder at the root of your
   Agent's configuration directory to start collecting your Hazelcast performance data.
   See the [sample hazelcast.d/conf.yaml][1] for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page][2].
   You can specify the metrics you are interested in by editing the configuration below.
   To learn how to customize the metrics to collect, see the [JMX Checks documentation][3] for more detailed instructions.
   If you need to monitor more metrics, contact [Datadog support][4].

2. [Restart the Agent][5].

##### Log collection

1. Hazelcast supports many different [logging adapters][6]. Here is an example of a `log4j2.properties` file:

   ```text
   rootLogger=file
   rootLogger.level=info
   property.filepath=/path/to/log/files
   property.filename=hazelcast

   appender.file.type=RollingFile
   appender.file.name=RollingFile
   appender.file.fileName=${filepath}/${filename}.log
   appender.file.filePattern=${filepath}/${filename}-%d{yyyy-MM-dd}-%i.log.gz
   appender.file.layout.type=PatternLayout
   appender.file.layout.pattern = %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   appender.file.policies.type=Policies
   appender.file.policies.time.type=TimeBasedTriggeringPolicy
   appender.file.policies.time.interval=1
   appender.file.policies.time.modulate=true
   appender.file.policies.size.type=SizeBasedTriggeringPolicy
   appender.file.policies.size.size=50MB
   appender.file.strategy.type=DefaultRolloverStrategy
   appender.file.strategy.max=100

   rootLogger.appenderRefs=file
   rootLogger.appenderRef.file.ref=RollingFile

   #Hazelcast specific logs.

   #log4j.logger.com.hazelcast=debug

   #log4j.logger.com.hazelcast.cluster=debug
   #log4j.logger.com.hazelcast.partition=debug
   #log4j.logger.com.hazelcast.partition.InternalPartitionService=debug
   #log4j.logger.com.hazelcast.nio=debug
   #log4j.logger.com.hazelcast.hibernate=debug
   ```

2. By default, Datadog's integration pipeline supports the following conversion [pattern][7]:

   ```text
   %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   ```

    Clone and edit the [integration pipeline][8] if you have a different format.

3. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

4. Add the following configuration block to your `hazelcast.d/conf.yaml` file. Change the `path` and `service` parameter values based on your environment. See the [sample hazelcast.d/conf.yaml][1] for all available configuration options.

   ```yaml
   logs:
     - type: file
       path: /var/log/hazelcast.log
       source: hazelcast
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Restart the Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/integrations/java/
[4]: https://docs.datadoghq.com/help/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.hazelcast.org/docs/latest/manual/html-single/index.html#logging-configuration
[7]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[8]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

##### Metric collection

For containerized environments, see the [Autodiscovery with JMX][1] guide.

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker log collection][2].

| Parameter      | Value                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hazelcast", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `hazelcast` under the **JMXFetch** section:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hazelcast
      instance_name : hazelcast-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Data Collected

### Metrics
{{< get-metrics-from-git "hazelcast" >}}


### Service Checks
{{< get-service-checks-from-git "hazelcast" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].



[1]: https://hazelcast.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
