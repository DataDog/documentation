---
app_id: system
app_uuid: a675760c-00f7-4bf3-bd0e-c7edfb0e7e82
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: network.tcp.can_connect
      metadata_path: metadata.csv
      prefix: network.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: TCP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tcp_check/README.md
display_on_public_website: true
draft: false
git_integration_title: tcp_check
integration_id: システム
integration_title: TCP チェック
integration_version: 4.8.0
is_public: true
manifest_version: 2.0.0
name: tcp_check
public_title: TCP Check
short_description: Monitor TCP connectivity to remote hosts.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  configuration: README.md#Setup
  description: Monitor TCP connectivity to remote hosts.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TCP Check
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Network Graph][1]

## Overview

Monitor TCP connectivity and response time for any host and port.

## Setup

### Installation

The TCP check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

Many metrics checks are best run on the same host(s) as the monitored service. However, it's recommended to run this check from hosts that do not run the monitored TCP services to test remote connectivity.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

Edit the `tcp_check.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample tcp_check.d/conf.yaml][2] for all available configuration options:

```yaml
init_config:

instances:
  - name: SSH check
    host: jumphost.example.com # or an IPv4/IPv6 address
    port: 22
    collect_response_time: true # to collect network.tcp.response_time. Default is false.
```

Configuration Options:

- `name` (Required) - Name of the service. This is included as a tag: `instance:<name>`. **Note**: Any spaces or dashes are converted to underscores.
- `host` (Required) - Host to be checked. This is included as a tag: `url:<host>:<port>`.
- `port` (Required) - Port to be checked. This is included as a tag: `url:<host>:<port>`.
- `timeout` (Optional) - Timeout for the check. Defaults to 10 seconds.
- `collect_response_time` (Optional) - Defaults to false, which means no response time metric is collected. If set to true, the metric returned is `network.tcp.response_time`.
- `tags` (Optional) - Tags to be assigned to the metric.

[Restart the Agent][3] to start sending TCP service checks and response times to Datadog.

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tcp_check/datadog_checks/tcp_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `tcp_check`                                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                                                 |
| `<INSTANCE_CONFIG>`  | `{"name": "<TCP_CHECK_INSTANCE_NAME>", "host":"%%host%%", "port":"%%port%%"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][3] and look for `tcp_check` under the Checks section.

## 収集データ

### Metrics
{{< get-metrics-from-git "tcp_check" >}}


### Events

The TCP check does not include any events.

### Service Checks
{{< get-service-checks-from-git "tcp_check" >}}


**Note:** To set an alert on this service check, create a [Network Monitor][4].

## Troubleshooting

Need help? Contact [Datadog support][5].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tcp_check/images/netgraphs.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/monitors/monitor_types/network/?tab=checkalert
[5]: https://docs.datadoghq.com/ja/help/