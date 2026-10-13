---
title: Changelog
description: Review recent changes to Datadog API operations, ordered newest first. Entries are maintained by the API product team and collected here in one changelog.
breadcrumbs: Docs > API > Changelog
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Changelog

Review recent changes to Datadog API operations, ordered newest first. Entries are maintained by the API product team and collected here in one changelog.

## 2026-10-08

- **Breaking**: Ai Impact: Document AI Impact user activity endpoint under DORA Metrics (Operations: `CreateAIImpactUserActivity`)
- **Modified**: [Dashboards](/api/latest/dashboards/): Add Heatgrid dashboard widget support (Operations: [`CreateDashboard`](/api/latest/dashboards/create-a-new-dashboard/), [`ListDashboards`](/api/latest/dashboards/get-all-dashboards/))
- **Added**: [Incidents](/api/latest/incidents/): Add incident listing endpoint (Operations: [`ListIncidents`](/api/latest/incidents/get-a-list-of-incidents/))

## 2026-10-07

- **Deprecated**: [Incidents](/api/latest/incidents/): Deprecate legacy incident creation (Operations: [`CreateIncident`](/api/latest/incidents/create-an-incident/))

## 2026-10-06

- **Modified**: [Dashboards](/api/latest/dashboards/): Document dashboard quality scores in `GetDashboardUsage` (Operations: `GetDashboardUsage`)

## 2026-10-02

- **Added**: Ai Impact: Add AI Impact user activity endpoint (Operations: `CreateAIImpactUserActivity`)
