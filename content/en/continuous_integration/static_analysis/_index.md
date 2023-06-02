---
title: Static Analysis
kind: documentation
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
is_beta: true
further_reading:
  - link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
    tag: "Blog"
    text: "Monitor all your CI pipelines with Datadog"
---

## Overview

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python is currently the only supported language. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Static Analysis is a white-box software testing technique that analyzes a program's pre-production code without the need to execute the program (i.e. the program is static because it isn't running). Static Analysis aims to help developers identify maintainability issues and adhere to coding best practices early in the Software Development Life Cycle (SDLC) to ensure only the highest quality code makes it to production. 

Using Static Analysis provides organizations with the following benefits:
1. Static Analysis takes the guess-work out of adhering to an organization's code standards, which enables developers to ship compliant code without significant impacts to their velocity
2. New developers to an organization are able to onboard faster because Static Analysis enables an organization to maintain a more readable codebase over time
3. An organization's software will be more reliable over time by virtue of the code being more maintainable because the risk of a developer introducing new defects to the code is minimized

Datadog Static Analysis is run in your CI pipelines using the [datadog-ci CLI][1] to check your code against Datadog's default rulesets. Developers can access any resulting violations in the Datadog UI so that they can fix the issues before the software is released to production. Where applicable, certain simple violations will also include one or more suggested fixes that developers can use to quickly resolve the violation.

## Usage

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
