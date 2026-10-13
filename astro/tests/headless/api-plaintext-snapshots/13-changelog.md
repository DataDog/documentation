---
title: Changelog
description: Review recent additions, modifications, and removals to Datadog API operations.
breadcrumbs: Docs > API > Changelog
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Changelog

Review recent additions, modifications, and removals to Datadog API operations.

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
