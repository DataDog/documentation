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

## Overview

{{< img src="product_analytics/overview.png" alt="Landing page of Product Analytics.">}}

Product Analytics helps you gain insight into user behavior and make data-driven decisions.

It can help solve the following types of use cases in your application:

- Understand product adoption
- Track conversion rates and their evolution over time
- Track key user behavior patterns
- Visualize the most and least interacted with buttons on a given page

Below are some key pillars of Datadog Product Analytics.

## Measure user retention

Use [Retention Analysis][1] to measure how a group of users engage with specific features over time to understand where dropoff occurs.

## Map user journeys

Explore [User Journeys][2] to see different visualizations of the user experience when interacting with your application:

- **[Funnel][3]**: Measure the conversion rate end-to-end of a given workflow.
- **[Sankey][4]**: Explore aggregated workflows in a single visualization to aid in answering questions about user journeys.
- **[Conversion][4]**: Track conversion rates over time and compare it against specific attributes that may have affected conversion rates, such as browser type or geography.

## Visualize user interactions with heatmaps

[Heatmaps][5] visualize the most interacted with elements on a page to see where hot spots of activity are, along with analyzing scroll depth to see how far users scrolled down a given page.

[1]: /product_analytics/user_retention
[2]: https://app.datadoghq.com/product-analytics/user-journey/sankey
[3]: /product_analytics/journeys/funnel_analysis
[4]: https://app.datadoghq.com/product-analytics/user-journey/conversion
[5]: /product_analytics/heatmaps
