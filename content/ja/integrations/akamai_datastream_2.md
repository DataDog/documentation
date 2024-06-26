---
app_id: akamai-datastream-2
app_uuid: 9a772881-d31a-4ffb-92bb-7beef1088a55
assets:
  dashboards:
    Akamai DataStream 2: assets/dashboards/akamai_datastream_2_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: akamai_datastream.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Akamai DataStream 2
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- キャッシュ
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akamai_datastream_2/README.md
display_on_public_website: true
draft: false
git_integration_title: akamai_datastream_2
integration_id: akamai-datastream-2
integration_title: Akamai DataStream 2
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: akamai_datastream_2
public_title: Akamai DataStream 2
short_description: Akamai DataStream のログを Datadog に送信
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Akamai DataStream のログを Datadog に送信
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai DataStream 2
---



## 概要

Akamai DataStream 2 は、配信プロパティのパフォーマンスおよびセキュリティログをキャプチャします。このインテグレーションは、データを Datadog にほぼリアルタイムでストリーミングし、完全なモニタリングを実現します。

## セットアップ

### インストール

Akamai DataStream 2 のログとメトリクスを表示するためのプリセットダッシュボードを有効にするには、**Install Integration** をクリックします。

### コンフィギュレーション

Akamai DataStream 2 が Datadog にログを送信するよう構成するには、[Akamai techdocs サイト上の以下の説明](https://techdocs.akamai.com/datastream2/docs/stream-datadog)に従って、ログソースを `akamai.datastream` に、ログフォーマットを `JSON` に設定することを確認します。

### 検証

このインテグレーションが正しく構成されていることを確認するには、[ソースが `akamai.datastream` のログを検索][1]します。Akamai でデータストリームを構成した後、Datadog でログが表示されるまで数分待つ必要があるかもしれません。

## 収集データ

### メトリクス

Akamai DataStream 2 には、メトリクスは含まれません。

### サービスのチェック

Akamai DataStream 2 には、サービスのチェック機能は含まれません。

### イベント

Akamai DataStream 2 には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Akamai Datastream 2 を監視する][3]

[1]: https://app.datadoghq.com/logs?query=source%3Aakamai.datastream
[2]: https://docs.datadoghq.com/ja/help/
[3]: https://www.datadoghq.com/blog/monitor-akamai-datastream2/