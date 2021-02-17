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
  - モニター
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/squadcast/README.md'
display_name: Squadcast
draft: false
git_integration_title: Squadcast
guid: a2b0e9fe-f824-460b-864a-50c4bda759a0
integration_id: Squadcast
integration_title: Squadcast
is_public: true
kind: インテグレーション
maintainer: it@squadcast.com
manifest_version: 1.0.0
metric_prefix: Squadcast.
metric_to_check: ''
name: Squadcast
public_title: Datadog-Squadcast インテグレーション
short_description: Datadog アラートの通知を受け取り Squadcast でアクションを実行します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog-Squadcast インテグレーションを使用して Datadog アラートを Squadcast に送り、アラートに対してのアクションを Squadcast プラットフォームで実行します。

Squadcast を Datadog に接続すると、以下のことができます。
- Datadog でインシデントをトリガーして解決する
- インシデントに取り組み、エスカレーションの発生時にポリシーを設定する
- 誰がオンコールかのデイリーリマインダーを設定

## セットアップ

**注**:
Account Owner または Admin 権限を持つユーザーのみが、Squadcast でサービスを構成できます。
サービスを追加するには、Escalation Policy を最低1つ設定する必要があります。

### Squadcast で以下の手順に従います。

1. サイドバーから **Services** ページを開きます。

2. 既存のサービスを選択するか、**Add Service** ボタンをクリックして新しいサービスを作成します。

3. **Alert Sources** をクリックして、ドロップダウンメニューから **Datadog** を選択します。

5. 表示された **Datadog Webhook URL** をコピーし、**Done** をクリックします。

### Datadog で以下の手順に従います。

1. サイドバーから **Integrations** ページを開きます。

2. 検索バーで "webhooks" を検索します。

3. 表示された **Webhooks** のタイトル上にカーソルを移動させ、"Install" をクリックします。

4. **Configuration** タブに移動し、ページの一番下までスクロールします。

5. **Name and URL** セクションで、意味のある名前を入力し、Squadcast が提供する **Datadog Webhook URL** を貼り付けます。

    ![Squadcast Webhook][1]

6. **Use custom payload** の下にあるチェックボックスに印を入れます。
7. 次の JSON をコピーして、**Custom Payload** セクションの下のテキストボックスに貼り付けます。

    ```json
    {
        "alertId": "$ALERT_ID",
        "eventMessage": "$TEXT_ONLY_MSG",
        "title": "$EVENT_TITLE",
        "url": "$LINK",
        "alertTransition": "$ALERT_TRANSITION"
    }
    ```

8. "Install Integration" をクリックし、サービスインテグレーションを完了させます。

    手順に関する詳細は、Squadcast の[公式ドキュメント][2]を参照してください。

## 収集データ
### メトリクス

Squadcast インテグレーションには、メトリクスは含まれません。

### イベント

トリガー/解決された Squadcast イベントが Squadcast プラットフォームダッシュボードに表示されます。

### サービスのチェック

Squadcast インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/squadcast/images/datadog-webhook.png
[2]: https://support.squadcast.com/docs/datadog
[3]: https://docs.datadoghq.com/ja/help/