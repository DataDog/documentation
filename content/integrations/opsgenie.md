---
title: Datadog-OpsGenie Integration
integration_title: OpsGenie

kind: integration
---

## Overview
{:#int-overview}

Create alerts using @opsgenie:

  * From your event stream
  * By taking a snapshot
  * When a metric alert is triggered

## Configuration
{:#int-configuration}

### Create a Datadog integration in OpsGenie

  1. Log in to your OpsGenie account and go to the [OpsGenie Integrations][1] page.
  2. As seen below, filter for Datadog and click on the tile.
![][2]
  3. Enter your Datadog API key from the [Integrations > APIs page][3] in the dedicated field. The key looks like this:
![][4]
  4. Choose the recipients in OpsGenie and set up your filters.
  5. Change the name of the integration if necessary.
  6. Save the configuration.
  7. Copy the red key and the name. You will use this in Datadog.
![][5]
  8. Add more DataDog integrations on OpsGenie by going to the [OpsGenie Integrations][1] page and repeating the steps above.

#### List the integration(s) you made in OpsGenie in Datadog

  1. In Datadog, select the OpsGenie tile on [Account Integrations][6].
  2. In the dialog box that pops up, click on the Configuration tab.
  3. Paste the key(s) provided for each Datadog integration (created in OpsGenie) in the **"Datadog Integration Key"** field, and enter the **"Datadog Integration Name"**.
![][7]




## How to Use Datadog and OpsGenie Together

### Create, acknowledge and close OpsGenie alerts from Datadog

Create an OpsGenie alert by putting @opsgenie-service_name or @opsgenie in the *Say What’s Happening* field, section 5, in the Edit Metric Alert. When this alert is triggered in Datadog, an alert will be sent to the recipients in your OpsGenie service.

![](/static/images/og_metric_alert.png)

Acknowledge or close OpsGenie alerts from Datadog using @opsgenie-acknowledge or @opsgenie-close mentions in the Comments field of an OpsGenie event in Datadog.
![](/static/images/dd_ack_og_alert.png)

### Receive, acknowledge and close Datadog alerts created by OpsGenie

Set-up alerts in OpsGenie. When that alert is triggered, an event will be created in Datadog. The tags and description field from the OpsGenie alert will be carried over to Datadog.

![](/static/images/og_create_alert_dd_updated.png)

Acknowledge and close OpsGenie alerts from OpsGenie. When you do this, the associated event in Datadog will be updated with the username of the person who closed this alert.

![](/static/images/og_closed_dd_updated.png)


[1]: https://www.opsgenie.com/integration/index
[2]: /static/images/opsgenie-int-index.png
[3]: https://app.datadoghq.com/account/settings#api
[4]: /static/images/where-is-dd-key.png
[5]: /static/images/opsgenie-add-api-key.png
[6]: https://app.datadoghq.com/account/settings
[7]: /static/images/datadog-add-opsgenie-key.png
