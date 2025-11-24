---
title: Provision with GitHub
description: Enable automatic provisioning of Datadog Teams based on an organization's GitHub team structure, including nested teams. Allow Datadog to use Github as a source for Teams data. 
---

{{< callout url="https://www.datadoghq.com/product-preview/github-integration-for-teams/" header="Join the Preview!">}}
  Github Integration for Teams is in Preview.
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
Ensure your Datadog organization is [connected][3] to a GitHub organization. Your GitHub integration must have the `members_read` permission in order to read team data.

### User permissions
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

Each user must manually link their GitHub account to Datadog to establish the connection between Datadog and GitHub. This behavior is required by GitHub's OAuth and user privacy policies.

## Deleting teams

The GitHub automatic connection only manages resources that it created. 

If a team was created manually in Datadog and later linked to a GitHub team, deleting that GitHub team does not delete the Datadog Team.

However, if a team was originally created by the automatic GitHub sync, and that GitHub team is deleted, Datadog also deletes the corresponding team to maintain consistency.

### Examples
The following examples show the different results when deleting teams that were created in Datadog versus GitHub. 

Team created in Datadog:
1. An admin creates Team Apples in Datadog
1. Team Apples is linked to a GitHub team
1. Team Apples is deleted in GitHub
1. Team Apples remains in Datadog, but is not linked to any GitHub team

Team created automatically from GitHub:
1. Team Oranges is created automatically from GitHub
1. Team Oranges is deleted in GitHub
1. Team Oranges is automatically deleted in Datadog

[1]: /account_management/teams/#team-handle
[2]: /account_management/teams/manage/#team-modification-permissions
[3]: /integrations/github/#connect-github-teams-to-datadog-teams
[4]: https://app.datadoghq.com/organization-settings/teams
[5]: https://app.datadoghq.com/organization-settings/teams/github-connections?github-connections__view=synced