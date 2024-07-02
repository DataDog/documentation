---
"aliases": []
"categories":
- notifications
- ai/ml
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Correlate Datadog alerts and create actionable incidents with BigPanda."
"doc_link": "https://docs.datadoghq.com/integrations/bigpanda/"
"draft": false
"git_integration_title": "bigpanda"
"has_logo": true
"integration_id": ""
"integration_title": "BigPanda"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "bigpanda"
"public_title": "Datadog-BigPanda Integration"
"short_description": "Send Datadog alerts to your BigPanda account."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect BigPanda to Datadog to help your team by:

- Correlating information by receiving alerts from Datadog.

## セットアップ

### インストール

The BigPanda integration is installed using the [integration tile][1] on the Datadog site.

### 構成

1. In your BigPanda account, go to the Integrations page and select New Integration.
2. Click _Datadog_ --> _Add Integration_, then create the App Key.
3. The provided Webhook URL contains the necessary Access Token and App Key.
4. Navigate to the BigPanda tile on Datadog and click on _New Account_
5. Add a **BigPanda Account Name** of your choice. This will be the name of the notification handle.
6. Paste the **Access Token** and **App Key** in the respective fields.
7. Select an **Endpoint Type**. You can choose a region for the account or set a custom URL.
8. Click _Save_.

**Note**:
- The maximum number of BigPanda accounts currently supported is 5.
- To Enable the **Route All Monitor Events** option and automatically send all monitor events to BigPanda, contact [Datadog support][2]. By default, only monitor events containing **@bigpanda-<account-name>** are sent.

### 使用方法

BigPanda creates incidents as it begins to receive events from Datadog. Incidents maintain relevant information such as the name of the monitor that was triggered and the condition causing the alert. 
Incidents can move from Active to Resolved as monitors undergo transition changes. To stop Datadog from sending alerts to BigPanda, remove the desired account from the integration tile.

## 収集データ

### メトリクス

The BigPanda integration does not provide any metrics.

### イベント

The BigPanda integration does not include any events.

### サービスチェック

The BigPanda integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][2].

[1]: https://app.datadoghq.com/integrations/bigpanda
[2]: https://docs.datadoghq.com/help/

