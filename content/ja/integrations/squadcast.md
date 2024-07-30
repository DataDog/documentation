---
app_id: Squadcast
app_uuid: cfa65726-33af-42bf-8be3-7abb43147a47
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: Squadcast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10090
    source_type_name: Squadcast
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Squadcast
  sales_email: it@squadcast.com
  support_email: it@squadcast.com
categories:
- アラート設定
- コラボレーション
- インシデント
- 問題追跡
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/squadcast/README.md
display_on_public_website: true
draft: false
git_integration_title: Squadcast
integration_id: Squadcast
integration_title: Squadcast
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: Squadcast
public_title: Squadcast
short_description: Datadog アラートの通知を受け取り Squadcast でアクションを実行します。
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
  description: Datadog アラートの通知を受け取り Squadcast でアクションを実行します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Squadcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Datadog-Squadcast インテグレーションを使用して Datadog アラートまたはインシデントを Squadcast に送り、これらに対してのアクションを Squadcast 内で実行します。

Squadcast を Datadog に接続すると、以下のことができます。
- Datadog からのアラートまたはインシデントのトリガー、ルート、解決
- アラートまたはインシデントに取り組み、エスカレーションの発生時にポリシーを設定
- オンコールスケジュールを定義し、オンコールの担当者に関するカスタマイズ可能なリマインダーを設定

## 計画と使用

**注**: チームレベルの適切な権限を持つ Squadcast ユーザーのみが、Squadcast でサービスを構成できます。サービスを追加するには、Escalation Policy を最低1つ設定する必要があります。

### Squadcast

Squadcast で以下の手順に従います。

1. 上部のチームピッカーで **Team** を選択します。

2. 左側のメインナビゲーションバーから **Services** ページを開きます。

3. 既存のサービスを選択するか、**Add Service** ボタンをクリックして新しいサービスを作成します。

4. **Alert Sources** をクリックして、ドロップダウンメニューから **Datadog** を選択します。

5. 表示された **Datadog Webhook URL** をコピーし、**Done** をクリックします。

### Ruby

Datadog で以下の手順に従います。

1. サイドバーから **Integrations** ページを開きます。

2. 検索バーで "webhooks" を検索します。

3. **Webhooks** タイルが表示されたら、カーソルを合わせて **Install** をクリックします。

4. **Configuration** タブに移動し、ページの一番下までスクロールします。

5. (a) **Name** フィールドで Webhook に名前を付けます。

   (b) **URL** フィールドに Squadcast により提供された **Datadog Webhook URL** を貼り付けます。

   (c) 次の JSON をコピーして、**Payload** セクションの下のテキストボックスに貼り付けます。

![Squadcast Webhook][1]

```json
    {
       "alertId": "$ALERT_ID",
       "eventMessage": "$TEXT_ONLY_MSG",
       "title": "$EVENT_TITLE",
       "url": "$LINK",
       "alertTransition": "$ALERT_TRANSITION",
       "hostname": "$HOSTNAME",
       "orgName":"$ORG_NAME",
       "priority":"$PRIORITY",
       "snapshot": "$SNAPSHOT",
       "alertQuery": "$ALERT_QUERY",
       "alertScope": "$ALERT_SCOPE",
       "alertStatus": "$ALERT_STATUS",
       "eventType": "$EVENT_TYPE",
       "event_id": "$ID",
       "alert_metric": "$ALERT_METRIC",
       "alert_priority": "$ALERT_PRIORITY",
       "alert_title": "$ALERT_TITLE",
       "alert_type" : "$ALERT_TYPE",
       "event_msg" : "$EVENT_MSG",
       "incident_pub_id" : "$INCIDENT_PUBLIC_ID",
       "incident_title" : "$INCIDENT_TITLE",
       "incident_url" : "$INCIDENT_URL",
       "incident_msg" : "$INCIDENT_MSG",
       "security_rule_id" : "$SECURITY_RULE_ID",
       "security_rule_name" : "$SECURITY_RULE_NAME",
       "security_signal_severity" : "$SECURITY_SIGNAL_SEVERITY",
       "security_signal_title" : "$SECURITY_SIGNAL_TITLE",
       "security_signal_msg" : "$SECURITY_SIGNAL_MSG",
       "security_rule_query" : "$SECURITY_RULE_QUERY",
       "security_rule_type" : "$SECURITY_RULE_TYPE",
       "tags" : "$TAGS"
   }
```

6. **Save** をクリックしてサービスのインテグレーションを完了します。

    詳細については、[Squadcast に関するドキュメント][2]を参照してください。

**注**: Squadcast 用に Webhook を構成したら、Datadog モニターのコンフィギュレーションの **Notify your team** で Webhook をチャンネルとして選択します。

## リアルユーザーモニタリング
### データセキュリティ

Squadcast インテグレーションには、メトリクスは含まれません。

### ヘルプ

トリガーおよび解決された Squadcast イベントが Squadcast プラットフォームダッシュボードに表示されます。

### ヘルプ

Squadcast インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/squadcast/images/datadog-webhook.png
[2]: https://support.squadcast.com/docs/datadog
[3]: https://docs.datadoghq.com/ja/help/