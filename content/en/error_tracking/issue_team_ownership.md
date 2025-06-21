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

Issue Team Ownership automatically assigns issues to teams by linking error stack traces to your Git `CODEOWNERS` files. This feature streamlines issue resolution by connecting errors to the appropriate teams, making it easier to identify which team should handle specific problems with team-based filtering, and accurate ownership mapping.

## Leverage team ownership

Team ownership information appears on the issue details panel when available:

{{< img src="error_tracking/ownership-details.png" alt="Team ownership information on issue details" style="width:80%;" >}}

You can also use issue team ownership to filter issues by teams in the Error Tracking Explorer. Use the team filter to view only issues assigned to specific teams, making it easier to focus on issues relevant to your team.

{{< img src="error_tracking/ownership-sidebar.png" alt="Team ownership information on sidebar" style="width:80%;" >}}

## Setup

### Configure Source Code Integration

Ensure [Source Code Integration][1] is setup and install [the GitHub integration][2]. Make sure all requested permissions are granted for the GitHub integration.

### Set up CODEOWNERS file
Create a valid `CODEOWNERS` file in your repository following [GitHub's CODEOWNERS standards][3].

### Link GitHub teams to Datadog teams

In Datadog, go to **Teams** > Select your team > **Settings** > **GitHub Connection** to map your Datadog teams to the corresponding GitHub teams defined in your `CODEOWNERS` file.

{{< img src="error_tracking/team-github-connection.jpg" alt="Linking GitHub teams to Datadog teams" style="width:80%;" >}}

***Note**: Issue Team Ownership currently supports GitHub only.*

## Configuration

Issue Team Ownership is enabled by default for all services once the setup requirements are met. You can control this feature at both global and service levels through the Error Tracking settings page.

{{< img src="error_tracking/ownership-config.png" alt="Issue Team Ownership configuration settings" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/source-code-integration
[2]: /integrations/github/
[3]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners