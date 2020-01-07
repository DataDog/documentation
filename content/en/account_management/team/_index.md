---
title: Team
kind: documentation
description: "Add or remove team members for your organization. Modify team member roles."
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

Datadog's **Team** section allows you to manage your users and their associated roles:

{{< img src="account_management/team/team_page.png" alt="Team Page" responsive="true">}}

## Add new members

To add members to a team:

1. Go to the [Team Page][1].
2. Select **Invite Users** in the upper right corner of the page.
3. Enter the email address of the user you wish to invite to your Datadog account.
4. Assign a [user role][2] to this user. Note that you can only assign your roles to new user.
5. Click **Send Invites**

{{< img src="account_management/team/invite_user.png" alt="Add Member To Team" responsive="true" style="width:80%;">}}

The new user will receive an email with a link to log in. The user is marked with status `Pending` until they log in.
To re-send an invite, select the *Edit* button on the right of the user line, then click *Resend Invite*:

{{< img src="account_management/team/resend_invite.png" alt="Resend invite" responsive="true" style="width:80%;">}}

## Edit a user's roles

Only team administrators can promote members:

1. Go to the [Team Page][1].
2. Select the *Edit* button on the right of the user line.
3. Select the new [user roles][2] for this user.
4. **Save** the new setting.

{{< img src="account_management/team/user_role_update.png" alt="User role update" responsive="true" style="width:80%;">}}

## Disable existing members

Only administrators of the team can disable members. You cannot permanently remove users, as they might own events, dashboards, etc. that are not supposed to be removed.

1. Go to the [Team Page][1].
2. Select the *Edit* button on the right of the user line
3. Click on the **Disable** toggle.
4. **Save** the new setting.

{{< img src="account_management/team/disable_user.png" alt="Disable User" responsive="true" style="width:80%;" >}}

**Note**: Disabled team members disappear from the administrator's team page automatically after one month.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/team
[2]: /account_management/team/roles
