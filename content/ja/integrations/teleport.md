---
app_id: teleport
app_uuid: e47d5541-de7d-4ce6-8105-03c6dac5852a
assets:
  dashboards:
    Teleport Overview: assets/dashboards/teleport_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - teleport.common.process_state
      - teleport.common.rx
      - teleport.common.tx
      - teleport.common.teleport_build_info
      metadata_path: metadata.csv
      prefix: teleport.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7291105
    source_type_name: Teleport
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teleport/README.md
display_on_public_website: true
draft: false
git_integration_title: teleport
integration_id: teleport
integration_title: Teleport
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: teleport
public_title: Teleport
short_description: Collect key metrics to monitor the health of your Teleport instance.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Cloud
  - Category::Security
  configuration: README.md#Setup
  description: Collect key metrics to monitor the health of your Teleport instance.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Teleport
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Teleport][1] through the Datadog Agent.

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

The Teleport integration is included in the Datadog Agent package. No additional installation is needed on your server.

### 前提条件

The Teleport check gathers Teleport's metrics and performance data using two distinct endpoints:

- The [Health endpoint][3] provides the overall health status of your Teleport instance.
- The [OpenMetrics endpoint][4] extracts metrics on the Teleport instance and the various services operating within that instance.

These endpoints aren't activated by default. To enable the diagnostic HTTP endpoints in your Teleport instance, please refer to the public Teleport [documentation][5].

### 構成

##### メトリクスの収集

1. Edit the `teleport.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your teleport performance data. See the [sample teleport.d/conf.yaml][6] for all available configuration options.

2. [Agent を再起動します][7]。

##### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Edit the `logs` section of your `teleport.d/conf.yaml` file to start collecting your Teleport logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/teleport/teleport.log
       source: teleport
       service: telepor-service
      log_processing_rules:
         - type: multi_line
         name: logs_start_with_date
         pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

3. [Agent を再起動します][8]。

### 検証

[Run the Agent's status subcommand][9] and look for `teleport` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "teleport" >}}


### イベント

The Teleport integration does not include any events.

### サービスチェック

The Teleport integration does not include any service checks.

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Monitor Teleport with Datadog][11]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/teleport
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://goteleport.com/docs/management/diagnostics/monitoring/#healthz
[4]: https://goteleport.com/docs/reference/metrics/#auth-service-and-backends
[5]: https://goteleport.com/docs/management/diagnostics/monitoring/#enable-health-monitoring
[6]: https://github.com/DataDog/integrations-core/blob/master/teleport/datadog_checks/teleport/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/teleport/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/teleport/metadata.csv
[11]: https://www.datadoghq.com/blog/teleport-integration/
[12]: https://docs.datadoghq.com/ja/help/