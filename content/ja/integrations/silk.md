---
app_id: silk
app_uuid: 1f436ae6-e063-408f-ad35-37ee37fa2183
assets:
  dashboards:
    Silk - Overview: assets/dashboards/silk_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: silk.system.capacity.free
      metadata_path: metadata.csv
      prefix: silk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Silk
  monitors:
    Latency high: assets/recommended_monitors/latency_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- data store
- プロビジョニング
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/silk/README.md
display_on_public_website: true
draft: false
git_integration_title: silk
integration_id: silk
integration_title: Silk
integration_version: 1.2.3
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: silk
public_title: Silk
short_description: Silk のパフォーマンスとシステム統計情報を監視します。
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
  - Category::Data Store
  - Category::Provisioning
  configuration: README.md#Setup
  description: Silk のパフォーマンスとシステム統計情報を監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Silk
---



## 概要

このチェックは、Datadog Agent を通じて [Silk][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Silk チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Silk のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `silk.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル silk.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `silk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "silk" >}}


### イベント

Silk インテグレーションは、Silk サーバーから発信されるイベントを記録します。イベントレベルは以下のようにマッピングされます。

| Silk                      | Datadog                            |
|---------------------------|------------------------------------|
| `INFO`                    | `info`                             |
| `ERROR`                   | `error`                            |
| `WARNING`                 | `warning`                          |
| `CRITICAL`                | `error`                            |


### サービスのチェック
{{< get-service-checks-from-git "silk" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://silk.us/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/silk/datadog_checks/silk/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/silk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/silk/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/