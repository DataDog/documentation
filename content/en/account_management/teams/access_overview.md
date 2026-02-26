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

| Feature | Description | Availability | Documentation |
|---------|-------------|--------------|---------------|
| Data Access Control policies | Restrict datasets to specific Teams. | See supported products [here][1]. | [Data Access Control][2] |
| Hierarchical Team Access | Nest teams within each other. Sub-teams inherit roles and permissions granted to their parent teams as well as access granted to restricted datasets or resources. | [Dataset access][3] and [resource access][4] | [Hierarchical Teams][5] |
| Individual Resource Restrictions | Restrict access to specific Dashboards and/or Monitors to specific members of a Team. | See supported products [here][4]. | [Granular Access Control][6] |
| Personalized Team Views | Filter information in Datadog by Team, without revoking access. | See supported products [here][4] | [Team filter][7] |
| Team-based Restriction Policies | Restrict editing access to Teams with the `team:` tag. | Preview; supported for [Monitors][8] and [Dashboards][9] | Available for Preview orgs |
| Team Tag Enforcement Policies | Set Team tag requirements for any newly created monitors. | Supported for [Monitors][8] | [Monitors Tag Policy][10] |
| Team-linked Roles | Assign roles to a Team. All Team members receive the Role, including Role permissions and any granted access. | Preview | Available for Preview orgs |

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
