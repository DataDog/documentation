---
title: Permissions and Feature Access
description: Define what users are allowed to do in your Datadog organization using roles and permissions.
further_reading:
- link: "/account_management/rbac/permissions/"
  tag: "Documentation"
  text: "Datadog Role Permissions"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Access Control (RBAC)"
---

## Overview

After you've decided on your org structure, the next step is defining what users are allowed to do. Datadog's [permission model][1] controls access to features, data types, and administrative actions through Roles. This section covers how the permission system works, when and how to create custom roles, and how to keep them current as Datadog evolves.

**Note:** The `user_access_manage` permission is one of the most sensitive in the platform. It allows a user to manage other users' roles and permissions, including granting themselves additional permissions. Guard this permission carefully and limit it to trusted administrators.

## Managed roles

Datadog provides three [managed roles][2]:

- **Datadog Admin Role**: full read and write access, including user management, org settings, and billing.
- **Datadog Standard Role**: read and write access to most features, without administrative capabilities.
- **Datadog Read Only Role**: read access only, no ability to edit resources or change configurations.

Managed roles are maintained by Datadog. Their permissions are automatically updated as new features are released, so users on managed roles always have access to the latest capabilities. You cannot modify managed roles directly, but you can clone them as a starting point for custom roles.

## Custom roles

[Custom roles][3] let you define access tiers that reflect how your organization actually works. For most enterprises, the three managed roles are a starting point, not the final answer.

### When to create custom roles

Most enterprises primarily use custom roles as a means of **controlling which features are available** to their SREs and developers, especially which newly-released Datadog features are available to which users. Beyond feature access, custom roles are also used to create distinct tiers for different user populations. Other common triggers:

- **Compliance or audit users** need read access across products but should never edit anything.
- **Platform administrators** need elevated permissions for infrastructure management without full org admin access.
- **Third-party contractors or vendors** need access to specific products but should be excluded from sensitive data, billing, or user management.

The key principle is **least privilege**: start with the minimum permissions a user needs, and add from there.

### Keeping roles current with new permissions

Unlike managed roles, custom roles do not automatically receive new permissions when Datadog releases new features unless you configure them to. This means new product capabilities may be invisible to users on custom roles until an administrator explicitly grants the permission. There are three strategies to stay current:

1. **Monitor the Permissions Release Notes.** When Datadog adds new permissions, they are announced in [permissions release notes][4]. Review these periodically and decide which roles should receive the new permission.

2. **Use Bulk Assign.** When you decide to distribute a new permission, you can add it to multiple roles at once from the [Roles page][3] by selecting the roles and clicking Add Permission.

3. **Configure Automatic Updates.** Each custom role can be set to follow a managed role template (Read Only, Standard, or Admin). When a new permission is released to that template, your custom role receives it automatically, but you can still add or remove any permissions from the role after automatic updates occur. Use this feature for trusted users who should get new features by default.

   To configure: go to Organization Settings > Roles, click the role, click Edit Role, and choose a template under *Automatically Receives Permissions*.

### Role hygiene at scale

As your organization grows, role sprawl becomes a real risk. Organizations with thousands of users can end up with hundreds or even thousands of roles if creation is not governed. To manage this:

- **Audit roles regularly.** Identify roles with no users or teams assigned and consider consolidating or deleting them.
- **Name roles descriptively.** Use a naming convention that indicates the role's purpose and scope (for example, `team-payments-lead` or `contractor-readonly`).
- **Limit role creation.** Only users with the `user_access_manage` permission should be able to create new roles. Review new role requests to avoid duplication.

## Recommended starter roles

Most enterprises converge on a set of 4-6 custom roles. Here is a recommended starting point:

| Role | Based on | Key modifications |
| :---- | :---- | :---- |
| **Read Only** | Datadog Read Only Role | No modifications needed for most cases. Use for stakeholders, executives, or audit users who need visibility without edit access. |
| **Standard User** | Datadog Standard Role | Remove sensitive permissions your users don't need (for example, `user_access_manage` or `org_billing`). This becomes your default role for most SREs and developers. |
| **Platform Admin** | Datadog Admin Role | Remove billing and org management permissions if those are handled by a separate team. Add any infrastructure-specific permissions. |
| **Organization Admin** | Datadog Admin Role | Full administrative access including billing and org management permissions. Reserve for a small group of trusted administrators. |
| **Restricted User** | Datadog Read Only Role | Further restrict to specific products. Use for contractors or external users who should only access a narrow set of features. |

Expand only when a meaningful group of users needs a distinct permission set that can't be served by one of these.

## Recommendations

- **Use roles to reflect permissions, not ownership.** Teams better reflect ownership and accountability.
- **Create custom roles to maintain granular control of feature access**, including new features and permissions.
- **Start by cloning a managed role** and removing permissions, rather than building from scratch.
- **Keep custom roles up to date as new features are released.** Monitoring new permission releases and automatic updates are equally good options.
- **Audit roles quarterly.** Look for roles with no users, duplicate roles, and users with more permissions than they need.
- **Name roles with a consistent convention** that indicates purpose and scope.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: /account_management/rbac/permissions/#roles
[3]: /account_management/rbac/permissions/#custom-roles
[4]: https://app.datadoghq.com/organization-settings/roles#release-notes
