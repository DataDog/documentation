---
title: Access for Enterprises
description: Design and implement an access control strategy for your Datadog deployment at scale.
further_reading:
- link: "/administrators_guide/getting_started/"
  tag: "Documentation"
  text: "Administrator's Guide: Getting Started"
- link: "/getting_started/teams/"
  tag: "Documentation"
  text: "Getting Started with Teams"
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Access Control (RBAC)"
---

## Overview

This guide helps Datadog administrators at large organizations design and implement an access control strategy. It is intended for organizations that fit any of the following profiles:

- Have **100 or more users** across multiple teams or business units
- Operate in **regulated industries** with data sensitivity requirements
- Need to **expand Datadog usage** across more users and teams while maintaining governance

As organizations grow on Datadog, they face a core tension: enabling self-service for developers, operators, and business users while maintaining boundaries on who can see or change what. This guide provides a decision framework for resolving that tension, not step-by-step UI instructions.

## Prerequisites

This guide assumes familiarity with Datadog basics. Before starting, review:

- [Administrator's Guide: Getting Started][10] for overall platform setup and onboarding
- [Getting Started with Teams][11] for team structure, sync strategies, and ownership workflows
- [Access Control (RBAC)][12] for Datadog's role and permission model

## Design and implement an access control strategy

You can read this guide sequentially to plan a new access strategy, or jump to the section most relevant to your current challenge.

Each section addresses a layer of your access control strategy, from organizational structure through enforcement and auditing:

| Section | What to decide |
| :---- | :---- |
| [Choosing Your Datadog Topology][1] | Single org vs. multi-org, and when each is appropriate |
| [Permissions and Feature Access][2] | Custom roles, keeping roles current, role hygiene |
| [Assigning Users to Roles and Teams][3] | Roles vs. Teams, and how to assign users at scale |
| [Protecting Assets][4] | Restricting who can edit or view Dashboards, Monitors, and other assets |
| [Protecting Sensitive Data][5] | Restricting access to telemetry data using Data Access Control |
| [Credential Management][6] | Managing API keys, app keys, and short-lived tokens at scale |
| [Creating Access Policies][7] | A reference for choosing the right enforcement mechanism |
| [Sharing Across Organizations][8] | Cross-Org Visibility, Shared Dashboards, and multi-org governance |
| [Example Implementations][9] | Enterprise implementation templates |



## Next steps

Start with [Choosing Your Datadog Topology][1] to determine whether your organization should use a single Datadog org or multiple orgs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/access_for_enterprises/choosing_topology/
[2]: /getting_started/access_for_enterprises/permissions/
[3]: /getting_started/access_for_enterprises/assigning_users/
[4]: /getting_started/access_for_enterprises/protecting_assets/
[5]: /getting_started/access_for_enterprises/protecting_sensitive_data/
[6]: /getting_started/access_for_enterprises/credential_management/
[7]: /getting_started/access_for_enterprises/creating_access_policies/
[8]: /getting_started/access_for_enterprises/sharing_across_organizations/
[9]: /getting_started/access_for_enterprises/example_implementations/
[10]: /administrators_guide/getting_started/
[11]: /getting_started/teams/
[12]: /account_management/rbac/
