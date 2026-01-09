---
title: Supported Features
description: Learn which Datadog Log Explorer features are supported in CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}
## Overview

Datadog CloudPrem brings core Log Explorer capabilities to your self-hosted environment. This page outlines available features, notes any differences from the SaaS platform, and helps you plan your log workflows.

## Supported features

The following log features are already supported:
- Full text search on any log attributes
- List, Timeseries, Top List, Table, Tree Map, Pie Chart, Scatter Plot visualizations
- Group by into Fields and Patterns (except the monthly timeshift)
- Dashboards
- Log monitors
- RBAC through [Log Restriction Queries][1]
- Download CSV
- Correlation from a log to metrics sent to Datadog SaaS (the reverse is not yet supported)
- Correlation from a log to traces sent to Datadog SaaS (the reverse is not yet supported)

## Not yet supported features

- Bits AI SRE -- Coming soon
- Index management for multiple retention periods and segmentation needs -- Coming soon
- Notebooks -- Coming soon
- Federated search -- Coming soon
- LiveTail
- Watchdogs

[1]: /api/latest/logs-restriction-queries/
