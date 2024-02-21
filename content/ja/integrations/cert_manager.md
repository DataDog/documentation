---
app_id: cert-manager
app_uuid: d8bac6db-8cf7-49ca-a4b8-643714fbc7b9
assets:
  dashboards:
    Cert-Manager Overview Dashboard: assets/dashboards/certmanager_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cert_manager.clock_time
      metadata_path: metadata.csv
      prefix: cert_manager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: cert-manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- security
- 構成 & デプロイ
- containers
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cert_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: cert_manager
integration_id: cert-manager
integration_title: cert-manager
integration_version: 3.1.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: cert_manager
public_title: cert-manager
short_description: cert-manager のすべてのメトリクスを Datadog で追跡
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
  - Category::Security
  - Category::Configuration & Deployment
  - Category::Containers
  configuration: README.md#Setup
  description: cert-manager のすべてのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: cert-manager
---



## 概要

このチェックは、[cert-manager][1] からメトリクスを収集します。

![Cert-Manager 概要ダッシュボード][2]

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

cert_manager チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. cert_manager のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cert_manager.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル cert_manager.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `cert_manager` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cert_manager" >}}


### イベント

cert_manager インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "cert_manager" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://github.com/jetstack/cert-manager
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cert_manager/images/overview_dashboard.png
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/