---
title: Code Analysis
kind: documentation
description: Learn how to use Datadog Code Analysis to address maintainability issues, bugs, and security vulnerabilities in development to prevent customer impact.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
- link: "/code_analysis/static_analysis"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "/code_analysis/software_composition_analysis"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" >}}
Code Analysis is in public beta.
{{< /callout >}}

## Overview

Code Analysis is composed of the [Static Analysis][1] and [Software Composition Analysis (SCA)][2] products. 

Static Analysis
: Scans your bespoke code for maintainability issues, bugs, performance issues, and security vulnerabilities early in the development lifecycle to catch issues from reaching production and, when possible, provide suggested fixes to help engineering teams address these issues before they impact customers.

Software Composition Analysis 
: Scans the open-source libraries that are imported into your repositories for known vulnerabilities. Coming soon will be the ability to block libraries with certain licenses and suggestions on which version of a library you should update to so that you can resolve the vulnerability.

Once you have configured Code Analysis, you can head to the [Code Analysis page][9] to see a summary of the results from the Static Analysis and SCA scans for each of your configured repositories. The summarized results will always be for the latest commit on the default branch of each repository to ensure you are seeing all the existing problems on each repository that you may want to triage and fix.

Select a repository from the list to search through and manage violations in for that specific repository. By default, the results will be filtered to the latest commit on the default branch of the repository, but you may change the branch or commit at the top of the page if desired. Regardless of the selected branch or commit, all results will be organized into the following views:

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

Identify and address vulnerable open-source libraries detected by SCA in the **Library Vulnerabilities** view.

{{% /tab %}}
{{% tab "Library List" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="A list of libraries on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Manage the full list of libraries detected by SCA that have imported into your codebase in the **Library List** view.

{{% /tab %}}
{{< /tabs >}}

With Static Analysis, you can receive automated feedback on poor coding practices and security vulnerabilities on the code you write directly in an IDE such as [VS Code][3] or [IntelliJ & PyCharm][4], and in your [pull requests on GitHub][5]. 

## Set up Code Analysis on your repository

Click **+ Setup a Repository** on the [Code Analysis page][9] and select the relevant programming languages to add Code Analysis to your project. Datadog provides out-of-the-box rulesets for the following languages:

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br>

For more information about Static Analysis rulesets, see [Static Analysis Rules][6].

## Configure your CI/CD provider

{{< whatsnext desc="Select a CI/CD provider to configure Code Analysis with:">}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}Static Analysis and GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}Static Analysis and CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/setup/?tab=other#configure-your-cicd-provider" >}}Static Analysis and Other CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

</br>

## Set up the GitHub integration 

You must configure a GitHub App using the [GitHub integration tile][7] and set up the [source code integration][8] to see the offending code snippets as part of the Static Analysis results in the Datadog UI.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_analysis/static_analysis
[2]: /code_analysis/software_composition_analysis
[3]: /developers/ide_integrations/vscode/#static-analysis
[4]: /developers/ide_integrations/idea/#static-analysis
[5]: /code_analysis/github_pull_requests/
[6]: /code_analysis/static_analysis/rules
[7]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /integrations/guide/source-code-integration
[9]: https://app.datadoghq.com/ci/code-analysis