---
title: Understanding Incident Data for DORA Metrics
description: Learn how to send incident events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/incidents
- /dora_metrics/setup/incidents
- /dora_metrics/failures/incident_api
- /dora_metrics/failures/pagerduty
is_beta: true
further_reading:
- link: "/continuous_integration/dora_metrics/setup/deployments"
  tag: "Documentation"
  text: "Learn about setting up deployment data in DORA Metrics"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## Overview

Failed deployments events, currently interpreted through incident events, are used to compute [change failure rate](#calculating-change-failure-rate) and [mean time to restore (MTTR)](#calculating-mean-time-to-restore). 

## Selecting an incident data source

{{< tabs >}}
{{% tab "PagerDuty" %}}

### Mapping PagerDuty services to Datadog services

When an incident event is received for a specific [PagerDuty service][101], Datadog attempts to retrieve the related Datadog service and team from the [Service Catalog][102].

The matching algorithm works in the following scenarios:

1. If the incident service URL matches with the PagerDuty service URL configured for one or more services in the Service Catalog:
   
   - If the incident service URL matches a single Datadog service, the incident metrics and events are emitted with the Datadog service name and team retrieved from the Service Catalog.
   - If the incident service URL matches multiple Datadog services, the incident metrics and events are emitted with the Datadog team name.
   
   For more information about setting the PagerDuty service URL for a Datadog service, see [Use Integrations with Service Catalog][103].

2. If the PagerDuty service name of the incident matches a Datadog service name in the Service Catalog, the incident metrics and events are emitted with the Datadog service name and team retrieved from the Service Catalog.
3. If the PagerDuty team name of the incident matches a Datadog team name in the Service Catalog, the incident metrics and events are emitted with the corresponding Datadog team name.
4. If the PagerDuty service name of the incident matches a Datadog team name in the Service Catalog, the incident metrics and events are emitted with the Datadog team name.

[101]: https://support.pagerduty.com/docs/services-and-integrations
[102]: /service_catalog/
[103]: /service_catalog/integrations/#pagerduty-integration

{{% /tab %}}
{{% tab "API" %}}

### Mapping services to Datadog services

When sending incident events using the [DORA Metrics API][101], you need to ensure that these events are properly attributed to the correct Datadog service and team from the [Service Catalog][102].

To apply the mapping instructions:

1. If the incident service URL matches with the PagerDuty service URL configured for one or more services in the Service Catalog:

   - If the incident event's `services` or `team` attribute matches a single Datadog service, the metrics are attributed to the specific Datadog service and team. Ensure that the `services` or `team` attribute in the incident event matches the corresponding Datadog service or team.
   - If the incident event's `services` or `team` attribute matches multiple Datadog services, the metrics are attributed based on the Datadog team associated with those services. If there are multiple Datadog services, ensure that the `team` attribute reflects the Datadog team name associated with these services.

2. If the incident event's `services` or `team` attribute matches a Datadog service name in the Service Catalog, the incident metrics are attributed to the Datadog service and team associated with this name. Ensure that the `services` or `team` attribute in your incident event matches exactly.

3. If the incident event's `team` attribute matches a Datadog team name in the Service Catalog, the metrics are attributed to the corresponding Datadog team. Ensure that the incident event has the correct `team` attribute to match the Datadog team.

4. If the incident event's `services` attribute matches a Datadog team name, the metrics are attributed to the Datadog team. Ensure that the `services` attribute is set correctly to match the Datadog team as needed.


[101]: /dora_metrics/failures/incident_api
[102]: /service_catalog/

{{% /tab %}}
{{< /tabs >}}


## Calculating change failure rate 
Change failure rate requires both [deployment data][7] and [incident data](#configuring-failure-data-sources).

Change failure rate is calculated as the percentage of incident events out of the total number of deployments. Datadog divides `dora.incidents.count` over `dora.deployments.count` for the same services and/or teams associated to both an failure and a deployment event. 

## Calculating time to restore 
Time to restore is calculated as the duration distribution for *resolved incident* events.

DORA Metrics generates the `dora.time_to_restore` metric by recording the start and end times of each incident event. It calculates the mean time to restore (MTTR) as the average of these `dora.time_to_restore` data points over a selected time frame. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/service_catalog
[4]: /tracing/service_catalog/setup
[5]: /tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /dora_metrics/deployments
