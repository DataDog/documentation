---
"app_id": "twilio"
"app_uuid": "488f85eb-ce17-4c50-a6e9-78d61f360693"
"assets":
  "dashboards":
    "twilio": assets/dashboards/twilio_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10406"
    "source_type_name": Twilio
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com (日本語対応)
  "support_email": help@datadoghq.com
"categories":
- コスト管理
- イベント管理
- 問題追跡
- ログの収集
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "twilio"
"integration_id": "twilio"
"integration_title": "Twilio"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "twilio"
"public_title": "Twilio"
"short_description": "Monitor performance issues, reduce costs, and identify security threats across all your Twilio resources."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cost Management"
  - "Category::Event Management"
  - "Category::Issue Tracking"
  - "Category::Log Collection"
  - "Category::Security"
  - "Offering::Integration"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor performance issues, reduce costs, and identify security threats across all your Twilio resources.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Twilio
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Datadog’s Twilio integration collects a wide variety of logs to analyze performance issues and detect threats across all your Twilio resources. Use the out-of-the-box dashboard to aggregate alerts, troubleshoot messages and call errors, and collect comprehensive event-logging and change-tracking info for your Twilio account.

By default, this integration collects [Alert Resource][1] logs. These logs provide details for errors or warnings encountered when Twilio makes a webhook request to your server, or when your application makes a request to the REST API.

<div class="alert alert-info">You can use Cloud Cost Management to gain insight into your Twilio cost data. See the <a href="https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=twilio">SaaS cost integrations page</a> for more information.</div>

### Message Logs

A [Message][2] resource log represents an inbound or outbound message. A log will be generated when any of the following occur:

- You create a Message resource (i.e., send an outbound message) via the REST API
- Twilio executes a TwiML instruction
- Someone sends a message to one of your Twilio numbers or messaging channel addresses

Use these logs to track total delivery and troubleshoot message errors. Message bodies are never collected by Datadog.

### Call Summary Logs

[Call Summary Resource][3] logs provide an overview of metadata and performance of all calls made from your Twilio account. To get actionable insights into your calls, enable Twilio’s [Voice Insights Advanced Features][4] for your account.

### Event Logs:

Monitor Twilio Event Resources for comprehensive event logging and change tracking for Twilio resources. Events are logged when you provision a phone number, change your account's security settings, delete a recording, and so on. Events record virtually every action taken within Twilio, regardless of whether that action was taken through the API, by a user in the Twilio Console, or even by a Twilio employee.

Datadog [Cloud SIEM][5] analyzes and correlates Twilio Event logs to detect threats to your environment in real time.

## セットアップ

### インストール

1. [Generate an API Key and API Secret][6] through the Twilio UI.
2. Find your Account SID on the Twilio Console dashboard, under Account Info.
3. Input your API Key, API Secret, and Account SID into the [Twilio integration tile][7].
4. If you use Cloud Cost Management and enable collecting cost data, it will be visible in [Cloud Cost Management][8] within 24 hours. ([collected data][9])

### 検証

Search your Datadog logs with `source:twilio`. If you installed the integration correctly, you should see Twilio events.

## 収集データ

### メトリクス

The Twilio integration does not include any metrics.

### サービスチェック

The Twilio integration does not include any service checks.

### イベント

The Twilio integration ingests [event resources][1].

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://www.twilio.com/docs/usage/monitor-alert
[2]: https://www.twilio.com/docs/messaging/api/message-resource
[3]: https://www.twilio.com/docs/voice/voice-insights/api/call/call-summary-resource
[4]: https://www.twilio.com/docs/voice/voice-insights/advanced-features
[5]: https://app.datadoghq.com/security/home
[6]: https://www.twilio.com/docs/iam/api-keys#create-an-api-key
[7]: https://app.datadoghq.com/integrations/twilio
[8]: https://app.datadoghq.com/cost
[9]: https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=twilio#data-collected
[10]: https://docs.datadoghq.com/help/

