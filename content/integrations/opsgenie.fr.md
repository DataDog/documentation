---
categories:
- monitoring
- notification
ddtype: crawler
description: Use OpsGenie as a notification channel in Datadog alerts and events.
doc_link: https://docs.datadoghq.com/integrations/opsgenie/
git_integration_title: opsgenie
has_logo: true
integration_title: OpsGenie
is_public: true
kind: integration
manifest_version: '1.0'
name: opsgenie
public_title: Datadog-OpsGenie Integration
short_description: Use OpsGenie as a notification channel in Datadog alerts and events.
version: '1.0'
---

## Overview

Create alerts using @opsgenie:

  * From your event stream
  * By taking a snapshot
  * When a metric alert is triggered

## Setup
### Configuration
#### Create a Datadog integration in OpsGenie

  1. Log in to your OpsGenie account and go to the [OpsGenie Integrations](https://www.opsgenie.com/integrations) page.
  2. As seen below, filter for Datadog and click on the tile.
  {{< img src="integrations/opsgenie/opsgenie-int-index.png" alt="opsgenie int index" responsive="true" popup="true">}}

  3. Enter your Datadog API key from the [Integrations > APIs page](https://app.datadoghq.com/account/settings#api) in the dedicated field. The key looks like this:
  {{< img src="integrations/opsgenie/where-is-dd-key.png" alt="where is dd key" responsive="true" popup="true">}}
  4. Choose the recipients in OpsGenie and set up your filters.
  5. Change the name of the integration if necessary.
  6. Save the configuration.
  7. Copy the red key and the name. You will use this in Datadog.
  {{< img src="integrations/opsgenie/opsgenie-add-api-key.png" alt="opsgenie add api key" responsive="true" popup="true">}}
  8. Add more DataDog integrations on OpsGenie by going to the [OpsGenie Integrations](https://www.opsgenie.com/integrations) page and repeating the steps above.

#### List the integration(s) you made in OpsGenie in Datadog

  1. In Datadog, select the OpsGenie tile on [Account Integrations](https://app.datadoghq.com/account/settings).
  2. In the dialog box that pops up, click on the Configuration tab.
  3. Paste the key(s) provided for each Datadog integration (created in OpsGenie) in the **"Datadog Integration Key"** field, and enter the **"Datadog Integration Name"**.
  {{< img src="integrations/opsgenie/datadog-add-opsgenie-key.png" alt="datadog add opsgenie key" responsive="true" popup="true">}}

## Data Collected
### Metrics

The Opsgenie integration does not include any metric at this time.

### Events
The Opsgenie integration does not include any event at this time.

### Service Checks
The Opsgenie integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
### Knowledge Base
#### How to Use Datadog and OpsGenie Together
##### Create, acknowledge and close OpsGenie alerts from Datadog

Create an OpsGenie alert by putting @opsgenie-service_name or @opsgenie in the *Say What’s Happening* field, section 5, in the Edit Metric Alert. When this alert is triggered in Datadog, an alert will be sent to the recipients in your OpsGenie service.

{{< img src="integrations/opsgenie/og_metric_alert.png" alt="og metric alert" responsive="true" popup="true">}}

Acknowledge or close OpsGenie alerts from Datadog using @opsgenie-acknowledge or @opsgenie-close mentions in the Comments field of an OpsGenie event in Datadog.
{{< img src="integrations/opsgenie/dd_ack_og_alert.png" alt="dd ack og alert" responsive="true" popup="true">}}

##### Receive, acknowledge and close Datadog alerts created by OpsGenie

Set-up alerts in OpsGenie. When that alert is triggered, an event will be created in Datadog. The tags and description field from the OpsGenie alert will be carried over to Datadog.

{{< img src="integrations/opsgenie/og_create_alert_dd_updated.png" alt="og create alert dd updated" responsive="true" popup="true">}}

Acknowledge and close OpsGenie alerts from OpsGenie. When you do this, the associated event in Datadog will be updated with the username of the person who closed this alert.

{{< img src="integrations/opsgenie/og_closed_dd_updated.png" alt="og closed dd updated" responsive="true">}}

