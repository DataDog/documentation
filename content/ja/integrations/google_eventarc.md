---
categories:
- クラウド
- google cloud
dependencies: []
description: Datadog のアラートを Google Eventarc チャンネルに送信する
doc_link: https://docs.datadoghq.com/integrations/google_eventarc/
draft: false
git_integration_title: google_eventarc
has_logo: true
integration_id: google-eventarc
integration_title: Google Eventarc
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_eventarc
public_title: Google Eventarc インテグレーション
short_description: Datadog のアラートを Google Eventarc チャンネルに送信する
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Datadog のイベントを [Eventarc][1] に送信して Google サービスに配信し、Datadog のモニター通知で Eventarc 主導のワークフローを開始できるようにします。

### 計画と使用

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

## リアルユーザーモニタリング

### データセキュリティ

Google Eventarc インテグレーションには、メトリクスは含まれません。

### ヘルプ

Google Eventarc インテグレーションには、イベントは含まれません。

### ヘルプ

Google Eventarc インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Eventarc と Datadog でインシデント対応のワークフローを自動化する][7]

[1]: https://cloud.google.com/eventarc/docs
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[3]: https://cloud.google.com/eventarc/docs/third-parties/create-channels
[4]: https://docs.datadoghq.com/ja/monitors/notify/
[5]: https://cloud.google.com/eventarc/docs/targets
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/