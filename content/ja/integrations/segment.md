---
categories:
- クラウド
- notifications
dependencies: []
description: Segment インテグレーションは、配信先ワークスペースのイベント配信メトリクスを収集
doc_link: https://docs.datadoghq.com/integrations/segment/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-segment-datadog/
  tag: ブログ
  text: Segment と Datadog を使用して顧客データインフラストラクチャーを監視する
git_integration_title: segment
has_logo: true
integration_id: ''
integration_title: Segment
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: segment
public_title: Datadog-Segment インテグレーション
short_description: Segment のイベント配信メトリクスを収集
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Segment は、ファーストパーティの顧客データのクリーニング、収集、制御を容易にする顧客データインフラストラクチャーです。Segment は、Web サイトやモバイルアプリなどのソースからデータを収集し、1 つまたは複数の宛先 (例えば、Google Analytics や Amazon Redshift) にルーティングします。

Datadog のすぐに使えるダッシュボードとモニターを使用することで、次のことが可能になります。
- クラウドモードの配信先のイベント配信メトリクスを視覚化できます。
- Datadog のタグシステムを使用してデータを分析できます (ワークスペースや配信先でメトリクスを細分するなど)。
- 配信の問題に対してアラートを自動化し、重要なデータパイプラインがダウンしたときに通知を受けるようにします。

**注**: これらのメトリクスは、Snowflake や Amplitude などの宛先への配信を目的としており、インスツルメントされたアプリケーションからセグメントへの配信を目的としていません。

## 計画と使用

### インフラストラクチャーリスト

[インテグレーションタイル][1]に移動し、`Add WorkSpace` リンクをクリックして Oauth2 フローを開始することで、Datadog にワークスペースへの `workspace:read` アクセス権を付与します。
Datadog にワークスペースへのアクセスを付与するセグメントのユーザーには、`workspace owner` の役割がある必要があります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "segment" >}}


### ヘルプ

Segment インテグレーションには、イベントは含まれません。

### ヘルプ

Segment インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/