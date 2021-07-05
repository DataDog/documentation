---
assets:
  dashboards:
    JMeter Overview: assets/dashboards/JMeterOverview.json
  logs:
    source: jmeter
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ログの収集
  - テスト
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md'
display_name: JMeter
draft: false
git_integration_title: jmeter
guid: 73e25799-9bc1-413b-a5f3-989a7c5bd554
integration_id: jmeter
integration_title: JMeter
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: jmeter.
metric_to_check: jmeter.responses_count
name: jmeter
public_title: JMeter
short_description: Apache JMeter 用 Datadog プラグイン
support: コア
supported_os:
  - linux
  - mac_os
  - windows
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