---
title: Teams and Access
description: "An overview of Datadog's features for controlling user access to resources, including teams, roles, permissions, and granular access controls."
further_reading:
- link: "/account_management/teams/"
  tag: "Documentation"
  text: "Teams"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Access Control"
- link: "/account_management/users/"
  tag: "Documentation"
  text: "Users"
- link: "/account_management/org_settings/"
  tag: "Documentation"
  text: "Organization Settings"
---

## Overview

Datadog provides a range of features for controlling which users can see and interact with resources in your organization. This page summarizes the available access control capabilities to help you choose the right combination for your team.

## Access control features

| Feature | Supported Products | Description |
|---------|--------------|-------------|
| [Data Access Control policies][2] | [Telemetry types][1] | Restricts datasets to specific Teams. |
| [Hierarchical Team Access][5] | [Dataset access][3] [Resource access][4] | Supports nesting teams within each other. Sub-teams inherit the roles and permissions of their parent teams, as well as access to restricted datasets or resources. |
| [Individual Resource Restrictions][6] | [Resource list][4] | Restricts access to specific dashboards and monitors to members of a specified Team. |
| [Personalized Team Views][7] | [Resource list][4] | Filters information in Datadog by Team without revoking access. |
| Team-based Restriction Policies (in Preview) | [Monitors][8] [Dashboards][9] | Restricts editing access to Teams identified by the `team:<>` tag. |
| [Team Tag Enforcement Policies][10] | [Monitors][8] | Enforces Team tag requirements for newly created monitors. |
| Team-linked Roles (in Preview) | N/A | Assigns roles to a Team. All Team members inherit the role, including its permissions and any granted access. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/data_access/#supported-telemetry
[2]: /account_management/rbac/data_access
[3]: /account_management/rbac/data_access/#supported-telemetry
[4]: /account_management/rbac/granular_access/#manage-access-to-individual-resources
[5]: /account_management/teams/manage/#subteams-hierarchical-teams
[6]: /account_management/rbac/granular_access/
[7]: /account_management/teams/#team-filter
[8]: /monitors/
[9]: /dashboards/
[10]: /monitors/settings/#tag-policies
