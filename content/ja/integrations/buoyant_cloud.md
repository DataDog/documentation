---
app_id: buoyant-cloud
app_uuid: dee4b74f-34b7-457e-98b1-7bb8306f2c18
assets:
  dashboards:
    Buoyant Cloud: assets/dashboards/buoyant_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check:
      - buoyant_cloud.cp_workload.inbound_response.rate1m
      metadata_path: metadata.csv
      prefix: buoyant_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10320
    source_type_name: Buoyant Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://buoyant.io/cloud
  name: Buoyant
  sales_email: cloud@buoyant.io
  support_email: cloud@buoyant.io
categories:
- クラウド
- ネットワーク
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/buoyant_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: buoyant_cloud
integration_id: buoyant-cloud
integration_title: Buoyant Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: buoyant_cloud
public_title: Buoyant Cloud
short_description: Buoyant Cloud は、お客様のクラスター上でフルマネージド Linkerd を提供します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Buoyant Cloud は、お客様のクラスター上でフルマネージド Linkerd を提供します。
  media:
  - caption: 'Buoyant Cloud: Datadog ダッシュボード'
    image_url: images/bcloud_datadog_dashboard.png
    media_type: image
  - caption: 'Buoyant Cloud: 概要ページ'
    image_url: images/bcloud_01.png
    media_type: image
  - caption: 'Buoyant Cloud: Linkerd 健全性ビュー'
    image_url: images/bcloud_02.png
    media_type: image
  - caption: 'Buoyant Cloud: マネージド Linkerd イベント'
    image_url: images/bcloud_03.png
    media_type: image
  - caption: 'Buoyant Cloud: トラフィックページ'
    image_url: images/bcloud_04.png
    media_type: image
  - caption: 'Buoyant Cloud: トポロジーページ'
    image_url: images/bcloud_05.png
    media_type: image
  - caption: 'Buoyant Cloud: メトリクスページ'
    image_url: images/bcloud_06.png
    media_type: image
  - caption: 'Buoyant Cloud: ワークロード詳細ページ'
    image_url: images/bcloud_07.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Buoyant Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Buoyant Cloud][1] は、Linkerd の健全性とデプロイメントを監視するために、お客様のクラスター上でフルマネージド Linkerd を提供します。このインテグレーションにより、Linkerd の健全性、ワークロードのトラフィック、ロールアウトのイベント、メトリクスを監視し、アラートを受け取ることができます。

## 計画と使用

### インフラストラクチャーリスト

このインテグレーションを使用するには、[Buoyant Cloud][1] にアカウントが必要です。また、Datadog マーケットプレイスで Buoyant Cloud にサインアップすることができます。

### ブラウザトラブルシューティング

1. タイルの **Connect Accounts** ボタンをクリックし、OAuth フローを完了します。
2. [Buoyant Cloud Notifications][2] ページを参照します。
3. **Events** または **Metrics** でルールを追加または編集します。
4. **Destinations** セクションに移動し、Datadog アカウントを選択すると、通知ルールに一致するすべてのイベントまたはメトリクスが Datadog に送信されます。

### 検証

Buoyant Cloud がイベントを作成すると、Datadog の[イベントエクスプローラー][3]にイベントが表示されます。メトリクスは、Datadog の[メトリクスエクスプローラー][4]に表示されます。

## アンインストール

1. [Buoyant Cloud Settings][5] ページを参照します。
2. Datadog 組織の右側にあるケバブメニューをクリックします。
3. **Remove** をクリックします。

また、[API Keys ページ][6]でインテグレーション名を検索して、このインテグレーションに紐付けられた全ての API キーが無効になったことを確認してください。

## リアルユーザーモニタリング

### ヘルプ

Buoyant Cloud は Datadog に[イベント][3]を送信します。これには以下が含まれます。

- Linkerd ヘルスアラート
- Linkerd 構成アラート
- ワークロードトラフィックアラート
- ワークロードロールアウト
- 手動イベント

### データセキュリティ

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][7] を参照してください。

## ヘルプ

ヘルプが必要ですか？次のようなサポートを受けることができます。

- [Buoyant Cloud のドキュメント][8]を参照する
- [Linkerd Slack][9] で声をかける
- [Buoyant Cloud チームにメールする][10]

[1]: https://buoyant.io/cloud
[2]: https://buoyant.cloud/notifications
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://buoyant.cloud/settings
[6]: https://app.datadoghq.com/organization-settings/api-keys?filter=Buoyant%20Cloud
[7]: https://github.com/DataDog/integrations-extras/blob/master/buoyant_cloud/metadata.csv
[8]: https://docs.buoyant.cloud
[9]: https://slack.linkerd.io
[10]: mailto:cloud@buoyant.io