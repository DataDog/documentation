---
title: Designing Your Organization Topology
description: Choose between single-org and multi-org Datadog deployments, achieve isolation with access controls, and manage multi-org environments.
further_reading:
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Managing Multiple-Organization Accounts"
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

Your Datadog organization topology—single org or multi-org—affects how you observe services, control access, manage users, and attribute costs. This guide helps you choose the right topology, understand when multi-org is justified, and manage multi-org environments when they are.

## Start with a single organization

**Use one Datadog organization.** For most deployments, including large enterprises with thousands of users, multiple business units, and strict compliance requirements, a single org with [Teams][7] and access controls is the right architecture.

A single organization gives you:

- **Connected observability.** Distributed traces flow end-to-end across services without gaps. Correlated views across metrics, logs, and traces work out of the box.
- **One configuration surface.** Monitors, dashboards, pipelines, and SLOs live in one place. No duplication, no drift.
- **Simpler user management.** One SSO configuration, one SCIM integration, one set of roles and teams.
- **Per-team cost visibility.** Usage attribution breaks down spend by team, service, or business unit using tags. No need for separate orgs to get separate billing views.
- **Lower operational cost.** No Terraform modules per org, no cross-org workarounds, no duplicated alert routing.

## When to use multiple organizations

Use multi-org when a single org with access controls cannot satisfy a hard requirement, or when separate billing entities require independent invoicing. Five scenarios qualify.

### Regulatory or contractual data isolation

**Test question:** "Would co-locating this data in the same org violate a regulation or contract, even with team-based access restrictions?"

Some regulations require that data never coexist in the same logical boundary—not that users cannot see it, but that the data cannot share the same org. If your compliance team or external auditors require physical org-level separation (not row-level restrictions), multi-org is the right choice.

### Data residency

**Test question:** "Is cross-region data transfer prohibited for this data?"

When regulations prohibit telemetry from leaving a geographic region, you need orgs in different Datadog sites (for example, US1, EU1, AP1). [Cross-Organization Visibility][2] connects these orgs for operational dashboards without moving raw telemetry across borders.

### Complete data firewall between teams

**Test question:** "Is it a risk if one team sees any possible trace of another team's data?"

Datadog access controls restrict the most common sources of sensitive data but do not support complete firewalled separation of all telemetry data or asset metadata. If your requirements demand zero data co-mingling, use separate orgs.

### MSP multi-tenancy

**Test question:** "Do you need separate billing, data boundaries, and user pools per customer?"

Managed service providers serving multiple external customers typically need each customer in an isolated org with independent billing, data, and user management. Datadog's [parent-child org model][1] supports this pattern.

### M&A transition

**Test question:** "Are you integrating an acquired company that already has its own Datadog org?"

Mergers and acquisitions often create temporary multi-org states. The goal is consolidation into a single org after access controls and migration tooling are in place.

## Decision framework

### Flowchart

Use these four questions to reach a topology recommendation:

```
Q1: Does a regulation or contract require data to exist
    in a physically separate org boundary?
    |
    +-- YES -> Multi-org (compliance or residency split -- Pattern B)
    |
    +-- NO
        |
Q2: Is cross-region data transfer prohibited for some
    portion of your telemetry?
    |
    +-- YES -> Multi-org (compliance or residency split -- Pattern B)
    |
    +-- NO
        |
Q3: Are you an MSP serving external customers who need
    independent billing, data, and user management?
    |
    +-- YES -> Multi-org (MSP multi-tenancy -- Pattern C)
    |
    +-- NO
        |
Q4: Are you integrating an acquisition that has its own
    Datadog org?
    |
    +-- YES -> Temporary multi-org with consolidation target
    |           (M&A transition -- Pattern D)
    |
    +-- NO -> Single org (Pattern A)
              Use RBAC, DAC, Granular Access Control, and Teams
              for isolation.
```

### Capability comparison

| Capability | Single org | Multi-org | With Organization Groups |
| :---- | :---- | :---- | :---- |
| End-to-end distributed traces | Full | Do not cross org boundaries | No change |
| Telemetry data | Full | Metrics, logs, and CI data can be shared into dashboards with [Cross-Organization Visibility][2] | No change |
| Dashboards (metrics, logs, traces) | Full | [Invite-only shared dashboards][9] can be shared to members of another org | No change |
| Monitor alerting across data sources | Full | No cross-org monitor evaluation | No change |
| SLOs across services | Full | Cannot span orgs | No change |
| User management | One integration | Separate SCIM per org | Centralized from group |
| RBAC and custom roles | One configuration | Must duplicate per org | Centralized from group |
| SSO / SAML | One config ([multi-SAML][8] supports multiple IdPs) | Separate SAML per org | Centralized from group |
| Billing and usage | Usage attribution per org | Usage is aggregated across all child organizations and billed at the parent organization level | No change |
| Feature rollout | Immediate | Must enable per org | Centralized from group |

**Note:** Organization Groups is in preview. Contact your account team to learn more.

## Topology patterns

Four reference architectures cover the most common deployment models.

### Pattern A: single org (default)

**When to use:** No regulatory, residency, or MSP requirement for org-level separation.

All business units, teams, and environments share one org. Tag-based conventions (`team:`, `env:`, `service:`, `cost_center:`) drive access policies, dashboards, and billing attribution. Access controls enforce isolation between groups when needed.

**Example:** A large technology company with 5,000 Datadog users across 12 business units uses one org. Each business unit has a Team with DAC restrictions on their telemetry. Platform admins have a global role; business unit engineers see only their team's data.

### Pattern B: compliance or data residency split

**When to use:** A subset of services or data requires org-level isolation for regulatory compliance or data residency reasons.

Multiple orgs: one org per regulated workload, one org per required region (for example, a Europe-based data center), and one for everything else. [Cross-Organization Visibility][2] connects them for operational dashboards using consolidated metrics. The regulated org has stricter access policies, IP allowlists, and audit controls.

**Example:** A financial services firm separates its trading platform telemetry (subject to SEC/FINRA data handling requirements) into a dedicated org, while all other business units share the primary org.

### Pattern C: MSP multi-tenancy

**When to use:** Serving external customers who need independent billing, data, and user management.

A parent org for the MSP's internal operations, with child orgs per customer. Each child org has isolated data, users, and billing. The parent org provides centralized operational views through [Cross-Organization Visibility][2].

**Example:** A managed infrastructure provider with 200+ customers creates a child org per customer. The parent org's NOC team monitors service health across all customer orgs with cross-org dashboards.

### Pattern D: M&A transition

**When to use:** Integrating an acquired company with an existing Datadog deployment.

Temporary multi-org state. The acquired company's org remains active during integration while the target org is prepared with appropriate access controls, teams, and configurations. The goal is consolidation. For consolidation guidance, contact your account team.

**Example:** After acquiring a SaaS company, an enterprise connects both orgs with [Cross-Organization Visibility][2] for immediate operational awareness, then executes a phased consolidation over three to six months.

## Achieving isolation within a single org

Most organizations that consider multi-org can meet their requirements with a single org's access controls. [RBAC][3], [Data Access Control][4], [Granular Access Control][6], [Teams][7], and IP allowlists enforce enterprise-grade data segregation within a single org, even in regulated industries.

For detailed implementation guidance, see the [access control documentation][3].

### Access control limitations

All users within an org can see core functionality such as infrastructure. Not all telemetry types support row-level restriction. See [supported telemetry types][5] for the full list.

## Managing multi-org with Organization Groups

For organizations that remain multi-org, Organization Groups introduces centralized governance across orgs, reducing the operational cost that makes multi-org expensive.

### What Organization Groups enables

Organization Groups lets administrators manage multiple Datadog orgs as a single unit. Instead of configuring roles, policies, and settings individually per org, administrators define them once at the group level and push them to member orgs.

- **View and manage orgs in a group.** Administrators see all member orgs from the group and can navigate between them.
- **Push roles and policies from group to member orgs.** Define custom roles, access policies, and session settings in the parent org and apply them to child orgs.
- **Centralized user management.** Add or remove users across multiple orgs from the parent without per-org invitations.
- **Cross-org configuration of roles, teams, and Data Access Control policies.** Define access rules once and apply across orgs.

### How Organization Groups changes the topology decision

**For new multi-org deployments:** If your use case genuinely requires multi-org, Organization Groups gives you centralized controls to manage it from a single parent org.

**For existing multi-org customers considering consolidation:** Organization Groups provides a middle path. If full consolidation is impractical, Organization Groups brings many of the benefits of a single org—centralized policy management, reduced configuration drift, simpler user management—without requiring migration.

**Interested in Organization Groups?** Contact your account team to discuss early access.

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
