---
title: Link Pull Requests to Error Tracking Issues
further_reading:
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Issue States in Error Tracking'
  - link: '/error_tracking/suspect_commits/'
    tag: 'Documentation'
    text: 'Suspect Commits'
  - link: '/integrations/guide/source-code-integration'
    tag: 'Documentation'
    text: 'Source Code Integration'
---

## Overview

Link GitHub pull requests to Error Tracking issues and track the full life cycle of an error, from detection to resolution. This link enables Datadog to automatically resolve the Error Tracking issue when the associated PR is merged.

With linked pull requests, you can:

- **Track issue resolution**: See which pull requests are addressing an Error Tracking issue directly from the issue panel.
- **Automatically resolve issues**: When a linked pull request is merged, Datadog automatically moves the issue to **RESOLVED** status.

## Prerequisites

- Install [the GitHub integration][2] with read permissions for pull requests.
- Enable [Source Code Integration][3] so that Datadog can process GitHub webhooks and link pull requests to Error Tracking issues.
- Verify that you have the [**Error Tracking Issue Write** permission][4]. This is required to link your PRs to Error Tracking issues. 

## Link and manage pull requests
### Link a pull request to an issue

To link a pull request to an Error Tracking issue:

1. Navigate to [Datadog Error Tracking][1].
1. Select the issue you want to link to open its side panel.
1. In the top right corner, click the **Actions** dropdown, then select **Link a Pull Request** to copy the issue URL.
1. Open your GitHub pull request and paste the issue URL into the description.

{{< img src="error_tracking/pull-request-add.png" alt="Link a pull request to an Error Tracking issue" style="height:300px;" >}}

Datadog detects the issue URL and automatically creates the link.

<div class="alert alert-info">Updating a pull request description to add or remove issue URLs automatically updates the link.</div>

### View linked pull requests


To view linked pull requests:
1. Navigate to [Datadog Error Tracking][1].
1. Select the issue you want to link to open its side panel.
1. In the top right corner, click the **Actions** dropdown to see the linked PR under **PULL REQUESTS**.
{{< img src="error_tracking/pull-request-find.png" alt="View pull requests linked to an Error Tracking issue" style="height:300px;" >}}

### Unlink a pull request

To unlink a pull request from an issue, open the GitHub pull request and remove the Error Tracking issue URL from the description.

## Automatic state changes

Linked pull requests trigger automatic issue state transitions: 

| Initial state | Action | Resulting state |
|---|---|---|
| Issue is `For Review` | A PR is linked to the issue | Issue moves to `Reviewed` |
| Issue is `Reviewed` | A linked PR is merged | Issue moves to `Resolved` |
| Issue is `Resolved` | A linked PR is reopened | Issue moves to `Reviewed` |
| Issue is `Resolved` | A new open PR is linked to the issue | Issue moves to `Reviewed` |

If an issue is linked to multiple pull requests, the issue moves to `Resolved` only when the last open (non-closed, non-merged) PR is merged. Closing a PR without merging does not resolve the issue.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking
[2]: /integrations/github/
[3]: /integrations/guide/source-code-integration
