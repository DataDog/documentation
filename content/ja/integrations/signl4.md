---
"app_id": "signl4"
"app_uuid": "07952edd-2dc5-4c11-a697-5cba325f64ee"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": signl4.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10158"
    "source_type_name": SIGNL4
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": SIGNL4
  "sales_email": success@signl4.com
  "support_email": success@signl4.com
"categories":
- alerting
- collaboration
- incidents
- issue tracking
- notifications
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/signl4/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "signl4"
"integration_id": "signl4"
"integration_title": "SIGNL4"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "signl4"
"public_title": "SIGNL4"
"short_description": "Get notified of your Datadog alerts and take actions using SIGNL4."
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
  "description": Get notified of your Datadog alerts and take actions using SIGNL4.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": SIGNL4
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Use the [SIGNL4][1] integration to send Datadog alerts to SIGNL4 teams and seamlessly take actions on these alerts within the SIGNL4 app.

Connect SIGNL4 to Datadog in order to:
- Trigger and resolve incidents from Datadog
- Tackle incidents and set up escalation policies as they occur
- Set up a daily reminder of who is on-call

![SIGNL4 App][2]

## セットアップ

### SIGNL4

Follow these steps in SIGNL4:

1. Use your existing account or create a SIGNL4 account at [signl4.com][1].

2. In your SIGNL4 app find your SIGNL4 webhook address including your team secret under *Teams -> Your Team -> Secret*.

### Datadog alerts

You can alert your SIGNL4 team about new alerts in Datadog. Alerts that get resolved in Datadog automatically close the alert in SIGNL4. In order to do so you need to configure the following:

1. Navigate to the [Webhooks Integration tile][3].

2. On the **Configuration** tab, go to Webhooks and click **New**.

3. Under **New Webhook**, enter a meaningful `Name` and use the SIGNL4 Webhook `URL` (created above) including your team secret, for example:

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=alertId&ExtStatusParam=alertTransition&ResolvedStatus=Recovered
    ```

    Replace `[team-secret]` with your SIGNL4 team secret here.

    ![SIGNL4 Alerts Webhook][4]

4. Copy-paste the following JSON in the `Payload` text box:

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "alertTransition": "$ALERT_TRANSITION",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

You can adapt the parameters according to your needs, but leave `alertId`, `alertTransition`, and `X-S4-SourceSystem` unchanged.

5. Click **Save** to create the webhook.

For more details, see [Mobile alerting with tracking & escalation for Datadog][5].

You can now use your webhook as a notification channel in your monitor. Assuming the name of your webhook is SIGNL4, send notifications using `@webhook-SIGNL4`. When the conditions of the monitor apply, your team receives a new SIGNL4 alert.

### Datadog Incidents

You can alert your SIGNL4 team about new Incidents in Datadog. Incidents that get resolved in Datadog automatically close the alert in SIGNL4. In order to do so, configure the following:

1. Navigate to the [Webhooks Integration tile][3].

2. On the **Configuration** tab, go to Webhooks and click **New**.

3. Under **New Webhook**, enter a meaningful `Name` and use the SIGNL4 Webhook `URL` (created above) including your team secret, for example:

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=s4ExternalId&ExtStatusParam=incidentStatus&ResolvedStatus=resolved
    ```

    Replace `[team-secret]` in the URL with your SIGNL4 team secret.

    ![SIGNL4 Incidents Webhook][6]

4. Copy-paste the following JSON in the `Payload` text box:

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "incidentPublicId": "$INCIDENT_PUBLIC_ID",
        "incidentStatus": "$INCIDENT_STATUS",
        "alertTransition": "$ALERT_TRANSITION",
        "s4ExternalId": "DATADOG-INCIDENT-$INCIDENT_PUBLIC_ID",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

Adapt the parameters according to your needs, but leave `incidentStatus`, `s4ExternalId` and `X-S4-SourceSystem` unchanged.

5. Click **Save** to create the webhook.

For more details, see [Mobile alerting with tracking & escalation for Datadog][5].

### Incidents Rule

You can create a rule in Datadog under Monitors -> Settings (Incidents) Rules. In the rule, you specify the criteria, for example, the severity, service, etc. For the "Other attributes", it is recommended to use "state:active" to trigger a new alert and "state:resolved" to close the alert. Under "Notify", select your SIGNL4 incident webhook as created above.

![SIGNL4 Incidents Rule][7]

If you create a new incident, your SIGNL4 team receives an alert. If you acknowledge or close the alert in the SIGNL4 app, the incident status is be set to Stable or Resolved.

Also, if you set the incident status to Resolved in Datadog, this closes the alert in SIGNL4.

### Status updates for Datadog incidents

For Datadog incidents, you can update the status to Stable or Resolved directly from your SIGNL4 app by acknowledging or closing the respective alert.

In order to configure this back channel, go to your SIGNL4 web portal and then to Teams -> Apps. Search for the Datadog connector app and click "Create" there. You can find more information directly within the app settings.

![Datadog Connector App][8]

You need to configure the following:

- Datadog URL: The URL of your Datadog instance, for example, https://app.datadoghq.com/ or https://app.datadoghq.eu/.  
- Datadog API Key: Your Datadog API key. You can find or create an API key in Datadog under your account, Organization Settings -> API Keys.  
- Datadog Application Key: Your Datadog application key. You can find or create an application key in Datadog under your account, Organization Settings -> Application Keys.  
- Acknowledgement as Stable: Acknowledgements set the incident status to Stable.  

## 収集データ

### メトリクス

The SIGNL4 integration does not include any metrics.

### イベント

SIGNL4 triggered and resolved events appear in your SIGNL4 app and web portal.

### サービスチェック

The SIGNL4 integration does not include any service checks.

## トラブルシューティング
Need help? Contact [SIGNL4 Support][9].


[1]: https://www.signl4.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-phone.png
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-alerts-webhook.png
[5]: https://www.signl4.com/blog/portfolio_item/datadog_mobile_alerting/
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-webhook.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-rule.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-datadog-connector-app.png
[9]: mailto:success@signl4.com

