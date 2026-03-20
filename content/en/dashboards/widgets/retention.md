---
title: Retention Widget
description: Analyze user retention and engagement patterns over time using cohort analysis visualization.
widget_type: cohort
further_reading:
- link: "product_analytics/charts/retention_analysis/"
  tag: "Documentation"
  text: "Retention Analysis"
- link: "https://www.datadoghq.com/blog/user-engagement-retention-analysis/"
  tag: "Blog"
  text: "Measure long-term user engagement with Datadog Retention Analysis"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
The Retention widget is not available in the <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

{{< callout url="https://www.datadoghq.com/product-preview/product-analytics/" header="false" >}}
The Retention widget is available in Preview for Product Analytics customers. To request access, complete the form.
{{< /callout >}}

{{< img src="/dashboards/widgets/retention/retention_widget_graph.png" alt="Graph visualization of the retention widget" style="width:100%;" >}}

Retention Analysis allows you to measure how often users are successfully returning to a page or performing an action. By tracking user retention over time, you can gain insights into overall user satisfaction. Use Retention Analysis to answer questions like the following:
- After visiting the checkout page and purchasing one item, what percentage of people come back and continue to do that in the following weeks?
- During the holiday season, how many people look at the catalog page once and never return?
- On a ride share app, how many people open up the app and then order a ride? 

{{< img src="/dashboards/widgets/retention/retention_widget_config.png" alt="Configuration options for retention widget" style="width:100%;" >}}

## Setup

To populate user retention data, you must set the `usr.id` attribute in your SDK. [See the instructions for sending unique user attributes][1].

### Configuration

1. Define the initial event by selecting **View** or **Action** and choose a query from the dropdown menu.
1. (Optional) Click **+ Add different return step** to configure a different return event from the original event. 
1. Define users by selecting from users or segments in the dropdown.
1. Customize the chart to display either as a percentage or total number, and to measure by days, weeks, or months. 

### Options

#### Global time

On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/advanced_configuration#user-session
