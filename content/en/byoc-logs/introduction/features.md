---
title: Supported Features
description: Learn which Datadog Log Explorer features are supported in BYOC Logs
aliases:
  - /cloudprem/introduction/features/
---

## Overview

Datadog BYOC (Bring Your Own Cloud) Logs brings core Log Explorer capabilities to your self-hosted environment. This page outlines available features, notes any differences from the SaaS platform, and helps you plan your log workflows.

## Supported features

The following log features are supported:

**Search and visualization**
- Full text search on any log attributes
- List, Timeseries, Top List, Table, Tree Map, Pie Chart, Scatter Plot visualizations
- Group by into Fields and Patterns (except monthly timeshift)
- Group by sort by, including group by sort by with count unique
- Flat group queries
- Facet-based filtering and drill-down
- Download CSV
- Pagination
- Notebooks (Preview)

**Dashboards and monitors**
- Dashboards with BYOC Logs data
- Log monitors on BYOC Logs indexes

**Index management**
- Multiple indexes with independent retention periods and routing rules

**Access control**
- RBAC through [Log Restriction Queries][1]

**Correlation**
- Correlation from a log in BYOC Logs to metrics sent to Datadog SaaS
- Correlation from a log in BYOC Logs to traces sent to Datadog SaaS
- Correlation from a log in BYOC Logs to processes sent to Datadog SaaS

**Processing**
- Configurable processing pipelines through Observability Pipelines
- Observability Pipeline connection

**AI features**
- Bits Investigation (Preview)
- MCP Server (Preview)

## Unsupported features

Feature support is actively evolving. The following are not currently supported:

- **SIEM**
- **Watchdog**
- **Federated search**
- **LiveTail**
- **Log context view**

### Query capabilities not currently supported

- **CIDR query**
- **Group by transactions**
- **Advanced query capabilities**:
  - Calculated fields
  - Grok extraction (query-time parsing)

[1]: /api/latest/logs-restriction-queries/
