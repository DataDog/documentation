---
title: Google Cloud Log Forwarding Setup
aliases:
- 
further_reading:
- link: "https://www.datadoghq.com/blog/stream-logs-datadog-dataflow-template/"
  tag: "Blog"
  text: "Stream your Google Cloud logs to Datadog with Dataflow"
---

## Overview

Forwarding logs from your Google Cloud environment enables near real-time monitoring of the resources and activities taking place in your organization or folder. You can set up [log monitors][5] to be notified of issues, use [Cloud SIEM][6] to detect threats, or leverage [Watchdog][7] to identify unknown issues or anomalous behavior.

Logs are forwarded by [Google Cloud Dataflow][4] using the [Datadog Dataflow template][3]. This approach offers batching and compression of your log events before forwarding them to Datadog, which is the most network-efficient way to forward your logs. You can specify which logs are forwarded with inclusion and exclusion filters.

### Setup

{{% collapse-content title="Quick Start (recommended)" level="h4" id="quick-start-log-setup" %}}
#### Choose the Quick Start setup method if…

- You are setting up log forwarding from Google Cloud for the first time.
- You prefer a UI-based workflow and want to minimize the time it takes to create and configure the necessary resources.
- You want to automate setup steps in scripts or CI/CD pipelines.

#### Instructions

1. In the [Google Cloud integration tile][100], select the **Log Collection** tab.
1. Select **Quick Start**. A setup script, configured with your Datadog credentials and site, is automatically generated.
1. Copy the setup script. You can choose to run the script locally, or in Google Cloud Shell:
   - Running the script locally may be faster, but requires that you have your Google Cloud credentials available and the [gcloud CLI][101] installed on your machine.
   - Click **Open Google Cloud Shell** to run the script in the [Google Cloud Shell][102].
1. After running the script, return to the Google Cloud integration tile.
1. In the **Select Projects** section, select the folders and projects to forward logs from. If you select a folder, logs are forwarded from all of its child projects.
   **Note**: Only folders and projects that you have the necessary access and permissions for appear in this section. Likewise, folders and projects without a display name do not appear.
1. In the **Dataflow Job Configuration** section, specify configuration options for the Dataflow job:
   - Select deployment settings (Google Cloud region and project to host the created resources---Pub/Sub topics and subscriptions, a log routing sink, a Secret Manager entry, a service account, a Cloud Storage bucket, and a Dataflow job)
   - Select scaling settings (number of workers and maximum workers)
   - Select performance settings (maximum number of parallel requests and batch size)
   - Select execution options
1. In the **Advanced Configuration** section, optionally specify the machine type for your Dataflow worker VMs. If no machine type is selected, Dataflow automatically chooses an appropriate machine type based on your job requirements. 
1. Optionally, choose to specify inclusion and exclusion filters using Google Cloud's [logging query language][105].
1. Review the steps to be executed in the **Complete Setup** section. If everything is satisfactory, click **Complete Setup**.


[100]: https://app.datadoghq.com/integrations/gcp
[101]: https://docs.cloud.google.com/sdk/docs/install
[102]: https://docs.cloud.google.com/shell/docs
[104]: https://docs.cloud.google.com/dataflow/docs/guides/enable-dataflow-prime
[105]: https://cloud.google.com/logging/docs/view/logging-query-language
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" id="terraform-log-setup" %}}
#### Choose the Terraform setup method if…

- You manage infrastructure as code and want to keep the Datadog Google Cloud integration under version control.
- You need to configure multiple folders or projects consistently with reusable provider blocks.
- You want a repeatable, auditable deployment process that fits into your Terraform-managed environment.

#### Instructions

1. In the [Google Cloud integration tile][200], select the **Log Collection** tab.
1. Select **Terraform**.
1. In the **Select Projects** section, select the folders and projects to forward logs from. If you select a folder, logs are forwarded from all of its child projects.
   **Note**: Only folders and projects that you have the necessary access and permissions for appear in this section. Likewise, folders and projects without a display name do not appear.
1. In the **Dataflow Job Configuration** section, specify configuration options for the Dataflow job:
   - Select deployment settings (Google Cloud region and project to host the created resources---Pub/Sub topics and subscriptions, a log routing sink, a Secret Manager entry, a service account, a Cloud Storage bucket, and a Dataflow job)
      **Note**: You cannot name the created resources---the script uses predefined names, so it can skip creation if it finds preexisting resources with the same name.
   - Select scaling settings (maximum workers)
   - Select performance settings (maximum number of parallel requests and batch size)
   - Select execution options (Streaming Engine is enabled by default; read more about its [benefits][201])
      **Note**: If you select to enable [Dataflow Prime][202], you cannot configure worker machine type in the **Advanced Configuration** section.
1. In the **Advanced Configuration** section, optionally specify the machine type for your Dataflow worker VMs. If no machine type is selected, Dataflow automatically chooses an appropriate machine type based on your job requirements. 
1. Optionally, choose to specify inclusion and exclusion filters using Google Cloud's [logging query language][203].


[200]: https://app.datadoghq.com/integrations/gcp
[201]: https://docs.cloud.google.com/dataflow/docs/streaming-engine#benefits
[202]: https://docs.cloud.google.com/dataflow/docs/guides/enable-dataflow-prime
[203]: https://cloud.google.com/logging/docs/view/logging-query-language
{{% /collapse-content %}}

{{% collapse-content title="Pub/Sub Push subscription (legacy; not recommended)" level="h4" id="pub-sub-push-logging-setup" %}}

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Collecting Google Cloud logs with a Pub/Sub Push subscription</a> is in the process of being **deprecated**.

The above documentation for the **Push** subscription is only maintained for troubleshooting or modifying legacy setups.

Datadog recommends instead using a **Pull** subscription with the Datadog Dataflow template, as described in the [Quick Start](#quick-start-log-setup) and [Terraform](#terraform-log-setup) setup sections.
{{% /collapse-content %}}

See the [Stream logs from Google Cloud to Datadog][1] guide in the Google Cloud architecture center for a more detailed explanation of the steps and architecture involved in log forwarding. For a deep dive into the benefits of the Pub/Sub to Datadog template, read [Stream your Google Cloud logs to Datadog with Dataflow][2] in the Datadog blog.

### Validation

New logging events delivered to the Cloud Pub/Sub topic appear in the [Datadog Log Explorer][8].

**Note**: You can use the [Google Cloud Pricing Calculator][9] to calculate potential costs.

### Monitor the Cloud Pub/Sub log forwarding

The [Google Cloud Pub/Sub integration][10] provides helpful metrics to monitor the status of the log forwarding:

   - `gcp.pubsub.subscription.num_undelivered_messages` for the number of messages pending delivery
   - `gcp.pubsub.subscription.oldest_unacked_message_age` for the age of the oldest unacknowledged message in a subscription

Use the metrics above with a [metric monitor][11] to receive alerts for the messages in your input and deadletter subscriptions.

### Monitor the Dataflow pipeline

Use Datadog's [Google Cloud Dataflow integration][12] to monitor all aspects of your Dataflow pipelines. You can see all your key Dataflow metrics on the out-of-the-box dashboard, enriched with contextual data such as information about the GCE instances running your Dataflow workloads, and your Pub/Sub throughput.

You can also use a preconfigured [Recommended Monitor][13] to set up notifications for increases in backlog time in your pipeline. For more information, read [Monitor your Dataflow pipelines with Datadog][14] in the Datadog blog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[2]: https://www.datadoghq.com/blog/stream-logs-datadog-dataflow-template/
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://cloud.google.com/dataflow
[5]: /monitors/types/log/
[6]: /security/cloud_siem/
[7]: /watchdog/
[8]: https://app.datadoghq.com/logs
[9]: https://cloud.google.com/products/calculator
[10]: /integrations/google-cloud-pubsub/
[11]: /monitors/types/metric/
[12]: /integrations/google-cloud-dataflow/
[13]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[14]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/