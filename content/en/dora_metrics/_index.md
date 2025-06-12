---
title: DORA Metrics
description: Learn how to use DORA metrics to measure and improve your organization's software delivery processes.
aliases:
- /continuous_integration/dora_metrics
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "https://www.datadoghq.com/blog/dora-metrics-software-delivery/"
  tag: "Blog"
  text: "Best practices for using DORA metrics to improve software delivery"
- link: "https://www.datadoghq.com/blog/datadog-dora-metrics/"
  tag: "Blog"
  text: "3 ways to drive software delivery success with Datadog DORA Metrics"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/service_management/events"
  tag: "Documentation"
  text: "Learn about Event Management"
- link: "/monitors/types/metric"
  tag: "Documentation"
  text: "Learn about Metric Monitors"
- link: "/software_catalog"
  tag: "Documentation"
  text: "Learn about the Software Catalog"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}


## Overview

DevOps Research and Assessment (DORA) metrics are [four key metrics][1] that indicate the velocity and stability of software development.

Deployment frequency
: How often an organization successfully releases to production.

Change lead time
: The amount of time it takes a commit to get into production.

Change failure rate
: The percentage of deployments causing a failure in production.

Time to restore service
: How long it takes an organization to recover from a failure in production.

Defining and tracking DORA metrics can help you identify areas of improvement for your team or organization's speed and quality of software delivery.

## Set up DORA Metrics

To start configuring data sources to send deployment and failure events to Datadog, see the [Setup documentation][2].

## Analyze DORA Metrics

Once you've set up the data sources for your deployment and failure events, navigate to [**Software Delivery** > **DORA Metrics**][4] to identify improvements or regressions for each metric, aggregate them by service or environment, and compare trends over time.

{{< img src="dora_metrics/dora_ui_1.png" alt="An overview of DORA Metrics calculations and insights in a given month" style="width:100%;" >}}

You can examine visualizations and filter the collected data by team, service, repository, environment, time period, and by custom tags.

{{< img src="dora_metrics/dora_ui_3.png" alt="An overview of DORA Metrics calculations filtered by the Language custom tag" style="width:100%;" >}}

Click **View Deployments** to open a new tab with the Deployment Frequency and Change Lead Time metrics in addition to a list of deployment events.

{{< img src="dora_metrics/deployments_list.png" alt="The Deployments Breakdown displaying a breakdown of metrics and a list of related events" style="width:100%;" >}}

Click **View Failures** to open a side panel with the Change Failure Rate and Time To Restore metrics in addition to a list of failure events.

{{< img src="dora_metrics/failures_list.png" alt="The Failures Breakdown displaying a breakdown of metrics and a list of related events" style="width:100%;" >}}

## Use DORA Metrics data

### Export DORA Metrics widgets
Export your visualization widgets to dashboards, notebooks, or add them to existing incidents.

{{< img src="dora_metrics/dora_ui_2.png" alt="Click the Export icon to add the visualization widget to an incident or to a dashboard or notebook" style="width:100%;" >}}

Click the **Export** icon on any visualization to add it to an incident, dashboard, or notebook. For more information about the metrics calculated by DORA Metrics, see the [Data Collected documentation][3].

### Create custom dashboards

DORA metrics are highly flexible and can be used in custom dashboards to fit your team’s specific needs.

{{< img src="dora_metrics/dashboard.png" alt="An example of a custom DORA Metrics Dashboard" style="width:100%;" >}}

Within dashboards and graphs, custom tags are treated as [attributes][7]. In order to filter or group by a custom tag, it must be prefixed with an `@` symbol.

{{< img src="dora_metrics/graph_with_custom_tag.png" alt="An example of a custom DORA Metrics graph grouped by a custom tag" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /dora_metrics/setup/
[3]: /dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /monitors/types/metric/?tab=threshold
[6]: /monitors/
[7]: /dashboards/guide/quick-graphs/#graphing-events
