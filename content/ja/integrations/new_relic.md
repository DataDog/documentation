---
app_id: new-relic
app_uuid: 82c7d333-a23e-44f9-a6c5-cd22fb541022
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - new_relic.application_summary.apdex_score
      - new_relic.apdex.score
      metadata_path: metadata.csv
      prefix: new_relic.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 54
    source_type_name: New Relic
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: new_relic
integration_id: new-relic
integration_title: New Relic
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: new_relic
public_title: New Relic
short_description: New Relic is an application monitoring service for web and mobile
  applications.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  configuration: README.md#Setup
  description: New Relic is an application monitoring service for web and mobile applications.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: New Relic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

## Overview

<div class="alert alert-danger">The New Relic APM integration is deprecated and has reduced functionality. APM metric labels are unavailable.</div>

Connect to New Relic to see New Relic alerts in your event stream.

## Setup

### New Relic alerts in event stream

Complete the following steps in **New Relic**.

1. On the "Alerts & AI" tab, navigate to "Notification Channels".
2. Select "New Notification Channel".
3. Select "Webhook" as the channel type.
4. Name your channel "Datadog".
5. Enter this base URL:

    ```text
    https://app.datadoghq.com/intake/webhook/newrelic?api_key=<DATADOG_API_KEY>
    ```

6. Click "Custom Payload" and ensure that the payload is in JSON format.
**Note:** See section below for instructions on including custom tags in JSON.
7. Click "Create Channel".
8. Click "Alert Policies".
9. Select any alert policies for which you would like alerts to be sent into Datadog.

### Include custom tags on beta alerts

You can include custom tags with the "Use Custom Payload" option through New Relic's Beta Alerts feature. To configure this, navigate to your New Relic account, and click the 'Alerts Beta' button in the upper right-hand corner of the screen. Then, select the 'Notification channels' section and find the Webhook you've setup for Datadog. From here there should be a section called 'Use Custom Payload', and once selected, it expands to reveal a JSON payload. You need to modify this payload by adding a "tags" attribute. For example, a modified payload might look like this:

```json
{
    "account_id": "$ACCOUNT_ID",
    "account_name": "$ACCOUNT_NAME",
    "condition_id": "$CONDITION_ID",
    "condition_name": "$CONDITION_NAME",
    "current_state": "$EVENT_STATE",
    "details": "$EVENT_DETAILS",
    "event_type": "$EVENT_TYPE",
    "incident_acknowledge_url": "$INCIDENT_ACKNOWLEDGE_URL",
    "incident_id": "$INCIDENT_ID",
    "incident_url": "$INCIDENT_URL",
    "owner": "$EVENT_OWNER",
    "policy_name": "$POLICY_NAME",
    "policy_url": "$POLICY_URL",
    "runbook_url": "$RUNBOOK_URL",
    "severity": "$SEVERITY",
    "targets": "$TARGETS",
    "timestamp": "$TIMESTAMP",
    "tags": ["application:yourapplication", "host:yourhostname", "sometag"]
}
```

After your modifications are complete, select **Update Channel** to save your changes.

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: https://docs.datadoghq.com/ja/help/