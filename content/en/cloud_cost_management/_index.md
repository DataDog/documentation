---
title: Cloud Cost Management
aliases:
  - /infrastructure/cloud_cost_management
  - /integrations/cloudability
further_reading:
  - link: "https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/"
    tag: "Blog"
    text: "Gain visibility and control of your cloud spend with Datadog Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/cloud-cost-management-container-support/"
    tag: "Blog"
    text: "Understand your Kubernetes and ECS spend with Datadog Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/google-cloud-cost-management/"
    tag: "Blog"
    text: "Empower engineers to take ownership of Google Cloud costs with Datadog"
  - link: "https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/"
    tag: "Blog"
    text: "Quickly and comprehensively analyze the cloud and SaaS costs behind your services"
  - link: "/monitors/types/cloud_cost/"
    tag: "Documentation"
    text: "Create a Cloud Cost monitor"
  - link: "/cloud_cost_management/tags/"
    tag: "Documentation"
    text: "Learn about Tags in Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/cloud-costs-study-learnings/"
    tag: "Blog"
    text: "Key learnings from the State of Cloud Costs study"
  - link: "https://www.datadoghq.com/blog/unit-economics-ccm/"
    tag: "Blog"
    text: "Monitor unit economics with Datadog Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/finops-at-datadog/"
    tag: "Blog"
    text: "How we've created a successful FinOps practice at Datadog"
  - link: "https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/"
    tag: "Blog"
    text: "How we saved $1.5 million per year with Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/cloud-cost-management-oci/"
    tag: "Blog"
    text: "Manage and optimize your OCI costs with Datadog Cloud Cost Management"
cascade:
    algolia:
      subcategory: 'Cloud Cost Management'
      rank: 70
      tags: ['cloud cost', 'cloud integrations', 'cloud cost management', 'cloud cost aws', 'cloud cost azure', 'cloud cost google cloud', 'cloud cost gcp', 'data collected aws', 'data collected azure', 'data collected google cloud']
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  Explore your cloud provider costs and correlate them with real-time telemetry data. Gain actionable insights and alerts on where your cloud costs are coming from, how they are changing, and where to find potential optimizations.
{{< /learning-center-callout >}}

## Overview

Cloud Cost Management provides insights for engineering and finance teams to understand how infrastructure changes impact costs, allocate spend across your organization, and identify inefficiencies.

{{< img src="cloud_cost/summary.png" alt="Gain insights into all of your cloud provider's cost and usage on the Cloud Costs Summary page in Datadog" style="width:100%;" >}}

Datadog ingests your cloud cost data and transforms it into metrics you can use in a search query on the [**Explorer** page][1]. If costs rise, you can correlate the increase with usage metrics to determine the root cause.

## Setup

{{< whatsnext desc="To start managing your cloud costs with Cloud Cost Management, see the following documentation.">}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u>: Configure Cloud Cost Management for your AWS bill.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u>: Configure Cloud Cost Management for your Azure bill. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u>: Configure Cloud Cost Management for your Google Cloud bill. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/oracle">}}<u>Oracle</u>: Configure Cloud Cost Management for your Oracle bill. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>SaaS Cost Integrations</u>: Send cost data from a supported SaaS cost provider to Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>Custom Costs</u>: Upload any cost data source to Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Datadog Costs</u>: Visualize daily Datadog spending and utilization metrics. {{< /nextlink >}}
 {{< /whatsnext >}}

## Use cloud cost data

Visualize infrastructure spend alongside related utilization metrics with a retention period of 15 months to spot potential inefficiencies and savings opportunities.

When creating a dashboard, select **Cloud Cost** as the data source for your search query.

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="Cloud Cost available as a data source in dashboard widget creation" style="width:80%;" >}}

Optionally, you can programmatically export a timeseries graph of your cloud cost data by using the [Metrics API][2].

## Use daily Datadog cost data

Visualize daily Datadog spending alongside related utilization metrics with a retention period of 15 months to spot potential inefficiencies and savings opportunities. Learn more about [Datadog Costs][8].

When creating a dashboard, select **Cloud Cost** as the data source, then choose **Datadog** from the available cost types.

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="Datadog costs as an option for the Cloud Cost data source in a dashboard" style="width:80%;" >}}

Optionally, you can programmatically export a timeseries graph of your Datadog cost data by using the [Metrics API][2].

## Tagging and cost allocation

Learn how tags are sourced, enriched, and managed in Cloud Cost Management by reading the [Tags documentation][5].

You can create tag rules to correct missing or incorrect tags, and add inferred tags that align with your organization's business logic.

## Create a cost monitor

Proactively manage and optimize your cloud spending by creating a [Cloud Cost Monitor][3]. You can choose **Cost Changes** or **Cost Threshold** to monitor your cloud expenses.

{{< img src="cloud_cost/monitor.png" alt="Create a Cloud Cost monitor that alerts on cost changes" style="width:100%;" >}}

## Allocate costs

Use [Container Cost Allocation metrics][4] to discover costs associated with clusters and workloads across Kubernetes, Amazon ECS, Azure, and Google Cloud. You can gain visibility into pod-level costs, identify idle resource costs, and analyze costs by resource type.

## Permissions
Two permissions are available:
1. Cloud Cost Management Read (`cloud_cost_management_read`)
2. Cloud Cost Management Write (`cloud_cost_management_write`)

The table below describes the impact of these permissions in both Cloud Cost Management and related pages.

| Page/Functionality                            | Cloud Cost Management Read Permission       | Cloud Cost Management Write Permission            |
|-----------------------------------------------|---------------------------------------------|---------------------------------------------------|
| CCM Summary Page                              | Permission Required                         | N/A                                               |
| CCM Containers Page                           | Permission Required                         | N/A                                               |
| CCM Recommendations Page                      | Permission Required                         | N/A                                               |
| CCM Explorer Page                             | Permission Required                         | N/A                                               |
| CCM Plan Page                                 | Permission Required                         | Permission Required to modify or create Budgets   |
| CCM Settings Page - Custom Costs              | Permission Required                         | Permission Required to upload custom costs        |
| CCM Settings Page - Tag Pipelines             | Permission Required                         | Permission Required to create tag pipelines       |
| CCM Settings Page - SaaS Integrations         | Permission Required                         | Permission Required to enable integration for CCM |
| CCM Settings Page - Accounts                  | Permission Required                         | Permission Required to modify or create accounts  |
| CCM Settings Page - Configure Recommendations | Permission Required                         | Permission Required to customize recommendations  |
| Dashboards/Notebooks (external)               | Permission Required to create and view data | N/A                                               |
| Monitors (external)                           | Permission Required to create CCM monitors  | N/A                                               |
| Service Catalog (external)                    | Permission Required to view cost data       | N/A                                               |
| Resource Catalog (external)                   | Permission Required to view cost data       | N/A                                               |
| API Queries for Cost Data                     | Permission Required                         | N/A                                               |

### Data access control preview
More granular tag-level restrictions are available as part of the [Data Access Control Preview][6]. To request preview access, fill out [this form][7].

## Review data history

Monitor the freshness and processing status of your cloud cost data on the **Cloud Cost > Settings** page. You can view when:
- Billing data was last ingested
- Tag pipeline rules and custom allocation rules were last applied
- Bills were last received and processed for each cloud provider.

Use this information to troubleshoot data delays or verify that recent configuration changes have been applied to your cost data.

{{< img src="cloud_cost/ccm-data-history.png" alt="View your Cloud Cost data history in Cloud Cost settings." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/explorer
[2]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /monitors/types/cloud_cost/
[4]: /cloud_cost_management/container_cost_allocation
[5]: /cloud_cost_management/tags/
[6]: /account_management/rbac/data_access/
[7]: https://www.datadoghq.com/product-preview/data-access-control/
[8]: /cloud_cost_management/datadog_costs
