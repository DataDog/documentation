---
title: Creating Custom Datadog Roles
kind: documentation
private: true
beta: true
description: "Creating custom roles and modifying the permissions of an existing role."
further_reading:
- link: "account_management/users"
  tag: "Documentation"
  text: "Manage your Datadog Users"
- link: "account_management/saml"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---
<div class="alert alert-warning">
Creating and modifying custom roles is an Enterprise feature and is in private beta. <a href="/help">Contact Datadog support</a> to get it enabled for your account.
</div>

## Create a custom role

To create a custom role:

1. Go to your [Datadog Roles Page][1].
2. Select **New Role** in the upper right corner of the page.
3. Give a name to your role.
4. Select the permissions associated with this role.

{{< img src="account_management/users/create_role.png" alt="Create a custom Role" responsive="true" style="width:90%;">}}

Once a role is created you can [add this role to existing users][2].

## Edit a role

To edit a custom role:

1. Go to your [Datadog Roles Page][1].
2. Select the edit button on the Role you would like to modify.
3. Modify the permissions associated with this role.
4. Save your changes

{{< img src="account_management/users/edit_role.png" alt="Edit a Role" responsive="true" style="width:90%;">}}

Once a role is modified, all users who have the role will have their permissions updated.

## Delete a role

To delete a custom role:

1. Go to your [Datadog Roles Page][1].
2. Select the delete button on the Role you would like to delete.
3. Confirm your decision.

{{< img src="account_management/users/delete_role.png" alt="Deleting a Role" responsive="true" style="width:90%;">}}
{{< img src="account_management/users/delete_role_confirmation.png" alt="Deleting a Role" responsive="true" style="width:90%;">}}

Once a role is deleted all users who have the role will have their permissions updated. Users without any roles will not be able to use Datadog effectively, but will still maintain limited access. For that reason you should always make sure users either have a Role or are disabled if they do not need access to your organization.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rbac
[2]: /account_management/users/#edit-a-user-roles
