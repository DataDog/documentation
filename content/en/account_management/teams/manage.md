---
title: Team Management
kind: documentation
---

## Team membership

To differentiate members of your team, designate them as team managers. In the member list, a "TEAM MANAGER" badge appears next to team managers' names.

Under the team's settings, specify which users can modify the team membership. The following options are available:
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

Users with the `user_access_manage` permission can set default rules on who can add or remove members, or edit team details. Set default rules with the **Default Settings** button on the team directory page. Override these policies for an individual team on the team details panel.

## SAML attribute mapping

To manage teams and team membership using SAML attributes, see [Map SAML attributes to Teams][1].

## Delegate team management

For an open membership model, configure your default team settings so **Anyone in the organization** can add or remove members. Assign the `teams_manage` permission to the appropriate roles to let anyone create teams or edit team details.

If you prefer a team-driven membership model, set your default team settings so **Team Managers** or **Team Managers and Members** can add or remove members. Assign the `teams_manage` permission to a role containing all of your team managers.

To enforce a strict membership model, configure your default team settings so **Only users with user_access_manage** can add or remove members. Assign the `teams_manage` permission only to organization administrators.

[1]: /account_management/saml/mapping/#map-saml-attributes-to-teams
