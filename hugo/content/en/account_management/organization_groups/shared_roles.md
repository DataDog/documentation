---
title: Shared Roles
description: Define a custom role once in an organization group's owner organization, provision it to every member organization, and control whether member organizations can create their own custom roles.
further_reading:
- link: "/account_management/organization_groups/"
  tag: "Documentation"
  text: "Organization Groups"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Role Based Access Control (RBAC)"
- link: "/account_management/saml/mapping/"
  tag: "Documentation"
  text: "SAML Group Mapping"
---

{{< callout url="https://www.datadoghq.com/product-preview/organization-groups/" header="Organization Groups is in Preview">}}
  Organization Groups is in Preview. Request access to try it out.
{{< /callout >}}

## Overview

With shared roles, administrators in the owner organization of an [organization group][1] define a custom role once. Datadog provisions it into every member organization in the group. Use shared roles to keep role definitions consistent across organizations, instead of maintaining the same role in each one.

In each member organization, a shared role behaves like a [Datadog managed role][2], except that the organization group manages it instead of Datadog. Member organization administrators assign the role to users and teams, but cannot edit or delete it. Changes made at the group level propagate to every member organization, and organizations that join the group later receive the group's shared roles.

To also stop member organizations from creating their own custom roles, set the group's [role exclusivity](#role-exclusivity) to {{< ui >}}Strict{{< /ui >}}.

## How shared roles work

In a member organization, shared roles appear on the {{< ui >}}Roles{{< /ui >}} page with the type {{< ui >}}Group Managed{{< /ui >}}. Other roles show the type {{< ui >}}Custom{{< /ui >}} or {{< ui >}}Datadog Managed{{< /ui >}}.

<!-- Screenshot needed (org-groups-shared-roles-member-org.png): Member organization > Organization Settings > Roles. Show the Type column with Group Managed, Custom, and Datadog Managed roles, and the disabled Edit and Delete actions on a Group Managed row. -->

Shared roles are always {{< ui >}}Group Managed{{< /ui >}}. Unlike [organization group policies][3], they have no {{< ui >}}Override Allowed{{< /ui >}} tier, so a member organization cannot change a shared role's permissions for itself. To give one member organization a variation of a shared role, create a separate shared role. If role exclusivity is {{< ui >}}Flexible{{< /ui >}}, the member organization can also clone the shared role into a custom role and edit the clone.

Role assignment stays with each member organization's administrators. Administrators in the owner organization cannot assign roles to users in member organizations, or see which users in member organizations have a shared role.

## Role exclusivity

Role exclusivity controls whether member organizations can create their own custom roles in addition to using the group's shared roles. Set it in the {{< ui >}}Role Exclusivity{{< /ui >}} section of the group's {{< ui >}}Roles{{< /ui >}} tab.

| Setting | Behavior in member organizations |
| --- | --- |
| {{< ui >}}Flexible{{< /ui >}} | Member organizations can create, clone, and edit their own custom roles, and use shared roles. |
| {{< ui >}}Strict{{< /ui >}} | Member organizations can use only shared roles and Datadog managed roles. Creating, cloning, and editing custom roles is blocked. |

<!-- Screenshot needed (org-groups-shared-roles-exclusivity.png): Owner organization > Organization Groups > a group > Roles tab, Role Exclusivity section with Strict selected. -->

When role exclusivity is {{< ui >}}Strict{{< /ui >}}:

- **Existing custom roles are frozen, not removed.** They become read-only, and users and teams that have them keep their access. Member organization administrators can still assign them.
- **Deleting custom roles stays available**, because deleting a role only removes access.
- **The restrictions also apply to the API and Terraform.** Terraform applies that create or modify custom roles in member organizations fail.
- **The owner organization is included** if it is a member of its own group.

<!-- Screenshot needed (org-groups-shared-roles-strict-member.png): Member organization in a group set to Strict > Organization Settings > Roles. Show the disabled New Role button and a frozen custom role with Edit and Clone disabled and Delete available, with the tooltip visible. -->

Switching a group back to {{< ui >}}Flexible{{< /ui >}} lets member organizations create and edit custom roles again, including frozen ones.

<div class="alert alert-info">Before you switch a group to <strong>Strict</strong>, create shared roles that cover the access member organizations need, and assign them to users and teams.</div>

## Manage shared roles

Manage shared roles from the {{< ui >}}Roles{{< /ui >}} tab of an organization group in the owner organization.

<!-- Screenshot needed (org-groups-shared-roles-tab.png): Owner organization > Organization Settings > Organization Groups > a group > Roles tab. Show the Shared Roles list with at least two roles, the Group Managed tier, the Add Role button, and the Edit, Clone, and Disable row actions. -->

### Create a shared role

1. In the owner organization, go to {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Organization Groups{{< /ui >}}.
2. Select the organization group.
3. Open the {{< ui >}}Roles{{< /ui >}} tab.
4. Click {{< ui >}}Add Role{{< /ui >}}.
5. Enter a name for the role.
6. Select the permissions for the role. See [Datadog Role Permissions][4].
7. Save the role.

If a member organization already has a role with the same name, Datadog blocks the operation. See [Resolve a role name conflict](#resolve-a-role-name-conflict).

To start from an existing shared role, click {{< ui >}}Clone{{< /ui >}} on that role in the {{< ui >}}Shared Roles{{< /ui >}} list.

### Edit or rename a shared role

1. On the group's {{< ui >}}Roles{{< /ui >}} tab, find the role in the {{< ui >}}Shared Roles{{< /ui >}} list.
2. Click {{< ui >}}Edit{{< /ui >}}.
3. Change the name or the permissions.
4. Save your changes.

### Disable a shared role

Shared roles cannot be deleted, because deleting a shared role could cause users in member organizations to lose access unexpectedly. To stop managing a role from the group, disable it.

<div class="alert alert-warning">Disabling a shared role is permanent. You cannot re-enable a disabled shared role.</div>

1. On the group's {{< ui >}}Roles{{< /ui >}} tab, find the role in the {{< ui >}}Shared Roles{{< /ui >}} list.
2. Click {{< ui >}}Disable{{< /ui >}}.
3. Confirm your decision.

When you disable a shared role, Datadog does not delete it from member organizations. In each member organization, it becomes a regular custom role, and users and teams that have it keep their access. Like any other custom role, it is editable when role exclusivity is {{< ui >}}Flexible{{< /ui >}} and frozen when it is {{< ui >}}Strict{{< /ui >}}. The role no longer appears in the group's {{< ui >}}Shared Roles{{< /ui >}} list.

## Move users to a shared role

Datadog does not move users from existing roles to shared roles. Assign a shared role in each member organization the same way as any other role:

- [Edit a user's roles][5] in Datadog.
- Provision roles from your identity provider with [SCIM][6].
- Map identity provider attributes to roles with [SAML group mapping][7].

## Resolve a role name conflict

You cannot convert an existing custom role into a shared role. Datadog also does not take over an existing role that has the same name as a new shared role. To replace an existing custom role with a shared role:

1. In a member organization that has the conflicting role, open the role on the {{< ui >}}Roles{{< /ui >}} page and note its permissions. If the role exists in several member organizations with different permissions, decide which permissions the shared role grants.
2. In the owner organization, [create a shared role](#create-a-shared-role) with those permissions and a different name, such as `<ROLE_NAME> (Shared)`.
3. In each member organization, [assign the shared role](#move-users-to-a-shared-role) to the users and teams that have the original role.
4. In each member organization, delete the original custom role.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/organization_groups/
[2]: /account_management/rbac/#datadog-default-roles
[3]: /account_management/organization_groups/#organization-group-policies
[4]: /account_management/rbac/permissions/
[5]: /account_management/users/#edit-a-users-roles
[6]: /account_management/scim/#role-provisioning-behavior
[7]: /account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
