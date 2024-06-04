---
title: DORA Metrics
kind: documentation
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

{{< img src="dora_metrics/dora_page_light.png" alt="An overview of DORA Metrics calculations and insights in a given week" style="width:100%;" >}}

You can access and visualize your DORA metrics and filter them by team, service, repository, environment, and time period on the [**DORA Metrics** page][4]. For more information about the metrics calculated by DORA Metrics, see the [Data Collected documentation][3].

You can also export your DORA Metrics data to dashboards or notebooks and create [metric monitors][5] to trigger alerts on your metrics. For more information, see the [Monitors documentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /dora_metrics/setup/
[3]: /dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /monitors/types/metric/?tab=threshold
[6]: /monitors/
