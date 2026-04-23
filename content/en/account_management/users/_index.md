---
title: User Management
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
<div class="alert alert-danger">The Datadog for Government site only supports SAML login.</div>
{{< /site-region >}}

Datadog's {{< ui >}}User{{< /ui >}} tab in {{< ui >}}Organization Settings{{< /ui >}} allows you to manage your users and their associated roles. Switch between list and grid views by clicking {{< ui >}}List View{{< /ui >}} or {{< ui >}}Grid View{{< /ui >}} on the right.

## Add new members and manage invites

To add members to your organization:

1. Go to the Organization Settings page, then click the {{< ui >}}Users{{< /ui >}} tab.
2. Click {{< ui >}}Invite Users{{< /ui >}} in the upper right corner of the page.
3. Enter the email address of the user you wish to invite to your Datadog account.
4. Assign one or more [user roles][1] to the users.
**Note**: Users with the Invite User permission can invite a user to any role they have themselves. Users with both the Invite User and Access Management permissions can invite a user to any role.
5. Click {{< ui >}}Send Invites{{< /ui >}}.

The new user receives an email with a link to log in. This link is valid for 48 hours. The user is marked with the status `Invite Pending` until they log in. To cancel their invite before they log in, click the {{< ui >}}Delete Invite{{< /ui >}} button on the right of the user line in list view, or on the user box in grid view. 

To resend an invite in list view, click the user to open the user side panel and click {{< ui >}}Resend Invite{{< /ui >}}. Or in grid view, hover over the user box and click {{< ui >}}Resend Invite{{< /ui >}}.

## Edit a user's roles

Only users with the User Access Management permission, such as users with the Datadog Admin Role, can change another user's role.

To edit a user's roles:

1. Go to the {{< ui >}}Users{{< /ui >}} tab of {{< ui >}}Organization Settings{{< /ui >}}.
2. Select the {{< ui >}}Edit{{< /ui >}} button on the right of the user line.
3. Select the new [user roles][2] for this user, or click the 'X' next to an existing role to remove it.
4. {{< ui >}}Save{{< /ui >}} the new settings.

{{< img src="account_management/users/user_role_update.png" alt="User role update" style="width:80%;">}}

To discover all of the roles available and how to create custom ones, see the [Role Based Access Control documentation][2].

## Edit a user's login methods

Only users with the User Access Management permission, such as users with the Datadog Admin Role, can change another user's login methods.

Default login methods for an organization can be set through the Login Methods page. There you can allow or disallow all users in your organization to use a Datadog username and password, to sign in with Google, or to sign in with SAML. In User Management you can override on a per-user basis to allow a specific user to use one method or multiple methods. This is helpful in circumstances where you want all users to use SAML but need to enable a set of users to log in with username and password in an emergency.

To edit a user's login methods:

1. Go to the {{< ui >}}Users{{< /ui >}} tab of {{< ui >}}Organization Settings{{< /ui >}}.
2. Click {{< ui >}}Edit{{< /ui >}} on the right of the user line.
3. Switch the toggle beside {{< ui >}}Override Default Login Methods{{< /ui >}} to enable or disable overrides for the user.
4. If enabling overrides, choose a set of login methods that the user can use to access Datadog. This can be a single option or all options that are configured for your organization.
5. Click {{< ui >}}Save{{< /ui >}}.


**Note**: Overrides can be set only to valid login methods. If you have not configured SAML, you cannot choose that login method as an override for a user.

## Disable existing members

Only users with the Access Management permission, such as users with the Datadog Admin Role, can disable members. You cannot permanently remove users, as they might have authored dashboards or monitors, and their user ID is used to keep a record of their actions.

<div class="alert alert-warning">Disabling a user revokes all of their application keys and personal access tokens (PATs). Any workflows or integrations that rely on these keys stop working immediately. To avoid disruptions, use keys that belong to <a href="/account_management/org_settings/service_accounts/">service accounts</a> for long-running integrations and automated workflows.</div>

1. Go to the {{< ui >}}Users{{< /ui >}} tab of {{< ui >}}Organization Settings{{< /ui >}}.
2. Select the {{< ui >}}Edit{{< /ui >}} button on the right of the user line.
3. Click on the {{< ui >}}Disable{{< /ui >}} toggle.
4. {{< ui >}}Save{{< /ui >}} the changes.
5. Confirm the action.

**Note**: By default, disabled users are filtered out from the list of users in the User Management Page. If you have the correct permissions, you can filter by users with the status `Disabled` and re-enable them.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/users/default_roles/
[2]: /account_management/rbac/

