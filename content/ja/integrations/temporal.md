---
app_id: temporal
app_uuid: 6fbb6b85-e9f0-4d0e-af82-3c82871b857c
assets:
  dashboards:
    Temporal Server Overview: assets/dashboards/server_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: temporal.server.task.requests.count
      metadata_path: metadata.csv
      prefix: temporal.
    process_signatures:
    - temporal-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Temporal
  logs:
    source: temporal
  monitors:
    frontend latency: assets/monitors/FrontendLatency.json
    history latency: assets/monitors/HistoryLatency.json
    matching latency: assets/monitors/MatchingLatency.json
    persistence latency: assets/monitors/PersistenceLatency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/temporal/README.md
display_on_public_website: true
draft: false
git_integration_title: temporal
integration_id: temporal
integration_title: Temporal
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: temporal
public_title: Temporal
short_description: Temporal Cluster の健全性とパフォーマンスを監視します。
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
  - Category::Log Collection
  configuration: README.md#Setup
  description: Temporal Cluster の健全性とパフォーマンスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Temporal
---



## 概要

このチェックは、Datadog Agent を通じて [Temporal][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Temporal チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. [Temporal の公式ドキュメント][4]に従って、`prometheus` エンドポイント経由でメトリクスを公開するように Temporal サービスを構成してください。

2. Temporal のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートの `conf.d/` フォルダーにある `temporal.d/conf.yaml` ファイルを編集します。

まずは、Temporal サーバーの構成にある `listenAddress` と `handlerPath` オプションに合うように `openmetrics_endpoint` オプションを構成します。

クラスター内の Temporal サービスが独立してデプロイされている場合、各サービスは独自のメトリクスを公開することに注意してください。そのため、監視したいサービスごとに `prometheus` エンドポイントを構成し、それぞれのサービスに対してインテグレーションの構成で別の `instance` を定義する必要があります。

使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル temporal.d/conf.yaml][5] を参照してください。

#### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. [公式ドキュメント][6]に従って、Temporal Cluster がログをファイルに出力するように構成します。

3. `temporal.d/conf.yaml` ファイルの logs 構成ブロックのコメントを解除して編集し、`path` が Temporal Cluster で構成したファイルを指すように設定します。

  ```yaml
  logs:
    - type: file
      path: /var/log/temporal/temporal-server.log
      source: temporal
  ```

4. [Agent を再起動します][7]。

### 検証

[Agent のステータスサブコマンドを実行][8]し、Checks セクションで `temporal` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "temporal" >}}


### イベント

Temporal インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "temporal" >}}


### ログ管理

Temporal インテグレーションは、Temporal Cluster からログを収集し、Datadog に転送することができます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://temporal.io/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.temporal.io/references/configuration#prometheus
[5]: https://github.com/DataDog/integrations-core/blob/master/temporal/datadog_checks/temporal/data/conf.yaml.example
[6]: https://docs.temporal.io/references/configuration#log
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/temporal/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/temporal/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/