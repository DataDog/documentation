---
disable_toc: false
title: Suspect Commits
---
## 概要

Error Tracking can identify suspect commits, helping you pinpoint the root cause of your errors and expedite resolution. This feature is automatically enabled on issues when the [setup requirements](#setup) are met.

{{< img src="logs/error_tracking/suspect_commit.png" alt="A suspect commit as it is displayed in the Datadog UI" style="width:100%" >}}

Once a suspect commit has been identified, it is displayed on the issue panel, as shown in the highlighted area of the image below.

{{< img src="logs/error_tracking/suspect_commit_in_context.png" alt="A suspect commit shown in the context of the issue panel" style="width:90%" >}}

To view a suspect commit on GitHub, click the **View Commit** button.

### Suspect commit criteria
A commit becomes a suspect commit if:
- It modifies one of the lines in the stack trace.
- It was authored before the first error occurrence.
- It was authored no more than 90 days before the first error occurrence.
- It is the most recent commit that meets the above criteria.

For a suspect commit to be displayed on an issue, at least one candidate commit must have been found.

## セットアップ

Once the setup requirements are met, suspect commits automatically appear on issues where available. Commits made before the setup requirements were met are not displayed.

### Enable Source Code Integration

The Suspect Commits feature requires [Source Code Integration][1]. To enable Source Code Integration:

1. On the [**Integrations** page][3] in Datadog, choose **Link Source Code** in the top navbar.
2. 手順に従って、コミットをテレメトリーに関連付け、GitHub リポジトリを構成します。

### Install the GitHub integration
Install [the GitHub integration][2], enabling read permissions for pull requests and contents.

[1]: /ja/integrations/guide/source-code-integration
[2]: /ja/integrations/github/
[3]: https://app.datadoghq.com/integrations