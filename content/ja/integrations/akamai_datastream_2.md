---
assets:
  dashboards:
    Akamai DataStream 2: assets/dashboards/akamai_datastream_2_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories: []
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akamai_datastream_2/README.md
display_name: Akamai DataStream 2
draft: false
git_integration_title: akamai_datastream_2
guid: 864804b8-5a2a-4fd2-be08-ca23219c48ef
integration_id: akamai-datastream-2
integration_title: Akamai DataStream 2
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: akamai_datastream.
name: akamai_datastream_2
public_title: Akamai DataStream 2
short_description: Akamai DataStream のログを Datadog に送信
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

Akamai DataStream 2 は、配信プロパティのパフォーマンスおよびセキュリティログをキャプチャします。このインテグレーションは、データを Datadog にほぼリアルタイムでストリーミングし、完全なモニタリングを実現します。

## セットアップ

### インストール

Akamai DataStream 2 のログとメトリクスを表示するためのプリセットダッシュボードを有効にするには、**Install Integration** をクリックします。

### コンフィギュレーション

Akamai DataStream 2 が Datadog にログを送信するよう構成するには、[Akamai techdocs サイト上の以下の説明](https://techdocs.akamai.com/datastream2/docs/stream-datadog)に従って、ログソースを `akamai.datastream` に設定することを確認します。

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

[1]: https://app.datadoghq.com/logs?query=source%3Aakamai.datastream
[2]: https://docs.datadoghq.com/ja/help/