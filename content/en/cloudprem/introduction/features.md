---
title: Supported Features
description: Learn which Datadog Log Explorer features are supported in BYOC Logs
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="BYOC Logs is in Preview" >}}
  Join the BYOC Logs Preview to access new self-hosted log management features.
{{< /callout >}}
## Overview

Datadog BYOC Logs brings core Log Explorer capabilities to your self-hosted environment. This page outlines available features, notes any differences from the SaaS platform, and helps you plan your log workflows.

## Supported features

The following log features are supported:

**Search and visualization**
- Full text search on any log attributes
- List, Timeseries, Top List, Table, Tree Map, Pie Chart, Scatter Plot visualizations
- Group by into Fields and Patterns (except monthly timeshift)
- Facet-based filtering and drill-down
- Download CSV

**Dashboards and monitors**
- Dashboards with BYOC Logs log data
- Log monitors on BYOC Logs indexes
- Bits AI SRE

**Index management**
- Multiple indexes with independent retention periods and routing rules

**Access control**
- RBAC through [Log Restriction Queries][1]

**Correlation**
- Correlation from a BYOC Logs log to metrics sent to Datadog SaaS
- Correlation from a BYOC Logs log to traces sent to Datadog SaaS

## Unsupported features

Feature support is actively evolving. The following are not currently supported:

- **SIEM**: Not available for BYOC Logs data.
- **Watchdog**: Not available for BYOC Logs data.
- **Notebooks**: Log data from BYOC Logs cannot be used in Notebooks.
- **Federated search**: Searching across multiple BYOC Logs clusters from a single query is not supported.
- **LiveTail**: Real-time log streaming is not available for BYOC Logs indexes.
- **Log context view**: Viewing surrounding logs in context is not yet supported.

[1]: /api/latest/logs-restriction-queries/
