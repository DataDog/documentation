---
title: Static Analysis (SAST)
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
aliases:
- /continuous_integration/static_analysis
- /static_analysis
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
algolia:
  tags: ['static analysis', 'datadog static analysis', 'code quality', 'SAST']
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

Static Analysis (SAST) is a clear-box software testing technique that analyzes a program's pre-production code without the need to execute the program, meaning that the program is static because it isn't running. 

Static Analysis helps you identify maintainability issues and security vulnerabilities early in the software development life cycle (SDLC) to ensure only the highest quality, most secure code makes it to production. Static Analysis tools that scan for security vulnerabilities are also commonly referred to as Static Application Security Testing (SAST) tools.

Using Static Analysis provides organizations with the following benefits:

* Static Analysis takes the guesswork out of adhering to an organization's code standards, enabling your development team to ship compliant code without significant impacts to developer velocity.
* An organization's applications are less vulnerable to security breaches over time, due to new vulnerabilities being caught through SAST scans before code reaches production.
* New developers to an organization are able to onboard faster because Static Analysis enables an organization to maintain a more readable codebase over time.
* An organization's software becomes reliable over time by virtue of the code being more maintainable because the risk of a developer introducing new defects to the code is minimized.

## Set up Static Analysis

Static Analysis supports scanning for poor coding practices and security vulnerabilities in the following languages and technologies:

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br> 

To get started, you can set up Static Analysis on the [**Code Analysis** page][1] or see the [Setup documentation][9].

## Integrate Static Analysis into your software development lifecycle

### CI providers
{{< whatsnext desc="You can run Static Analysis on any CI platform provider of your choice. See provider-specific documentation to set up Static Analysis in your CI pipelines:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}Other CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

### Source code management
{{< whatsnext desc="During code reviews on GitHub, Datadog can automatically flag Static Analysis violations in pull requests by adding inline review comments on the relevant line(s) of code. When applicable, Datadog also provides suggested fixes that can be applied directly in the pull request. You can also open a pull request directly from Datadog to fix a vulnerability or quality issue." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}GitHub Pull Requests{{< /nextlink >}}
{{< /whatsnext >}}

### IDEs
{{< whatsnext desc="You can identify code vulnerabilities in real time as you edit a file in your Integrated Development Environment (IDE). See integration-specific documentation for more information:">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Datadog Plugin for JetBrains IDEs{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Datadog Extension for Visual Studio Code{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Datadog Extension for Visual Studio{{< /nextlink >}}
{{< /whatsnext >}}

## Search and filter results

After you configure your CI pipelines to run the Datadog Static Analyzer, violations are summarized per repository on the [**Code Analysis Repositories** page][1]. Click on a repository to analyze **Code Vulnerabilities** and **Code Quality** results from Static Analysis. 

* The **Code Vulnerabilities** tab contains the violations found by Datadog's rules in the [Security category][2].
* The **Code Quality** tab contains the violations found by Datadog's rules in the [Best Practices, Code Style, Error Prone, or Performance categories][3].

To filter your results, use the facets to the left of the list, or search. Results can be filtered by service or team facets. For more information about how results are linked to Datadog services and teams, see [Getting Started with Code Analysis][11].

Every row represents a violation. Each violation is associated with the specific commit and branch that is selected in the filters at the top of the page (by default, results are shown for the latest commit on the default branch of the repository you are viewing).

Click on a violation to open a side panel that contains information about the scope of the violation and where it originated.
{{< img src="code_analysis/static_analysis/static-analysis-violation.png" alt="Side panel for a static analysis violation" style="width:80%;">}} 

The content of the violation is shown in tabs:

- **Details**: A description of the violation and the lines of code that caused it. To see the offending code snippet, configure the [Datadog GitHub App][4].
- **Remediation**: One or more code fixes that can resolve the violation, with options for remediation.
- **Event**: JSON metadata regarding the Static Analysis violation event.

### Using suggested fixes
{{< img src="code_analysis/static_analysis/static-analysis-fixes.png" alt="Fixes tab of a static analysis violation" style="width:80%;">}}

In Datadog Static Analysis, there are two types of suggested fixes:

1. **Default Suggested Fix:** For simple violations like linting issues, the rule analyzer automatically provides templated fixes.
2. **AI Suggested Fix:** For complex violations, fixes are typically not available beforehand. Instead, you can use AI Suggested Fixes, which use OpenAI's GPT-4 to generate a suggested fix. You can choose between "Text" and "Unified Diff" fixes, which outputs plain text instructions or a code change for resolving the violation, respectively.

The two types of fixes are distinguished visually in the UI with different labels.

*Default Suggested Fixes:*
{{< img src="code_analysis/static_analysis/static-analysis-default-fix.png" alt="Visual indicator of a default static analysis suggested fix" style="width:60%;">}}

*AI Suggested Fixes:*
{{< img src="code_analysis/static_analysis/static-analysis-ai-fix.png" alt="Visual indicator of an AI static analysis suggested fix" style="width:60%;">}}

<div class="alert alert-warning">AI Suggested Fixes are in private beta. To request access, contact <a href="/help/">Support.</div>

### Fixing a vulnerability or quality issue directly from Datadog
{{< img src="ci/sast_one_click_light.png" alt="Example of one-click remediation for Code Analysis" style="width:90%;" >}}

You can push a code change to fix an issue found by Code Analysis directly from a result in Datadog in two ways.

#### Opening a pull request 
If your GitHub app's **Pull Requests** permission is set to **Read & Write**, one-click remediation is enabled for all Static Analysis findings with an available suggested fix. For more information about setting up the GitHub integration, see [GitHub Pull Requests][10]. 

Follow these steps to fix a vulnerability and open a pull request:
1. View a specific result in Code Analysis.
2. Click **Fix Violation** in the side panel of the result. 
3. Select **Open a Pull Request**.
4. Enter a pull request title and commit message.
5. Click **Create PR**.

#### Committing directly to the current branch
You can also fix a vulnerability by committing directly to the branch the result was found on. 

To commit a suggested fix:

1. View a specific result in Code Analysis.
2. Click **Fix Violation** in the side panel of the result.
3. Click **Commit to current branch**.

### Customizing your configuration

To customize which Static Analysis rules are configured in your repositories, see the [Setup documentation][8].

### Reporting false positives
If you believe a specific violation is a false positive, you can flag it as a false positive with a reason for flagging, which sends a report to Datadog. Submissions are reviewed on a regular basis to improve ruleset quality over time.

{{< img src="code_analysis/static_analysis/flag-false-positive.png" alt="Button for reporting a Static Analysis violation as a false positive" style="width:60%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /code_analysis/static_analysis_rules?categories=Security
[3]: /code_analysis/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /integrations/github/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /code_analysis/static_analysis/setup/#customize-your-configuration
[9]: /code_analysis/static_analysis/setup
[10]: /code_analysis/github_pull_requests/
[11]: /getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
