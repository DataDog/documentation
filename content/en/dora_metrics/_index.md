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
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/service_management/events"
  tag: "Documentation"
  text: "Learn about Event Management"
- link: "/monitors/types/metric"
  tag: "Documentation"
  text: "Learn about Metric Monitors"
- link: "/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## Overview

DevOps Research and Assessment (DORA) metrics are [four key metrics][1] that indicate the velocity and stability of software development.

Deployment frequency
: How often an organization successfully releases to production.

Lead time for changes
: The amount of time it takes a commit to get into production.

Change failure rate
: The percentage of deployments causing a failure in production.

Time to restore service
: How long it takes an organization to recover from a failure in production.

Defining and tracking DORA metrics can help you identify areas of improvement for your team or organization's speed and quality of software delivery.

## Set up DORA Metrics

To start configuring data sources to send deployment and incident events to Datadog, see the [Setup documentation][2].

## Analyze DORA Metrics

Once you've set up the data sources for your deployment and failure events, navigate to [**Software Delivery** > **DORA Metrics**][4] to identify improvements or regressions for each metric, aggregate them by service or environment, and compare trends over time.

{{< img src="dora_metrics/overview_2.png" alt="An overview of DORA Metrics calculations and insights in a given week" style="width:100%;" >}}

You can examine visualizations and filter the collected data by team, service, repository, environment, and time period.

Click **View Deployments** to open a side panel with the Deployment Frequency and Change Lead Time metrics in addition to a list of deployment events.

{{< img src="dora_metrics/deployments_2.png" alt="The Deployments Breakdown side panel on the DORA Metrics page displaying a breakdown of metrics and a list of related events" style="width:100%;" >}}

Click **View Failures** to open a side panel with the Change Failure Rate and Mean Time To Restore (MTTR) metrics in addition to a list of failure events.

{{< img src="dora_metrics/failures_2.png" alt="The Failures Breakdown side panel on the DORA Metrics page displaying a breakdown of metrics and a list of related events" style="width:100%;" >}}

## Use DORA Metrics data

Export your visualization widgets to dashboards or notebooks, add them to existing incidents, and create [metric monitors][5] to trigger alerts on your metrics.

{{< img src="dora_metrics/export_2.png" alt="Click the Export icon to add the visualization widget to an incident or to a dashboard or notebook" style="width:100%;" >}}

Click the **Export** icon on any visualization to add it to an incident, dashboard, or notebook. For more information about the metrics calculated by DORA Metrics, see the [Data Collected documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /dora_metrics/setup/
[3]: /dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /monitors/types/metric/?tab=threshold
[6]: /monitors/
