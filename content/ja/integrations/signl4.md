---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- 問題追跡
- コラボレーション
- notification
- モニタリング
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/signl4/README.md"
"display_name": "SIGNL4"
"draft": false
"git_integration_title": "signl4"
"guid": "02b6d170-8b2e-4de4-b3a9-afb67183cb5e"
"integration_id": "signl4"
"integration_title": "SIGNL4  for Datadog"
"is_public": true
"kind": "integration"
"maintainer": "success@signl4.com"
"manifest_version": "1.0.0"
"metric_prefix": "signl4."
"metric_to_check": ""
"name": "signl4"
"public_title": "Datadog と SIGNL4 のインテグレーション"
"short_description": "Datadog のアラート通知を受信し、SIGNL4 を使用して対処。"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---

## 概要

[SIGNL4][1] インテグレーションを使用すると、Datadog のアラートを SIGNL4 チームに送信し、SIGNL4 アプリ内でシームレスにこのアラートに対応できます。

SIGNL4 を Datadog に接続すると、以下が可能になります。
- Datadog でインシデントをトリガーして解決する
- インシデントに取り組み、エスカレーションの発生時にポリシーを設定する
- 誰がオンコールかのデイリーリマインダーを設定

![SIGNL4 App][2]

## セットアップ

### SIGNL4

SIGNL4 で以下のステップに従います。

1. 既存のアカウントを使用、または [signl4.com][1] で SIGNL4 アカウントを新規作成します。

2. SIGNL4 アプリで *Settings -> APIs* を開き、チームのシークレットを含む SIGNL4 Webhook アドレスを探します。

### Datadog

Datadog で以下の手順に従います。

1. [Webhooks Integration タイル][3]へ移動します。



2. **Configuration** タブで、ページを下にスクロールして **New** をクリックします。

3. **New Webhook** で意味のある `Name` を入力し、チームのシークレットを含む SIGNL4 Webhook `URL` (上記で作成したもの) を使用します。例:

    ```
    https://connect.signl4.com/webhook/<team-secret>?ExtIDParam=alertId&ExtStatusParam=alertTransition&ResolvedStatus=Recovered
    ```

    ここで `<team-secret>` を SIGNL4 チームシークレットに置き換えます。

    ![SIGNL4 Webhook][4]

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

5. **Save** をクリックしてサービスのインテグレーションを完了します。

詳しくは、[Datadog のモバイルアラートと追跡 & エスカレーション][5]をご参照ください。

## 収集データ

### メトリクス

SIGNL4 インテグレーションには、メトリクスは含まれません。

### イベント

SIGNL4 でトリガーされ解決したイベントは、SIGNL4 アプリおよびウェブポータルに表示されます。

### サービスのチェック

SIGNL4 インテグレーションには、サービスチェックは含まれません。

## トラブルシューティング
ヘルプが必要な場合は、[SIGNL4 サポート][6]までお問い合わせください。

[1]: https://www.signl4.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-phone.png
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-webhook.png
[5]: https://www.signl4.com/blog/portfolio_item/datadog_mobile_alerting/
[6]: mailto:success@signl4.com

