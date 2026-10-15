---
title: Changelog
description: Review recent changes to Datadog API operations, ordered newest first. Entries are maintained by the API product team and collected here in one changelog.
breadcrumbs: Docs > API > Changelog
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Changelog

Review recent changes to Datadog API operations, ordered newest first. Entries are maintained by the API product team and collected here in one changelog.

## 2026-10-08

- **Modified**: [Dashboards](https://docs.datadoghq.com/api/latest/dashboards.md): Add Heatgrid dashboard widget support (Operations: [`CreateDashboard`](https://docs.datadoghq.com/api/latest/dashboards/create-a-new-dashboard.md), [`ListDashboards`](https://docs.datadoghq.com/api/latest/dashboards/get-all-dashboards.md))
- **Breaking**: Deployment Gates: Remove legacy Deployment Gate evaluation endpoint (Operations: `ListDeploymentGateEvaluations`)
- **Added**: [Incidents](https://docs.datadoghq.com/api/latest/incidents.md): Add incident listing endpoint (Operations: [`ListIncidents`](https://docs.datadoghq.com/api/latest/incidents/get-a-list-of-incidents.md))

## 2026-10-07

- **Deprecated**: [Incidents](https://docs.datadoghq.com/api/latest/incidents.md): Deprecate legacy incident creation (Operations: [`CreateIncident`](https://docs.datadoghq.com/api/latest/incidents/create-an-incident.md))

## 2026-10-06

- **Modified**: [Dashboards](https://docs.datadoghq.com/api/latest/dashboards.md): Document dashboard quality scores in `GetDashboardUsage` (Operations: `GetDashboardUsage`)

## 2026-10-02

- **Added**: Deployment Gates: Document public Deployment Gate evaluation endpoint (Operations: `ListDeploymentGateEvaluations`)
