---
title: Sending Failure Events for DORA Metrics
kind: documentation
description: Learn how to send incident events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/incidents
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "/continuous_integration/dora_metrics/setup/failures"
  tag: "Documentation"
  text: "Learn about sending failure events"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
The DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview

Failure events, interpreted through incident events, are used to compute [change failure rate](#calculating-change-failure-rate) and [mean time to restore (MTTR)](#calculating-mean-time-to-restore). 

## Configuring failure data sources 

{{< whatsnext desc="DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up a data source for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/failures/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/failures/incident_api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## Calculating change failure rate 

Change failure rate is calculated by dividing `dora.incidents.count` over `dora.deployments.count` for the same services and/or teams associated to both an failure and a deployment event. 

## Calculating mean time to restore 

DORA Metrics generates a `dora.time_to_restore` metric based on the start and end times for each incident event. For mean time to restore, DORA Metrics calculates the average of individual `dora.time_to_restore` data points over a selected time frame. 


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/service_catalog
[4]: /tracing/service_catalog/setup
[5]: /tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
