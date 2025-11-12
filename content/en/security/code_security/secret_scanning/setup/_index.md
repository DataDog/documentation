---
title: Secret Scanning
description: Use Datadog Secret Scanning to find secrets exposed in source code.
is_beta: true
algolia:
  tags: ['secrets scanning', 'secret scanning', 'datadog static analysis', 'SAST']
---

{{< callout url="https://www.datadoghq.com/product-preview/secret-scanning/" btn_hidden="false" header="Join the Preview!" >}}
Secret Scanning is in Preview. Contact your Customer Success Manager to get access.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Secret Scanning is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Secret Scanning scans code to find exposed secrets. Datadog also attempts to [validate secrets][] and surface their status (valid, invalid) to help you prioritize secrets remediation.

## Select where to run Secret Scanning
### Scan with Datadog-hosted scanning
Scans can run in your CI/CD pipelines or directly in Datadog with hosted scanning. To get started, go to the [**Code Security Setup**][1] and click **Activate scanning for your repositories** or learn how to set up Secret Scanning using [GitHub actions][5] or with [other CI providers][6].

You can run Secrets scans directly on Datadog infrastructure. Supported repository types include:
- [GitHub][18] (excluding repositories that use [Git Large File Storage][17])
- [GitLab.com and GitLab Self-Managed][20]
- [Azure DevOps][19]

To get started, navigate to the [**Code Security** page][1].

### Scan in CI pipelines
Datadog Static Code Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8].

First, configure your Datadog API and application keys. Add `DD_APP_KEY` and `DD_API_KEY` as secrets. Please ensure your Datadog application key has the `code_analysis_read` scope.

Next, run Static Code Analysis by following instructions for your chosen CI provider below.

{{< whatsnext desc="See instructions based on your CI provider:">}}
    {{< nextlink href="security/code_security/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Select your source code management provider
Datadog Secret Scanning supports all source code management providers, with native support for GitHub, GitLab, and Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

Configure a GitHub App with the [GitHub integration tile][1] and set up the [source code integration][2] to enable inline code snippets and [pull request comments][3].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][3], as well as open pull requests to [fix vulnerabilities][4]
- `Checks: Read & Write`, which allows you to create checks on SAST violations to block pull requests

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /integrations/guide/source-code-integration
[3]: /security/code_security/dev_tool_int/github_pull_requests
[4]: /security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

See the [GitLab source code setup instructions][1] to connect GitLab repositories to Datadog. Both GitLab.com and Self-Managed instances are supported.

[1]: /integrations/gitlab-source-code/#setup 

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**Note:** Your Azure DevOps integrations must be connected to a Microsoft Entra tenant. Azure DevOps Server is **not** supported.

See the [Azure source code setup instructions][4] to connect Azure DevOps repositories to Datadog.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /integrations/azure-devops-source-code/#setup
[5]: /getting_started/site/

{{% /tab %}}
{{% tab "Other" %}}

If you are using another source code management provider, configure Static Code Analysis to run with Secret Scanning in your CI pipelines using the `datadog-ci` CLI tool and [upload the results](#upload-third-party-static-analysis-results-to-datadog) to Datadog.
You **must** run an analysis of your repository on the default branch before results can begin appearing on the **Code Security** page.

{{% /tab %}}
{{< /tabs >}}

## Secret Scanning rules

Datadog Secret Scanning is powered by [Sensitive Data Scanner (SDS)][3] and includes all of the rules in the
[Secrets and credentials category of SDS][4].


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /security/code_security/static_analysis/setup
[3]: /security/sensitive_data_scanner/
[4]: /security/sensitive_data_scanner/scanning_rules/library_rules/#secrets-and-credentials
[5]: /security/code_security/secret_scanning/github_actions
[6]: /security/code_security/secret_scanning/generic_ci_providers
[17]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[18]: /security/code_security/static_analysis/setup/?tab=github#select-your-source-code-management-provider
[19]: /security/code_security/static_analysis/setup/?tab=azuredevops#select-your-source-code-management-provider
[20]: /security/code_security/static_analysis/setup/?tab=gitlab#select-your-source-code-management-provider
