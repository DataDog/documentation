---
title: Set up DORA Metrics
kind: documentation
aliases:
- /continuous_integration/dora_metrics/setup/
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
---

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
The DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview

You can programmatically send deployment and incident events to Datadog.

[**Deployment events**][8]
: Indicate that a new deployment has occurred for a service in a specific environment. 

[**Incident events**][9]
: Indicate that a new issue has occurred for a service in a specific environment.

**Notes:**

- Deployment and incident events must be sent as soon as possible. Events for which the `finished_at` timestamp is 1 hour older than the current time are not accepted.
- Deployments or incidents of the same service cannot occur at the same second.

## Configure data sources

Each event type supports different data sources.

{{< whatsnext desc="Deployment events are used to compute Deployment Frequency, Change Lead Time, and Change Failure Rate. See the respective documentation to set up a data source for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/deployments/apm" >}}APM Deployment Tracking{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/deployments/" >}}Deployment event API or datadog-ci CLI{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Incident events are used to compute Change Failure Rate and Mean Time to Restore. See the respective documentation to set up a data source for your incident events:">}}
  {{< nextlink href="/dora_metrics/incidents/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/incidents/" >}}Incident event API{{< /nextlink >}}
{{< /whatsnext >}}

## Examine metrics

[DORA Metrics][3] generates metrics from these events, which are available in the [Events Explorer][4], and can be queried programmatically by using the [Query timeseries points][5] and [Query timeseries data across multiple products][6] API endpoints. 

For more information, see the [Data Collected documentation][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /dora_metrics/
[4]: /service_management/events/explorer/
[5]: /api/latest/metrics/#query-timeseries-points
[6]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[7]: /dora_metrics/data_collected/
[8]: /dora_metrics/deployments/_index.md
[9]: /dora_metrics/incidents/_index.md
