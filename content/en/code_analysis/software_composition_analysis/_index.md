---
title: Software Composition Analysis
kind: documentation
description: Learn about Datadog Software Composition Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
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
  Software Composition Analysis is in public beta. Go, Java, NodeJS, Python, and Ruby are the only supported languages.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Software Composition Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

Software Composition Analysis (SCA) scans open source libraries imported into repositories through package managers such as `npm` for [vulnerabilities][1]. SCA enables engineering teams to identify vulnerable dependencies early on in the development life cycle so they can update dependencies to non-vulnerable versions or remove them entirely to ensure their production codebase is secure.

SCA can run in CI pipelines by using [Code Analysis][3] and provide runtime monitoring capabilities by using [Datadog Application Security][1].

For more information, see the [Application Security documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/application_security/software_composition_analysis
[2]: https://app.datadoghq.com/ci/setup/static-analysis
[3]: /code_analysis/software_composition_analysis/setup
[4]: /security/application_security/software_composition_analysis/