---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-OpsGenie Integration
integration_title: OpsGenie
kind: integration
doclevel:
---

<!-- <style>
.class {
	padding-bottom: 5px;
}
</style> -->

## Overview
{:#int-overview}

Create alerts using @opsgenie:

- From your event stream
- By taking a snapshot
- When a metric alert is triggered


## Configuration
{:#int-configuration}

### Create a Datadog integration in OpsGenie

1. Log in to your OpsGenie account and go to the [OpsGenie Integrations](https://www.opsgenie.com/integration/index) page.
2. As seen below, filter for Datadog and click on the tile.
				<img src="/static/images/opsgenie-int-index.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
3. Enter your Datadog API key from the [Integrations > APIs page](https://app.datadoghq.com/account/settings#api) in the dedicated field. The key looks like this:
				<img src="/static/images/where-is-dd-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
4. Choose the recipients in OpsGenie and set up your filters.
5. Change the name of the integration if necessary.
6. Save the configuration.
7. Copy the red key and the name. You will use this in Datadog.
				<img src="/static/images/opsgenie-add-api-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
8. Add more DataDog integrations on OpsGenie by going to the [OpsGenie Integration](https://www.opsgenie.com/integration/index) page and repeating the steps above.

#### List the integration(s) you made in OpsGenie in Datadog

1. In Datadog, select the OpsGenie tile on <a href="https://app.datadoghq.com/account/settings">Account Integrations</a>.

2. In the dialog box that pops up, click on the Configuration tab.

3. Paste the key(s) provided for each Datadog integration (created in OpsGenie) in the **"Datadog Integration Key"** field, and enter the **"Datadog Integration Name"**.

<img src="/static/images/datadog-add-opsgenie-key.png" style="width:100% border:1px #777777;padding-top:15px;" />

## How to Use Datadog and OpsGenie Together

### Create, acknowledge and close  OpsGenie alerts from Datadog

Create an OpsGenie alert by putting @opsgenie-service_name or @opsgenie in the **Say What’s Happening** field, section 5, in the Edit Metric Alert. When this alert is triggered in Datadog, an alert will be sent to the recipients in your OpsGenie service.

<img src="/static/images/og_metric_alert.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:20px;" />

Acknowledge or close OpsGenie alerts from Datadog using @opsgenie-acknowledge or @opsgenie-close mentions in the Comments field of an OpsGenie event in Datadog.

<img src="/static/images/dd_ack_og_alert.png" style="width:100% border:1px #777777;padding-bottom:10px;" />

### Receive, acknowledge and close Datadog alerts created by OpsGenie

Set-up alerts in OpsGenie. When that alert is triggered, an event will be created in Datadog. The tags and description field from the OpsGenie alert will be carried over to Datadog.

<img src="/static/images/og_create_alert_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;" />

Acknowledge and close OpsGenie alerts from OpsGenie. When you do this, the associated event in Datadog will be updated with the username of the person who closed this alert.

<img src="/static/images/og_closed_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;" />
