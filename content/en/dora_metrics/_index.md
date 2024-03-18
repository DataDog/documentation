---
title: DORA Metrics
kind: documentation
description: Learn how to use DORA metrics to measure and improve software development.
aliases:
- /continuous_integration/dora_metrics
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "/continuous_integration/pipelines"
  tag: "Documentation"
  text: "Learn about Pipeline Visibility"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/continuous_integration/tests"
  tag: "Documentation"
  text: "Learn about Test Visibility"
- link: "/code_analysis"
  tag: "Documentation"
  text: "Learn about Code Analysis"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
DORA Metrics are in private beta. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview

DevOps Research and Assessment (DORA) metrics are [four key metrics][1] used to indicate the velocity and stability of software development.

Deployment Frequency
: How often an organization successfully releases to production.

Lead Time for Changes
: The amount of time it takes a commit to get into production.

Change Failure Rate
: The percentage of deployments causing a failure in production.

Time to Restore Service
: How long it takes an organization to recover from a failure in production.

Defining and tracking DORA metrics can help you identify areas of improvement for your team or organization's speed and quality of software delivery.

## Set up DORA Metrics

The four DORA Metrics are calculated based on two types of events:
- **Deployment events**: they indicate that a new deployment has occurred for a service in a specific environment.
  Deployment events are used to compute Deployment Frequency, Change Lead Time, and Change Failure Rate.
- **Incident events**: they indicate that a new issue has occurred for a service in a specific environment.
  Incident events are used in order to compute Change Failure Rate and Mean Time to Restore.

{{< whatsnext desc="Set up DORA Metrics in Datadog:" >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/deployments" >}}Send Deployment Events{{< /nextlink >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/incidents" >}}Send Incident Events{{< /nextlink >}}
{{< /whatsnext >}}

## Use DORA Metrics

You can access and visualize your DORA metrics and filter them by team, service, repository, environment, and time period on the [DORA Metrics page][2].

Use the information on this page to identify improvements or regressions for each metric, visualize changes, and compare trends over time. DORA metrics can be exported to dashboards or notebooks and be alerted on using [metric monitors][3].

The metrics can also be queried with the [Query timeseries points][4] and [Query timeseries data across multiple products][5] API endpoints.

The metrics provided by DORA Metrics are:

| Metric | Type | Description |
| :--- | :--- | :--- |
| `dora.deployments.count` | count | Used for Deployment Frequency.
| `dora.change_lead_time` | distribution | Contains the age in `seconds` of the git commits at the time of deployment.
| `dora.incidents_impact` | count | Tracks the services or teams impacted by incidents. Used for Change Failure Rate with the formula `dora.incidents_impact / dora.deployments.count`. A big time rollup of at least 1 week is recommended to account for time difference between deployments and when the impact starts.
| `dora.time_to_restore` | distribution | Contains the time in `seconds` between the incident's `started_at` and `finished_at`.

All the metrics contain the following tags when available:
- `service`
- `team`
- `env`
- `repository_id`

**Note**: The `severity` tag is available for the `dora.incidents_impact` and `dora.time_to_restore` metrics, if provided through the API.

### Deployment and incident events

DORA Metrics also provides individual `deployment`, `incident`, and `incident_finished` events in [Event Management][6] with `source:software_delivery_insights`.

The events can be queried and visualized with the [Events Explorer][7].

### Limitations

- Deployment and incident events must be sent as soon as possible. Events for which the `finished_at` timestamp is 1 hour older than the current time are not accepted.
- Deployments or incidents of the same service cannot occur at the same second.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
[2]: https://app.datadoghq.com/ci/dora
[3]: https://docs.datadoghq.com/monitors/types/metric/?tab=threshold
[4]: https://docs.datadoghq.com/api/latest/metrics/#query-timeseries-points
[5]: https://docs.datadoghq.com/api/latest/metrics/#query-timeseries-data-across-multiple-products
[6]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[7]: https://docs.datadoghq.com/service_management/events/explorer/
