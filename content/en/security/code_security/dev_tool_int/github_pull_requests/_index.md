---
title: GitHub Pull Requests
description: Learn how to use Code Security in GitHub pull requests.
aliases:
- /static_analysis/github_pull_requests
- /code_analysis/github_pull_requests/
---

## Overview

Code Security integrates with GitHub pull requests in two ways:
- [Pull request comments to flag violations](#enable-code-security-pr-comments-for-your-repositories)
{{< img src="ci/static-analysis-pr-comment-example.png" alt="Example of a Code Security comment on a pull request" style="width:90%;" >}}
- [Open a pull request to fix an issue directly from Datadog](#fixing-a-vulnerability-directly-from-datadog): You can create a pull request from the UI to fix a security vulnerability or code quality issue based on Datadog's suggested code fix. This is only available for Static Code Analysis (SAST).
{{< img src="ci/sast_one_click_light.png" alt="Example of one-click remediation for Code Security" style="width:90%;" >}}

To enable these features, ensure you have the required GitHub permissions (Read & Write) for your repository.

## Set up Code Security for GitHub pull requests

### Enable Datadog Code Security

To enable Code Security in-app, navigate to the [**Code Security** page][4].

### Configure a GitHub App

To use Code Security on GitHub, you can do one of the following:

- Create a GitHub App in Datadog.
- Update an existing GitHub App, if you have already created one in Datadog.

The permissions you grant to the GitHub App determine which [GitHub integration][2] features are available for setup.

#### Create and install a GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications > Add New GitHub Application**][3].
1. Fill out any required details, such as the GitHub organization name.
1. Under **Select Features**, check the **Code Security: Pull Request Review Comments** box.
1. Under **Edit Permissions**, verify that the **Pull Requests** permission is set to **Read & Write**.
1. Click **Create App in GitHub**.
1. Enter a name for your app, and submit it.
1. Click **Install GitHub App**.
1. Choose which repositories the app should be installed into, then click **Install & Authorize**.

{{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App installation screen" style="width:50%;" >}}

#### Update an existing GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications**][5], and search for the GitHub App you want to use for Code Security.
{{< img src="ci/static-analysis-existing-github-app.png" alt="Example of a Static Code Analysis comment on a pull request" style="width:90%;" >}}
1. On the **Features** tab, look at the **Code Security: Pull Request Comments** section to determine whether your GitHub App needs additional permissions. If so, click **Update permissions in GitHub** to edit the app settings.
1. Under **Repository permissions**, set the **Pull Requests** access to **Read and write**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="The dropdown for the pull request read and write permission" style="width:90%;" >}}
1. Under the **Subscribe to events** heading, check the **Pull request** box.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="The checkbox for the pull request review comment permission" style="width:90%;" >}}

### Enable Code Security PR comments for your repositories

1. In Datadog, navigate to [**Security** > **Code Security** > **Settings**][4].
2. In **Enable scanning for your repositories**, select **Edit** next to a given repository.
3. Toggle **Enable Static Analyis** to on.

**Note:** If you are using [GitHub Actions][6] to run your scans, trigger the action on `push` in order for comments to appear.

### Fixing a vulnerability directly from Datadog 

If your GitHub app's **Pull Requests** permission is set to **Read & Write**, one-click remediation is enabled for all Static Code Analysis findings with an available suggested fix.

Follow these steps to fix a vulnerability and open a pull request:
1. Go to **Code Security > Repositories**.
2. Click a repository.
3. On the repository's page, click the **Code Vulnerabilities** or **Code Quality** tabs.
4. Click on a violation.
5. If a suggested fix is available for that violation, one-click remediation is available in the side panel in the **Remediation** tab.

[1]: /security/code_security/
[2]: /integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /security/code_security/static_analysis/github_actions/
