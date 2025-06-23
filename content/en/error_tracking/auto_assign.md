---
title: Auto Assign
description: Learn about Auto Assign in Error Tracking.
further_reading:
  - link: '/error_tracking/suspect_commits/'
    tag: 'Documentation'
    text: 'Suspect Commits'
  - link: '/error_tracking/issue_team_ownership/'
    tag: 'Documentation'
    text: 'Issue Team Ownership'
---

## Overview

Auto Assign automates triaging by assigning issues to the author of their [suspect commit][1].

This feature enables faster issue resolution by automatically assigning issues to developers most familiar with the relevant code, while reducing manual triage work. Developers are immediately notified when issues arise from their code.

## Setup

Once configured and enabled, issues are automatically assigned to developers based on suspect commit analysis.

### Configure Source Code Integration

- Ensure [Source Code Integration][2] is enabled and setup.
- Install [the GitHub integration][3]. Make sure all requested permission is granted for the GitHub integration.
- Developers must use the same email address in both Git and their Datadog account.

## How it works

When an error occurs, Auto Assign:

1. Analyzes the stack trace to identify a suspect commit
2. Finds the author of this commit
3. Assigns the issue to that developer and sends a notification.

## Managing assignments

You can view assigned developers directly within each issue in Datadog. If needed, manual reassignment is always possible to override the automatic assignment.

{{< img src="error_tracking/ownership-details.png" alt="Team ownership information on issue details" style="width:80%;" >}}

# Configuration

Navigate to the Error Tracking configuration section in Datadog to manage Auto Assign settings. You can enable or disable Auto Assign globally for your entire organization, or configure it on a per-service basis for more granular control.

{{< img src="error_tracking/ownership-config.png" alt="Issue Team Ownership configuration settings" style="width:80%;" >}}
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking/suspect_commits/
[2]: /integrations/guide/source-code-integration/
[3]: /integrations/github/
[4]: https://app.datadoghq.com/integrations