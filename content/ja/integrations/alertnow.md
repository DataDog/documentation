---
app_id: alertnow
app_uuid: cdb258cc-5e74-4fa2-be21-1489375bb370
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: alertnow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10279
    source_type_name: AlertNow
author:
  homepage: https://service.opsnow.com
  name: AlertNow
  sales_email: sales@opsnow.com
  support_email: support@opsnow.com
categories:
- アラート設定
- 自動化
- コラボレーション
- インシデント
- モバイル
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/alertnow/README.md
display_on_public_website: true
draft: false
git_integration_title: alertnow
integration_id: alertnow
integration_title: AlertNow
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: alertnow
public_title: AlertNow
short_description: Datadog のアラートと AlertNow のアラートを同期させる
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Collaboration
  - Category::Incidents
  - Category::Mobile
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog のアラートと AlertNow のアラートを同期させる
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AlertNow
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

AlertNow は、多様で複雑な IT 環境からアラートを収集し、適切な担当者にアラートを配信することで、迅速なインシデント対応を可能にする統合インシデント管理プラットフォームです。AlertNow を Datadog と接続すると、Datadog のアラートと AlertNow のアラートが自動的に同期されます。単一のプラットフォームでアラートを管理し、チームに通知して、重要な問題に即座に対応することができます。


AlertNow が提供するもの
- Datadog でインシデントをトリガーして解決する
- インシデント発生時にメール、SMS、ボイスコール、モバイルアプリケーションで適切な担当者に通知

- エスカレーションポリシーに基づき、ユーザーに通知
- MTTA、MTTR に関するレポート、分析レポート


![alertnow 概要][1]

## 計画と使用

### AlertNow

Datadog と AlertNow を接続するには、Datadog で Webhook とモニターを作成します。


1. 既存のアカウントを使用するか、または opsnow.com で AlertNow のアカウントを作成してください。

2. AlertNow にログインし、Configuration >  Integration メニューに進みます。
3. **Create Integration** をクリックし、**Datadog** カードを選択します。

    ![datadog カード][2]

4. Create integration ページで、必要な情報を入力し、OK ボタンをクリックすると、インテグレーションが作成されます。

    ![datadog インテグレーション][3]

5. AlertNow のインテグレーションページから URL をコピーします。
    ![datadog 詳細][4]


### Ruby

Datadog のアカウントで、以下の手順を実行します。


1. [Webhooks インテグレーションタイル][5]を開きます。

2. **Configuration** タブを選択し、一番下までスクロールして **New** をクリックします。

3. **New Webhook** フォームで、意味のある名前と AlertNow インテグレーションページで作成された AlertNow Webhook URL を入力します。コピーした AlertNow Webhook URL のフォーマットは以下の通りです。API キーは **{ALERTNOW-API-KEY}** に置き換えてください。



    <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{ALERTNOW-API-KEY} </code></pre>

    ![datadog webhook][6]

4. 以下の JSON Payload をコピーして、Payload ウィンドウに貼り付けます。


    ``` json
    {
        "id":"$ID",
        "email":"$EMAIL",
        "eventTitle":"$EVENT_TITLE",
        "eventMsg":"$EVENT_MSG",
        "textOnlyMsg":"$TEXT_ONLY_MSG",
        "eventType":"$EVENT_TYPE",
        "date":"$DATE",
        "datePosix":"$DATE_POSIX",
        "alertId":"$ALERT_ID",
        "alertType":"$ALERT_TYPE",
        "aggregKey":"$AGGREG_KEY",
        "orgId":"$ORG_ID",
        "alertStatus":"$ALERT_STATUS",
        "alertScope":"$ALERT_SCOPE",
        "hostname":"$HOSTNAME",
        "user":"$USER",
        "username":"$USERNAME",
        "snapshot":"$SNAPSHOT",
        "link":"$LINK",
        "priority":"$PRIORITY",
        "tags":"$TAGS",
        "lastUpdated":"$LAST_UPDATED",
        "lastUpdatedPosix":"$LAST_UPDATED_POSIX",
        "alertMetric":"$ALERT_METRIC",
        "metricNamespace":"$METRIC_NAMESPACE",
        "alertTransition":"$ALERT_TRANSITION",
        "orgName":"$ORG_NAME",
        "alertQuery":"$ALERT_QUERY",
        "alertTitle":"$ALERT_TITLE",
        "alertCycleKey":"$ALERT_CYCLE_KEY"
    }

    ```

5. Datadog の[アラート用ドキュメント][7]を参照して、モニターを作成します。



## Agent

ご不明な点は、[AlertNow サポート][8]までお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png
[5]: https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png
[7]: https://docs.datadoghq.com/ja/monitors/
[8]: mailto:support@opsnow.com