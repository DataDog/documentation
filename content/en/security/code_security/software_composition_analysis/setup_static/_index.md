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

### Supported languages and lockfiles
Datadog SCA scans libraries in the following languages and **requires** a lockfile to report them:

| Language   | Package Manager    | Lockfile                                |
|------------|-------------------|------------------------------------------|
| C#         | .NET              | `packages.lock.json`                     |
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

The following sections describe ways to configure SCA for your repositories.

## Select where to run static SCA scans

### Scan with Datadog-hosted scanning

You can run Datadog Static SCA scans directly on Datadog infrastructure. Supported repository types include:
- [GitHub](/security/code_security/software_composition_analysis/setup_static/?tab=github#select-your-source-code-management-provider) (excluding repositories that use [Git Large File Storage][21])
- [GitLab.com and GitLab Self-Managed](/security/code_security/software_composition_analysis/setup_static/?tab=gitlab#select-your-source-code-management-provider)
- [Azure DevOps](/security/code_security/software_composition_analysis/setup_static/?tab=azuredevops#select-your-source-code-management-provider)

To get started, navigate to the [**Code Security** page][2].

<div class="alert alert-info">
Datadog-hosted SCA scanning is not supported for repositories that:<br>
- Contain file names longer than 255 characters<br>
For these cases, use CI Pipelines.
</div>

### Scan in CI pipelines
Datadog Static Code Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8].

Configure your Datadog API and application keys by adding `DD_APP_KEY` and `DD_API_KEY` as secrets. Make sure the application key has the `code_analysis_read` scope.

**Note**: You must scan your default branch at least once before results appear in **Code Security**.

## Select your source code management provider
Datadog SCA supports all source code management providers, with native support for GitHub, GitLab, and Azure DevOps.

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

### Authentication

To upload results to Datadog, you must be authenticated. To ensure you're authenticated, configure the following environment variables:

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][1] and should be stored as a secret.            | Yes      |                 |
| `DD_APP_KEY` | Your Datadog application key. This key, created by your [Datadog organization][2], should include the `code_analysis_read` scope and be stored as a secret.    | Yes      |                 |
| `DD_SITE`    | The [Datadog site][12] to send information to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

### Running options

There are two ways to run SCA scans from within your CI Pipelines:
- [**Via Pipelines Integration**](#run-via-pipelines-integration) (GitHub Actions, Azure DevOps)
- [**Via Customizable Script**](#run-via-customizable-script) (for any provider)

#### Run Via Pipelines Integration

You can run SCA scans automatically as part of your CI/CD workflows using built-in integrations for popular CI providers.

<div class="alert alert-danger">
Datadog Software Composition Analysis CI jobs are only supported on <code>push</code> event trigger. Other event triggers (<code>pull_request</code>, for example) are not supported and can cause issues with the product.
</div>

{{< tabs >}}
{{% tab "GitHub" %}}
**GitHub Actions**

SCA can run as a job in your GitHub Actions workflows. The action provided below invokes Datadog's recommended SBOM tool, [Datadog SBOM Generator][1], on your codebase and uploads the results into Datadog.

Add the following code snippet in `.github/workflows/datadog-sca.yml`.

Make sure to replace the `dd_site` attribute with the [Datadog site][2] you are using.

{{< code-block lang="yaml" filename="datadog-sca.yml" collapsible="true" >}}
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: "datadoghq.com"
{{< /code-block >}}


**Related GitHub Actions**

[Datadog Static Code Analysis (SAST)][3] analyzes your first-party code. Static Code Analysis can be set up using the [`datadog-static-analyzer-github-action`][4] GitHub action.

[1]: https://github.com/DataDog/datadog-sbom-generator
[2]: /getting_started/site/
[3]: /getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[4]: https://github.com/DataDog/datadog-static-analyzer-github-action

{{% /tab %}}
{{% tab "Azure DevOps" %}}
**Azure DevOps Pipelines**

To add a new pipeline in Azure DevOps, go to **Pipelines > New Pipeline**, select your repository, and then create/select a pipeline.

Add the following content to your Azure DevOps pipeline YAML file:

{{< code-block lang="yaml" filename="datadog-sca.yml" collapsible="true" >}}
trigger:
  branches:
    include:
      # Optionally specify a specific branch to trigger on when merging
      - "*"

variables:
  - group: "Datadog"

jobs:
  - job: DatadogSoftwareCompositionAnalysis
    displayName: "Datadog Software Composition Analysis"
    steps:
      - script: |
          npm install -g @datadog/datadog-ci
          export DATADOG_OSV_SCANNER_URL="https://github.com/DataDog/datadog-sbom-generator/releases/latest/download/datadog-sbom-generator_linux_amd64.zip"
          mkdir -p /tmp/datadog-sbom-generator
          curl -L -o /tmp/datadog-sbom-generator/datadog-sbom-generator.zip $DATADOG_OSV_SCANNER_URL
          unzip /tmp/datadog-sbom-generator/datadog-sbom-generator.zip -d /tmp/datadog-sbom-generator
          chmod 755 /tmp/datadog-sbom-generator/datadog-sbom-generator
          /tmp/datadog-sbom-generator/datadog-sbom-generator scan --output=/tmp/sbom.json .
          datadog-ci sbom upload /tmp/sbom.json
        env:
          DD_APP_KEY: $(DD_APP_KEY)
          DD_API_KEY: $(DD_API_KEY)
          DD_SITE: datadoghq.com
{{< /code-block >}}

{{% /tab %}}
{{% tab "Other" %}}
For all other providers, use the customizable script in the [section below](#run-via-customizable-script) to run SCA scans and upload results to Datadog.
{{% /tab %}}
{{< /tabs >}}

#### Run Via Customizable Script

If you use a different CI provider or want more control, you can run SCA scans using a customizable script. This approach lets you manually install and run the scanner, then upload results to Datadog from any environment.

<div class="alert alert-info">
<b>For non-GitHub repositories</b>, run your first scan on the default branch.<br/>If your branch name is custom (not <b>master</b>, <b>main</b>, <b>default</b>, <b>stable</b>, <b>source</b>, <b>prod</b>, or <b>develop</b>), upload once and set the default branch in <a href="https://app.datadoghq.com/source-code/repositories">Repository Settings</a>.
</div>

Prerequisites:
- Unzip
- Node.js 14 or later

```bash
# Set the Datadog site to send information to
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog SBOM Generator:
# https://github.com/DataDog/datadog-sbom-generator/releases
DATADOG_SBOM_GENERATOR_URL=https://github.com/DataDog/datadog-sbom-generator/releases/latest/download/datadog-sbom-generator_linux_amd64.zip

# Install Datadog SBOM Generator
mkdir /datadog-sbom-generator
curl -L -o /datadog-sbom-generator/datadog-sbom-generator.zip $DATADOG_SBOM_GENERATOR_URL
unzip /datadog-sbom-generator/datadog-sbom-generator.zip -d /datadog-sbom-generator
chmod 755 /datadog-sbom-generator/datadog-sbom-generator

# Run Datadog SBOM Generator to scan your dependencies
/datadog-sbom-generator/datadog-sbom-generator scan --output=/tmp/sbom.json /path/to/repository

# Upload results to Datadog
datadog-ci sbom upload /tmp/sbom.json
```

<div class="alert alert-info">
This script uses the Linux x86_64 datadog-sbom-generator. For other systems, update the download URL. See all releases <a href="https://github.com/DataDog/datadog-sbom-generator/releases">here</a>.
</div>

## Upload third-party SBOM to Datadog

Datadog recommends using the [Datadog SBOM generator][10], but it is also possible to ingest a third-party SBOM.

You can upload SBOMs generated by other tools if they meet these requirements:
- Valid CycloneDX [1.4][18], [1.5][19], or [1.6][20] JSON schema
- All components have type `library`
- All components have a valid `purl` attribute

Third-party SBOM files are uploaded to Datadog using the [`datadog-ci`](https://github.com/DataDog/datadog-ci/?tab=readme-ov-file#how-to-install-the-cli) command.

You can use the following command to upload your third-party SBOM. Ensure the environment variables `DD_API_KEY`, `DD_APP_KEY`, and `DD_SITE`
are set to your API key, APP key, and [Datadog site][12], respectively.

```bash
datadog-ci sbom upload /path/to/third-party-sbom.json
```

## Link results to Datadog services and teams

### Link results to services
Datadog associates static code and library scan results with relevant services by using the following mechanisms:

{{% collapse-content title="Identifying the code location in the Software Catalog" level="h4" %}}
The [schema version `v3`][15] and later of the Software Catalog allows you to add the mapping of your code location for your service. The `codeLocations` section specifies the location of the repository containing the code and its associated paths.

The `paths` attribute is a list of globs that should match paths in the repository.
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}
If you want all the files in a repository to be associated with a service, you can use the glob `**` as follows:
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - "**"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Detecting file usage patterns" level="h4" %}}
Datadog detects file usage in additional products such as Error Tracking and associate
files with the runtime service. For example, if a service called `foo` has
a log entry or a stack trace containing a file with a path `/modules/foo/bar.py`,
it associates files `/modules/foo/bar.py` to service `foo`.
{{% /collapse-content %}}

{{% collapse-content title="Detecting service name in paths and repository names" level="h4" %}}

Datadog detects service names in paths and repository names, and associates the file with the service if a match is found.

For a repository match, if there is a service called `myservice` and
the repository URL is `https://github.com/myorganization/myservice.git`, then,
it associates `myservice` to all files in the repository.

If no repository match is found, Datadog attempts to find a match in the
`path` of the file. If there is a service named `myservice`, and the path is `/path/to/myservice/foo.py`, the file is associated with `myservice` because the service name is part of the path. If two services are present
in the path, the service name closest to the filename is selected.
{{% /collapse-content %}}

If one method succeeds (in order), no further mapping attempts are made.

### Link results to teams

Datadog automatically associates the team attached to a service when a violation or vulnerability is detected. For example, if the file `domains/ecommerce/apps/myservice/foo.py`
is associated with `myservice`, then the team `myservice` will be associated to any violation
detected in this file.

If no services or teams are found, Datadog uses the `CODEOWNERS` file in your repository. The `CODEOWNERS` file determines which team owns a file in your Git provider.

**Note**: You must accurately map your Git provider teams to your [Datadog teams][16] for this feature to function properly.

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
[8]: /integrations/guide/source-code-integration
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

