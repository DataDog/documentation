---
title: Chart Basics
description: Learn how to save individual charts and use chart templates in Datadog Product Analytics.
further_reading:
    - link: '/product_analytics/'
      tag: Documentation
      text: Product Analytics
    - link: 'real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#user-session'
      tag: Documentation
      text: Set user sessions
---

## Overview

Charts help you turn user data into actionable insights. They support in visualizing trends, funnels, and key perfomance metrics. Use charts to answer common product questions, such as how users move through a funnel, how engagement changes over time, or how adoption varies across segments. 

This page introduces the core charting capabilities available across Product Analytics, including:

- [Creating charts](#create-a-chart) 
- [Saving individual charts](#save-a-chart)
- [Sharing charts internally and externally](#share-a-chart)
- [Using prebuilt chart templates](#start-from-a-template)

## Create a chart 
Create charts to explore user behavior and visualize product metrics in Product Analytics. 

To create a chart, click **New Chart** on the [Chart List page][1] and select the chart type you want to build. For guidance on choosing the right option, see [Deciding which chart to use][2]. 

{{< img src="product_analytics/chart_basics/pana_chart_basics_new2.png" alt="Chart list UI showing the New Chart button with options to select a chart type." style="width:100%;" >}}


## Save a chart 
Save charts to track key product metrics over time and return to analyses as your data evolves. 

Use the pencil icon to **edit** the name of the chart. Then, click on **Save** at the top right corner to save the chart. You can view your saved chart on the [Chart List page][1].

{{< img src="product_analytics/chart_basics/pana_chart_basics_save2.png" alt="New Funnel Chart UI showing the pencil icon for editing the chart name and the save button to save the chart." style="width:100%;" >}}


## Share a chart
Share charts to make product insights available across dashboards, notebooks, and your teams.

To add the chart to a dashboard or a notebook, click on **+ Add To** in the upper-right corner of the chart. Then, select whether to add it to an existing dashboard or notebook, or to a new one. 


To share a link to the chart, click on the **Share** button to copy the link onto your clipboard. Then, use **Command + V** on macOS or **Ctrl + V** on Windows to paste and share this link. Team members with Datadog access are directed to the live chart in Datadog, while users without Datadog access see a static snapshot of the chart. 

{{< img src="product_analytics/chart_basics/pana_chart_basics_share_add.png" alt="The charts UI showing the Add To button for sharing charts to a dashboard or to a notebook." style="width:100%;" >}}


## Start from a template 
Choose from a variety of templates in the charts template library to better understand user behaviors like average time to convert, or to see their conversion breakdown by country. 

To see the available templates, click on **Explore All Templates** on the [Chart List page][1]. Hover over your choice and click **Create Chart** to edit and save your chart.

{{< img src="product_analytics/chart_basics/pana_chart_basics_templates2.png" alt="Chart templates side panel showing a list of available templates and the button to create a chart from a template." style="width:80%;" >}}



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/saved-charts
[2]: https://docs.datadoghq.com/product_analytics/charts#deciding-which-chart-to-use
