---
title: Static Code Analysis (SAST)
description: Learn about Datadog Static Code Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
aliases:
- /code_analysis/static_analysis
is_beta: false
algolia:
  tags: ['static analysis', 'datadog static analysis', 'code quality', 'SAST']
further_reading:
- link: "https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/"
  tag: "Blog"
  text: "Using LLMs to filter out false positives from static code analysis"
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}


## Overview

Static Code Analysis is Datadog's Static Application Security Testing (SAST) capability. SAST is a clear-box software testing technique that analyzes a program's pre-production code without the need to execute the program.

Static Code Analysis helps you identify security vulnerabilities and maintainability issues early in the software development life cycle (SDLC) to ensure only the highest quality, most secure code makes it to production. It provides organizations with the following benefits:

* Applications are less vulnerable to security breaches over time, due to new vulnerabilities being caught through SAST scans before code reaches production.
* Takes the guesswork out of adhering to an organization's code standards, enabling your development team to ship compliant code without significant impacts to developer velocity.
* Onboard developers faster because Static Code Analysis enables an organization to maintain a more readable codebase over time.

## Set up Static Code Analysis

Static Code Analysis supports scanning for security vulnerabilities and poor coding practices in the following languages and technologies:

{{< partial name="code_security/languages-getting-started.html" >}}

<!-- </br>  -->
Scans can run via your CI/CD pipelines or directly in Datadog with hosted scanning.  
To get started, go to the [**Code Security** setup page][12] or see the [Setup documentation][9].

## Integrate into the development lifecycle

### Source code management
{{< whatsnext desc="During code reviews, Datadog can automatically flag Static Code Analysis violations in pull requests by adding inline review comments on the relevant line(s) of code. This is supported for GitHub, GitLab, and Azure DevOps repositories (cloud-hosted). When applicable, Datadog also provides suggested fixes that can be applied directly in the pull request." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}Pull Requests{{< /nextlink >}}
{{< /whatsnext >}}

### IDEs
{{< whatsnext desc="You can identify code vulnerabilities in real time as you edit a file in your Integrated Development Environment (IDE). See integration-specific documentation for more information:">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Datadog Plugin for JetBrains IDEs{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Datadog Extension for Visual Studio Code{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Datadog Extension for Visual Studio{{< /nextlink >}}
{{< /whatsnext >}}

## Search and filter results
After setting up Static Code Analysis, a scan is run on each commit to a scanned repository. Violations are summarized per repository on the [**Code Security Repositories** page][1]. Click on a repository to analyze **Code Vulnerabilities** and **Code Quality** results from Static Code Analysis.

* The **Code Vulnerabilities** tab contains the violations found by Datadog's rules in the [Security category][2].
* The **Code Quality** tab contains the violations found by Datadog's rules in the [Best Practices, Code Style, Error Prone, or Performance categories][3].

To filter your results, use the facets to the left of the list, or search. Results can be [filtered by service or team facets][13].

Every row represents a violation. Each violation is associated with the specific commit and branch that is selected in the filters at the top of the page (by default, results are shown for the latest commit on the default branch of the repository you are viewing).

Click on a violation to open a side panel that contains information about the scope of the violation and where it originated.

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="Side panel for a static analysis violation" style="width:80%;">}}  -->

The content of the violation is shown in tabs:

- **Details**: A description of the violation and the lines of code that caused it. To see the offending code snippet, configure the relevant source code integration for your provider ([GitHub][4], [GitLab][5], Azure[6]).
- **Remediation**: One or more code fixes that can resolve the violation, with options for remediation.
- **Event**: JSON metadata regarding the violation.

### Filter out false positives
For a subset of SAST vulnerabilities, Bits AI can review the context of the finding and assess whether it is more likely to be a true or false positive, along with a short explanation of the reasoning. Select the toggle "Filter out false positives" on the [SAST vulnerabilities explorer](https://app.datadoghq.com/security/code-security/sast) to quickly narrow down your initial list for triage. 

For each finding, you can provide Bits AI with feedback on its assessment.

{{% collapse-content title="Supported CWEs" level="h4" expanded=true id="id-for-anchoring" %}}
False positive filtering is supported for the following CWEs:
- [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78: OS Command Injection](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-90: LDAP Injection](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-501: Trust Boundary Violation](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-79: Cross-site Scripting](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-614: Insecure Cookie](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-327: Broken or Risky Cryptographic Algorithm](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-643: XPath Injection](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-94: Code Injection](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-284: Improper Access Control](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-502: Deserialization of Untrusted Data](https://cwe.mitre.org/data/definitions/502.html)
{{% /collapse-content %}}

## Customize your configuration
To customize which Static Code Analysis rules are configured in your repositories or across your organization, see the [Setup documentation][8].

## Link results to Datadog services and teams

### Link results to services
Datadog associates code and library scan results with relevant services by using the following mechanisms:

1. [Identifying the code location associated with a service using the Software Catalog.](#identifying-the-code-location-in-the-software-catalog)
2. [Detecting usage patterns of files within additional Datadog products.](#detecting-file-usage-patterns)
3. [Searching for the service name in the file path or repository.](#detecting-service-name-in-paths-and-repository-names)

If one method succeeds, no further mapping attempts are made. Each mapping method is detailed below.

#### Identifying the code location in the Software Catalog

The [schema version `v3`][12] and later of the Software Catalog allows you to add the mapping of your code location for your service. The `codeLocations` section specifies the location of the repository containing the code and its associated paths.

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

Datadog detects file usage in additional products such as Error Tracking and
files associated with the runtime service. For example, if a service called `foo` has
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
Datadog associates scan results with the team attached to a service. For example, if the file `domains/ecommerce/apps/myservice/foo.py`
is associated with `myservice`, then the team `myservice` will be associated to any violation
detected in this file.

If no services or teams are found, Datadog uses the `CODEOWNERS` file in your repository. The `CODEOWNERS` file determines which team owns a file in your Git provider.

**Note**: You must [accurately map][15] your Git provider teams to your [Datadog teams][14] for this feature to function properly.

## Apply suggested fixes
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="Fixes tab of a static analysis violation" style="width:80%;">}} -->

In Datadog Static Code Analysis, there are two types of suggested fixes:

1. **Deterministic Suggested Fix:** For simple violations like linting issues, the rule analyzer automatically provides templated fixes.
2. **AI-suggested Fix:** For complex violations, fixes are typically not available beforehand. Instead, you can use AI-suggested fixes, which use OpenAI's GPT-4 to generate a suggested fix. You can choose between "Text" and "Unified Diff" fixes, which outputs plain text instructions or a code change for resolving the violation, respectively.

<!-- {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="Visual indicator of a default static analysis suggested fix" style="width:60%;">}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="Visual indicator of an AI static analysis suggested fix" style="width:60%;">}} -->

### Fix a vulnerability or quality issue directly from Datadog

<!-- {{< img src="ci/sast_one_click_light.png" alt="Example of one-click remediation for Code Security" style="width:90%;" >}} -->

If GitHub is your source code manager, you can push a code change to fix a SAST issue directly from Datadog in two ways.

#### Open a pull request
If your GitHub app's **Pull Requests** permission is set to **Read & Write**, one-click remediation is enabled for all Static Code Analysis findings with an available suggested fix.

Follow these steps to fix a vulnerability and open a pull request:
1. View a specific SAST result in Code Security.
2. Click **Fix Violation** in the side panel of the result.
3. Select **Open a Pull Request**.
4. Enter a pull request title and commit message.
5. Click **Create PR**.

#### Commit directly to the current branch
You can also fix a vulnerability by committing directly to the branch the result was found on.

To commit a suggested fix:

1. View a specific SAST result in Code Security.
2. Click **Fix Violation** in the side panel of the result.
3. Click **Commit to current branch**.

## Report false positives
If you believe a specific violation is a false positive, you can flag it as a false positive with a reason for flagging, which sends a report directly to Datadog. Submissions are reviewed on a regular basis to improve ruleset quality over time.

<!-- {{< img src="code_security/static_analysis/flag-false-positive.png" alt="Button for reporting a Static Code Analysis violation as a false positive" style="width:60%;">}} -->

<!-- ## Further Reading

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /security/code_security/static_analysis_rules?categories=Security
[3]: /security/code_security/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /integrations/github/
[5]: /integrations/gitlab-source-code/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /security/code_security/static_analysis/setup
[10]: /security/code_security/dev_tool_int/github_pull_requests/
[11]: /getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup
[13]: https://docs.datadoghq.com/security/code_security/static_analysis/#link-results-to-datadog-services-and-teams
[14]: /account_management/teams/
[15]: /integrations/github/#connect-github-teams-to-datadog-teams
[16]: /integrations/azure-devops-source-code/
