---
"app_id": "clickhouse"
"app_uuid": "668f43c1-bdd8-4686-bb92-d40f0c48fda9"
"assets":
  "dashboards":
    "ClickHouse Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": clickhouse.query.active
      "metadata_path": metadata.csv
      "prefix": clickhouse.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10078"
    "source_type_name": ClickHouse
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- data stores
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/clickhouse/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "clickhouse"
"integration_id": "clickhouse"
"integration_title": "ClickHouse"
"integration_version": "3.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "clickhouse"
"public_title": "ClickHouse"
"short_description": "Monitor the health and performance of your ClickHouse clusters."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of your ClickHouse clusters.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": ClickHouse
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [ClickHouse][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The ClickHouse check is included in the [Datadog Agent][3] package. No additional installation is needed on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

#### Metric collection

1. To start collecting your ClickHouse performance data, edit the `clickhouse.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory. See the [sample clickhouse.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add the log files you are interested in to your `clickhouse.d/conf.yaml` file to start collecting your ClickHouse logs:

   ```yaml
     logs:
       - type: file
         path: /var/log/clickhouse-server/clickhouse-server.log
         source: clickhouse
         service: "<SERVICE_NAME>"
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample clickhouse.d/conf.yaml][1] for all available configuration options.

3. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

#### Metric collection

| Parameter            | Value                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `clickhouse`                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection][2].

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "clickhouse", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][4] and look for `clickhouse` under the **Checks** section.

## Data Collected

### Metrics
{{< get-metrics-from-git "clickhouse" >}}


### Events

The ClickHouse check does not include any events.

### Service Checks
{{< get-service-checks-from-git "clickhouse" >}}


## Troubleshooting

Need help? Contact [Datadog support][5].



[1]: https://clickhouse.yandex
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
