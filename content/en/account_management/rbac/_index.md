---
title: Role Based Access Control
kind: documentation
aliases:
  - /guides/rbac
  - /account_management/rbac/role_api
  - /account_management/users/default_roles
  - /account_management/users/custom_roles
  - /account_management/rbac/log_management
further_reading:
- link: "account_management/rbac/log_management/"
  tag: "Documentation"
  text: "RBAC for Log Management"
- link: "/api/#roles"
  tag: "Documentation"
  text: "Manage Roles and Permissions with the Roles API"
---

Roles categorize users and define what account permissions those users have, such as what data they can read or what account assets they can modify. By default, Datadog offers three roles, and you can create custom roles so you can define a better mapping between your users and their permissions.

By granting permissions to roles, any user who is associated with that role receives that permission. When users are associated with multiple roles, they receive all the permissions granted to each of their roles. The more roles a user is associated with, the more access they have within a Datadog account.

## Out of the Box Roles

| Role                       | Description                                                                                                                                                                                                                                  |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Datadog Admin Role**     | Users have access to billing information and the ability to revoke API keys. They can manage users and configure [read-only dashboards][1]. They can also promote standard users to administrators.                                          |
| **Datadog Standard Role**  | Users are allowed to view and modify all monitoring features that Datadog offers, such as [dashboards][1], [monitors][2], [events][3], and [notebooks][4]. Standard users can also invite other users to organizations.                      |
| **Datadog Read Only Role** | Users do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client, or when a member of one business unit needs to share a [dashboard][1] with someone outside their unit. |

## Custom Roles

<div class="alert alert-warning">
Creating and modifying custom roles is an Enterprise feature and is in private beta. <a href="/help">Contact Datadog support</a> to get it enabled for your account.
</div>

Custom roles are imported via SAML integrations from identity providers. Datadog receives the user groups from your IdP and automatically generates roles to match those user groups. In this case, users who sign in via the IdP are automatically associated with those roles and have the permissions that are granted to those roles.

Alternatively, use [the Roles API][5] to create roles, and associate users with those roles.

For existing roles, you can grant/revoke permissions to/from via [the Roles API][5] to manage the access of users associated with those roles.

## Create a custom role

To create a custom role:

1. Go to your [Datadog Roles Page][6].
2. Select **New Role** in the upper right corner of the page.
3. Give a name to your role.
4. Select the permissions associated with this role.

{{< img src="account_management/users/create_role.png" alt="Create a custom Role"  style="width:90%;">}}

Once a role is created you can [add this role to existing users][7].

## Attach a permission to a role


TO DO


## Edit a role

To edit a custom role:

1. Go to your [Datadog Roles Page][6].
2. Select the edit button on the Role you would like to modify.
3. Modify the permissions associated with this role.
4. Save your changes

{{< img src="account_management/users/edit_role.png" alt="Edit a Role"  style="width:90%;">}}

Once a role is modified, all users who have the role will have their permissions updated.

## Delete a role

To delete a custom role:

1. Go to your [Datadog Roles Page][6].
2. Select the delete button on the Role you would like to delete.
3. Confirm your decision.

{{< img src="account_management/users/delete_role.png" alt="Deleting a Role"  style="width:90%;">}}

{{< img src="account_management/users/delete_role_confirmation.png" alt="Deleting a Role"  style="width:90%;">}}

Once a role is deleted all users who have the role will have their permissions updated. Users without any roles will not be able to use Datadog effectively, but will still maintain limited access. You should always make sure users either have a Role or are disabled if they do not need access to your organization.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards
[2]: /monitors
[3]: /events
[4]: /notebooks
[5]: /api/#roles
[6]: https://app.datadoghq.com/access/roles
[7]: /account_management/users/#edit-a-user-roles
