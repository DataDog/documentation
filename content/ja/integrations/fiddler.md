---
app_id: fiddler
app_uuid: ee617671-508e-4bb3-ba25-8815b11a16aa
assets:
  dashboards:
    Fiddler: assets/dashboards/fiddler_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: fiddler.accuracy
      metadata_path: metadata.csv
      prefix: fiddler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: fiddler
author:
  homepage: http://www.fiddler.ai
  name: Fiddler
  sales_email: sales@fiddler.ai
  support_email: sales@fiddler.ai
categories:
- アラート設定
- モニタリング
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/fiddler/README.md
display_on_public_website: true
draft: false
git_integration_title: fiddler
integration_id: fiddler
integration_title: Fiddler
integration_version: 1.0.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: fiddler
oauth: {}
public_title: Fiddler
short_description: Fiddler Datadog インテグレーションによる ML システムの可視化
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Alerting
  - Category::Monitoring
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Events
  - Queried Data Type::Metrics
  configuration: README.md#Setup
  description: Fiddler Datadog インテグレーションによる ML システムの可視化
  media:
  - caption: DataDog の Fiddler ダッシュボード
    image_url: images/fiddler-datadog.png
    media_type: image
  - caption: モデル精度チャート
    image_url: images/accuracy-drift.png
    media_type: image
  - caption: モデル分析
    image_url: images/analytics.png
    media_type: image
  - caption: 反実仮想的な説明の実行
    image_url: images/counterfactual.png
    media_type: image
  - caption: データドリフトチャート
    image_url: images/data-drift.png
    media_type: image
  - caption: モデル説明
    image_url: images/explanation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Fiddler
---



## 概要
Fiddler のモデルパフォーマンス管理プラットフォームは、モデルのパフォーマンスメトリクスが低下したときにリアルタイムでアラートを送信して機械学習モデルのパフォーマンスを監視し、ユーザーは推論データを分析してモデルのパフォーマンスが低下している理由を理解することが可能です。このインテグレーションには、メトリクスと精度、トラフィック、ドリフトなどのパフォーマンスメトリクスを表示するすぐに使えるダッシュボードが含まれています。


## セットアップ

Fiddler チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### APM に Datadog Agent を構成する

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Fiddler チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   /opt/datadog-agent/embedded/bin/pip install fiddler-client
   datadog-agent integration install -t datadog-fiddler==1.0.0
   ```

2. Agent ベースの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダ内の `fiddler.d/conf.yaml` ファイルを編集し、Fiddler のパフォーマンスデータの収集を開始します。利用可能なすべての構成オプションは、[サンプル `fiddler.d/conf.yaml`][4] を参照してください。`url`、`org`、`fiddler_api_key` パラメーターは、インテグレーションがクエリしたい Fiddler 環境用に更新する必要があります。また、Fiddler は `conf.yaml` ファイル内の `minimum_collection_interval` 設定を `300` (5分) に設定することを推奨します。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `fiddler` を探します。

## 収集データ

### メトリクス

このチェックによって提供されるメトリクスのリストについては、[metadata.csv][7] を参照してください。

### サービスのチェック
{{< get-service-checks-from-git "fiddler" >}}


## トラブルシューティング

ご不明な点は、[Fiddler のサポートチーム][9]までお問い合わせください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/datadog_checks/fiddler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/assets/service_checks.json
[9]: https://fiddlerlabs.zendesk.com/hc/en-us