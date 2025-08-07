---
app_id: alertnow
categories:
- アラート
- 自動化
- コラボレーション
- logs-restriction-queries-update-a-restriction-query
- apm
custom_kind: integration
description: Datadog のアラートと AlertNow のアラートを同期させる
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: AlertNow
---
## 概要

AlertNow は、多様で複雑な IT 環境からアラートを収集し、適切な担当者にアラートを配信することで、迅速なインシデント対応を可能にする統合インシデント管理プラットフォームです。AlertNow を Datadog と接続すると、Datadog のアラートと AlertNow のアラートが自動的に同期されます。単一のプラットフォームでアラートを管理し、チームに通知して、重要な問題に即座に対応することができます。

AlertNow が提供するもの

- Datadog でインシデントをトリガーして解決する

- インシデント発生時にメール、SMS、ボイスコール、モバイルアプリケーションで適切な担当者に通知

- エスカレーションポリシーに基づき、ユーザーに通知

- MTTA、MTTR に関するレポート、分析レポート

![alertnow overview](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png)

## セットアップ

### AlertNow

Datadog と AlertNow を接続するには、Datadog で Webhook とモニターを作成します。

1. 既存のアカウントを使用するか、または opsnow.com で AlertNow のアカウントを作成してください。

1. AlertNow にログインし、Configuration >  Integration メニューに進みます。

1. **Create Integration** をクリックし、**Datadog** カードを選択します。

   ![datadog card](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png)

1. Create integration ページで、必要な情報を入力し、OK ボタンをクリックすると、インテグレーションが作成されます。

   ![datadog integration](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png)

1. AlertNow のインテグレーションページから URL をコピーします。
   ![datadog detail](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png)

### Datadog

Datadog のアカウントで、以下の手順を実行します。

1. Open the [Webhooks Integration tile](https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks).

1. **Configuration** タブを選択し、一番下までスクロールして **New** をクリックします。

1. **New Webhook** フォームで、意味のある名前と AlertNow インテグレーションページで作成された AlertNow Webhook URL を入力します。コピーした AlertNow Webhook URL のフォーマットは以下の通りです。API キーは **{ALERTNOW-API-KEY}** に置き換えてください。

   <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{ALERTNOW-API-KEY} </code></pre>

   ![datadog webhook](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png)

1. 以下の JSON Payload をコピーして、Payload ウィンドウに貼り付けます。

   ```json
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

1. Refer to Datadog's [Alerting documentation](https://docs.datadoghq.com/monitors/) to create monitors.

## サポート

Need help? Contact [AlertNow support](mailto:support@opsnow.com).