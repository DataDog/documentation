---
app_id: google-eventarc
app_uuid: a10c14f9-f630-439f-a181-c49a1ac79dc5
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 346
    source_type_name: Google Eventarc
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- google cloud
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_eventarc
integration_id: google-eventarc
integration_title: Google Eventarc
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_eventarc
public_title: Google Eventarc
short_description: Eventarc を使用すると、Google のサービス、SaaS、独自のアプリからイベントを取り込めます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: Eventarc を使用すると、Googleサービス、SaaS、独自のアプリからイベントをインポートすることができます。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
  support: README.md#Support
  title: Google Eventarc
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Datadog のイベントを [Eventarc][1] に送信して Google サービスに配信し、Datadog のモニター通知で Eventarc 主導のワークフローを開始できるようにします。

## セットアップ

1. 通知を受け取る各 GCP プロジェクトに、メインの [GCP インテグレーション][2]がインストールされていることを確認します。

2. Google Cloud Console で [Eventarc チャネルの作成][3]を行います。

3. Datadog アプリケーション内で、以下の例に示すような構文を使用して、モニターの[通知セクション][4]にチャンネル名とアクティベーショントークンを設定します。

![Datadog モニター構成ページの「Say what's happening」セクションに、タイトル「HDD Disk Size Above Capacity」が表示されています。通知本文には、Eventarc チャンネルに送信する次の例が記載されています: The alert notification will be sent to @eventarc-datadog-sandbox_us-central1_my-channel that will trigger Cloud Function: Bump Quota.][5]

### 検証

インテグレーションが有効になると、Google Cloud Console でチャンネルが **Pending** から **Active** になります。

### 自動化されたアクション

GCP Eventarc インテグレーションを使用して、モニター用の新しい送信通知チャンネルを設定し、自動化されたアクションを開始することができます。自動化されたアクションを使用すると、GCP リソースを構成して以下のことを行うことができます。

  - Datadog のモニターを使用して Eventarc ワークフローをキックオフする
  - Google 内で、Cloud Functions、BigQuery などを Datadog のモニターにリンクさせる
  - アラートイベント内の情報を使用して、自動修復パイプラインやランブックの実行、分析クエリの実行などを行う

ターゲットに指定できるリソースの一覧は、[GCP ドキュメント][6]で確認できます。

## 収集データ

### メトリクス

Google Eventarc インテグレーションには、メトリクスは含まれません。

### イベント

Google Eventarc インテグレーションには、イベントは含まれません。

### サービスチェック

Google Eventarc インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Eventarc と Datadog でインシデント対応のワークフローを自動化する][8]

[1]: https://cloud.google.com/eventarc/docs
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[3]: https://cloud.google.com/eventarc/docs/third-parties/create-channels
[4]: https://docs.datadoghq.com/ja/monitors/notify/
[5]: images/eventarc_channel_notification.png
[6]: https://cloud.google.com/eventarc/docs/targets
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/