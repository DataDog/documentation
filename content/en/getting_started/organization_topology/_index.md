---
title: Organization Topology
description: Choose between single-org and multi-org Datadog deployments, achieve isolation with access controls, and manage multi-org environments.
aliases:
- /account_management/org_settings/organization_topology/
further_reading:
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Managing Multiple-Organization Accounts"
- link: "/account_management/organization_groups/"
  tag: "Documentation"
  text: "Organization Groups"
- link: "/account_management/org_settings/cross_org_visibility/"
  tag: "Documentation"
  text: "Cross-Organization Visibility"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Role Based Access Control (RBAC)"
- link: "/account_management/rbac/data_access/"
  tag: "Documentation"
  text: "Data Access Control"
- link: "/account_management/rbac/granular_access/"
  tag: "Documentation"
  text: "Granular Access Control"
- link: "/account_management/teams/"
  tag: "Documentation"
  text: "Teams"
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "SAML Single Sign-On"
---

## Overview

Your Datadog organization topology (single-organization or multi-organization) shapes how you observe services, control access, manage users, and attribute cost.

This page covers:
- The capabilities of a single-organization topology
- The scenarios that justify a multi-organization topology
- How to decide which topology fits your needs

## Start with a single organization

Datadog recommends a [single-organization topology](#single-organization-topology-recommended) for most deployments. You can manage a single organization by customizing the level of access to your Datadog resources. For example, large enterprises with thousands of users and multiple business units can use [Teams][7] and [granular access control][6] to satisfy strict compliance requirements.

Use a [multi-organization topology](#multi-organization-topology) only when a single organization cannot satisfy a hard requirement.

## Single-organization topology (recommended)

In a single-organization topology, business units, teams, and environments share one organization. Tag-based conventions (`team:`, `env:`, `service:`, `cost_center:`) drive access policies, dashboards, and billing attribution. Access controls enforce isolation between groups when needed.

### Capabilities of a single-org topology
A single organization gives you:

- **Connected observability:** Distributed traces flow end-to-end across services without gaps. Correlated views across metrics, logs, and traces work without additional customization.
- **One configuration surface:** Monitors, dashboards, pipelines, and SLOs live in one place, with no duplication and no drift.
- **Simple user management:** You only need one SSO configuration, one [SCIM][11] integration, and one set of roles and teams.
- **Per-team cost visibility:** Usage attribution breaks down spend by team, service, or business unit using tags, so you don't need separate organizations for separate billing views.
- **Low operational cost:** A single organization doesn't require Terraform modules per organization, cross-organization workarounds, or duplicated alert routing.

**Example:** A large technology company with 5,000 Datadog users across 12 business units uses one organization. Each business unit has a Team with discretionary access control restrictions on its telemetry. Platform admins have a global role. Business unit engineers see only their team's data.

### Access control within a single organization

Most organizations can meet their requirements with a single organization's access controls. [RBAC][3], [Data Access Control][4], [Granular Access Control][6], [Teams][7], and [IP allowlists][10] enforce strong data segregation within a single organization, even in regulated industries.

For detailed implementation guidance, see the [access control documentation][3].

### Limitations

All users within an organization can see core functionality such as infrastructure. Not all telemetry types support row-level restriction. See [supported telemetry types][5] for the full list.

## Multi-organization topology

Use multi-organization when a single organization with access controls cannot satisfy a hard requirement, or when separate billing entities require independent invoicing. The following five scenarios qualify.

### Scenario 1: Regulatory or contractual data isolation

_Would co-locating this data in the same organization violate a regulation or contract, even with team-based access restrictions?_

Some regulations require that data never coexist in the same logical boundary. The requirement is not that users cannot see the data, but that the data cannot share the same organization. If your compliance team or external auditors require physical organization-level separation (not row-level restrictions), multi-organization is the right choice.

Use multiple organizations: one per regulated workload, one per required region (for example, a European region), and one for everything else. [Cross-Organization Visibility][2] connects the organizations for operational dashboards using consolidated metrics. The regulated organization has stricter access policies, IP allowlists, and audit controls.

**Example:** A financial services firm separates its trading platform telemetry (subject to SEC/FINRA data handling requirements) into a dedicated organization. All other business units share the primary organization.

### Scenario 2: Meet data residency requirements

_Is cross-region data transfer prohibited for this data?_

When regulations prohibit telemetry from leaving a geographic region, you need organizations in different Datadog sites (for example, US1, EU1, AP1). [Cross-Organization Visibility][2] connects these organizations for operational dashboards without moving raw telemetry across borders.

### Scenario 3: Firewall data between teams

_Is it a risk if one team sees any trace of another team's data?_

Datadog access controls restrict the most common sources of sensitive data, but they do not support complete firewalled separation of all telemetry data or asset metadata. If your requirements demand zero data co-mingling, use separate organizations.

### Scenario 4: Isolate MSP customers

_Do you need separate billing, data boundaries, and user pools per customer?_

Managed service providers (MSPs) serving multiple external customers typically need each customer in an isolated organization with independent billing, data, and user management. Datadog's [parent-child organization model][1] supports this pattern.

Use a parent organization for the MSP's internal operations, with child organizations per customer. Each child organization has isolated data, users, and billing. The parent organization provides centralized operational views through [Cross-Organization Visibility][2].

**Example:** A managed infrastructure provider with 200+ customers creates a child organization per customer. The parent organization's NOC team monitors service health across all customer organizations with cross-organization dashboards.

### Scenario 5: Integrate an acquired company

_Are you integrating an acquired company that already has its own Datadog organization?_

Mergers and acquisitions often create temporary multi-organization states. The acquired company's organization remains active during integration while you prepare the target organization with appropriate access controls, teams, and configurations. The goal is consolidation into a single organization after access controls and migration tooling are in place. For consolidation guidance, contact your account team.

**Example:** After acquiring a SaaS company, an enterprise connects both organizations with [Cross-Organization Visibility][2] for immediate operational awareness. The enterprise then executes a phased consolidation over three to six months.

## Decide your topology

| Scenario | Organization topology |
| :---- | :---- |
| A regulation or contract requires data to exist in a physically separate organization boundary. | Multi-organization |
| Cross-region data transfer is prohibited for some of your telemetry. | Multi-organization |
| Your security policy requires zero data co-mingling between teams, even with [RBAC][3], [Data Access Control][4], and [Granular Access Control][6] in place. | Multi-organization |
| You serve external customers who need separate billing, data, and user pools. | Multi-organization (MSP) |
| You're integrating an acquired company that already has its own Datadog organization. | Temporary multi-organization |
| None of the above | Single organization |

### Compare org capabilities

In the following chart, "no change" indicates that Organization Groups do not introduce new capabilities.

| Capability | Single organization | Multi-organization | With Organization Groups |
| :---- | :---- | :---- | :---- |
| End-to-end distributed traces | Full | Cannot cross organization boundaries | No change |
| Telemetry data | Full | Share metrics, logs, and CI data into dashboards with [Cross-Organization Visibility][2] | No change |
| Dashboards (metrics, logs, traces) | Full | Share [invite-only shared dashboards][9] with members of another organization | No change |
| Monitor alerting across data sources | Full | No cross-organization monitor evaluation | No change |
| SLOs across services | Full | Cannot span organizations | No change |
| User management | One integration | Separate [SCIM][11] per organization | Centralized from group |
| RBAC and custom roles | One configuration | Must duplicate per organization | Centralized from group |
| SSO / SAML | One config ([multi-SAML][8] supports multiple IdPs) | Separate SAML per organization | Centralized from group |
| Billing and usage | Usage attribution per organization | Datadog aggregates usage across all child organizations and bills it at the parent organization level | No change |
| Feature rollout | Immediate | Must enable per organization | Centralized from group |

If your use case requires multi-organization, see [Organization Groups][12] for centralized governance across organizations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/multi_organization/
[2]: /account_management/org_settings/cross_org_visibility/
[3]: /account_management/rbac/
[4]: /account_management/rbac/data_access/
[5]: /account_management/rbac/data_access/#supported-telemetry
[6]: /account_management/rbac/granular_access/
[7]: /account_management/teams/
[8]: /account_management/saml/
[9]: /dashboards/sharing/shared_dashboards/#invite-only-shared-dashboards
[10]: /account_management/org_settings/ip_allowlist/
[11]: /account_management/scim/
[12]: /account_management/organization_groups/
