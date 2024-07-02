---
"app_id": "google-eventarc"
"app_uuid": "a10c14f9-f630-439f-a181-c49a1ac79dc5"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "346"
    "source_type_name": Google Eventarc
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cloud
- google cloud
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "google_eventarc"
"integration_id": "google-eventarc"
"integration_title": "Google Eventarc"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_eventarc"
"public_title": "Google Eventarc"
"short_description": "Eventarc lets you import events from Google services, SaaS, and your own apps."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  "configuration": "README.md#Setup"
  "description": Eventarc lets you import events from Google services, SaaS, and your own apps.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/incident-response-eventarc-datadog/"
  "support": "README.md#Support"
  "title": Google Eventarc
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Datadog のイベントを [Eventarc][1] に送信して Google サービスに配信し、Datadog のモニター通知で Eventarc 主導のワークフローを開始できるようにします。

## セットアップ

1. 通知を受け取る各 GCP プロジェクトに、メインの [GCP インテグレーション][2]がインストールされていることを確認します。

2. Google Cloud Console で [Eventarc チャネルの作成][3]を行います。

3. Datadog アプリケーション内で、以下の例に示すような構文を使用して、モニターの[通知セクション][4]にチャンネル名とアクティベーショントークンを設定します。

{{< img src="integrations/google_eventarc/eventarc_channel_notification.png" alt="Datadog モニター構成ページの say what's happening セクションに、タイトル HDD Disk Size Above Capacity と、通知本文に以下の例の eventarc チャンネルを送信する行があります: The alert notification will be sent to @eventarc-datadog-sandbox_us-central1_my-channel that will trigger Cloud Function: Bump Quota" >}}

### 検証

インテグレーションが有効になると、Google Cloud Console でチャンネルが **Pending** から **Active** になります。

### 自動化されたアクション

GCP Eventarc インテグレーションを使用して、モニター用の新しい送信通知チャンネルを設定し、自動化されたアクションを開始することができます。自動化されたアクションを使用すると、GCP リソースを構成して以下のことを行うことができます。

  - Datadog のモニターを使用して Eventarc ワークフローをキックオフする
  - Google 内で、Cloud Functions、BigQuery などを Datadog のモニターにリンクさせる
  - アラートイベント内の情報を使用して、自動修復パイプラインやランブックの実行、分析クエリの実行などを行う

ターゲットにできるリソースの完全なリストは、[GCP ドキュメント][5]にあります。

## 収集データ

### メトリクス

Google Eventarc インテグレーションには、メトリクスは含まれません。

### イベント

Google Eventarc インテグレーションには、イベントは含まれません。

### サービスチェック

Google Eventarc インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Eventarc と Datadog でインシデント対応のワークフローを自動化する][7]

[1]: https://cloud.google.com/eventarc/docs
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[3]: https://cloud.google.com/eventarc/docs/third-parties/create-channels
[4]: https://docs.datadoghq.com/monitors/notify/
[5]: https://cloud.google.com/eventarc/docs/targets
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/

