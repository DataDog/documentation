---
title: Set up static SCA in your repositories
description: Learn about Datadog Software Composition Analysis to scan your imported open-source libraries for known security vulnerabilities before you ship to production.
disable_toc: false
aliases:
- /code_analysis/software_composition_analysis/generic_ci_providers/
- /code_analysis/software_composition_analysis/github_actions/
- /code_analysis/software_composition_analysis/setup/
---

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


## Search and filter results

<!-- <div class="alert alert-info">Datadog Software Composition Analysis can find vulnerable libraries across the software development lifecycle (SDLC). Code Security summarizes results found by directly scanning your repositories. To view all vulnerabilities found in repositories and at runtime consolidated together, see <a href="/security/code_security/software_composition_analysis" target="_blank">Application Security</a> for more details.</div> -->

After you configure your CI pipelines to run Datadog SCA, violations are summarized per repository on the [**Code Security Repositories** page][4]. Click on a repository to analyze **Library Vulnerabilities** and **Library Catalog** results from Software Composition Analysis. 

* The **Library Vulnerabilities** tab contains the vulnerable library versions found by Datadog SCA.
* The **Library Catalog** tab contains all of the libraries (vulnerable or not) found by Datadog SCA.

See the documentation for your CI provider in **GitHub Actions** and **Generic CI Providers** below.

## GitHub Actions

Run a Datadog Software Composition Analysis job in your GitHub Action workflows. This action invokes
[Datadog osv-scanner][10] on your codebase and uploads the results into Datadog.

### Library Inventory Generation

The GitHub Action generates an inventory of libraries automatically based on the libraries that are declared in your repository.

The GitHub Action works for the following languages and following files:

 - JavaScript/TypeScript: `package-lock.json` and `yarn.lock`
 - Python: `requirements.txt` (with version defined) and `poetry.lock`
 - Java: `pom.xml`
 - C#
 - Ruby
 - ... and more languages

### Setup

#### Set up keys

Add `DD_APP_KEY` and `DD_API_KEY` as secrets in your [GitHub Actions Settings][11]. Please ensure your Datadog application key has the `code_analysis_read` scope. For more information, see [API and Application Keys][6].

#### Workflow

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
        dd_service: my-app
        dd_env: ci
        dd_site: "datadoghq.com"
```

### Related Datadog tools

[Datadog Static Analysis][5] analyzes your code and provides feedback in your IDE, GitHub PR or within the
Datadog environment. Datadog Static Analysis can be set up using the [`datadog-static-analyzer-github-action`][13] 
GitHub action.

## Generic CI Providers

If you don't use GitHub Actions, you can run the Datadog CLI directly in your CI pipeline platform.

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
| `service`      | The name of the service to tag the results with.                                                                           | Yes      |                 |
| `env`          | The environment to tag the results with. `ci` is a helpful value for this input.                                           | No       | `none`          |
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
Datadog SCA supports all source code management providers, with native support for GitHub.
### Set up the GitHub integration 
If GitHub is your source code management provider, you must configure a GitHub App using the [GitHub integration tile][7] and set up the [source code integration][8] to see inline code snippets and enable [pull request comments][9].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog.
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][9].

### Other source code management providers
If you are using another source code management provider, configure SCA to run in your CI pipelines using the `datadog-ci` CLI tool and [upload the results][8] to Datadog.
You **must** run an analysis of your repository on the default branch before results can begin appearing on the **Code Security** page.

[1]: /security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /account_management/api-app-keys/
[7]: /integrations/github
[8]: /integrations/guide/source-code-integration
[9]: /security/code_security/dev_tool_int/github_pull_requests/
[10]: /actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[11]: /actions/security-guides/
[12]: /getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action