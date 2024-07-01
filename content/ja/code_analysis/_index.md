---
title: Code Analysis
description: Learn how to use Datadog Code Analysis to address maintainability issues, bugs, and security vulnerabilities in development to prevent customer impact.
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: Release Notes
  text: Check out the latest Software Delivery releases! (App login required)
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: Blog
  text: Monitor all your CI pipelines with Datadog
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: Learn about the Source Code Integration
- link: /code_analysis/static_analysis
  tag: Documentation
  text: Learn about Static Analysis
- link: /security/application_security/software_composition_analysis
  tag: Documentation
  text: Learn about Software Composition Analysis
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="Try the Beta!" >}}
Code Analysis is in public beta.
{{< /callout >}}

## Overview

Code Analysis displays results for violations found by [Static Analysis][1] and [Software Composition Analysis (SCA)][2] scans in your repositories. 

Static Analysis
: Scans your bespoke code for maintainability issues, bugs, performance issues, and security vulnerabilities early in the development lifecycle to catch issues from reaching production and, when possible, provide suggested fixes to help engineering teams address these issues before they impact users.

Software Composition Analysis 
: Scans the open source libraries that are imported into your repositories for known vulnerabilities. 

<div class="alert alert-info">Datadog Software Composition Analysis can find vulnerable libraries across the software development lifecycle (SDLC). Code Analysis summarizes results found by directly scanning your repositories. To view all vulnerabilities found in repositories and at runtime consolidated together, see <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a> for more details.</div>

After you have configured Code Analysis, you can see a summary of the results from the Static Analysis and SCA scans for each of your configured repositories on the [**Code Analysis** page][9]. The summarized results are always for the latest scanned commit on the default branch of each repository, which ensures that you are seeing all the existing problems on each repository that you may want to triage and fix.

{{< img src="code_analysis/repositories.png" alt="A list of repositories with code and library scan results on the Code Analysis page" style="width:100%;">}}

Select a repository from the list to search through and manage violations for that specific repository. By default, the results are filtered to the latest scanned commit on the default branch of the repository, but you may change the branch or commit at the top of the page. 

Regardless of the selected branch or commit, all results are organized into the following views:

{{< tabs >}}
{{% tab "Code Vulnerabilities" %}}

{{< img src="code_analysis/shopist_code_vulnerabilities.png" alt="Code vulnerabilities on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Identify and address code security risks detected by Static Analysis in the **Code Vulnerabilities** view.

{{% /tab %}}
{{% tab "Code Quality" %}}

{{< img src="code_analysis/shopist_code_quality.png" alt="Code quality vulnerabilities on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Identify and address poor coding practices detected by Static Analysis in the **Code Quality** view.

{{% /tab %}}
{{% tab "Library Vulnerabilities" %}}

{{< img src="code_analysis/shopist_lib_vulnerabilities.png" alt="Library vulnerabilities on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Identify and address vulnerable open source libraries detected by SCA in the **Library Vulnerabilities** view.

{{% /tab %}}
{{% tab "Library List" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="A list of libraries on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Manage the full list of libraries detected by SCA that have imported into your codebase in the **Library List** view.

{{% /tab %}}
{{< /tabs >}}

## Integrations

With Static Analysis, you can receive automated feedback on poor coding practices and security vulnerabilities on the code you write [directly in an IDE][11] such as [VS Code][3] or [IntelliJ & PyCharm][4], and in your [pull requests on GitHub][5]. 

{{< img src="developers/ide_plugins/vscode/static-analysis-issue.png" alt="A Static Analysis result in Visual Studio Code" style="width:100%;">}}

## Set up Code Analysis on your repository

Click **+ Add a Repository** on the [**Code Analysis Repositories** page][9] and choose to run the scans directly in Datadog or in your CI pipelines.

{{< tabs >}}
{{% tab "Datadog" %}}

<div class="alert alert-warning">Datadog-hosted scans are supported by Software Composition Analysis (SCA) and GitHub repositories only. To enable Static Analysis or use a different CI provider, run scans in your CI pipelines instead.</div>

To enable [Software Composition Analysis][101] on GitHub repositories, click **Select Repositories** on your desired GitHub account and click the toggle for `Enable Software Composition Analysis (SCA)` to enable for all repositories. If you don't see any GitHub accounts listed, [create a new GitHub App][102] to get started.

{{< img src="code_analysis/setup/enable_account.png" alt="Enable Software Composition Analysis on all repositories for your GitHub account" style="width:100%;">}}

Optionally, you can select specific GitHub repositories to enable SCA by clicking the toggle for each repository.

{{< img src="code_analysis/setup/enable_repository.png" alt="Enable Software Composition Analysis on a GitHub repository" style="width:100%;">}}

[101]: /code_analysis/software_composition_analysis
[102]: /integrations/github/

{{% /tab %}}
{{% tab "CI Pipelines" %}}

If you do not want to run your scans directly through Datadog, you can select which scans you'd like to run ([Static Analysis][106] and [Software Composition Analysis][107]) and configure your CI pipeline provider accordingly.

## Configure your CI/CD provider

See the following documentation to configure your CI/CD provider to run Static Analysis and SCA scans:

- [Static Analysis and GitHub Actions][101]
- [Static Analysis and CircleCI Orbs][102]
- [Static Analysis and Generic CI Providers][103]
- [Software Composition Analysis and GitHub Actions][104]
- [Software Composition Analysis and Generic CI Providers][105]

[101]: /code_analysis/static_analysis/github_actions 
[102]: /code_analysis/static_analysis/circleci_orbs 
[103]: /code_analysis/static_analysis/generic_ci_providers 
[104]: /code_analysis/software_composition_analysis/github_actions 
[105]: /code_analysis/software_composition_analysis/generic_ci_providers 
[106]: /code_analysis/static_analysis
[107]: /code_analysis/software_composition_analysis

{{% /tab %}}
{{< /tabs >}}

## Set up the GitHub integration 

You can configure a GitHub App by using the [GitHub integration tile][7] and setting up the [source code integration][8] to see the offending code snippets as part of the Static Analysis results in Datadog.

{{< img src="code_analysis/source_code_integration.png" alt="Link to GitHub from the Code Analysis view" style="width:100%;">}}

For more information, see the [Source Code Integration documentation][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_analysis/static_analysis
[2]: /code_analysis/software_composition_analysis
[3]: /developers/ide_integrations/vscode/#static-analysis
[4]: /developers/ide_integrations/idea/#static-analysis
[5]: /code_analysis/github_pull_requests/
[6]: /code_analysis/static_analysis_rules
[7]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /integrations/guide/source-code-integration
[9]: https://app.datadoghq.com/ci/code-analysis
[10]: /integrations/guide/source-code-integration/?tab=codeanalysis
[11]: /code_analysis/ide_plugins/