---
app_id: pusher
app_uuid: 5ee7a117-c7d9-4389-ab02-1566c904a896
assets:
  dashboards:
    pusher: assets/dashboards/pusher_dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - pusher.messages
      metadata_path: metadata.csv
      prefix: pusher.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 165
    source_type_name: Pusher
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- message queues
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pusher
integration_id: pusher
integration_title: Pusher
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pusher
public_title: Pusher
short_description: Get metrics from Pusher into Datadog to see and monitor app engagement.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Message Queues
  configuration: README.md#Setup
  description: Get metrics from Pusher into Datadog to see and monitor app engagement.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/pusher-monitoring/
  support: README.md#Support
  title: Pusher
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/pusher/pusher_dashboard.png" alt="Pusher dashboard" popup="true">}}

## 概要

Pusher アプリ全体のリアルタイムメッセージと接続分析を監視して、以下のことができます。

- 同時接続をリアルタイムに視覚化します。
- ブロードキャスト、クライアントイベント、Webhook、API メッセージなどのタイプ別に、送信されたメッセージを追跡できます。
- 平均値、中央値、最大値、95 パーセンタイルなど、メッセージサイズの統計詳細データを取得できます。
- 課金タイムテーブル内の使用状況を監視できます。

## セットアップ

### インストール

Pusher からのメトリクスを監視するには、以下の手順に従ってください。

1. [Datadog API キー][1]をコピーします。

2. Pusher アカウント設定に移動して**Datadog インテグレーション**を選択するか、[サインイン][2]します。

3. Datadog API キーを貼り付け、**Save** をクリックします。

4. Datadog ダッシュボードに戻り、デフォルトの Pusher ダッシュボードビューにメトリクスの表示が開始されたことを確認します。

<div class="alert alert-info">
メトリクスはリアルタイムで入力されます。過去のデータは、インテグレーションが正常にインストールされた時点で入力されます。
</div>

## 収集データ

### メトリクス
{{< get-metrics-from-git "pusher" >}}


### イベント

Pusher インテグレーションには、イベントは含まれません。

### サービスチェック

Pusher インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Introducing real-time monitoring for Pusher][5]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://dashboard.pusher.com/accounts/sign_in
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/pusher/pusher_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/pusher-monitoring/