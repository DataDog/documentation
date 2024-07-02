---
"categories":
- cloud
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Salesforce Marketing Cloud"
"doc_link": "https://docs.datadoghq.com/integrations/salesforce_marketing_cloud/"
"draft": false
"git_integration_title": "salesforce_marketing_cloud"
"has_logo": false
"integration_id": ""
"integration_title": "Salesforce Marketing Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "salesforce_marketing_cloud"
"public_title": "Salesforce Marketing Cloud"
"short_description": "Collects logs from Salesforce Marketing Cloud."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Salesforce Marketing Cloud is a cloud-based marketing platform with automation and analytics tools and services for marketing through mobile, social, online, and email platforms.

The Salesforce Marketing Cloud integration with Datadog is used to view and parse your logs using [Datadog Logs][1]. 

## セットアップ

### インストール

No installation is required.

### 構成

In order to configure Salesforce Marketing Cloud to send events to Datadog, you must create a callback URL on the Salesforce Marketing Cloud Setup page and create a subscription.

#### Account Setup

1. Log into Salesforce Marketing Cloud.
2. Navigate to your account and click **Settings/Setup**.
3. Create or modify a role that your user account belongs to that allows `Event Notifications`, `Callbacks`, and `Subscriptions`.

#### Callback Setup

1. In the Setup page, navigate to **Feature Settings** > **Event Notifications** and select **URL Callbacks**.
2. Click **Register New**.
3. Copy the URL provided in the Datadog integration tile.
5. Name your Callback URL and paste the URL.
6. Keep **Match Batch Size** as 1000 and click **Register**.
7. A verification payload is sent to a Datadog endpoint. Reload the Datadog integration tile to see the verification payload.
8. Copy the Verification Key and paste it in the **Verification** section on the Salesforce Marketing Cloud URL Callback Setup page.

#### Subscription Setup

1. Under **Feature Settings**, click **Event Notifications** > **Subscriptions**.
2. Select `Subscribe New` and name your subscription.
3. Select all events you want to receive and add filters.
4. Click **Subscribe**. Your events should be sent to Datadog.

## 収集データ

### メトリクス

The Salesforce Marketing Cloud integration does not include any metrics.

### Logs

The Salesforce Marketing Cloud integration collects log events from the events you selected in the [Subscription setup](#subscription-setup).

### サービスチェック

The Salesforce Marketing Cloud integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][2].

[1]: https://docs.datadoghq.com/logs/
[2]: https://docs.datadoghq.com/help/

