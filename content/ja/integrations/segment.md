---
app_id: セグメント
app_uuid: e5d343b7-3687-442c-b0ca-6f6b53687fd3
assets:
  dashboards:
    Segment-Overview: assets/dashboards/Segment-Overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: segment.event_delivery.successes
      metadata_path: metadata.csv
      prefix: segment.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 231
    source_type_name: セグメント
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- notifications
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: segment
integration_id: セグメント
integration_title: Segment
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: segment
public_title: セグメント
short_description: どのアプリやデバイスからでも顧客データを収集し、統合し、付加価値を高めます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: どのアプリやデバイスからでも顧客データを収集し、統合し、付加価値を高めます。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-segment-datadog/
  support: README.md#Support
  title: セグメント
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

## 概要

Segment は、ファーストパーティの顧客データのクリーニング、収集、制御を容易にする顧客データインフラストラクチャーです。Segment は、Web サイトやモバイルアプリなどのソースからデータを収集し、1 つまたは複数の宛先 (例えば、Google Analytics や Amazon Redshift) にルーティングします。

Datadog のすぐに使えるダッシュボードとモニターを使用することで、次のことが可能になります。
- クラウドモードの配信先のイベント配信メトリクスを視覚化できます。
- Datadog のタグシステムを使用してデータを分析できます (ワークスペースや配信先でメトリクスを細分するなど)。
- 配信の問題に対してアラートを自動化し、重要なデータパイプラインがダウンしたときに通知を受けるようにします。

**注**: これらのメトリクスは、Snowflake や Amplitude などの宛先への配信を目的としており、インスツルメントされたアプリケーションからセグメントへの配信を目的としていません。

## セットアップ

### インストール

[インテグレーションタイル][1]に移動し、`Add WorkSpace` リンクをクリックして Oauth2 フローを開始することで、Datadog にワークスペースへの `workspace:read` アクセス権を付与します。
Datadog にワークスペースへのアクセスを付与するセグメントのユーザーには、`workspace owner` の役割がある必要があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "segment" >}}


### サービスチェック

Segment には、サービス チェックは含まれません。

### イベント

Segment には、イベントが含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/