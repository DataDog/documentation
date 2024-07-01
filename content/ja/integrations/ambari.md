---
"app_id": "ambari"
"app_uuid": "081f9cd9-a86a-4cea-ae5b-b4f7e163f413"
"assets":
  "dashboards":
    "Ambari base dashboard": assets/dashboards/base_dashboard.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": ambari.cpu.cpu_user
      "metadata_path": metadata.csv
      "prefix": ambari.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10064"
    "source_type_name": Ambari
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- network
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ambari/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ambari"
"integration_id": "ambari"
"integration_title": "Ambari"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "ambari"
"public_title": "Ambari"
"short_description": "Get metrics by host or service for all your ambari managed clusters"
"supported_os":
- linux
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Get metrics by host or service for all your ambari managed clusters
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Ambari
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Ambari][1] through the Datadog Agent.

## Setup

### Installation

The Ambari check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `ambari.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Ambari performance data. See the [sample ambari.d/conf.yaml][1] for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL of the Ambari Server, include http:// or https://
     #
     - url: localhost
   ```

2. [Restart the Agent][2].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Edit your `ambari.d/conf.yaml` by uncommenting the `logs` lines at the bottom. Update the logs `path` with the correct path to your Ambari log files.

    ```yaml
      logs:
        - type: file
          path: /var/log/ambari-server/ambari-alerts.log
          source: ambari
          service: ambari
          log_processing_rules:
              - type: multi_line
                name: new_log_start_with_date
                # 2019-04-22 15:47:00,999
                pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
      ...
    ```

3. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                        |
| -------------------- | ---------------------------- |
| `<INTEGRATION_NAME>` | `ambari`                     |
| `<INIT_CONFIG>`      | blank or `{}`                |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ambari", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date","pattern":"\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `ambari` under the Checks section.

## Data Collected

This integration collects for every host in every cluster the following system metrics:

- boottime
- cpu
- disk
- memory
- load
- network
- process

If service metrics collection is enabled with `collect_service_metrics` this integration collects for each included service component the metrics with headers in the inclusion list.

### Metrics
{{< get-metrics-from-git "ambari" >}}


### Events

Ambari does not include any events.

### Service Checks
{{< get-service-checks-from-git "ambari" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].



[1]: https://ambari.apache.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
