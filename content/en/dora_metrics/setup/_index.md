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

You can programmatically send your deployment and incident events to Datadog using the [DORA Metrics API][1]. You also have the option of marking a CI job as a deployment and sending a deployment event to Datadog using the [`datadog-ci` NPM package][2].

Deployment Event
: The data collected from a deployment event is used to compute Deployment Frequency, Change Lead Time, and Change Failure Rate.

Incident Event
: The data collected from an incident event is used to compute Change Failure Rate and Mean Time to Restore.

**Notes:**

- Deployment and incident events must be sent as soon as possible. Events for which the `finished_at` timestamp is 1 hour older than the current time are not accepted.
- Deployments or incidents of the same service cannot occur at the same second.

## Setup

{{< whatsnext desc="See the respective documentation to start sending your events to Datadog:" >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/deployments" >}}Deployment Events: Indicate that a new deployment has occurred for a service in a specific environment.{{< /nextlink >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/incidents" >}}Incident Events: Indicate that a new issue has occurred for a service in a specific environment.{{< /nextlink >}}
{{< /whatsnext >}}

## Examine metrics

[DORA Metrics][3] generates metrics from these events, which are available in the [Events Explorer][4], and can be queried programmatically by using the [Query timeseries points][5] and [Query timeseries data across multiple products][6] API endpoints. 

For more information, see the [Data Collected documentation][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/
[2]: https://www.npmjs.com/package/@datadog/datadog-ci#usage
[3]: /dora_metrics/
[4]: /service_management/events/explorer/
[5]: /api/latest/metrics/#query-timeseries-points
[6]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[7]: /dora_metrics/data_collected/