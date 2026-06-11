---
title: Organization Groups
description: Centrally manage roles, policies, and users across multiple Datadog organizations with Organization Groups.
further_reading:
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Managing Multiple-Organization Accounts"
- link: "/account_management/organization_topology/"
  tag: "Documentation"
  text: "Organization Topology"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Role Based Access Control (RBAC)"
---

{{< callout url="https://www.datadoghq.com/product-preview/organization-groups/" header="Org Groups is in Preview">}}
  Org Groups is in preview. Request access to try it out.
{{< /callout >}}

## Overview

For organizations that remain multi-organization, Org Groups introduces centralized governance across organizations, reducing the operational cost that makes multi-organization expensive.

## Centralize governance across organizations

Org Groups lets administrators manage multiple Datadog organizations as a single unit. Instead of configuring roles, policies, and settings individually per organization, administrators define them once at the group level and push them to member organizations.

- **View and manage organizations in a group.** See all member organizations from the group and navigate between them.
- **Push policies from group to member organizations.** Define custom roles, access policies, and session settings in the owner org and apply them to member organizations.

{{< img src="account_management/org-groups-policies.png" alt="Organization Settings in Datadog showing the Org Groups policies section" style="width:100%;" >}}

## How it works

### Org types

Every organization in an org group falls into at least one of the following roles:

| Role | Description |
| ---------- | ----------------- |
| **Owner** | Creates and manages the org group. Sets policies and enforcement tiers for all member organizations. |
| **Member** | Governed by the group. An organization belongs to exactly one org group at a time. An owner org can also be a member of its own org group. |

Org admins in the owner org have access to the **Org Groups** page in **Organization Settings**, where they can manage group members and policies.

### Org group policies

An org group policy targets a specific organization configuration and pairs it with a value and an enforcement tier. Policies are created by the owner org and applied to all member organizations.

#### Enforcement tiers

Each org group policy has an enforcement tier that controls how much latitude member organizations have:

| Tier | Behavior |
| --- | --- |
| **Group managed** | The group value is locked across all member organizations. No per-organization deviation is allowed. |
| **Override allowed** | The group sets a baseline value. Member organizations can change the setting in their own organization settings. |

{{< img src="account_management/org-groups-create-policy.png" alt="Organization Settings in Datadog showing the Org Groups policy creation" style="width:100%;" >}}

## Apply Org Groups

### For new multi-organization deployments

If your use case requires multi-organization, Org Groups gives you centralized controls to manage it from a single owner org.

### For existing multi-organization customers considering consolidation

Org Groups provides a middle path. If full consolidation is impractical, Org Groups brings many of the benefits of a single organization without requiring migration. These benefits include centralized policy management, reduced configuration drift, and simpler user management.

Contact your account team to discuss early access to Org Groups.

### Limitations

Org Groups supports single-region groups only. Organizations in different regions must be managed in separate org groups within their region.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
