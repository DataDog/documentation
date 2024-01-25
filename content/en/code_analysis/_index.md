---
title: Code Analysis
kind: documentation
description: Learn how to use Datadog Code Analysis to address maintainability issues, bugs, and security vulnerabilities in development and at runtime to prevent customer impact.
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

Code Analysis is composed of [Static Analysis][1] and [Software Composition Analysis (SCA)][2] products. 

Static Analysis
: Scans codebases for bugs in code quality, maintainability issues, and security vulnerabilities early in the development lifecycle to catch issues from reaching production and, when possible, provide suggested fixes to help engineering teams address these issues before they impact customers.

Software Composition Analysis 
: Identifies and address vulnerable open source libraries that are imported from a repository, or identify and remove prohibited libraries and, when possible, provide suggested fixes to help engineering teams address these vulnerabilities. 

Once you have configured Code Analysis for your repositories, you can see information about Static Analysis and Software Composition Analysis results, including the default branch of your repository in Datadog. 

Select a repository from the list on the [Code Analysis page][9] to search and manage violations in your services with the following views:

{{< tabs >}}
{{% tab "Code Vulnerabilities" %}}

{{< img src="code_analysis/shopist_code_vulnerabilities.png" alt="Code vulnerabilities on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Identify and address vulnerable code security risks in the **Code Vulnerabilities** view.

{{% /tab %}}
{{% tab "Code Quality" %}}

{{< img src="code_analysis/shopist_code_quality.png" alt="Code quality vulnerabilities on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Identify and address poor code quality practices in the **Code Quality** view.

{{% /tab %}}
{{% tab "Library Vulnerabilities" %}}

{{< img src="code_analysis/shopist_lib_vulnerabilities.png" alt="Library vulnerabilities on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Identify and address vulnerable security risks in libraries that you have imported into your codebase in the **Library Vulnerabilities** view.

{{% /tab %}}
{{% tab "Library List" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="A list of libraries on the Code Analysis page for the Datadog Shopist service and repository" style="width:100%;">}}

Identify and remove prohibited libraries that you have imported into your codebase in the **Library List** view.

{{% /tab %}}
{{< /tabs >}}

You can receive automated feedback on poor code quality practices and security vulnerabilities on the code you write directly in an IDE such as [VS Code][3] or [IntelliJ & PyCharm][4], and in your [pull requests on GitHub][5]. 

## Set up Code Analysis on your repository

Click **+ Setup a Repository** on the [Code Analysis page][8] and select a programming language to add Code Analysis to your project:

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br>

For more information about Static Analysis rulesets, see [Static Analysis Rules][6].

## Configure your CI/CD provider

Select a CI/CD provider to configure Code Analysis with:

{{< partial name="code_analysis/ci-provider-getting-started.html" >}}

</br>

## Set up the GitHub integration 

Configure a GitHub App using the [GitHub integration tile][7] and set up the [source code integration][8] to see the source code in Static Analysis results.

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