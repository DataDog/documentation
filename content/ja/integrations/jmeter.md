---
app_id: jmeter
app_uuid: be62a333-998e-4fea-b0e4-dd4a45b859b4
assets:
  dashboards:
    JMeter Overview: assets/dashboards/JMeterOverview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: jmeter.responses_count
      metadata_path: metadata.csv
      prefix: jmeter.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10164
    source_type_name: JMeter
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- testing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md
display_on_public_website: true
draft: false
git_integration_title: jmeter
integration_id: jmeter
integration_title: JMeter
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jmeter
public_title: JMeter
short_description: A Datadog plugin for Apache JMeter
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
  description: A Datadog plugin for Apache JMeter
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JMeter
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog Backend Listener for Apache JMeter は、テスト結果を Datadog プラットフォームに送信するために使用される、オープンソースの JMeter プラグインです。これにより、レイテンシー、送受信されるバイト数などのテストメトリクスをリアルタイムで報告できます。また、完全なテスト結果をログエントリとして Datadog へ送信することも可能です。

## セットアップ

### インストール

Datadog Backend Listener プラグインは手動でインストールする必要があります。[GitHub リポジトリ][1]の最新リリースと最新のインストール手順を参照してください。

#### 手動インストール

1. [リリースページ][2]から Datadog プラグイン JAR ファイルをダウンロードします。
2. JMeter インストール内の `lib/ext` ディレクトリに JAR を配置します。
3. JMeter を起動します (またはアプリケーションを終了し、再度開きます)。

#### JMeter Plugins Manager

1. まだ構成されていない場合は、[JMeter Plugins Manager JAR][3] をダウンロードします。
2. ダウンロードが完了したら、JMeter インストール内の `lib/ext` ディレクトリに `.jar` を配置します。
3. JMeter を起動します (またはアプリケーションを終了し、再度開きます)。
4. `Options > Plugins Manager > Available Plugins` に移動します。
5. "Datadog Backend Listener" を検索します。
6. Datadog Backend Listener プラグインの横のチェックボックスをクリックします。
7. "Apply Changes and Restart JMeter" をクリックします。

### 構成

Datadog にメトリクスの報告を開始するには

1. Datadog にメトリクスを送信したいスレッドグループまたはテストプランを右クリックします。
2. `Add > Listener > Backend Listener` に移動します。
3. `Backend Listener Implementation` を修正し、ドロップダウンから `org.datadog.jmeter.plugins.DatadogBackendClient` を選択します。
4. 変数 `apiKey` に [Datadog API キー][4]を設定します。
5. テストを実行し、メトリクスが Datadog に表示されたことを確認します。

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
|excludeLogsResponseCodeRegex|false|`""`| `sendResultsAsLogs` を設定すると、デフォルトですべての結果をログとして Datadog に送信します。このオプションを使用すると、レスポンスコードが指定した正規表現に一致する結果を除外することができます。例えば、`[123][0-5][0-9]` と設定すると、エラーだけを送信することができます。|
|samplersRegex|false|.*|監視するサンプラーをフィルターするための任意の正規表現。|
|customTags|false|`""`|すべてのメトリクスに追加するタグのカンマ区切りリスト

## 収集データ

### メトリクス
{{< get-metrics-from-git "jmeter" >}}


### サービスチェック

JMeter には、サービスのチェック機能は含まれません。

### イベント

JMeter には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

  - [Datadog で JMeter テスト結果を監視する][7]

[1]: https://github.com/DataDog/jmeter-datadog-backend-listener
[2]: https://github.com/DataDog/jmeter-datadog-backend-listener/releases
[3]: https://jmeter-plugins.org/wiki/PluginsManager/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/DataDog/integrations-core/blob/master/jmeter/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/