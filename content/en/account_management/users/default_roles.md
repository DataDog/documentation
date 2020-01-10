---
title: Default Datadog Roles and Permissions
kind: documentation
description: "A description of the default Datadog Roles and Permissions"
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
| **Datadog Admin Role**     | Users have access to billing information and the ability to revoke API keys. They can manage users and configure [read-only dashboards][1]. They can also promote standard users to administrators.                                          |
| **Datadog Standard Role**  | Users are allowed to view and modify all monitoring features that Datadog offers, such as [dashboards][1], [monitors][2], [events][3], and [notebooks][4]. Standard users can also invite other users to organizations.                      |
| **Datadog Read Only Role** | Users do not have access to edit within Datadog. This comes in handy when you'd like to share specific read-only views with a client, or when a member of one business unit needs to share a [dashboard][1] with someone outside their unit. |


<div class="alert alert-warning">
The list of permissions and roles is in active development. This page will be updated as new permissions are added and names and definitions are updated.
</div>

## Description of available permissions

General permissions provide the base level of access for your role. [Advanced Permissions](#advanced-permissions) are explicitly defined permissions that augment the base permissions.

### General Permissions

| Permission Name    | Description                                                                                                                                                                                                                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Priviledged Access | This permission gives to the role the ability to view and edit everything in your Datadog organization that does not have an explicitly defined permission. This includes billing and usage, user, key, and organization management. This permission is inclusive of all Standard Access permissions. |
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
