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

As of **December 31, 2026**, DORA Metrics does not ingest or display incident data, and as of **March 31, 2027**, incidents stored in DORA Metrics are inaccessible. This affects the following:

- The incident views in DORA Metrics
- The DORA incident APIs
- The PagerDuty and Datadog Incidents data sources in [DORA Metrics settings][1]
- Any dashboard, notebook, or saved query that uses DORA incident data

This does not affect how Change Failure Rate and Failed Deployment Recovery Time are calculated, because they use [Change Failure Detection][2], not incident events.

If you have incidents and incident history in [Datadog Incident Management][3], they are also unaffected. You can declare, manage, and report on them independently of DORA Metrics.

## Actions by data source

The actions you need to take depend on whether your organization sends or reads incident data in DORA Metrics through any of the following:

- The **Datadog Incidents** data source in DORA Metrics settings
- The **PagerDuty** data source in DORA Metrics settings
- The **DORA incident API** (`POST /api/v2/dora/incident`)

### Datadog Incidents data source

Incidents from the **Datadog Incidents** data source in DORA Metrics settings are stored in Datadog Incident Management, not in DORA Metrics. Your incident history stays available in Incident Management, so the March 31, 2027 export deadline does not apply.

If any dashboards, notebooks, or saved queries reference DORA incident data, update them to use [Incident Management Analytics][4] before December 31, 2026. Otherwise, no action is needed.

### PagerDuty data source or DORA incident API

Incidents from the **PagerDuty** data source in DORA Metrics settings or the **DORA incident API** are stored in DORA Metrics, so both dates apply. To keep your incident reporting and history:

1. Before December 31, 2026:
   - Remove calls to the incident ingestion endpoint (`POST /api/v2/dora/incident`) and the incident deletion endpoint.
   - Move your ongoing reporting to one of the [alternatives](#alternatives-for-incident-reporting) to avoid a gap in your incident data.
1. Before March 31, 2027:
   - Export any incident history you want to keep with the [incident events API][5], or download your dashboard data as CSV.
   - Update or retire any dashboards, notebooks, or saved queries that reference DORA incident data.

## Alternatives for incident reporting

| Incidents source | Use instead |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | The [Datadog PagerDuty integration][6], which brings triggered and resolved events into the Events Explorer. This integration is separate from the PagerDuty data source in DORA Metrics. |
| Custom incident events sent through the API | The [Datadog Events API][7], to send events to the Events Explorer for querying and dashboards. To declare and manage incidents in Datadog, use [Datadog Incident Management][3]. |

<div class="alert alert-info">These alternatives support incident reporting only. They do not feed DORA stability metrics, which use <a href="/delivery_performance/dora_metrics/change_failure_detection/">Change Failure Detection</a>.</div>

## Timeline

| Date | Change |
| --- | --- |
| December&nbsp;31,&nbsp;2026 | DORA Metrics stops accepting incidents: <br>- Incident ingestion and deletion APIs are disabled.<br>- The PagerDuty data source in DORA Metrics stops forwarding incidents.<br>- Datadog Incidents data is not displayed in DORA Metrics.<br>Incidents ingested before this date remain available for viewing and export until March 31, 2027. Datadog removes incident configurations from [DORA Metrics settings][1]. |
| March&nbsp;31,&nbsp;2027 | Incidents previously sent through the DORA cannot be viewed or exported. |

## Get help

For help assessing the impact or updating your incident reporting, contact [Datadog Support][8].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /delivery_performance/dora_metrics/change_failure_detection/
[3]: /incident_response/incident_management/
[4]: /incident_response/incident_management/analytics_and_reporting/
[5]: /api/latest/dora-metrics/get-a-list-of-incident-events/
[6]: /integrations/pagerduty/
[7]: /api/latest/events/post-an-event/
[8]: /help/
