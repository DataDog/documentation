---
app_id: jmeter
app_uuid: be62a333-998e-4fea-b0e4-dd4a45b859b4
assets:
  dashboards:
    JMeter Overview: assets/dashboards/JMeterOverview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: jmeter.responses_count
      metadata_path: metadata.csv
      prefix: jmeter.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: JMeter
  logs:
    source: jmeter
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- テスト
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md
display_on_public_website: true
draft: false
git_integration_title: jmeter
integration_id: jmeter
integration_title: JMeter
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: jmeter
oauth: {}
public_title: JMeter
short_description: Apache JMeter 用 Datadog プラグイン
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
  - Category::Log Collection
  - Category::Testing
  configuration: README.md#Setup
  description: Apache JMeter 用 Datadog プラグイン
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JMeter
---



## 概要

Datadog Backend Listener for Apache JMeter は、テスト結果を Datadog プラットフォームに送信するために使用される、オープンソースの JMeter プラグインです。これにより、レイテンシー、送受信されるバイト数などのテストメトリクスをリアルタイムで報告できます。また、完全なテスト結果をログエントリとして Datadog へ送信することも可能です。

## セットアップ

### インストール

Datadog Backend Listener プラグインは、手動でインストールする必要があります。最新リリースと、インストール手順の詳細は[リポジトリのリリースページ][1]でご確認ください。

### コンフィギュレーション

プラグインには以下のコンフィギュレーションオプションがあります。

| 名前       | 必須 | デフォルト値 | 説明|
|------------|:--------:|---------------|------------|
|apiKey | true | NA | Datadog API キー。|
|datadogUrl | false | https://api.datadoghq.com/api/ | Datadog インスタンスが EU にある場合は、異なるエンドポイントを構成する（例: https://api.datadoghq.eu/api/）ことができます|
|logIntakeUrl | false | https://http-intake.logs.datadoghq.com/v1/input/ | Datadog インスタンスが EU にある場合は、異なるエンドポイントを構成する（例: https://http-intake.logs.datadoghq.eu/v1/input/）ことができます。|
|metricsMaxBatchSize|false|200|メトリクスは、`metricsMaxBatchSize` サイズのバッチ内で 10 秒ごとに送信されます。|
|logsBatchSize|false|500|ログは、`logsBatchSize` のサイズに到達するとすぐにバッチ内で送信されます。|
|sendResultsAsLogs|false|false|デフォルトでは、メトリクスのみが Datadog に報告されます。個別のテスト結果をログイベントとして報告するには、このフィールドを `true` に設定します。|
|includeSubresults|false|false|Subresult は、たとえば個別の HTTP リクエストがリダイレクトに従わなければならない時に使用されます。デフォルトで、subresult は無視されます。|
|samplersRegex|false|.*|監視するサンプラーをフィルターするための任意の正規表現。|

## 収集データ

### メトリクス
{{< get-metrics-from-git "jmeter" >}}


### サービスのチェック

JMeter には、サービスのチェック機能は含まれません。

### イベント

JMeter には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

  - [Datadog で JMeter テスト結果を監視する][4]

[1]: https://github.com/DataDog/jmeter-datadog-backend-listener/releases
[2]: https://github.com/DataDog/integrations-core/blob/master/jmeter/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/