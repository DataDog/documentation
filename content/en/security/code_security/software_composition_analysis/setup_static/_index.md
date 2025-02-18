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

To set up Datadog Static Code Analysis in-app, navigate to [**Security** > **Code Security**][1].

## Select where to run static SCA scans

### Scan with Datadog-hosted scanning
For GitHub repositories, you can run Datadog SCA scans directly on Datadog's infrastructure. To get started, navigate to the [**Code Security** page][1].

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