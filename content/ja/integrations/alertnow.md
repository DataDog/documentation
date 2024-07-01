---
"app_id": "alertnow"
"app_uuid": "cdb258cc-5e74-4fa2-be21-1489375bb370"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": alertnow.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10279"
    "source_type_name": AlertNow
"author":
  "homepage": "https://service.opsnow.com"
  "name": AlertNow
  "sales_email": sales@opsnow.com
  "support_email": support@opsnow.com
"categories":
- alerting
- automation
- collaboration
- incidents
- mobile
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/alertnow/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "alertnow"
"integration_id": "alertnow"
"integration_title": "AlertNow"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "alertnow"
"public_title": "AlertNow"
"short_description": "Sync Datadog alerts with those in AlertNow"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Automation"
  - "Category::Collaboration"
  - "Category::Incidents"
  - "Category::Mobile"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Sync Datadog alerts with those in AlertNow
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": AlertNow
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

AlertNow is an integrated incident management platform that collects alerts from various and complex IT environments and delivers the alerts to the right people, enabling them to handle incidents rapidly. Connecting AlertNow with Datadog automatically syncs your Datadog alerts with those in AlertNow. You can manage alerts on a single platform, notify your teams, and respond to critical issues immediately.


What AlertNow offers:
- Trigger and resolve incidents from Datadog
- Notify the right people via email, SMS, Voice call, and mobile application when incidents occur

- Notify users based on escalation policy
- Reports on MTTA and MTTR, analysis reports


![alertnow overview][1]

## Setup

### AlertNow

To connect Datadog with AlertNow, create a webhook and monitors in Datadog.


1. Use your existing account or create an AlertNow account at opsnow.com.

2. Log in to AlertNow and go to the Configuration > Integration menu.
3. Click **Create Integration**, and then select the **Datadog** card.

    ![datadog card][2]

4. In the Create integration page, enter the required information, and then click the OK button to create the integration.

    ![datadog integration][3]

5. Copy the URL from the Integration page of AlertNow.
    ![datadog detail][4]


### Datadog

Follow the steps below in your Datadog account.


1. Open the [Webhooks Integration tile][5].

2. Select the **Configuration** tab, and scroll to the bottom and click **New**.

3. On the **New Webhook** form, enter a meaningful name and the AlertNow Webhook URL created in the AlertNow integration page. The format of the copied AlertNow Webhook URL is as below. Substitute your API key for **{ALERTNOW-API-KEY}**.



    <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{ALERTNOW-API-KEY} </code></pre>

    ![datadog webhook][6]

4. Copy the JSON Payload below and paste it in the Payload window.


    ``` json
    {
        "id":"$ID",
        "email":"$EMAIL",
        "eventTitle":"$EVENT_TITLE",
        "eventMsg":"$EVENT_MSG",
        "textOnlyMsg":"$TEXT_ONLY_MSG",
        "eventType":"$EVENT_TYPE",
        "date":"$DATE",
        "datePosix":"$DATE_POSIX",
        "alertId":"$ALERT_ID",
        "alertType":"$ALERT_TYPE",
        "aggregKey":"$AGGREG_KEY",
        "orgId":"$ORG_ID",
        "alertStatus":"$ALERT_STATUS",
        "alertScope":"$ALERT_SCOPE",
        "hostname":"$HOSTNAME",
        "user":"$USER",
        "username":"$USERNAME",
        "snapshot":"$SNAPSHOT",
        "link":"$LINK",
        "priority":"$PRIORITY",
        "tags":"$TAGS",
        "lastUpdated":"$LAST_UPDATED",
        "lastUpdatedPosix":"$LAST_UPDATED_POSIX",
        "alertMetric":"$ALERT_METRIC",
        "metricNamespace":"$METRIC_NAMESPACE",
        "alertTransition":"$ALERT_TRANSITION",
        "orgName":"$ORG_NAME",
        "alertQuery":"$ALERT_QUERY",
        "alertTitle":"$ALERT_TITLE",
        "alertCycleKey":"$ALERT_CYCLE_KEY"
    }

    ```

5. Refer to Datadog's [Alerting documentation][7] to create monitors.



## Support

Need help? Contact [AlertNow support][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png
[5]: https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png
[7]: https://docs.datadoghq.com/monitors/
[8]: mailto:support@opsnow.com

