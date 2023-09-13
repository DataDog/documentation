---
title: Collect Google Cloud Logs with a Push Forwarder
kind: documentation
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
---

## Overview

<div class="alert alert-warning">
Datadog recommends forwarding your Google Cloud logs with a <strong>Pull</strong> subscription to leverage compression and batching of events forwarded to Datadog, as described on the <a href="https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection" target="_blank">Google Cloud integration page</a>.
</div>

This guide describes how you can forward your Google Cloud logs to Datadog through a **Push** subscription to a [Google Cloud Pub/Sub][10] topic. For applications running in GCE or GKE, you can use the [Datadog Agent][13] to collect logs locally. Google Cloud service logs are collected with Google Cloud Logging and sent to a Cloud Pub/Sub topic with a HTTP Push forwarder. 

## Setup

### Prerequisites

1. The [Google Cloud Platform integration][1] is successfully installed.
2. A subscription to a Google Cloud Pub/Sub topic. 

#### Create a Cloud Pub/Sub

1. Go to the [Cloud Pub/Sub console][2] and create a new topic.

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Create a topic" style="width:80%;">}}

2. Give that topic an explicit name such as `export-logs-to-datadog` and click _Create_.

**Warning**: Pub/subs are subject to [Google Cloud quotas and limitations][3]. If the number of logs you have is higher than those limitations, Datadog recommends you split your logs over several topics. See [the Monitor the Log Forwarding section](#monitor-the-log-forwarding) for information on how to set up a monitor to be automatically notified if you get close to those limits.

### Subscription to Google Cloud Pub/Sub

This method uses a subscription with a **Push** delivery type.

#### Forward logs to Datadog

1. Go back to the Pub/Sub Topics overview page, and add select `Subscriptions` in the left hand navigation. Select `Create Subscription`.
2. Create a subscription ID and select the topic you previously created.
3. Select the `Push` method and enter the following: `https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp`.

   You can [create an API key][4] or pick an existing API key in [Datadog Organization Settings -> API Keys][5].

4. Configure any additional options, such as **Subscription expiration**, **Acknowledgment deadline**, **Message retention duration**, or **Dead lettering**.
5. Under **Retry policy**, select `Retry after exponential backoff delay`.
6. Hit `Create` at the bottom.

The Pub/Sub is ready to receive logs from Google Cloud Logging and forward them to Datadog.

#### Export logs from Google Cloud

1. Go to [the Logs Explorer page][6] and filter the logs that need to be exported.
2. From the **Log Router** tab, select **Create Sink**.
3. Provide a name for the sink.
4. Choose _Cloud Pub/Sub_ as the destination and select the pub/sub that was created for that purpose. **Note**: The pub/sub can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

5. Click **Create Sink** and wait for the confirmation message to show up.

**Note**: It is possible to create several exports from Google Cloud Logging to the same Pub/Sub with different sinks.

**Warning**: Pub/subs are subject to [Google Cloud quotas and limitations][3]. If the number of logs you have is higher than those limitations, Datadog recommends you split your logs over several topics. See [the Monitor the Log Forwarding section](#monitor-the-log-forwarding) for information on how to setup a monitor to be automatically notified if you get close to those limits.

## Monitor the log forwarding

Pub/subs are subject to [Google Cloud quotas and limitations][3]. If the number of logs you have is higher than those limitations, Datadog recommends you split your logs over several topics, using different filters.

To be automatically notified when you reach this quota, activate the [Pub/Sub metric integration][8] and set up a monitor on the metric `gcp.pubsub.subscription.num_outstanding_messages`. Filter this monitor on the subscription that exports logs to Datadog to make sure it never goes above 1000, as per the below example:

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Pub Sub monitoring" style="width:80%;">}}

### Sampling logs

You can optionally sample logs while querying by using the [sample function][9]. For example, to include only 10% of the logs, use `sample(insertId, 0.1)`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/google_cloud_platform/#installation
[2]: https://console.cloud.google.com/cloudpubsub/topicList
[3]: https://cloud.google.com/pubsub/quotas#quotas
[4]: https://docs.datadoghq.com/account_management/api-app-keys/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://console.cloud.google.com/logs/viewer
[8]: https://docs.datadoghq.com/integrations/google_cloud_pubsub/
[9]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[10]: https://cloud.google.com/pubsub/docs/overview
[13]: /agent/