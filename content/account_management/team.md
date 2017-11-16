---
title: Team
kind: documentation
autotocdepth: 2
customnav: accountmanagementnav
---

## Add New Members

1. To add members to a team, start by visiting the [Team Page][1].
2. Enter the email address of the user you wish to invite to your Datadog account. Click **Invite**
  {{< img src="account_management/team/guides-multacct-addtoteam.png" alt="Add Member To Team" responsive="true" >}}

The new user will receive an email with a link to login.

## Datadog User roles

Datadog provides 3 user roles:

* **Admins** have access to billing information, the ability to revoke API keys, removing users, and can configure [read-only dashboards](/graphing/dashboards/). They can also promote standard users to Admins.

* **Standard users** have access to view and modify all monitoring features that Datadog offers such as [dashboards](/graphing/dashboards/), [monitors](/monitors/), [events](/graphing/event_stream), and [notebooks](/graphing/notebooks).

* **Read only users** are created by admins and do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client or where a member of one business unit needs to share a dashboard with someone outside their unit.

## Disable Existing Members

**NOTE:** You must be an Admin of the team to disable members

1. Go to the [Team Page][1].
2. Hover over the avatar for the user you wish to disable. Choose **Disable** from the menu.

    {{< img src="account_management/team/guides-multacct-disable.png" alt="Disable Member" responsive="true" >}}

## Promote Existing Members to Admin

**NOTE:** You must be an Admin of the team to promote members

1. Go to the [Team Page][1].
2. Hover over the avatar for the user you wish to promote. Choose **Make Admin** from the menu.

[1]: https://app.datadoghq.com/account/team
