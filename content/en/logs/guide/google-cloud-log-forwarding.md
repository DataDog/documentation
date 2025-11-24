---
title: Google Cloud Log Forwarding Setup
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

#### Prerequisite permissions

{{% google-cloud-logging-setup-permissions %}}

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

#### Prerequisite permissions

{{% google-cloud-logging-setup-permissions %}}

#### Instructions

{{< tabs >}}
{{% tab "Datadog UI-based setup" %}}

1. In the [Google Cloud integration tile][200], select the **Log Collection** tab.
1. Select **Terraform**.
1. In the **Select Projects** section, select the folders and projects to forward logs from. If you select a folder, logs are forwarded from all of its child projects.
   **Note**: Only folders and projects that you have the necessary access and permissions for appear in this section. Likewise, folders and projects without a display name do not appear.
1. In the **Dataflow Job Configuration** section, specify configuration options for the Dataflow job:
   - Select deployment settings (Google Cloud region and project to host the created resources---Pub/Sub topics and subscriptions, a log routing sink, a Secret Manager entry, a service account, a Cloud Storage bucket, and a Dataflow job)
   - Select scaling settings (maximum workers)
   - Select performance settings (maximum number of parallel requests and batch size)
   - Select execution options (Streaming Engine is enabled by default; read more about its [benefits][201])
1. In the **Advanced Configuration** section, optionally specify the machine type for your Dataflow worker VMs. If no machine type is selected, Dataflow automatically chooses an appropriate machine type based on your job requirements. 
1. Optionally, choose to specify inclusion and exclusion filters using Google Cloud's [logging query language][203].


[200]: https://app.datadoghq.com/integrations/gcp
[201]: https://docs.cloud.google.com/dataflow/docs/streaming-engine#benefits
[202]: https://docs.cloud.google.com/dataflow/docs/guides/enable-dataflow-prime
[203]: https://cloud.google.com/logging/docs/view/logging-query-language
{{% /tab %}}

{{% tab "Manual setup with Terraform module" %}}

See the instructions on the [`terraform-gcp-datadog-integration`][300] repo to set up and manage the necessary infrastructure through Terraform.

[300]: https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration?tab=readme-ov-file#log-collection-integration---google-cloud-platform-to-datadog
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Manual" level="h4" id="manual-logging-setup" %}}

The instructions in this section guide you through the process of:

1. Creating a Pub/Sub [topic][401] and [pull subscription][402] to receive logs from a configured log sink
2. Creating a custom Dataflow worker service account to provide [least privilege][403] to your Dataflow pipeline workers
3. Creating a [log sink][404] to publish logs to the Pub/Sub topic
4. Creating a Dataflow job using the [Datadog template][400] to stream logs from the Pub/Sub subscription to Datadog

You have full control over which logs are sent to Datadog through the logging filters you create in the log sink, including GCE and GKE logs. See Google's [Logging query language page][405] for information about writing filters. For a detailed examination of the created architecture, see [Stream logs from Google Cloud to Datadog][406] in the Cloud Architecture Center.

**Note**: You must enable the **Dataflow API** to use Google Cloud Dataflow. See [Enabling APIs][407] in the Google Cloud documentation for more information.

To collect logs from applications running in GCE or GKE, you can also use the [Datadog Agent][408].

#### 1. Create a Cloud Pub/Sub topic and subscription

1. Go to the [Cloud Pub/Sub console][409] and create a new topic. Select the option **Add a default subscription** to simplify the setup.

   **Note**: You can also manually configure a [Cloud Pub/Sub subscription][410] with the **Pull** delivery type. If you manually create your Pub/Sub subscription, leave the `Enable dead lettering` box **unchecked**. For more details, see [Unsupported Pub/Sub features][411].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="The Create a topic page in the Google Cloud Console with the Add a default subscription checkbox selected" style="width:80%;">}}

2. Give that topic an explicit name such as `export-logs-to-datadog` and click **Create**.

3. Create an additional topic and default subscription to handle any log messages rejected by the Datadog API. The name of this topic is used within the Datadog Dataflow template as part of the path configuration for the `outputDeadletterTopic` [template parameter][412]. When you have inspected and corrected any issues in the failed messages, send them back to the original `export-logs-to-datadog` topic by running a [Pub/Sub to Pub/Sub template][413] job.

4. Datadog recommends creating a secret in [Secret Manager][414] with your valid Datadog API key value, for later use in the Datadog Dataflow template.

**Warning**: Cloud Pub/Subs are subject to [Google Cloud quotas and limitations][415]. If the number of logs you have exceeds those limitations, Datadog recommends you split your logs over several topics. See [the Monitor the Pub/Sub Log Forwarding section](#monitor-the-cloud-pubsub-log-forwarding) for information on setting up monitor notifications if you approach those limits.

#### 2. Create a custom Dataflow worker service account

The default behavior for Dataflow pipeline workers is to use your project's [Compute Engine default service account][416], which grants permissions to all resources in the project. If you are forwarding logs from a **Production** environment, you should instead create a custom worker service account with only the necessary roles and permissions, and assign this service account to your Dataflow pipeline workers.

1. Go to the [Service Accounts][417] page in the Google Cloud console and select your project.
2. Click **CREATE SERVICE ACCOUNT** and give the service account a descriptive name. Click **CREATE AND CONTINUE**.
3. Add the roles in the required permissions table and click **DONE**.

##### Required permissions

[Dataflow Admin][418]
: `roles/dataflow.admin` <br> Allow this service account to perform Dataflow administrative tasks.

[Dataflow Worker][419]
: `roles/dataflow.worker` <br> Allow this service account to perform Dataflow job operations.

[Pub/Sub Viewer][420]
: `roles/pubsub.viewer` <br> Allow this service account to view messages from the Pub/Sub subscription with your Google Cloud logs.

[Pub/Sub Subscriber][421]
: `roles/pubsub.subscriber` <br> Allow this service account to consume messages from the Pub/Sub subscription with your Google Cloud logs.

[Pub/Sub Publisher][422]
: `roles/pubsub.publisher`<br> Allow this service account to publish failed messages to a separate subscription, which allows for analysis or resending the logs.

[Secret Manager Secret Accessor][423]
: `roles/secretmanager.secretAccessor` <br> Allow this service account to access the Datadog API key in Secret Manager.

[Storage Object Admin][424]
: `roles/storage.objectAdmin`<br> Allow this service account to read and write to the Cloud Storage bucket specified for staging files.

**Note**: If you don't create a custom service account for the Dataflow pipeline workers, ensure that the default Compute Engine service account has the required permissions above.

#### 3. Export logs from Google Cloud Pub/Sub topic

1. Go to [the Logs Explorer page][425] in the Google Cloud console.
2. From the **Log Router** tab, select **Create Sink**.
3. Provide a name for the sink.
4. Choose _Cloud Pub/Sub_ as the destination and select the Cloud Pub/Sub topic that was created for that purpose. **Note**: The Cloud Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

5. Choose the logs you want to include in the sink with an optional inclusion or exclusion filter. You can filter the logs with a search query, or use the [sample function][426]. For example, to include only 10% of the logs with a `severity` level of `ERROR`, create an inclusion filter with `severity="ERROR" AND sample(insertId, 0.1)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="The inclusion filter for a Google Cloud logging sink with a query of severity=ERROR and sample(insertId, 0.1)" >}}

6. Click **Create Sink**.

**Note**: It is possible to create several exports from Google Cloud Logging to the same Cloud Pub/Sub topic with different sinks.

#### 4. Create and run the Dataflow job

1. Go to the [Create job from template][427] page in the Google Cloud console.
2. Give the job a name and select a Dataflow regional endpoint.
3. Select `Pub/Sub to Datadog` in the **Dataflow template** dropdown, and the **Required parameters** section appears.
   a. Select the input subscription in the **Pub/Sub input subscription** dropdown.
   b. Enter the following in the **Datadog Logs API URL** field:
   <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

   **Note**: Ensure that the Datadog site selector on the right of the page is set to your [Datadog site][428] before copying the URL above.

   c. Select the topic created to receive message failures in the **Output deadletter Pub/Sub topic** dropdown.
   d. Specify a path for temporary files in your storage bucket in the **Temporary location** field.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Required parameters in the Datadog Dataflow template" style="width:80%;">}}

4. Under **Optional Parameters**, check `Include full Pub/Sub message in the payload`.

5. If you created a secret in Secret Manager with your Datadog API key value as mentioned in [step 1](#1-create-a-cloud-pubsub-topic-and-subscription), enter the **resource name** of the secret in the **Google Cloud Secret Manager ID** field.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Optional parameters in the Datadog Dataflow template with Google Cloud Secret Manager ID and Source of the API key passed fields both highlighted" style="width:80%;">}}

See [Template parameters][412] in the Dataflow template for details on using the other available options:

   - `apiKeySource=KMS` with `apiKeyKMSEncryptionKey` set to your [Cloud KMS][429] key ID and `apiKey` set to the encrypted API key
   - **Not recommended**: `apiKeySource=PLAINTEXT` with `apiKey` set to the plaintext API key

6. If you created a custom worker service account, select it in the **Service account email** dropdown.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Optional parameters in the Datadog Dataflow template with the service account email dropdown highlighted" style="width:80%;">}}

7. Click **RUN JOB**.

**Note**: If you have a shared VPC, see the [Specify a network and subnetwork][430] page in the Dataflow documentation for guidelines on specifying the `Network` and `Subnetwork` parameters.

[400]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[401]: https://cloud.google.com/pubsub/docs/create-topic
[402]: https://cloud.google.com/pubsub/docs/create-subscription
[403]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[404]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[405]: https://cloud.google.com/logging/docs/view/logging-query-language
[406]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[407]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[408]: https://docs.datadoghq.com/agent/
[409]: https://console.cloud.google.com/cloudpubsub/topicList
[410]: https://console.cloud.google.com/cloudpubsub/subscription/
[411]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[412]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[413]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[414]: https://console.cloud.google.com/security/secret-manager
[415]: https://cloud.google.com/pubsub/quotas#quotas
[416]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[417]: https://console.cloud.google.com/iam-admin/serviceaccounts
[418]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[419]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[420]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[421]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[422]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[423]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[424]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[425]: https://console.cloud.google.com/logs/viewer
[426]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[427]: https://console.cloud.google.com/dataflow/createjob
[428]: https://docs.datadoghq.com/getting_started/site/
[429]: https://cloud.google.com/kms/docs
[430]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
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
