---
app_id: squadcast
app_uuid: cfa65726-33af-42bf-8be3-7abb43147a47
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: squadcast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10090
    source_type_name: Squadcast
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Squadcast
  sales_email: it@squadcast.com
  support_email: it@squadcast.com
categories:
- alerting
- collaboration
- incidents
- issue tracking
- notifications
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/squadcast/README.md
display_on_public_website: true
draft: false
git_integration_title: squadcast
integration_id: squadcast
integration_title: Squadcast
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: squadcast
public_title: Squadcast
short_description: Get notified of your Datadog alerts & take actions using Squadcast.
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
  description: Get notified of your Datadog alerts & take actions using Squadcast.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Squadcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Use the Datadog-Squadcast integration to send Datadog alerts or incidents to Squadcast and seamlessly take actions on them within Squadcast.

Connect Squadcast to Datadog in order to:
- Trigger, route, and resolve alerts or incidents from Datadog
- Tackle alerts or incidents and set up escalation policies as they occur
- Define on-call schedules and set up customizable reminders of who is on-call

## セットアップ

**Note**: Only Squadcast users with the correct team-level privileges can configure services in Squadcast. At least one escalation policy must be configured before a service can be added.

### Squadcast

Follow these steps in Squadcast:

1. Choose the **Team** from the team-picker on the top.

2. Open the **Services** page from the primary navigation bar on the left.

3. Choose an existing service, or create a new service by clicking on **Add Service**.

4. Click on **Alert Sources** and select **Datadog** from the drop-down.

5. Copy the **Datadog Webhook URL** shown and click **Done**.

### Datadog

Follow these steps in Datadog:

1. Open the **Integrations** page from the sidebar.

2. Use the search bar to search for "webhooks".

3. Once the **Webhooks** tile appears, hover and click on **Install**.

4. Navigate to the **Configuration** tab and scroll to the bottom of the page.

5. (a) Give the Webhook a name in the **Name** field.

   (b) Paste the **Datadog Webhook URL** provided by Squadcast in the **URL** field.

   (c) Copy-paste the following JSON in the text box under the **Payload** section.

![Squadcast Webhook][1]

```json
    {
       "alertId": "$ALERT_ID",
       "eventMessage": "$TEXT_ONLY_MSG",
       "title": "$EVENT_TITLE",
       "url": "$LINK",
       "alertTransition": "$ALERT_TRANSITION",
       "hostname": "$HOSTNAME",
       "orgName":"$ORG_NAME",
       "priority":"$PRIORITY",
       "snapshot": "$SNAPSHOT",
       "alertQuery": "$ALERT_QUERY",
       "alertScope": "$ALERT_SCOPE",
       "alertStatus": "$ALERT_STATUS",
       "eventType": "$EVENT_TYPE",
       "event_id": "$ID",
       "alert_metric": "$ALERT_METRIC",
       "alert_priority": "$ALERT_PRIORITY",
       "alert_title": "$ALERT_TITLE",
       "alert_type" : "$ALERT_TYPE",
       "event_msg" : "$EVENT_MSG",
       "incident_pub_id" : "$INCIDENT_PUBLIC_ID",
       "incident_title" : "$INCIDENT_TITLE",
       "incident_url" : "$INCIDENT_URL",
       "incident_msg" : "$INCIDENT_MSG",
       "security_rule_id" : "$SECURITY_RULE_ID",
       "security_rule_name" : "$SECURITY_RULE_NAME",
       "security_signal_severity" : "$SECURITY_SIGNAL_SEVERITY",
       "security_signal_title" : "$SECURITY_SIGNAL_TITLE",
       "security_signal_msg" : "$SECURITY_SIGNAL_MSG",
       "security_rule_query" : "$SECURITY_RULE_QUERY",
       "security_rule_type" : "$SECURITY_RULE_TYPE",
       "tags" : "$TAGS"
   }
```

6. Click on **Save** to complete the service integration.

    See the [Squadcast documentation][2] for more details.

**Note**: Once the Webhook for Squadcast is configured, select the same as a channel under **Notify your team** in the Datadog monitor's configuration.

## 収集データ
### メトリクス

Squadcast integration does not include any metrics.

### イベント

Your Squadcast triggered and resolved events display in your Squadcast platform dashboard.

### サービスチェック

Squadcast integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog Support][3].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/squadcast/images/datadog-webhook.png
[2]: https://support.squadcast.com/docs/datadog
[3]: https://docs.datadoghq.com/ja/help/