---
app_id: signl4
app_uuid: 07952edd-2dc5-4c11-a697-5cba325f64ee
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: signl4.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10158
    source_type_name: SIGNL4
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: SIGNL4
  sales_email: success@signl4.com
  support_email: success@signl4.com
categories:
- アラート設定
- コラボレーション
- インシデント
- 問題追跡
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/signl4/README.md
display_on_public_website: true
draft: false
git_integration_title: signl4
integration_id: signl4
integration_title: SIGNL4
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: signl4
public_title: SIGNL4
short_description: Datadog のアラート通知を受信し、SIGNL4 を使用して対処。
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
  description: Datadog のアラート通知を受信し、SIGNL4 を使用して対処。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SIGNL4
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

[SIGNL4][1] インテグレーションを使用すると、Datadog のアラートを SIGNL4 チームに送信し、SIGNL4 アプリ内でシームレスにこのアラートに対応できます。

SIGNL4 を Datadog に接続すると、以下が可能になります。
- Datadog でインシデントをトリガーして解決する
- インシデントに取り組み、エスカレーションの発生時にポリシーを設定する
- 誰がオンコールかのデイリーリマインダーを設定

![SIGNL4 App][2]

## 計画と使用

### SIGNL4

SIGNL4 で以下のステップに従います。

1. 既存のアカウントを使用、または [signl4.com][1] で SIGNL4 アカウントを新規作成します。

2. SIGNL4 アプリで *Teams -> Your Team -> Secret* を開き、チームのシークレットを含む SIGNL4 Webhook アドレスを探します。

### Datadog アラート

Datadog の新しいアラートについて、SIGNL4 チームに警告することができます。Datadog で解決されたアラートは、自動的に SIGNL4 でアラートを閉じます。これを行うには、次のように構成する必要があります。

1. [Webhooks Integration タイル][3]へ移動します。

2. **Configuration** タブで Webhooks を選択し、**New** をクリックします。

3. **New Webhook** で意味のある `Name` を入力し、チームのシークレットを含む SIGNL4 Webhook `URL` (上記で作成したもの) を使用します。例:

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=alertId&ExtStatusParam=alertTransition&ResolvedStatus=Recovered
    ```

    ここで `[team-secret]` を SIGNL4 チームシークレットに置き換えます。

    ![SIGNL4 アラート Webhook][4]

4. `Payload` テキストボックスで、以下の JSON をコピーして貼り付けます。

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "alertTransition": "$ALERT_TRANSITION",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

パラメーターは必要に応じて変更できますが、`alertId`、`alertTransition`、`X-S4-SourceSystem` は変更しないようにしてください。

5. **Save** をクリックすると、Webhook が作成されます。

詳しくは、[Datadog のモバイルアラートと追跡 & エスカレーション][5]をご参照ください。

これで、Webhook をモニターの通知チャンネルとして使うことができます。Webhook の名前が SIGNL4 であると仮定して、`@webhook-SIGNL4` を使って通知を送信します。モニターの条件が適用されるとき、チームは新しい SIGNL4 アラートを受け取ります。

### Datadog インシデント

Datadog の新しいインシデントについて、SIGNL4 チームに警告することができます。Datadog で解決されたインシデントは、自動的に SIGNL4 でアラートを閉じます。これを行うには、次のように構成します。

1. [Webhooks Integration タイル][3]へ移動します。

2. **Configuration** タブで Webhooks を選択し、**New** をクリックします。

3. **New Webhook** で意味のある `Name` を入力し、チームのシークレットを含む SIGNL4 Webhook `URL` (上記で作成したもの) を使用します。例:

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=s4ExternalId&ExtStatusParam=incidentStatus&ResolvedStatus=resolved
    ```

   URL の `[team-secret]` を SIGNL4 チームシークレットに置き換えます。

    ![SIGNL4 インシデント Webhook][6]

4. `Payload` テキストボックスで、以下の JSON をコピーして貼り付けます。

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "incidentPublicId": "$INCIDENT_PUBLIC_ID",
        "incidentStatus": "$INCIDENT_STATUS",
        "alertTransition": "$ALERT_TRANSITION",
        "s4ExternalId": "DATADOG-INCIDENT-$INCIDENT_PUBLIC_ID",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

パラメーターは必要に応じて変更できますが、`incidentStatus`、`s4ExternalId`、`X-S4-SourceSystem` は変更しないようにしてください。

5. **Save** をクリックすると、Webhook が作成されます。

詳しくは、[Datadog のモバイルアラートと追跡 & エスカレーション][5]をご参照ください。

### インシデントルール

Datadog の Monitors -> Settings (Incidents) Rules でルールを作成することができます。ルールでは、例えば、重大度、サービスなどの条件を指定します。"Other attributes" には、新しいアラートをトリガーする "state:active" とアラートをクローズする "state:resolved" を使用することをお勧めします。"Notify" で、上記で作成した SIGNL4 インシデント Webhook を選択します。

![SIGNL4 インシデントルール][7]

新しいインシデントを作成すると、SIGNL4 チームはアラートを受け取ります。SIGNL4 アプリでアラートを承認または閉じると、インシデントのステータスは Stable または Resolved に設定されます。

また、Datadog でインシデントステータスを Resolved に設定すると、SIGNL4 でアラートが閉じられます。

### Datadog インシデントのステータス更新

Datadog インシデントについては、それぞれのアラートを承認または閉じることで、SIGNL4 アプリから直接ステータスを Stable または Resolved に更新することができます。

このバックチャンネルを構成するために、SIGNL4 ウェブポータルに行き、Teams -> Apps に進んでください。Datadog コネクタアプリを検索し、そこで "Create" をクリックします。アプリの設定の中で直接詳細な情報を見つけることができます。

![Datadog コネクタアプリ][8]

以下の構成が必要です。

- Datadog URL: Datadog インスタンスの URL。例えば、https://app.datadoghq.com/ や https://app.datadoghq.eu/ など。 
- Datadog API Key: Datadog の API キー。API キーは、自分のアカウントの Datadog で、Organization Settings -> API Keys で検索または作成することができます。 
- Datadog Application Key: Datadog のアプリケーションキー。アプリケーションキーは、自分のアカウントの Datadog で、Organization Settings -> Application Keys で検索または作成することができます。 
- Acknowledgement as Stable: Acknowledgements は、インシデントのステータスを Stable に設定します。 

## リアルユーザーモニタリング

### データセキュリティ

SIGNL4 インテグレーションには、メトリクスは含まれません。

### ヘルプ

SIGNL4 でトリガーされ解決したイベントは、SIGNL4 アプリおよびウェブポータルに表示されます。

### ヘルプ

SIGNL4 インテグレーションには、サービスチェックは含まれません。

## ヘルプ
ヘルプが必要な場合は、[SIGNL4 サポート][9]までお問い合わせください。


[1]: https://www.signl4.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-phone.png
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-alerts-webhook.png
[5]: https://www.signl4.com/blog/portfolio_item/datadog_mobile_alerting/
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-webhook.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-rule.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-datadog-connector-app.png
[9]: mailto:success@signl4.com