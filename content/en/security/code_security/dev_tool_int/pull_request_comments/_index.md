---
title: Pull Request Comments
description: Learn how to set up pull request comments for repositories scanned by Code Security.
aliases:
- /static_analysis/github_pull_requests
- /code_analysis/github_pull_requests/
- /code_security/dev_tool_int/github_pull_requests/
---

## Overview
Code Security can post comments directly on pull requests in your source code management (SCM) system when vulnerabilities are detected. This help you see and fix issues in context before merging code. The comments are diff-aware, meaning they only flag new issues introduced on lines modified lines in the pull request.

There are two types of pull request comments:
- **Inline comment**: Flags an individual Code Security finding on specific lines of code and suggests a remediation (if available) . 
    {{< img src="/code_security/github_inline_pr_comment_light.png" alt="A Datadog bot has posted an inline comment on a GitHub pull request flagging a \"Critical: Code Vulnerability\". The comment suggests replacing the code os.system(command) with os.system(shlex.quote(command)) to sanitize the process call." style="width:100%;" >}}
- **Summary comment**: Combines all findings from Datadog into a single comment. 
    {{< img src="/code_security/github_summary_comment_injections_light.png" alt="A Datadog bot has posted a summary comment on a GitHub pull request. The comment has a \"Warnings\" section that lists four critical code vulnerabilities, such as SQL and command injections, with links to the specific files and lines of code." style="width:100%;" >}}

You can configure PR comments at the organization or repository level in [Repository Settings][7], with the following controls:
- Enabling/disabling PR comments by scan type (SAST, static SCA, Secrets, IaC)
- Setting severity thresholds for each scan type
- Excluding findings from test files or dev/test dependencies

**Note**: PR comments are not PR checks. To set up checks, see [Quality Gates][10].

## Prerequisites
- You must have the Datadog source code integration for your provider enabled. PR comments are supported for [GitHub][2], [GitLab][8], and Azure DevOps repositories ([in Preview][9]).  
- Your repositories must have the relevant Code Security product(s) enabled. To enable Code Security in-app, navigate to the [**Code Security** page][4].  

## Set up GitHub pull request comments
If you are using Datadog-hosted scanning, enable the toggle for your desired scan type (e.g. Static Code Analysis).  
If you are using [GitHub Actions][6] to run your scans, trigger the action on `push` in order for comments to appear.  

### Set up the GitHub source code integration
See instructions to enable the Datadog GitHub source code integration [here][2].

#### Configure a GitHub App
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

## Set up GitLab merge request comments
See instructions to enable the Datadog GitLab source code integration [here][8].

## Set up Azure DevOps pull request comments
Azure DevOps for Code Security is currently in preview. Request access [here][9].

## Configure PR comment settings for your repositories
To configure PR comments for all repositories:

1. In Datadog, navigate to [**Security** > **Code Security** > **Settings**][7].
1. In **Repository Settings**, click **Global PR Comment Configuration**.
1. Configure the settings:
    - **Enable PR comments for all scan types and severities**: Enable this to apply PR comments across all types and severities.
    - **Enable for Static Analysis (SAST)**: Toggle this option to enable PR comments for SAST. If enabled, specify a minimum severity threshold. Additionally, select **Exclude PR comments if violations are detected in test files** to prevent comments on issues found in test files.
    - **Enable for Software Composition Analysis (SCA)**: Toggle this option to enable PR comments for SCA. If enabled, specify a minimum severity threshold. Additionally, select **Exclude PR comments if violations are detected in test or dev dependencies** to prevent comments on issues found in dependencies existing only in development or test environments.
    - **Enable for Infrastructure-as-Code (IaC)**: Toggle this option to enable PR comments for IaC. If enabled, specify a minimum severity threshold.
1. Click **Save**.

To configure PR comments for a single repository:

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
[9]: https://www.datadoghq.com/product-preview/azure-devops-integration-code-security/
[10]: https://docs.datadoghq.com/quality_gates/?tab=staticanalysis#setup


