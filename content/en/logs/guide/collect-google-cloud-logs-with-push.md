---
title: Collect Google Cloud Logs with a Pub/Sub Push Subscription
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

<div class="alert alert-danger">
This page describes deprecated features with configuration information relevant to legacy Pub/Sub Push subscriptions, useful for troubleshooting or modifying legacy setups. Use a <strong>Pull</strong> subscription with the Datadog Dataflow template to forward your Google Cloud logs to Datadog instead. See <a href="https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection" target="_blank">Log collection</a> on the Google Cloud integration page for instructions.
</div>

## Overview

This guide describes how to forward logs from your Google Cloud services to Datadog through a **Push** subscription to a [Google Cloud Pub/Sub][1] topic.

To collect logs from applications running in GCE or GKE, you can also use the [Datadog Agent][2].

**Note**: If you have a [Google Cloud VPC][3] in your Google Cloud environment, the **Push** subscription cannot access endpoints outside the VPC.

## Setup

### Prerequisites

The [Google Cloud Platform integration][4] is successfully installed.

### Create a Cloud Pub/Sub topic

1. Go to the [Cloud Pub/Sub console][5] and create a new topic.

    {{< img src="integrations/google_cloud_platform/create_topic_no_default_sub.png" alt="Create a topic without default subscription" style="width:80%;">}}

2. Give that topic an explicit name such as `export-logs-to-datadog` and click **Create**.

**Warning**: Pub/subs are subject to [Google Cloud quotas and limitations][6]. If the number of logs you have is higher than those limitations, Datadog recommends you split your logs over several topics. See [the Monitor the Log Forwarding section](#monitor-the-log-forwarding) for information on setting up monitor notifications if you approach those limits.

### Forward logs to Datadog with a Cloud Pub/Sub subscription

1. In the [Cloud Pub/Sub console][5], select **Subscriptions** in the left hand navigation. Click **Create Subscription**.
2. Create a subscription ID and select the topic you previously created.
3. Select the `Push` method and enter the following command, replacing `<DATADOG_API_KEY>` with the value of a valid [Datadog API key][7]: 
```
https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp
```
**Note**: Ensure that the `Datadog site` selector on the right of the page is set to your [Datadog site][8] before copying the command above.

4. Configure any additional options, such as **Subscription expiration**, **Acknowledgment deadline**, **Message retention duration**, or **Dead lettering**.
5. Under **Retry policy**, select **Retry after exponential backoff delay**.
6. Click **Create** at the bottom.

The Pub/Sub is ready to receive logs from Google Cloud Logging and forward them to Datadog.

### Export logs from Google Cloud

1. Go to [the Google Cloud Logs Explorer page][9] and filter the logs that need to be exported.
2. From the **Log Router** tab, select **Create Sink**.
3. Provide a name for the sink.
4. Choose **Cloud Pub/Sub** as the destination and select the pub/sub that was created for that purpose.
   **Note**: The pub/sub can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

5. Click **Create Sink** and wait for the confirmation message to appear.

**Note**: It is possible to create several exports from Google Cloud Logging to the same Pub/Sub with different sinks.

## Monitor the log forwarding

Pub/subs are subject to [Google Cloud quotas and limitations][6]. If the number of logs you have is higher than those limitations, Datadog recommends you split your logs over several topics, using different filters.

To be automatically notified when you reach this quota, activate the [Pub/Sub metric integration][10] and set up a monitor on the metric `gcp.pubsub.subscription.num_outstanding_messages`. Filter this monitor on the subscription that exports logs to Datadog to make sure it never goes above 1000, as per the below example:

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Pub Sub monitoring" style="width:80%;">}}

### Sampling logs

You can optionally sample logs while querying by using the [sample function][11]. For example, to include only 10% of the logs, use `sample(insertId, 0.1)`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/pubsub/docs/overview
[2]: /agent/
[3]: https://cloud.google.com/vpc
[4]: /integrations/google_cloud_platform/#installation
[5]: https://console.cloud.google.com/cloudpubsub/topicList
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: https://docs.datadoghq.com/account_management/api-app-keys/
[8]: /getting_started/site/
[9]: https://console.cloud.google.com/logs/viewer
[10]: https://docs.datadoghq.com/integrations/google_cloud_pubsub/
[11]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
