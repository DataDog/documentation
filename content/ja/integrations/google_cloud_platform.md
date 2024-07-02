---
"aliases":
- "/integrations/gcp/"
"categories":
- "cloud"
- "google cloud"
- "iot"
- "log collection"
- "network"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "豊富な GCP メトリクスを収集してホストマップ内のインスタンスを視覚化。"
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_platform/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/"
  "tag": "ブログ"
  "text": "Datadog による Google Cloud 環境のコンプライアンスとセキュリティポスチャの改善"
- "link": "https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/"
  "tag": "ブログ"
  "text": "Datadog による Google Cloud Vertex AI の監視"
- "link": "https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/"
  "tag": "ブログ"
  "text": "Datadog による Dataflow パイプラインの監視"
- "link": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts"
  "tag": "Terraform"
  "text": "Terraform による Google Cloud インテグレーションの作成と管理"
- "link": "https://www.datadoghq.com/blog/track-bigquery-costs-performance/"
  "tag": "ブログ"
  "text": "Datadog による BigQuery の監視"
"git_integration_title": "google_cloud_platform"
"has_logo": true
"integration_id": "google-cloud-platform"
"integration_title": "Google Cloud Platform"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_platform"
"public_title": "Datadog-Google Cloud Platform Integration"
"short_description": "Collect a wealth of GCP metrics and visualize your instances in a host map."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect to Google Cloud Platform to see all your Google Compute Engine (GCE) hosts in Datadog. You can see your hosts in the infrastructure overview in Datadog and sort through them, since Datadog automatically tags them with GCE host tags and any GCE labels you may have added.

<div class="alert alert-warning">
Datadog's GCP integration is built to collect <a href="https://cloud.google.com/monitoring/api/metrics_gcp">all Google Cloud metrics</a>. Datadog strives to continually update the docs to show every sub-integration, but cloud services rapidly release new metrics and services so the list of integrations are sometimes lagging.
</div>

| Integration                         | Description                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | PaaS (platform as a service) to build scalable applications                           |
| [Big Query][2]                      | Enterprise data warehouse                                                             |
| [Bigtable][3]                       | NoSQL Big Data database service                                                       |
| [Cloud SQL][4]                      | MySQL database service                                                                |
| [Cloud APIs][5]                     | Programmatic interfaces for all Google Cloud Platform services                        |
| [Cloud Armor][6]                   | Network security service to help protect against denial of service and web attacks    |
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
| [Cloud Run][18]                     | Managed compute platform that runs stateless containers through HTTP                  |
| [Cloud Security Command Center][19] | Security Command Center is a threat reporting service.                                |
| [Cloud Tasks][20]                   | Distributed task queues                                                               |
| [Cloud TPU][21]                     | Train and run machine learning models                                                 |
| [Compute Engine][22]                | High performance virtual machines                                                     |
| [Container Engine][23]              | Kubernetes, managed by google                                                         |
| [Datastore][24]                     | NoSQL database                                                                        |
| [Firebase][25]                      | Mobile platform for application development                                           |
| [Functions][26]                     | Serverless platform for building event-based microservices                            |
| [Kubernetes Engine][27]             | Cluster manager and orchestration system                                              |
| [Machine Learning][28]              | Machine learning services                                                             |
| [Private Service Connect][29]       | Access managed services with private VPC connections                                  |
| [Pub/Sub][30]                       | Real-time messaging service                                                           |
| [Spanner][31]                       | Horizontally scalable, globally consistent, relational database service               |
| [Storage][32]                       | Unified object storage                                                                |
| [Vertex AI][33]                     | Build, train and deploy custom machine learning (ML) models.                          |
| [VPN][34]                           | Managed network functionality                                                         |

## セットアップ

Set up Datadog's Google Cloud integration to collect metrics and logs from your Google Cloud services.

### Prerequisites

* If your organization restricts identities by domain, you must add Datadog's customer identity as an allowed value in your policy. Datadog's customer identity: `C0147pk0i`

* Service account impersonation and automatic project discovery relies on you having certain roles and APIs enabled to monitor projects. Before you start, ensure the following APIs are enabled for the projects you want to monitor:
  * [Cloud Resource Manager API][35]
  * [Google Cloud Billing API][36]
  * [Cloud Monitoring API][37]
  * [Compute Engine API][38]
  * [Cloud Asset API][39]
  * [IAM API][40]

### Metric collection

#### Installation

{{< site-region region="gov" >}}

The Datadog Google Cloud integration for the {{< region-param key="dd_site_name" >}} site uses service accounts to create an API connection between Google Cloud and Datadog. Follow the instructions below to create a service account and provide Datadog with the service account credentials to begin making API calls on your behalf.

[Service account impersonation][209] is not available for the {{< region-param key="dd_site_name" >}} site.

**Note**: [Google Cloud billing][204], the [Cloud Monitoring API][205], the [Compute Engine API][206], and the [Cloud Asset API][207] must all be enabled for any projects you wish to monitor.

1. Go to the [Google Cloud credentials page][202] for the Google Cloud project you want to integrate with Datadog.
2. Click **Create credentials**.
3. Select **Service account**.

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="settings" popup="true" style="width:80%;">}}

4. Give the service account a unique name and optional description.
5. Click **Create and continue**.
6. Add the following roles: 
    - Compute Viewer
    - Monitoring Viewer
    - Cloud Asset Viewer
7.  Click **Done**.
    **Note**: You must be a Service Account Key Admin to select Compute Engine and Cloud Asset roles. All selected roles allow Datadog to collect metrics, tags, events, and user labels on your behalf.
8. At the bottom of the page, find your service accounts and select the one you just created. 
9. Click **Add Key** -> **Create new key**, and choose **JSON** as the type. 
10. Click **Create**. A JSON key file is downloaded to your computer. Note where it is saved, as it is needed to complete the installation.
11. Navigate to the [Datadog Google Cloud Integration page][203].
12. On the **Configuration** tab, select **Upload Key File** to integrate this project with Datadog.
13. Optionally, you can use tags to filter out hosts from being included in this integration. Detailed instructions on this can be found in the [configuration section](#configuration).

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="settings" popup="true" style="width:80%;">}}

14. Click _Install/Update_.
15. If you want to monitor multiple projects, use one of the following methods:

    - Repeat the process above to use multiple service accounts.
    - Use the same service account by updating the `project_id` in the JSON file downloaded in step 10. Then upload the file to Datadog as described in steps 11-14.

### Configuration

Optionally, you can limit the GCE instances that are pulled into Datadog by entering tags in the **Limit Metric Collection** textbox under a given project’s dropdown menu. Only hosts that match one of the defined tags are imported into Datadog. You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. This example includes all `c1*` sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's documentation on [Creating and managing labels][208] for more details.

[202]: https://console.cloud.google.com/apis/credentials
[203]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[204]: https://support.google.com/cloud/answer/6293499?hl=en
[205]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[206]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[207]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[208]: https://cloud.google.com/compute/docs/labeling-resources
[209]: https://cloud.google.com/iam/docs/service-account-impersonation

{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
You can use [service account impersonation][301] and automatic project discovery to integrate Datadog with [Google Cloud][302].

This method enables you to monitor all projects visible to a service account by assigning IAM roles in the relevant projects. You can assign these roles to projects individually, or you can configure Datadog to monitor groups of projects by assigning these roles at the organization or folder level. Assigning roles in this way allows Datadog to automatically discover and monitor all projects in the given scope, including any new projects that may be added to the group in the future.

#### 1. Create your Google Cloud service account

1. Open your [Google Cloud console][303].
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Click on **Create service account** at the top.
4. Give the service account a unique name, then click **Create and continue**.
5. Add the following roles to the service account:
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Browser
6. Click **Continue**, then **Done** to complete creating the service account.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Google Cloud console interface, showing the 'Create service account' flow. Under 'Grant this service account access to project', the four roles in the instructions are added." style="width:70%;">}}

#### 2. Add the Datadog principal to your service account

1. In Datadog, navigate to the [**Integrations** > **Google Cloud Platform**][304].
2. Click on **Add GCP Account**. If you have no configured projects, you are automatically redirected to this page.
3. If you have not generated a Datadog principal for your org, click the **Generate Principal** button.
4. Copy your Datadog principal and keep it for the next section.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog interface, showing the 'Add New GCP Account' flow. The first step, 'Add Datadog Principal to Google,' features a text box where a user can generate a Datadog Principal and copy it to their clipboard. The second step, 'Add Service Account Email,' features a text box that the user can complete in section 3." style="width:70%;">}}
   Keep this window open for the [next section](#3-complete-the-integration-setup-in-datadog).
5. In [Google Cloud console][303], under the **Service Accounts** menu, find the service account you created in the [first section](#1-create-your-google-cloud-service-account).
6. Go to the **Permissions** tab and click on **Grant Access**.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud console interface, showing the Permissions tab under Service Accounts." style="width:70%;">}}
7. Paste your Datadog principal into the **New principals** text box.
8. Assign the role of **Service Account Token Creator** and click **Save**.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Google Cloud console interface, showing an 'Add principals' box and an 'Assign roles' interface." style="width:70%;">}}

**Note**: If you previously configured access using a shared Datadog principal, you can revoke the permission for that principal after you complete these steps.

#### 3. Complete the integration setup in Datadog

1. In your Google Cloud console, navigate to the **Service Account** > **Details** tab. There, you can find the email associated with this Google service account. It resembles `<sa-name>@<project-id>.iam.gserviceaccount.com`.
2. Copy this email.
3. Return to the integration configuration tile in Datadog (where you copied your Datadog principal in the [previous section](#2-add-the-datadog-principal-to-your-service-account)).
4. In the box under **Add Service Account Email**, paste the email you previously copied.
5. Click on **Verify and Save Account**.

In approximately fifteen minutes, metrics appear in Datadog.

#### 4. Assign roles to other projects (optional)

Automatic project discovery simplifies the process of adding additional projects to be monitored. If you grant your service account access to other projects, folders, or orgs, Datadog discovers these projects (and any projects nested in the folders or orgs) and automatically adds them to your integration tile.

1. Make sure you have the appropriate permissions to assign roles at the desired scope:
   * Project IAM Admin (or higher)
   * Folder Admin
   * Organization Admin
2. In the Google Cloud console, go to the **IAM** page.
3. Select a project, folder, or organization.
4. To grant a role to a principal that does not already have other roles on the resource, click **Grant Access**, then enter the email of the service account you created earlier.
5. Assign the following roles:
   * Compute Viewer
   * Monitoring Viewer
   * Cloud Asset Viewer
   **Note**: The Browser role is only required in the default project of the service account.
6. Click **Save**.

[301]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[302]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[303]: https://console.cloud.google.com/
[304]: https://app.datadoghq.com/integrations/google-cloud-platform

{{< /site-region >}}

#### Configuration

Optionally, you can limit the GCE instances that are pulled into Datadog by entering tags in the **Limit Metric Collection** textbox under a given project's dropdown menu. Only hosts that match one of the defined tags are imported into Datadog. You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. This example includes all `c1*` sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's documentation on [Creating and managing labels][41] for more details.

### Log collection

Forward logs from your Google Cloud services to Datadog using [Google Cloud Dataflow][42] and the [Datadog template][43]. This method provides both compression and batching of events before forwarding to Datadog. Follow the instructions in this section to:  

[1](#1-create-a-cloud-pubsub-topic-and-subscription). Create a Pub/Sub [topic][44] and [pull subscription][45] to receive logs from a configured log sink  
[2](#2-create-a-custom-dataflow-worker-service-account). Create a custom Dataflow worker service account to provide [least privilege][46] to your Dataflow pipeline workers  
[3](#3-export-logs-from-google-cloud-pubsub-topic). Create a [log sink][47] to publish logs to the Pub/Sub topic  
[4](#4-create-and-run-the-dataflow-job). Create a Dataflow job using the [Datadog template][43] to stream logs from the Pub/Sub subscription to Datadog  

You have full control over which logs are sent to Datadog through the logging filters you create in the log sink, including GCE and GKE logs. See Google's [Logging query language page][48] for information about writing filters.

**Note**: You must enable the Dataflow API to use Google Cloud Dataflow. See [Enabling APIs][49] in the Google Cloud documentation for more information.

To collect logs from applications running in GCE or GKE, you can also use the [Datadog Agent][50].

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Collecting Google Cloud logs with a Pub/Sub Push subscription</a> is in the process of being deprecated for the following reasons:

- If you have a Google Cloud VPC, new Push subscriptions cannot be configured with external endpoints (see Google Cloud's [Supported products and limitations][51] page for more information)
- The Push subscription does not provide compression or batching of events, and as such is only suitable for a very low volume of logs

Documentation for the <strong>Push</strong> subscription is only maintained for troubleshooting or modifying legacy setups. Use a <strong>Pull</strong> subscription with the Datadog Dataflow template to forward your Google Cloud logs to Datadog instead.
</div>

#### 1. Create a Cloud Pub/Sub topic and subscription

1. Go to the [Cloud Pub/Sub console][52] and create a new topic. Select the option **Add a default subscription** to simplify the setup. 

   **Note**: You can also manually configure a [Cloud Pub/Sub subscription][53] with the **Pull** delivery type. If you manually create your Pub/Sub subscription, leave the `Enable dead lettering` box **unchecked**. For more details, see [Unsupported Pub/Sub features][54].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="The Create a topic page in the Google Cloud Console with the Add a default subscription checkbox selected" style="width:80%;">}}

2. Give that topic an explicit name such as `export-logs-to-datadog` and click **Create**.

3. Create an additional topic and default subscription to handle any log messages rejected by the Datadog API. The name of this topic is used within the Datadog Dataflow template as part of the path configuration for the `outputDeadletterTopic` [template parameter][55]. When you have inspected and corrected any issues in the failed messages, send them back to the original `export-logs-to-datadog` topic by running a [Pub/Sub to Pub/Sub template][56] job. 

4. Datadog recommends creating a secret in [Secret Manager][57] with your valid Datadog API key value, for later use in the Datadog Dataflow template.

**Warning**: Cloud Pub/Subs are subject to [Google Cloud quotas and limitations][58]. If the number of logs you have exceeds those limitations, Datadog recommends you split your logs over several topics. See [the Monitor the Pub/Sub Log Forwarding section](#monitor-the-cloud-pubsub-log-forwarding) for information on setting up monitor notifications if you approach those limits.

#### 2. Create a custom Dataflow worker service account

The default behavior for Dataflow pipeline workers is to use your project's [Compute Engine default service account][59], which grants permissions to all resources in the project. If you are forwarding logs from a **Production** environment, you should instead create a custom worker service account with only the necessary roles and permissions, and assign this service account to your Dataflow pipeline workers.

1. Go to the [Service Accounts][60] page in the Google Cloud console and select your project.
2. Click **CREATE SERVICE ACCOUNT** and give the service account a descriptive name. Click **CREATE AND CONTINUE**.
3. Add the roles in the required permissions table and click **DONE**.

##### Required permissions

| Role                                 | Path                                 | Description                                                                                                                       |
|--------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| [Dataflow Admin][61]                 | `roles/dataflow.admin`               | Allow this service account to perform Dataflow administrative tasks                                                               |
| [Dataflow Worker][62]                | `roles/dataflow.worker`              | Allow this service account to perform Dataflow job operations                                                                     |
| [Pub/Sub Viewer][63]                 | `roles/pubsub.viewer`                | Allow this service account to view messages from the Pub/Sub subscription with your Google Cloud logs                             |
| [Pub/Sub Subscriber][64]             | `roles/pubsub.subscriber`            | Allow this service account to consume messages from the Pub/Sub subscription with your Google Cloud logs                          |
| [Pub/Sub Publisher][65]              | `roles/pubsub.publisher`             | Allow this service account to publish failed messages to a separate subscription, which allows for analysis or resending the logs |
| [Secret Manager Secret Accessor][66] | `roles/secretmanager.secretAccessor` | Allow this service account to access the Datadog API key in Secret Manager                                                        |
| [Storage Object Admin][67]           | `roles/storage.objectAdmin`          | Allow this service account to read and write to the Cloud Storage bucket specified for staging files                              |

**Note**: If you don't create a custom service account for the Dataflow pipeline workers, ensure that the default Compute Engine service account has the required permissions above.

#### 3. Export logs from Google Cloud Pub/Sub topic

1. Go to [the Logs Explorer page][68] in the Google Cloud console.
2. From the **Log Router** tab, select **Create Sink**.
3. Provide a name for the sink.
4. Choose _Cloud Pub/Sub_ as the destination and select the Cloud Pub/Sub topic that was created for that purpose. **Note**: The Cloud Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

5. Choose the logs you want to include in the sink with an optional inclusion or exclusion filter. You can filter the logs with a search query, or use the [sample function][69]. For example, to include only 10% of the logs with a `severity` level of `ERROR`, create an inclusion filter with `severity="ERROR" AND sample(insertId, 0.01)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter.png" alt="The inclusion filter for a Google Cloud logging sink with a query of severity=ERROR and sample(insertId, 0.1)" >}}

6. Click **Create Sink**.

**Note**: It is possible to create several exports from Google Cloud Logging to the same Cloud Pub/Sub topic with different sinks.

#### 4. Create and run the Dataflow job

1. Go to the [Create job from template][70] page in the Google Cloud console.
2. Give the job a name and select a Dataflow regional endpoint.
3. Select `Pub/Sub to Datadog` in the **Dataflow template** dropdown, and the **Required parameters** section appears.  
   a. Select the input subscription in the **Pub/Sub input subscription** dropdown.  
   b. Enter the following in the **Datadog Logs API URL** field:  

   ```shell
   https://{{< region-param key="http_endpoint" code="true" >}}

   ```
   **Note**: Ensure that the Datadog site selector on the right of the page is set to your [Datadog site][64] before copying the URL above.

   c. Select the topic created to receive message failures in the **Output deadletter Pub/Sub topic** dropdown.  
   d. Specify a path for temporary files in your storage bucket in the **Temporary location** field.  

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Required parameters in the Datadog Dataflow template" style="width:80%;">}}  

4. Under **Optional Parameters**, check `Include full Pub/Sub message in the payload`.

5. [ステップ 1](#1-create-a-cloud-pubsub-topic-and-subscription) で言及したように Datadog API キーの値で Secret Manager にシークレットを作成した場合は、シークレットの**リソース名**を **Google Cloud Secret Manager ID** フィールドに入力します。

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Datadog Dataflow テンプレートのオプションパラメーター。Google Cloud Secret Manager ID と Source of the API key passed フィールドが両方ハイライトされています" style="width:80%;">}}  

その他の使用可能なオプションの詳細については、Dataflow テンプレートの[テンプレートパラメーター][55]を参照してください。

   - `apiKeyKMSEncryptionKey` を [Cloud KMS][71] のキー ID に設定し、`apiKey` を暗号化された API キーに設定した `apiKeySource=KMS`
   - **非推奨**: `apiKeySource=PLAINTEXT` で、`apiKey` にプレーンテキストの API キーを設定

6. カスタムワーカーサービスアカウントを作成した場合は、**Service account email** ドロップダウンでそれを選択します。

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Datadog Dataflow テンプレートのオプションパラメーター。サービスアカウントのメールドロップダウンがハイライトされています" style="width:80%;">}}

7. **RUN JOB** をクリックします。

**注**: 共有 VPC を使用している場合は、Dataflow ドキュメントの[ネットワークとサブネットワークを指定する][72]ページで `Network` と `Subnetwork` パラメーターの指定に関するガイドラインを参照してください。

#### 検証

Cloud Pub/Sub トピックに配信された新しいログイベントは、[Datadog ログエクスプローラー][73]に表示されます。

**注**: [Google Cloud Pricing Calculator][74] を使用して、潜在的なコストを計算できます。

#### Cloud Pub/Sub ログの転送を監視する

[Google Cloud Pub/Sub インテグレーション][30]は、ログ転送のステータスを監視するのに役立つメトリクスを提供します。

   - `gcp.pubsub.subscription.num_undelivered_messages` は配信保留中のメッセージ数を表します
   - `gcp.pubsub.subscription.oldest_unacked_message_age` は、サブスクリプション内の最も古い未承認メッセージの年齢を表します

上記のメトリクスを[メトリクスモニター][75]とともに使用すると、入力およびデッドレターサブスクリプション内のメッセージに対するアラートを受け取ることができます。

#### Dataflow パイプラインを監視する

Datadog の [Google Cloud Dataflow インテグレーション][9]を使用して、Dataflow パイプラインのあらゆる側面を監視することができます。すぐに使えるダッシュボード上で、Dataflow ワークロードを実行している GCE インスタンスに関する情報や Pub/Sub スループットなどのコンテキストデータでリッチ化された、すべての Dataflow 主要メトリクスを確認できます。

また、あらかじめ構成されている [Recommended Monitor][76] を使用して、パイプラインのバックログ時間の増加に対する通知をセットアップすることもできます。詳細は、Datadog ブログの [Datadog による Dataflow パイプラインの監視][77]を参照してください。

### Resource change collection

Receive resource events in Datadog when Google's [Cloud Asset Inventory][78] detects changes in your cloud resources. 

Ensure that you have selected **Enable Resource Collection** in the [Resource Collection tab][79] of the Google Cloud integration page. Then, follow the steps below to forward change events from a Pub/Sub topic to the Datadog [Event Explorer][80].

#### Create a Cloud Pub/Sub topic and subscription 

##### Create a topic

1. In the [Google Cloud Pub/Sub topics page][52], click **CREATE TOPIC**.
2. Give the topic a descriptive name.
3. **Uncheck** the option to add a default subscription.
4. Click **CREATE**.

##### Create a subscription

1. In the [Google Cloud Pub/Sub subscriptions page][53], click **CREATE SUBSCRIPTION**.
2. Enter `export-asset-changes-to-datadog` for the subscription name.
3. Select the Cloud Pub/Sub topic previously created.
4. Select **Pull** as the delivery type.
5. Click **CREATE**.

#### Grant access

To read from this Pub/Sub subscription, the Google Cloud service account used by the integration needs the `pubsub.subscriptions.consume` permission for the subscription. A default role with minimal permissions that allows this is the **Pub/Sub subscriber** role. Follow the steps below to grant this role:

1. In the [Google Cloud Pub/Sub subscriptions page][53], click the `export-asset-changes-to-datadog` subscription.
2. In the **info panel** on the right of the page, click the **Permissions** tab. If you don't see the info panel, click **SHOW INFO PANEL**.
3. Click **ADD PRINCIPAL**.
4. Enter the **service account email** used by the Datadog Google Cloud integration. You can find your service accounts listed on the left of the **Configuration** tab in the [Google Cloud integration page][81] in Datadog.

#### Create an asset feed

Run the command below in [Cloud Shell][82] or the [gcloud CLI][83] to create a Cloud Asset Inventory Feed that sends change events to the Pub/Sub topic created above.  

{{< tabs >}}
{{% tab "Project" %}}
```bash
gcloud asset feeds create <FEED_NAME> 
--project=<PROJECT_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
--condition-title=<CONDITION_TITLE>
```

Update the placeholder values as indicated:

   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<PROJECT_ID>`: Your Google Cloud project ID.
{{% /tab %}}

{{% tab "Folder" %}}
```bash
gcloud asset feeds create <FEED_NAME> 
--folder=<FOLDER_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
--condition-title=<CONDITION_TITLE>
```

Update the placeholder values as indicated:

   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<FOLDER_ID>`: Your Google Cloud folder ID.
{{% /tab %}}

{{% tab "Organization" %}}
```bash
gcloud asset feeds create <FEED_NAME> 
--organization=<ORGANIZATION_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
--condition-title=<CONDITION_TITLE>
```

Update the placeholder values as indicated:

   - `<FEED_NAME>`: A descriptive name for the Cloud Asset Inventory Feed.
   - `<ORGANIZATION_ID>`: Your Google Cloud organization ID.
{{% /tab %}}
{{< /tabs >}}
   - `<TOPIC_NAME>`: The name of the Pub/Sub topic linked with the `export-asset-changes-to-datadog` subscription.
   - `<ASSET_NAMES>`: Comma-separated list of resource [full names][84] to receive change events from. **Optional** if specifying `asset-types`.
   - `<ASSET_TYPES>`: Comma-separated list of [asset types][85] to receive change events from. **Optional** if specifying `asset-names`.
   - `<CONTENT_TYPE>`: **Optional** asset [content type][86] to receive change events from.
   - `<CONDITION_TITLE>`: **Optional** title of a [condition][87] to apply to the feed.

Datadog recommends setting the `asset-types` parameter to the regular expression `.*` to collect changes for all resources.

**Note**: You must specify at least one value for either the `asset-names` or `asset-types` parameter. 

See the [gcloud asset feeds create][88] reference for the full list of configurable parameters.

#### 検証

Find your asset change events in the [Datadog Event Explorer][89].

## 収集データ

### メトリクス

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

#### 累積メトリクス

累積メトリクスは、メトリクス名ごとに `.delta` メトリクスを伴って Datadog にインポートされます。累積メトリクスとは、値が時間の経過とともに常に増加するメトリクスです。たとえば、`sent bytes` のメトリクスは累積的である可能性があります。各値は、その時点でサービスによって送信された総バイト数を記録します。デルタ値は、前回の測定からの変化を表します。

例:

 `gcp.gke.container.restart_count` is a CUMULATIVE metric. While importing this metric as a cumulative metric, Datadog adds the `gcp.gke.container.restart_count.delta` metric which includes the delta values (as opposed to the aggregate value emitted as part of the CUMULATIVE metric). See [Google Cloud metric kinds][90] for more information.

### イベント

All service events generated by your Google Cloud Platform are forwarded to your [Datadog Events Explorer][91].

### サービスチェック

Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

### タグ

タグは、Google Cloud Platform と Google Compute Engine の様々な構成オプションに基づいて自動的に割り当てられます。`project_id` タグは、すべてのメトリクスに追加されます。追加のタグは、利用可能な場合に Google Cloud Platform から収集され、メトリクスの種類に応じて異なります。

また、Datadog は以下をタグとして収集します。

- `<キー>:<値>` ラベルが付けられたホスト。
- Custom labels from Google Pub/Sub、GCE、Cloud SQL、Cloud Storage のカスタムラベル

## トラブルシューティング

### ユーザー定義の _gcp.logging_ メトリクスに不正なメタデータが適用される

For non-standard _gcp.logging_ metrics, such as metrics beyond [Datadog's out of the box logging metrics][92], the metadata applied may not be consistent with Google Cloud Logging.

In these cases, the metadata should be manually set by navigating to the [metric summary page][93], searching and selecting the metric in question, and clicking the pencil icon next to the metadata.

Need help? Contact [Datadog support][94].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/integrations/google_bigquery/
[3]: https://docs.datadoghq.com/integrations/google_cloud_bigtable/
[4]: https://docs.datadoghq.com/integrations/google_cloudsql/
[5]: https://docs.datadoghq.com/integrations/google_cloud_apis/
[6]: https://docs.datadoghq.com/integrations/google_cloud_armor/
[7]: https://docs.datadoghq.com/integrations/google_cloud_composer/
[8]: https://docs.datadoghq.com/integrations/google_cloud_dataproc/
[9]: https://docs.datadoghq.com/integrations/google_cloud_dataflow/
[10]: https://docs.datadoghq.com/integrations/google_cloud_filestore/
[11]: https://docs.datadoghq.com/integrations/google_cloud_firestore/
[12]: https://docs.datadoghq.com/integrations/google_cloud_interconnect/
[13]: https://docs.datadoghq.com/integrations/google_cloud_iot/
[14]: https://docs.datadoghq.com/integrations/google_cloud_loadbalancing/
[15]: https://docs.datadoghq.com/integrations/google_stackdriver_logging/
[16]: https://docs.datadoghq.com/integrations/google_cloud_redis/
[17]: https://docs.datadoghq.com/integrations/google_cloud_router/
[18]: https://docs.datadoghq.com/integrations/google_cloud_run/
[19]: https://docs.datadoghq.com/integrations/google_cloud_security_command_center/
[20]: https://docs.datadoghq.com/integrations/google_cloud_tasks/
[21]: https://docs.datadoghq.com/integrations/google_cloud_tpu/
[22]: https://docs.datadoghq.com/integrations/google_compute_engine/
[23]: https://docs.datadoghq.com/integrations/google_container_engine/
[24]: https://docs.datadoghq.com/integrations/google_cloud_datastore/
[25]: https://docs.datadoghq.com/integrations/google_cloud_firebase/
[26]: https://docs.datadoghq.com/integrations/google_cloud_functions/
[27]: https://docs.datadoghq.com/integrations/google_kubernetes_engine/
[28]: https://docs.datadoghq.com/integrations/google_cloud_ml/
[29]: https://docs.datadoghq.com/integrations/google_cloud_private_service_connect/
[30]: https://docs.datadoghq.com/integrations/google_cloud_pubsub/
[31]: https://docs.datadoghq.com/integrations/google_cloud_spanner/
[32]: https://docs.datadoghq.com/integrations/google_cloud_storage/
[33]: https://docs.datadoghq.com/integrations/google_cloud_vertex_ai/
[34]: https://docs.datadoghq.com/integrations/google_cloud_vpn/
[35]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[36]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[37]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[38]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[39]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[40]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[41]: https://cloud.google.com/compute/docs/labeling-resources
[42]: https://cloud.google.com/dataflow
[43]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[44]: https://cloud.google.com/pubsub/docs/create-topic
[45]: https://cloud.google.com/pubsub/docs/create-subscription
[46]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[47]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[48]: https://cloud.google.com/logging/docs/view/logging-query-language
[49]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[50]: https://docs.datadoghq.com/agent/
[51]: https://cloud.google.com/vpc-service-controls/docs/supported-products#table_pubsub
[52]: https://console.cloud.google.com/cloudpubsub/topicList
[53]: https://console.cloud.google.com/cloudpubsub/subscription/
[54]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[55]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[56]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[57]: https://console.cloud.google.com/security/secret-manager
[58]: https://cloud.google.com/pubsub/quotas#quotas
[59]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[60]: https://console.cloud.google.com/iam-admin/serviceaccounts
[61]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[62]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[63]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[64]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[65]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[66]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[67]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[68]: https://console.cloud.google.com/logs/viewer
[69]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[70]: https://console.cloud.google.com/dataflow/createjob
[71]: https://cloud.google.com/kms/docs
[72]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[73]: https://app.datadoghq.com/logs
[74]: https://cloud.google.com/products/calculator
[75]: https://docs.datadoghq.com/monitors/types/metric/
[76]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[77]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[78]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes
[79]: https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources
[80]: https://app.datadoghq.com/event/explorer
[81]: https://app.datadoghq.com/integrations/google-cloud-platform
[82]: https://cloud.google.com/shell
[83]: https://cloud.google.com/sdk/gcloud
[84]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[85]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[86]: https://cloud.google.com/asset-inventory/docs/overview#content_types
[87]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes-with-condition
[88]: https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create
[89]: https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory
[90]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[91]: https://app.datadoghq.com/event/stream
[92]: https://docs.datadoghq.com/integrations/google_stackdriver_logging/#metrics
[93]: https://app.datadoghq.com/metric/summary
[94]: https://docs.datadoghq.com/help/

