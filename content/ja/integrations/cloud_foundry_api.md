---
app_id: cloud-foundry-api
app_uuid: a0c8e3e8-f3de-4405-88d3-0856e6c0948f
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloud_foundry_api.events.count
      metadata_path: metadata.csv
      prefix: cloud_foundry_api.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cloud Foundry API
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/README.md
display_on_public_website: true
draft: false
git_integration_title: cloud_foundry_api
integration_id: cloud-foundry-api
integration_title: Cloud Foundry API
integration_version: 3.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cloud_foundry_api
public_title: Cloud Foundry API
short_description: Cloud Foundry 監査イベントの収集。
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
  - Category::Cloud
  - Category::Orchestration
  configuration: README.md#Setup
  description: Cloud Foundry 監査イベントの収集。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cloud Foundry API
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、[Cloud Foundry API][1] にクエリを実行して監査イベントを収集し、Agent 経由で Datadog に送信します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Cloud Foundry API チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. Cloud Foundry API のデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cloud_foundry_api.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cloud_foundry_api.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `cloud_foundry_api` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "cloud_foundry_api" >}}


### ヘルプ

Cloud Foundry API インテグレーションは、構成された監査イベントを収集します。

### ヘルプ
{{< get-service-checks-from-git "cloud_foundry_api" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: http://v3-apidocs.cloudfoundry.org
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/datadog_checks/cloud_foundry_api/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help