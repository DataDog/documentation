---
title: Permissions and Access Control
description: Control who can read and write feature flags and environments in Datadog.
further_reading:
- link: "/feature_flags/concepts/approvals"
  tag: "Documentation"
  text: "Approvals"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Role Based Access Control"
---

## Overview

Datadog Feature Flags supports organization-level permissions and granular access controls on individual flags. Use these controls to limit who can view or change flag configuration and environments.

## Organization-level permissions

Control access at the organization level with the following permissions:

| Permission | Description |
|------------|-------------|
| **Feature Flag Config Read** | View feature flag configuration |
| **Feature Flag Config Write** | Create and modify feature flag configuration |
| **Feature Flag Environment Config Read** | View environment configuration |
| **Feature Flag Environment Config Write** | Create and modify environments |

Assign these permissions through [Datadog roles](/account_management/rbac/).

## Granular access on individual flags

Restrict edit access on a specific flag by selecting **Settings > Permissions** on the flag details page:

{{< img src="getting_started/feature_flags/flag-grace-modal.png" alt="Permissions settings panel on a feature flag showing granular access controls for users, service accounts, roles, and teams." style="width:100%;" >}}

You can limit edit access to:

- Individual users
- Service accounts
- Roles
- Teams

Users without edit access can still view the flag if they have read permissions at the organization level.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
