---
title: Permissions and Access Control for Feature Flags
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

Datadog Feature Flags supports organization-level permissions and granular per-flag access controls. Use these controls to limit who can view or change flag configuration and environments.

## Organization-level permissions

Control access at the organization level with the following permissions:

| Permission | Description |
|------------|-------------|
| **Feature Flag Config Read** | View feature flag configuration |
| **Feature Flag Config Write** | Create and modify feature flag configuration |
| **Feature Flag Environment Config Read** | View environment configuration |
| **Feature Flag Environment Config Write** | Create and modify environments |
| **Feature Flag Approvals Override** | Enable or disable approvals on existing flags, and bypass the approvals workflow |

Assign these permissions through [Datadog roles][1].

## Granular access on individual flags

Restrict edit access on a specific flag by selecting **Settings > Permissions** on the flag details page:

{{< img src="feature_flags/concepts/flag-grace-modal-2.png" alt="Permissions settings panel on a feature flag showing granular access controls for users, service accounts, roles, and teams." style="width:65%;" >}}

You can limit edit access to:

- Individual users
- Service accounts
- Roles
- Teams

Users without edit access can still view the flag if they have read permissions at the organization level.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
