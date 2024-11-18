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
  - link: "/cloud_cost_management/tag_pipelines/"
    tag: "Documentation"
    text: "Learn about Tag Pipelines"
  - link: "/cloud_cost_management/tag_pipelines"
    tag: "Documentation"
    text: "Standardize tags across Cloud Cost Management with Tag Pipelines"
  - link: "https://www.datadoghq.com/blog/cloud-costs-study-learnings/"
    tag: "Blog"
    text: "Key learnings from the State of Cloud Costs study"
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

{{< img src="cloud_cost/overview_2.png" alt="Gain insights into all of your cloud provider's cost and usage on the Cloud Costs Overview page in Datadog" style="width:100%;" >}}

Datadog ingests your cloud cost data and transforms it into metrics you can use in a search query on the [**Analytics** page][1]. If costs rise, you can correlate the increase with usage metrics to determine the root cause.

## Setup

{{< whatsnext desc="To start managing your cloud costs with Cloud Cost Management, see the following documentation.">}}
  {{< nextlink href="/cloud_cost_management/aws">}}<u>AWS</u>: Configure Cloud Cost Management for your AWS bill.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/azure">}}<u>Azure</u>: Configure Cloud Cost Management for your Azure bill. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/google_cloud">}}<u>Google Cloud</u>: Configure Cloud Cost Management for your Google Cloud bill. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/saas_costs">}}<u>SaaS Cost Integrations</u>: Send cost data from a supported SaaS cost provider to Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/custom">}}<u>Custom Costs</u>: Upload any cost data source to Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Datadog Costs</u>: Visualize daily Datadog spending and utilization metrics. {{< /nextlink >}}
 {{< /whatsnext >}}

## Use cloud cost data

Visualize infrastructure spend alongside related utilization metrics with a retention period of 15 months to spot potential inefficiencies and savings opportunities.

When creating a dashboard, select **Cloud Cost** as the data source for your search query.

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="Cloud Cost available as a data source in dashboard widget creation" style="width:100%;" >}}

Optionally, you can programmatically export a timeseries graph of your cloud cost data by using the [Metrics API][2].

## Use daily Datadog cost data

Visualize daily Datadog spending alongside related utilization metrics with a retention period of 15 months to spot potential inefficiencies and savings opportunities.

When creating a dashboard, select **Cloud Cost** as the data source for your search query.

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Datadog costs as an option for the Cloud Cost data source in a dashboard" style="width:100%;" >}}

Optionally, you can programmatically export a timeseries graph of your Datadog cost data by using the [Metrics API][2].

## Create tag rules

Use [Tag Pipelines][5] to ensure comprehensive cost tracking by standardizing the tags across all cloud resources. This prevents any cost data from being overlooked.

{{< img src="cloud_cost/tags_addnew.png" alt="Create a tag rule in Tag Pipelines to ensure your cloud resources use standard tags" style="width:60%;" >}}

You can create tag rules to correct missing or incorrect tags and add inferred tags that align with your organization's business logic.

## Create a cost monitor

Proactively manage and optimize your cloud spending by creating a [Cloud Cost Monitor][3]. You can choose **Cost Changes** or **Cost Threshold** to monitor your cloud expenses.

{{< img src="cloud_cost/monitor.png" alt="Create a Cloud Cost monitor that alerts on cost changes" style="width:100%;" >}}

## Allocate costs

Use [Container Cost Allocation metrics][4] to discover costs associated with clusters and workloads across Kubernetes, AWS ECS, Azure, and Google Cloud. Gain visibility into pod-level costs, identify idle resource costs, and analyze costs by resource type.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analytics
[2]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /monitors/types/cloud_cost/
[4]: /cloud_cost_management/container_cost_allocation
[5]: /cloud_cost_management/tag_pipelines
