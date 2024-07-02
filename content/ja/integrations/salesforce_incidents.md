---
"categories":
- cloud
- incidents
- notifications
"custom_kind": "インテグレーション"
"dependencies": []
"description": "This integration allows you to create Salesforce Incidents from triggered alerts in Datadog, and update existing incidents with new information as it arises."
"doc_link": "https://docs.datadoghq.com/integrations/salesforce_incidents/"
"draft": false
"git_integration_title": "salesforce_incidents"
"has_logo": true
"integration_id": ""
"integration_title": "Salesforce Incidents"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "salesforce_incidents"
"public_title": "Datadog-Salesforce Incidents Integration"
"short_description": "Create and manage Salesforce Service Cloud Incidents from Datadog alerts."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Salesforce Incidents integration allows you to create incidents in Salesforce Service Cloud from monitor alert 
events. Using the Salesforce Datadog Widget, you can view the timeline of monitor events related to the incident
directly in Salesforce.

## セットアップ

### Connect Datadog to Salesforce Service Cloud

1. Go to the [Datadog Salesforce Incidents integration tile][1] and click **Add Organization**.
2. Select the Organization type.
3. Click **Connect** and follow the instructions on the Salesforce Service Cloud authorization page.

### Trusted IP Ranges

If your Salesforce Organization uses Trusted IP ranges to filter traffic, you need to allow connections from the 
**Webhooks** IP prefixes belonging to Datadog in order for the integration to work. For a list of **Webhooks** 
IP prefixes for your region, see [Datadog IP Ranges][2].

### Configure an incident template

Templates define how incidents are created in Salesforce Service Cloud from Datadog alert events.

To create an incident template:

1. Click **New Incident Template**.
2. Enter a name for your incident template. This name, prefixed with `salesforce_incidents-`, becomes the handle you can use in your monitor notifications (such as `@salesforce_incidents-my-incident-template-name`).
3. Select a Salesforce Organization.
4. Provide a subject, description, owner, and priority to use when creating an incident.
5. Click **Save**.

### Add the Datadog Widget to Salesforce Service Cloud

To install the Datadog Widget in Salesforce Service Cloud:

1. Have an admin for your Salesforce Organization install the Datadog app from the [Salesforce AppExchange][3].
2. In Salesforce Service Cloud, go to an Incident Record page.
3. Click on the Gear Icon and then click **Edit page**.
4. Click and drag the Datadog widget onto the page from the custom components in the left nav.
5. Click **Save**.

## 使用方法

#### Creating incidents in Salesforce Service Cloud from Datadog Alerts

Include a notification handle of one or more incidents templates (for example, `@salesforce_incidents-my-incident-template-name`).
in the **Notify your team** or **Say what's happening** sections of your Datadog monitor.

Incidents are created when the monitor triggers. New incidents are not created until the monitor resolves.


## 収集データ

### メトリクス

The Salesforce Incidents integration does not provide any metrics.

### イベント

The Salesforce Incidents integration does not include any events.

### サービスチェック

The Salesforce Incidents integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://app.datadoghq.com/integrations/salesforce-incidents
[2]: https://docs.datadoghq.com/api/latest/ip-ranges/
[3]: https://appexchange.salesforce.com/
[4]: https://docs.datadoghq.com/help/

