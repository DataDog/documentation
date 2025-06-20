---
title: Auto Assign
description: Learn about Auto Assign in Error Tracking.
further_reading:
  - link: '/error_tracking/suspect_commits/'
    tag: 'Documentation'
    text: 'Suspect Commits'
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Issue States in Error Tracking'
---

## Overview

Auto Assign helps teams quickly resolve issues by automatically assigning them to the most likely responsible developers. This feature analyzes git commit history to identify suspect commits that may have introduced the issue, then assigns the issue directly to the developer who made those commits.

Auto Assign uses [suspect commits][1] to identify developers who may have introduced issues. When an issue is automatically assigned to a developer, they receive an immediate notification.

## Setup

Once configured and enabled, issues are automatically assigned to developers based on suspect commit analysis.

### Configure Source Code Integration

- Ensure [Source Code Integration][2] is enabled and setup.
- Install [the GitHub integration][3]. Make sure all requested permission is granted for the GitHub integration.

### Ensure email consistency
Developers must use the same email address in both Git and their Datadog account. This email matching is essential for Auto Assign to correctly identify and assign issues to the right users.

## How it works

When an error occurs, Auto Assign:

1. Analyzes the stack trace to identify suspect commits
2. Determines the developer responsible for the most recent suspect commit
3. Automatically assigns the issue to that developer
4. Sends a notification to the assigned developer

## Managing assignments

### Configuration
Navigate to the Error Tracking configuration section in Datadog to manage Auto Assign settings. You can enable or disable Auto Assign globally for your entire organization, or configure it on a per-service basis for more granular control.

### Assignment management
You can view assigned developers directly within each issue in Datadog. If needed, manual reassignment is always possible to override the automatic assignment.

## Benefits

- **Faster issue resolution**: Issues are automatically assigned to developers who are most familiar with the relevant code
- **Direct accountability**: Individual developers receive clear ownership of issues related to their recent commits
- **Proactive notifications**: Assigned developers are immediately notified when issues are detected, enabling quick response times
- **Reduced triage time**: Eliminates manual assignment processes by automatically identifying the most likely responsible developer

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking/suspect_commits/
[2]: /integrations/guide/source-code-integration/
[3]: /integrations/github/
[4]: https://app.datadoghq.com/integrations