---
aliases:
- /ja/integrations/akamai_datastream_2
app_id: akamai-datastream-2
categories:
- キャッシュ
- log collection
custom_kind: integration
description: Akamai DataStream のログを Datadog に送信
further_reading:
- link: https://www.datadoghq.com/blog/monitor-akamai-datastream2/
  tag: blog
  text: Datadog で Akamai DataStream 2 を監視する
media: []
supported_os:
- linux
- windows
- macos
title: Akamai DataStream 2
---
## 概要

Akamai DataStream 2 は、Akamai Intelligent Edge Platform のプロパティのパフォーマンス、セキュリティ、および CDN の健全性に関するログをキャプチャします。このインテグレーションは、データを Datadog にほぼリアルタイムでストリーミングします。

Akamai DataStream 2 のログを使うと、長期的な傾向を把握し、パフォーマンスやセキュリティ上の問題を解決し、高スループットなデータ配信ストリームを監視できます。詳しい説明やユース ケースについては、[DataStream 2 ドキュメント](https://techdocs.akamai.com/datastream2/docs) を参照してください。

## セットアップ

### インストール

Akamai DataStream 2 のログとメトリクスを表示するためのプリセットダッシュボードを有効にするには、**Install Integration** をクリックします。

### 設定

Akamai DataStream 2 が Datadog にログを送信するよう構成するには、[Akamai techdocs サイト上の以下の説明](https://techdocs.akamai.com/datastream2/docs/stream-datadog)に従って、ログソースを `akamai.datastream` に、ログフォーマットを `JSON` に設定することを確認します。

ページ右側の Datadog Site セレクターが、ご利用の [Datadog Site](https://docs.datadoghq.com/getting_started/site/) に設定されていることを確認し、以下のログ エンドポイント URL をコピーしてください:

`https://{{< region-param key="http_endpoint" code="true" >}}/v1/input`

### 検証

このインテグレーションが正しく設定されていることを確認するには、source `akamai.datastream` のログを [検索](https://app.datadoghq.com/logs?query=source%3Aakamai.datastream) してください。Akamai 側で datastream を設定してから、Datadog にログが表示されるまで数分かかる場合があります。

## 収集データ

### メトリクス

Akamai DataStream 2 には、メトリクスは含まれません。

### サービス チェック

Akamai DataStream 2 には、サービスのチェック機能は含まれません。

### イベント

Akamai DataStream 2 には、イベントは含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [Datadog で Akamai Datastream 2 を監視する](https://www.datadoghq.com/blog/monitor-akamai-datastream2/)