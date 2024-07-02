---
"categories":
- "collaboration"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "OpsGenie を Datadog のアラートとイベントで通知チャンネルとして使用。"
"doc_link": "https://docs.datadoghq.com/integrations/opsgenie/"
"draft": false
"further_reading":
- "link": "https://docs.datadoghq.com/tracing/service_catalog/integrations/#opsgenie-integration"
  "tag": "ブログ"
  "text": "サービスカタログとのインテグレーションを利用する"
- "link": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_opsgenie_service_object"
  "tag": "Terraform"
  "text": "Terraform による Opsgenie サービスオブジェクトの作成と管理"
"git_integration_title": "opsgenie"
"has_logo": true
"integration_id": ""
"integration_title": "OpsGenie"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "opsgenie"
"public_title": "Datadog-OpsGenie Integration"
"short_description": "Use OpsGenie as a notification channel in Datadog alerts and events."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Create alerts using `@opsgenie`:

- By taking a snapshot
- When a metric alert is triggered

## セットアップ

### 構成

#### Create a Datadog integration in Opsgenie

1. Log in to your Opsgenie account and go to the [Opsgenie Integrations][1] page.
2. Search for Datadog and click on the tile.
3. Choose the recipients of Datadog alerts in Opsgenie using the **Responders** field.
4. Enter your Datadog API key from the [Integrations > APIs page][2].
5. If you are using the Datadog EU site, check the `Send to Datadog EU` box.
6. Change the name of the integration if necessary.
7. Save the configuration.
8. Copy the key and the name for further use in Datadog.
9. Add more Datadog integrations on Opsgenie by going to the [Opsgenie Integrations][1] page and repeating the steps above.

#### List the integration(s) you made in Opsgenie in Datadog

1. In Datadog, select the Opsgenie tile on [Account Integrations][3].
2. In the dialog box that pops up, click on the Configuration tab.
3. Paste the key(s) provided for each Datadog integration (created in Opsgenie) in the **"Opsgenie API Key"** field, and enter the **"Service Name"**.
   {{< img src="integrations/opsgenie/datadog-add-opsgenie-api-key.png" alt="datadog add opsgenie key" popup="true">}}

## 収集データ

### メトリクス

The Opsgenie integration does not include any metric.

### イベント

The Opsgenie integration does not include any events.

### サービスチェック

The Opsgenie integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.opsgenie.com/settings/integration/integration-list
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings
[4]: https://docs.datadoghq.com/help/

