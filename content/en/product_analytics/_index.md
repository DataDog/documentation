---
title: Product Analytics
description: Product Analytics help you understand your application usage at a glance.
aliases:
- /real_user_monitoring/product_analytics
- /real_user_monitoring/guide/rum-for-product-analytics
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

## Overview

{{< img src="product_analytics/overview-1.png" alt="Landing page of Product Analytics.">}}

Product Analytics helps you gain insight into user behavior and make data-driven decisions. It can help solve the following types of use cases in your application:

- Understand product adoption
- Track conversion rates and their evolution over time
- Track key user behavior patterns
- Visualize the most and least interacted with buttons on a given page

## Getting started

To start using Product Analytics, enable it for each application where you want to monitor user behavior:

1. Select the application you want to monitor from the [Application Management][9] list.
2. Under PRODUCT SETTINGS, click **Product Analytics**.
3. Click the **Enable** button.

{{< img src="product_analytics/enable-product-analytics.png" alt="Enable Product Analytics from the Application Management page.">}}

By default, Product Analytics data is retained for 15 months. Learn more about [Privacy at Datadog][1].

## Measure user retention

User retention is a metric for measuring the percentage of active users who continue to use your product, app, or service over a set period of time. Use [Retention Analysis][2] to measure how a group of users engage with specific features over time to understand where drop-offs occur.

{{< img src="real_user_monitoring/retention_analysis/differing-events-retention-graph.png" alt="Retention graph for differing events" style="width:90%;" >}}

## Map user journeys

[User journeys][3] allow you to measure and report on the impact of every feature change - from backend bottlenecks to user frustrations - so that they can be appropriately optimized. Identify the ideal path for feature adoption and user conversion.

{{< img src="/product_analytics/journeys/pa-funnel-1.png" alt="Understand end-to-end conversions with Funnel Analysis.">}}

See different visualizations of the user experience when interacting with your application:

- **[Funnel][4]**: Measure the **conversion rate** and **time to convert** from end-to-end of a given workflow. 
- **[Pathways][5]**: Explore aggregated workflows in a single visualization to aid in answering questions about user journeys. In addition, track conversion rates over time and compare them against specific attributes that might have affected conversion rates, such as browser type or geography.

## Create user segments

Segments are users grouped by specific characteristics or behaviors. [Segmentation][6] in Datadog allows you to analyze and understand specific groups or segments of your user base.

## Visualize user interactions with heatmaps

[Heatmaps][7] visualize the most interacted with elements on a page to see where hot spots of activity are, along with analyzing scroll depth to see how far users scrolled down a given page. You can view every swipe, scroll, and click with a pixel-perfect reproduction of exactly what users went through on both browser and mobile applications to identify high- or low-performing content.

{{< img src="real_user_monitoring/heatmaps/heatmap_v2.png" alt="An overview of the heatmap functionality." style="width:100%;">}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/privacy/
[2]: /product_analytics/user_retention
[3]: /product_analytics/journeys
[4]: /product_analytics/journeys/funnel_analysis
[5]: /product_analytics/journeys/pathways
[6]: /product_analytics/segmentation/
[7]: /product_analytics/heatmaps
[8]: https://app.datadoghq.com/rum/
[9]: https://app.datadoghq.com/rum/list
