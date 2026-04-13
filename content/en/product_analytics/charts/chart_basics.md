---
title: Chart Basics
private: true
description: Learn how to save charts and use chart templates in Datadog Product Analytics.
further_reading:
    - link: '/product_analytics/'
      tag: Documentation
      text: Product Analytics
    - link: '/dashboards/configure/'
      tag: Documentation
      text: Configure Dashboards
    - link: '/product_analytics/charts#deciding-which-chart-to-use'
      tag: Documentation
      text: Decide which chart to use
---

## Overview

Charts help you turn user data into actionable insights by visualizing trends, funnels, and key product metrics. Use charts to answer common product questions, such as how users move through a funnel, how engagement changes over time, and how adoption varies across segments. 

This page introduces the core charting capabilities available across Product Analytics, including:

- [Creating charts](#create-a-chart) 
- [Saving individual charts](#save-a-chart)
- [Sharing charts internally and externally](#share-a-chart)
- [Using prebuilt chart templates](#start-from-a-template)

## Create a chart 
Create charts to explore user behavior and visualize product metrics. For example, use a funnel chart to understand where users drop off during onboarding.

To create a chart, click **New Chart** on the [Chart List page][1] and select the chart type you want to build. For guidance on choosing the right option for your use case, see [Deciding which chart to use][2]. 

{{< img src="product_analytics/chart_basics/pana_chart_basics_new2.png" alt="Chart List page showing the New Chart button with options to select a chart type." style="width:100%;" >}}


## Save a chart 
Save charts to track key product metrics over time and return to your analyses as the data evolves. For example, you can use a saved chart to follow weekly conversion rates or feature adoption.

Use the pencil icon to **edit** the name of the chart. Then, click **Save** at the top-right corner to save the chart. You can view your saved chart on the [Chart List page][1].

{{< img src="product_analytics/chart_basics/pana_chart_basics_save2.png" alt="Chart editor view showing the pencil icon for editing the chart name and the save button to save the chart." style="width:100%;" >}}


## Share a chart
Share charts to make product insights available across dashboards, notebooks, and your teams. For example, you can add a conversion funnel to a weekly product dashboard to align stakeholders on product performance.

To add a chart to a dashboard or a notebook, click **+ Add To** in the top-right corner of the chart. Then, select whether to add it to an existing dashboard or notebook, or to a new one. 


To share a link to a chart, click **Share** to copy the link to your clipboard. Then paste and share this link through the method of your choice. Team members with Datadog access are directed to the live chart in Product Analytics, while users without Datadog access see a static snapshot of the chart. 

{{< img src="product_analytics/chart_basics/pana_chart_basics_share_add.png" alt="Chart editor view showing the Add To button for sharing charts to a dashboard or to a notebook." style="width:100%;" >}}


## Start from a template 
Start from a template to explore user behavior and product performance using pre-built chart configurations. For example, you can understand users' average time to convert, or see their conversion breakdown by country with a few clicks. 

To see the available templates, click **Explore all templates** on the [Chart List page][1]. Hover over your choice and click **Create Chart** to edit and save your chart.

{{< img src="product_analytics/chart_basics/pana_chart_basics_templates2.png" alt="Chart Templates side panel showing a list of available templates and the button to create a chart from a template." style="width:80%;" >}}



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/saved-charts
[2]: https://docs.datadoghq.com/product_analytics/charts#deciding-which-chart-to-use
