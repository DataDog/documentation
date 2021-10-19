---
title: Metrics without Limits™ F
kind: 
is_beta: false
further_reading:
  - link: "/metrics/dogstatsd_metrics_submission/"
    tag: "Documentation"
    text: "Using Distributions in DogStatsD"
---
## Overview

Custom metrics are used every day as a means to understand business performance alongside application and infrastructure health. However, business data can be most valuable in aggregate not necessarily in detail, so it may be cost prohibitive for organizations to query all metric names and tag values. Metrics without Limits provides you flexibility and control over your custom metrics volumes by decoupling custom metric ingestion and indexing  -- you only pay for custom metric tags that are valuable to your organization.

This guide identifies key components of Metrics without Limits that help you manage your custom metrics volumes within your observability budget.

## What is Metrics without Limits\*?

Metrics without Limits\* provides you with the ability to customize tagging on all metric types in-app without having to redeploy or change any code. With Metrics without Limits\*, you’ll be able to customize tagging to drop in-app host-level tags attached to application-level or business metrics. This functionality will be located in the [Metrics Summary][1] page.

## Configuration of tags
Click on any metric name to open its details sidepanel. Then click on the **Manage Tags** button and then **“Custom”** to configure the tags you’d like remain as queryable on dashboards/monitors. Before hitting **Save**, you’ll see an estimated new volume of indexed custom metrics that results from this potential tag configuration.

{{< img src="metrics/faq/managetags.gif" alt="Configuration of Tags">}}

## What is the pricing of Metrics without Limits\*?

Configuring your tags gives you control over what custom metrics can be queried -- ultimately reducing your billable count of custom metrics. Given this new functionality, your contract for custom metrics will include:
- **Ingested custom metrics**: custom metrics you send to Datadog in code
- **Indexed custom metrics** : remaining custom metrics available for query after you’ve configured tags in-app

Please reach out to your Customer Support Manager if you're interested in this private beta and for further pricing details of this feature.


\*Metrics without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/metric/summary
