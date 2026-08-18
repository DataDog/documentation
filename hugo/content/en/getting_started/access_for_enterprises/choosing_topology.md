---
title: Choosing Your Datadog Topology
description: Decide between single-org and multi-org Datadog topology for your enterprise.
further_reading:
- link: "/account_management/organization_topology/"
  tag: "Documentation"
  text: "Organization Topology"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Multi-Organization Account Management"
- link: "/account_management/rbac/data_access"
  tag: "Documentation"
  text: "Data Access Control"
- link: "/getting_started/teams/"
  tag: "Documentation"
  text: "Getting Started with Teams"
---

## Overview

The first decision in your access strategy is how many Datadog organizations your enterprise needs. This decision affects everything downstream: how you define roles, restrict data, share dashboards, and manage identity. Getting it right up front avoids costly migrations later.

## Start with a single org

Datadog recommends a **single organization** where possible. A single org maximizes the power of connected observability workflows. Traces link to logs, logs link to infrastructure, and dashboards can span your entire estate. Datadog's access controls (including [Data Access Control][1], [granular access controls][2], and [custom roles][3]) provide enterprise-grade data segregation within a single org, even in regulated industries.


## Evaluate segmentation before splitting orgs

Instead of adding multiple organizations, ask whether **Teams and Data Access Control** can provide the isolation you need within a single org. You can operate dozens of internal business units, agencies, or subsidiaries within a small number of orgs, using Data Access Control to restrict data visibility and granular access controls to protect resources. This approach preserves cross-cutting observability while still maintaining strict boundaries.

The key question is: *Do these groups need to share any operational context?* If teams trace requests across each other's services, share infrastructure, or participate in the same incidents, a single org with strong internal segmentation is the better path.

## When multiple orgs are appropriate

There are some cases where multiple organizations are justified:

- **Separate companies or acquisitions** that do not share infrastructure, services, or personnel. If there is no shared operational context, a shared org provides little value.
- **Hard compliance boundaries** requiring complete data isolation between divisions. For example, a defense division whose standard metrics and infrastructure must be invisible to commercial users, even at the metadata level.
- **Distinct billing or contractual requirements** where usage must be tracked and invoiced independently.

You can also use multiple orgs as a workaround when within-org access controls don't yet cover all products. As Datadog's access controls expand, you can consolidate orgs over time.

## Recommendations

- **Default to a single org.** Use Teams and Data Access Control for internal segmentation. Only create additional orgs when there is a clear isolation requirement that cannot be met within a single org.
- **Evaluate the isolation question honestly.** If the answer to "Do these groups share any services, infrastructure, or operational context?" is yes, they likely belong in the same org.
- **Plan for consolidation.** If you have orgs that were created as workarounds for access control limitations, revisit whether they're still needed as Datadog's within-org controls expand.
- **Org migrations have limitations.** If you choose to migrate your org setups in the future, it is possible to move configurations and assets like dashboards and monitors, but not historical telemetry data.

For a detailed comparison of single-org and multi-org architectures, including access control models and decision criteria, see [Organization Topology][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access
[2]: /account_management/rbac/granular_access
[3]: /account_management/rbac/permissions/#custom-roles
[4]: /account_management/organization_topology/
