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

Datadog's **User** tab in **Organization Settings** allows you to manage your users and their associated roles. Switch between list and grid views by clicking **List View** or **Grid View** on the right.

## Add new members and manage invites

To add members to your organization:

1. Go to the Organization Settings page, then click the **Users** tab.
2. Click **Invite Users** in the upper right corner of the page.
3. Enter the email address of the user you wish to invite to your Datadog account.
4. Assign one or more [user roles][1] to the users.
**Note**: Users with the Invite User permission can invite a user to any role they have themselves. Users with both the Invite User and Access Management permissions can invite a user to any role.
5. Click **Send Invites**.

The new user receives an email with a link to log in. The user is marked with the status `Invite Pending` until they log in. To cancel their invite before they log in, click the **Delete Invite** button on the right of the user line in list view, or on the user box in grid view. 

To resend an invite in list view, click the user to open the user side panel and click **Resend Invite**. Or in grid view, hover over the user box and click **Resend Invite**.

## Edit a user's roles

Only users with the User Access Management permission, such as users with the Datadog Admin Role, can change another user's role.

To edit a user's roles:

1. Go to the **Users** tab of **Organization Settings**.
2. Select the **Edit** button on the right of the user line.
3. Select the new [user roles][2] for this user, or click the 'X' next to an existing role to remove it.
4. **Save** the new settings.

{{< img src="account_management/users/user_role_update.png" alt="User role update" style="width:80%;">}}

To discover all of the roles available and how to create custom ones, see the [Role Based Access Control documentation][2].

## Edit a user's login methods

Only users with the Org Management permission, such as users with the Datadog Admin Role, can change another user's login methods.

Default login methods for an organization can be set through the Login Methods page. There you can allow or disallow all users in your organization to use a Datadog username and password, to sign in with Google, or to sign in with SAML. In User Management you can override on a per-user basis to allow a specific user to use one method or multiple methods. This is helpful in circumstances where you want all users to use SAML but need to enable a set of users to log in with username and password in an emergency.

To edit a user's login methods:

1. Go to the **Users** tab of **Organization Settings**.
2. Click **Edit** on the right of the user line.
3. Switch the toggle beside **Override Default Login Methods** to enable or disable overrides for the user.
4. If enabling overrides, choose a set of login methods that the user can use to access Datadog. This can be a single option or all options that are configured for your organization.
5. Click **Save**.


**Note**: Overrides can be set only to valid login methods. If you have not configured SAML, you cannot choose that login method as an override for a user.

## Disable existing members

Only users with the Access Management permission, such as users with the Datadog Admin Role, can disable members. You cannot permanently remove users, as they might have authored dashboards or monitors, and their user ID is used to keep a record of their actions. When a user is disabled, any application keys they had generated are automatically revoked.

1. Go to the **Users** tab of **Organization Settings**.
2. Select the **Edit** button on the right of the user line.
3. Click on the **Disable** toggle.
4. **Save** the changes.
5. Confirm the action.

**Note**: By default, disabled users are filtered out from the list of users in the User Management Page. If you have the correct permissions, you can filter by users with the status `Disabled` and re-enable them.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/users/default_roles/
[2]: /account_management/rbac/
