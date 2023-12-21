---
title: GitHub Source Code Management
kind: documentation
description: Feature overview and setup instructions for GitHub Source Code Management using Static Analysis.
---

## Feature overview

Static Analysis can automatically flag rule violations in pull requests on GitHub. To configure the GitHub integration to include Static Analysis features, see [the setup instructions](#set-up-static-analysis-on-github).

During code reviews on GitHub, the source code management (SCM) integration checks for Static Analysis violations in pull requests for repos that have at least one ruleset applied. Violations are flagged with a comment on the relevant line of code. 

The comment includes the name, ID, severity, and description of the violation. Certain violations also include suggested changes that can be applied directly in the GitHub UI.

## Set up Static Analysis for GitHub source code

### Enable Static Analysis on Datadog

To use Datadog Static Analysis, add the appropriate configuration file to your repository, as described in the [Static Analysis setup instructions][1].

### Configure a GitHub App

Static Analysis on pull requests can be provided through any GitHub App that has the following permissions:

- Read and write pull requests
- Comment on pull requests

To use Static Analysis on GitHub, you can [update the permissions of an existing GitHub App][3] or [create a new one][2].

To enable the correct permissions from the settings page of a GitHub App:

1. Under the **Permissions** heading, click **Repository permissions**.
1. Set the **Pull Requests** access to **Read and write**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="The checkbox for the pull request review comment permission" style="width:90%;" >}}
1. Under the **Subscribe to events** heading, check the **Pull request review comment** box.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="The checkbox for the pull request review comment permission" style="width:90%;" >}}

[1]: /static_analysis#setup
[2]: https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps
[3]: https://docs.github.com/en/apps/maintaining-github-apps/modifying-a-github-app-registration
