---
app_id: scalr
app_uuid: d74ce5c8-4e5a-485a-be79-ff55f8205c9d
assets:
  dashboards:
    Scalr Overview Dashboard: assets/dashboards/scalr_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: scalr.runs.count
      metadata_path: metadata.csv
      prefix: scalr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10312
    source_type_name: Scalr (Community Version)
author:
  homepage: https://scalr.com
  name: Scalr
  sales_email: sales@scalr.com
  support_email: support@scalr.com
categories:
- automation
- configuration & deployment
- orchestration
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/scalr/README.md
display_on_public_website: true
draft: false
git_integration_title: scalr
integration_id: scalr
integration_title: Scalr
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: scalr
public_title: Scalr
short_description: Scalr is a Terraform Automation and COllaboration (TACO) product
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Configuration & Deployment
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Scalr is a Terraform Automation and COllaboration (TACO) product
  media:
  - caption: Scalr dashboard.
    image_url: images/scalr_dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.scalr.com
  - resource_type: documentation
    url: https://docs.scalr.com/en/latest/integrations.html#datadog
  support: README.md#Support
  title: Scalr
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Scalr は、テラフォームの運用を分散化するための制御、可視化、柔軟性を一箇所で提供するテラフォームクラウドの代替品です。

Scalr [インテグレーション][1]は、キューの実行、キューの状態、環境数、ワークスペース数など、詳細な分析とレポートのための Terraform ラン実行[イベント][2]の詳細とメトリクスを送ります。これらのメトリクスはすぐに使えるダッシュボードで視覚化され、デプロイメントと他のインフラストラクチャーの変更の関連付けや、Terraform パイプライン内のトレンドの追跡に役立ちます。

## セットアップ
Scalr インテグレーションは [Datadog Agent][3] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Datadog Agent v7.21 または v6.21 以降の場合、以下の手順に従ってホストに Scalr インテグレーションをインストールします。Datadog Agent 以前のバージョンでインストールする場合は、[コミュニティインテグレーションを利用する][4]を参照してください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-scalr==1.0.0
   ```

2. Agent ベースの[インテグレーション][5]と同様にインテグレーションを構成します。

### 構成

1. [Scalr のメトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `scalr.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル scalr.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent のステータスサブコマンド][9]を実行し、Checks セクションで `scalr` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "scalr" >}}


### イベント

Scalr は、実行結果をイベントとして[イベントエクスプローラー][12]に送信します。

## トラブルシューティング

ヘルプが必要ですか？[Datadog サポート][13]または [Scalr サポート][14]にお問い合わせください。

## その他の参考資料

- [Scalr の顧客向けドキュメント][15]
- [Scalr Datadog インテグレーションドキュメント][16]


[1]: https://docs.scalr.com/en/latest/integrations.html
[2]: https://docs.datadoghq.com/ja/events/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/scalr/datadog_checks/scalr/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/scalr/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/scalr/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/events/explorer/
[13]: https://docs.datadoghq.com/ja/help/
[14]: https://scalr-labs.atlassian.net/servicedesk/customer/portal/31
[15]: https://docs.scalr.com
[16]: https://docs.scalr.com/en/latest/integrations.html#datadog