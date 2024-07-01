---
"app_id": "marathon"
"app_uuid": "fe9a038e-3948-4646-9a1c-ea1f1cc59977"
"assets":
  "dashboards":
    "marathon-overview": "assets/dashboards/marathon-overview_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "marathon.apps"
      "metadata_path": "metadata.csv"
      "prefix": "marathon."
    "process_signatures":
    - "start --master mesos marathon"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "82"
    "source_type_name": "Marathon"
  "saved_views":
    "marathon_processes": "assets/saved_views/marathon_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "containers"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/marathon/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "marathon"
"integration_id": "marathon"
"integration_title": "Marathon"
"integration_version": "2.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "marathon"
"public_title": "Marathon"
"short_description": "Track application metrics: required memory and disk, instance count, and more."
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Track application metrics: required memory and disk, instance count, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Marathon"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The Agent's Marathon check lets you:

- Track the state and health of every application: see configured memory, disk, cpu, and instances; monitor the number of healthy and unhealthy tasks
- Monitor the number of queued applications and the number of deployments

## Setup

### Installation

The Marathon check is included in the [Datadog Agent][1] package. No additional installation is needed on your server.

### Configuration

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metrics collection

1. Edit the `marathon.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample marathon.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     # the API endpoint of your Marathon master; required
     - url: "https://<SERVER>:<PORT>"
       # if your Marathon master requires ACS auth
       #   acs_url: https://<SERVER>:<PORT>

       # the username for Marathon API or ACS token authentication
       username: "<USERNAME>"

       # the password for Marathon API or ACS token authentication
       password: "<PASSWORD>"
   ```

   The function of `username` and `password` depends on whether or not you configure `acs_url`. If you do, the Agent uses them to request an authentication token from ACS, which it then uses to authenticate to the Marathon API. Otherwise, the Agent uses `username` and `password` to directly authenticate to the Marathon API.

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Because Marathon uses logback, you can specify a custom log format. With Datadog, two formats are supported out of the box: the default one provided by Marathon and the Datadog recommended format. Add a file appender to your configuration as in the following example and replace `$PATTERN$` with your selected format:

   - Marathon default: `[%date] %-5level %message \(%logger:%thread\)%n`
   - Datadog recommended: `%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n`

   ```xml
     <?xml version="1.0" encoding="UTF-8"?>

     <configuration>
         <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>
         <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
             <encoder>
                 <pattern>[%date] %-5level %message \(%logger:%thread\)%n</pattern>
             </encoder>
         </appender>
         <appender name="async" class="ch.qos.logback.classic.AsyncAppender">
             <appender-ref ref="stdout" />
             <queueSize>1024</queueSize>
         </appender>
         <appender name="FILE" class="ch.qos.logback.core.FileAppender">
             <file>/var/log/marathon.log</file>
             <append>true</append>
             <!-- set immediateFlush to false for much higher logging throughput -->
             <immediateFlush>true</immediateFlush>
             <encoder>
                 <pattern>$PATTERN$</pattern>
             </encoder>
         </appender>
         <root level="INFO">
             <appender-ref ref="async"/>
             <appender-ref ref="FILE"/>
         </root>
     </configuration>
   ```

3. Add this configuration block to your `marathon.d/conf.yaml` file to start collecting your Marathon logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/marathon.log
       source: marathon
       service: "<SERVICE_NAME>"
   ```

4. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/marathon/datadog_checks/marathon/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `marathon`                             |
| `<INIT_CONFIG>`      | blank or `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:%%port%%"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "marathon", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][2] and look for `marathon` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "marathon" >}}


### Events

The Marathon check does not include any events.

### Service Checks
{{< get-service-checks-from-git "marathon" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
