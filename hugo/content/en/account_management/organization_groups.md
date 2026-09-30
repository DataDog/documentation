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
- link: "/account_management/organization_groups/shared_roles/"
  tag: "Documentation"
  text: "Shared Roles"
---

{{< callout url="https://www.datadoghq.com/product-preview/organization-groups/" header="Organization Groups is in Preview">}}
  Organization Groups is in Preview. Request access to try it out.
{{< /callout >}}

## Overview

For organizations that remain multi-organization, Organization Groups introduces centralized governance across organizations, which reduces the operational overhead of running multiple organizations.

## Centralize governance across organizations

Organization Groups lets administrators manage multiple Datadog organizations as a single unit. Instead of configuring roles, policies, and settings individually per organization, administrators define them once at the group level and push them to member organizations.

- **View and manage organizations in a group.** See all member organizations from the group and navigate between them.
- **Push policies from group to member organizations.** Define policies in the owner organization and apply them to member organizations.
- **Share custom roles across member organizations.** Define a custom role once in the owner organization and provision it into every member organization. See [Shared Roles][1].

{{< img src="account_management/org-groups-policies.png" alt="Organization Settings in Datadog showing the Organization Groups policies section." style="width:100%;" >}}

## How it works

### Organization types

Every organization in an organization group falls into at least one of the following types:

| Type | Description |
| ---------- | ----------------- |
| **Owner** | Creates and manages the organization group. Sets policies, enforcement tiers, and shared roles for all member organizations. |
| **Member** | Governed by the group. An organization belongs to exactly one organization group at a time. An owner organization can also be a member of its own organization group. |

Administrators in the owner organization have access to the **Organization Groups** page in **Organization Settings**, where they can manage group members, policies, and shared roles. Managing an organization group requires the **Org Group Write** permission, and viewing one requires **Org Group Read**. See [Datadog Role Permissions][2].

### Organization group policies

An organization group policy targets a specific organization configuration and pairs it with a value and an enforcement tier. Policies are created by the owner organization and applied to all member organizations.

#### Enforcement tiers

Each organization group policy has an enforcement tier that controls how much latitude member organizations have:

| Tier | Behavior |
| --- | --- |
| **Group managed** | The group value is locked across all member organizations. No per-organization deviation is allowed. |
| **Override allowed** | The group sets a baseline value. Member organizations can change the setting in their own organization settings. |

{{< img src="account_management/org-groups-create-policy.png" alt="Organization Settings in Datadog showing the Organization Groups policy creation." style="width:100%;" >}}

### Shared roles

Shared roles bring the same group-level control to custom roles. Member organizations assign a shared role to users and teams, but cannot edit or delete it. Shared roles are always **Group managed**: unlike organization group policies, they have no **Override allowed** tier. For details, including how to stop member organizations from creating their own custom roles, see [Shared Roles][1].

## Apply Organization Groups

### For new multi-organization deployments

If your use case requires multi-organization, Organization Groups gives you centralized controls to manage it from a single owner organization.

### For existing multi-organization customers considering consolidation

Organization Groups provides a middle path. If full consolidation is impractical, Organization Groups brings many of the benefits of a single organization without requiring migration. These benefits include centralized policy management, reduced configuration drift, and simpler user management.

Contact your account team to discuss early access to Organization Groups.

## Limitations

Organization Groups supports only single-region groups. Organizations in different regions must be managed in separate organization groups within their region.

Organization groups are owned by the parent organization at the root of your organization hierarchy. A group is visible and managed only from its owner organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/organization_groups/shared_roles/
[2]: /account_management/rbac/permissions/
