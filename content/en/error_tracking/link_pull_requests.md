---
title: Link Pull Requests
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

Link GitHub pull requests to Error Tracking issues to track the full lifecycle of an error, from detection to resolution. After you paste an Error Tracking issue URL in a pull request description, Datadog automatically links the PR to the issue and resolves the issue when the PR is merged.

With linked pull requests, you can:

- **Track issue resolution**: See which pull requests are addressing an Error Tracking issue directly from the issue panel.
- **Automatically resolve issues**: When a linked pull request is merged, Datadog automatically moves the issue to **RESOLVED** status.

## Link a pull request to an issue

To link a pull request to an Error Tracking issue:

1. In [Error Tracking][1], open the issue you want to link.
1. Copy the issue URL from your browser's address bar.
1. Paste the issue URL into the description of your GitHub pull request.

Datadog detects the issue URL and automatically creates the link.

**Note**: Updating a pull request description to add or remove issue URLs automatically updates the links.

## View linked pull requests

Linked pull requests appear in the Error Tracking issue panel.

To view linked pull requests:

1. In [Error Tracking][1], open an issue.
1. Linked pull requests are displayed in the Actions dropdown of the issue panel.

## Unlink a pull request

To unlink a pull request from an issue, edit the pull request description and remove the Error Tracking issue URL.

## Automatic state changes

Linked pull requests trigger automatic issue state transitions:

| Event | Issue state change |
|---|---|
| A PR is linked to a **FOR REVIEW** issue | Issue moves to **REVIEWED** |
| A linked PR is merged | Issue moves to **RESOLVED** |
| A PR linked to a **RESOLVED** issue is reopened | Issue moves to **REVIEWED** |
| A new open PR is linked to a **RESOLVED** issue | Issue moves to **REVIEWED** |

If an issue is linked to multiple pull requests, the issue moves to **RESOLVED** only when the last open (non-closed, non-merged) PR is merged. Closing a PR without merging does not resolve the issue.

## Setup

### Install the GitHub integration

Install [the GitHub integration][2] with read permissions for pull requests.

### Enable Source Code Integration

Enable [Source Code Integration][3] so that Datadog can process GitHub webhooks and link pull requests to Error Tracking issues.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking
[2]: /integrations/github/
[3]: /integrations/guide/source-code-integration
