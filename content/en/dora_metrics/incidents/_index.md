---
title: Sending Incident Events for DORA Metrics
kind: documentation
description: Learn how to send incident events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/incidents
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "/continuous_integration/dora_metrics/setup/incidents"
  tag: "Documentation"
  text: "Learn about sending incident events"
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

## Configuring incident data sources 
Incident events are used to compute change failure rate and mean time to restore (MTTR). DORA Metrics supports the data sources below for deployment events. Select an option below to set up the data source for your deployment events:

{{< whatsnext >}}
  {{< nextlink href="/dora_metrics/incidents/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/incidents/incident_api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## Calculating change failure rate 

Change failure rate is calculated by dividing `dora.incidents.count` over `dora.deployments.count` for the same services and/or teams associated to both an incident and a deployment event. 

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
