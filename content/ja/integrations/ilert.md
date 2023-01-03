---
app_id: ilert
app_uuid: 12731389-915a-4fb7-baec-3319f87dfc7f
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: ilert.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: iLert
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: support@ilert.com
  support_email: support@ilert.com
categories:
- 問題追跡
- コラボレーション
- notification
- モニタリング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ilert/README.md
display_on_public_website: true
draft: false
git_integration_title: ilert
integration_id: ilert
integration_title: iLert
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: ilert
oauth: {}
public_title: iLert
short_description: Datadog アラートの通知を受け取り iLert でアクションを実行します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Issue Tracking
  - Category::Collaboration
  - Category::Notification
  - Category::Monitoring
  configuration: README.md#Setup
  description: Datadog アラートの通知を受け取り iLert でアクションを実行します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: iLert
---

## 概要

[iLert][1] インテグレーションは、Datadog アラートを iLert に送信し、iLert プラットフォーム内でこれらのアラートに対してシームレスにアクションを実行します。

iLert と統合すると、以下のことができます。

- Datadog でインシデントをトリガーして解決する
- インシデントに取り組み、エスカレーションの発生時にポリシーを設定する
- 誰がオンコールかのデイリーリマインダーを設定

## セットアップ

### iLert

#### Datadog アラートソースを作成します

1. **Alert Sources** タブに切り替えて、"Create new alert source" ボタンをクリックします

2. 名前を割り当て、エスカレーションチェーンを選択します

3. Integration type フィールドで **Datadog** を選択し、保存します。

   ![iLert Alert Source New][2]

4. 次のページで、**Webhook URL** が生成されます。この URL は、Datadog のセットアップの下部に必要です。

   ![iLert Alert Source View][3]

### Datadog

#### アラートチャネルとして iLert Webhook を追加します

1. Datadog インテグレーションページに移動して [**Webhook インテグレーションをインストールします**][4]。
2. Webhook インテグレーションをクリックし、一番下までスクロールして、新しい Webhook を追加します。

   ![Datadog Webhook New][5]

3. 名前、iLert アラートソースからの **Datadog Webhook URL**、**テンプレートペイロード**を入力します。

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

   ![Datadog Webhook View][6]

4. 保存ボタンをクリックして、このチェックの設定を終了します。

   詳細については、[iLert Datadog インテグレーションのドキュメント][7]を参照してください。

## 収集データ

### メトリクス

iLert インテグレーションには、メトリクスは含まれません。

### イベント

iLert のトリガーおよび解決されたイベントは、iLert プラットフォーム ダッシュボードに表示されます。

### サービスのチェック

iLert インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://www.ilert.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-view.png
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-new.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-view.png
[7]: https://docs.ilert.com/integrations/datadog
[8]: https://docs.datadoghq.com/ja/help/