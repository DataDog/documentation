---
title: Setting Up Software Composition Analysis
kind: documentation
description: Learn how to set up Software Composition Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
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
- link: "/code_analysis/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
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

## Enable Software Composition Analysis

When setting up Static Analysis on your project, select **Enable Software Composition Analysis**.

{{< img src="code_analysis/software_composition_analysis/enable_sca.png" alt="Click the Enable Software Composition Analysis checkbox on the Code Analysis setup page when setting up Code Analysis for your project" style="width:100%;" >}}

For more information, see the [Code Analysis documentation][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/application_security/vulnerability_management
[2]: /code_analysis/