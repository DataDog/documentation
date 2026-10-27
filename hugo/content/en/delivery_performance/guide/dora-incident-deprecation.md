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

As of **January 31, 2027**, DORA Metrics does not ingest new incidents, and the DORA incident tracking view is removed. This affects the following:

- The incident tracking view in DORA Metrics
- The DORA failure and incident ingestion and deletion APIs
- The PagerDuty and Datadog Incidents data sources in [DORA Metrics settings][1]

Incidents ingested before this date remain available in custom dashboards, and you can still query them with the DORA API [list][5] and [get][9] endpoints.

This does not affect how Change Failure Rate and Failed Deployment Recovery Time are calculated. Since January 2026, these metrics use [Change Failure Detection][2], not incident events.

If you have incidents and incident history in [Datadog Incident Management][3], they are also unaffected. You can declare, manage, and report on them independently of DORA Metrics.

## Actions by data source

The actions you need to take depend on whether your organization sends or reads incident data in DORA Metrics through any of the following:

- The **Datadog Incidents** data source in DORA Metrics settings
- The **PagerDuty** data source in DORA Metrics settings
- The **DORA failure API** (`POST /api/v2/dora/failure`) or the deprecated **DORA incident API** (`POST /api/v2/dora/incident`)

### Datadog Incidents data source

Incidents from the **Datadog Incidents** data source in DORA Metrics settings are stored in Datadog Incident Management, not in DORA Metrics. Your incident history stays available in Incident Management.

If any dashboards, notebooks, or saved queries reference the DORA incident tracking view, update them to use [Incident Management Analytics][4] before January 31, 2027. Otherwise, no action is needed.

### PagerDuty data source or DORA failure and incident APIs

Before January 31, 2027:

1. Remove calls to the following endpoints from your scripts and CI/CD pipelines. After this date, they are disabled and return a 4xx error.
   - `POST /api/v2/dora/failure` and `POST /api/v2/dora/incident`
   - `DELETE /api/v2/dora/failure/{failure_id}` and `DELETE /api/v2/dora/incident/{incident_id}`
1. Move your ongoing reporting to one of the [alternatives](#alternatives-for-incident-reporting) to avoid a gap in your incident data.

You do not need to export your incident history. Incidents ingested before this date remain available in custom dashboards and through the DORA API [list][5] and [get][9] endpoints.

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
| January&nbsp;31,&nbsp;2027 | DORA Metrics stops accepting incidents: <br>- The failure and incident ingestion and deletion APIs are disabled and return a 4xx error.<br>- The PagerDuty data source in DORA Metrics stops forwarding incidents.<br>- New Datadog Incidents are no longer pulled into DORA Metrics.<br>- The DORA incident tracking view is removed, and Datadog removes incident configurations from [DORA Metrics settings][1].<br>Incidents ingested before this date remain available in custom dashboards and through the DORA API [list][5] and [get][9] endpoints. |

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
[9]: /api/latest/dora-metrics/get-an-incident-event/
