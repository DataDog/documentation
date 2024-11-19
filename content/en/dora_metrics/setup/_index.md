---
title: Set up DORA Metrics
aliases:
- /continuous_integration/dora_metrics/setup/
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in Preview.</div>

## Overview

The four DORA Metrics are calculated based on two types of events that support different data sources.

[**Deployment events**][8]
: Indicate that a new deployment has occurred for a service in a specific environment. Deployment events are used to compute deployment frequency, change lead time, and change failure rate.

[**Incident events**][9]
: Indicate that a new failure has occurred for a service in a specific environment. Incident events are used to compute change failure rate and mean time to restore.

## Configure data sources

### Select a deployment data source

{{< whatsnext desc="DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up the data source for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apmdeploymenttracking" >}}APM Deployment Tracking{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/deployments?tab=apiorcli" >}}Deployment Event API or datadog-ci CLI{{< /nextlink >}}
{{< /whatsnext >}}

### Select an incident data source

{{< whatsnext desc="DORA Metrics supports the following data sources for incident events. See the respective documentation to set up a data source for your incident events:" >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/setup/failures?tab=api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## Limitations

- When you first select a data source option (such as APM Deployment Tracking or PagerDuty), DORA Metrics begins populating data from that point forward. If you switch from source A to source B, then back to source A, the historical data from source A is only available from the time it was first selected. 
- Deployments or incidents of the same service cannot occur at the same second.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: /dora_metrics/setup/deployments/
[9]: /dora_metrics/setup/failures/
