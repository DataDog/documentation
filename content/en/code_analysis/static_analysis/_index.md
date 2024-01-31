---
title: Static Analysis
kind: documentation
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
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" >}}
Static Analysis is part of the Code Analysis public beta.
{{< /callout >}}

## Overview

Static Analysis is a clear-box software testing technique that analyzes a program's pre-production code without the need to execute the program, meaning that the program is static because it isn't running. Static Analysis helps you identify maintainability issues and security vulnerabilities early in the Software Development Life Cycle (SDLC) to ensure only the highest quality, most secure code makes it to production. Static Analysis tools that scan for security vulnerabilities are also commonly referred to as Static Application Security Testing (SAST) tools.

Using Static Analysis provides organizations with the following benefits:

* Static Analysis takes the guesswork out of adhering to an organization's code standards, enabling your development team to ship compliant code without significant impacts to developer velocity.
* An organization's applications are less vulnerable to security breaches over time, due to new vulnerabilities being caught through SAST scans before code reaches production.
* New developers to an organization are able to onboard faster because Static Analysis enables an organization to maintain a more readable codebase over time.
* An organization's software becomes reliable over time by virtue of the code being more maintainable because the risk of a developer introducing new defects to the code is minimized.

## Integrations

### CI providers
{{< whatsnext desc="With Static Analysis, you can integrate feedback on code reviews for various languages in any CI platform provider of your choice. See the documentation for information about the following integrations:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

### Source code management
{{< whatsnext desc="During code reviews, source code management (SCM) integrations check for Static Analysis violations in pull requests for repos that have at least one ruleset applied. Violations are flagged with a comment on the relevant line of code. Certain violations also include suggested changes that can be applied directly in the UI of the SCM tool." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}GitHub Pull Requests{{< /nextlink >}}
{{< /whatsnext >}}

### IDEs
{{< whatsnext desc="With Static Analysis, you can identify code vulnerabilities as you edit a file in your Integrated Development Environment (IDE). See the documentation for information about the following integrations:">}}
    {{< nextlink href="developers/ide_integrations/idea/" >}}Datadog Plugin for IntelliJ IDEA{{< /nextlink >}}
    {{< nextlink href="developers/ide_integrations/vscode/" >}}Datadog Extension for Visual Studio Code{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
