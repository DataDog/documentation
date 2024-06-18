---
title: Product Analytics
kind: documentation
description: Product Analytics help you understand your application usage at a glance.
aliases:
- /real_user_monitoring/product_analytics
further_reading:
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "RUM Explorer"
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
Product Analytics is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

{{< img src="product_analytics/overview.png" alt="Landing page of Product Analytics.">}}

Product Analytics helps you gain insight into user behavior and make data-driven decisions.

It can help solve the following types of use cases in your application:

- Understand product adoption
- Track conversion rates and their evolution over time
- Track key user behavior patterns
- Visualize the most and least interacted with buttons on a given page

Below are some key features within Datadog Product Analytics.

## Map user journeys

[User journeys][1] allow you to measure and report on the impact of every feature change - from backend bottlenecks to user frustrations - so that they can be appropriately optimized. Identify the ideal path for feature adoption and user conversion.

See different visualizations of the user experience when interacting with your application:

- **[Funnel][2]**: Measure the conversion rate end-to-end of a given workflow.
- **[Sankey][1]**: Explore aggregated workflows in a single visualization to aid in answering questions about user journeys.
- **[Conversion][4]**: Track conversion rates over time and compare it against specific attributes that may have affected conversion rates, such as browser type or geography.

## Measure user retention

User retention is a metric for measuring the percentage of active users who continue to use your product, app, or service over a set period of time. Use [Retention Analysis][5] to measure how a group of users engage with specific features to understand where drop-off occurs.

## Create user segments

Segments are users grouped by specific characteristics or behaviors. [Segmentation][6] in Datadog allows you to analyze and understand specific groups or segments of your user base.

## Visualize user interactions with heatmaps

[Heatmaps][7] visualize the most interacted with elements on a page to see where hot spots of activity are, along with analyzing scroll depth to see how far users scrolled down a given page. You can view every swipe, scroll, and click with a pixel-perfect reproduction of exactly what users went through on both browser and mobile applications to identify high-or low-performing content.
 
[1]: /product_analytics/journeys/
[2]: /product_analytics/journeys/funnel_analysis
[3]: https://app.datadoghq.com/product-analytics/user-journey/sankey
[4]: https://app.datadoghq.com/product-analytics/user-journey/conversion
[5]: /product_analytics/user_retention
[6]: /product_analytics/segmentation/
[7]: /product_analytics/heatmaps

