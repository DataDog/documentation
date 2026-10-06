---
title: Deprecation of Incident Ingestion and Reporting in DORA Metrics
private: true
description: "Deprecation of incident ingestion and reporting in DORA Metrics: timeline, who is affected, and how to migrate your incident reporting."
further_reading:
- link: "/delivery_performance/dora_metrics/change_failure_detection/"
  tag: "Documentation"
  text: "Learn about Change Failure Detection"
- link: "/incident_response/incident_management/analytics_and_reporting/"
  tag: "Documentation"
  text: "Report on incidents with Incident Management Analytics"
- link: "/delivery_performance/dora_metrics/"
  tag: "Documentation"
  text: "Learn about DORA Metrics"
---

## Overview

<div class="alert alert-warning">
DORA Metrics is retiring incident ingestion and reporting. Incident ingestion ends on <strong>December 31, 2026</strong>. Incident data previously sent to DORA Metrics becomes inaccessible on <strong>March 31, 2027</strong>.
</div>

DORA Metrics stops ingesting and displaying incidents. This change affects the following:

- The incident views in DORA Metrics
- The DORA incident APIs
- The PagerDuty and Datadog Incidents data sources in [DORA Metrics settings][1]
- Any dashboard, notebook, or saved query that uses DORA incident data

### What is not changing

**How your DORA metrics are calculated.** Since January 2026, Change Failure Rate and Failed Deployment Recovery Time have used [Change Failure Detection][2] rather than incident events. Both metrics continue to work as they do today.

**Datadog Incident Management.** Your incidents and incident history in [Datadog Incident Management][3] are unaffected. You can continue to declare, manage, and report on them as usual.

## Who is affected

You are affected if your organization sends or reads incident data in DORA Metrics through any of the following:

- The **Datadog Incidents** data source in DORA Metrics settings
- The **PagerDuty** data source in DORA Metrics settings
- The **DORA incident API** (`POST /api/v2/dora/incident`)

The steps you need to take depend on which of these your organization uses.

### If you use only the Datadog Incidents data source

Your incidents are stored in Datadog Incident Management, which is not affected by this change. Only the incident views within DORA Metrics are removed, on December 31, 2026. Your incident history remains available in Incident Management, so the March 31, 2027 export deadline does not apply to your organization.

**What to do**: Check whether any of your dashboards, notebooks, or saved queries reference DORA incident data. Update those to use [Incident Management Analytics][4] before December 31, 2026. If none do, no action is needed.

### If you use the DORA incident API or the PagerDuty data source

Incidents you send through the DORA incident API or the PagerDuty data source are stored by DORA Metrics. Both dates in the [timeline](#timeline) apply to your organization.

**What to do**: Remove your API calls, migrate your reporting, and export any incident history you want to keep.

## Timeline

### December 31, 2026: incident ingestion ends

DORA Metrics stops accepting new incidents:

- The incident ingestion and deletion APIs are disabled.
- The PagerDuty data source in DORA Metrics stops forwarding incidents.
- Datadog Incidents data is no longer displayed in DORA Metrics.

Before this date:

- **If you call the DORA incident APIs**: Remove your calls to the incident ingestion endpoint (`POST /api/v2/dora/incident`) and the incident deletion endpoint.
- **If you use DORA incidents for ongoing reporting**: Move your reporting to one of the [alternatives](#alternatives-for-incident-reporting) to avoid a gap in your data.

### March 31, 2027: access to DORA incident data ends

Incidents previously sent through the DORA incident API or the PagerDuty data source can no longer be viewed or exported. Datadog removes the incident views and the PagerDuty and Datadog Incidents configurations from DORA Metrics settings.

Incidents ingested before December 31, 2026 remain available for viewing and export until March 31, 2027.

Before this date:

- **To keep your incident history**: Export it with the [incident events API][5] or download your dashboard data as CSV.
- **If dashboards, notebooks, or saved queries reference DORA incident data**: Update or retire them.

## Alternatives for incident reporting

| Source of your incidents | Use instead |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | The [Datadog PagerDuty integration][6], which brings triggered and resolved events into the Events Explorer. This integration is separate from the PagerDuty data source in DORA Metrics. |
| Custom incident events sent through the API | The [Datadog Events API][7], to send events to the Events Explorer for querying and dashboards. To declare and manage incidents in Datadog, use [Datadog Incident Management][3]. |

**Note**: These alternatives support incident reporting only. They do not feed DORA stability metrics, which use [Change Failure Detection][2].

## Get help

If you need help assessing the impact of this change or updating your incident reporting, contact [Datadog Support][8].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /delivery_performance/dora_metrics/change_failure_detection/
[3]: /incident_response/incident_management/
[4]: /incident_response/incident_management/analytics_and_reporting/
[5]: /api/latest/dora-metrics/get-a-list-of-incident-events/
[6]: /integrations/pagerduty/
[7]: /api/latest/events/post-an-event/
[8]: /help/
