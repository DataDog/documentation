---
title: User Management
kind: documentation
description: "Add or remove users to your organization. Modify user roles."
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

<div class="alert alert-warning">
The new user management interface is in private beta. <a href="/help">Contact Datadog support</a> to have it enabled for your account.
</div>

Datadog's **User Management** section allows you to manage your users and their associated roles:

{{< img src="account_management/users/user_page.png" alt="User Management Page" >}}

## Add new members

To add members to your organization:

1. Go to the User Management Page.
2. Select **Invite Users** in the upper right corner of the page.
3. Enter the email address of the user you wish to invite to your Datadog account.
4. Assign one or more [user roles][1] to the users.
**Note**: Users with Standard Access can invite a user to any role they have themselves. Users with Privileged Access can invite a user to any role.
5. Click **Send Invites**

{{< img src="account_management/users/invite_user.png" alt="Add a user to your organization"  style="width:80%;">}}

The new user will receive an email with a link to log in. The user is marked with status `Pending` until they log in.
To re-send an invite, select the *Edit* button on the right of the user line, then click *Resend Invite*:

{{< img src="account_management/users/resend_invite.png" alt="Resend invite"  style="width:80%;">}}

## Edit a user's roles

Only users with Privileged Access, such as users with the Datadog Admin Role, can change another user's role:

1. Go to the User Management Page.
2. Select the *Edit* button on the right of the user line.
3. Select the new [user roles][2] for this user.
4. **Save** the new setting.

{{< img src="account_management/users/user_role_update.png" alt="User role update"  style="width:80%;">}}

See the [Role Based Access Control][2] documentation to discover all roles available and how to create custom ones.

## Disable existing members

Only user with Privileged Access, such as users with the Datadog Admin Role, can disable members. You cannot permanently remove users, as they might own events, dashboards, etc. that are not supposed to be removed. When a user is disabled, any Application Keys they had generated are automatically revoked.

1. Go to the User Management Page.
2. Select the *Edit* button on the right of the user line
3. Click on the **Disable** toggle.
4. **Save** the new setting.
5. Confirm the action.

{{< img src="account_management/users/disable_user.png" alt="Disable User"  style="width:80%;" >}}

**Note**: Disabled users are filtered out from the list of users in the User Management Page by default.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/users/default_roles/
[2]: /account_management/rbac/
