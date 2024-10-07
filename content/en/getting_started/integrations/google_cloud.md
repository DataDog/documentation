---
title: Getting Started with Google Cloud
---

## Overview
This guide provides an overview how to get started with the Google Cloud (GCP) integration with Datadog.
Integrating your Google Cloud projects with Datadog allows you to:

- Monitor your GCE infrastructure directly within Datadog
- Search through GCP hosts using automatically imported GCE host tags & GCE labels
- View metrics from your GCP projects
- Manage and view logs from GCP in Datadog

## Prerequisites
- Create a [Datadog account][1]
- Set up a [Service Account][2] in GCP
- Review these GCP [Prerequisites][3]

## Setup 

You can integrate Datadog with [Google Cloud][4] using [service account impersonation][5] and project discovery. Service account impersonation enables Datadog to automatically discover and monitor new projects as they are created within the assigned scope, providing seamless monitoring as your Google Cloud environment grows.

Service account impersonation and automatic project discovery require specific APIs to be enabled to monitor your projects.

Before setting up the integration, enable the below APIs for **each of the projects** you want to monitor:

[Cloud Monitoring API][7] 
: Allows Datadog to query your Google Cloud Metric data.

[Compute Engine API][8] 
: Allows Datadog to discover Compute instance data.

[Cloud Asset API][9]
: Allows Datadog to request Google Cloud resources and link them to relevant metric tags.

[Cloud Resource Manager API][10] 
: Allows Datadog to append metrics with the correct resources and tags.

[IAM API][11]
: Required to allow Datadog to authenticate with Google Cloud.

[Google Cloud Billing API][12] 
: Enables accurate billing for API calls.

<div class="alert alert-info">You can confirm if these APIs are enabled by heading to <b>Enabled APIs & Services</b> under each project on Google Cloud.</div>

After these APIs have been enabled, follow the step-by-step instructions described in the [**Google Cloud Platform guide**][6] to set up the Google Cloud integration.


### Metric collection

The GCP integration is designed to collect [**all Google Cloud metrics**][17]. 
While Datadog provides detailed documentation for most GCP services, newly released services may not yet have detailed documentation. Metrics for such services are still collected through the integration.

{{% collapse-content title="Click here for a sample of the GCP services Datadog supports" level="h4" %}}
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

Datadog crawls GCP metrics from your projects on a default **5 minute schedule**.
For more details on the crawler schedule, see [Cloud Metric Delay][18].


You can find your GCP metrics in the Metrics Summary page in the Datadog platform.
To view your metrics, navigate to `Metrics > Summary` and search for `gcp`:

{{NEED TO INSERT IMAGE}}

### Filtering metric collection

You can limit the GCE/GKE instances & Cloud Run Revisions that are pulled into Datadog by entering tags in the **Limit Metric Collection Filters** text boxes under the **General** tab.
Only resources that match one of the defined tags are imported into Datadog. 

You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. 
This example includes all c1* sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's documentation on [Creating and managing labels][19] for more details on adding labels to your GCP hosts.

For more information on how to control your resource costs, see the [Google Cloud Integration Billing page][20].


## Log collection

Forward logs from your Google Cloud services to Datadog using [Google Cloud Dataflow][21] and the [Datadog template][22]. This method provides both compression and batching of events before they are forwarded to Datadog. 
Follow [the instructions listed here][23] to set up Log Collection.

<div class="alert alert-warning"><b>Note</b>: The <b>Dataflow API</b> must be enabled to use Google Cloud Dataflow. See <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>Enabling APIs</b></a> in the Google Cloud documentation for more information.</div>

**Note**: The **Dataflow API** must be enabled to use Google Cloud Dataflow. See [Enabling APIs][24] in the Google Cloud documentation for more information.

Alternatively, to collect logs from applications running in GCE or GKE, you can also use the [Datadog Agent][32].

## GCP integrations

Our [Integrations page][26] provides a full listing of the available sub-integrations for GCP. 
Many of these integrations are installed by default when Datadog recognizes data being ingested in from your GCP account.

## Leveraging the Datadog Agent for greater visibility

After the GCP integration is configured, Datadog automatically starts collecting GCP metrics. However, you can leverage the Datadog Agent to gather deeper insights into your infrastructure.

The [Datadog Agent][25] provides the most granular, low-latency metrics from your infrastructure, delivering real-time insights into CPU, memory, disk usage, and more for your GCP hosts. 
The Agent can be installed on any host, including GKE - [Google Kubernetes Engine, Agent][28].

The Agent also supports [a wide range of integrations][29], enabling you to extend visibility into specific services and databases running on your hosts. 
For even deeper customization, you can implement [custom Agent checks][30] which can be tailored to your unique monitoring needs. 
[Traces collected through the Trace Agent][31] enable comprehensive Application Performance Monitoring (APM), helping you understand end-to-end service performance. 

For a full list of the benefits of installing the Agent on your cloud instances, see [Why should I install the Datadog Agent on my Cloud Instances?][27]



## Explore related products

### Google Cloud Run

To begin monitoring serverless functions running on Google Cloud Platform, enable the Google Cloud Platform integration. 
The Google Cloud Run page provides a list of out-of-the-box metrics collected by the GCP integration, along with instructions for Log Collection through Dataflow.

Datadog also provides a solution, currently in public beta, for instrumenting your Cloud Run applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

### Security

### Cloud SIEM

Review the Getting Started with Cloud SIEM guide to learn how to evaluate your logs using out-of-the-box Log Detection Rules. These rules are customizable, and generate security signals when threats are detected. These security signals can be accessed on the Security Signals Explorer. 
To ensure that the correct team is notified, use Notification Rules to configure notification preferences across multiple detection rules.
Additionally, to view security findings from Google Cloud Security Command Center in Cloud SIEM, toggle the Enable collection of security findings option under the Security Findings tab & follow the setup instructions on the Google Cloud Security Command Center guide.

### Cloud Security Management (CSM)

Use the Setting up Cloud Security Management guide to learn about detecting and assessing misconfigurations in your cloud environment. Resource configuration data is evaluated against the out-of-the-box Cloud and Infrastructure compliance rules to flag attacker techniques and potential misconfigurations, allowing for fast response and remediation.
Toggle the Enable Resource Collection option under the Resource Collection tab to begin collecting configuration information for use in the Resource Catalog and in CSM.

### Database Monitoring (DBM)
Use Database Monitoring (DBM) to gain increased insight on performance metrics, host health and query samples for your Google Cloud SQL databases.

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