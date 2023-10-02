---
title: Cloud Cost Management
kind: documentation
aliases:
  - /infrastructure/cloud_cost_management
  - /integrations/cloudability
further_reading:
  - link: "https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/"
    tag: "Blog"
    text: "Gain visibility and control of your cloud spend with Datadog Cloud Cost Management"
  - link: "/monitors/types/cloud_cost/"
    tag: "Documentation"
    text: "Configure a Cloud Cost monitor"
  - link: "https://www.datadoghq.com/blog/cloud-cost-management-container-support/"
    tag: "blog"
    text: "Understand your Kubernetes and ECS spend with Datadog Cloud Cost Management"
  - link: "/cloud_cost_management/tag_pipelines"
    tag: "Documentation"
    text: "Standardize tags across Cloud Cost with Tag Pipelines"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

## Overview

Cloud Cost Management provides insights for engineering and finance teams to see how changes to infrastructure can affect costs. It enables you to understand trends, allocate spend across your organization, and identify inefficiencies.
Datadog ingests your cloud cost data and transforms it into queryable metrics. If costs rise, you can correlate the change with usage metrics to determine the root cause.

## Setup

{{< whatsnext desc="Get started with Cloud Cost Management:">}}
  {{< nextlink href="/cloud_cost_management/aws">}}<u>Docker</u>: Configure Cloud Cost Management for your AWS bill.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/azure">}}<u>Kubernetes</u>: Configure Cloud Cost Management for your Azure bill. {{< /nextlink >}}
 {{< /whatsnext >}}

## Cloud costs in dashboards

Visualizing infrastructure spend alongside related utilization metrics can help you spot potential inefficiencies and savings opportunities. You can add cloud costs to widgets in Datadog dashboards by selecting the *Cloud Cost* data source.

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="Cloud Cost available as a data source in dashboard widget creation" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
