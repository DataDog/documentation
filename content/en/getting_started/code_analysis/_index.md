---
title: Getting Started with Code Analysis
further_reading:
- link: 'https://www.datadoghq.com/blog/datadog-code-analysis/'
  tag: 'Blog'
  text: 'Ship high-quality, secure code faster with Datadog Code Analysis'
- link: 'https://www.datadoghq.com/blog/datadog-software-composition-analysis/'
  tag: 'Blog'
  text: 'Mitigate vulnerabilities from third-party libraries with Datadog Software Composition Analysis'
- link: '/code_analysis/'
  tag: 'Documentation'
  text: 'Learn about Code Analysis'
- link: '/security/application_security/software_composition_analysis'
  tag: 'Documentation'
  text: 'Learn about Software Composition Analysis'
algolia:
  tags: ["code analysis", "code analysis datadog", "code analysis ci pipeline", "code analysis ci pipelines"]
---

## Overview

[Datadog Code Analysis][1] allows you to identify and resolve code quality issues and security vulnerabilities before deploying to production, ensuring safe and clean code throughout the software development lifecycle. 

{{< img src="/code_analysis/repositories.png" alt="Session Replay available button, as well as visualization options" style="width:100%" >}}

Code Analysis offers a comprehensive suite of tools, including [Static Analysis][2] and [Software Composition Analysis][3], to improve overall software delivery.

* Static Analysis (SAST) scans your repositories for quality and security issues in first-party code, and suggests fixes to prevent these issues from impacting production.
* Software Composition Analysis (SCA) scans your codebase for imported open source libraries, helping you manage your dependencies and secure your applications from external threats.

By using [`datadog-ci`][5], you can integrate analyses from other providers into your development workflow, allowing you to send Static Analysis and SCA results directly to Datadog. You can access the latest scan results for each repository on the [**Repositories** page][6] to effectively monitor and enhance code health across all branches.

## Set up Code Analysis

You can configure Code Analysis to run scans on code directly in Datadog or on code running in your CI pipelines. To get started, navigate to [**Software Delivery** > **Code Analysis** > **Repositories**][6] and click **+ Add a Repository**.

{{< tabs >}}
{{% tab "Datadog Hosted" %}}

Enable Code Analysis on your GitHub repositories for each GitHub Account you’ve added by setting up the [GitHub integration][101].

{{< img src="/code_analysis/setup/enable_account.png" alt="Session Replay available button, as well as visualization options" style="width:100%" >}}

You can either enable Software Composition Analysis (SCA) to scan for vulnerabilities, licensing issues, and supply chain risks in your open source libraries for all repositories, or you can enable SCA for individual repositories in the **Repositories** side panel.

{{< img src="/code_analysis/setup/enable_repository.png" alt="Session Replay available button, as well as visualization options" style="width:100%" >}}

[101]: /integrations/github/

{{% /tab %}}
{{% tab "In CI Pipelines" %}}

Select from the following types of scans you want to run in your repository.

* [Static Analysis][101]: Examine your code for poor practices and vulnerabilities.
* [Software Composition Analysis][102]: Check your third-party libraries for vulnerabilities.

Select a source code management (SCM) provider such as [GitHub](#github) or [another provider](#other-providers). 

### GitHub

If you are using a GitHub repository, you can set up the [GitHub integration][103] and connect your repository to enable Static Analysis and Software Composition Analysis scans.

{{< img src="/getting_started/code_analysis/github_accounts.png" alt="Click the Connect Repositories button for your GitHub account." style="width:100%" >}}

Comments in [GitHub pull requests][105] are enabled by default. Click **Connect Repositories** on the Code Analysis Setup page and hover over the Missing flag on the PR Permissions column to see which permissions you need to update for your account.

{{< img src="/getting_started/code_analysis/missing_permissions.png" alt="Hover over the Missing pill to see which permissions must be updated for your repository." style="width:100%" >}}

To disable this feature, navigate to the [**Code Analysis Settings** page][106] and click the toggle in the GitHub Comments column.

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="Click the toggle in the GitHub Comments column to enable or disable Code Analysis for a connected GitHub repository." style="width:100%" >}}

### Other providers

For other providers, you can run the Datadog CLI directly in your CI pipeline platform. For more information, see [Generic CI Providers for Static Analysis][107] and [Generic CI Providers for Software Composition Analysis][108].

You must [run an analysis of your repository](#run-code-analysis-in-your-ci-provider) on the default branch for results to start appearing on the [**Repositories** page][109].

## Run Code Analysis in your CI provider

To upload results to Datadog, ensure you have a [Datadog API key and application key][110]. 

Specify a name for the service or library in the `dd_service` field such as `shopist`.

### GitHub Action

You can configure a GitHub Action to run Static Analysis and Software Composition Analysis scans as part of your CI workflows.

Create a `.github/workflows/datadog-static-analysis.yml` file in your repository with the following content:

```yaml
on: [push]

name: Datadog Static Analysis

jobs:
  static-analysis:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check code meets quality and security standards
      id: datadog-static-analysis
      uses: DataDog/datadog-static-analyzer-github-action@v1
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_service: shopist
        dd_env: ci
        dd_site: datadoghq.com
        cpu_count: 2
```

Then, create a `.github/workflows/datadog-sca.yml` file in your repository with the following content:

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
        dd_service: shopist
        dd_env: ci
        dd_site: datadoghq.com
```

### Customizable script

You can upload a SARIF report with Static Analysis results or an SBOM report with Software Composition Analysis results to Datadog using the [datadog-ci NPM package][111].

#### Static Analysis

To upload Static Analysis reports to Datadog, you must install Unzip and Node.js version 14 or later.

Add the following content to your CI pipeline configuration:

```shell
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci 
                
# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip

curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer
                
# Run Static Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif
                
# Upload results
datadog-ci sarif upload /tmp/report.sarif --service "shopist" --env "ci"
```

#### Software Composition Analysis

To upload Software Composition Analysis results to Datadog, you must install Trivy and Node.js version 14 or later.

Add the following content to your CI pipeline configuration:

```shell
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"
                        
# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog OSV Scanner:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# Install OSV Scanner
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
cd /osv-scanner && unzip osv-scanner.zip
chmod 755 /osv-scanner/osv-scanner

# Output OSC Scanner results
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Upload results
datadog-ci sbom upload --service "shopist" --env "ci" /tmp/sbom.json
```

Once you’ve configured these scripts, run an analysis of your repository on the default branch. Then, results will start appearing on the **Repositories** page.

[101]: /code_analysis/static_analysis
[102]: /code_analysis/software_composition_analysis
[103]: /integrations/github
[104]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
[105]: /code_analysis/github_pull_requests
[106]: https://app.datadoghq.com/ci/settings/code-analysis
[107]: /code_analysis/static_analysis/generic_ci_providers
[108]: /code_analysis/software_composition_analysis/generic_ci_providers
[109]: https://app.datadoghq.com/ci/code-analysis
[110]: /account_management/api-app-keys/
[111]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{< /tabs >}}

## Run Static Analysis in an IDE

Install the [Datadog IDE plugins][7] to run Static Analysis scans locally and see results directly in your code editor. You can detect and fix problems such as maintainability issues, bugs, or security vulnerabilities in your code before you commit your changes. 

To start running Static Analysis scans in your IDE, see the respective documentation for your code editor of choice.

{{< partial name="code_analysis/ide-plugins.html" >}}

</br>


## Enable Code Analysis comments in GitHub pull requests

You can integrate Code Analysis with GitHub pull requests to automatically flag code violations and enhance code quality in the review process. 

{{< img src="/getting_started/code_analysis/github_suggestion.png" alt="A suggestion from Code Analysis in a GitHub pull request" style="width:100%" >}}

When configured, Code Analysis directly comments on the PR, indicating violations with details such as the name, ID, severity, and suggested fixes, which you can directly apply from the GitHub UI. 

After adding the [appropriate configuration files][10] to your repository, create a [GitHub App][11] in Datadog (a new app or an update to an existing one). Ensure it has the proper read and write access to pull requests. 

Once you've configured your app, navigate to the **Code Analysis Settings** page and click the toggle in the **GitHub Comments** column for each repository. 

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="Toggles for each repository to enable or disable Code Analysis comments in GitHub pull requests" style="width:100%" >}}

For more information, see [GitHub Pull Requests][12].

## Search and manage repositories

Click on a repository on the [**Repositories** page][6] to access a more detailed view where you can customize the search query by branch (with the default branch appearing first) and by commit (starting with the latest). 

{{< img src="/getting_started/code_analysis/sca_vulnerabilities.png" alt="The Library Vulnerabilities view of the Code Analysis results from a repository's default branch and latest commit" style="width:100%" >}}

{{< tabs >}}
{{% tab "Static Analysis" %}}

You can use the following out-of-the-box facets to create a search query for identifying and resolving poor coding practices in the **Code Quality** tab or security risks in the **Code Vulnerabilities** tab.

| Facet Name                        | Description                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Result Status                     | Filters results based on the completion status of the analysis.         |
| Rule ID                           | Specific rules that triggered the findings.                             |
| Tool Name                         | Determines which tools contributed to the analysis.                     |
| CWE (Common Weakness Enumeration) | Filters findings by recognized vulnerability categories.                |
| Has Fixes                         | Filters issues for which suggested fixes are available.                 |
| Result Message                    | Contains concise descriptions or messages associated with the findings. |
| Rule Description                  | Contains the rationale behind each rule.                                |
| Source File                       | Contains the files where issues were detected.                          |
| Tool Version                      | Filters results by the version of the tools used.                       |

You can access suggested fixes directly from the results to improve code quality practices and address security vulnerabilities.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="A suggested code fix on the Fixes tab of a Code Analysis result" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

You can use the following out-of-the-box facets to create a search query for identifying and addressing security risks in third-party libraries in the **Library Vulnerabilities** tab or looking at your library inventory in the **Library Catalog** tab.

| Facet Name         | Description                                                    |
|--------------------|----------------------------------------------------------------|
| Dependency Name    | Identifies the libraries by name.                              |
| Dependency Version | Filters by specific versions of libraries.                     |
| Language           | Sorts libraries by the programming language.                   |
| Score              | Sorts the risk or quality score of the dependencies.           |
| Severity           | Filters vulnerabilities based on their severity rating.        |
| Platform           | Distinguishes libraries by the platform they are intended for. |

You can access vulnerability reports and locate the source files where the vulnerability was discovered in your projects, along with information about the file’s code owners.

{{< img src="/getting_started/code_analysis/sci_vulnerabilities.png" alt="A link to the source code directly in GitHub from a detected library vulnerability" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Explore results in the Service Catalog

You can analyze CI pipelines associated with your services and code violations identified from Static Analysis to troubleshoot slowdowns and failures. Navigate to [**Service Management** > **Services** > **Service Catalog**][13] and click on the **Delivery** view to analyze the pre-production status of your services. 

{{< img src="/getting_started/code_analysis/catalog_view.png" alt="A link to the source code directly in GitHub from a detected library vulnerability" style="width:100%" >}}

Click on a service to access information about CI pipelines from Pipeline Visibility, in addition to security vulnerabilities and code quality issues from Code Analysis on the **Delivery** tab of the side panel.

{{< img src="/getting_started/code_analysis/catalog_service.png" alt="A link to the source code directly in GitHub from a detected library vulnerability" style="width:100%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_analysis/
[2]: /code_analysis/static_analysis
[3]: /code_analysis/software_composition_analysis
[4]: /security/application_security/software_composition_analysis
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /code_analysis/ide_plugins
[9]: https://app.datadoghq.com/dash/integration/31166/software-delivery---static-analysis-overview
[10]: /code_analysis/static_analysis/github_actions/
[11]: /code_analysis/github_pull_requests/#update-an-existing-github-app
[12]: /code_analysis/github_pull_requests
[13]: https://app.datadoghq.com/services 