---
title: Issue Team Ownership
description: Automatically assign issues to teams based on service owners, Git CODEOWNERS files or the team attribute.
further_reading:
- link: '/error_tracking/auto_assign/'
  tag: 'Documentation'
  text: 'Auto Assign'
- link: '/error_tracking/suspected_causes/'
  tag: 'Documentation'
  text: 'Suspected Causes'
---

## Overview

Issue Team Ownership automates your triaging work by assigning issues to the right teams. There are three independent ways to infer team ownership:

- [CODEOWNERS](#codeowners): based on the top-level stack frame of the issue according to GitHub `CODEOWNERS`.
- [Team attribute](#team-attribute): based on the `team` attribute set on the error event at runtime.
- [Service ownership](#service-ownership): based on the owner of the service where the issue happens.

When multiple methods apply to the same issue, ownership is resolved in the following priority order: `team` attribute, `CODEOWNERS`, then service ownership.

## CODEOWNERS file

Your team owns an issue if it is the code owner of the top-level stack frame of the issue according to your GitHub `CODEOWNERS` file.

**Note**: Stack frames of third-party files are not taken into account. Only the top-most stack frame related to a file present in your repository is considered.

**Note**: After a team is assigned to an issue through CODEOWNERS, the assignment is immutable.

**Note**: Issue Team Ownership only supports GitHub.

### Setup

1. Ensure [Source Code Integration][1] is set up.
2. Install [the GitHub integration][2].
3. Make sure all requested permissions (Contents, Members) are granted for the GitHub integration.
4. Create a valid `CODEOWNERS` file in your repository following [GitHub's CODEOWNERS standards][3].
5. In Datadog, go to [**Teams**](https://app.datadoghq.com/teams) > Select your team > **Settings** > **GitHub Connection** to map your Datadog teams to the corresponding GitHub teams defined in your `CODEOWNERS` file.

{{< img src="error_tracking/team-github-connection.jpg" alt="Linking GitHub teams to Datadog teams" style="width:80%;" >}}

## Service ownership

Your team owns an issue if it owns the service where the issue happens. Service ownership is inferred from your existing service ownership configuration in Datadog — no additional setup is required.

**Note**: Teams assigned through service ownership cannot be removed from an issue and are dynamically updated based on the current service ownership.

## Team attribute

You can programmatically assign team ownership at the time an error is raised by setting the `team` attribute to a Datadog team handle.

**Note**: After a team is assigned to an issue through the `team` attribute, the assignment is immutable.

### APM

Set the `team` attribute on the span:

```python
span.set_tag("team", "payments-backend")
```

### Logs

Set the `team` attribute on the log. See the [Log Collection documentation][4] for details on adding attributes to your logs.

### RUM

Set the `team` attribute on the RUM event:

```javascript
datadogRum.addError(error, { team: 'payments-frontend' });
```

## Use team ownership

Team ownership information appears on the issue details panel when available:

{{< img src="error_tracking/ownership-details.png" alt="Team ownership information on issue details" style="width:80%;" >}}

You can also use issue team ownership to filter issues by teams in the Error Tracking Explorer.

{{< img src="error_tracking/ownership-search-bar.png" alt="Team owner filtering in the search bar" style="width:80%;" >}}

### Manage team ownership for issues

In addition to automatic team ownership, you can manually add or remove teams from issues.

#### Add a team

To add a team to an issue:

1. Open the issue details panel.
2. Click **Add team**.
3. Select the team to add.

#### Remove a team

To remove a team from an issue:

1. Open the issue details panel.
2. Click the team to remove.
3. Click **Unlink team from issue**.

## Configuration

Issue Team Ownership is enabled by default for all services once the setup requirements are met. You can control this feature at both global and service levels through the [Error Tracking settings page](https://app.datadoghq.com/error-tracking/settings/issues/ownership).

{{< img src="error_tracking/ownership-config.png" alt="Issue Team Ownership configuration settings" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/source-code-integration
[2]: /integrations/github/
[3]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[4]: /logs/log_collection/
