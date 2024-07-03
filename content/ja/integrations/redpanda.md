---
app_id: redpanda
app_uuid: 4c7855c5-6c2c-46c5-bfc3-1a7df1ac6b77
assets:
  dashboards:
    Redpanda Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: redpanda.application.uptime
      metadata_path: metadata.csv
      prefix: redpanda.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10232
    source_type_name: Redpanda
  logs:
    source: redpanda
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Redpanda
  sales_email: support@redpanda.com
  support_email: support@redpanda.com
categories:
- log collection
- message queues
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redpanda/README.md
display_on_public_website: true
draft: false
git_integration_title: redpanda
integration_id: redpanda
integration_title: Redpanda
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: redpanda
public_title: Redpanda
short_description: Monitor the overall health and performance of Redpanda clusters.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Message Queues
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor the overall health and performance of Redpanda clusters.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Redpanda
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## Overview

Redpanda is a Kafka API-compatible streaming platform for mission-critical workloads.

Connect Datadog with [Redpanda][1] to view key metrics and add additional metric groups based on specific user needs.

## セットアップ

### インストール

1. [Download and launch the Datadog Agent][2].
2. Manually install the Redpanda integration. See [Use Community Integrations][3] for more details based on the environment.

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host, run `datadog-agent integration install -t datadog-redpanda==<INTEGRATION_VERSION>`.

{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, the best way to use this integration with the Docker Agent is to build the Agent with the Redpanda integration installed. 

To build an updated version of the Agent:

1. Use the following Dockerfile:

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=2.0.0

RUN agent integration install -r -t datadog-redpanda==${INTEGRATION_VERSION}
```

2. Build the image and push it to your private Docker registry.

3. Upgrade the Datadog Agent container image. If you are using a Helm chart, modify the `agents.image` section in the `values.yaml` file to replace the default agent image:

```yaml
agents:
  enabled: true
  image:
    tag: <NEW_TAG>
    repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
```

4. Use the new `values.yaml` file to upgrade the Agent:

```shell
helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

##### Metric collection

To start collecting your Redpanda performance data:

1. Edit the `redpanda.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the sample [redpanda.d/conf.yaml.example][2] file for all available configuration options.

2. [Restart the Agent][3].

##### Log collection

By default, collecting logs is disabled in the Datadog Agent. Log collection is available for Agent v6.0+.

1. To enable logs, add the following in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Make sure `dd-agent` user is member of `systemd-journal` group, if not, run following command as root:
   ```
   usermod -a -G systemd-journal dd-agent
   ```

3. Add the following in your `redpanda.d/conf.yaml` file to start collecting your Redpanda logs:

   ```yaml
    logs:
    - type: journald
      source: redpanda
    ```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/redpanda/datadog_checks/redpanda/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

##### Metric collection

For containerized environments, Autodiscovery is configured by default after the Redpanda check integrates in the Datadog Agent image.

Metrics are automatically collected in Datadog's server. For more information, see [Autodiscovery Integration Templates][1].

##### Log collection

By default, log collection is disabled in the Datadog Agent. Log collection is available for Agent v6.0+.

To enable logs, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "redpanda", "service": "redpanda_cluster"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings/agent/latest
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][4] and look for `redpanda` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "redpanda" >}}


### イベント

The Redpanda integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "redpanda" >}}


## トラブルシューティング

Need help? Contact [Datadog support][5].


[1]: https://redpanda.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/