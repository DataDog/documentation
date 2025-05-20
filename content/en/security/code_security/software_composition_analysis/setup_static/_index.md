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
SCA can scan dependency management files in your repositories to statically detect open source libraries used in your codebase. SCA supports scanning for libraries in the following languages and lockfiles below:

| Package Manager | Lockfile                                 |
|-----------------|------------------------------------------|
| C# (.NET)       | `packages.lock.json`                     |
| Go (mod)        | `go.mod`                                 |
| JVM (Gradle)    | `gradle.lockfile`                        |
| JVM (Maven)     | `pom.xml`                                |
| Node.js (npm)   | `package-lock.json`                      |
| Node.js (pnpm)  | `pnpm-lock.yaml`                         |
| Node.js (yarn)  | `yarn.lock`                              |
| PHP (composer)  | `composer.lock`                          |
| Python (pip)    | `requirements.txt`, `Pipfile.lock`       |
| Python (poetry) | `poetry.lock`                            |
| Ruby (bundler)  | `Gemfile.lock`                           |

You can set up Datadog Static Software Composition Analysis (SCA) in-app through [**Security** > **Code Security**][1].

1. Navigate to the [Security Settings][2] page.
2. In **Activate scanning for your repositories**, click **Manage Repositories**.
3. Select where to run static SCA scans.
4. Complete the remaining steps for your provider.

## Select where to run static SCA scans

### Scan with Datadog-hosted scanning
For GitHub repositories, you can run Datadog SCA scans directly on Datadog's infrastructure. To get started, navigate to the [**Code Security** page][1].

<div class="alert alert-info">
Datadog-hosted scanning for Software Composition Analysis (SCA) does not support repositories that use <a href="https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage">Git Large File Storage</a>. To scan repositories that use Large File Storage, set up SCA in your CI pipelines.
</div>

### Scan in CI pipelines
First, configure your Datadog API and application keys by adding `DD_APP_KEY` and `DD_API_KEY` as secrets. Please ensure your Datadog application key has the `code_analysis_read` scope.

Next, run SCA by following instructions for your chosen CI provider below.

## GitHub Actions
SCA can run as a job in your GitHub Actions workflows. The action provided below invokes [Datadog osv-scanner][10], our recommended SBOM generator, on your codebase and uploads the results into Datadog.

Add the following code snippet in `.github/workflows/datadog-sca.yml`. Make sure to replace
the `dd_site` attribute with the [Datadog site][12] you are using.

```yaml
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
```

<!-- ### Library Inventory Generation

The GitHub Action generates an inventory of libraries automatically based on the libraries that are declared in your repository.

The GitHub Action works for the following languages and following files:

 - JavaScript/TypeScript: `package-lock.json` and `yarn.lock`
 - Python: `requirements.txt` (with version defined) and `poetry.lock`
 - Java: `pom.xml`
 - C#
 - Ruby
 - ... and more languages -->

### Related GitHub Actions
[Datadog Static Code Analysis (SAST)][5] analyzes your first-party code. Static Code Analysis can be set up using the [`datadog-static-analyzer-github-action`][13] GitHub action.


## Generic CI Providers
If you don't use GitHub Actions, you can run the [datadog-ci][14] CLI directly in your CI pipeline platform and upload your SBOM to Datadog.

**If you are running Code Security on a non-GitHub repository**, ensure that the first scan is ran on your default branch. If your default branch is not one of `master`, `main`, `default`, `stable`, `source`, `prod`, or `develop`, then you will need to attempt an SBOM upload for your repository and then manually override the default branch in-app under [Repository Settings][17]. Afterwards, uploads from your non-default branches will succeed.

Prerequisites:

- unzip
- Node.js 14 or later

Configure the following environment variables:

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][6] and should be stored as a secret.            | Yes      |                 |
| `DD_APP_KEY` | Your Datadog application key. This key, created by your [Datadog organization][6], should include the `code_analysis_read` scope and be stored as a secret.    | Yes      |                 |
| `DD_SITE`    | The [Datadog site][12] to send information to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

Provide the following inputs:

| Name           | Description                                                                                                                | Required | Default         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `subdirectory` | The subdirectory path the analysis should be limited to. The path is relative to the root directory of the repository.                  | No       |                 |

```bash
# Set the Datadog site to send information to
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog OSV Scanner:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# Install OSV Scanner
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
unzip /osv-scanner/osv-scanner.zip -d /osv-scanner
chmod 755 /osv-scanner/osv-scanner

# Run OSV Scanner and scan your dependencies
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Upload results to Datadog
datadog-ci sbom upload /tmp/sbom.json
```

## Select your source code management provider
Datadog SCA supports all source code management providers, with native support for GitHub, GitLab, and Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

If GitHub is your source code management provider, you must configure a GitHub App using the [GitHub integration tile][1] and set up the [source code integration][2] to see inline code snippets and enable [pull request comments][3].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][3].
- `Checks: Read & Write`, which allows you to create checks on SAST violations to block pull requests

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /integrations/guide/source-code-integration
[3]: /security/code_security/dev_tool_int/github_pull_requests

{{% /tab %}}
{{% tab "GitLab" %}}

<div class="alert alert-warning">
Repositories from GitLab instances are supported in closed Preview. <a href="https://www.datadoghq.com/product-preview/gitlab-source-code-integration/">Join the Preview</a>.
</div>

If GitLab is your source code management provider, before you can begin installation, you must request access to the closed Preview using the form above. After being granted access, follow [these instructions][1] to complete the setup process.

[1]: https://github.com/DataDog/gitlab-integration-setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

<div class="alert alert-warning">
Repositories from Azure DevOps are supported in closed Preview. Your Azure DevOps organizations must be connected to a Microsoft Entra tenant. <a href="https://www.datadoghq.com/product-preview/azure-devops-integration-code-security/">Join the Preview</a>.
</div>

If Azure DevOps is your source code management provider, before you can begin installation, you must request access to the closed Preview using the form above. After being granted access, follow the instructions below to complete the setup process.

**Note:** Azure DevOps Server is not supported.

### Create and register a Microsoft Entra app
If you are an admin in your Azure portal, you can configure Entra apps to connect your tenant to Datadog.

1. Navigate to [Code Security setup][1].
2. In **Activate scanning for your repositories**, click **Manage Repositories**.
3. Select **CI Pipelines**.
4. Select the scan types you want to use.
5. Select **Azure DevOps** as your source code management provider.
6. If this is your first time connecting an Azure DevOps organization to Datadog, click **Connect Azure DevOps Account**.
7. When connecting a Microsoft Entra tenant for the first time you will need to go to your [Azure Portal][2] to register a new application. During this creation process, ensure the following:
   1. You select **Accounts in this organizational directory only (Datadog, Inc. only - Single tenant)** as the account type.
   2. Set the redirect URI to **Web** and paste the URI given to you in the instructions.
8. Copy the values for **Application (client) ID** and **Directory (tenant) ID** and paste them into Datadog.
9. In the Azure Portal for your app registration, navigate to **Manage > Certificates & secrets** and switch to **Client secrets**.
10. Click **New client secret** and create a secret with your desired description and expiration values.
11. Copy and paste the string in the **Value** column for your new secret, paste it into Datadog, and click **Create Configuration** to complete connecting your Entra tenant to Datadog.
13. Add one or more Azure DevOps organizations by pasting the organization slug into Datadog and then adding your Service Principal as a user by going to **Organization settings > Users > Add users**.
    1.  Your Service Principal will need the **Basic** access level and at least the **Project Contributor** security group.
14. Click **Submit Organization**.

### Configure project service hooks

To enable all Code Security features in Azure DevOps, you'll need to use a [Datadog API key][3] to configure service hooks for your projects.

First, set your environment variables (note: the Datadog UI will fill these values out for you):
```shell
export AZURE_DEVOPS_TOKEN="..."                 # Client Secret Value
export DD_API_KEY="..."                         # Datadog API Key
```

Then, replace the placeholders in the script below with your [Datadog Site][5] and Azure DevOps organization name to configure the necessary service hooks on your organization's projects:
```shell
curl https://raw.githubusercontent.com/DataDog/azdevops-sci-hooks/refs/heads/main/setup-hooks.py > setup-hooks.py && chmod a+x ./setup-hooks.py
./setup-hooks.py --dd-site="<dd-site>" --az-devops-org="<org-name>"
```

Click [here][4] to see our CLI that automates this process.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/azdevops-sci-hooks
[5]: /getting_started/site/

{{% /tab %}}
{{% tab "Other" %}}

If you are using another source code management provider, configure SCA to run in your CI pipelines using the `datadog-ci` CLI tool and [upload the results](#upload-third-party-sbom-to-datadog) to Datadog.
You **must** run an analysis of your repository on the default branch before results can begin appearing on the **Code Security** page.

{{% /tab %}}
{{< /tabs >}}

## Upload third-party SBOM to Datadog

While Datadog preferred SBOM generator is [our own osv-scanner fork][10], it is possible to ingest a
third-party SBOM.

Our tooling supports the following SBOM standards:
 - [CycloneDX 1.4][18]
 - [CycloneDX 1.5][19]
 - [CycloneDX 1.6][20]

When ingesting a third-party SBOM, ensure that the following constraints are met:
 - The file checks the SBOM JSON schema
 - SBOM components have the type `library`
 - SBOM components have a valid `purl` attribute

Third-party SBOM files are uploaded to Datadog using the `datadog-ci` command. You can use the following
command to upload your third-party SBOM. Ensure the environment variables `DD_API_KEY`, `DD_APP_KEY` and `DD_SITE`
are set to your API key, APP key, and [Datadog site][12], respectively.

```bash
datadog-ci sbom upload /path/to/third-party-sbom.json
```

## Link results to Datadog services and teams
### Link results to services
Datadog associates static code and library scan results with relevant services by using the following mechanisms:

1. [Identifying the code location associated with a service using the Software Catalog.](#identifying-the-code-location-in-the-software-catalog)
2. [Detecting usage patterns of files within additional Datadog products.](#detecting-file-usage-patterns)
3. [Searching for the service name in the file path or repository.](#detecting-service-name-in-paths-and-repository-names)

If one method succeeds, no further mapping attempts are made. Each mapping method is detailed below.

#### Identifying the code location in the Software Catalog

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


If you want all the files in a repository to be associated with a service, you can use the glob `**/*` as follows:

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - "**/*"
{{< /code-block >}}

#### Detecting file usage patterns

Datadog detects file usage in additional products such as Error Tracking and associate
files with the runtime service. For example, if a service called `foo` has
a log entry or a stack trace containing a file with a path `/modules/foo/bar.py`,
it associates files `/modules/foo/bar.py` to service `foo`.

#### Detecting service name in paths and repository names

Datadog detects service names in paths and repository names, and associates the file with the service if a match is found.

For a repository match, if there is a service called `myservice` and
the repository URL is `https://github.com/myorganization/myservice.git`, then,
it associates `myservice` to all files in the repository.

If no repository match is found, Datadog attempts to find a match in the
`path` of the file. If there is a service named `myservice`, and the path is `/path/to/myservice/foo.py`, the file is associated with `myservice` because the service name is part of the path. If two services are present
in the path, the service name closest to the filename is selected.

### Link results to teams

Datadog automatically associates the team attached to a service when a violation or vulnerability is detected. For example, if the file `domains/ecommerce/apps/myservice/foo.py`
is associated with `myservice`, then the team `myservice` will be associated to any violation
detected in this file.

If no services or teams are found, Datadog uses the `CODEOWNERS` file in your repository. The `CODEOWNERS` file determines which team owns a file in your Git provider.

**Note**: You must accurately map your Git provider teams to your [Datadog teams][16] for this feature to function properly.

[1]: /security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: /security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /account_management/api-app-keys/
[7]: /integrations/github
[8]: /integrations/guide/source-code-integration
[9]: /security/code_security/dev_tool_int/github_pull_requests/
[10]: https://github.com/DataDog/osv-scanner
[11]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[12]: /getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action
[14]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sbom
[15]: https://docs.datadoghq.com/software_catalog/service_definitions/v3-0/
[16]: https://docs.datadoghq.com/account_management/teams/
[17]: https://app.datadoghq.com/source-code/repositories
[18]: https://cyclonedx.org/docs/1.4/json/
[19]: https://cyclonedx.org/docs/1.5/json/
[20]: https://cyclonedx.org/docs/1.6/json/
