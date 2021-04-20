---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 問題追跡
  - コラボレーション
  - notification
  - モニタリング
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/ilert/README.md'
display_name: iLert
draft: false
git_integration_title: ilert
guid: 875497b9-a27e-4099-92e9-968a70c592fa
integration_id: ilert
integration_title: iLert
is_public: true
kind: integration
maintainer: support@ilert.com
manifest_version: 1.0.0
metric_prefix: ilert.
metric_to_check: ''
name: ilert
public_title: iLert インテグレーション
short_description: Datadog アラートの通知を受け取り iLert でアクションを実行します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[iLert][1] インテグレーションは、Datadog アラートを iLert に送信し、iLert プラットフォーム内でこれらのアラートに対してシームレスにアクションを実行します。

iLert と統合すると、以下のことができます。

- Datadog でインシデントをトリガーして解決する
- インシデントに取り組み、エスカレーションの発生時にポリシーを設定する
- 誰がオンコールかのデイリーリマインダーを設定

## セットアップ

### iLert で

#### Datadog アラートソースを作成します

1. **Alert Sources** タブに切り替えて、"Create new alert source" ボタンをクリックします

2. 名前を割り当て、エスカレーションチェーンを選択します

3. Integration type フィールドで **Datadog** を選択し、保存します。

   ![iLert Alert Source New][2]

4. 次のページで、**Webhook URL** が生成されます。この URL は、Datadog のセットアップの下部に必要です。

   ![iLert Alert Source View][3]

### Datadog で

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

4. Save ボタンをクリックします
5. これでインテグレーションがセットアップされました。

   手順に関する詳細は、iLert の[公式ドキュメント][7]を参照してください。

## 収集データ

### メトリクス

iLert インテグレーションには、メトリクスは含まれません。

### イベント

トリガー/解決された iLert イベントが iLert プラットフォームダッシュボードに表示されます。

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