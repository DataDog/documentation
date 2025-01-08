---
title: Setting Up Software Composition Analysis
description: Learn how to set up Software Composition Analysis to scan your imported open-source libraries for known security vulnerabilities before you ship to production.
is_beta: false
further_reading:
- link: "https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/"
  tag: "Blog"
  text: "Enhance application security in production with Datadog Application Vulnerability Management"
- link: "/getting_started/application_security/software_composition_analysis"
  tag: "Documentation"
  text: "Getting Started with Software Composition Analysis"
- link: "/security/code_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
- link: "/security/code_security/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
algolia:
  tags: ['software composition analysis', 'software composition analysis rules', 'library vulnerabilities', 'SCA']
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Code Analysis is in Preview.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

To set up Datadog Software Composition Analysis, navigate to [**Software Delivery** > **Code Analysis**][6].

## Select where to run Software Composition Analysis scans
### Scan with Datadog-hosted scanning
SCA scans can be run directly on Datadog's infrastructure. To get started, navigate to the [**Code Analysis** page][6].

### Scan in CI pipelines
SCA can be run in your CI pipelines using the [`datadog-ci` CLI][5]. Configure your [Datadog API and application keys (requires the `code_analysis_read` scope)][3] and run SCA jobs in the respective CI provider.

{{< whatsnext desc="See the documentation for your CI provider:">}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/#github-actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/#generic-ci-providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Select your source code management provider
Datadog SCA supports all source code management providers, with native support for GitHub.
### Set up the GitHub integration 
If GitHub is your source code management provider, you must configure a GitHub App using the [GitHub integration tile][9] and set up the [source code integration][10] to see inline code snippets and enable [pull request comments][11].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog.
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][11].

### Other source code management providers
If you are using another source code management provider, configure SCA to run in your CI pipelines using the `datadog-ci` CLI tool and [upload the results][8] to Datadog.
You **must** run an analysis of your repository on the default branch before results can begin appearing on the **Code Analysis** page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/application_security/vulnerability_management
[2]: /code_analysis/
[3]: /account_management/api-app-keys/
[4]: /getting_started/site/
[5]: https://github.com/DataDog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /security/code_security/software_composition_analysis/setup_static/#generic-ci-providers/
[9]: /integrations/github
[10]: /integrations/guide/source-code-integration
[11]: /security/code_security/dev_tool_int/github_pull_requests/
