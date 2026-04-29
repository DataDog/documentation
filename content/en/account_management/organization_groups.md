---
title: Organization Groups
description: Centrally manage roles, policies, and users across multiple Datadog organizations with Organization Groups.
further_reading:
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Managing Multiple-Organization Accounts"
- link: "/account_management/org_settings/organization_topology/"
  tag: "Documentation"
  text: "Organization Topology"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Role Based Access Control (RBAC)"
---

{{< callout url="#" btn_hidden="true" header="Organization Groups is in Preview">}}
  Organization Groups is in preview. Contact your account team to learn more.
{{< /callout >}}

## Overview

For organizations that remain multi-organization, Organization Groups introduces centralized governance across organizations, reducing the operational cost that makes multi-organization expensive.

## Centralize governance across organizations

Organization Groups lets administrators manage multiple Datadog organizations as a single unit. Instead of configuring roles, policies, and settings individually per organization, administrators define them once at the group level and push them to member organizations.

- **View and manage organizations in a group.** See all member organizations from the group and navigate between them.
- **Push roles and policies from group to member organizations.** Define custom roles, access policies, and session settings in the parent organization and apply them to child organizations.
- **Manage users centrally.** Add or remove users across multiple organizations from the parent without per-organization invitations.
- **Configure roles, teams, and Data Access Control policies across organizations.** Define access rules once and apply them across organizations.

## Apply Organization Groups

### For new multi-organization deployments

If your use case requires multi-organization, Organization Groups gives you centralized controls to manage it from a single parent organization.

### For existing multi-organization customers considering consolidation

Organization Groups provides a middle path. If full consolidation is impractical, Organization Groups brings many of the benefits of a single organization without requiring migration, including centralized policy management, reduced configuration drift, and simpler user management.

Contact your account team to discuss early access to Organization Groups.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
