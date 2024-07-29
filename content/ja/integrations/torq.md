---
app_id: torq
app_uuid: 56e675d8-a461-46ec-93e9-9e8618d21354
assets:
  dashboards:
    Torq: assets/dashboards/torq_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: torq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10231
    source_type_name: Torq
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Torq
  sales_email: support@torq.io
  support_email: support@torq.io
categories:
- 自動化
- notifications
- orchestration
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/torq/README.md
display_on_public_website: true
draft: false
git_integration_title: torq
integration_id: torq
integration_title: Torq
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: torq
public_title: Torq
short_description: セキュリティチームとオペレーションチームのためのノーコード自動化
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Notifications
  - Category::Orchestration
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: セキュリティチームとオペレーションチームのためのノーコード自動化
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Torq
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Torq][1] のインテグレーションでは、Datadog のアラートに対応してワークフローをトリガーし、アラートのリッチ化を実現します。そして、Torq ワークフローから Datadog のイベントストリームや Torq 専用ダッシュボードに直接イベントを送り返すことができます。

## 計画と使用

このインテグレーションを設定するには、アクティブな [Torq アカウント][2]と、そのアカウント所有者のロールが必要です。また、Datadog の適切な管理者権限も必要となります。

### Torq で Datadog のトリガーインテグレーションを作成する

1. **Integrations** > **Triggers** で、**Datadog** カードを探し、**Add** をクリックします。

2. インテグレーションに意味のある名前を入力し、**Add** をクリックします。

3. 生成された Webhook URL をコピーします。この URL は、Datadog のテナントで Webhook インテグレーションを構成するために必要です。

### Torq でイベントをトリガーする Datadog モニターを定義する

1. **Integrations** > **Integrations** に移動し、**Webhooks** カードをクリックし、**New** をクリックします。
    ![datadog_webhook][3]

2. Webhook インテグレーションに意味のある名前を入力し、Torq から生成された Webhook URL を貼り付けます。識別子 (特定の Datadog モニターが Torq をトリガーするために使用) と Torq から生成された Webhook URL を関連付けるために、インテグレーション名が必要です。
    ![datadog_webhook_2][4]

3. Torq は、ペイロードに追加のアラート情報を追加することを推奨します。以下の構成の一部を使用することができます。

    ```json linenums="1"
    {
        "body": "$EVENT_MSG",
        "title": "$EVENT_TITLE",
        "date": "$DATE",
        "id": "$ID",
        "metadata": {
            "AGGREG_KEY": "$AGGREG_KEY",
            "ALERT_CYCLE_KEY": "$ALERT_CYCLE_KEY",
            "ALERT_ID": "$ALERT_ID",
            "ALERT_METRIC": "$ALERT_METRIC",
            "ALERT_QUERY": "$ALERT_QUERY",
            "ALERT_SCOPE": "$ALERT_SCOPE",
            "ALERT_STATUS": "$ALERT_STATUS",
            "ALERT_TITLE": "$ALERT_TITLE",
            "ALERT_TRANSITION": "$ALERT_TRANSITION",
            "ALERT_TYPE": "$ALERT_TYPE",
            "EMAIL": "$EMAIL",
            "EVENT_MSG": "$EVENT_MSG",
            "EVENT_TITLE": "$EVENT_TITLE",
            "EVENT_TYPE": "$EVENT_TYPE",
            "HOSTNAME": "$HOSTNAME",
            "ID": "$ID",
            "LAST_UPDATED": "$LAST_UPDATED",
            "LINK": "$LINK",
            "METRIC_NAMESPACE": "$METRIC_NAMESPACE",
            "ORG_ID": "$ORG_ID",
            "ORG_NAME": "$ORG_NAME",
            "PRIORITY": "$PRIORITY",
            "SNAPSHOT": "$SNAPSHOT",
            "TAGS": "$TAGS",
            "TEXT_ONLY_MSG": "$TEXT_ONLY_MSG",
            "USER": "$USER",
            "USERNAME": "$USERNAME",
            "LOGS_SAMPLE": "$LOGS_SAMPLE"
        }
    }
    ```

4. Torq Playbooks をトリガーするモニターを選び、**Alert Your Team** フィールドに新しく作成した Webhook インテグレーションへの参照を追加します。詳しくは、[モニターの管理][5]を参照してください。

## Torq のワークフローで Datadog のステップを使用する

Torq の Datadog ステップの入力パラメーターとして使用するため、Datadog API キーとアプリケーションキーを作成する必要があります。

**注:** Torq の Datadog のステップには、API キーとアプリケーションキーが必要なものと、Datadog インテグレーションが必要なものがあります。

### Datadog で API キーを作成する

API キーを作成した後、後でアクセスできなくなるので、コピーして保存してください。詳しくは、[API キーとアプリケーションキー][6]をご覧ください。

1. ユーザー名にカーソルを合わせ、**Organization Settings** を選択します。
2. 左側のパネルから、**API Keys** をクリックします。
3. **+ New Key** をクリックします。
    ![datadog_api_key][7]
4. API キーに `Torq` のような意味のある名前を入力し、**Create Key** をクリックします。
5. `Key` をコピーして保存します。このキーは Torq で Datadog のインテグレーションを作成する際に必要です。

### Datadog でアプリケーションキーを作成する

アプリケーションキーを作成した後、後でアクセスできなくなるので、コピーして保存してください。詳しくは、[API キーとアプリケーションキー][8]をご覧ください。

1. ユーザー名にカーソルを合わせ、**Organization Settings** を選択します。
2. 左側のパネルから、**Application Keys** をクリックします。
3. **+ New Key** をクリックします。
    ![datadog_app_key][9]
4. アプリケーションキーに `Torq` のような意味のある名前を入力し、**Create Key** をクリックします。
5. `Key` をコピーして保存します。このキーは Torq で Datadog のインテグレーションを作成する際に必要です。

### Torq で Datadog インテグレーションを作成する

このインテグレーションにより、Torq のワークフローで Datadog のステップを使用することができます。

1. **Integrations** > **Steps** で、**Datadog** カードを探し、**Add** をクリックします。

2. `Datadog-<monitor_type>` のような意味のあるインテグレーション名を入力し、**Add** をクリックします。

## リアルユーザーモニタリング

### データセキュリティ

Torq インテグレーションは、メトリクスを提供しません。

### ヘルプ

Torq インテグレーションでは、Datadog ポストイベントステップを使用して Torq ワークフローから Datadog のイベントストリームにイベントを送信することができます。このステップをプレイブックと併用し、問題の軽減に成功した場合や実行に失敗した場合に Datadog に通知したり、加工したアラートデータを Datadog に返送することもできます。

### ヘルプ

Torq インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://torq.io
[2]: https://torq.io/get-started/
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_2.png
[5]: https://docs.datadoghq.com/ja/monitors/manage_monitor/
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_api_key.png
[8]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-application-keys
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_app_key.png
[10]: https://docs.datadoghq.com/ja/help/