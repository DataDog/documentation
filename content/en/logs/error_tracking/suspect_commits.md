---
title: Suspect Commits
kind: documentation
disable_toc: false
---
## Overview

For some issues, Error Tracking can identify a suspect commit. This feature is automatically enabled when its [prerequisites](#prerequisites) are met.

{{< img src="logs/error_tracking/suspect_commit.png" alt="A suspect commit as it is displayed in the Datadog UI" style="width:100%" >}}

If a suspect commit has been associated with an issue, it will be displayed on the issue panel, as shown in the highlighted area of the image below.

{{< img src="logs/error_tracking/suspect_commit_in_context.png" alt="A suspect commit shown in the context of the issue panel" style="width:90%" >}}

To view a suspect commit on GitHub, click the **View Commit** button.

### Suspect commit criteria
A commit becomes a suspect commit if
- it modifies one of the lines in the stack trace
- it was authored before the first error occurrence
- it was authored no more than 90 days before the first error occurrence
- it is the most recent commit that meets the above criteria

## Prerequisites

For a suspect commit to be displayed on an issue,
- the issue must be tracked with the [source code integration][1] at the time of issue creation.
- one or more files in the issue's stack trace must be tracked with [the GitHub integration][2], with read permissions enabled for pull requests and contents.
- at least one candidate commit must have been found.

[1]: /integrations/guide/source-code-integration
[2]: /integrations/github/