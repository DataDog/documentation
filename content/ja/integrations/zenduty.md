---
app_id: zenduty
app_uuid: 0f2dea25-5757-477c-ad92-d459133d8b05
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: zenduty.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10305
    source_type_name: Zenduty
author:
  homepage: https://www.zenduty.com
  name: Zenduty
  sales_email: vishwa@zenduty.com
  support_email: shubham@zenduty.com
categories:
- alerting
- collaboration
- incidents
- issue tracking
- notifications
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zenduty/README.md
display_on_public_website: true
draft: false
git_integration_title: zenduty
integration_id: zenduty
integration_title: Zenduty
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zenduty
public_title: Zenduty
short_description: Use Zenduty as the incident response and notification partner for
  Datadog alerts
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
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Use Zenduty as the incident response and notification partner for Datadog
    alerts
  media:
  - caption: Detailed yet clutterfree incident dashboard.
    image_url: images/incident_dashboard.png
    media_type: image
  - caption: Handle the entire incident straight from Slack or Teams
    image_url: images/slack_controls.png
    media_type: image
  - caption: Boost your team's incident response game with fine tuned Alert Rules
    image_url: images/alert_rules.png
    media_type: image
  - caption: Reliable and noiseless alerting throughout your Incident Management cycle
    image_url: images/incident_timeline.png
    media_type: image
  - caption: Bring your playbooks automatically into your incidents and get a step-by-step
      guide till resolution
    image_url: images/task_playbooks.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zenduty
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Use the Zenduty integration to send Datadog alerts to the right team, notify them as per on-call schedules, and help them remediate and resolve incidents with speed. Send notifications via e-mail, Slack, Microsoft Teams, SMS, Phone Calls, Android and iOS push messages.

Connect Zenduty with Datadog in order to:
- Trigger and resolve Zenduty incidents, receive alerts for created incidents, and track issues from Datadog
- Deploy on-call schedules, escalation policies, incident playbooks, postmortems, and detailed analytics
- Use Alert Rules to customize routing for Datadog alerts to certain users or teams, write suppression rules, and automatically add notes, responders, and incident tasks

## セットアップ

### Zenduty
In [Zenduty][1], follow the steps below:

1. Go to **Teams** and click on the team you want to add the integration to.

2. Navigate to **Services**. Create a new service or select an existing one.

3. Go to **Integrations** and then **Add New Integration**. Give the integration a name, and select the application **Datadog** from the dropdown menu.

4. Go to **Configure** under your integrations, and copy the generated Datadog webhook URL.

### Follow the steps below within Datadog:

5. From the sidebar, go to **Integrations**. Search for **Webhooks** from [this page][2], and click the add button.

6. Scroll down, click on the <kbd>**+New**</kbd> button in the Webhooks section. Fill in the name, the webhook URL copied from Zenduty, and paste the following JSON in the payload box:
```json
{
  "alert_id": "$ALERT_ID",
  "hostname": "$HOSTNAME",
  "date_posix": "$DATE_POSIX",
  "aggreg_key": "$AGGREG_KEY",
  "title": "$EVENT_TITLE",
  "alert_status": "$ALERT_STATUS",
  "alert_transition": "$ALERT_TRANSITION",
  "link": "$LINK",
  "event_msg": "$TEXT_ONLY_MSG"
}
```

7. Click on **Save**. The Datadog Zenduty integration setup is complete.

See the [Zenduty documentation][3] for more details and to get the most out of this integration.

**Note**: Mention `@zenduty` as a channel under **Notify your team** in the Datadog monitor's configuration to get alerts through Zenduty when Datadog incidents are created or resolved.

## 収集データ
### メトリクス

The Zenduty integration does not include any metrics.

### イベント

Triggered, acknowledged, and resolved events are displayed in Zenduty's dashboard.

### サービスチェック

The Zenduty integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog Support][4].

[1]: https://www.zenduty.com
[2]: https://app.datadoghq.com/integrations/webhooks?search=webhook
[3]: https://docs.zenduty.com/docs/datadog
[4]: https://docs.datadoghq.com/ja/help/