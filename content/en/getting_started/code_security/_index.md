---
title: Getting Started with Code Security
aliases:
- /getting_started/code_analysis/
---

## Overview

Datadog Code Security helps you secure and maintain your applications’ first-party code and open source libraries from development to production.

It offers a suite of tools to help you secure your code throughout the software development lifecycle:

- **Static Code Analysis (SAST)** uses a Static Application Security Testing method to scan your repositories for security and quality issues in first-party code, providing suggested fixes to prevent these issues from reaching production.
- **Software Composition Analysis (SCA)** detects vulnerable open source libraries present in your repositories and affecting your services at runtime, helping you secure and maintain your software supply chain.
- **Runtime Code Analysis (IAST)** uses an Interactive Application Security Testing method to detect vulnerabilities affecting your services at runtime.

## Set up Code Security

### Open source libraries

Datadog Software Composition Analysis detects library vulnerabilities and catalogs dependencies within your codebase and running services.

See [Software Composition Analysis][1] to set up static and/or runtime library vulnerability detection.

### First-party code

{{< whatsnext desc="There are two ways to secure and maintain your first-party code with Datadog:">}}
    {{< nextlink href="security/code_security/static_analysis/setup/" >}}Static Code Analysis (SAST) Setup{{< /nextlink >}}
    {{< nextlink href="security/code_security/iast/setup/" >}}Runtime Code Analysis (IAST) Setup{{< /nextlink >}}
{{< /whatsnext >}}

## Developer tool integrations

### Enable pull request comments

Datadog can act as an automatic code reviewer to flag vulnerabilities and quality violations in GitHub pull requests. For more information, see [GitHub Pull Requests][2].

{{< img src="/security/application_security/code_security/github_suggestion.png" alt="Datadog code reviewing in Github" style="width:100%;" >}}

### Install IDE integrations

Install the [Datadog IDE plugins][5] to run Static Code Analysis (SAST) scans locally and see results directly in your code editor. You can detect and fix problems such as security vulnerabilities, maintainability issues, or bugs in your code before you commit your changes.

To start running code scans in your IDE, see the respective documentation for your code editor of choice.

{{< whatsnext desc="See the documentation for information about the following integrations:">}}
    {{< nextlink href="developers/ide_plugins/idea/#static-analysis" >}}<u>JetBrains IDEs</u>: IntelliJ IDEA, GoLand, PhpStorm, and PyCharm{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}<u>Visual Studio Code</u>{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}<u>Visual Studio</u>{{< /nextlink >}}
{{< /whatsnext >}}

### Customize your repository settings
In [Code Security Settings][3], you can manage which repositories have PR comments enabled, as well as [customize the configuration][11] of which Static Code Analysis (SAST) rules are applied across or within repositories. For all the default rules provided by Datadog, see the [SAST Rules][4].

### Set up Quality Gates

Datadog provides [Quality Gates][6] as a platform capability to help you maintain and enforce security and quality standards for changes introduced to your codebase. For more information, see [Quality Gate setup][7].

## Prioritize vulnerabilities with runtime context

Code Security offers **vulnerability-centric views** of all library and code vulnerabilities detected from both static repository scanning and runtime service detection.

### Explore vulnerabilities 

For library vulnerabilities, each row in the table represents a specific vulnerability affecting a library version. Based on if you have static or runtime detection enabled, the **Detected In** column displays the specific repositories and/or services affected by this vulnerability.

In the side panel for a single library vulnerability in SCA, in addition to details about the vulnerability, Datadog shows:

- A **Severity breakdown** of the highest severity instance of this vulnerability seen across your repositories and your services. For each detected location of the vulnerability in your repositories and/or services, Datadog adjusts the base severity score of the vulnerability based on environmental factors. To learn more, see [Datadog severity score][8].
- A **Repositories** table of all instances where the vulnerability was detected in your repositories. For each instance, Datadog shows whether the dependency is classified as direct or transitive, the remediation status of the vulnerability, as well as specific remediation steps.
- An **Impacted Services** table of all running services affected by this library vulnerability. A service is affected by a library vulnerability if the library was loaded at runtime and detected by Datadog’s application tracing libraries.

 Severities are scored by the following:
| CVSS Score    | Qualitative Rating
| --------------| -------------------|  
|   `0.0`         | None                |
|   `0.1 - 3.9`   | Low                 |
|   `4.0 - 6.9`   | Medium              |
|   `7.0 - 8.9`   | High                |
|   `9.0 - 10.0`  | Critical            |

### Explore results per repository

Code Security also offers **repository-centric views** of static scan results, supporting granular filtering across all branches and commits for scanned repositories.

Click on a repository on the **Repositories** page to access a more detailed view where you can customize the search query by branch (with the default branch appearing first) and by commit (starting with the latest). 

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

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

You can access suggested fixes directly from the results to address security vulnerabilities or improve code quality practices.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="A suggested code fix on the Fixes tab of a Code Analysis result" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

You can use the following out-of-the-box facets to create a search query for identifying and addressing security risks in third-party libraries in the **Library Vulnerabilities** tab or reviewing your library inventory in the **Library Catalog** tab.

| Facet Name         | Description                                                    |
|--------------------|----------------------------------------------------------------|
| Dependency Name    | Identifies the libraries by name.                              |
| Dependency Version | Filters by specific versions of libraries.                     |
| Language           | Sorts libraries by the programming language.                   |
| Score              | Sorts the risk or quality score of the dependencies.           |
| Severity           | Filters vulnerabilities based on their severity rating.        |
| Platform           | Distinguishes libraries by the platform they are intended for. |

You can access vulnerability reports and locate the source files where the vulnerability was discovered in your projects, along with information about the file’s code owners.

{{< img src="/security/application_security/code_security/sci_vulnerabilities.png" alt="A link to the source code directly in GitHub from a detected library vulnerability" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Notify, remediate, and report 

Code Security helps you set up workflows to track and manage remediation of findings:

- Set up [notification rules][9] to notify your team(s) of new findings via Slack, Jira, email, and more
- Track vulnerabilities by service and team in the **Code Security Summary** page.

## Link results to Datadog services and teams
### Link results to services
Datadog associates code and library scan results with relevant services by using the following mechanisms:

1. [Identifying the code location associated with a service using the Service Catalog.](#identifying-the-code-location-in-the-service-catalog)
2. [Detecting usage patterns of files within additional Datadog products.](#detecting-file-usage-patterns)
3. [Searching for the service name in the file path or repository.](#detecting-service-name-in-paths-and-repository-names)

If one method succeeds, no further mapping attempts are made. Each mapping method is detailed below.

#### Identifying the code location in the Service Catalog

The [schema version `v3`][12] and later of the Service Catalog allows you to add the mapping of your code location for your service. The `codeLocations` section specifies the location of the repository containing the code and its associated paths.

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
in the path, the service name the closest to the filename is selected.


### Link results to teams

Datadog automatically associates the team attached to a service when a violation or vulnerability is detected. For example, if the file `domains/ecommerce/apps/myservice/foo.py`
is associated with `myservice`, then the team `myservice` will be associated to any violation
detected in this file.

If no services or teams are found, Datadog uses the `CODEOWNERS` file in your repository. The `CODEOWNERS` file determines which team owns a file in your Git provider. 

**Note**: You must accurately map your Git provider teams to your [Datadog teams][10] for this feature to function properly.

[1]: /security/code_security/software_composition_analysis/
[2]: /security/code_security/dev_tool_int/github_pull_requests/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
[4]: /security/code_security/static_analysis/static_analysis_rules/
[5]: /security/code_security/dev_tool_int/ide_plugins/
[6]: /quality_gates/
[7]: /quality_gates/setup
[8]: /security/code_security/software_composition_analysis/#datadog-severity-score
[9]: https://app.datadoghq.com/security/configuration/notification-rules
[10]: /account_management/teams/
[11]: /security/code_security/static_analysis/setup/#customize-your-configuration
[12]: https://docs.datadoghq.com/service_catalog/service_definitions/v3-0/