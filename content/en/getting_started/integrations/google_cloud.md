---
title: Getting Started with Google Cloud
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

Integrating your Google Cloud projects with Datadog allows you to monitor your Google Cloud services within the Datadog platform.
This guide provides an overview of how to get started with the Datadog Google Cloud integration.

## Prerequisites
1) Create a [Datadog account][1]
2) Set up a [Service Account][2] in any of your Google Cloud projects
3) Review these Google Cloud Prerequisites:

{{% site-region region="us,us3,us5,eu,ap1" %}}
- If your organization restricts identities by domain, you must add Datadog's customer identity `C0147pk0i` as an allowed value in your policy.
{{% /site-region %}}
- Datadog does not support [scoping projects][42] that pull in metrics from multiple other projects.
- The Google Cloud integration requires the below APIs to be enabled **for each of the projects** you want to monitor:

[Cloud Monitoring API][7] 
: Allows Datadog to query your Google Cloud metric data.

[Compute Engine API][8] 
: Allows Datadog to discover compute instance data.

[Cloud Asset API][9]
: Allows Datadog to request Google Cloud resources and link relevant labels to metrics as tags.

[Cloud Resource Manager API][10] 
: Allows Datadog to append metrics with the correct resources and tags.

[IAM API][11]
: Allows Datadog to authenticate with Google Cloud.

[Google Cloud Billing API][12] 
: Enables accurate billing for API calls.

<div class="alert alert-info">You can confirm if these APIs are enabled by heading to <a href="https://console.cloud.google.com/apis/dashboard"><b>Enabled APIs & Services</a></b> under each project in your Google Cloud workspace.</div>

## Setup 

For the most comprehensive level of monitoring in your Google Cloud environment, integrate Datadog with [Google Cloud][4] using [service account impersonation][5] at the organization or folder level.

After reviewing the above [Prerequisites][3], follow these step-by-step instructions to set up the Google Cloud integration:

{{% collapse-content title="1. Create a Google Cloud service account in the default project" level="h5" %}}
1. Open your [Google Cloud console][53].
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Click **Create service account** at the top.
4. Give the service account a unique name.
5. Click **Done** to complete creating the service account.
{{% /collapse-content %}} 

{{% collapse-content title="2. Add the service account at the organization or folder level" level="h5" %}}
1. In the Google Cloud console, go to the **IAM** page.
2. Select a folder or organization.
3. To grant a role to a principal that does not already have other roles on the resource, click **Grant Access**, then enter the email of the service account you created earlier.
4. Enter the service account's email address.
5. Assign the following roles:
- Compute Viewer
- Monitoring Viewer
- Cloud Asset Viewer
- Browser
6. Click **Save**.

**Note**: The `Browser` role is only required in the default project (<SERVICE_ACCOUNT_NAME>@<DEFAULT_PROJECT>.iam.gserviceaccount.com) of the service account. Other projects require only the other listed roles.
{{% /collapse-content %}}

{{% collapse-content title="3. Add the Datadog principal to your service account" level="h5" %}}
1. In Datadog, navigate to **Integrations** > [**Google Cloud Platform**][54].
2. Click **Add Google Cloud Account**. 
If you have no configured projects, you are automatically redirected to this page.
3. If you have not generated a Datadog principal for your org, click the **Generate Principal** button.
4. Copy your Datadog principal and keep it for the next section.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog interface, showing the 'Add New GCP Account' flow. The first step, 'Add Datadog Principal to Google,' features a text box where a user can generate a Datadog Principal and copy it to their clipboard. The second step, 'Add Service Account Email,' features a text box that the user can complete in section 4." style="width:70%;">}}

**Note**: Keep this window open for Section 4.

5. In the [Google Cloud console][55], under the **Service Accounts** menu, find the service account you created in Section 1.
6. Go to the **Permissions** tab and click **Grant Access**.

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud console interface, showing the Permissions tab under Service Accounts." style="width:70%;">}}

7. Paste your Datadog principal into the **New principals** text box.
8. Assign the role of **Service Account Token Creator**.
9. Click **Save**.

**Note**: If you previously configured access using a shared Datadog principal, you can revoke the permission for that principal after you complete these steps.
{{% /collapse-content %}}

{{% collapse-content title="4. Complete the integration setup in Datadog" level="h5" %}}
1. In your Google Cloud console, navigate to the **Service Account** > **Details** tab. On this page, find the email associated with this Google service account. It has the format `<SA_NAME>@<PROJECT-ID>.iam.gserviceaccount.com`.
2. Copy this email.
3. Return to the integration configuration tile in Datadog (where you copied your Datadog principal in the previous section).
4. In the box under **Add Service Account Email**, paste the email you previously copied.
5. Click **Verify and Save Account**.
{{% /collapse-content %}}

After finishing these steps, metrics appear in Datadog after approximately **15 minutes**.

## Metric collection

The Google Cloud integration collects all available [Google Cloud metrics][17] from your projects through the Google Cloud Monitoring API.

{{% collapse-content title="Click here for a sample of the Google Cloud metrics Datadog collects" level="h5" %}}
{{% google-cloud-integrations %}}
{{% /collapse-content %}} 

You can find your Google Cloud metrics in the Metrics Summary page in the Datadog platform.
To view your metrics, use the left menu to navigate to **Metrics** > **Summary** and search for `gcp`:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" style="width:100%;" >}}

### Limit metric collection filters

Limit the GCE/GKE instances and Cloud Run revisions that are pulled into Datadog by entering tags in the **Limit Metric Collection Filters** text boxes under the **General** tab of the Google Cloud Integration tile.
Only Google Cloud hosts with **labels** that match these defined tags are imported into Datadog. 

See Google's documentation on [Creating and managing labels][19] for more details on adding labels to your Google Cloud hosts.

In the below example, only Google Cloud hosts with the label `datadog:true` are monitored by Datadog: 

{{< img src="integrations/google_cloud_platform/limit_metric_collection.mp4" video=true style="width:100%;" >}}

Use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. 
This example includes all c1* sized instances, but excludes staging hosts:

```text
datadog:true,env:production,!env:staging,instance-type:c1.*
```

## Log collection

Use Google Cloud's [Pub/Sub to Datadog template][22] to batch and compress your log events before forwarding them to Datadog. The template leverages [Google Cloud Dataflow][21] for a high degree of network efficiency.

Follow [the instructions listed here][33] to set up Log Collection. For a deep dive into the benefits of the Pub/Sub to Datadog template, read [Stream your Google Cloud logs to Datadog with Dataflow][90] in the Datadog blog.

<div class="alert alert-warning"><b>Note</b>: The <b>Dataflow API</b> must be enabled to use Google Cloud Dataflow. See <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>Enabling APIs</b></a> in the Google Cloud documentation for more information.</div>

Alternatively, to collect logs from applications running in GCE or GKE, you can also use the [Datadog Agent][32].

## Google Cloud integrations

You can send monitoring data to Datadog from 35+ integrations for Google Cloud services. The [Integrations page][26] provides a full listing of the available integrations. Many of these integrations are installed by default when Datadog recognizes data being ingested in from your Google Cloud account.

See the blog links below for deep dives into monitoring many of the more popular services.

{{% collapse-content title="Integration blogs" level="h5" %}}

- [Cloud Armor][91]
- [BigQuery][92]
- [Cloud Run][93]
- [Cloud SQL][94]
- [Compute Engine][95]
- [Dataflow][96]
- [Eventarc][97]
- [Google Kubernetes Engine (GKE)][98]
- [Private Service Connect][99]
- [Security Command Center][100]
- [Vertex AI][101]

{{% /collapse-content %}}

## Leveraging the Datadog Agent

After the Google Cloud integration is configured, Datadog automatically starts collecting Google Cloud metrics. However, you can leverage the Datadog Agent to gather deeper insights into your infrastructure.

The [Datadog Agent][25] provides the [most granular, low-latency metrics][47] from your infrastructure, delivering real-time insights into CPU, memory, disk usage, and more for your Google Cloud hosts. 
The Agent can be installed on any host, including [GKE][28].

The Agent also supports a wide range of [integrations][29], enabling you to extend visibility into specific services and databases running on your hosts. 

[Traces][31] collected through the Trace Agent enable comprehensive Application Performance Monitoring (APM), helping you understand end-to-end service performance. 

For the full list of benefits of installing the Agent on your cloud instances, see [Why should I install the Datadog Agent on my cloud instances?][27]

## Explore related services

### Private Service Connect 
**(Only available in US5 and EU1)**

[Private Service Connect (PSC)][45] is a Google Cloud networking product that enables you to access [Google Cloud services][43], [third-party partner services][44], and company-owned applications directly from your Virtual Private Cloud (VPC).

Get started with the [Google Cloud Private Service Connect guide.][46]

### Google Cloud Run

To begin monitoring serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform][6] integration. 

The [Google Cloud Run][34] page provides a list of out-of-the-box metrics collected by the Google Cloud integration, along with instructions for [Log Collection through Dataflow][35].

### Cloud Cost Management (CCM)

[Cloud Cost Management][50] provides insights for engineering and finance teams to understand how infrastructure changes impact costs, allocate spend across your organization, and identify potential improvements.

To use Google Cloud Cost Management in Datadog, [follow these steps][51].

### Security

### Cloud SIEM

Cloud SIEM provides real-time analysis of operational and security logs, while using out-of-the-box integrations and rules to detect and investigate threats.
To use this feature, see [Getting Started with Cloud SIEM][36].

To view security findings from [Google Cloud Security Command Center][37] in Cloud SIEM, toggle the **Enable collection of security findings** option under the **Security Findings** tab & follow the setup instructions on the [Google Cloud Security Command Center guide][38].

{{< img src="integrations/google_cloud_platform/security_findings.png" style="width:90%;" >}}

### Cloud Security Management

Datadog Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure.
Check out the [Setting up Cloud Security Management guide][39] to get started.

After setting up CSM, toggle the **Enable Resource Collection** option under the **Resource Collection** tab to start collecting configuration data for the [Resource Catalog][41] and CSM. Then, follow these instructions to enable [Misconfigurations and Identity Risks (CIEM)][40] on Google Cloud.

{{< img src="integrations/google_cloud_platform/gcp_resource_collection.png" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://cloud.google.com/iam/docs/service-accounts-create
[3]: /getting_started/integrations/google_cloud/#prerequisites
[4]: https://cloud.google.com/gcp
[5]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[6]: /integrations/google_cloud_platform/?tab=project#setup
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
[18]: /integrations/guide/cloud-metric-delay/
[19]: https://cloud.google.com/compute/docs/labeling-resources
[21]: https://cloud.google.com/dataflow
[22]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[23]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[24]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[25]: /agent/
[26]: /integrations/?q=google#all
[27]: /agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[28]: /integrations/gke/?tab=standard
[29]: /integrations/
[30]: /developers/custom_checks/
[31]: /tracing/
[32]: /agent/logs/?tab=tailfiles
[33]: /integrations/google_cloud_platform/?tab=dataflowmethodrecommended#log-collection
[34]: /integrations/google_cloud_run/
[35]: /integrations/google_cloud_run/#log-collection
[36]: /getting_started/cloud_siem/
[37]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[38]: /integrations/google_cloud_security_command_center/#installation
[39]: /security/cloud_security_management/setup/
[40]: /security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[41]: /infrastructure/resource_catalog/
[42]: https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.
[43]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[44]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[45]: https://cloud.google.com/vpc/docs/private-service-connect
[46]: /integrations/google_cloud_private_service_connect/
[47]: /developers/guide/data-collection-resolution-retention/#pagetitle:~:text=n/a-,Infrastructure,-Agent%20integrations
[48]: http://docs.datadoghq.com/getting_started/integrations/google_cloud/#explore-related-products
[49]: /database_monitoring/
[50]: /cloud_cost_management/
[51]: /cloud_cost_management/google_cloud/
[53]: https://console.cloud.google.com/
[54]: https://app.datadoghq.com/integrations/google-cloud-platform
[55]: https://console.cloud.google.com/
[56]: /integrations/google_app_engine/
[57]: /integrations/google_bigquery/
[58]: /integrations/google_cloud_bigtable/
[59]: /integrations/google_cloudsql/
[60]: /integrations/google_cloud_apis/
[61]: /integrations/google_cloud_armor/
[62]: /integrations/google_cloud_composer/
[63]: /integrations/google_cloud_dataproc/
[64]: /integrations/google_cloud_dataflow/
[65]: /integrations/google_cloud_filestore/
[66]: /integrations/google_cloud_firestore/
[67]: /integrations/google_cloud_interconnect/
[68]: /integrations/google_cloud_iot/
[69]: /integrations/google_cloud_loadbalancing/
[70]: /integrations/google_stackdriver_logging/
[71]: /integrations/google_cloud_redis/
[72]: /integrations/google_cloud_router/
[73]: /integrations/google_cloud_run/
[74]: /integrations/google_cloud_security_command_center/
[75]: /integrations/google_cloud_tasks/
[76]: /integrations/google_cloud_tpu/
[77]: /integrations/google_compute_engine/
[78]: /integrations/google_container_engine/
[79]: /integrations/google_cloud_datastore/
[80]: /integrations/google_cloud_firebase/
[81]: /integrations/google_cloud_functions/
[82]: /integrations/google_kubernetes_engine/
[83]: /integrations/google_cloud_ml/
[84]: /integrations/google_cloud_private_service_connect/
[85]: /integrations/google_cloud_pubsub/
[86]: /integrations/google_cloud_spanner/
[87]: /integrations/google_cloud_storage/
[88]: /integrations/google_cloud_vertex_ai/
[89]: /integrations/google_cloud_vpn/
[90]: https://www.datadoghq.com/blog/stream-logs-datadog-dataflow-template/
[91]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
[92]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[93]: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
[94]: https://www.datadoghq.com/blog/monitor-google-cloud-sql/
[95]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog/
[96]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[97]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
[98]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[99]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[100]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[101]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[102]: /integrations/google_cloud_platform/#setup
