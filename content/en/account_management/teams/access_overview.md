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
| Individual Resource Restrictions – Targeting Teams | Access to specific Dashboards and/or Monitors can be restricted, on a case by case basis, only to members of the relevant Team(s) | Supported products listed [here][1] | [Granular Access Control][2] |
| Data Access Control policies – Targeting Teams | Datasets can be restricted to specific Teams | Supported products listed [here][3] | [Data Access Control][4] |
| Personalized Team Views | Teams can be used to filter Datadog to relevant information – without revoking Access. | Team filters are available in many views across Datadog, including Dashboards, Monitors, Resource Catalog, Service Catalog, Cloud Cost, and more! | [Team filter][5] |
| Hierarchical Team Access | Sub-teams inherit: Roles and permissions granted to their parent teams (see Team-linked Roles below); Access granted to restricted datasets or resources (Dashboards, Monitors, etc.) | [Dataset access][6] and [Resource access][7] | [Hierarchical Teams][8] |
| Team-linked Roles | Roles can be assigned to a Team, so all members receive the Role including all included Permissions and Access granted | Preview; not scoped to products; team members inherit the role and anything related. | Available for Preview orgs |
| Team-based Restriction Policies | Resources can only be edited by the Team identified in the team: tag | Preview; supported for [Monitors][9] and [Dashboards][10] | Available for Preview orgs |
| Team Tag Enforcement Policies | The Team Tag can be required for any newly created Monitors; Supports Team-based Restriction Policies, and other Teams functionality. | General Availability; Currently supported for [Monitors][11] | [Monitors Tag Policy][12] |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/granular_access/#manage-access-to-individual-resources
[2]: /account_management/rbac/granular_access/
[3]: /account_management/rbac/data_access/#supported-telemetry
[4]: /account_management/rbac/data_access
[5]: /account_management/teams/#team-filter
[6]: /account_management/rbac/data_access/#supported-telemetry
[7]: /account_management/rbac/granular_access/#manage-access-to-individual-resources
[8]: /account_management/teams/manage/#subteams-hierarchical-teams
[9]: /monitors/
[10]: /dashboards/
[11]: /monitors/settings/#tag-policies
[12]: /monitors/settings/#tag-policies