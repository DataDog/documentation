---
title: Setting Up Software Composition Analysis
description: Learn how to set up Software Composition Analysis to scan your imported open-source libraries for known security vulnerabilities before you ship to production.
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

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="Try the Beta!" >}}
Code Analysis is in public beta.
{{< /callout >}}

## Overview

To use Datadog Software Composition Analysis (SCA) in CI, you only need to set it up in its own dedicated job. 

## Enable Software Composition Analysis

Navigate to **Software Delivery** > **Code Analysis** and click **+ Add a Repository**. When setting up [Code Analysis][2] on your project, select **Enable Software Composition Analysis**.

{{< img src="code_analysis/software_composition_analysis/enable_sca.png" alt="Click the Enable Software Composition Analysis checkbox on the Code Analysis setup page when setting up Code Analysis for your project" style="width:100%;" >}}

## Configure your CI/CD provider

Datadog Software Composition Analysis runs in your CI pipelines using the [`datadog-ci` CLI][5] and checks that imported libraries are secure. Configure your [Datadog API and application keys][3] and run Software Composition Analysis jobs in the respective CI provider.

{{< whatsnext desc="See the documentation for information about the following integrations:">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/application_security/vulnerability_management
[2]: /code_analysis/
[3]: /account_management/api-app-keys/
[4]: /getting_started/site/
[5]: https://github.com/DataDog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account