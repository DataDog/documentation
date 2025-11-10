---
title: Provision with GitHub
description: Enable automatic provisioning of Datadog Teams based on an organization's GitHub team structure, including nested teams. Allow Datadog to use Github as a source for Teams data. 
---

{{< callout url="https://www.datadoghq.com/product-preview/github-integration-for-teams/" header="Join the Preview!">}}
  Github Integration for Teams is in Preview.
{{< /callout >}}

## Overview

Link your GitHub Teams to Datadog teams to enable Datadog teams to be automatically provisioned. The following automatic provisioning features are supported:
- Create Datadog Teams based on your GitHub teams configuration.
- Sync team membership between Datadog and GitHub.

When you provision Datadog teams based on GitHub teams, Datadog replicates the same hierarchical team structure you may have in GitHub.

**Note:** In Datadog, a sub-team must be as restrictive as or more restrictive than its parent team. For example, a sub-team cannot be Open if the parent team is Invite-Only.


## Prerequisites
- Your GitHub integration must have the `members_read` permission
- To link and create teams, you must have the `teams_manage` permission. 
- To manage team membership, you must have the `user_access_manage` permission.

## Setup

## Implications, what happens after the linkage

### Deletion scenarios