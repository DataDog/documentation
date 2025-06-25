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

Issue Team Ownership automates your triaging work by assigning issues to the right teams. Your team owns an issue if it is either:
- code owner of the top-level stack frame of the issue according to GitHub `CODEOWNERS`.
- owner of the service where the issue happens.

**Note**: Stack frames of third-party files are not taken into account. Only the top-most stack frame related to a file present in your repository is considered.

## Leverage team ownership

Team ownership information appears on the issue details panel when available:

{{< img src="error_tracking/ownership-details.png" alt="Team ownership information on issue details" style="width:80%;" >}}

You can also use issue team ownership to filter issues by teams in the Error Tracking Explorer.

{{< img src="error_tracking/ownership-sidebar.png" alt="Team ownership information on sidebar" style="width:80%;" >}}

## Setup

### Configure Source Code Integration

1. Ensure [Source Code Integration][1] is set up.
2. Install [the GitHub integration][2].
3. Make sure all requested permissions (Contents, Members) are granted for the GitHub integration.

### Set up a CODEOWNERS file
Create a valid `CODEOWNERS` file in your repository following [GitHub's CODEOWNERS standards][3].

### Link GitHub teams to Datadog teams

In Datadog, go to [**Teams**](https://app.datadoghq.com/teams) > Select your team > **Settings** > **GitHub Connection** to map your Datadog teams to the corresponding GitHub teams defined in your `CODEOWNERS` file.

{{< img src="error_tracking/team-github-connection.jpg" alt="Linking GitHub teams to Datadog teams" style="width:80%;" >}}

**Note**: Issue Team Ownership only supports GitHub.

## Configuration

Issue Team Ownership is enabled by default for all services once the setup requirements are met. You can control this feature at both global and service levels through the [Error Tracking settings page](https://app.datadoghq.com/error-tracking/settings/issues/ownership).

{{< img src="error_tracking/ownership-config.png" alt="Issue Team Ownership configuration settings" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/source-code-integration
[2]: /integrations/github/
[3]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners