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

Install [the GitHub integration][2] with read permissions for pull requests.

Enable [Source Code Integration][3] so that Datadog can process GitHub webhooks and link pull requests to Error Tracking issues.

You need the following [permission][1] to link your PRs to Error Tracking issues:

- Error Tracking Issue Write

## Link and manage pull requests
### Link a pull request to an issue

To link a pull request to an Error Tracking issue:

1. In [Error Tracking][1], open the issue you want to link.
1. Copy the issue URL from the Actions dropdown of the issue panel.
1. Paste the issue URL into the description of your GitHub pull request.

{{< img src="error_tracking/pull-request-add.png" alt="Link a pull request to an Error Tracking issue" style="height:300px;" >}}

Datadog detects the issue URL and automatically creates the link.

**Note**: Updating a pull request description to add or remove issue URLs automatically updates the links.

## View linked pull requests

Linked pull requests appear in the Error Tracking issue panel.

To view linked pull requests:

1. In [Error Tracking][1], open an issue.
1. Linked pull requests are displayed in the Actions dropdown of the issue panel.

{{< img src="error_tracking/pull-request-find.png" alt="View pull requests linked to an Error Tracking issue" style="height:300px;" >}}

## Unlink a pull request

To unlink a pull request from an issue, edit the pull request description and remove the Error Tracking issue URL.

## Automatic state changes

Linked pull requests trigger automatic issue state transitions. If you link or merge a pull request, the linked Error Tracking issue state is updated accordingly:

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
