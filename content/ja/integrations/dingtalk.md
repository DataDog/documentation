---
"categories":
- collaboration
- notifications
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Send Datadog alerts and graphs to your team's DingTalk Group."
"doc_link": "https://docs.datadoghq.com/integrations/dingtalk/"
"draft": false
"git_integration_title": "dingtalk"
"has_logo": true
"integration_id": "dingtalk"
"integration_title": "DingTalk"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "dingtalk"
"public_title": "Datadog-DingTalk Integration"
"short_description": "Send Datadog alerts and graphs to your team's DingTalk Group."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Integrate with DingTalk to:

-   Be notified of Datadog alerts and events in DingTalk
-   Share messages and graphs with your DingTalk group

## インストール

The DingTalk integration is installed with the Datadog [DingTalk integration tile][1].

## セットアップ

To integrate Datadog with a DingTalk group:

1. In the DingTalk app, navigate to _Messages_, and then click on the group where you want to add a Datadog integration.
2. In the top right corner, click the _Group Settings_ icon (it looks like an ellipsis) and choose _Group Robot_.
3. On the Group Robot menu, select Datadog and click `Add`.
4. Enter a name for the robot and click `Finished`. This returns a webhook address.
5. Copy the webhook address and then click `Finished`.
6. On the DingTalk [integration tile][1], enter the DingTalk group where you added the Datadog integration into the _Group Name_ field and paste the webhook address into the _Group Robot Webhook_ field. Group names can contain letters, digits, and underscores.
7. Click _Install Configuration_ (or _Update Configuration_).

After installing or updating the integration, you can use the [`@-notification` feature][2] with your DingTalk group name.

## 収集データ

### メトリクス

The DingTalk integration does not provide any metrics.

### イベント

The DingTalk integration does not include any events.

### サービスチェック

The DingTalk integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://app.datadoghq.com/integrations/dingtalk
[2]: https://docs.datadoghq.com/monitors/notifications/#notification
[3]: https://docs.datadoghq.com/help/

