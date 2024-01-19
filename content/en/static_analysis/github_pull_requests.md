---
title: GitHub Pull Requests
kind: documentation
description: Learn how to use Static Analysis in GitHub pull requests.
further_reading:
- link: "/integrations/github/"
  tag: "Documentation"
  text: "Learn about the GitHub integration"
- link: "/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
---

## Overview

Static Analysis can automatically flag rule violations in pull requests on GitHub. To configure the [GitHub integration][2] to include Static Analysis features, see [the setup instructions](#set-up-static-analysis-for-github-pull-requests).

During code reviews on GitHub, the integration checks for Static Analysis violations in pull requests for repos that have at least one ruleset applied. Violations are flagged with a review comment on the relevant line of code.

{{< img src="ci/static-analysis-pr-comment-example.png" alt="Example of a Static Analysis comment on a pull request" style="width:90%;" >}}

The comment includes the name, ID, severity, category, and description of the violation. Certain violations also include suggested changes that can be applied directly in the GitHub UI.

## Set up Static Analysis for GitHub pull requests

### Enable Static Analysis on Datadog

To use Datadog Static Analysis, add the appropriate configuration files to your repository, as described in the [setup instructions][1].

### Configure a GitHub App

To use Static Analysis on GitHub, you can do one of the following:

- Create a GitHub App in Datadog.
- Update an existing GitHub App, if you have already created one in Datadog.

The permissions you grant to the GitHub App determine which [GitHub integration][2] features are available for setup.

#### Create and install a GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications > Add New GitHub Application**][3].
1. Fill out any required details, such as the GitHub organization name.
1. Under **Select Features**, check the **Static Analysis: Pull Request Review Comments** box.
1. Under **Edit Permissions**, verify that the **Pull Requests** permission is set to **Read & Write**.
1. Click **Create App in GitHub**.
1. Enter a name for your app, and submit it.
1. Click **Install GitHub App**.
1. Choose which repositories the app should be installed into, then click **Install & Authorize**.

{{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App installation screen" style="width:50%;" >}}

#### Update an existing GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications**][5], and search for the GitHub App you want to use for Static Analysis.
{{< img src="ci/static-analysis-existing-github-app.png" alt="Example of a Static Analysis comment on a pull request" style="width:90%;" >}}
1. On the **Features** tab, look at the **Static Analysis: Pull Request Comments** section to determine whether your GitHub App needs additional permissions. If so, click **Update permissions in GitHub** to edit the app settings.
1. Under **Repository permissions**, set the **Pull Requests** access to **Read and write**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="The dropdown for the pull request read and write permission" style="width:90%;" >}}
1. Under the **Subscribe to events** heading, check the **Pull request** box.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="The checkbox for the pull request review comment permission" style="width:90%;" >}}

### Enable Static Analysis PR comments for your repositories

1. In Datadog, navigate to [**CI Settings** > **Static Analysis Settings**][4].
1. Click the toggle switch next to a given repository to enable **GitHub Comments**. In the example below, comments are enabled for the `demo-static-analysis-gates` repository.

{{< img src="ci/static-analysis-github-comments.png" alt="Example of a Static Analysis comment on a pull request" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /static_analysis#setup
[2]: /integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/ci/settings/static-analysis
[5]: https://app.datadoghq.com/integrations/github/configuration