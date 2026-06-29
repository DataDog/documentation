---
title: Protecting Assets
description: Restrict who can edit or view Dashboards, Monitors, and other Datadog assets.
further_reading:
- link: "/account_management/rbac/granular_access"
  tag: "Documentation"
  text: "Granular Access Control"
- link: "/getting_started/teams/"
  tag: "Documentation"
  text: "Getting Started with Teams"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs"
  tag: "Documentation"
  text: "Datadog Terraform Provider"
---

## Overview

With your roles and teams in place, the most immediate access control needed is protecting *assets*: the Dashboards, Monitors, Notebooks, Service Level Objectives, integrations, Datadog Agents, and other objects that teams create and depend on for their daily work.

The most common need is not to *hide* assets, but to prevent the wrong person from accidentally *editing* them. In large organizations, a single Monitor misconfiguration can affect alerting for an entire team. [Granular access controls][1] let you restrict who can edit or view individual assets.

## Common patterns

### Assets that should only be edited by the responsible team

This is the most common pattern. The assets themselves aren't sensitive (anyone can view them) but they are critical to a given team's workflows and should not be updated by others.

*For example, every team has a set of Dashboards and Monitors that reflect their on-call processes and SLOs. A developer from another team viewing the Dashboard is fine; accidentally editing it or deleting a Monitor is not.*

**Recommended approach:** Use [granular access controls][1] to restrict **Edit** of each asset to the owning Team, while leaving **View** open to the organization. These can be set per asset with the UI, API, or Terraform. Even when an entire organization can view an asset, [Team Tags][2] allow for personalized filtering of more relevant assets across Datadog using the Team filter.

This is also the right approach for the "create but not edit" pattern: users can freely create their own Monitors and Dashboards, but granular access controls prevent them from editing assets owned by other teams. The boundary is ownership, not a role-level permission.

Certain Datadog assets offer access levels beyond Edit, View, and No Access. For example, Logs Pipelines separate who can manage an entire pipeline vs. who can edit the processors within it. For more details, see [granular access controls][1].

### Assets that should only be viewed by the responsible team

This is less common. The assets themselves contain sensitive information, and no one outside the designated group should see them at all. **Note:** View-level restrictions are supported for Notebooks and Dashboards.

*For example, a Notebook created in response to a particularly sensitive security incident should be completely hidden from anyone not involved in the response. Or an executive Dashboard with financial data may need to be restricted to specific leadership roles.*

**Recommended approach:** Use granular access controls to restrict **View** of that asset to the specific Team or set of users, with **No Access** granted to the rest of the organization.

## Admin override considerations

Restricting assets to specific teams affects everyone, including administrators. If your platform administrators are not members of the owning team, they are locked out. For more information, see [Assigning Users to Roles and Teams][3].

Before broadly applying granular access controls, make sure your admin override team is included in the access list for all critical assets. A common approach is to include an "Admin" or "Platform" team with Edit access alongside the owning team.

**Note:** Users with the `user_access_manage` permission can grant themselves elevated access as a failsafe.

## Recommendations

- **Restrict Edit, not View, as your default.** Most assets benefit from broad visibility and restricted editing. Only restrict View for genuinely sensitive assets.
- **Use team ownership as the access boundary.** The owning Team should have Edit access. All other users should only have View access.
- **Use Team Tags to personalize asset lists** using the Team filter across Datadog, so users see the most relevant assets first.
- **Set up your admin override team first.** Before restricting assets, make sure your administrators do not get locked out.
- **Apply restrictions with Terraform or API for consistency.** Managing hundreds of assets manually doesn't scale. Use [Terraform][4] or the API to apply consistent access policies.
- **Start with your most critical assets.** Begin with production Monitors and key operational Dashboards.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/granular_access
[2]: /getting_started/teams/
[3]: /getting_started/access_for_enterprises/assigning_users/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
