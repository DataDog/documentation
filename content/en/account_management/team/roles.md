---
title: Datadog User Roles
kind: documentation
description: "Add or remove team members for your organization. Modify team member roles."
further_reading:
- link: "account_management/team"
  tag: "Documentation"
  text: "Manage your Datadog Users"
- link: "account_management/saml"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

Datadog provides three user roles by default:

| Role          | Description                                                                                                                                                                                                                                  |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Admin**     | Users have access to billing information and the ability to revoke API keys. They can manage users and configure [read-only dashboards][1]. They can also promote standard users to administrators.                                          |
| **Standard**  | Users are allowed to view and modify all monitoring features that Datadog offers, such as [dashboards][1], [monitors][2], [events][3], and [notebooks][4]. Standard users can also invite other users to organizations.                      |
| **Read Only** | Users do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client, or when a member of one business unit needs to share a [dashboard][1] with someone outside their unit. |

## Create a custom role

<div class="alert alert-warning">
This feature is in private beta. <a href="/help">Contact Datadog support</a> to get it enabled for your account.
</div>

To create a custom role:

1. Go to your [Datadog Roles page][5].
2. Select **New Role** in the upper right corner of the page.
3. Give a name to your role.
4. Select the permissions associated with this role.

{{< img src="account_management/team/create_role.png" alt="Create a custom Role" responsive="true" style="width:90%;">}}

Once a role is created you can [add this role to existing users][6].

## List of available permissions

Select first the General permission for your role to cover all posibilities, then fine tune it with the [Advanced Permissions](#advanced-permissions).

### General Permissions

| Permission Name    | Description                                                                                                                                                                                                                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Priviledged Access | This permission gives to the role the ability to view and edit everything in your Datadog organization that does not have an explicitly defined permission. This includes billing and usage, user, key, and organization management. This permission is inclusive of all Standard access permissions. |
| Standard Access    | This permission gives to the role the ability to view and edit components in your Datadog organization that do not have explicitly defined permissions. This includes APM, Events, and other non-Account Management functionality.                                                                    |
| Read-Only Access   | This permission gives to the role read access to parts of the application not explicitly defined with permissions or restricted through the combination of the user's roles and the permissions granted them.                                                                                         |

### Advanced Permissions

All permissions have up to three options that can be selected: Read, Write, and Other. Note that not all options are available every time for a given permission. Find below the detailed of those options and the impact of each available permission.

#### Logs

| Permission Name        | Read                                | Write                                      | Other                                   |
|------------------------|-------------------------------------|--------------------------------------------|-----------------------------------------|
| Log Indexes            | Read a subset of all log indexes    | Update the definition of log indexes       | *undefined*                             |
| Live Tail              | Access the live tail feature        | *undefined*                                | *undefined*                             |
| Exclusion Filters      | *undefined*                         | Update a subset of the exclusion filters   | *undefined*                             |
| Log Pipelines          | *undefined*                         | Update a subset of the log pipelines       | *undefined*                             |
| Log Processors         | *undefined*                         | Update the log processors in an index      | *undefined*                             |
| Log External Archives  | *undefined*                         | Update the external archives configuration | *undefined*                             |
| Logs Public Config API | *undefined*                         | *undefined*                                | Access the Logs Public Config API (r/w) |
| Log Generate Metrics   | Access the Generate Metrics feature | *undefined*                                | *undefined*                             |

#### Dashboards

| Permission Name  | Read                         | Write             | Other                     |
|------------------|------------------------------|-------------------|---------------------------|
| Dashboards       | Access dashboards (required) | Update dashboards | *undefined*               |
| Dashboards Share | *undefined*                  | *undefined*       | Share dashboards publicly |

#### Monitors

| Permission Name   | Read                       | Write                   | Other       |
|-------------------|----------------------------|-------------------------|-------------|
| Monitors          | Access monitors (required) | Update monitor          | *undefined* |
| Monitors Downtime | *undefined*                | Manage monitor downtime | *undefined* |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards
[2]: /monitors
[3]: /graphing/event_stream
[4]: /graphing/notebooks
[5]: https://app.datadoghq.com/rbac
[6]: /account_management/team/#edit-a-user-roles
