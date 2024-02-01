---
title: Software Composition Analysis
kind: documentation
description: Learn about Datadog Software Composition Analysis to scan your imported open-source libraries for known security vulnerabilities before you ship to production.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/"
  tag: "Blog"
  text: "Enhance application security in production with Datadog Application Vulnerability Management"
- link: "/getting_started/application_security/software_composition_analysis"
  tag: "Documentation"
  text: "Getting Started with Software Composition Analysis"
- link: "/security/application_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Software Composition Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="Try the Beta!" >}}
Software Composition Analysis is part of the Code Analysis public beta.
{{< /callout >}}

## Overview

Software Composition Analysis (SCA) scans open source libraries imported into repositories through package managers such as `npm` for [known vulnerabilities][1]. SCA enables engineering teams to identify vulnerable libraries early on in the development life cycle so they can update them to non-vulnerable versions or remove them entirely to ensure their production codebase is secure.

SCA can run in CI pipelines by using [Code Analysis][3] and provide runtime monitoring capabilities by using [Datadog Application Security][1].

For more information, see the [Application Security documentation][4].

## Languages

SCA currently supports scanning the following languages and technologies for vulnerable libraries:

1. Go
2. Java
3. NodeJS
4. Python
5. Ruby

## Integrations

### CI providers
{{< whatsnext desc="With Software Composition Analysis, you can identify vulnerable open source libraries that have been imported into your codebase. See the documentation for information about the following integrations:">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

## Search and filter results

After you configure your CI pipelines to run Datadog SCA, violations are summarized per repository on the [Code Analysis page][1]. After drilling down to a specific repository, SCA results are divided into the **Library Vulnerabilities** and **Library List** lenses. 

* The **Library Vulnerabilities** lens contains the vulnerable library versions found by Datadog SCA.
* The **Library List** lens contains all the libraries (vulnerable or not) found by Datadog SCA.

To filter your results, use the facets to the left of the list, or search. 

Every row represents a unique library and version combination. Each combination is associated with the specific commit and branch that is selected in the filters at the top of the page (by default the latest commit on the default branch of the repository you are viewing).

Click on a library with a vulnerability to open a side panel that contains information about the scope of the violation and where it originated.
{{< img src="code_analysis/software_composition_analysis/sca-violation.png" alt="Side panel for a SCA violation" style="width:80%;">}} 

The content of the violation is shown in tabs:

* Full Description: A description of the vulnerability contained within this specific version of the library.
* Event: JSON metadata regarding the SCA violation event.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/application_security/software_composition_analysis
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /code_analysis/software_composition_analysis/setup
[4]: /security/application_security/software_composition_analysis/