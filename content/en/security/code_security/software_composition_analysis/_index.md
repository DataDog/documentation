---
title: Software Composition Analysis
disable_toc: false
aliases:
- /security/application_security/software_composition_analysis/setup/
- /security/application_security/software_composition_analysis/
- /code_analysis/software_composition_analysis/
---
## Overview
Software Composition Analysis (SCA) detects open source libraries in both your repositories and running services, providing end-to-end visibility of library vulnerabilities and license management from development to production.

Using Software Composition Analysis provides organizations with the following benefits:
- Identification of emerging and known vulnerabilities affecting open source libraries
- Risk-based prioritization and remediation based on runtime detection of vulnerabilities
- Identification of malicious packages, end-of-life libraries, and library riskiness based on OpenSSF standards

### Static vulnerability detection in repositories
SCA supports scanning for libraries in the following languages and technologies:
SCA detects open source libraries imported into your repositories by scanning dependency management and manifest files.
SCA detects open source libraries imported into your repositories by scanning dependency management and manifest files.
SCA supports scanning for libraries in the following languages and technologies:

{{< partial name="code_security/sca-getting-started.html" >}}
SCA supports scanning for libraries in the following languages and technologies:
### Runtime vulnerability detection in services
{{< partial name="code_security/sca-getting-started.html" >}}
SCA can also detect vulnerable libraries running in your services based on your Datadog application telemetry.

Runtime detection allows for risk-based prioritization of library vulnerabilities in your deployment environments.

{{< partial name="code_security/sca-getting-started.html" >}}
## Search and filter results
### Library Catalog
{{< partial name="code_security/sca-getting-started.html" >}}
The Datadog SCA [Library Catalog][8] helps you understand the list of libraries and its versions that compose your application.

For each library version, you can assess:
- How often it is used across your codebase and running in your services

### Vulnerability Explorer
The Vulnerability Explorer lists library vulnerabilities detected by SCA, alongside vulnerabilities detected by other Code Security capabilities (SAST and IAST).

#### Datadog severity score

Each vulnerability has a defined base severity score. To assist in prioritizing remediation, Datadog modifies the base CVSS score into the Datadog Severity Score by considering evidence of suspicious requests or attacks, the business sensitivity or internet exposure of the environment, and the risk of a successful exploit.

Four score modifiers may apply to a base score. Two are provided by runtime context:
 - Vulnerability is in production
 - Service affected by vulnerability is under attack

Two are provided by CVE context:
 - Whether an exploit is available
 - The exploitation probability

Datadog shows how the base CVSS score is adjusted to the Datadog Severity Score based on the factors above.

## Track and remediate vulnerabilities 
The Repositories page provides a repository-oriented view of your libraries and library vulnerabilities found from static scanning (either from scanning directly with Datadog or through your CI pipelines). 
Recommended steps for remediating detected vulnerabilities can be found in the side panel for each vulnerability in SCA.




Steps are provided for upgrading the library to the safest (non-vulnerable) version, as well as the closest version.


Steps are provided for upgrading the library to the safest (non-vulnerable) version, as well as the closest version.


Steps are provided for upgrading the library to the safest (non-vulnerable) version, as well as the closest version.

From the Repositories page, click on a repository to analyze **Library Vulnerabilities** and **Library Catalog** results from SCA.

* The **Library Vulnerabilities** tab contains the vulnerable library versions found by Datadog SCA.
* The **Library Catalog** tab contains all of the libraries (vulnerable or not) found by Datadog SCA.

To filter your results, use the facets to the left of the list or the search bar at the top. Results can be filtered by service or team facets. For more information about how results are linked to Datadog services and teams, see [Getting Started with Code Analysis][5].

Every row represents a unique library and version combination. Each combination is associated with the specific commit and branch that is selected in the filters at the top of the page (by default, the latest commit on the default branch of the repository you selected).

Click on a library with a vulnerability to open a side panel that contains information about remediation steps.

{{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Side panel for a SCA violation" style="width:80%;">}}

### Library vulnerability context in APM

SCA enriches the information Application Performance Monitoring (APM) is already collecting by flagging libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the **Security** view embedded in the [APM Service Catalog][10].
- Whether it is reaching end of life
- Whether it is a malicious package
- The health of this library version based on its OpenSSF scorecard breakdown 
- Software supply chain & Software Bill of Materials (SBOM) management

Datadog SCA uses a curated proprietary database. The database is sourced from Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), GitHub advisories, and other language ecosystem advisories, as well as Datadog's own Security Research team's findings.

## SCA static scans

SCA scans open source libraries imported into repositories through package managers such as npm for known vulnerabilities, and creates a catalog of libraries used across your repositories that identifies risky licenses, end-of-life libraries, and vulnerabilities to ensure a high quality, secure codebase.

SCA scans can be run directly through Datadog (Datadog-hosted) or in your CI pipelines using Code Analysis to detect library vulnerabilities before they reach production.

For set up instructions, see [SCA Static Setup][1].

## SCA runtime scans

SCA scans the production applications already running in your Datadog deployment.

Datadog SCA uses a curated proprietary database. The database is sourced from Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), GitHub advisories, and other language ecosystem advisories. Additionally, the Datadog Security research team evaluates vulnerabilities and malware findings. For more information, see the GuardDog GitHub project.

For set up instructions, see [Runtime Setup][2].

### Library inventory

The Datadog SCA [Library Inventory][8] helps you understand the list of libraries and its versions that compose your application.

With Datadog SCA spanning your software development lifecycle from code to production, it detects libraries throughout the lifecycle of an application and alerts you to vulnerabilities, risks, licenses, and more.


### Datadog severity score

Each vulnerability has a defined base severity score. To assist in prioritizing remediation, Datadog modifies the base CVSS score into the Datadog Severity Score by considering evidence of suspicious requests or attacks, the business sensitivity or internet exposure of the environment, and the risk of a successful exploit.

Four score modifiers may apply to a base score. Two are provided by runtime context:
 - Vulnerability is in production
 - Service affected by vulnerability is under attack

Two are provided by CVE context:
 - Whether an exploit is available
 - The exploitation probability

Datadog shows how the base CVSS score is adjusted to the Datadog Severity Score based on the factors above.


See [Getting Started with Software Composition Analysis][7] for more information on the adjusted vulnerability score.

### Remediation

The Vulnerability Explorer offers remediation recommendations for detected vulnerabilities. Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking. They also include a collection of links and references to websites or information sources to help you understand the context behind each vulnerability.

**Note**: To create Jira issues for SCA vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][11] documentation, as well as the [Role Based Access Control][9] documentation.

## Risk information in APM views

Software Composition Analysis enriches the information APM is already collecting, and flags libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the **Security** view embedded in the [APM Service Catalog][10].

[1]: /security/code_security/software_composition_analysis/setup_static/
[2]: /security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[7]: /getting_started/application_security/software_composition_analysis
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
