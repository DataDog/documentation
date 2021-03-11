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
    - link: '/api/v2/roles/'
      tag: 'Documentation'
      text: 'Manage Roles and Permissions with the Roles API'
    - link: '/api/v2/roles/#list-permissions'
      tag: 'Documentation'
      text: 'Manage your permissions with the Permission API'
    - link: '/account_management/rbac/permissions'
      tag: 'Documentation'
      text: 'Discover the list of permissions available.'
    - link: '/account_management/saml/'
      tag: 'Documentation'
      text: 'Enable single sign on with SAML'
---

Roles categorize users and define what account permissions those users have, such as what data they can read or what account assets they can modify. By default, Datadog offers three roles, and you can create [custom roles](#custom-roles) so you can define a better mapping between your users and their permissions.

By granting permissions to roles, any user who is associated with that role receives that permission. When users are associated with multiple roles, they receive all the permissions granted to each of their roles. The more roles a user is associated with, the more access they have within a Datadog account.

  **Note** If you use a SAML identity provider, you can integrate it with Datadog for authentication, and you can map identity attributes to Datadog default and custom roles. For more information, see [Single Sign On With SAML][1].

## Datadog default roles

| Role                       | Description                                                                                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Datadog Admin Role**     | Users have access to billing information and the ability to revoke API keys. They can manage users and configure [read-only dashboards][2]. They can also promote standard users to administrators.                                          |
| **Datadog Standard Role**  | Users are allowed to view and modify all monitoring features that Datadog offers, such as [dashboards][2], [monitors][3], [events][4], and [notebooks][5]. Standard users can also invite other users to organizations.                      |
| **Datadog Read Only Role** | Users do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client, or when a member of one business unit needs to share a [dashboard][2] with someone outside their unit. |

## Custom roles

<div class="alert alert-warning">
Creating and modifying custom roles is an opt-in Enterprise feature. <a href="/help">Contact Datadog support</a> to get it enabled for your account.
</div>

Manage your custom roles through the Datadog application, the [Datadog Role API][6], or SAML directly. Find below how to create, update, delete a role. See the [Datadog Role permissions][7] documentation for more information about available permissions. Only users with the Access Management permission can create or edit roles in Datadog.

### Create a custom role

You can create custom roles with:

{{< tabs >}}
{{% tab "Datadog application" %}}

To create a custom role:

1. Go to your [Datadog Roles page][1].
2. Select **New Role** in the upper right corner of the page.
3. Give a name to your role.
4. Optional - Assigning a set of permissions to your Role. See the [Datadog Role permissions][2] documentation for more information about available permissions.

{{< img src="account_management/rbac/create_role.png" alt="Create a custom Role"  style="width:90%;">}}

Once a role is created you can [add this role to existing users][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /account_management/rbac/permissions/
[3]: /account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

Find an example of how to create a Role in the [Datadog Create Role API documentation][1].


[1]: /api/v2/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### Update a role

{{< tabs >}}
{{% tab "Datadog application" %}}

To edit a custom role:

1. Go to your [Datadog Roles page][1].
2. Select the edit button on the Role you would like to modify.
3. Modify the set of permissions to your Role. See the [Datadog Role permissions][2] documentation for more information about available permissions.
4. Save your changes.

{{< img src="account_management/rbac/edit_role.png" alt="Edit a Role"  style="width:90%;">}}

Once a role is modified, all users who have the role will have their permissions updated.


[1]: https://app.datadoghq.com/access/roles
[2]: /account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

Find an example of how to update a Role in the [Datadog Create Role API documentation][1].


[1]: /api/v2/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### Delete a role

{{< tabs >}}
{{% tab "Datadog application" %}}

To delete a custom role:

1. Go to your [Datadog Roles page][1].
2. Select the delete button on the Role you would like to delete.
3. Confirm your decision.

{{< img src="account_management/rbac/delete_role.png" alt="Deleting a Role"  style="width:90%;">}}

{{< img src="account_management/users/delete_role_confirmation.png" alt="Deleting a Role"  style="width:90%;">}}

Once a role is deleted all users who have the role will have their permissions updated. Users without any roles will not be able to use Datadog effectively, but will still maintain limited access. You should always make sure users either have a Role or are disabled if they do not need access to your organization.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Find an example of how to delete a Role in the [Datadog Create Role API documentation][1].


[1]: /api/v2/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

## Restrict access to Dashboards and Monitors

Once you have RBAC roles set up, you can restrict access to Dashboards and Monitors by user role. For more information, see the [Dashboard permissions docs][8], and the [Monitors permissions docs][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/saml/
[2]: /dashboards/
[3]: /monitors/
[4]: /events/
[5]: /notebooks/
[6]: /api/v2/roles/
[7]: /account_management/rbac/permissions/
[8]: /dashboards/#restrict-access
[9]: /getting_started/application/monitors/#restrict-access
