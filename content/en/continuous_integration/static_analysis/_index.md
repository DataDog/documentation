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

{{< whatsnext desc="With Static Analysis, you can integrate feedback in a supporting CI platform provider, with native integrations for GitHub and CircleCI. See the documentation for information about the following integrations, or read more about configuring the Datadog CI NPM package:">}}
    {{< nextlink href="continuous_integration/static_analysis/configuration" >}}Configuring the NPM package{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/circleci_orb" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

## Usage

Datadog Static Analysis runs in your CI pipelines using the [datadog-ci CLI][2] and checks your code against Datadog's default rulesets. To install and configure the [`@datadog/datadog-ci` CLI using the NPM package][2], see [Configuration][3].

### Search and filter results

After you configure your CI pipelines to run the Datadog Static Analyzer, violations appear on the [Static Analysis Results page][1]. To filter your results, use the facets to the left of the list, or search. 

Each violation is associated with a specific commit and branch from your repository on which the CI pipeline ran. The rows represent every violation per commit. 

Click on a violation to open a side panel that contains information about the scope of the violation and where it originated. 

The content of the violation is shown in tabs:

* Source Code: A description of the violation and the lines of code that caused it. To see the offending code snippet, configure the [Datadog GitHub App][4].
* Fix: Where possible, one or more code fixes that can resolve the violation, which you can copy and paste.
* Event: JSON metadata regarding the the Static Analysis violation event.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /continuous_integration/static_analysis/configuration/
[4]: /integrations/github/
