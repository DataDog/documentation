---
title: Pull Request Comments
description: Learn how to set up pull request comments for repositories scanned by Code Security.
aliases:
- /static_analysis/github_pull_requests
- /code_analysis/github_pull_requests/
- /security/code_security/dev_tool_int/github_pull_requests/
---

## Overview
Code Security posts comments directly on pull requests (PRs) in your source code management (SCM) system when vulnerabilities are detected on enabled repositories. This help you see and fix issues in context before merging code. The comments are diff-aware, meaning they only flag new issues introduced on lines modified in the PR.

There are two types of PR comments:
- **Inline comment**: Flags an individual Code Security finding on specific lines of code and suggests a remediation (if available).
        
    {{< img src="/code_security/github_inline_pr_comment_light.png" alt="A Datadog bot has posted an inline comment on a GitHub pull request flagging a \"Critical: Code Vulnerability\". The comment suggests replacing the code os.system(command) with os.system(shlex.quote(command)) to sanitize the process call." style="width:100%;" >}}
- **Summary comment**: Combines all findings from Datadog into a single comment. 
  
    {{< img src="/code_security/github_summary_comment_injections_light.png" alt="A Datadog bot has posted a summary comment on a GitHub pull request. The comment has a \"Warnings\" section that lists four critical code vulnerabilities, such as SQL and command injections, with links to the specific files and lines of code." style="width:100%;" >}}

You can configure PR comments at the organization or repository level in [Repository Settings][7], with the following controls:
- Enabling/disabling PR comments by scan type (SAST, static SCA, Secrets, IaC)
- Setting severity thresholds for each scan type
- Excluding findings from test files or dev/test dependencies

Learn more about PR comments across Datadog [here][11].

**Note**: PR comments are not PR checks. To set up checks, see [PR Gates][10].

## Prerequisites
- You must have the Datadog source code integration for your provider enabled. PR comments are supported for [GitHub][2], [GitLab][8], and [Azure DevOps][9] repositories.  
- Your repositories must have the relevant Code Security product(s) enabled. To enable Code Security in-app, navigate to the [**Code Security** Settings page][4].

<div class="alert alert-info">
  PR comments are not supported in pull requests in public repositories, or on pull requests targeting a destination branch in a different repository from the source branch (that is, forked repositories trying to merge into the main repository).
</div>

## Set up pull request comments
Follow the steps below based on your source code management provider.

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-info">If you are using Datadog-hosted scanning, enable the toggle for your desired scan type (for example, Static Code Analysis (SAST)) after completing the GitHub setup steps.
If you are using <a href="/security/code_security/static_analysis/github_actions/">GitHub Actions</a> to run your scans, trigger the action on <code>push</code> for comments to appear once the GitHub setup is complete.</div>

### Connect your GitHub account(s) to Datadog
For setup instructions, read the [Datadog GitHub source code integration][2] documentation.

### Create or update a GitHub App
If you already have a GitHub App connected to Datadog, update it. Otherwise, create a new GitHub App.

<div class="alert alert-info">The permissions you grant to the GitHub App determine which <a href="/integrations/github/">GitHub integration</a> features are available for setup.</div>

#### Create and install a GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications > Add New GitHub Application**][3].
2. Fill out any required details, such as the GitHub organization name.
3. Under **Select Features**, check the **Code Security: Pull Request Review Comments** box.
4. Under **Edit Permissions**, verify that the **Pull Requests** permission is set to **Read & Write**.
5. Click **Create App in GitHub**.
6. Enter a name for your app, and submit it.
7. Click **Install GitHub App**.
8. Choose which repositories the app should be installed into, then click **Install & Authorize**.

    {{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App installation screen" style="width:50%;" >}}

#### Update an existing GitHub App

1. In Datadog, navigate to [**Integrations > GitHub Applications**][5], and search for the GitHub App you want to use for Code Security.
   {{< img src="ci/static-analysis-existing-github-app.png" alt="Example of a Static Code Analysis comment on a pull request" style="width:90%;" >}}
2. On the **Features** tab, look at the **Code Security: Pull Request Comments** section to determine whether your GitHub App needs additional permissions. If so, click **Update permissions in GitHub** to edit the app settings.
3. Under **Repository permissions**, set the **Pull Requests** access to **Read and write**.
   {{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="The dropdown for the pull request read and write permission" style="width:90%;" >}}
4. Under the **Subscribe to events** heading, check the **Pull request** box.
   {{< img src="ci/static-analysis-pr-review-comment.png" alt="The checkbox for the pull request review comment permission" style="width:90%;" >}}


[2]: /integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[5]: https://app.datadoghq.com/integrations/github/configuration

{{% /tab %}}
{{% tab "GitLab" %}}

See the [GitLab Source Code][8] setup instructions to connect GitLab repositories to Datadog.

[8]: /integrations/gitlab-source-code/

{{% /tab %}}
{{% tab " DevOps" %}}

See the [Azure source code setup instructions][9] to connect Azure DevOps repositories to Datadog.

[8]: /integrations/azure-devops-source-code/#source-code-functionality

{{% /tab %}}
{{< /tabs >}}

## Configuration options

Before enabling PR comments, ensure that **at least one Code Security scan capability is enabled in the repository.** Even if PR comments are configured at the organization level, they are only added in repositories where a supported scan type (for example, SAST, SCA, or IaC) is active. Repositories without any enabled scan types will not receive PR comments.

PR comments can be configured at the organization level or at the repository level:
- **Organization level:** Settings apply to all repositories in the organization that have at least one scan capability enabled.
- **Repository level:** Settings override the organization defaults for the selected repository.

When configuring PR comments, you can:
- Enable or disable comments for specific scan types (SAST, SCA, IaC).
- Set minimum severity thresholds to control when comments appear.
- Exclude comments for findings in test files or dev/test dependencies to avoid noise from low-priority issues.

## Configure PR comments at the organization level

1. In Datadog, navigate to [**Security** > **Code Security** > **Settings**][7].
1. In **Repository Settings**, click **Global PR Comment Configuration**.
1. Configure the settings:
    - **Enable PR comments for all scan types and severities**: Enable this to apply PR comments across all types and severities.
    - **Enable for Static Analysis (SAST)**: Toggle this option to enable PR comments for SAST. If enabled, specify a minimum severity threshold. Additionally, select **Exclude PR comments if violations are detected in test files** to prevent comments on issues found in test files.
    - **Enable for Software Composition Analysis (SCA)**: Toggle this option to enable PR comments for SCA. If enabled, specify a minimum severity threshold. Additionally, select **Exclude PR comments if violations are detected in test or dev dependencies** to prevent comments on issues found in dependencies existing only in development or test environments.
    - **Enable for Infrastructure-as-Code (IaC)**: Toggle this option to enable PR comments for IaC. If enabled, specify a minimum severity threshold.
1. Click **Save**.

## Configure PR comments at the repository level

1. In Datadog, navigate to [**Security** > **Code Security** > **Settings**][7].
1. In **Repository Settings**, select a repository from the list.
1. Configure the settings:
    - **Enable PR comments for all scan types and severities**: Enable this to apply PR comments across all types and severities.
    - **Enable for Static Analysis (SAST)**: Toggle this option to enable PR comments for SAST. If enabled, specify a minimum severity threshold. Additionally, select **Exclude PR comments if violations are detected in test files** to prevent comments on issues found in test files.
    - **Enable for Software Composition Analysis (SCA)**: Toggle this option to enable PR comments for SCA. If enabled, specify a minimum severity threshold. Additionally, select **Exclude PR comments if violations are detected in test or dev dependencies** to prevent comments on issues found in dependencies existing only in development or test environments.
    - **Enable for Infrastructure-as-Code (IaC)**: Toggle this option to enable PR comments for IaC. If enabled, specify a minimum severity threshold.
    - **Block all comments in this repository**: Enable this to disable all comments for this repository, overriding global settings.
1. Click **Save Configuration**.

[1]: /security/code_security/
[2]: /integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /security/code_security/static_analysis/github_actions/
[7]: https://app.datadoghq.com/security/configuration/code-security/settings
[8]: /integrations/gitlab-source-code/
[9]: https://docs.datadoghq.com/integrations/azure-devops-source-code/#source-code-functionality
[10]: /quality_gates/?tab=staticanalysis#setup
[11]: /integrations/guide/source-code-integration/?tab=codesecurity#pr-comments

