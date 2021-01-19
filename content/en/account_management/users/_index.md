---
title: User Management
kind: documentation
description: "Add or remove users in your organization. Modify user roles."
aliases:
 - /account_management/team/
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Learn how to create, update and delete a Role"
- link: "/account_management/rbac/permissions/"
  tag: "Documentation"
  text: "Discover the list of permissions available"
- link: "/api/v1/users/"
  tag: "Documentation"
  text: "Manage your users with the USER API"
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog for Government site only supports SAML login.</div>
{{< /site-region >}}

Datadog's **User Management** section allows you to manage your users and their associated roles. Switch between list and grid views by clicking **List View** or **Grid View** on the right:

{{< img src="account_management/users/user_page_list.png" alt="User Management Page in list view" >}}

## Add new members and manage invites

To add members to your organization:

1. Go to the User Management page.
2. Click **Invite Users** in the upper right corner of the page.
3. Enter the email address of the user you wish to invite to your Datadog account.
4. Assign one or more [user roles][1] to the users.
**Note**: Users with the Invite User permission can invite a user to any role they have themselves. Users with both the Invite User and Access Management permissions can invite a user to any role.
5. Click **Send Invites**

{{< img src="account_management/users/invite_user.png" alt="Add a user to your organization"  style="width:80%;">}}

The new user will receive an email with a link to log in. The user is marked with status `Invite Pending` until they log in. To cancel their invite before they log in, click the *Delete Invite* button on the right of the user line in list view, or on the user box in grid view. 

{{< img src="account_management/users/delete_invite_grid.png" alt="Delete invite on the grid view"  style="width:50%;">}}

To resend an invite in list view, click the user to open the user side panel, and click **Resend Invite**:

{{< img src="account_management/users/resend_invite_list.png" alt="Resend invite on the list view"  style="width:80%;">}}

In grid view, hover over the user box and click **Resend Invite**:

{{< img src="account_management/users/resend_invite_grid.png" alt="Resend invite on the grid view"  style="width:50%;">}}

## Edit a user's roles

Only users with the Access Management permission, such as users with the Datadog Admin Role, can change another user's role:

1. Go to the User Management Page.
2. Select the *Edit* button on the right of the user line.
3. Select the new [user roles][2] for this user.
4. **Save** the new setting.

{{< img src="account_management/users/user_role_update.png" alt="User role update"  style="width:80%;">}}

See the [Role Based Access Control][2] documentation to discover all roles available and how to create custom ones.

## Disable existing members

Only users with the Access Management permission, such as users with the Datadog Admin Role, can disable members. You cannot permanently remove users, as they might have authored dashboards or monitors, and their user ID is used to keep a record of their actions. When a user is disabled, any application keys they had generated are automatically revoked.

1. Go to the User Management Page.
2. Select the *Edit* button on the right of the user line.
3. Click on the **Disable** toggle.
4. **Save** the new setting.
5. Confirm the action.

{{< img src="account_management/users/disable_user.png" alt="Disable User"  style="width:80%;" >}}

**Note**: Disabled users are filtered out from the list of users in the User Management Page by default.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/users/default_roles/
[2]: /account_management/rbac/
