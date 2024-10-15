---
title: Getting Started with Google Cloud
---

## Overview
This guide provides an overview of how to get started with the Datadog Google Cloud integration.

Integrating your Google Cloud projects with Datadog allows you to monitor real-time metrics & logs from your GCE and GKE compute instances.

## Prerequisites
1) Create a [Datadog account][1]
2) Set up a [Service Account][2] in Google Cloud
3) Review these Google Cloud [Prerequisites][3]:

- If your organization restricts identities by domain, you must add Datadog's customer identity `C0147pk0i` as an allowed value in your policy.
- Ensure that any projects being monitored are **not** configured as [scoping projects][42] that pull in metrics from multiple other projects.

- The Google Cloud integration requires the below APIs to be enabled **for each of the projects** you want to monitor:

[Cloud Monitoring API][7] 
: Allows Datadog to query your Google Cloud metric data.

[Compute Engine API][8] 
: Allows Datadog to discover compute instance data.

[Cloud Asset API][9]
: Allows Datadog to request Google Cloud resources and link them to relevant metric tags.

[Cloud Resource Manager API][10] 
: Allows Datadog to append metrics with the correct resources and tags.

[IAM API][11]
: Allows Datadog to authenticate with Google Cloud.

[Google Cloud Billing API][12] 
: Enables accurate billing for API calls.

<div class="alert alert-info">You can confirm if these APIs are enabled by heading to <a href="https://console.cloud.google.com/apis/dashboard"><b>Enabled APIs & Services</a></b> under each project in your Google Cloud workspace.</div>


## Setup 

You can integrate Datadog with [Google Cloud][4] using [service account impersonation][5] and project discovery. Service account impersonation enables Datadog to automatically discover and monitor new projects as they are created within the assigned scope, providing seamless monitoring as your Google Cloud environment grows.

After reviewing the above [Prerequisites][52], follow these step-by-step instructions to set up the Google Cloud integration:

{{% collapse-content title=" 1. Create your Google Cloud service account" level="h5" %}}
1. Open your [Google Cloud console][53].

2. Navigate to **IAM & Admin** > **Service Accounts**.

3. Click on **Create service account** at the top.

4. Give the service account a unique name, then click **Create and continue**.

5. Add the following roles to the service account:
- Monitoring Viewer

- Compute Viewer

- Cloud Asset Viewer

- Browser

6. Click **Continue**, then **Done** to complete creating the service account.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Google Cloud console interface, showing the 'Create service account' flow. Under 'Grant this service account access to project', the four roles in the instructions are added." style="width:70%;">}}
{{% /collapse-content %}} 

{{% collapse-content title="2. Add the Datadog principal to your service account" level="h5" %}}
1. In Datadog, navigate to the [**Integrations** > **Google Cloud Platform**][54].

2. Click on **Add Google Cloud Account**. 
If you have no configured projects, you are automatically redirected to this page.

3. If you have not generated a Datadog principal for your org, click the **Generate Principal** button.

4. Copy your Datadog principal and keep it for the next section.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog interface, showing the 'Add New GCP Account' flow. The first step, 'Add Datadog Principal to Google,' features a text box where a user can generate a Datadog Principal and copy it to their clipboard. The second step, 'Add Service Account Email,' features a text box that the user can complete in section 3." style="width:70%;">}}

Keep this window open for Section 3.

5. In the [Google Cloud console][55], under the **Service Accounts** menu, find the service account you created in Section 1.

6. Go to the **Permissions** tab and click on **Grant Access**.

   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud console interface, showing the Permissions tab under Service Accounts." style="width:70%;">}}

7. Paste your Datadog principal into the **New principals** text box.

8. Assign the role of **Service Account Token Creator** and click **Save**.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Google Cloud console interface, showing an 'Add principals' box and an 'Assign roles' interface." style="width:70%;">}}

**Note**: If you previously configured access using a shared Datadog principal, you can revoke the permission for that principal after you complete these steps.
{{% /collapse-content %}}

{{% collapse-content title="3. Complete the integration setup in Datadog" level="h5" %}}
1. In your Google Cloud console, navigate to the **Service Account** > **Details** tab. There, you can find the email associated with this Google service account. It resembles `<sa-name>@<project-id>.iam.gserviceaccount.com`.

2. Copy this email.

3. Return to the integration configuration tile in Datadog (where you copied your Datadog principal in the previous section).

4. In the box under **Add Service Account Email**, paste the email you previously copied.

5. Click on **Verify and Save Account**.
{{% /collapse-content %}}

After finishing these steps, metrics will appear in Datadog after approximately **15 minutes**.

{{% collapse-content title="(Optional) Assign roles to other projects" level="h5" %}}
Automatic project discovery simplifies the process of adding additional projects to be monitored. If you grant your service account access to other projects, folders, or orgs, Datadog discovers these projects (and any projects nested in the folders or orgs) and automatically adds them to your integration tile.

1. Make sure you have the appropriate permissions to assign roles at the desired scope:
- Project IAM Admin (or higher)
- Folder Admin
- Organization Admin
2. In the Google Cloud console, go to the **IAM** page.
3. Select a project, folder, or organization.
4. To grant a role to a principal that does not already have other roles on the resource, click **Grant Access**, then enter the email of the service account you created earlier.
5. Assign the following roles:
- Compute Viewer
- Monitoring Viewer
- Cloud Asset Viewer (**Note**: The Browser role is only required in the default project of the service account).
6. Click **Save**.
{{% /collapse-content %}}

## Metric collection

The Google Cloud integration collects [**all GA Google Cloud metrics**][17] from your projects through the Google Cloud Monitoring API.

{{% collapse-content title="Click here for a sample of the Google Cloud metrics Datadog collects" level="h5" %}}
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
{{% /collapse-content %}} 

You can find your Google Cloud metrics in the Metrics Summary page in the Datadog platform.
To view your metrics, navigate to `Metrics > Summary` and search for `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" style="width:100%;" >}}

### Filtering metric collection

You can limit the GCE/GKE instances & Cloud Run Revisions that are pulled into Datadog by entering tags in the **Limit Metric Collection Filters** text boxes under the **General** tab.
Only resources that match one of the defined tags are imported into Datadog. 

You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. 
This example includes all c1* sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's documentation on [Creating and managing labels][19] for more details on adding labels to your Google Cloud hosts.

For more information on how to control your resource costs, see the [Google Cloud Integration Billing page][20].


## Log collection

Forward logs from your Google Cloud services to Datadog using [Google Cloud Dataflow][21] and the [Datadog template][22]. This method provides both compression and batching of events before they are forwarded to Datadog. 

Follow [the instructions listed here][33] to set up Log Collection.

<div class="alert alert-warning"><b>Note</b>: The <b>Dataflow API</b> must be enabled to use Google Cloud Dataflow. See <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>Enabling APIs</b></a> in the Google Cloud documentation for more information.</div>

Alternatively, to collect logs from applications running in GCE or GKE, you can also use the [Datadog Agent][32].

## Google Cloud integrations

Our [Integrations page][26] provides a full listing of the available sub-integrations for Google Cloud. 
Many of these integrations are installed by default when Datadog recognizes data being ingested in from your Google Cloud account.

## Leveraging the Datadog Agent for greater visibility

After the Google Cloud integration is configured, Datadog automatically starts collecting Google Cloud metrics. However, you can leverage the Datadog Agent to gather deeper insights into your infrastructure.

The [Datadog Agent][25] provides the [most granular, low-latency metrics from your infrastructure][47], delivering real-time insights into CPU, memory, disk usage, and more for your Google Cloud hosts. 
The Agent can be installed on any host, including [GKE][28].

The Agent also supports a wide range of [integrations][29], enabling you to extend visibility into specific services and databases running on your hosts. 

[Traces][31] collected through the Trace Agent enable comprehensive Application Performance Monitoring (APM), helping you understand end-to-end service performance. 

For a full list of benefits with installing the Agent on your cloud instances, see [Why should I install the Datadog Agent on my cloud instances?][27]



## Explore related services

### Private Service Connect 
**(Only available in US5 & US1)**

[Private Service Connect (PSC)][45] is a Google Cloud networking product that enables you to access [Google Cloud services][43], [third-party partner services][44], and company-owned applications directly from your Virtual Private Cloud (VPC).

Get started with the [Google Cloud Private Service Connect guide.][46]

### Google Cloud Run

To begin monitoring serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform][6] integration. 

The [Google Cloud Run][34] page provides a list of out-of-the-box metrics collected by the Google Cloud integration, along with instructions for [Log Collection through Dataflow][35].

### Cloud Cost Management (CCM)

[Cloud Cost Management][50] provides insights for engineering and finance teams to understand how infrastructure changes impact costs, allocate spend across your organization, and identify potential improvements.

To use Google Cloud Cost Management in Datadog, [follow these steps][51].

### Security

{{< tabs >}}
{{% tab "Cloud SIEM" %}}

With Cloud SIEM, you can analyze operational and security logs in real time, while utilizing out-of-the-box integrations and rules to detect threats and investigate them.
To set this feature up, see [Getting Started with Cloud SIEM][36].

To view security findings from [Google Cloud Security Command Center][37] in Cloud SIEM, toggle the **Enable collection of security findings** option under the **Security Findings** tab & follow the setup instructions on the [Google Cloud Security Command Center guide][38].

{{< img src="integrations/google_cloud_platform/security_findings.png" style="width:100%;" >}}

[36]: https://docs.datadoghq.com/getting_started/cloud_siem/
[37]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[38]: https://docs.datadoghq.com/integrations/google_cloud_security_command_center/#installation

{{% /tab %}}
{{% tab "Cloud Security Management" %}}


Datadog Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure.

Check out the [Setting up Cloud Security Management guide][39] to get started.

After setting up CSM, toggle the **Enable Resource Collection** option under the **Resource Collection** tab to start collecting configuration data for the [Resource Catalog][41] and CSM. Then, follow these instructions to enable [Misconfigurations and Identity Risks (CIEM)][40] on Google Cloud.

{{< img src="integrations/google_cloud_platform/gcp_resource_collection.png" style="width:100%;" >}}

[39]: https://docs.datadoghq.com/security/cloud_security_management/setup/
[40]: https://docs.datadoghq.com/security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[41]: https://docs.datadoghq.com/infrastructure/resource_catalog/

{{% /tab %}}
{{< /tabs >}}

### Database Monitoring (DBM)
Use [Database Monitoring (DBM)][49] to gain increased insight on performance metrics, host health and query samples for your Google Cloud SQL databases.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://cloud.google.com/iam/docs/service-accounts-create
[3]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=project#prerequisites
[4]: https://cloud.google.com/gcp?utm_source=google&utm_medium=cpc&utm_campaign=emea-ie-all-en-bkws-all-all-trial-b-gcp-1707574&utm_content=text-ad-none-any-DEV_c-CRE_669760174288-ADGP_Hybrid+%7C+BKWS+-+BRO+%7C+Txt+-+GCP+-+General+-+v3-KWID_43700077708210645-kwd-14471151-userloc_1007850&utm_term=KW_gcp-NET_g-PLAC_&&gad_source=1&gclid=Cj0KCQjwjY64BhCaARIsAIfc7YbR2kdAZ5vGSkq1FDDHkHRnzAX7KcFTlFxIfOUnS86LyRc9Y1TerXEaAmOMEALw_wcB&gclsrc=aw.ds&hl=en
[5]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[6]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=project#setup
[7]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[8]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[9]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[10]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[11]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[12]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[13]: https://cloud.google.com/iam/docs/understanding-roles#browser
[14]: https://cloud.google.com/iam/docs/understanding-roles#monitoring.viewer
[15]: https://cloud.google.com/iam/docs/understanding-roles#compute.viewer
[16]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[17]: https://cloud.google.com/monitoring/api/metrics_gcp
[18]: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
[19]: https://cloud.google.com/compute/docs/labeling-resources
[20]: https://docs.datadoghq.com/account_management/billing/google_cloud/
[21]: https://cloud.google.com/dataflow
[22]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[23]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[24]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[25]: https://docs.datadoghq.com/agent/
[26]: https://docs.datadoghq.com/integrations/?q=google#all
[27]: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[28]: https://docs.datadoghq.com/integrations/gke/?tab=standard
[29]: https://docs.datadoghq.com/integrations/
[30]: https://docs.datadoghq.com/developers/custom_checks/
[31]: https://docs.datadoghq.com/tracing/
[32]: https://docs.datadoghq.com/agent/logs/?tab=tailfiles
[33]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended#log-collection
[34]: https://docs.datadoghq.com/integrations/google_cloud_run/
[35]: https://docs.datadoghq.com/integrations/google_cloud_run/#log-collection
[36]: https://docs.datadoghq.com/getting_started/cloud_siem/
[37]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[38]: https://docs.datadoghq.com/integrations/google_cloud_security_command_center/#installation
[39]: https://docs.datadoghq.com/security/cloud_security_management/setup/
[40]: https://docs.datadoghq.com/security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[41]: https://docs.datadoghq.com/infrastructure/resource_catalog/
[42]: https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.
[43]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[44]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[45]: https://cloud.google.com/vpc/docs/private-service-connect
[46]: https://docs.datadoghq.com/integrations/google_cloud_private_service_connect/
[47]: https://docs.datadoghq.com/developers/guide/data-collection-resolution-retention/#pagetitle:~:text=n/a-,Infrastructure,-Agent%20integrations
[48]: http://localhost:1313/getting_started/integrations/google_cloud/#explore-related-products
[49]: https://docs.datadoghq.com/database_monitoring/
[50]: https://docs.datadoghq.com/cloud_cost_management/
[51]: https://docs.datadoghq.com/cloud_cost_management/google_cloud/
[52]: https://docs.datadoghq.com/getting_started/integrations/google_cloud/#prerequisites
[53]: https://console.cloud.google.com/
[54]: https://app.datadoghq.com/integrations/google-cloud-platform
[55]: https://console.cloud.google.com/