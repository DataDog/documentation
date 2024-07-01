---
"app_id": "flink"
"app_uuid": "39d70c50-017c-407a-9117-2055d8e03427"
"assets":
  "dashboards":
    "Flink Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": flink.taskmanager.Status.JVM.CPU.Load
      "metadata_path": metadata.csv
      "prefix": flink.
    "process_signatures":
    - java org.apache.flink.client.python.PythonShellParser
    - java org.apache.flink.container.entrypoint.StandaloneApplicationClusterEntryPoint
    - java org.apache.flink.kubernetes.entrypoint.KubernetesSessionClusterEntrypoint
    - java org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
    - java org.apache.flink.kubernetes.taskmanager.KubernetesTaskExecutorRunner
    - java org.apache.flink.kubernetes.cli.KubernetesSessionCli
    - java org.apache.flink.runtime.taskexecutor.TaskManagerRunner
    - java org.apache.flink.runtime.zookeeper.FlinkZooKeeperQuorumPeer
    - java org.apache.flink.runtime.webmonitor.history.HistoryServer
    - java org.apache.flink.runtime.entrypoint.StandaloneSessionClusterEntrypoint
    - java org.apache.flink.table.gateway.SqlGateway
    - java org.apache.flink.table.client.SqlClient
    - java org.apache.flink.yarn.cli.FlinkYarnSessionCli
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10088"
    "source_type_name": flink
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/flink/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "flink"
"integration_id": "flink"
"integration_title": "Flink"
"integration_version": "1.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "flink"
"public_title": "Flink"
"short_description": "Track metrics for your flink jobs."
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
  "description": Track metrics for your flink jobs.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Flink
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Flink][1]. Datadog collects Flink metrics through Flink's
[Datadog HTTP Reporter][2], which uses [Datadog's HTTP API][3].

## Setup

### Installation

The Flink check is included in the [Datadog Agent][4] package.
No additional installation is needed on your server.

### Configuration

#### Metric collection

1. Configure the [Datadog HTTP Reporter][2] in Flink.

     In your `<FLINK_HOME>/conf/flink-conf.yaml`, add these lines, replacing `<DATADOG_API_KEY>` with your Datadog [API key][5]:

    ```yaml
    metrics.reporter.dghttp.factory.class: org.apache.flink.metrics.datadog.DatadogHttpReporterFactory
    metrics.reporter.dghttp.apikey: <DATADOG_API_KEY>
    metrics.reporter.dghttp.dataCenter: {{< region-param key="dd_datacenter" >}}
    ```

2. Re-map system scopes in your `<FLINK_HOME>/conf/flink-conf.yaml`.

    ```yaml
    metrics.scope.jm: flink.jobmanager
    metrics.scope.jm.job: flink.jobmanager.job
    metrics.scope.tm: flink.taskmanager
    metrics.scope.tm.job: flink.taskmanager.job
    metrics.scope.task: flink.task
    metrics.scope.operator: flink.operator
    ```

     **Note**: The system scopes must be remapped for your Flink metrics to be supported, otherwise they are submitted as custom metrics.

3. Configure additional [tags][2] in `<FLINK_HOME>/conf/flink-conf.yaml`. Here is an example of custom tags:

    ```yaml
    metrics.reporter.dghttp.scope.variables.additional: <KEY1>:<VALUE1>, <KEY1>:<VALUE2>
    ```

     **Note**: By default, any variables in metric names are sent as tags, so there is no need to add custom tags for `job_id`, `task_id`, etc.

4. Restart Flink to start sending your Flink metrics to Datadog.

#### Log collection

_Available for Agent >6.0_

1. Flink uses the `log4j` logger by default. To enable logging to a file, customize the format by editing the `log4j*.properties` configuration files in the `conf/` directory of the Flink distribution. See the [Flink logging documentation][6] for information on which configuration file is relevant for your setup. See [Flink's repository][7] for default configurations.

2. By default, the integration pipeline supports the following layout pattern:

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

     An example of a valid timestamp is: `2020-02-03 18:43:12,251`.

     Clone and edit the [integration pipeline][8] if you have a different format.

3. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

4. Uncomment and edit the logs configuration block in your `flink.d/conf.yaml` file. Change the `path` and `service` parameter values based on your environment. See the [sample flink.d/conf.yaml][9] for all available configuration options.

   ```yaml
   logs:
     - type: file
       path: /var/log/flink/server.log
       source: flink
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```

5. [Restart the Agent][10].

### Validation

[Run the Agent's status subcommand][11] and look for `flink` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "flink" >}}


### Service Checks

Flink does not include any service checks.

### Events

Flink does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][13].


[1]: https://flink.apache.org/
[2]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/metric_reporters/#datadog
[3]: https://docs.datadoghq.com/api/?lang=bash#api-reference
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/advanced/logging/
[7]: https://github.com/apache/flink/tree/release-1.16/flink-dist/src/main/flink-bin/conf
[8]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[9]: https://github.com/DataDog/integrations-core/blob/master/flink/datadog_checks/flink/data/conf.yaml.example
[10]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/flink/metadata.csv
[13]: https://docs.datadoghq.com/help/

