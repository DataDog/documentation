---
title: Static Analysis
kind: documentation
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
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

Static Analysis is a clear-box software testing technique that analyzes a program's pre-production code without the need to execute the program, meaning that the program is static because it isn't running. Static Analysis help developers identify maintainability issues and adhere to coding best practices early in the Software Development Life Cycle (SDLC) to ensure only the highest quality code makes it to production. 

Using Static Analysis provides organizations with the following benefits:

* Static Analysis takes the guesswork out of adhering to an organization's code standards, enabling developers to ship compliant code without significant impacts to their velocity.
* New developers to an organization are able to onboard faster because Static Analysis enables an organization to maintain a more readable codebase over time.
* An organization's software becomes reliable over time by virtue of the code being more maintainable because the risk of a developer introducing new defects to the code is minimized.

## Integrations

{{< whatsnext desc="With Static Analysis, you can integrate feedback on code reviews for various languages in any CI platform provider of choice. See the documentation for information about the following integrations:">}}
    {{< nextlink href="continuous_integration/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

## Configuration

The [`@datadog/datadog-ci` package][2] allows you to run Static Analysis directly within your CI/CD pipeline.

### Python

Add a `datadog.yml` file at the root of your project.

Configure your Datadog API and application keys and select from the following CI providers:

{{< tabs >}}
{{% tab "CircleCI Orb" %}}

Text inside tab. [Link references][101] must be inside the tab.

[101]: /agent/guide/agent-commands/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

Text inside tab. [Link references][101] must be inside the tab.

[101]: /agent/guide/agent-commands/

{{% /tab %}}
{{% tab "Other" %}}

Text inside tab. [Link references][101] must be inside the tab.

[101]: /agent/guide/agent-commands/

{{% /tab %}}
{{< /tabs >}}

### Other programming languages

Upload a SARIF report using [`datadog-ci`][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci