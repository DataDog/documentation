---
title: Set up SCA in your repositories
description: Learn about Datadog Software Composition Analysis to scan your imported open-source libraries for known security vulnerabilities before you ship to production.
disable_toc: false
aliases:
- /code_analysis/software_composition_analysis/generic_ci_providers/
- /code_analysis/software_composition_analysis/github_actions/
- /code_analysis/software_composition_analysis/setup/
---
## Overview

Datadog Software Composition Analysis (SCA) scans your repositories for open-source libraries and detects known security vulnerabilities before you ship to production.

To get started:
1. Open [Code Security settings][2].
2. In **Activate scanning for your repositories**, click **Manage Repositories**.
3. Choose [where to run SCA scans](#select-where-to-run-static-sca-scans) (Datadog-hosted or CI pipelines).
4. Follow the setup instructions for your source code provider.

## Supported languages and dependency manifests
Datadog SCA scans libraries in the following languages using dependency manifests (such as lockfiles and other supported manifest files) to identify vulnerable dependencies.

| Language   | Package Manager    | File                                |
|------------|-------------------|------------------------------------------|
| C#         | .NET              | `packages.lock.json`, `.csproj` files    |
| C++        | Conan             | `conan.lock`                             |
| Go         | mod               | `go.mod`                                 |
| JVM        | Gradle            | `gradle.lockfile`                        |
| JVM        | Maven             | `pom.xml`                                |
| Node.js    | npm               | `package-lock.json`                      |
| Node.js    | pnpm              | `pnpm-lock.yaml`                         |
| Node.js    | yarn              | `yarn.lock`                              |
| PHP        | composer          | `composer.lock`                          |
| Python     | PDM               | `pdm.lock`                               |
| Python     | pip               | `requirements.txt`, `Pipfile.lock`       |
| Python     | poetry            | `poetry.lock`                            |
| Python     | UV                | `uv.lock`                                |
| Ruby       | bundler           | `Gemfile.lock`                           |
| Rust       | Cargo           | `cargo.lock`                               |

**Note:** If both a `packages.lock.json` and a `.csproj` file are present, the `packages.lock.json` takes precedence and provides more precise version resolution.

## Select where to run static SCA scans
By default, scans run when you commit changes that update supported dependency manifests or lockfiles in an enabled repository. You can also run SCA in your CI pipelines; CI jobs are supported for `push` events.

### Scan with Datadog-hosted scanning

You can run Datadog Static SCA scans directly on Datadog infrastructure. Supported repository types include:
- [GitHub](/security/code_security/software_composition_analysis/setup_static/?tab=github#select-your-source-code-management-provider) (excluding repositories that use [Git Large File Storage][21])
- [GitLab.com and GitLab Self-Managed](/security/code_security/software_composition_analysis/setup_static/?tab=gitlab#select-your-source-code-management-provider)
- [Azure DevOps](/security/code_security/software_composition_analysis/setup_static/?tab=azuredevops#select-your-source-code-management-provider)

To get started, navigate to the [**Code Security** page][2].

<div class="alert alert-info">
Datadog-hosted SCA scanning is not supported for repositories that contain file names longer than 255 characters. <br>
For these cases, scan using CI pipelines.
</div>

### Scan in CI pipelines

Datadog Software Composition Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8].

<div class="alert alert-info">
You must scan your default branch at least once before results appear in <b>Code Security</b>.
</div>

{{< whatsnext desc="See instructions based on your CI provider:">}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/gitlab_ci" >}}GitLab CI/CD{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/azure_devops" >}}Azure DevOps{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Select your source code management provider

Regardless of the scanning mode you use, connect your source code management provider to enable native features such as inline code snippets and pull request comments. Datadog SCA supports all providers and offers native support for GitHub, GitLab, and Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

Configure a GitHub App with the [GitHub integration tile][1] and set up the [source code integration][2] to enable inline code snippets and [pull request comments][3].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][3].
- `Checks: Read & Write`, which allows you to create checks on SAST violations to block pull requests

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /integrations/guide/source-code-integration
[3]: /security/code_security/dev_tool_int/github_pull_requests

{{% /tab %}}
{{% tab "GitLab" %}}

See the [GitLab source code setup instructions][1] to connect GitLab to Datadog. Both GitLab.com and Self-Managed instances are supported.

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

If you are using another source code management provider, configure SCA to run in your CI pipelines using the `datadog-ci` CLI tool and [upload the results](#upload-third-party-sbom-to-datadog) to Datadog.

{{% /tab %}}
{{< /tabs >}}

## Link findings to Datadog services and teams

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## Upload third-party SBOM to Datadog

Datadog recommends using the [Datadog SBOM generator][10], but it is also possible to ingest a third-party SBOM.

You can upload SBOMs generated by other tools if they meet these requirements:
- Valid CycloneDX [1.4][18], [1.5][19], or [1.6][20] JSON schema
- All components have type `library`
- All components have a valid `purl` attribute

Third-party SBOM files are uploaded to Datadog using the [`datadog-ci`](https://github.com/DataDog/datadog-ci/?tab=readme-ov-file#how-to-install-the-cli) command.

You can find optional arguments and other information in the `datadog-ci` [README][22].

You can use the following command to upload your third-party SBOM. Ensure the environment variables `DD_API_KEY`, `DD_APP_KEY`, and `DD_SITE`
are set to your API key, APP key, and [Datadog site][12], respectively.

```bash
datadog-ci sbom upload /path/to/third-party-sbom.json
```

<div class="alert alert-info">
If you already have automatic scanning enabled for a repository, a manual upload will replace any existing result for that commit.
</div>


## Filter by reachable vulnerabilities

Datadog offers static reachability analysis to help teams assess whether vulnerable code paths in dependencies are referenced within their application code. This capability supports more effective prioritization by identifying vulnerabilities that are statically unreachable and therefore present minimal immediate risk.

This functionality is supported only when using the [Datadog SBOM Generator][1] with the `--reachability` flag enabled or when running scans through Datadog-hosted infrastructure.

Reachability analysis is available exclusively for Java projects and applies only to a defined set of vetted security advisories. Vulnerabilities not included in this set are excluded from reachability evaluation.

{{% collapse-content title="Supported advisories" level="h4" expanded=true id="id-for-anchoring" %}}
Static reachability analysis is available for the following advisories:
- [GHSA-h7v4-7xg3-hxcc](https://osv.dev/vulnerability/GHSA-h7v4-7xg3-hxcc)
- [GHSA-jfh8-c2jp-5v3q](https://osv.dev/vulnerability/GHSA-jfh8-c2jp-5v3q)
- [GHSA-7rjr-3q55-vv33](https://osv.dev/vulnerability/GHSA-7rjr-3q55-vv33)
- [GHSA-2p3x-qw9c-25hh](https://osv.dev/vulnerability/GHSA-2p3x-qw9c-25hh)
- [GHSA-cm59-pr5q-cw85](https://osv.dev/vulnerability/GHSA-cm59-pr5q-cw85)
- [GHSA-qrx8-8545-4wg2](https://osv.dev/vulnerability/GHSA-qrx8-8545-4wg2)
- [GHSA-p8pq-r894-fm8f](https://osv.dev/vulnerability/GHSA-p8pq-r894-fm8f)
- [GHSA-64xx-cq4q-mf44](https://osv.dev/vulnerability/GHSA-64xx-cq4q-mf44)
- [GHSA-g5w6-mrj7-75h2](https://osv.dev/vulnerability/GHSA-g5w6-mrj7-75h2)
- [GHSA-xw4p-crpj-vjx2](https://osv.dev/vulnerability/GHSA-xw4p-crpj-vjx2)
- [GHSA-cxfm-5m4g-x7xp](https://osv.dev/vulnerability/GHSA-cxfm-5m4g-x7xp)
- [GHSA-3ccq-5vw3-2p6x](https://osv.dev/vulnerability/GHSA-3ccq-5vw3-2p6x)
- [GHSA-mjmj-j48q-9wg2](https://osv.dev/vulnerability/GHSA-mjmj-j48q-9wg2)
- [GHSA-36p3-wjmg-h94x](https://osv.dev/vulnerability/GHSA-36p3-wjmg-h94x)
- [GHSA-ww97-9w65-2crx](https://osv.dev/vulnerability/GHSA-ww97-9w65-2crx)
- [GHSA-8jrj-525p-826v](https://osv.dev/vulnerability/GHSA-8jrj-525p-826v)
- [GHSA-4wrc-f8pq-fpqp](https://osv.dev/vulnerability/GHSA-4wrc-f8pq-fpqp)
- [GHSA-4cch-wxpw-8p28](https://osv.dev/vulnerability/GHSA-4cch-wxpw-8p28)
- [GHSA-6w62-hx7r-mw68](https://osv.dev/vulnerability/GHSA-6w62-hx7r-mw68)
- [GHSA-2q8x-2p7f-574v](https://osv.dev/vulnerability/GHSA-2q8x-2p7f-574v)
- [GHSA-rmr5-cpv2-vgjf](https://osv.dev/vulnerability/GHSA-rmr5-cpv2-vgjf)
- [GHSA-4jrv-ppp4-jm57](https://osv.dev/vulnerability/GHSA-4jrv-ppp4-jm57)
- [GHSA-mw36-7c6c-q4q2](https://osv.dev/vulnerability/GHSA-mw36-7c6c-q4q2)
- [GHSA-hph2-m3g5-xxv4](https://osv.dev/vulnerability/GHSA-hph2-m3g5-xxv4)
- [GHSA-j9h8-phrw-h4fh](https://osv.dev/vulnerability/GHSA-j9h8-phrw-h4fh)
- [GHSA-3gm7-v7vw-866c](https://osv.dev/vulnerability/GHSA-3gm7-v7vw-866c)
- [GHSA-645p-88qh-w398](https://osv.dev/vulnerability/GHSA-645p-88qh-w398)
- [GHSA-g5h3-w546-pj7f](https://osv.dev/vulnerability/GHSA-g5h3-w546-pj7f)
- [GHSA-c27h-mcmw-48hv](https://osv.dev/vulnerability/GHSA-c27h-mcmw-48hv)
- [GHSA-r4x2-3cq5-hqvp](https://osv.dev/vulnerability/GHSA-r4x2-3cq5-hqvp)
- [GHSA-24rp-q3w6-vc56](https://osv.dev/vulnerability/GHSA-24rp-q3w6-vc56)
- [GHSA-c9hw-wf7x-jp9j](https://osv.dev/vulnerability/GHSA-c9hw-wf7x-jp9j)
- [GHSA-4gq5-ch57-c2mg](https://osv.dev/vulnerability/GHSA-4gq5-ch57-c2mg)
- [GHSA-vmfg-rjjm-rjrj](https://osv.dev/vulnerability/GHSA-vmfg-rjjm-rjrj)
- [GHSA-crg9-44h2-xw35](https://osv.dev/vulnerability/GHSA-crg9-44h2-xw35)
- [GHSA-qmqc-x3r4-6v39](https://osv.dev/vulnerability/GHSA-qmqc-x3r4-6v39)
- [GHSA-4w82-r329-3q67](https://osv.dev/vulnerability/GHSA-4w82-r329-3q67)
- [GHSA-qr7j-h6gg-jmgc](https://osv.dev/vulnerability/GHSA-qr7j-h6gg-jmgc)
- [GHSA-9mxf-g3x6-wv74](https://osv.dev/vulnerability/GHSA-9mxf-g3x6-wv74)
- [GHSA-f3j5-rmmp-3fc5](https://osv.dev/vulnerability/GHSA-f3j5-rmmp-3fc5)
{{% /collapse-content %}}

## Data Retention

Datadog stores findings in accordance with our [Data Rentention Periods](https://docs.datadoghq.com/data_security/data_retention_periods/). Datadog does not store or retain customer source code.

## Further Reading

{{< whatsnext desc="More about SCA:">}}
    {{< nextlink href="/security/code_security/software_composition_analysis/setup_runtime/" >}}Set up runtime detection of library vulnerabilities{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Other Code Security scanning for your repositories:">}}
    {{< nextlink href="/security/code_security/static_analysis/" >}}Static Code Analysis (SAST){{< /nextlink >}}
    {{< nextlink href="/security/cloud_security_management/iac_scanning/" >}}Infrastructure as Code (IaC){{< /nextlink >}}
    {{< nextlink href="/security/code_security/secret_scanning/" >}}Secrets Scanning{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: /security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /account_management/api-app-keys/
[7]: /integrations/github
[8]: https://github.com/DataDog/datadog-ci
[9]: /security/code_security/dev_tool_int/github_pull_requests/
[10]: https://github.com/DataDog/datadog-sbom-generator
[12]: /getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action
[14]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sbom
[15]: https://docs.datadoghq.com/software_catalog/service_definitions/v3-0/
[16]: https://docs.datadoghq.com/account_management/teams/
[17]: https://app.datadoghq.com/source-code/repositories
[18]: https://cyclonedx.org/docs/1.4/json/
[19]: https://cyclonedx.org/docs/1.5/json/
[20]: https://cyclonedx.org/docs/1.6/json/
[21]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[22]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-sbom
[23]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[24]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#migrating-to-v30
[25]: https://docs.datadoghq.com/data_security/data_retention_periods/
[26]: https://docs.datadoghq.com/account_management/teams/
[101]: https://docs.datadoghq.com/software_catalog/service_definitions/v3-0/
[102]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/data_security/data_retention_periods/
