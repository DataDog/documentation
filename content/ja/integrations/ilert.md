---
"app_id": "ilert"
"app_uuid": "12731389-915a-4fb7-baec-3319f87dfc7f"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": ilert.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10154"
    "source_type_name": iLert
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": ilert
  "sales_email": support@ilert.com
  "support_email": support@ilert.com
"categories":
- alerting
- collaboration
- incidents
- issue tracking
- notifications
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/ilert/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ilert"
"integration_id": "ilert"
"integration_title": "ilert"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "ilert"
"public_title": "ilert"
"short_description": "Get notified of your Datadog alerts & take actions using ilert"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Collaboration"
  - "Category::Incidents"
  - "Category::Issue Tracking"
  - "Category::Notifications"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Get notified of your Datadog alerts & take actions using ilert
  "media":
  - "caption": ilert alert list
    "image_url": images/ilert-alert-list.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": ilert
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

The [ilert][1] integration sends Datadog alerts to ilert and seamlessly takes actions on these alerts within the ilert platform.
ilert is an incident management platform that enables teams to cover all stages of the incident cycle. ilert provides reliable and actionable alerting, call routing, flexible on-call schedules, status pages, various ChatOps features, AI assistance in incident communications, and post-mortem creation. With ilert, DevOps teams increase uptime and respond to incidents faster.

Integrate with ilert to:

- Trigger and resolve incidents from Datadog
- Tackle incidents and set up escalation policies as they occur
- Set up a daily reminder of who is on-call

## セットアップ

### ilert

#### Create Datadog alert source

1. Switch to the **Alert Sources** tab and click on the "Create new alert source" button

2. Search for "**Datadog**", select the **Datadog** tile and click on Next.

   ![ilert Alert Source New][2]

3. Assign a name.

   ![ilert Alert Source New 2][3]

4. Select a desired escalation policy.

   ![ilert Alert Source New 3][4]

5. On the next page a **Webhook URL** is generated. You need this URL for the integration setup within Datadog.

   ![ilert Alert Source View][5]

### Datadog

#### Add ilert Webhook as alerting channel

1. From the Datadog Integrations page, [**install the Webhooks integration**][6].
2. On the Webhooks integration tile, add a new webhook:

   ![Datadog Webhook New][7]

3. Enter a name, the **Datadog webhook URL** generated earlier from the ilert alert source, and the **template payload**:

   ```json
   {
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "alert_transition": "$ALERT_TRANSITION",
     "alert_id": "$ALERT_ID",
     "link": "$LINK",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
       "id": "$ORG_ID",
       "name": "$ORG_NAME"
     },
     "id": "$ID"
   }
   ```

   ![Datadog Webhook View][8]

4. Click Save.

## 収集データ

### メトリクス

The ilert integration does not include any metrics.

### イベント

Your ilert triggered and resolved events appear in the ilert platform dashboard.

### サービスチェック

The ilert integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][9].

[1]: https://www.ilert.com/?utm_medium=organic&utm_source=integration&utm_campaign=datadog
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-3.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-view.png
[6]: https://app.datadoghq.com/integrations/webhooks
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-new.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-view.png
[9]: https://docs.datadoghq.com/help/

