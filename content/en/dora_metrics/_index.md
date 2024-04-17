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

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
The DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview

DevOps Research and Assessment (DORA) metrics are [four key metrics][1] that indicate the velocity and stability of software development. Defining and tracking DORA metrics can help you identify areas of improvement for your team or organization's speed and quality of software delivery.

Deployment Frequency
: How often an organization successfully releases to production.

Lead Time for Changes
: The amount of time it takes a commit to get into production.

Change Failure Rate
: The percentage of deployments causing a failure in production.

Time to Restore Service
: How long it takes an organization to recover from a failure in production.

Datadog DORA Metrics provides actionable insights into your organization's software delivery process and enables engineering efficiency by integrating telemetry data from your entire stack—across infrastructure, applications, CI/CD, and more.

## Set up DORA Metrics

To start sending deployment and incident events to Datadog, see the [Setup documentation][2].

## Use DORA Metrics

Once you've sent your deployment and incident events, navigate to **Software Delivery** > **DORA Metrics** to identify improvements or regressions for each metric, visualize changes, and compare trends over time. 

{{< img src="dora_metrics/home.png" alt="An Overview of your DORA Metrics calculations and insights in the last week" style="width:100%;" >}}

You can access and visualize your DORA metrics and filter them by team, service, repository, environment, and time period on the [**DORA Metrics** page][4]. For more information about the metrics calculated by DORA Metrics, see the [Data Collected documentation][3].

## Examine DORA Metrics events

DORA Metrics provides individual `deployment`, `incident`, and `incident_finished` events under the `Software Delivery Insights` source in [Event Management][4]. Navigate to [**Service Management** > **Event Management** > **Explorer**][5] and enter `source:software_delivery_insights` in the search query to filter on DORA Metrics events.

{{< img src="dora_metrics/events.png" alt="Events collected from DORA Metrics in the Events Explorer" style="width:100%;" >}}

You can export your DORA Metrics data to dashboards or notebooks and create [metric monitors][5] to trigger alerts on your metrics. For more information, see the [Monitors documentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
[2]: /dora_metrics/setup/
[3]: /dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /monitors/types/metric/?tab=threshold
[6]: /monitors/