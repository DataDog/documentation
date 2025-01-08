---
title: Software Composition Analysis (SCA)
description: Learn about Datadog Software Composition Analysis to scan your imported open-source libraries for known security vulnerabilities before you ship to production.
is_beta: false
further_reading:
- link: "https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/"
  tag: "Blog"
  text: "Enhance application security in production with Software Composition Analysis"
- link: "https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/"
  tag: "Blog"
  text: "Prioritize vulnerability remediation with Datadog SCA"
- link: "/getting_started/application_security/software_composition_analysis"
  tag: "Documentation"
  text: "Getting Started with Software Composition Analysis"
- link: "/security/code_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
algolia:
  tags: ['software composition analysis', 'datadog software composition analysis', 'library vulnerabilities', 'SCA']
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Software Composition Analysis is in Preview.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

Software Composition Analysis (SCA) scans open source libraries imported into repositories through package managers such as `npm` for [known vulnerabilities][1], and creates a catalog of libraries used across your repositories that identifies risky licenses, end-of-life libraries, and vulnerabilities to ensure a high quality, secure codebase.

SCA scans can be run directly through Datadog or in your CI pipelines using [Code Analysis][3] to detect library vulnerabilities before they reach production. Datadog also offers runtime detection through [Datadog Application Security][1].

## Set up Software Composition Analysis

SCA supports scanning for libraries in the following languages and technologies:

{{< partial name="code_analysis/sca-getting-started.html" >}}

To get started, set up Software Composition Analysis on the [**Code Analysis** page][2] or see the [Setup documentation][3].

### Lockfiles

SCA scans libraries contained in your lockfiles. The following lockfiles are supported:

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

## Integrate Software Composition Analysis into your software development lifecycle

### CI providers
{{< whatsnext desc="You can run SCA on any CI platform provider of your choice. See provider-specific documentation to set up SCA in your CI pipelines:">}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/#github-actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/#generic-ci-providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Search and filter results

<div class="alert alert-info">Datadog Software Composition Analysis can find vulnerable libraries across the software development lifecycle (SDLC). Code Analysis summarizes results found by directly scanning your repositories. To view all vulnerabilities found in repositories and at runtime consolidated together, see <a href="/security/code_security/software_composition_analysis" target="_blank">Application Security</a> for more details.</div>

After you configure your CI pipelines to run Datadog SCA, violations are summarized per repository on the [**Code Analysis Repositories** page][4]. Click on a repository to analyze **Library Vulnerabilities** and **Library Catalog** results from Software Composition Analysis. 

* The **Library Vulnerabilities** tab contains the vulnerable library versions found by Datadog SCA.
* The **Library Catalog** tab contains all of the libraries (vulnerable or not) found by Datadog SCA.

To filter your results, use the facets to the left of the list or the search bar at the top. Results can be filtered by service or team facets. For more information about how results are linked to Datadog services and teams, see [Getting Started with Code Analysis][5].

Every row represents a unique library and version combination. Each combination is associated with the specific commit and branch that is selected in the filters at the top of the page (by default, the latest commit on the default branch of the repository you selected).

Click on a library with a vulnerability to open a side panel that contains information about the scope of the violation and where it originated.

{{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Side panel for a SCA violation" style="width:80%;">}}

The content of the violation is shown in tabs:

- **Full Description**: A description of the vulnerability contained within this specific version of the library.
- **Event**: JSON metadata regarding the SCA violation event.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
