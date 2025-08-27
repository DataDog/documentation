---
title: Supported Features
description: Learn which Datadog Log Explorer features are supported in CloudPrem
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}
## Overview

Datadog CloudPrem brings core Log Explorer capabilities to your self-hosted environment. This page outlines available features, notes any differences from the SaaS platform, and helps you plan your log workflows.

## Supported features

The following log features are already supported:
- Full text search on any log attributes
- Group into Fields with all functions except the monthly timeshift
- Dashboards
- Log monitors
- RBAC through [Log Restriction Queries][1]
- Download CSV
- Correlation from a log to metrics sent to Datadog SaaS (the reverse is not yet supported)
- Correlation from a log to traces sent to Datadog SaaS (the reverse is not yet supported)

## Unsupported features

Features like Bits AI, LiveTail, Notebooks, Watchdogs, Sheets, Joins, Filter with Subquery, and search on multiple indexes are not supported.

[1]: /api/latest/logs-restriction-queries/
