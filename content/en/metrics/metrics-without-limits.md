---
title: Metrics without Limits™ FAQ
kind: faq
is_beta: true
---

## Overview

Custom metrics are used every day as a means to understand business performance alongside application and infrastructure health. However, business data is valuable in aggregate not necessarily in detail, so it may be cost prohibitive for organizations to query all metric names and tag values. Metrics without Limits provides you flexibility and control over your custom metrics volumes by decoupling custom metric ingestion and indexing  -- you only pay for custom metric tags that are valuable to your organization.

This guide identifies key components of Metrics without Limits™ that help you manage your custom metrics volumes within your observability budget.

## What is Metrics without Limits™?

Metrics without Limits™ provides you with the ability to configure tags on all metric types in-app and customize aggregations on counts/rates/gauges without having to redeploy or change any code. With Metrics without Limits™, you’ll be able to configure an allowlist of tags in-app to remain queryable throughout the Datadog platform -- automatically excluding nonessential tags attached to application-level or business metrics (i.e. `host`). This functionality is located in the [Metrics Summary][1] page.

## Configuration of tags
Click on any metric name to open its details sidepanel. Then click on the **Manage Tags** button and then **“Custom”** to configure the tags you’d like remain as queryable on dashboards/monitors. Before hitting **Save**, you’ll see an estimated new volume of indexed custom metrics that results from this potential tag configuration.

{{< img src="metrics/mwl_tags.gif" alt="Configuration of Tags">}}

## Fine-tune your aggregations
You can further adjust your custom metrics filters by opting in to more [metrics aggregations][2] you want to query on your count, gauge, or rate metrics. To preserve the mathematical accuracy of your queries, by default Datadog only stores the most frequently queried time/space aggregation combination for a given metric type: 

- Configured counts/rates will be queryable in time/space with SUM
- Configured gauges will be queryable in time/space with AVG

You can add or remove aggregations at any time with no required Agent or code-level changes. 

Once you've clicked **Manage Tags** button and then **“Custom”** you can open the **Customize Aggregations** window to view the default aggregation available for your count/rate/gauge metric. You can opt-in to more aggregations should you need them. 

{{< img src="metrics/mwl_aggrs.jpg" alt="Customize Aggregations">}}

## What is the pricing of Metrics without Limits™?

Configuring your tags/aggregations gives you control over what custom metrics can be queried -- ultimately reducing your billable count of custom metrics. Metrics without Limits decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you'd want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you’ve indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 

- **Ingested Custom Metrics**: The original volume of custom metrics based on the all ingested tags (sent via code).
- **Indexed Custom Metrics**: The volume of custom metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 



**Note: Only configured metrics contribute to your Ingested custom metrics volume.** If a metric is not configured with Metrics without Limits\*, you're only charged for its indexed custom metrics volume.




\*Metrics without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/metric/summary
[2]: https://docs.datadoghq.com/metrics/#time-and-space-aggregation
