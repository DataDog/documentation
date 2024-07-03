---
app_id: traefik
app_uuid: 3e412d36-f638-4cb0-9068-294aac7a84e2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: traefik.total_status_code_count
      metadata_path: metadata.csv
      prefix: traefik.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10047
    source_type_name: Traefik
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md
display_on_public_website: true
draft: false
git_integration_title: traefik
integration_id: traefik
integration_title: Traefik
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: traefik
public_title: Traefik
short_description: collects traefik metrics
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: collects traefik metrics
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traefik
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Send [Traefik][1] metrics, logs, and traces to Datadog to monitor your Traefik services.

## セットアップ

The Traefik check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Traefik check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-traefik==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

{{< tabs >}}
{{% tab "v2" %}}

#### About v2
For information about the changes from v1 to v2, see the [Traefik migration guide][1]. For information about the latest version, see the [Traefik documentation][2].

#### Metric collection

Follow [Traefik's documentation][3] to send [Traefik metrics][4] to Datadog.

#### Log collection

**Available for Agent >6.0**

By default, [Traefik logs][5] are sent to stdout. This should not be changed for containerized version, because the Datadog Agent can collect logs directly from the container `stdout`/`stderr`.

1. To configure [Traefik to log to a file][5], add the following in the Traefik configuration file:

   ```conf
   [traefikLog]
     filePath = "/path/to/traefik.log"
     format   = "json"
    ```

    The [common Apache Access format][6] is used by default and is supported by this integration.

2. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file with:

   ```yaml
   logs_enabled: true
   ```

3. Add this configuration block to your `traefik.d/conf.yaml` file at the root of your [Agent's configuration directory][7] to start collecting your Traefik logs:

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      Change the `path` and `service` parameter values and configure them for your environment.

4. [Restart the Agent][8]

#### Trace collection

1. [Enable APM][9] for Datadog, if needed.
2. Follow [Traefik's documentation][10] to send [traces][11] to Datadog.

[1]: https://doc.traefik.io/traefik/v2.0/migration/v1-to-v2/
[2]: https://doc.traefik.io/traefik/
[3]: https://doc.traefik.io/traefik/observability/metrics/datadog/
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik/observability/logs/#filepath
[6]: https://doc.traefik.io/traefik/observability/logs/#format
[7]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[8]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/ja/getting_started/tracing/#enable-apm
[10]: https://doc.traefik.io/traefik/observability/tracing/datadog/
[11]: https://doc.traefik.io/traefik/observability/tracing/overview/
{{% /tab %}}
{{% tab "v1" %}}

#### About v1

See [Traefik documentation][1] for information about v1. For information about the changes from v1 to v2, see the [Traefik migration guide][2]. 

#### Metric collection

1. To collect Traefik [metrics][2], open the `traefik.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][3]. 

2. Add this configuration setup to your `traefik.d/conf.yaml` file to start gathering your [metrics][2]:

    ```yaml
    init_config:

    instances:
      - host: 10.1.2.3
        port: "8080"
        path: "/health"
        scheme: "http"
    ```

    Configuration Options:

    - host: Traefik endpoint to query. **Required**
    - port: API listener of Traefik endpoint. Default value `8080`. _Optional_
    - path: Path of Traefik health check endpoint. Default `/health`. _Optional_
    - scheme: Scheme of Traefik health check endpoint. Default `http`. _Optional_

3. [Restart the Agent][4] to begin sending Traefik metrics to Datadog.

See the [sample traefik.d/conf.yaml][5] for all available configuration options.

#### Log collection

**Available for Agent >6.0**

By default, [Traefik logs][6] are sent to stdout. This should not be changed for containerized version, as the Datadog Agent is able to collect logs directly from container `stdout`/`stderr`.

1. To configure [Traefik to log to a file][6], add the following in the Traefik configuration file:

    ```conf
    [traefikLog]
      filePath = "/path/to/traefik.log"
      format   = "json"
    ```

    The [common Apache Access format][7] is used by default and is supported by this integration.

2. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file with:

   ```yaml
   logs_enabled: true
   ```

3. Add this configuration block to your `traefik.d/conf.yaml` file at the root of your [Agent's configuration directory][3] to start collecting your Traefik logs:

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      Change the `path` and `service` parameter values and configure them for your environment.

4. [Restart the Agent][4]

#### Trace collection

**Available for Traefik v1.7+**

1. [Enable APM][8] for Datadog, if needed.
2. Follow [Traefik's documentation][9] to send traces to Datadog.

[1]: https://doc.traefik.io/traefik/v1.7/
[2]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[3]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[4]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[6]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#traefik-logs
[7]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#clf-common-log-format
[8]: https://docs.datadoghq.com/ja/getting_started/tracing/#enable-apm
[9]: https://doc.traefik.io/traefik/v1.7/configuration/tracing/#datadog
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][5] and look for `traefik` under the Checks section.

## Compatibility

The check is compatible with all major platforms.

**Metrics**

For v2, see the list of [Traefik metrics][6] sent to Datadog.

For v1, see the list of [metrics][7] provided by the integration.

## 収集データ

### メトリクス
{{< get-metrics-from-git "traefik" >}}


### イベント

The Traefik check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "traefik" >}}


## トラブルシューティング

Need help? Contact [Datadog support][8].


[1]: https://traefik.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[6]: https://doc.traefik.io/traefik/observability/metrics/overview/
[7]: https://docs.datadoghq.com/ja/integrations/traefik/#metrics
[8]: https://docs.datadoghq.com/ja/help