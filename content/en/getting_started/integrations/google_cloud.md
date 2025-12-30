---
title: Getting Started with Google Cloud
description: Set up comprehensive monitoring for your Google Cloud environment. Configure service accounts, enable metric collection, and explore log forwarding and Agent installation.
further_reading:
    - link: 'https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended'
      tag: 'Documentation'
      text: 'Google Cloud integration'
    - link: 'https://docs.datadoghq.com/account_management/billing/google_cloud/'
      tag: 'Guide'
      text: 'Google Cloud integration billing'
    - link: 'https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/'
      tag: 'Guide'
      text: 'Cloud Metric Delay'
    - link: 'https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/'
      tag: 'Guide'
      text: 'Why should I install the Datadog Agent on my cloud instances?'
    - link: 'https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/'
      tag: 'Blog'
      text: 'New GKE dashboards and metrics provide deeper visibility into your environment'
    - link: 'https://www.datadoghq.com/blog/google-cloud-private-service-connect/'
      tag: 'Blog'
      text: 'Access Datadog privately and monitor your Google Cloud Private Service Connect usage'
    - link: 'https://www.datadoghq.com/blog/track-bigquery-costs-performance/'
      tag: 'Blog'
      text: 'Monitor BigQuery with Datadog'
    - link: 'https://www.datadoghq.com/blog/google-cloud-cost-management/'
      tag: 'Blog'
      text: 'Empower engineers to take ownership of Google Cloud costs with Datadog'
    - link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
      text: 'Collect traces, logs, and custom metrics from your Google Cloud Run services with Datadog'
      tag: 'Blog'
---

## Overview

Use this guide to get started with monitoring your Google Cloud environment. This approach simplifies the setup for Google Cloud environments with multiple projects, allowing you to maximize your monitoring coverage.

## Setup

### Prerequisites
1) Create a [Datadog account][1]
2) Set up a [Service Account][2] in any of your Google Cloud projects
3) Review these Google Cloud Prerequisites:

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● If your organization restricts identities by domain, you must add Datadog's customer identity `C0147pk0i` as an allowed value in your policy.
{{% /site-region %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● The Google Cloud integration requires the below APIs to be enabled **for each of the projects** you want to monitor:

<div class="alert alert-danger">Ensure that any projects being monitored are not configured as <a href="https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.">scoping projects</a> that pull in metrics from multiple other projects.</div>

[Cloud Monitoring API][3]
: Allows Datadog to query your Google Cloud metric data.

[Compute Engine API][4]
: Allows Datadog to discover compute instance data.

[Cloud Asset API][5]
: Allows Datadog to request Google Cloud resources and link relevant labels to metrics as tags.

[Cloud Resource Manager API][6]
: Allows Datadog to append metrics with the correct resources and tags.

[IAM API][7]
: Allows Datadog to authenticate with Google Cloud.

[Cloud Billing API][8]
: Allows developers to manage billing for their Google Cloud Platform projects programmatically. See the [Cloud Cost Management (CCM)](#cloud-cost-management-ccm) section for more information.

<div class="alert alert-info">You can confirm if these APIs are enabled by going to <a href="https://console.cloud.google.com/apis/dashboard">Enabled APIs & Services</a>.</div>

### Metric collection

{{< tabs >}}

{{% tab "Org-level" %}}

Organization-level monitoring is recommended for comprehensive coverage of all projects, including any future projects that may be created in an org.

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
   - [Service Usage Consumer][406] (**optional**, for multi-project environments) provides [per-project cost and API quota attribution](#enable-per-project-cost-and-api-quota-attribution)
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

### Choose Quick Start setup if...

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
   4. Choose whether to apply granular metric filters for any Google Cloud services enabled for metric collection.
   5. Choose whether to filter metrics by tags for GCP resource types `Cloud Run Revision`, `VM Instance`, or `Cloud Function` to help control Datadog costs.
   **Note**: `VM Instance` filtering does not impact related `gcp.logging.*` metrics and does not cause any billing impact for those metrics.
9. Configure **Resource Collection** (attributes and configuration information of the resources in your Google Cloud environment, optional).
10. A summary of the changes to be made is displayed. If confirmed, the script:
    - Enables the required APIs
    - Assigns the necessary permissions to monitor each selected project and folder
    - Completes the integration setup in Datadog

[200]: https://app.datadoghq.com/integrations/google-cloud-platform
[201]: https://cloud.google.com/sdk/docs/install
[202]: /account_management/rbac/permissions/#managed-roles
[203]: /account_management/rbac/permissions/#custom-roles
[204]: https://ssh.cloud.google.com/cloudshell
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}

### Choose Terraform setup if...

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
   4. Choose whether to apply granular metric filters for any Google Cloud services enabled for metric collection.
   5. Choose whether to filter metrics by tags for GCP resource types `Cloud Run Revision`, `VM Intance`, or `Cloud Function` to help control Datadog costs.
7. Configure **Resource Collection** (attributes and configuration information of the resources in your Google Cloud environment).
8. Copy the provided **Terraform Code**.
9. Paste the code into a `.tf` file, and run the **Initialize and apply the Terraform** command. If successful, the command:
   - Enables the required APIs
   - Assigns the necessary permissions to monitor each selected project and folder
   - Completes the integration setup in Datadog

[500]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% collapse-content title="Manual" level="h4" expanded=false id="manual-setup" %}}

### Choose manual setup if...

- You need to set up access manually for a smaller number of projects or folders.
- You want more step-by-step control over assigning permissions and credentials within the GCP UI.

### Instructions

1. In the [Google Cloud integration page][600], select **+ Add GCP Account**.
2. Click **Manual**.
3. Copy the **Datadog Principal** value, and click **Open the Google Console**.
4. Create a service account:
   1. Give the service account a descriptive name, and click **Create and continue**.
   2. Under **Permissions**, search for and add the **Service Account Token Creator** role from the dropdown, and click **Continue**.
   3. Under **Principals with access**, paste the **Datadog Principal** value into the **Service account users role** field, and click **Done**.
5. Click the service account link under the **Email** column.
6. Copy the **Email** value.
7. In Datadog, paste the service account email in the **Add Service Account Email** section.
8. Configure **Metric Collection** (optional).
   1. Choose whether to disable the option for silencing monitors for expected GCE instance shutdowns and autoscaling events.
   2. Choose whether to apply tags to the metrics associated with the created service account.
   3. Choose whether to disable metric collection for specific Google Cloud services to help control Google Cloud Monitoring costs.
   4. Choose whether to apply granular metric filters for any Google Cloud services enabled for metric collection.
   5. Choose whether to filter metrics by tags for GCP resource types `Cloud Run Revision`, `VM Intance`, or `Cloud Function` to help control Datadog costs.
9. Configure **Resource Collection** (attributes and configuration information of the resources in your Google Cloud environment, optional).
10. Click **Verify and Save Account**.

[600]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### Validation

To view your metrics, use the left menu to navigate to **Metrics** > **Summary** and search for `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="The Metric Summary page in Datadog filtered to metrics beginning with GCP" style="width:100%;" >}}

### Google Cloud integrations

The Google Cloud integration collects all available [Google Cloud metrics][12] from your projects through the Google Cloud Monitoring API. Integrations are installed automatically when Datadog recognizes data being ingested from your Google Cloud account, such as BigQuery.

{{% collapse-content title="See the Google Cloud integrations Datadog collects metrics from" level="h5" %}}
{{% google-cloud-integrations %}}
{{% /collapse-content %}}

For deep dives into monitoring many of the more popular services, check out the blogs linked below.

{{% collapse-content title="Integration blogs" level="h5" %}}
[Cloud Armor][20]
: Google Cloud Armor is a network security service protecting against DDoS and application attacks.

[BigQuery][21]
: BigQuery is a serverless and multi-cloud data warehouse that can provide you with valuable insights from your business data.

[Cloud Run][22]
: Cloud Run is a fully-managed platform that lets you run your code directly on scalable infrastructure in Google Cloud.

[Cloud SQL][23]
: Cloud SQL is a fully-managed relational database service that works with MySQL, PostgreSQL, and SQL Server.

[Compute Engine][24]
: Compute Engine is a computing and hosting service that provides you with the ability to create and run virtual machines in Google Cloud.

[Dataflow][25]
: Dataflow is a fully-managed streaming analytics service that uses autoscaling and real-time data processing.

[Eventarc][26]
: Eventarc is a fully-managed service enabling you to build event-driven architectures.

[Google Kubernetes Engine (GKE)][27]
: GKE is a fully-managed Kubernetes service.

[Private Service Connect][28]
: Private Service Connect lets you access managed Google services privately from within your VPC network.

[Security Command Center][29]
: Security Command Center provides posture management and threat detection for code, identities, and data.

[Vertex AI][30]
: Vertex AI is a fully-managed generative AI development platform.
{{% /collapse-content %}}

### Limit metric collection filters

You can choose which services and resources to collect metrics from. This can help control costs by reducing the number of API calls made on your behalf.

{{% collapse-content title="Limit metric collection by Google Cloud service, and by granular metric filters" level="h4" %}}

Under the **Metric Collection** tab in Datadog's [Google Cloud integration page][11], deselect the metric namespaces to exclude.

To apply granular metric filtering for enabled services, click on the service in question and apply your filters in the `Add filters for gcp.<service>` field.

{{< img src="integrations/google_cloud_platform/limit_metric_collection_2025-11-11.png" alt="The metric collection tab in the Datadog Google Cloud integration page, with the AI Platform service expanded to display the Add filters for gcp.ml field" style="width:80%;">}}

**Example filters**:

`subscription.*` `topic.*`
: Limit collection to metrics **matching either** `gcp.<service>.subscription.*` **or** `gcp.<service>.topic.*`

`!*_cost` `!*_count`
: Limit collection to metrics **matching neither** `gcp.<service>.*_cost` **nor** `gcp.<service>.*_count`

`snapshot.*` `!*_by_region`
: Limit collection to metrics **matching** `gcp.<service>.snapshot.*` **but not matching** `gcp.<service>.*_by_region`

{{% /collapse-content %}}

{{% collapse-content title="Limit metric collection by Google Cloud region, and by global resources" level="h4" %}}

Under the **Metric Collection** tab in Datadog's [Google Cloud integration page][11], deselect which region for Datadog to exclude from metrics collection.

Additionally, users can specify additional locations not listed and disable any global metrics not associated with a region.

{{% /collapse-content %}}

{{% collapse-content title="Limit metric collection by host or Cloud Run instance" level="h4" %}}
1. Assign a tag (such as `datadog:true`) to the hosts or Cloud Run instances you want to monitor with Datadog.
2. Under the **Metric Collection** tab in Datadog's [Google Cloud integration page][11], enter the tags in the **Limit Metric Collection Filters** textbox. Only hosts that match one of the defined tags are imported into Datadog. You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. This example includes all `c1*` sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's documentation on [Creating and managing labels][44] for more details.
{{% /collapse-content %}}

In the below example, only Google Cloud hosts with the label `datadog:true` are monitored by Datadog:

{{< img src="integrations/google_cloud_platform/limit_metric_collection.png" alt="The fields to limit metric collection in the Google Cloud integration tile" style="width:100%;" >}}

#### Best practices for monitoring multiple projects

##### Enable per-project cost and API quota attribution

By default, Google Cloud attributes the cost of monitoring API calls, as well as API quota usage, to the project containing the service account for this integration. As a best practice for Google Cloud environments with multiple projects, enable per-project cost attribution of monitoring API calls and API quota usage. With this enabled, costs and quota usage are attributed to the project being *queried*, rather than the project containing the service account. This provides visibility into the monitoring costs incurred by each project, and also helps to prevent reaching API rate limits.

To enable this feature:
1. Ensure that the Datadog service account has the [Service Usage Consumer][410] role at the desired scope (folder or organization).
2. Click the **Enable Per Project Quota** toggle in the **Projects** tab of the [Google Cloud integration page][411].

[410]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[411]: https://app.datadoghq.com/integrations/google-cloud-platform/

## Log collection

Forwarding logs from your Google Cloud environment enables near real-time monitoring of the resources and activities taking place in your organization or folder. You can set up [log monitors][37] to be notified of issues, use [Cloud SIEM][38] to detect threats, or leverage [Watchdog][39] to identify unknown issues or anomalous behavior.

Use the [Datadog Dataflow template][14] to batch and compresses your log events before forwarding them to Datadog through [Google Cloud Dataflow][15]. This is the most network-efficient way to forward your logs. To specify which logs are forwarded, configure the [Google Cloud Logging sink][40] with any inclusion or exclusion queries using Google Cloud's [Logging query language][56]. See the [Google Cloud Log Forwarding Setup page][67] for log forwarding setup options (including Terraform) and instructions.

<div class="alert alert-danger">The <b>Dataflow API</b> must be enabled to use Google Cloud Dataflow. See <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>Enabling APIs</b></a> in the Google Cloud documentation for more information.</div>

## Leveraging the Datadog Agent

After the Google Cloud integration is configured, Datadog automatically starts collecting Google Cloud metrics. However, you can leverage the Datadog Agent to gather deeper insights into your infrastructure.

The [Datadog Agent][31] provides the [most granular, low-latency metrics][32] from your infrastructure, delivering real-time insights into CPU, memory, disk usage, and more for your Google Cloud hosts.
The Agent can be installed on any host, including [GKE][33].

The Agent also supports a wide range of [integrations][34], enabling you to extend visibility into specific services and databases running on your hosts.

[Traces][35] collected through the Agent enable comprehensive Application Performance Monitoring (APM), helping you understand end-to-end service performance.

[Logs][57] collected through the Agent provide visibility into your Google Cloud resources, and the activities taking place in your Google Cloud environment.

For the full list of benefits of installing the Agent on your cloud instances, see [Why should I install the Datadog Agent on my cloud instances?][36]

## Resource changes collection

Resource changes collection allows you to monitor infrastructure changes in your Google Cloud environment. When Google's Cloud Asset Inventory detects changes in your cloud resources, an event is forwarded to Datadog's [Event Management][62] through a Cloud Pub/Sub topic and subscription. Use these events to be proactively notified of risky changes in your infrastructure, and to assist with troubleshooting.

For detailed setup instructions, see the [resource changes collection section][18] of the Google Cloud integration documentation.

## Explore related services

### Private Service Connect

<div class="alert alert-info">Private Service Connect is only available for the US5 and EU Datadog sites.</div>

Use the [Google Cloud Private Service Connect integration][58] to visualize connections, data transferred, and dropped packets through Private Service Connect. This gives you visibility into important metrics from your Private Service Connect connections, both for producers as well as consumers.
[Private Service Connect (PSC)][59] is a Google Cloud networking product that enables you to access [Google Cloud services][60], [third-party partner services][61], and company-owned applications directly from your Virtual Private Cloud (VPC).

See [Access Datadog privately and monitor your Google Cloud Private Service Connect usage][28] in the Datadog blog for more information.

### Google Cloud Run

Use the [Google Cloud Run integration][42] to get detailed information on your Cloud Run containers, such as metrics and audit logs.

### Cloud Cost Management (CCM)

Datadog's [Google Cloud Cost Management][45] provides insights for engineering and finance teams to understand how infrastructure changes impact costs, allocate spend across your organization, and identify potential improvements.

### Cloud SIEM

Cloud SIEM provides real-time analysis of operational and security logs, while using out-of-the-box integrations and rules to detect and investigate threats.
To use this feature, see [Getting Started with Cloud SIEM][46].

To view security findings from [Google Cloud Security Command Center][47] in Cloud SIEM, toggle the **Enable collection of security findings** option under the **Security Findings** tab and follow the setup instructions on the [Google Cloud Security Command Center guide][48].

{{< img src="integrations/google_cloud_platform/security_findings.png" alt="The security findings tab in the Google Cloud integration tile" style="width:90%;" >}}

### Cloud Security

Datadog Cloud Security delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure.
Check out the [Setting up Cloud Security guide][49] to get started.

After setting up Cloud Security, toggle the **Enable Resource Collection** option under the **Resource Collection** tab to start collecting configuration data for the [Resource Catalog][50] and Cloud Security. Then, follow these instructions to enable [Misconfigurations and Identity Risks (CIEM)][51] on Google Cloud.

{{< img src="integrations/google_cloud_platform/resource_collection.png" alt="The resource collection tab in the Google Cloud integration tile" style="width:100%;" >}}

### Expanded BigQuery monitoring

You can get granular visibility into your BigQuery environments to monitor the performance of your BigQuery jobs and the quality of your BigQuery data. See the [Expanded BigQuery monitoring section][65] in the main Google Cloud integration page for more information and setup instructions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://cloud.google.com/iam/docs/service-accounts-create
[3]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[4]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[5]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[6]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[7]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[8]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[10]: https://console.cloud.google.com/
[11]: https://app.datadoghq.com/integrations/google-cloud-platform
[12]: https://cloud.google.com/monitoring/api/metrics_gcp
[13]: https://cloud.google.com/compute/docs/labeling-resources
[14]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[15]: https://cloud.google.com/dataflow
[18]: /integrations/google_cloud_platform/#resource-changes-collection
[19]: /help/
[20]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
[21]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[22]: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
[23]: https://www.datadoghq.com/blog/monitor-google-cloud-sql/
[24]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog/
[25]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[26]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
[27]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[28]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[29]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[30]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[31]: /agent/
[32]: /developers/guide/data-collection-resolution-retention/#pagetitle:~:text=n/a-,Infrastructure,-Agent%20integrations
[33]: /integrations/gke/?tab=standard
[34]: /integrations/
[35]: /tracing/
[36]: /agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[37]: /monitors/types/log/
[38]: /security/cloud_siem/
[39]: /watchdog/
[40]: https://cloud.google.com/logging/docs/routing/overview#sinks
[41]: /integrations/google_cloud_platform/#setup
[42]: /integrations/google_cloud_run/
[43]: /integrations/google_cloud_run/#log-collection
[44]: /cloud_cost_management/
[45]: /cloud_cost_management/setup/google_cloud/
[46]: /getting_started/cloud_siem/
[47]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[48]: /integrations/google_cloud_security_command_center/#installation
[49]: /security/cloud_security_management/setup/
[50]: /infrastructure/resource_catalog/
[51]: /security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[52]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[53]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[54]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[55]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[56]: https://cloud.google.com/logging/docs/view/logging-query-language
[57]: /logs/
[58]: /integrations/google_cloud_private_service_connect/
[59]: https://cloud.google.com/vpc/docs/private-service-connect
[60]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[61]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[62]: https://app.datadoghq.com/event/overview
[63]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[65]: /integrations/google_cloud_platform/#expanded-bigquery-monitoring
[66]: https://cloud.google.com/identity/docs/overview
[67]: https://docs.datadoghq.com/logs/guide/google-cloud-log-forwarding
