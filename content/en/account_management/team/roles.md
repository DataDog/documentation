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

## Default Datadog User Roles

Datadog provides 3 user roles:

| Role          | Description                                                                                                                                                                                                                                   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Admin**     | Users have access to billing information and the ability to revoke API keys. They can manage users and configure [read-only dashboards][1]. They can also promote standard users to administrators.                                           |
| **Standard**  | Users are allowed to view and modify all monitoring features that Datadog offers, such as [dashboards][1], [monitors][2], [events][3], and [notebooks][4]. Standard users can also invite other users to organizations.                       |
| **Read Only** | Users do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client, or where a member of one business unit needs to share a [dashboard][5] with someone outside their unit. |

## Create a custom Role

<div class="alert alert-warning">
This feature is in private beta. <a href="/help">Contact Datadog support</a>. to get it enabled for your Account.
</div>

To create a custom Role:

1. Go in your [Datadog Roles page][6].
2. Select **New Role** in the upper right corner of the page.
3. Give a name to your Role.
4. Select the permission associated to this.

{{< img src="account_management/team/create_role.png" alt="Create a custom Role" responsive="true" style="width:90%;">}}

Once a role is created you can [add this role to existing users][7].

### List of availables permissions

All permissions have up to 3 options that can be selected: Read, Write, and Other. Note that not all options are available every time for a given permission. Find below the detailed of those options and the impact over each available permission.

#### General

| Permission Name | Read        | Write       | Other                                        |
|-----------------|-------------|-------------|----------------------------------------------|
| Admin           | *undefined* | *undefined* | Read and write permission to all of Datadog  |
| Standard        | *undefined* | *undefined* | Read and write permission to most of Datadog |
| Read-Only       | *undefined* | *undefined* | Read permission to most of datadog           |

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

| Permission Name | Read                         | Write             | Other                     |
|-----------------|------------------------------|-------------------|---------------------------|
| Dashboards      | Access Dashboards (required) | Update Dashboards | Share Dashboards publicly |

#### Monitors

| Permission Name   | Read                       | Write                   | Other       |
|-------------------|----------------------------|-------------------------|-------------|
| Monitors          | Access Monitors (required) | Update monitor          | *undefined* |
| Monitors Downtime | *undefined*                | Manage Monitor Downtime | *undefined* |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards
[2]: /monitors
[3]: /graphing/event_stream
[4]: /graphing/notebooks
[5]: /graphing/dashboards
[6]: https://app.datadoghq.com/rbac
[7]: /account_management/team/#edit-a-user-roles
