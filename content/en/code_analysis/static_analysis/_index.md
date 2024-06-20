---
title: Static Analysis
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
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="Try the Beta!" >}}
Code Analysis is in public beta.
{{< /callout >}}

## Overview

Static Analysis is a clear-box software testing technique that analyzes a program's pre-production code without the need to execute the program, meaning that the program is static because it isn't running. Static Analysis helps you identify maintainability issues and security vulnerabilities early in the Software Development Life Cycle (SDLC) to ensure only the highest quality, most secure code makes it to production. Static Analysis tools that scan for security vulnerabilities are also commonly referred to as Static Application Security Testing (SAST) tools.

Using Static Analysis provides organizations with the following benefits:

* Static Analysis takes the guesswork out of adhering to an organization's code standards, enabling your development team to ship compliant code without significant impacts to developer velocity.
* An organization's applications are less vulnerable to security breaches over time, due to new vulnerabilities being caught through SAST scans before code reaches production.
* New developers to an organization are able to onboard faster because Static Analysis enables an organization to maintain a more readable codebase over time.
* An organization's software becomes reliable over time by virtue of the code being more maintainable because the risk of a developer introducing new defects to the code is minimized.

## Languages

Static Analysis currently supports scanning the following languages and technologies for poor coding practices and security vulnerabilities:

- C#
- Dockerfiles
- Go
- Java
- JavaScript
- Python
- Ruby
- TypeScript

## Integrations

### CI providers
{{< whatsnext desc="With Static Analysis, you can integrate feedback on code reviews for various languages in any CI platform provider of your choice. See the documentation for information about the following integrations:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

### Source code management
{{< whatsnext desc="During code reviews, source code management (SCM) integrations check for Static Analysis violations in pull requests for repos that have at least one ruleset applied. Violations are flagged with a comment on the relevant line of code. Certain violations also include suggested changes that can be applied directly in the UI of the SCM tool." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}GitHub Pull Requests{{< /nextlink >}}
{{< /whatsnext >}}

### IDEs
{{< whatsnext desc="With Static Analysis, you can identify code vulnerabilities as you edit a file in your Integrated Development Environment (IDE). See the documentation for information about the following integrations:">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Datadog Plugin for JetBrains IDEs{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/" >}}Datadog Extension for Visual Studio Code{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/" >}}Datadog Extension for Visual Studio{{< /nextlink >}}
{{< /whatsnext >}}

## Search and filter results

After you configure your CI pipelines to run the Datadog Static Analyzer, violations are summarized per repository on the [**Code Analysis Repositories** page][1]. Click on a repository to analyze **Code Vulnerabilities** and **Code Quality** results from Static Analysis. 

* The **Code Vulnerabilities** tab contains the violations found by Datadog's rules in the [Security category][2].
* The **Code Quality** tab contains the violations found by Datadog's rules in the [Best Practices, Code Style, Error Prone, or Performance categories][3].

To filter your results, use the facets to the left of the list, or search. 

Every row represents a violation. Each violation is associated with the specific commit and branch that is selected in the filters at the top of the page (by default the latest commit on the default branch of the repository you are viewing).

Click on a violation to open a side panel that contains information about the scope of the violation and where it originated.
{{< img src="code_analysis/static_analysis/static-analysis-violation.png" alt="Side panel for a static analysis violation" style="width:80%;">}} 

The content of the violation is shown in tabs:

- **Details**: A description of the violation and the lines of code that caused it. To see the offending code snippet, configure the [Datadog GitHub App][4].
- **Fixes**: One or more code fixes that can resolve the violation, which you can copy and paste.
- **Event**: JSON metadata regarding the Static Analysis violation event.

### Using suggested fixes
<div class="alert alert-warning">AI Suggested Fixes are in private beta. To request access, contact <a href="/help/">Support.</div>

{{< img src="code_analysis/static_analysis/static-analysis-fixes.png" alt="Fixes tab of a static analysis violation" style="width:80%;">}}

In Datadog Static Analysis, there are two types of suggested fixes:

1. **Default Suggested Fix:** For simple violations like linting issues, the rule analyzer automatically provides templated fixes.
2. **AI Suggested Fix:** For complex violations, fixes are typically not available beforehand. Instead, you can use AI Suggested Fixes, which use OpenAI's GPT-4 to generate a suggested fix. You can choose between "Text" and "Unified Diff" fixes, which outputs plain text instructions or a code change for resolving the violation, respectively.

The two types of fixes are distinguished visually in the UI with different labels.

*Default Suggested Fixes:*
{{< img src="code_analysis/static_analysis/static-analysis-default-fix.png" alt="Visual indicator of a default static analysis suggested fix" style="width:60%;">}}

*AI Suggested Fixes:*
{{< img src="code_analysis/static_analysis/static-analysis-ai-fix.png" alt="Visual indicator of an AI static analysis suggested fix" style="width:60%;">}}

### Ignoring violations

#### Ignore for a repository
Add an ignore rule in your `static-analysis.datadog.yml` file. The example below ignores the rule `javascript-express/reduce-server-fingerprinting` for all directories.

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "**"
```

#### Ignore for a file or directory
Add an ignore rule in your `static-analysis.datadog.yml` file. The example below ignores the rule `javascript-express/reduce-server-fingerprinting` for this file. For more information on how to ignore by path, see [Static Analysis Setup][5].

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "ad-server/src/app.js"
```

#### Ignore for a specific instance

To ignore a specific instance of a violation, comment `no-dd-sa` above the line of code to ignore. This prevents that line from ever producing a violation. For example, in the following Python code snippet, the line `foo = 1` would be ignored by Static Analysis scans.

```python
#no-dd-sa
foo = 1
bar = 2
```

You can also use `no-dd-sa` to only ignore a particular rule rather than ignoring all rules. To do so, specify the name of the rule you wish to ignore in place of `<rule-name>` using this template: 

`no-dd-sa:<rule-name>`

For example, in the following JavaScript code snippet, the line `my_foo = 1` is analyzed by all rules except for the `javascript-code-style/assignment-name` rule, which tells the developer to use [camelCase][6] instead of [snake_case][7].

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

### Reporting false positives
If you believe a specific violation is a false positive, you can indicate false positives and tell us why you flagged it. Datadog reviews submissions to improve our rules over time.

{{< img src="code_analysis/static_analysis/flag-false-positive.png" alt="Button for reporting a Static Analysis violation as a false positive" style="width:60%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /code_analysis/static_analysis_rules?categories=Security
[3]: /code_analysis/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /integrations/github/
[5]: /code_analysis/static_analysis/setup#add-a-static-analysis-yaml-file-to-your-project
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
