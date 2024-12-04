---
title: GitHub Pull Requests
description: Learn how to use Code Analysis in GitHub pull requests.
aliases:
- /static_analysis/github_pull_requests
further_reading:
- link: "/integrations/github/"
  tag: "Documentation"
  text: "Learn about the GitHub integration"
- link: "/code_analysis/"
  tag: "Documentation"
  text: "Learn about Code Analysis"
---

## Overview

Code Analysis integrates with GitHub pull requests in two ways:
- [Pull request comments to flag violations](#enable-code-analysis-pr-comments-for-your-repositories): During code reviews on GitHub, Datadog can automatically check for Static Analysis violations in pull requests for repositories that have at least one ruleset applied. Violations are flagged with an inline review comment on the relevant line(s) of code, along with suggested fixes (when applicable) that can be applied directly in the pull request. This is only available for Static Analysis (SAST).
{{< img src="ci/static-analysis-pr-comment-example.png" alt="Example of a Code Analysis comment on a pull request" style="width:90%;" >}}

- [Open a pull request to fix an issue directly from Datadog](#fixing-a-vulnerability-directly-from-datadog): You can create a pull request from the UI to fix a security vulnerability or code quality issue based on Datadog's suggested code fix. This is only available for Static Analysis (SAST).
{{< img src="ci/sast_one_click_light.png" alt="Example of one-click remediation for Code Analysis" style="width:90%;" >}}

To enable these features, ensure you have the required GitHub permissions (Read & Write) for your repository.

## Set up Code Analysis for GitHub pull requests

### Enable Datadog Code Analysis

To use Datadog Code Analysis, add the appropriate configuration files to your repository, as described in the [setup instructions][1].

### Configure a GitHub App

To use Code Analysis on GitHub, you can do one of the following:

- Create a GitHub App in Datadog.
- Update an existing GitHub App, if you have already created one in Datadog.

The permissions you grant to the GitHub App determine which [GitHub integration][2] features are available for setup.

#### Create and install a GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications > Add New GitHub Application**][3].
1. Fill out any required details, such as the GitHub organization name.
1. Under **Select Features**, check the **Code Analysis: Pull Request Review Comments** box.
1. Under **Edit Permissions**, verify that the **Pull Requests** permission is set to **Read & Write**.
1. Click **Create App in GitHub**.
1. Enter a name for your app, and submit it.
1. Click **Install GitHub App**.
1. Choose which repositories the app should be installed into, then click **Install & Authorize**.

{{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App installation screen" style="width:50%;" >}}

#### Update an existing GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications**][5], and search for the GitHub App you want to use for Code Analysis.
{{< img src="ci/static-analysis-existing-github-app.png" alt="Example of a Static Analysis comment on a pull request" style="width:90%;" >}}
1. On the **Features** tab, look at the **Code Analysis: Pull Request Comments** section to determine whether your GitHub App needs additional permissions. If so, click **Update permissions in GitHub** to edit the app settings.
1. Under **Repository permissions**, set the **Pull Requests** access to **Read and write**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="The dropdown for the pull request read and write permission" style="width:90%;" >}}
1. Under the **Subscribe to events** heading, check the **Pull request** box.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="The checkbox for the pull request review comment permission" style="width:90%;" >}}

### Enable Code Analysis PR comments for your repositories

1. In Datadog, navigate to [**CI Settings** > **Code Analysis Settings**][4].
1. Click the toggle switch next to a given repository to enable **GitHub Comments**. In the example below, comments are enabled for the `demo-static-analysis-gates` repository.

{{< img src="ci/static-analysis-github-comments.png" alt="Example of a Code Analysis comment on a pull request" style="width:100%;" >}}

**Note:** If you are using [GitHub Actions][6] to run your scans, trigger the action on `push` in order for comments to appear.

### Fixing a vulnerability directly from Datadog 

If your GitHub app's **Pull Requests** permission is set to **Read & Write**, one-click remediation is enabled for all Static Analysis findings with an available suggested fix.

Follow these steps to fix a vulnerability and open a pull request:
1. View a specific result in Code Analysis.
2. Click **Fix Violation** in the side panel of the result. 
3. Select **Open a Pull Request**.
4. Enter a pull request title and commit message.
5. Click **Create PR**.

You can also fix a vulnerability by committing directly to the branch the result was found on. 

To commit a suggested fix:

1. View a specific result in Code Analysis.
2. Click **Fix Violation** in the side panel of the result.
3. Click **Commit to current branch**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_analysis#setup
[2]: /integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/ci/settings/static-analysis
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /code_analysis/static_analysis/github_actions/
