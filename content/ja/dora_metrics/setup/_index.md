---
title: Set up DORA Metrics
kind: documentation
aliases:
- /continuous_integration/dora_metrics/setup/
further_reading:
- link: /dora_metrics/
  tag: Documentation
  text: Learn about DORA Metrics
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## Overview

The four DORA Metrics are calculated based on two types of events:

- [**Deployment events**][8]: Indicate that a new deployment has occurred for a service in a specific environment. 
- [**Incident events**][9]: Indicate that a new failure has occurred for a service in a specific environment.

Each event type supports different data sources.

## Configure data sources

### Deployments 
{{< whatsnext desc="Deployment events are used to compute deployment frequency, change lead time, and change failure rate. See the respective documentation to set up a data source for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/deployments/apm" >}}APM Deployment Tracking{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/deployments/deployment_api" >}}Deployment Event API or datadog-ci CLI{{< /nextlink >}}
{{< /whatsnext >}}

### Failures
{{< whatsnext desc="Failure events, interpreted through incident events, are used to compute change failure rate and mean time to restore. See the respective documentation to set up a data source for your failure events:">}}
  {{< nextlink href="/dora_metrics/failures/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/failures/incident_api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## Limitations
- When you first select a data source option (such as APM Deployment Tracking or PagerDuty), DORA Metrics begins populating data from that point forward. If you switch from source A to source B, then back to source A, the historical data from source A is only available from the time it was first selected. 
- Deployments or incidents of the same service cannot occur at the same second.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /dora_metrics/
[4]: /service_management/events/explorer/
[5]: /api/latest/metrics/#query-timeseries-points
[6]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[7]: /dora_metrics/data_collected/
[8]: /dora_metrics/deployments/
[9]: /dora_metrics/failures/
