---
app_id: ilert
app_uuid: 12731389-915a-4fb7-baec-3319f87dfc7f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: ilert.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10154
    source_type_name: iLert
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ilert
  sales_email: support@ilert.com
  support_email: support@ilert.com
categories:
- アラート設定
- コラボレーション
- インシデント
- 問題追跡
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ilert/README.md
display_on_public_website: true
draft: false
git_integration_title: ilert
integration_id: ilert
integration_title: ilert
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: ilert
public_title: ilert
short_description: Datadog アラートの通知を受け取り ilert でアクションを実行する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Collaboration
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog アラートの通知を受け取り ilert でアクションを実行する
  media:
  - caption: ilert アラートリスト
    image_url: images/ilert-alert-list.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ilert
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

[ilert][1] インテグレーションは、Datadog のアラートを ilert に送信し、ilert プラットフォーム内でこれらのアラートに対するアクションをシームレスに実行します。
ilert は、チームがインシデントサイクルの全段階をカバーできるようにするインシデント管理プラットフォームです。ilert は、信頼性が高くアクション可能なアラート、コールルーティング、柔軟なオンコールスケジュール、ステータスページ、さまざまな ChatOps 機能、インシデントコミュニケーションにおける AI 支援、事後報告書の作成を提供します。ilert を使用することで、DevOps チームはアップタイムを伸ばし、インシデントに迅速に対応することができます。

ilert と統合すると、以下のことができます。

- Datadog でインシデントをトリガーして解決する
- インシデントに取り組み、エスカレーションの発生時にポリシーを設定する
- 誰がオンコールかのデイリーリマインダーを設定

## 計画と使用

### ilert

#### Datadog アラートソースを作成します

1. **Alert Sources** タブに切り替えて、"Create new alert source" ボタンをクリックします

2. 「**Datadog**」を検索し、**Datadog** タイルを選択して Next をクリックします。

   ![ilert Alert Source New][2]

3. 名前を割り当てます。

   ![ilert Alert Source New 2][3]

4. 必要なエスカレーションポリシーを選択します。

   ![ilert Alert Source New 3][4]

5. 次のページで、**Webhook URL** が生成されます。この URL は、Datadog 内のインテグレーションセットアップに必要です。

   ![ilert Alert Source View][5]

### Ruby

#### アラートチャネルとして ilert Webhook を追加します

1. Datadog Integrations ページから、[**Webhook インテグレーションをインストール**][6]します。
2. Webhook インテグレーションタイルで、新しい Webhook を追加します。

   ![Datadog Webhook New][7]

3. 名前、ilert アラートソースから先に生成された **Datadog webhook URL**、および**テンプレートペイロード**を入力します。

   ```json
   {
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "alert_transition": "$ALERT_TRANSITION",
     "alert_id": "$ALERT_ID",
     "link": "$LINK",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
       "id": "$ORG_ID",
       "name": "$ORG_NAME"
     },
     "id": "$ID"
   }
   ```

   ![Datadog Webhook View][8]

4. Save をクリックします。

## リアルユーザーモニタリング

### データセキュリティ

ilert インテグレーションには、メトリクスは含まれません。

### ヘルプ

ilert のトリガーおよび解決されたイベントは、ilert プラットフォーム ダッシュボードに表示されます。

### ヘルプ

ilert インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://www.ilert.com/?utm_medium=organic&utm_source=integration&utm_campaign=datadog
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-3.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-view.png
[6]: https://app.datadoghq.com/integrations/webhooks
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-new.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-view.png
[9]: https://docs.datadoghq.com/ja/help/