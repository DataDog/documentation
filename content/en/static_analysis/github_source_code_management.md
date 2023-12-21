---
title: GitHub Source Code Management
kind: documentation
description: Feature overview and setup instructions for GitHub Source Code Management using Static Analysis.
---

## Feature overview

Static Analysis can automatically flag rule violations in pull requests on GitHub. To configure the GitHub integration to include Static Analysis features, see [the setup instructions](#set-up-static-analysis-on-github).

During code reviews on GitHub, the source code management (SCM) integration checks for Static Analysis violations in pull requests for repos that have at least one ruleset applied. Violations are flagged with a comment on the relevant line of code.

The comment includes the name, ID, severity, and description of the violation. Certain violations also include suggested changes that can be applied directly in the GitHub UI.

{{< img src="ci/static-analysis-pr-comment-example.png" alt="Example of a Static Analysis comment on a pull request" style="width:90%;" >}}

## Set up Static Analysis for GitHub source code

### Prerequisites

The [GitHub integration][2] must be installed.

### Enable Static Analysis on Datadog

To use Datadog Static Analysis, add the appropriate configuration file to your repository, as described in the [Static Analysis setup instructions][1].

### Configure a GitHub App

To use Static Analysis on GitHub, you can update an existing GitHub App or create a new one.

#### Create and install a new GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications > Add New GitHub Application**][3].
1. Fill out any required details, such as the GitHub organization name.
1. Under **Select Features**, check the **Static Analysis: Pull Request Review Comments** box.
1. Under **Edit Permissions**, verify that the **Pull Requests** permission is set to **Read & Write**.
1. Click **Create App in GitHub**.
1. Click **Install GitHub App**.
1. TODO: Authorize for repositories.

#### Update an existing GitHub App

1. From the [**Integrations > GitHub Applications**][5] page, navigate to the GitHub App you want to use for Static Analysis.
{{< img src="static-analysis-existing-github-app.png" alt="Example of a Static Analysis comment on a pull request" style="width:90%;" >}}
1. On the **Features** tab, check the **CI Visibility: Collect pull request information** section to determine whether your GitHub App needs additional permissions. If so, click **Update permissions in GitHub**.
1. Set the **Pull Requests** access to **Read and write**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="The dropdown for the pull request read and write permission" style="width:90%;" >}}
1. Under the **Subscribe to events** heading, check the **Pull request review comment** box.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="The checkbox for the pull request review comment permission" style="width:90%;" >}}

### Enable CI visibility for your repositories

1. In Datadog, navigate to [CI Settings > Static Analysis][4].
1. Click the toggle switch next to a given repository to enable **GitHub Comments**. In the example below, comments are enabled for the `demo-static-analysis-gates` repository.

{{< img src="ci/static-analysis-github-comments.png" alt="Example of a Static Analysis comment on a pull request" style="width:100%;" >}}

[1]: /static_analysis#setup
[2]: /integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/ci/settings/static-analysis
[5]: https://app.datadoghq.com/integrations/github/configuration