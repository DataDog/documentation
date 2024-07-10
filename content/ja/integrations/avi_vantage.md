---
app_id: avi-vantage
app_uuid: a3f11e6a-fdb7-421d-ad5c-dbfa987b8df8
assets:
  dashboards:
    Avi Vantage - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - avi_vantage.controller_stats.avg_cpu_usage
      - avi_vantage.pool_healthscore
      - avi_vantage.service_engine_healthscore
      - avi_vantage.virtual_service_healthscore
      metadata_path: metadata.csv
      prefix: avi_vantage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10189
    source_type_name: Avi Vantage
  monitors:
    Avi Vantage - Error Rate Monitor: assets/monitors/error_rate_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/avi_vantage/README.md
display_on_public_website: true
draft: false
git_integration_title: avi_vantage
integration_id: avi-vantage
integration_title: Avi Vantage
integration_version: 4.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: avi_vantage
public_title: Avi Vantage
short_description: Avi Vantage インスタンスの健全性とパフォーマンスを監視。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Avi Vantage インスタンスの健全性とパフォーマンスを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Avi Vantage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Avi Vantage][1] を監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Avi Vantage チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. avi_vantage のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `avi_vantage.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル avi_vantage.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションの `avi_vantage` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "avi_vantage" >}}


### ヘルプ

Avi Vantage には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://avinetworks.com/why-avi/multi-cloud-load-balancing/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/datadog_checks/avi_vantage/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/