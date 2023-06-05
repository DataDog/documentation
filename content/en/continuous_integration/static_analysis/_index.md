---
title: Static Analysis
kind: documentation
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
- link: "/continuous_integration/static_analysis/configuration"
  tag: "Documentation"
  text: "Learn how to set up Static Analysis"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
---

## Overview

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python is the only supported language. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Static Analysis is a clear-box software testing technique that analyzes a program's pre-production code without the need to execute the program, meaning that the program is static because it isn't running. Static Analysis helps you identify maintainability issues and adhere to coding best practices early in the Software Development Life Cycle (SDLC) to ensure only the highest quality code makes it to production. 

Using Static Analysis provides organizations with the following benefits:

* Static Analysis takes the guesswork out of adhering to an organization's code standards, enabling your development team to ship compliant code without significant impacts to developer velocity.
* New developers to an organization are able to onboard faster because Static Analysis enables an organization to maintain a more readable codebase over time.
* An organization's software becomes reliable over time by virtue of the code being more maintainable because the risk of a developer introducing new defects to the code is minimized.

## Integrations

{{< whatsnext desc="With Static Analysis, you can integrate feedback in any CI platform provider of choice, with native integrations for GitHub and CircleCI. See the documentation for information about the following integrations, or read more about the Datadog CI NPM package:">}}
    {{< nextlink href="continuous_integration/static_analysis/circleci_orb" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/configuration" >}}NPM package{{< /nextlink >}}
{{< /whatsnext >}}

## Usage

Datadog Static Analysis is run in your CI pipelines using the [datadog-ci CLI][2] to check your code against Datadog's default rulesets. To use the [`@datadog/datadog-ci` NPM package][2], see [Configuration][3].

### Search and filter results

After configuring your CI pipelines to run the Datadog Static Analyzer, violations will appear on the [Static Analysis Results page][1]. To filter your results, use the facets to the left of the list or use the search bar. 

Each violation is associated with a specific commit and branch from your repository on which your CI pipeline was run. Every violation per commit has a row item in the list. 

{{< img src="monitors/incidents/TODO.png" alt="Static Analysis results list view" style="width:80%;">}}

Click on a violation to open a side panel containing metadata regarding the scope of the violation and where it originated from. 

The content of the violation is split into three tabs:

* Source Code: A description of the violation and the offending lines of code that caused it. 

  To see the offending code snippet, configure the [Datadog GitHub App][4].
  
  {{< img src="monitors/incidents/TODO.png" alt="Static Analysis result Source Code Tab" style="width:80%;">}}

* Fix: Where possible, Datadog recommends one or more code fixes to resolve the violation that a developer can copy and paste.

  {{< img src="monitors/incidents/TODO.png" alt="Static Analysis result Fix Tab" style="width:80%;">}}

* Event: JSON Metadata regarding the the Static Analysis violation event.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /continuous_integration/static_analysis/configuration/
[4]: /integrations/github/