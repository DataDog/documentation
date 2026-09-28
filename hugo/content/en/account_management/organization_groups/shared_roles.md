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

Each member organization receives its own [role][2], not a reference to a shared object. The role behaves like any other role in that organization. Member organization administrators assign users and teams to it, and its permissions apply to those users. The group definition is authoritative. Changes made at the group level propagate to every member organization, and member organizations cannot edit or delete the role.

To also stop member organizations from creating their own custom roles, set the group's [role exclusivity](#role-exclusivity) to {{< ui >}}Strict{{< /ui >}}.

## Prerequisites

- An organization group with at least one member organization. See [Organization Groups][1].
- The **Org Group Write** permission in the owner organization, to create and manage shared roles and to change role exclusivity. The **Org Group Read** permission lets users view them. See [Datadog Role Permissions][3].

## How shared roles work

### Shared roles are always group managed

A shared role is always {{< ui >}}Group Managed{{< /ui >}}: every member organization uses the role exactly as the group defines it.

Shared roles do not have an {{< ui >}}Override Allowed{{< /ui >}} tier. This differs from [organization group policies][4], where the owner organization can let member organizations change a setting. A member organization cannot change the permissions of a shared role for itself. To give one member organization a variation of a shared role, create a separate shared role. If role exclusivity is {{< ui >}}Flexible{{< /ui >}}, the member organization can also clone the shared role into a custom role.

### What member organizations see

In a member organization, shared roles appear on the {{< ui >}}Roles{{< /ui >}} page with the type {{< ui >}}Group Managed{{< /ui >}}. Other roles show the type {{< ui >}}Custom{{< /ui >}} or {{< ui >}}Datadog Managed{{< /ui >}}.

<!-- Screenshot needed (org-groups-shared-roles-member-org.png): Member organization > Organization Settings > Roles. Show the Type column with Group Managed, Custom, and Datadog Managed roles, and the disabled Edit and Delete actions on a Group Managed row. -->

For a {{< ui >}}Group Managed{{< /ui >}} role, member organization administrators can:

- Assign the role to users and teams.
- Clone the role to create a custom role, when the group's role exclusivity is {{< ui >}}Flexible{{< /ui >}}.

Member organization administrators cannot edit or delete a {{< ui >}}Group Managed{{< /ui >}} role. Datadog enforces this for requests from the Datadog site, the API, and Terraform.

Assigning users and teams to roles in a member organization stays with that organization's administrators. Administrators in the owner organization cannot assign users to roles in member organizations.

### How changes propagate

- **Create**: Datadog provisions the role into every member organization in the group.
- **Edit or rename**: The change propagates to every member organization. Users assigned to the role receive the updated permissions.
- **New member organization**: When an organization joins the group, the group's shared roles are provisioned into it.

The owner organization can also be a member of its own group. In that case, it receives the shared roles like any other member organization, and the group's role exclusivity applies to it.

## Manage shared roles

Manage shared roles from the {{< ui >}}Roles{{< /ui >}} tab of an organization group in the owner organization.

<!-- Screenshot needed (org-groups-shared-roles-tab.png): Owner organization > Organization Settings > Organization Groups > a group > Roles tab. Show the Role Exclusivity section and the Shared Roles list with at least two roles, the Group Managed tier, the Add Role button, and the Edit, Clone, and Disable row actions. -->

### Create a shared role

1. In the owner organization, go to {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Organization Groups{{< /ui >}}.
2. Select the organization group.
3. Open the {{< ui >}}Roles{{< /ui >}} tab.
4. Click {{< ui >}}Add Role{{< /ui >}}.
5. Enter a name for the role.
6. Select the permissions for the role. See [Datadog Role Permissions][3].
7. Save the role.

Datadog provisions the role into every member organization in the group. If a member organization already has a role with the same name, Datadog blocks the operation. See [Resolve a role name conflict](#resolve-a-role-name-conflict).

To start from an existing shared role, click {{< ui >}}Clone{{< /ui >}} on that role in the {{< ui >}}Shared Roles{{< /ui >}} list.

### Edit or rename a shared role

1. On the group's {{< ui >}}Roles{{< /ui >}} tab, find the role in the {{< ui >}}Shared Roles{{< /ui >}} list.
2. Click {{< ui >}}Edit{{< /ui >}}.
3. Change the name or the permissions.
4. Save your changes.

The change propagates to every member organization.

### Disable a shared role

Shared roles cannot be deleted. To stop managing a role from the group, disable it.

<div class="alert alert-warning">Disabling a shared role is permanent. You cannot re-enable a disabled shared role.</div>

1. On the group's {{< ui >}}Roles{{< /ui >}} tab, find the role in the {{< ui >}}Shared Roles{{< /ui >}} list.
2. Click {{< ui >}}Disable{{< /ui >}}.
3. Confirm your decision.

When you disable a shared role:

- Datadog does not delete the role from member organizations. In each member organization, the role becomes a regular custom role, and the users and teams assigned to it keep their access.
- The role shows as {{< ui >}}Custom{{< /ui >}} in each member organization's {{< ui >}}Roles{{< /ui >}} page. It carries no indicator that the group managed it before.
- Changes made at the group level no longer apply to the role.
- If the group's role exclusivity is {{< ui >}}Flexible{{< /ui >}}, member organization administrators can edit or delete the role like any other custom role.
- If the group's role exclusivity is {{< ui >}}Strict{{< /ui >}}, the role is frozen like any other custom role: it is read-only and still assignable, and member organization administrators can delete it.
- The role no longer appears in the group's {{< ui >}}Shared Roles{{< /ui >}} list.

## Role exclusivity

Role exclusivity controls whether member organizations can create their own custom roles in addition to using the group's shared roles. Set it in the {{< ui >}}Role Exclusivity{{< /ui >}} section of the group's {{< ui >}}Roles{{< /ui >}} tab.

| Setting | Behavior in member organizations |
| --- | --- |
| {{< ui >}}Flexible{{< /ui >}} | Member organizations can create, clone, and edit their own custom roles, and use shared roles. |
| {{< ui >}}Strict{{< /ui >}} | Member organizations can use only shared roles and Datadog managed roles. Creating, cloning, and editing custom roles is blocked. |

<!-- Screenshot needed (org-groups-shared-roles-exclusivity.png): Owner organization > Organization Groups > a group > Roles tab, Role Exclusivity section with Strict selected. -->

### What changes with strict role exclusivity

With role exclusivity set to {{< ui >}}Strict{{< /ui >}}, the following applies in every member organization. Datadog enforces these restrictions for requests from the Datadog site, the API, and Terraform.

- **Creating, cloning, and editing custom roles is blocked.**
- **Existing custom roles are frozen, not removed.** They stay in place and become read-only. Users and teams assigned to them keep their access, and administrators can still assign them.
- **Deleting custom roles stays available.** Deleting a role only removes access, so member organization administrators can still delete a custom role they no longer need.
- **Role assignment stays available.** Member organization administrators assign users and teams to shared roles, frozen custom roles, and Datadog managed roles.
- **Datadog managed roles are not affected.** Member organizations can use the [Datadog Admin, Standard, and Read Only roles][5] as usual.

<!-- Screenshot needed (org-groups-shared-roles-strict-member.png): Member organization in a group set to Strict > Organization Settings > Roles. Show the disabled New Role button and a frozen custom role with Edit and Clone disabled and Delete available, with the tooltip visible. -->

If you manage custom roles in member organizations with Terraform, applies that create or modify those roles fail while role exclusivity is {{< ui >}}Strict{{< /ui >}}.

Switching a group back to {{< ui >}}Flexible{{< /ui >}} lets member organizations create and edit custom roles again, including custom roles that were frozen.

<div class="alert alert-info">Before you switch a group to <strong>Strict</strong>, create shared roles that cover the access member organizations need, and move users onto them. Existing custom roles keep working, but member organizations can no longer change them.</div>

## Move users to a shared role

Datadog does not move users from existing custom roles to shared roles. Assign the shared role in each member organization:

- **SAML group mapping**: If you assign roles with [SAML group mapping][6], update the role mappings in each member organization to target the shared role. Users receive the shared role the next time they log in.
- **Terraform**: If you manage role assignments with Terraform, update your configuration to assign the shared role. Otherwise, the next apply reverts assignments made outside Terraform.
- **Manual assignment**: Otherwise, [edit each user's roles][7] in each member organization.

## Resolve a role name conflict

If any member organization already has a role with the same name as a new shared role, Datadog blocks creating the shared role. Datadog does not take over or change the existing role.

To replace an existing custom role with a shared role that has the same name:

1. In a member organization that has the conflicting role, open the role on the {{< ui >}}Roles{{< /ui >}} page and note its permissions. If the role exists in several member organizations with different permissions, decide which permissions the shared role grants.
2. In the owner organization, [create a shared role](#create-a-shared-role) with those permissions and a different name, such as `<ROLE_NAME> (Shared)`.
3. In each member organization, [move the users and teams](#move-users-to-a-shared-role) from the original role to the shared role.
4. In each member organization, delete the original custom role.
5. Optionally, after the original role is deleted from every member organization, [rename the shared role](#edit-or-rename-a-shared-role) to the original name. The new name propagates to every member organization.

## Manage shared roles with the API or Terraform

A shared role is an organization group policy with a `policy_type` of `role`. The policy's `content` holds a `permissions` key with a list of permission IDs, and its `policy_name` becomes the name of the role in each member organization.

- **API**: Use the [org group policy endpoints][8]. For `role` policies, `enforcement_tier` supports `GROUP_MANAGED` and `DELEGATE`; `OVERRIDE_ALLOWED` is rejected. Setting `enforcement_tier` to `DELEGATE` disables the shared role, and a disabled role policy cannot return to `GROUP_MANAGED`.
- **Terraform**: Use the [`datadog_org_group_policy` resource][9] with `policy_type = "role"`.

For example, the following Terraform configuration creates a shared role:

{{< code-block lang="hcl" >}}
resource "datadog_org_group_policy" "finance_read_only" {
  org_group_id     = "<ORG_GROUP_ID>"
  policy_name      = "Finance Read Only"
  policy_type      = "role"
  content          = jsonencode({ "permissions" : ["<PERMISSION_ID>"] })
  enforcement_tier = "GROUP_MANAGED"
}
{{< /code-block >}}

Role policies cannot be deleted. Removing the resource from your Terraform configuration succeeds only after the role is disabled, and the disabled policy remains in Datadog.

## Limitations

- Disabling a shared role is permanent. A disabled shared role cannot be re-enabled.
- Shared roles cannot be deleted. Disable a shared role to stop managing it from the group.
- An existing role cannot be converted into a shared role. Create a shared role with the same permissions instead. See [Resolve a role name conflict](#resolve-a-role-name-conflict).
- Creating a shared role is blocked if any member organization has a role with the same name.
- Administrators in the owner organization cannot see which users in member organizations are assigned to a shared role, and cannot assign users to roles in member organizations.
- Datadog does not migrate users from existing roles to shared roles. See [Move users to a shared role](#move-users-to-a-shared-role).
- There is no view of provisioning status for each member organization.
- Shared roles do not follow managed role templates, so they do not receive new permissions automatically. Edit the shared role to add permissions.
- Organization groups are single-region, so a shared role provisions only into member organizations in the group's region. See [Organization Groups limitations][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/organization_groups/
[2]: /account_management/rbac/#custom-roles
[3]: /account_management/rbac/permissions/
[4]: /account_management/organization_groups/#organization-group-policies
[5]: /account_management/rbac/#datadog-default-roles
[6]: /account_management/saml/mapping/
[7]: /account_management/users/#edit-a-users-roles
[8]: /api/latest/org-groups/#create-an-org-group-policy
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/org_group_policy
[10]: /account_management/organization_groups/#limitations
