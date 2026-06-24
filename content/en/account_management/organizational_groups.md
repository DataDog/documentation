---
title: Organizational Groups
description: Centrally manage roles, policies, and users across multiple Datadog organizations with Organizational Groups.
aliases:
  - /account_management/organization_groups/
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

{{< callout url="https://www.datadoghq.com/product-preview/organization-groups/" header="Organizational Groups is in Preview">}}
  Organizational Groups is in preview. Request access to try it out.
{{< /callout >}}

## Overview

For organizations that remain multi-organization, Organizational Groups introduces centralized governance across organizations, reducing the operational cost that makes multi-organization expensive.

## Centralize governance across organizations

Organizational Groups lets administrators manage multiple Datadog organizations as a single unit. Instead of configuring roles, policies, and settings individually per organization, administrators define them once at the group level and push them to member organizations.

- **View and manage organizations in a group.** See all member organizations from the group and navigate between them.
- **Push policies from group to member organizations.** Define custom roles, access policies, and session settings in the owner organization and apply them to member organizations.

{{< img src="account_management/org-groups-policies.png" alt="Organization Settings in Datadog showing the Organizational Groups policies section" style="width:100%;" >}}

## How it works

### Organization types

Every organization in an organizational group falls into at least one of the following types:

| Types | Description |
| ---------- | ----------------- |
| **Owner** | Creates and manages the organizational group. Sets policies and enforcement tiers for all member organizations. |
| **Member** | Governed by the group. An organization belongs to exactly one organizational group at a time. An owner organization can also be a member of its own organizational group. |

Admins in the owner organization have access to the **Organizational Groups** page in **Organization Settings**, where they can manage group members and policies.

### Organizational group policies

An organizational group policy targets a specific organization configuration and pairs it with a value and an enforcement tier. Policies are created by the owner organization and applied to all member organizations.

#### Enforcement tiers

Each organizational group policy has an enforcement tier that controls how much latitude member organizations have:

| Tier | Behavior |
| --- | --- |
| **Group managed** | The group value is locked across all member organizations. No per-organization deviation is allowed. |
| **Override allowed** | The group sets a baseline value. Member organizations can change the setting in their own organization settings. |

{{< img src="account_management/org-groups-create-policy.png" alt="Organization Settings in Datadog showing the Organizational Groups policy creation" style="width:100%;" >}}

## Apply Organizational Groups

### For new multi-organization deployments

If your use case requires multi-organization, Organizational Groups gives you centralized controls to manage it from a single owner organization.

### For existing multi-organization customers considering consolidation

Organizational Groups provides a middle path. If full consolidation is impractical, Organizational Groups brings many of the benefits of a single organization without requiring migration. These benefits include centralized policy management, reduced configuration drift, and simpler user management.

Contact your account team to discuss early access to Organizational Groups.

### Limitations

Organizational Groups supports single-region groups only. Organizations in different regions must be managed in separate organizational groups within their region.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
