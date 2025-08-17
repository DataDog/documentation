---
title: Supported Features
description: Learn which Datadog Log Explorer features are supported in CloudPrem
private: true
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Log Explorer supported features

The following Log Explorer features are already supported:
- Full text search on any log attributes
- Group into Fields with all functions except the monthly timeshift
- Dashboards
- Log monitors
- RBAC through [Log Restriction Queries](/api/latest/logs-restriction-queries/)
- Download CSV
- Correlation from a log to metrics sent to Datadog SaaS (the reverse is not yet supported)
- Correlation from a log to traces sent to Datadog SaaS (the reverse is not yet supported)

## Unsupported features

Features like Bits AI, LiveTail, Notebooks, Watchdogs, Sheets, Joins, Filter with Subquery are not supported.

Search on multiple indexes is not yet available for CloudPrem.
