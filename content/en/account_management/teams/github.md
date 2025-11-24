---
title: Provision with GitHub
description: Enable automatic provisioning of Datadog Teams based on an organization's GitHub team structure, including nested teams. Allow Datadog to use Github as a source for Teams data.
further_reading:
    - link: '/integrations/github/'
      tag: 'Documentation'
      text: 'GitHub integration'
---

{{< callout url="https://www.datadoghq.com/product-preview/github-integration-for-teams/" header="Join the Preview!">}}
  GitHub Integration for Teams is in Preview.
{{< /callout >}}

## Overview

Link your GitHub teams to Datadog Teams to automatically provision Datadog Teams. The following features are supported:
- Create Datadog Teams based on your GitHub teams configuration.
- Sync team membership between Datadog and GitHub.

Datadog links existing teams by performing an exact name match between GitHub team slugs and Datadog Team [handles][1]. The match is case-insensitive and ignores whitespace differences.

If your GitHub teams have a hierarchical team structure, Datadog replicates that same structure during provisioning.

**Note:** In Datadog, a sub-team must be as restrictive as or more restrictive than its parent team. For example, a sub-team cannot be [open][2] if the parent team is [invite-only][2].

Datadog only reads GitHub teams. Datadog never modifies, creates, or deletes GitHub teams.

## Prerequisites

### GitHub integration
Ensure your Datadog organization is [connected][3] to a GitHub organization. Your GitHub integration must have the `members_read` permission to read team data.

### Permissions
- To link and create teams, you must have the `teams_manage` permission. 
- To manage team membership, you must have the `user_access_manage` permission.

## Setup

### Configure the GitHub teams to Datadog Teams connection
1. Navigate to [Teams][4].
1. In the upper right, click **GitHub Connections**.
1. Configure your connection by selecting options for import type, sync members, and cadence.
1. Click **Save**.

### View Datadog Teams
1. Navigate to [GitHub Connections][5].
1. If the list of created and linked teams is empty, click **Refresh**.
1. Optionally, manually update Datadog Teams to reach your desired state. 

### User configuration

After an admin enables team provisioning from GitHub, a call to action appears on the GitHub integration tile for each user. The call to action asks users to link their accounts from Datadog to GitHub through OAuth.

Each user must manually link their GitHub account to Datadog to establish the connection between Datadog and GitHub. This behavior is required by GitHub's OAuth and user privacy policies.

After a user links their accounts, Datadog adds the user to any Datadog Teams that correspond to GitHub teams where the user is a member.

For example, assume that user B is a member of team A in GitHub. The following sequence occurs in Datadog:
1. An admin enables Datadog Teams provisioning and user syncing from GitHub.
1. Team A is created in Datadog, empty.
1. User B sees a call to action to **Connect GitHub Account** and follows through.
1. User B is provisioned into Team A in Datadog

## Deleting teams

The GitHub automatic connection only manages resources that it created. 

If a team was created manually in Datadog and later linked to a GitHub team, deleting that GitHub team does not delete the Datadog Team.

However, if a team was originally created by the automatic GitHub sync, and that GitHub team is deleted, Datadog also deletes the corresponding team to maintain consistency.

### Examples
The following examples show the different results when deleting teams that were created in Datadog versus GitHub. 

Team created in Datadog:
1. An admin creates Team A in Datadog
1. Team A is linked to a GitHub team
1. Team A is deleted in GitHub
1. Team A remains in Datadog, but is not linked to any GitHub team

Team created automatically from GitHub:
1. Team B is created automatically from GitHub
1. Team B is deleted in GitHub
1. Team B is automatically deleted in Datadog

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/teams/#team-handle
[2]: /account_management/teams/manage/#team-modification-permissions
[3]: /integrations/github/#connect-github-teams-to-datadog-teams
[4]: https://app.datadoghq.com/organization-settings/teams
[5]: https://app.datadoghq.com/organization-settings/teams/github-connections?github-connections__view=synced