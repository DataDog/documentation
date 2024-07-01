---
"app_id": "hivemq"
"app_uuid": "ba1769d1-c71b-4cf1-8169-8ce3b66629dd"
"assets":
  "dashboards":
    "HiveMQ": assets/dashboards/hivemq.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": hivemq.messages.queued.count
      "metadata_path": metadata.csv
      "prefix": hivemq.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10101"
    "source_type_name": HiveMQ
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- iot
- log collection
- message queues
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/hivemq/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "hivemq"
"integration_id": "hivemq"
"integration_title": "HiveMQ"
"integration_version": "1.8.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "hivemq"
"public_title": "HiveMQ"
"short_description": "Monitor your HiveMQ clusters."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::IoT"
  - "Category::Log Collection"
  - "Category::Message Queues"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor your HiveMQ clusters.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": HiveMQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

[HiveMQ][1] is a MQTT based messaging platform designed for the fast, efficient and reliable movement
of data to and from connected IoT devices. It is a MQTT 3.1, 3.1.1, and 5.0 compliant broker.

## Setup

### Installation

The HiveMQ check is included in the [Datadog Agent][2] package.
No additional installation is needed on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `hivemq.d/conf.yaml` file, in the `conf.d/` folder at the root of your
   Agent's configuration directory to start collecting your HiveMQ performance data.
   See the [sample hivemq.d/conf.yaml][1] for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page][2].
   You can specify the metrics you are interested in by editing the configuration below.
   To learn how to customize the metrics to collect see the [JMX Checks documentation][3] for more detailed instructions.
   If you need to monitor more metrics, contact [Datadog support][4].

2. [Restart the Agent][5]

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add the following configuration block to your `hivemq.d/conf.yaml` file. Change the `path` and `service` parameter values based on your environment. See the [sample hivemq.d/conf.yaml][1] for all available configuration options.

   ```yaml
   logs:
     - type: file
       path: /var/log/hivemq.log
       source: hivemq
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

3. [Restart the Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/integrations/java
[4]: https://docs.datadoghq.com/help
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

##### Metric collection

For containerized environments, see the [Autodiscovery with JMX][1] guide.

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker log collection][2].

| Parameter      | Value                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hivemq", "service": "<SERVICE_NAME>"}` |

### Validation

[Run the Agent's status subcommand][3] and look for `hivemq` under the **JMXFetch** section:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hivemq
      instance_name : hivemq-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/agent/docker/log/
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## Data Collected

### Metrics
{{< get-metrics-from-git "hivemq" >}}


### Service Checks
{{< get-service-checks-from-git "hivemq" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].

## Further Reading

Additional helpful documentation, links, and articles:

- [Use HiveMQ and OpenTelemetry to monitor IoT applications in Datadog][4]


[1]: https://www.hivemq.com/hivemq/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/help
[4]: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
