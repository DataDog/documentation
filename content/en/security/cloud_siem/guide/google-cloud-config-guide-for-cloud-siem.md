---
title: Google Cloud Configuration Guide for Cloud SIEM
kind: documentation
further_reading:
- link: "/security/default_rules/#cat-cloud-siem-log-detection"
  tag: "Documentation"
  text: "Explore Cloud SIEM default detection rules"
- link: "/security/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "/security/cloud_siem/log_detection_rules/"
  tag: "Documentation"
  text: "Create new detection rules"
- link: "https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/"
  tag: "Blog"
  text: "Visualize activity in your Google Cloud environment with Datadog Cloud SIEM Investigator"
---

## Overview

[Datadog Cloud SIEM][1] applies detection rules to all processed logs in Datadog to detect threats, like a targeted attack, a threat intel listed IP communicating with your systems, or an insecure resource modification. The threats are surfaced as Security Signals in the Security Signals Explorer for triaging.

This guide walks you through the following steps so that you can start detecting threats with your Google Cloud audit logs:

1. [Enable Data Access audit logs](#enable-data-access-audit-logs)
1. [Create a new Google Cloud publish/subscription (pub/sub) system](#create-a-new-google-cloud-publishsubscription-pubsub-system)
1. [Configure the pub/sub to send logs to Datadog](#configure-the-pubsub-to-send-logs-to-datadog)
1. [Export logs from Google Cloud Logging to the pub/sub](#export-logs-from-google-cloud-logging-to-the-pubsub)

## Enable Data Access audit logs

1. Navigate to the IAM & Admin Console > [Audit Log][6].
1. Select the services for which you want to enable data access logs.
1. In the **Log Types** panel, enable **Admin Read**, **Data Read**, and **Data Write**.
1. Click **Save**. 

### Change default configuration for new services

If a new Google Cloud service is added, it inherits your [default audit configuration][7].

To ensure that Data Access audit logs are captured for new Google Cloud service, modify your default audit configuration:

1. Navigate to the **IAM & Admin Console > [Audit Log][6]**.
1. Enable **Admin Read**, **Data Read**, and **Data Write**.
1. Click **Save**.

## Create a new Google Cloud publish/subscription (pub/sub) system

1. Navigate to the Pub/Sub > [Topics][7].
1. Click **Create Topic**.
1. Enter a topic name. For example, `export-audit-logs-to-datadog`.
1. Click **Create**.

## Configure the pub/sub to send logs to Datadog

1. Navigate to Pub/Sub > [Subscriptions][8].
1. Click **Create Subscription**.
1. Enter a subscription name.
1. Select the topic you created earlier.
1. In **Delivery type**, select **Push**.
1. Enter the following endpoint URL, replacing `DATADOG_API_KEY` with an existing or new Datadog API key: `https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp`
1. Configure any additional options for your use case.
1. Click **Create**.

The Pub/Sub is ready to receive logs from Google Cloud Logging and forward them to Datadog.

## Export logs from Google Cloud Logging to the pub/sub

1. Navigate to [Cloud Logs Explorer][9].
1. Enter the query to filter to the logs you want to export.
1. Select **Log Router** in the left side menu.
1. Click **Create Sink**.
1. Enter a name for the sink.
1. Click **Next**.
1. In the **Select Sink Service** dropdown menu, select **Cloud Pub/Sub topic**. 
1. In the **Select a Cloud Pub/Sub topic**, select the Pub/Sub created earlier.
1. Click **Create Sink**.

**Note**: It is possible to create several exports from Google Cloud Logging to the same Pub/Sub with different sinks.

**Warning**: Pub/Subs are subject to [Google Cloud quotas and limitations][10]. If the number of logs you have is higher than those limitations, Datadog recommends you split your logs over several topics. See [Monitor the Log Forwarding][11] for information on how to set up a monitor to notify when you are close to those limits.
## Use Cloud SIEM to triage Security Signals

Cloud SIEM applies out of the box detection rules to all processed logs, including the Google Cloud audit logs you have just set up. When a threat is detected with a Detection Rule, a Security Signal is generated and can be viewed in the Security Signals Explorer.

- Go to the [Cloud SIEM Signals Explorer][12] to view and triage threats. See Security Signals Explorer for further details.
- You can also use the [Google Cloud Audit Log dashboard][13] to investigate anomalous activity.
- See [out-of-the-box detection rules][14] that are applied to your logs.
- Create [new rules][15] to detect threats that match your specific use case.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/
[2]: https://console.cloud.google.com/apis/credentials
[3]: https://console.cloud.google.com/iam-admin/serviceaccounts
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://app.datadoghq.com/integrations/google-cloud-platform
[6]: https://console.cloud.google.com/iam-admin/audit
[7]: https://console.cloud.google.com/cloudpubsub/topic
[8]: https://console.cloud.google.com/cloudpubsub/subscription
[9]: https://console.cloud.google.com/logs/
[10]: https://cloud.google.com/pubsub/quotas#quotas
[11]: /integrations/google_cloud_platform/#monitor-the-log-forwarding
[12]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[13]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[14]: /security/default_rules/#cat-cloud-siem
[15]: /security/detection_rules/
