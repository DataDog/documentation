---
title: Software Composition Analysis
kind: documentation
description: Learn about Datadog Software Composition Analysis to scan your imported open-source libraries for known security vulnerabilities before you ship to production.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/"
  tag: "Blog"
  text: "Enhance application security in production with Datadog Application Vulnerability Management"
- link: "/getting_started/application_security/software_composition_analysis"
  tag: "Documentation"
  text: "Getting Started with Software Composition Analysis"
- link: "/security/application_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
---

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Software Composition Analysis is part of the Code Analysis public beta.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Software Composition Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

Software Composition Analysis (SCA) scans open source libraries imported into repositories through package managers such as `npm` for [known vulnerabilities][1]. SCA enables engineering teams to identify vulnerable libraries early on in the development life cycle so they can update them to non-vulnerable versions or remove them entirely to ensure their production codebase is secure.

SCA can run in CI pipelines by using [Code Analysis][3] and provide runtime monitoring capabilities by using [Datadog Application Security][1].

For more information, see the [Application Security documentation][4].

## Languages

SCA currently supports scanning the following languages and technologies for vulnerable libraries:

1. Go
2. Java
3. NodeJS
4. Python
5. Ruby

## Integrations

### CI providers
{{< whatsnext desc="With Software Composition Analysis, you can identify vulnerable open source libraries that have been imported into your codebase. See the documentation for information about the following integrations:">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/application_security/software_composition_analysis
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /code_analysis/software_composition_analysis/setup
[4]: /security/application_security/software_composition_analysis/