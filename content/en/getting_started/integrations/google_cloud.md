## Overview

Use this guide to get started monitoring your Google Cloud environment. This approach simplifies the setup for Google Cloud environments with multiple projects, allowing you to maximize your monitoring coverage.

{{% collapse-content title="See the full list of Google Cloud integrations" level="h4" %}}
<div class="alert alert-warning">
Datadog's Google Cloud integration collects <a href="https://cloud.google.com/monitoring/api/metrics_gcp">all Google Cloud metrics</a>. Datadog continually updates the docs to show every dependent integration, but the list of integrations is sometimes behind the latest cloud services metrics and services.

 If you don't see an integration for a specific Google Cloud service, reach out to <a href="https://www.datadoghq.com/support/">Datadog Support</a>.
</div>

| Integration                         | Description                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | PaaS (platform as a service) to build scalable applications                           |
| [BigQuery][2]                       | Enterprise data warehouse                                                             |
| [Bigtable][3]                       | NoSQL Big Data database service                                                       |
| [Cloud SQL][4]                      | MySQL database service                                                                |
| [Cloud APIs][5]                     | Programmatic interfaces for all Google Cloud Platform services                        |
| [Cloud Armor][6]                   | Network security service to help protect against denial-of-service and web attacks    |
| [Cloud Composer][7]                 | A fully managed workflow orchestration service                                        |
| [Cloud Dataproc][8]                 | A cloud service for running Apache Spark and Apache Hadoop clusters                   |
| [Cloud Dataflow][9]                | A fully-managed service for transforming and enriching data in stream and batch modes |
| [Cloud Filestore][10]                | High-performance, fully managed file storage                                          |
| [Cloud Firestore][11]                | A flexible, scalable database for mobile, web, and server development                 |
| [Cloud Interconnect][12]            | Hybrid connectivity                                                                   |
| [Cloud IoT][13]                     | Secure device connection and management                                               |
| [Cloud Load Balancing][14]          | Distribute load-balanced compute resources                                            |
| [Cloud Logging][15]                 | Real-time log management and analysis                                                 |
| [Cloud Memorystore for Redis][16]   | A fully managed in-memory data store service                                          |
| [Cloud Router][17]                  | Exchange routes between your VPC and on-premises networks by using BGP                |
| [Cloud Run][18]                     | Managed compute platform that runs stateless containers over HTTP                  |
| [Cloud Security Command Center][19] | Security Command Center is a threat reporting service                                |
| [Cloud Tasks][20]                   | Distributed task queues                                                               |
| [Cloud TPU][21]                     | Train and run machine learning models                                                 |
| [Compute Engine][22]                | High performance virtual machines                                                     |
| [Container Engine][23]              | Kubernetes, managed by Google                                                         |
| [Datastore][24]                     | NoSQL database                                                                        |
| [Firebase][25]                      | Mobile platform for application development                                           |
| [Functions][26]                     | Serverless platform for building event-based microservices                            |
| [Kubernetes Engine][27]             | Cluster manager and orchestration system                                              |
| [Machine Learning][28]              | Machine learning services                                                             |
| [Private Service Connect][29]       | Access managed services with private VPC connections                                  |
| [Pub/Sub][30]                       | Real-time messaging service                                                           |
| [Spanner][31]                       | Horizontally scalable, globally consistent, relational database service               |
| [Storage][32]                       | Unified object storage                                                                |
| [Vertex AI][33]                     | Build, train, and deploy custom machine learning (ML) models                          |
| [VPN][34]                           | Managed network functionality                                                         |
{{% /collapse-content %}}

## Setup

Set up Datadog's Google Cloud integration to collect metrics and logs from your Google Cloud services.

### Prerequisites

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. If your organization restricts identities by domain, you must add Datadog's customer identity as an allowed value in your policy. Datadog's customer identity: `C0147pk0i`

{{< /site-region >}}

{{< site-region region="gov" >}}

1. If your organization restricts identities by domain, you must add Datadog's customer identity as an allowed value in your policy. Datadog's customer identity: `C03lf3ewa`

{{< /site-region >}}

2. Ensure that any projects being monitored are not configured as [scoping projects][41] that pull in metrics from multiple other projects.

### Metric collection

{{< tabs >}}

{{% tab "Org-level" %}}

Organization-level (or folder-level) monitoring is recommended for comprehensive coverage of all projects, including any future projects that may be created in an org or folder.

**Note**: Your [Google Cloud Identity][408] user account must have the `Admin` role assigned to it at the desired scope to complete the setup in Google Cloud (for example, `Organization Admin`).

{{% collapse-content title="1. Create a Google Cloud service account in the default project" level="h5" %}}
1. Open your [Google Cloud console][401].
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Click **Create service account** at the top.
4. Give the service account a unique name.
5. Click **Done** to complete creating the service account.

[401]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="2. Add the service account at the organization or folder level" level="h5" %}}
1. In the Google Cloud console, go to the **IAM** page.
2. Select a folder or organization.
3. To grant a role to a principal that does not already have other roles on the resource, click **Grant Access**, then enter the email of the service account you created earlier.
4. Enter the service account's email address.
5. Assign the following roles:
  - [Compute Viewer][402] provides **read-only** access to get and list Compute Engine resources
  - [Monitoring Viewer][403] provides **read-only** access to the monitoring data availabile in your Google Cloud environment
  - [Cloud Asset Viewer][404] provides **read-only** access to cloud assets metadata
  - [Browser][405] provides **read-only** access to browse the hierarchy of a project
  - [Service Usage Consumer][406] (**optional**, for multi-project environments) provides [per-project cost and API quota attribution](#enable-per-project-cost-and-api-quota-attribution) after this feature has been enabled by Datadog support
6. Click **Save**.

**Note**: The `Browser` role is only required in the default project of the service account. Other projects require only the other listed roles.

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. Add the Datadog principal to your service account" level="h5" %}}
**Note**: If you previously configured access using a shared Datadog principal, you can revoke the permission for that principal after you complete these steps.

1. In Datadog, navigate to **Integrations** > [**Google Cloud Platform**][407].
2. Click **Add Google Cloud Account**.
If you have no configured projects, you are automatically redirected to this page.
3. Copy your Datadog principal and keep it for the next section.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="The page for adding a new Google Cloud account in Datadog's Google Cloud integration tile" style="width:70%;">}}

**Note**: Keep this window open for Section 4.

4. In the [Google Cloud console][409], under the **Service Accounts** menu, find the service account you created in Section 1.
5. Go to the **Permissions** tab and click **Grant Access**.

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud console interface, showing the Permissions tab under Service Accounts." style="width:70%;">}}

6. Paste your Datadog principal into the **New principals** text box.
7. Assign the role of **Service Account Token Creator**.
8. Click **Save**.

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Complete the integration setup in Datadog" level="h5" %}}
1. In your Google Cloud console, navigate to the **Service Account** > **Details** tab. On this page, find the email associated with this Google service account. It has the format `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`.
2. Copy this email.
3. Return to the integration configuration tile in Datadog (where you copied your Datadog principal in the previous section).
4. Paste the email you copied in **Add Service Account Email**.
5. Click **Verify and Save Account**.
{{% /collapse-content %}}

Metrics appear in Datadog approximately **15 minutes** after setup.

[408]: https://cloud.google.com/identity/docs/overview

{{% /tab %}}

{{% tab "Project- and Folder-level" %}}

{{% collapse-content title="Quick Start (recommended)" level="h4" expanded=false id="quickstart-setup" %}}

### Prerequisites

To use the Quick Start method, your Datadog user role must be able to create API and application keys. If you're using a [Datadog-managed role][202], you must have the **Datadog Admin role**. If you're using a [custom role][203], your role needs to have at least the `api_keys_write` and `user_app_keys` permissions.

### Choose this if...

- You are setting up the Google Cloud integration for the first time.
- You prefer a UI-based workflow, and want to minimize the time it takes to create a service account with the required monitoring permissions.
- You want to automate setup steps in scripts or CI/CD pipelines.

### Instructions

1. In the [Google Cloud integration page][200], select **+ Add GCP Account**.
2. Click **Quick Start**.
3. Click **Copy** in the setup script section.<br>
   **Note**: Datadog recommends running this script locally through the [gcloud CLI][201], as it may be faster. This requires having your Google Cloud credentials available locally, and the gcloud CLI installed on your machine.  
4. Click **Open Google Cloud Shell**, or go to [Google Cloud Shell][204].
5. Paste the script into the shell prompt and run it.
6. Select any folders and projects to be monitored. You can only see projects and folders that you have the required access and permissions for.
7. Under **Provide Service Account Details**:
   1. Give the service account a name.
   2. Select the project to contain the service account.
8. Configure **Metric Collection** (optional).
   1. Choose whether to disable the option for silencing monitors for expected GCE instance shutdowns and autoscaling events.
   2. Choose whether to apply tags to the metrics associated with the created service account.
   3. Choose whether to disable metric collection for specific Google Cloud services to help control Google Cloud Monitoring costs.
   4. Choose whether to filter metrics by tags for GCP resource types `Cloud Run Revision`, `VM Instance`, or `Cloud Function` to help control Datadog costs.
9. Choose whether to disable **Resource Collection** (attributes and configuration information of the resources in your Google Cloud environment, optional).
10. A summary of the changes to be made is displayed. If confirmed, the script:
   - Enables the required APIs
   - Assigns the necessary permissions to monitor each selected project and folder
   - Completes the integration setup in Datadog

[200]: https://app.datadoghq.com/integrations/google-cloud-platform
[201]: https://cloud.google.com/sdk/docs/install
[202]: https://docs.datadoghq.com/account_management/rbac/permissions/#managed-roles
[203]: https://docs.datadoghq.com/account_management/rbac/permissions/#custom-roles
[204]: https://ssh.cloud.google.com/cloudshell
{{% /collapse-content %}} 

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}

### Choose this if...

- You manage infrastructure as code and want to keep the Datadog Google Cloud integration under version control.
- You need to configure multiple folders or projects consistently with reusable provider blocks.
- You want a repeatable, auditable deployment process that fits into your Terraform-managed environment.

### Instructions

1. In the [Google Cloud integration page][500], select **+ Add GCP Account**.
2. Select **Terraform**.
3. Under **Provide GCP Resources**, add any project IDs and folder IDs to be monitored.
4. Select any folders and projects to be monitored.
5. Under **Provide Service Account Details**:
   1. Give the service account a name.
   2. Select the project to contain the service account.
6. Configure **Metric Collection** (optional).
   1. Choose whether to disable the option for silencing monitors for expected GCE instance shutdowns and autoscaling events.
   2. Choose whether to apply tags to the metrics associated with the created service account.
   3. Choose whether to disable metric collection for specific Google Cloud services to help control Google Cloud Monitoring costs.
   4. Choose whether to filter metrics by tags for GCP resource types `Cloud Run Revision`, `VM Intance`, or `Cloud Function` to help control Datadog costs.
7. Choose whether to disable **Resource Collection** (attributes and configuration information of the resources in your Google Cloud environment).
8. Copy the provided **Terraform Code**.
9. Paste the code into a `.tf` file, and run the **Initialize and apply the Terraform** command. If successful, the command:
   - Enables the required APIs
   - Assigns the necessary permissions to monitor each selected project and folder
   - Completes the integration setup in Datadog

[500]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}} 

{{% collapse-content title="Manual" level="h4" expanded=false id="manual-setup" %}}

### Choose this if...

- You need to set up access manually for a smaller number of projects or folders.
- You want more step-by-step control over assigning permissions and credentials within the Azure UI.

### Instructions

1. In the [Google Cloud integration page][600], select **+ Add GCP Account**.
2. Click **Manual**.
3. Copy the **Datadog Principal** value, and click **Open the Google Console**.
4. Create a service account:
   1. Give the service account a descriptive name, and click **Create and continue**.
   2. Under **Permissions**, search for and add the **Service Account Token Creator** role from the dropdown, and click **Continue**.
   3. Under **Principals with access**, paste the **Datadog Principal** value into the **Service account users role** field, and click **Done**.
5. Click the service account link under the **Email** column
6. Copy the **Email** value.
7. In Datadog, paste the service account email in the **Add Service Account Email** section.
8. Configure **Metric Collection** (optional).
   1. Choose whether to disable the option for silencing monitors for expected GCE instance shutdowns and autoscaling events.
   2. Choose whether to apply tags to the metrics associated with the created service account.
   3. Choose whether to disable metric collection for specific Google Cloud services to help control Google Cloud Monitoring costs.
   4. Choose whether to filter metrics by tags for GCP resource types `Cloud Run Revision`, `VM Intance`, or `Cloud Function` to help control Datadog costs.
9. Choose whether to disable **Resource Collection** (attributes and configuration information of the resources in your Google Cloud environment, optional).
10. Click **Verify and Save Account**.

[600]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}} 

{{% /tab %}}

{{< /tabs >}}

#### Validation

To view your metrics, use the left menu to navigate to **Metrics** > **Summary** and search for `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="The Metric Summary page in Datadog filtered to metrics beginning with GCP" style="width:100%;" >}}

#### Configuration

{{% collapse-content title="Limit metric collection by metric namespace" level="h5" %}}

Optionally, you can choose which Google Cloud services you monitor with Datadog. Configuring metrics collection for specific Google services lets you optimize your Google Cloud Monitoring API costs, while retaining visibility into your critical services.

Under the **Metric Collection** tab in Datadog's [Google Cloud integration page][43], unselect the metric namespaces to exclude. You can also choose to disable collection of all existing metric namespaces.

**Note**: This selection does not apply to metric namespaces added to this list in the future. When a metric namespace is added to this list, it is enabled by default.

{{< img src="integrations/google_cloud_platform/limit_metric_namespaces.png" alt="The metric collection tab in the Datadog Google Cloud integration page" style="width:80%;">}}
{{% /collapse-content %}}

{{% collapse-content title="Limit metric collection by tag" level="h5" %}}

By default, you see all your Google Compute Engine (GCE) instances in Datadog's infrastructure overview. Datadog automatically tags them with GCE host tags and any GCE labels you may have added.

Optionally, you can use tags to limit the instances that are pulled into Datadog. Under a project's **Metric Collection** tab, enter the tags in the **Limit Metric Collection Filters** textbox. Only hosts that match one of the defined tags are imported into Datadog. You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. This example includes all `c1*` sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's [Organize resources using labels][56] page for more details.

{{% /collapse-content %}}

#### Best practices for monitoring multiple projects

##### Enable per-project cost and API quota attribution

By default, Google Cloud attributes the cost of monitoring API calls, as well as API quota usage, to the project containing the service account for this integration. As a best practice for Google Cloud environments with multiple projects, enable per-project cost attribution of monitoring API calls and API quota usage. With this enabled, costs and quota usage are attributed to the project being *queried*, rather than the project containing the service account. This provides visibility into the monitoring costs incurred by each project, and also helps to prevent reaching API rate limits.

To enable this feature:
1. Ensure that the Datadog service account has the [Service Usage Consumer][410] role at the desired scope (folder or organization).
2. Click the **Enable Per Project Quota** toggle in the **Projects** tab of the [Google Cloud integration page][411].

[410]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[411]: https://app.datadoghq.com/integrations/google-cloud-platform/

#### Leveraging the Datadog Agent

Use the [Datadog Agent][77] to collect the [most granular, low-latency metrics][42] from your infrastructure. Install the Agent on any host, including [GKE][44], to get deeper insights from the [traces][46] and [logs][47] it can collect. For more information, see [Why should I install the Datadog Agent on my cloud instances?][48]

## Log collection

<!-- xxx tabs xxx -->
<!-- xxx tab "Dataflow Method (Recommended)" xxx -->

Forward logs from your Google Cloud services to Datadog using [Google Cloud Dataflow][67] and the [Datadog template][68]. This method provides both compression and batching of events before forwarding to Datadog.

You can use the [terraform-gcp-datadog-integration][991] module to manage this infrastructure through Terraform, or follow the instructions in this section to:

1. Create a Pub/Sub [topic][70] and [pull subscription][71] to receive logs from a configured log sink
2. Create a custom Dataflow worker service account to provide [least privilege][72] to your Dataflow pipeline workers
3. Create a [log sink][73] to publish logs to the Pub/Sub topic
4. Create a Dataflow job using the [Datadog template][68] to stream logs from the Pub/Sub subscription to Datadog

You have full control over which logs are sent to Datadog through the logging filters you create in the log sink, including GCE and GKE logs. See Google's [Logging query language page][74] for information about writing filters. For a detailed examination of the created architecture, see [Stream logs from Google Cloud to Datadog][9986] in the Cloud Architecture Center.

**Note**: You must enable the **Dataflow API** to use Google Cloud Dataflow. See [Enabling APIs][76] in the Google Cloud documentation for more information.

To collect logs from applications running in GCE or GKE, you can also use the [Datadog Agent][77].

#### 1. Create a Cloud Pub/Sub topic and subscription

1. Go to the [Cloud Pub/Sub console][78] and create a new topic. Select the option **Add a default subscription** to simplify the setup.

   **Note**: You can also manually configure a [Cloud Pub/Sub subscription][79] with the **Pull** delivery type. If you manually create your Pub/Sub subscription, leave the `Enable dead lettering` box **unchecked**. For more details, see [Unsupported Pub/Sub features][80].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="The Create a topic page in the Google Cloud Console with the Add a default subscription checkbox selected" style="width:80%;">}}

2. Give that topic an explicit name such as `export-logs-to-datadog` and click **Create**.

3. Create an additional topic and default subscription to handle any log messages rejected by the Datadog API. The name of this topic is used within the Datadog Dataflow template as part of the path configuration for the `outputDeadletterTopic` [template parameter][81]. When you have inspected and corrected any issues in the failed messages, send them back to the original `export-logs-to-datadog` topic by running a [Pub/Sub to Pub/Sub template][82] job.

4. Datadog recommends creating a secret in [Secret Manager][83] with your valid Datadog API key value, for later use in the Datadog Dataflow template.

**Warning**: Cloud Pub/Subs are subject to [Google Cloud quotas and limitations][84]. If the number of logs you have exceeds those limitations, Datadog recommends you split your logs over several topics. See [the Monitor the Pub/Sub Log Forwarding section](#monitor-the-cloud-pubsub-log-forwarding) for information on setting up monitor notifications if you approach those limits.

#### 2. Create a custom Dataflow worker service account

The default behavior for Dataflow pipeline workers is to use your project's [Compute Engine default service account][85], which grants permissions to all resources in the project. If you are forwarding logs from a **Production** environment, you should instead create a custom worker service account with only the necessary roles and permissions, and assign this service account to your Dataflow pipeline workers.

1. Go to the [Service Accounts][86] page in the Google Cloud console and select your project.
2. Click **CREATE SERVICE ACCOUNT** and give the service account a descriptive name. Click **CREATE AND CONTINUE**.
3. Add the roles in the required permissions table and click **DONE**.

##### Required permissions

[Dataflow Admin][87]
: `roles/dataflow.admin` <br> Allow this service account to perform Dataflow administrative tasks.

[Dataflow Worker][88]
: `roles/dataflow.worker` <br> Allow this service account to perform Dataflow job operations.

[Pub/Sub Viewer][89]
: `roles/pubsub.viewer` <br> Allow this service account to view messages from the Pub/Sub subscription with your Google Cloud logs.

[Pub/Sub Subscriber][90]
: `roles/pubsub.subscriber` <br> Allow this service account to consume messages from the Pub/Sub subscription with your Google Cloud logs.

[Pub/Sub Publisher][91]
: `roles/pubsub.publisher`<br> Allow this service account to publish failed messages to a separate subscription, which allows for analysis or resending the logs.

[Secret Manager Secret Accessor][92]
: `roles/secretmanager.secretAccessor` <br> Allow this service account to access the Datadog API key in Secret Manager.

[Storage Object Admin][93]
: `roles/storage.objectAdmin`<br> Allow this service account to read and write to the Cloud Storage bucket specified for staging files.

**Note**: If you don't create a custom service account for the Dataflow pipeline workers, ensure that the default Compute Engine service account has the required permissions above.

#### 3. Export logs from Google Cloud Pub/Sub topic

1. Go to [the Logs Explorer page][94] in the Google Cloud console.
2. From the **Log Router** tab, select **Create Sink**.
3. Provide a name for the sink.
4. Choose _Cloud Pub/Sub_ as the destination and select the Cloud Pub/Sub topic that was created for that purpose. **Note**: The Cloud Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

5. Choose the logs you want to include in the sink with an optional inclusion or exclusion filter. You can filter the logs with a search query, or use the [sample function][95]. For example, to include only 10% of the logs with a `severity` level of `ERROR`, create an inclusion filter with `severity="ERROR" AND sample(insertId, 0.1)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="The inclusion filter for a Google Cloud logging sink with a query of severity=ERROR and sample(insertId, 0.1)" >}}

6. Click **Create Sink**.

**Note**: It is possible to create several exports from Google Cloud Logging to the same Cloud Pub/Sub topic with different sinks.

#### 4. Create and run the Dataflow job

1. Go to the [Create job from template][96] page in the Google Cloud console.
2. Give the job a name and select a Dataflow regional endpoint.
3. Select `Pub/Sub to Datadog` in the **Dataflow template** dropdown, and the **Required parameters** section appears.
   a. Select the input subscription in the **Pub/Sub input subscription** dropdown.
   b. Enter the following in the **Datadog Logs API URL** field:
   <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

   **Note**: Ensure that the Datadog site selector on the right of the page is set to your [Datadog site][97] before copying the URL above.

   c. Select the topic created to receive message failures in the **Output deadletter Pub/Sub topic** dropdown.
   d. Specify a path for temporary files in your storage bucket in the **Temporary location** field.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Required parameters in the Datadog Dataflow template" style="width:80%;">}}

4. Under **Optional Parameters**, check `Include full Pub/Sub message in the payload`.

5. If you created a secret in Secret Manager with your Datadog API key value as mentioned in [step 1](#1-create-a-cloud-pubsub-topic-and-subscription), enter the **resource name** of the secret in the **Google Cloud Secret Manager ID** field.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Optional parameters in the Datadog Dataflow template with Google Cloud Secret Manager ID and Source of the API key passed fields both highlighted" style="width:80%;">}}

See [Template parameters][81] in the Dataflow template for details on using the other available options:

   - `apiKeySource=KMS` with `apiKeyKMSEncryptionKey` set to your [Cloud KMS][98] key ID and `apiKey` set to the encrypted API key
   - **Not recommended**: `apiKeySource=PLAINTEXT` with `apiKey` set to the plaintext API key

6. If you created a custom worker service account, select it in the **Service account email** dropdown.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Optional parameters in the Datadog Dataflow template with the service account email dropdown highlighted" style="width:80%;">}}

7. Click **RUN JOB**.

**Note**: If you have a shared VPC, see the [Specify a network and subnetwork][99] page in the Dataflow documentation for guidelines on specifying the `Network` and `Subnetwork` parameters.

#### Validation

New logging events delivered to the Cloud Pub/Sub topic appear in the [Datadog Log Explorer][100].

**Note**: You can use the [Google Cloud Pricing Calculator][101] to calculate potential costs.

#### Monitor the Cloud Pub/Sub log forwarding

The [Google Cloud Pub/Sub integration][30] provides helpful metrics to monitor the status of the log forwarding:

   - `gcp.pubsub.subscription.num_undelivered_messages` for the number of messages pending delivery
   - `gcp.pubsub.subscription.oldest_unacked_message_age` for the age of the oldest unacknowledged message in a subscription

Use the metrics above with a [metric monitor][102] to receive alerts for the messages in your input and deadletter subscriptions.

#### Monitor the Dataflow pipeline

Use Datadog's [Google Cloud Dataflow integration][9] to monitor all aspects of your Dataflow pipelines. You can see all your key Dataflow metrics on the out-of-the-box dashboard, enriched with contextual data such as information about the GCE instances running your Dataflow workloads, and your Pub/Sub throughput.

You can also use a preconfigured [Recommended Monitor][103] to set up notifications for increases in backlog time in your pipeline. For more information, read [Monitor your Dataflow pipelines with Datadog][104] in the Datadog blog.

[991]: https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration
[999]: https://docs.datadoghq.com/integrations/google-cloud-dataflow/
[9924]: https://docs.datadoghq.com/integrations/google-cloud-pubsub/
[9929]: https://cloud.google.com/dataflow
[9930]: https://docs.datadoghq.com/integrations/google-cloud-pubsub/
[9931]: https://cloud.google.com/pubsub/docs/create-subscription
[9932]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[9933]: https://cloud.google.com/logging/docs/view/logging-query-language
[9934]: https://console.cloud.google.com/dataflow/createjob
[9935]: https://console.cloud.google.com/cloudpubsub/topicList
[9936]: https://docs.datadoghq.com/agent/
[9937]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[9939]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[9943]: https://cloud.google.com/dataflow
[9944]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[9945]: https://cloud.google.com/pubsub/docs/create-topic
[9946]: https://cloud.google.com/pubsub/docs/create-subscription
[9947]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[9948]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[9949]: https://cloud.google.com/logging/docs/view/logging-query-language
[9950]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[9951]: https://docs.datadoghq.com/agent/
[9952]: https://console.cloud.google.com/cloudpubsub/topicList
[9953]: https://console.cloud.google.com/cloudpubsub/subscription/
[9954]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[9955]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[9956]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[9957]: https://console.cloud.google.com/security/secret-manager
[9958]: https://cloud.google.com/pubsub/quotas#quotas
[9959]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[9960]: https://console.cloud.google.com/iam-admin/serviceaccounts
[9961]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[9962]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[9963]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[9964]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[9965]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[9966]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[9967]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[9968]: https://console.cloud.google.com/logs/viewer
[9969]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[9970]: https://console.cloud.google.com/dataflow/createjob
[9971]: https://cloud.google.com/kms/docs
[9972]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[9973]: /logs
[9974]: https://cloud.google.com/products/calculator
[9975]: https://docs.datadoghq.com/monitors/types/metric/
[9976]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[9977]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[9978]: https://console.cloud.google.com/iam-admin/serviceaccounts
[9979]: https://cloud.google.com/kms/docs
[9980]: https://console.cloud.google.com/cloudpubsub/subscription/
[9984]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[9985]: https://docs.datadoghq.com/monitors/types/metric/
[9986]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog

<!-- xxz tab xxx -->
<!-- xxx tab "Pub/Sub Push Method (Legacy)" xxx -->

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Collecting Google Cloud logs with a Pub/Sub Push subscription</a> is in the process of being **deprecated**.

The above documentation for the **Push** subscription is only maintained for troubleshooting or modifying legacy setups.

Use a **Pull** subscription with the Datadog Dataflow template as described under [Dataflow Method][105] to forward your Google Cloud logs to Datadog instead.

[9898]: http://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

## Expanded BigQuery monitoring

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Join the Preview!" >}}
   Expanded BigQuery monitoring is in Preview. Use this form to sign up to start gaining insights into your query performance.
{{< /callout >}}

Expanded BigQuery monitoring provides granular visibility into your BigQuery environments.

### BigQuery jobs performance monitoring

To monitor the performance of your BigQuery jobs, grant the [BigQuery Resource Viewer][60] role to the Datadog service account for each Google Cloud project.

**Notes**:
   - You need to have verified your Google Cloud service account in Datadog, as outlined in the [setup section](#setup).
   - You do **not** need to set up Dataflow to collect logs for expanded BigQuery monitoring.

1. In the Google Cloud console, go to the [IAM page][61].
2. Click **Grant access**.
3. Enter the email of your service account in **New principals**.
4. Assign the [BigQuery Resource Viewer][60] role.
5. Click **SAVE**.
6. In Datadog's [Google Cloud integration page][59], click into the **BigQuery** tab.
7. Click the **Enable Query Performance** toggle.

### BigQuery data quality monitoring

BigQuery data quality monitoring provides quality metrics from your BigQuery tables (such as freshness and updates to row count and size). Explore the data from your tables in depth on the [Data Quality Monitoring page][62].

To collect quality metrics, grant the [BigQuery Metadata Viewer][63] role to the Datadog Service Account for each BigQuery table you are using.

**Note**: BigQuery Metadata Viewer can be applied at a BigQuery table, dataset, project, or organization level.
   - For Data Quality Monitoring of all tables within a dataset, grant access at the dataset level.
   - For Data Quality Monitoring of all datasets within a project, grant access at the project level.

1. Navigate to [BigQuery][64].
2. In the Explorer, search for the desired BigQuery resource.
3. Click the three-dot menu next to the resource, then click **Share -> Manage Permissions**.

{{< img src="integrations/google_cloud_platform/bigquery_manage_permissions.png" alt="The Manage Permissions menu option of a BigQuery dataset resource" style="width:80%;">}}

4. Click **ADD PRINCIPAL**.
5. In the new principals box, enter the Datadog service account set up for the Google Cloud integration.
6. Assign the [BigQuery Metadata Viewer][63] role.
7. Click **SAVE**.
8. In Datadog's [Google Cloud integration page][59], click into the **BigQuery** tab.
9. Click the **Enable Data Quality** toggle.

### BigQuery jobs log retention

Datadog recommends setting up a new [logs index][65] called `data-observability-queries`, and indexing your BigQuery job logs for 15 days. Use the following index filter to pull in the logs:

```bash
service:data-observability @platform:*
```

See the [Log Management pricing page][66] for cost estimation.

## Resource changes collection

{{< callout url="https://www.datadoghq.com/private-beta/recent-changes-tab/" >}}
  <strong>Resource changes collection</strong> is in Preview! To request access, use the attached form.
{{< /callout >}}

Select **Enable Resource Collection** in the [Resource Collection tab][106] of the Google Cloud integration page. This allows you to receive resource events in Datadog when Google's [Cloud Asset Inventory][107] detects changes in your cloud resources.

Then, follow the steps below to forward change events from a Pub/Sub topic to the Datadog [Event Explorer][108].

{{% collapse-content title="Google Cloud CLI" level="h4" %}}
### Create a Cloud Pub/Sub topic and subscription

#### Create a topic

1. In the [Google Cloud Pub/Sub topics page][78], click **CREATE TOPIC**.
2. Give the topic a descriptive name.
3. **Uncheck** the option to add a default subscription.
4. Click **CREATE**.

#### Create a subscription

1. In the [Google Cloud Pub/Sub subscriptions page][79], click **CREATE SUBSCRIPTION**.
2. Enter `export-asset-changes-to-datadog` for the subscription name.
3. Select the Cloud Pub/Sub topic previously created.
4. Select **Pull** as the delivery type.
5. Click **CREATE**.

### Grant access

To read from this Pub/Sub subscription, the Google Cloud service account used by the integration needs the `pubsub.subscriptions.consume` permission for the subscription. A default role with minimal permissions that allows this is the **Pub/Sub subscriber** role. Follow the steps below to grant this role:

1. In the [Google Cloud Pub/Sub subscriptions page][79], click the `export-asset-changes-to-datadog` subscription.
2. In the **info panel** on the right of the page, click the **Permissions** tab. If you don't see the info panel, click **SHOW INFO PANEL**.
3. Click **ADD PRINCIPAL**.
4. Enter the **service account email** used by the Datadog Google Cloud integration. You can find your service accounts listed on the left of the **Configuration** tab in the [Google Cloud integration page][59] in Datadog.

### Create an asset feed

Run the command below in [Cloud Shell][109] or the [gcloud CLI][110] to create a Cloud Asset Inventory Feed that sends change events to the Pub/Sub topic created above.

<!-- xxx tabs xxx -->

<!-- xxx tab "Project" xxx -->

```bash
gcloud asset feeds create <FEED_NAME>
--project=<PROJECT_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Update the placeholder values as indicated:

   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<PROJECT_ID>`: Your Google Cloud project ID.
   - `<TOPIC_NAME>`: The name of the Pub/Sub topic linked with the `export-asset-changes-to-datadog` subscription.
   - `<ASSET_NAMES>`: Comma-separated list of resource [full names][111] to receive change events from. **Optional** if specifying `asset-types`.
   - `<ASSET_TYPES>`: Comma-separated list of [asset types][112] to receive change events from. **Optional** if specifying `asset-names`.
   - `<CONTENT_TYPE>`: **Optional** asset [content type][113] to receive change events from.

[9790]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[9791]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[9792]: https://cloud.google.com/asset-inventory/docs/overview#content_types
<!-- xxz tab xxx -->
<!-- xxx tab "Folder" xxx -->
```bash
gcloud asset feeds create <FEED_NAME>
--folder=<FOLDER_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Update the placeholder values as indicated:

   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<FOLDER_ID>`: Your Google Cloud folder ID.
   - `<TOPIC_NAME>`: The name of the Pub/Sub topic linked with the `export-asset-changes-to-datadog` subscription.
   - `<ASSET_NAMES>`: Comma-separated list of resource [full names][111] to receive change events from. **Optional** if specifying `asset-types`.
   - `<ASSET_TYPES>`: Comma-separated list of [asset types][112] to receive change events from. **Optional** if specifying `asset-names`.
   - `<CONTENT_TYPE>`: **Optional** asset [content type][113] to receive change events from.

[9690]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[9691]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[9692]: https://cloud.google.com/asset-inventory/docs/overview#content_types

<!-- xxz tab xxx -->

<!-- xxx tab "Organization" xxx -->

```bash
gcloud asset feeds create <FEED_NAME>
--organization=<ORGANIZATION_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Update the placeholder values as indicated:

   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<ORGANIZATION_ID>`: Your Google Cloud organization ID.
   - `<TOPIC_NAME>`: The name of the Pub/Sub topic linked with the `export-asset-changes-to-datadog` subscription.
   - `<ASSET_NAMES>`: Comma-separated list of resource [full names][111] to receive change events from. **Optional** if specifying `asset-types`.
   - `<ASSET_TYPES>`: Comma-separated list of [asset types][112] to receive change events from. **Optional** if specifying `asset-names`.
   - `<CONTENT_TYPE>`: **Optional** asset [content type][113] to receive change events from.

[9590]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[9591]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[9592]: https://cloud.google.com/asset-inventory/docs/overview#content_types

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" %}}
### Create an asset feed

Copy the following Terraform template and substitute the necessary arguments:

<!-- xxx tabs xxx -->
<!-- xxx tab "Project" xxx -->

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_project_feed" "project_feed" {
  project      = local.project_id
  feed_id      = "<FEED_NAME>"
  content_type = "<CONTENT_TYPE>" # Optional. Remove if unused.

  asset_names = ["<ASSET_NAMES>"] # Optional if specifying asset_types. Remove if unused.
  asset_types = ["<ASSET_TYPES>"] # Optional if specifying asset_names. Remove if unused.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Update the placeholder values as indicated:

   - `<PROJECT_ID>`: Your Google Cloud project ID.
   - `<TOPIC_NAME>`: The name of the Pub/Sub topic to be linked with the `export-asset-changes-to-datadog` subscription.
   - `<SERVICE_ACCOUNT_EMAIL>`: The service account email used by the Datadog Google Cloud integration.
   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<ASSET_NAMES>`: Comma-separated list of resource [full names][111] to receive change events from. **Optional** if specifying `asset-types`.
   - `<ASSET_TYPES>`: Comma-separated list of [asset types][112] to receive change events from. **Optional** if specifying `asset-names`.
   - `<CONTENT_TYPE>`: **Optional** asset [content type][113] to receive change events from.

[9490]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[9491]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[9492]: https://cloud.google.com/asset-inventory/docs/overview#content_types

<!-- xxz tab xxx -->

<!-- xxx tab "Folder" xxx -->

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_folder_feed" "folder_feed" {
  billing_project = local.project_id
  folder          = "<FOLDER_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # Optional. Remove if unused.

  asset_names = ["<ASSET_NAMES>"] # Optional if specifying asset_types. Remove if unused.
  asset_types = ["<ASSET_TYPES>"] # Optional if specifying asset_names. Remove if unused.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Update the placeholder values as indicated:

   - `<PROJECT_ID>`: Your Google Cloud project ID.
   - `<FOLDER_ID>`: The ID of the folder this feed should be created in.
   - `<TOPIC_NAME>`: The name of the Pub/Sub topic to be linked with the `export-asset-changes-to-datadog` subscription.
   - `<SERVICE_ACCOUNT_EMAIL>`: The service account email used by the Datadog Google Cloud integration.
   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<ASSET_NAMES>`: Comma-separated list of resource [full names][111] to receive change events from. **Optional** if specifying `asset-types`.
   - `<ASSET_TYPES>`: Comma-separated list of [asset types][112] to receive change events from. **Optional** if specifying `asset-names`.
   - `<CONTENT_TYPE>`: **Optional** asset [content type][113] to receive change events from.

[9390]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[9391]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[9392]: https://cloud.google.com/asset-inventory/docs/overview#content_types

<!-- xxz tab xxx -->

<!-- xxx tab "Organization" xxx -->

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_organization_feed" "organization_feed" {
  billing_project = local.project_id
  org_id          = "<ORGANIZATION_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # Optional. Remove if unused.

  asset_names = ["<ASSET_NAMES>"] # Optional if specifying asset_types. Remove if unused.
  asset_types = ["<ASSET_TYPES>"] # Optional if specifying asset_names. Remove if unused.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Update the placeholder values as indicated:

   - `<PROJECT_ID>`: Your Google Cloud project ID.
   - `<TOPIC_NAME>`: The name of the Pub/Sub topic to be linked with the `export-asset-changes-to-datadog` subscription.
   - `<SERVICE_ACCOUNT_EMAIL>`: The service account email used by the Datadog Google Cloud integration.
   - `<ORGANIZATION_ID>`: Your Google Cloud organization ID.
   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<ASSET_NAMES>`: Comma-separated list of resource [full names][111] to receive change events from. **Optional** if specifying `asset-types`.
   - `<ASSET_TYPES>`: Comma-separated list of [asset types][112] to receive change events from. **Optional** if specifying `asset-names`.
   - `<CONTENT_TYPE>`: **Optional** asset [content type][113] to receive change events from.

[9290]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[9291]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[9292]: https://cloud.google.com/asset-inventory/docs/overview#content_types

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

{{% /collapse-content %}}

Datadog recommends setting the `asset-types` parameter to the regular expression `.*` to collect changes for all resources.

**Note**: You must specify at least one value for either the `asset-names` or `asset-types` parameter.

See the [gcloud asset feeds create][114] reference for the full list of configurable parameters.

### Enable resource changes collection

Click to **Enable Resource Changes Collection** in the [Resource Collection tab][106] of the Google Cloud integration page.

{{< img src="integrations/google_cloud_platform/enable_resource_change_collection.png" alt="The Enable Resource Changes Collection toggle in Datadog's Google Cloud integration tile" popup="true" style="width:80%;">}}

#### Validation

Find your asset change events in the [Datadog Event Explorer][115].

## Private Service Connect

<!-- partial
{{< site-region region="us,us3,ap1,gov" >}}
<div class="alert alert-info">Private Service Connect is only available for the US5 and EU Datadog sites.</div>
{{< /site-region >}}
partial -->

Use the [Google Cloud Private Service Connect integration][58] to visualize connections, data transferred, and dropped packets through Private Service Connect. This gives you visibility into important metrics from your Private Service Connect connections, both for producers as well as consumers.
[Private Service Connect (PSC)][49] is a Google Cloud networking product that enables you to access [Google Cloud services][50], [third-party partner services][51], and company-owned applications directly from your Virtual Private Cloud (VPC).

See [Access Datadog privately and monitor your Google Cloud Private Service Connect usage][52] in the Datadog blog for more information.

## Data Collected

### Metrics

See the individual Google Cloud integration pages for metrics.

#### Cumulative metrics

Cumulative metrics are imported into Datadog with a `.delta` metric for each metric name. A cumulative metric is a metric where the value constantly increases over time. For example, a metric for `sent bytes` might be cumulative. Each value records the total number of bytes sent by a service at that time. The delta value represents the change since the previous measurement.

For example:

 `gcp.gke.container.restart_count` is a CUMULATIVE metric. While importing this metric as a cumulative metric, Datadog adds the `gcp.gke.container.restart_count.delta` metric which includes the delta values (as opposed to the aggregate value emitted as part of the CUMULATIVE metric). See [Google Cloud metric kinds][116] for more information.

### Events

All service events generated by your Google Cloud Platform are forwarded to your [Datadog Events Explorer][117].

### Service Checks

The Google Cloud Platform integration does not include any service checks.

### Tags

Tags are automatically assigned based on a variety of Google Cloud Platform and Google Compute Engine configuration options. The `project_id` tag is added to all metrics. Additional tags are collected from the Google Cloud Platform when available, and varies based on metric type.

Additionally, Datadog collects the following as tags:

- Any hosts with `<key>:<value>` labels.
- Custom labels from Google Pub/Sub, GCE, Cloud SQL, and Cloud Storage.

## Troubleshooting

### Incorrect metadata for user defined _gcp.logging_ metrics?

For non-standard _gcp.logging_ metrics, such as metrics beyond [Datadog's out of the box logging metrics][118], the metadata applied may not be consistent with Google Cloud Logging.

In these cases, the metadata should be manually set by navigating to the [metric summary page][119], searching and selecting the metric in question, and clicking the pencil icon next to the metadata.

Need help? Contact [Datadog support][120].

## Further reading
Additional helpful documentation, links, and articles:

- [Improve the compliance and security posture of your Google Cloud environment with Datadog][121]
- [Monitor Google Cloud Vertex AI with Datadog][122]
- [Monitor your Dataflow pipelines with Datadog][104]
- [Create and manage your Google Cloud integration with Terraform][123]
- [Monitor BigQuery with Datadog][124]
- [Troubleshoot infrastructure changes faster with Recent Changes in the Resource Catalog][125]
- [Stream logs from Google Cloud to Datadog][75]

[1]: https://docs.datadoghq.com/integrations/google-app-engine/
[2]: https://docs.datadoghq.com/integrations/google-cloud-bigquery/
[3]: https://docs.datadoghq.com/integrations/google-cloud-bigtable/
[4]: https://docs.datadoghq.com/integrations/google-cloudsql/
[5]: https://docs.datadoghq.com/integrations/google-cloud-apis/
[6]: https://docs.datadoghq.com/integrations/google-cloud-armor/
[7]: https://docs.datadoghq.com/integrations/google-cloud-composer/
[8]: https://docs.datadoghq.com/integrations/google-cloud-dataproc/
[9]: https://docs.datadoghq.com/integrations/google-cloud-dataflow/
[10]: https://docs.datadoghq.com/integrations/google-cloud-filestore/
[11]: https://docs.datadoghq.com/integrations/google-cloud-firestore/
[12]: https://docs.datadoghq.com/integrations/google-cloud-interconnect/
[13]: https://docs.datadoghq.com/integrations/google-cloud-iot/
[14]: https://docs.datadoghq.com/integrations/google-cloud-loadbalancing/
[15]: https://docs.datadoghq.com/integrations/google-stackdriver-logging/
[16]: https://docs.datadoghq.com/integrations/google-cloud-redis/
[17]: https://docs.datadoghq.com/integrations/google-cloud-router/
[18]: https://docs.datadoghq.com/integrations/google-cloud-run/
[19]: https://docs.datadoghq.com/integrations/google-cloud-security-command-center/
[20]: https://docs.datadoghq.com/integrations/google-cloud-tasks/
[21]: https://docs.datadoghq.com/integrations/google-cloud-tpu/
[22]: https://docs.datadoghq.com/integrations/google-compute-engine/
[23]: https://docs.datadoghq.com/integrations/google-container-engine/
[24]: https://docs.datadoghq.com/integrations/google-cloud-datastore/
[25]: https://docs.datadoghq.com/integrations/google-cloud-firebase/
[26]: https://docs.datadoghq.com/integrations/google-cloud-functions/
[27]: https://docs.datadoghq.com/integrations/google-kubernetes-engine/
[28]: https://docs.datadoghq.com/integrations/google-cloud-ml/
[29]: https://docs.datadoghq.com/integrations/google-cloud-private-service-connect/
[30]: https://docs.datadoghq.com/integrations/google-cloud-pubsub/
[31]: https://docs.datadoghq.com/integrations/google-cloud-spanner/
[32]: https://docs.datadoghq.com/integrations/google-cloud-storage/
[33]: https://docs.datadoghq.com/integrations/google-cloud-vertex-ai/
[34]: https://docs.datadoghq.com/integrations/google-cloud-vpn/
[35]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[36]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[37]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[38]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[39]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[40]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[41]: https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.
[42]: https://docs.datadoghq.com/data_security/data_retention_periods/
[43]: /integrations/google-cloud-platform
[44]: https://docs.datadoghq.com/integrations/google-kubernetes-engine/
[46]: https://docs.datadoghq.com/tracing/
[47]: https://docs.datadoghq.com/logs/
[48]: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[49]: https://cloud.google.com/vpc/docs/private-service-connect
[50]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[51]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[52]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[53]: https://docs.datadoghq.com/cloud_cost_management/setup/google_cloud/
[56]: https://cloud.google.com/compute/docs/labeling-resources
[57]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[58]: https://docs.datadoghq.com/integrations/google-cloud-private-service-connect/
[59]: https://app.datadoghq.com/integrations/google-cloud-platform
[60]: https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer
[61]: https://console.cloud.google.com/iam-admin/
[62]: https://app.datadoghq.com/datasets/tables/explore
[63]: https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer
[64]: https://console.cloud.google.com/bigquery
[65]: https://app.datadoghq.com/logs/pipelines/indexes
[66]: https://www.datadoghq.com/pricing/?product=log-management#products
[67]: https://cloud.google.com/dataflow
[68]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[69]: https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration
[70]: https://cloud.google.com/pubsub/docs/create-topic
[71]: https://cloud.google.com/pubsub/docs/create-subscription
[72]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[73]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[74]: https://cloud.google.com/logging/docs/view/logging-query-language
[75]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[76]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[77]: https://docs.datadoghq.com/agent/
[78]: https://console.cloud.google.com/cloudpubsub/topicList
[79]: https://console.cloud.google.com/cloudpubsub/subscription/
[80]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[81]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[82]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[83]: https://console.cloud.google.com/security/secret-manager
[84]: https://cloud.google.com/pubsub/quotas#quotas
[85]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[86]: https://console.cloud.google.com/iam-admin/serviceaccounts
[87]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[88]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[89]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[90]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[91]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[92]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[93]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[94]: https://console.cloud.google.com/logs/viewer
[95]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[96]: https://console.cloud.google.com/dataflow/createjob
[97]: https://docs.datadoghq.com/getting_started/site/
[98]: https://cloud.google.com/kms/docs
[99]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[100]: /logs
[101]: https://cloud.google.com/products/calculator
[102]: https://docs.datadoghq.com/monitors/types/metric/
[103]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[104]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[105]: http://docs.datadoghq.com/integrations/google-cloud-platform/?tab=dataflowmethodrecommended
[106]: /integrations/google-cloud-platform?panel=resources
[107]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes
[108]: https://app.datadoghq.com/event/explorer
[109]: https://cloud.google.com/shell
[110]: https://cloud.google.com/sdk/gcloud
[111]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[112]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[113]: https://cloud.google.com/asset-inventory/docs/overview#content_types
[114]: https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create
[115]: https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory
[116]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[117]: https://app.datadoghq.com/event/explorer
[118]: https://docs.datadoghq.com/integrations/google-stackdriver-logging/#metrics
[119]: https://app.datadoghq.com/metric/summary
[120]: https://docs.datadoghq.com/help/
[121]: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
[122]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[123]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
[124]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[125]: https://www.datadoghq.com/blog/recent-changes-tab/
