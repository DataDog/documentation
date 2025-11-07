---
title: Set up DORA Metrics
description: "Configure deployment and failure event data sources for DORA Metrics including APM Deployment Tracking, API, CLI, and incident management."
aliases:
- /continuous_integration/dora_metrics/setup/
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
---

## Overview

The four DORA Metrics are calculated based on two types of events that support different data sources.

[**Deployment events**][8]
: Indicate that a new deployment has occurred for a service in a specific environment. Deployment events are used to compute deployment frequency, change lead time, and change failure rate.

[**Failure events**][9]
: Indicate that a new failure has occurred for a service in a specific environment. Failure events are used to compute change failure rate and time to restore.

## Configure data sources

### Select a deployment data source

{{< whatsnext desc="DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up one or more data sources for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apmdeploymenttracking" >}}APM Deployment Tracking{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apiorcli" >}}Deployment Event API or datadog-ci CLI{{< /nextlink >}}
{{< /whatsnext >}}

### Select a failure data source

{{< whatsnext desc="DORA Metrics supports the following data sources for failure events. See the respective documentation to set up one or more data sources for your failure events:" >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=datadog_incidents" >}}Datadog Incidents{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=api" >}}Failure Event API{{< /nextlink >}}
{{< /whatsnext >}}

## Limitations

- When you first select a data source option (such as APM Deployment Tracking or PagerDuty), DORA Metrics begins populating data from that point forward. If you switch from source A to source B, then back to source A, the historical data from source A is only available from the time it was first selected. 
- Deployments or failures of the same service cannot occur at the same second.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: /dora_metrics/setup/deployments/
[9]: /dora_metrics/setup/failures/
