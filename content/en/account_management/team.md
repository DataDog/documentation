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

{{< wistia 3rrd63kxzu >}}

## Add new members

1. To add members to a team, start by visiting the [Team Page][1].
2. Enter the email address of the user you wish to invite to your Datadog account. Click **Invite**
  {{< img src="account_management/team/guides-multacct-addtoteam.png" alt="Add Member To Team"  style="width:50%;">}}

The new user will receive an email with a link to log in.

## Datadog user roles

Datadog provides 3 user roles:

* **Administrators** have access to billing information and the ability to revoke API keys. They can manage users and configure [read-only dashboards][2]. They can also promote standard users to administrators.

* **Standard users** can view and modify all monitoring features that Datadog offers, such as [dashboards][2], [monitors][3], [events][4], and [notebooks][5]. Standard users can also invite other users to organizations.

* **Read only users** are created by administrators and do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client, or where a member of one business unit needs to share a [dashboard][2] with someone outside their unit.

## Disable existing members

**NOTE:** You must be an administrator of the team to disable members. You cannot permanently remove users as they might own events, dashboards, etc. that are not supposed to be removed. Disabled team members disappear from the administrator's team page UI automatically after one month.

1. Go to the [Team Page][1].
2. Hover over the avatar for the user you wish to disable. Choose **Disable** from the menu.

    {{< img src="account_management/team/guides-multacct-disable.png" alt="Disable Member"  style="width:50%;" >}}

## Promote existing members to administrator

**NOTE:** Only team administrators can promote members.

1. Go to the [Team Page][1].
2. Hover over the avatar for the user you wish to promote. Choose **Make Administrator** from the menu.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/team
[2]: /graphing/dashboards
[3]: /monitors
[4]: /graphing/event_stream
[5]: /graphing/notebooks
