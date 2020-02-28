---
categories:
  - モニター
  - notification
  - cloud
ddtype: crawler
dependencies: []
description: Segment インテグレーションは、配信先ワークスペースのイベント配信メトリクスを収集
doc_link: 'https://docs.datadoghq.com/integrations/segment/'
git_integration_title: segment
has_logo: true
integration_title: Segment
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: segment
public_title: Datadog-Segment インテグレーション
short_description: Segment のイベント配信メトリクスを収集
version: '1.0'
---
## 概要

Segment と接続して、以下のことができます。

- クラウドモードの配信先のイベント配信メトリクスを視覚化できます。
- Datadog のタグシステムを使用してデータを分析できます (ワークスペースや配信先でメトリクスを細分するなど)。

## セットアップ

### インストール

[インテグレーションタイル][1]に移動し、`Add WorkSpace` リンクをクリックして Oauth2 フローを開始することで、Datadog にワークスペースへの `workspace:read` アクセス権を付与します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "segment" >}}


### イベント

Segment インテグレーションには、イベントは含まれません。

### サービスのチェック

Segment インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/ja/help