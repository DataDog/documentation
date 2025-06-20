---
title: Issue Team Ownership
description: Automatically assign issues to teams based on Git CODEOWNERS files.
further_reading:
- link: '/error_tracking/auto_assign/'
  tag: 'Documentation'
  text: 'Auto Assign'
- link: '/error_tracking/suspected_causes/'
  tag: 'Documentation'
  text: 'Suspected Causes'
---

## Overview

Issue Team Ownership automatically assigns issues to teams by linking error stack traces to Git `CODEOWNERS` files. This feature streamlines issue resolution by connecting errors to the appropriate teams based on code ownership, making it easier to identify which team should handle specific problems.

When an issue occurs, Error Tracking analyzes the stack trace and matches it against your repository's `CODEOWNERS` file to determine which team owns the affected code. The issue is then automatically assigned to the corresponding Datadog team.

## Setup

Issue Team Ownership requires Source Code Integration and a properly configured `CODEOWNERS` file. Follow these steps to enable the feature:

### Prerequisites

- Source Code Integration must be enabled and connected to GitHub
- All requested permissions must be granted for the GitHub integration
- Your repository must contain a valid `CODEOWNERS` file

**Note**: Issue Team Ownership currently supports GitHub only.

### Configure Source Code Integration

- Ensure Source Code Integration is enabled and connected to your GitHub repository.
- Double check every requested permission is granted for the GitHub integration.

For detailed setup instructions, see [Source Code Integration][1].

### Set up CODEOWNERS file

Place a valid `CODEOWNERS` file in one of the following locations in your repository:

- `.github/CODEOWNERS`
- `CODEOWNERS` (root directory)
- `docs/CODEOWNERS`

The `CODEOWNERS` file defines ownership of files and directories in your codebase using [GitHub's CODEOWNERS format][2].

### Link GitHub teams to Datadog teams

1. In Datadog, navigate to **Teams**.
2. Select your team and go to **Settings**.
3. Click **GitHub Connection**.
4. Map your Datadog teams to the corresponding GitHub teams defined in your `CODEOWNERS` file.

{{< img src="error_tracking/team-github-connection.jpg" alt="Linking GitHub teams to Datadog teams" style="width:80%;" >}}

Once configured, issues are automatically attributed to the relevant teams based on stack traces and the `CODEOWNERS` file.

## Configuration

Issue Team Ownership is enabled by default for all services once the setup requirements are met. You can control this feature at both global and service levels through the Error Tracking settings page.

{{< img src="error_tracking/ownership-config.png" alt="Issue Team Ownership configuration settings" style="width:100%;" >}}

## Leverage team ownership information

Team ownership information appears on the issue details panel when available:

{{< img src="error_tracking/ownership-details.png" alt="Team ownership information on issue details" style="width:90%;" >}}

You can also use issue team ownership to filter issues by teams in the Error Tracking Explorer. Use the team filter to view only issues assigned to specific teams, making it easier to focus on issues relevant to your team.

{{< img src="error_tracking/ownership-sidebar.png" alt="Team ownership information on sidebar" style="width:90%;" >}}

## Benefits

- **Faster issue resolution**: Quickly identify which team is responsible for an issue
- **Improved visibility**: Teams can easily filter and view issues that belong to them
- **Automated assignment**: Reduces manual triage by automatically routing issues to the right teams
- **Accurate ownership**: Leverages existing `CODEOWNERS` files to ensure consistent ownership mapping

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/source-code-integration
[2]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners