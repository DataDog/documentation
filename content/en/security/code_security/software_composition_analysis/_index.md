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

Datadog SCA uses a curated proprietary database. The database is sourced from Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), GitHub advisories, and other language ecosystem advisories, as well as Datadog's own Security Research team's findings.

## Set up Software Composition Analysis
The following languages and technologies are supported:

{{< partial name="code_security/sca-getting-started.html" >}}

SCA supports both static and runtime dependency detection:
- For static detection, you can scan via your CI/CD pipelines or directly via Datadog with hosted scanning (GitHub-only). Go to the [Code Security setup page][13] or see [static setup][1] to get started.
- For runtime detection, you can easily enable SCA on your services instrumented with Datadog APM. See [runtime setup][2] to get started.

## Search and filter results
### Vulnerabilities explorer
The [Vulnerabilities][11] explorer provides a vulnerability-centric view of library vulnerabilities detected by SCA, alongside vulnerabilities detected by other Code Security capabilities (SAST and IAST). All vulnerabilities shown in this explorer are detected on the default branch of a scanned repository and/or affecting a running service.

### Datadog severity score
Each vulnerability has a defined base severity score. To assist in prioritizing remediation, Datadog modifies the base CVSS score into the Datadog Severity Score by considering evidence of suspicious requests or attacks, the business sensitivity or internet exposure of the environment, and the risk of a successful exploit.

Four score modifiers may apply to a base score. Two are provided by runtime context:
 - Vulnerability is in production
 - Service affected by vulnerability is under attack

Two are provided by CVE context:
 - Whether an exploit is available
 - The exploitation probability

Datadog shows how the base CVSS score is adjusted to the Datadog Severity Score based on the factors above.

### Repositories explorer
The [Repositories][12] explorer provides a repository-centric view of all scan results across Static Code Analysis (SAST) and Software Composition Analysis (SCA). Click on a repository to analyze **Library Vulnerabilities** and **Library Catalog** results from SCA scoped to your chosen branch and commit.
* The **Library Vulnerabilities** tab contains the vulnerable library versions found by Datadog SCA
* The **Library Catalog** tab contains all of the libraries (vulnerable or not) found by Datadog SCA.

Recommended steps for remediating detected vulnerabilities can be found in the side panel for each vulnerability in SCA. Steps are provided for upgrading the library to the safest (non-vulnerable) version, as well as the closest version.

To filter your results, use the facets to the left of the list or the search bar at the top. Results can be filtered by service or team facets. For more information about how results are linked to Datadog services and teams, see [Getting Started with Code Security][5].

Every row represents a unique library and version combination. Each combination is associated with the specific commit and branch that is selected in the filters at the top of the page (by default, the latest commit on the default branch of the repository you selected).

Click on a library with a vulnerability to open a side panel that contains information about remediation steps.

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Side panel for a SCA violation" style="width:80%;">}} -->

### Library inventory
The Libraries [Inventory][8] helps you understand the list of libraries and its versions that are used in both your codebase and running on deployed services. For each library version, you can assess how often it is used, its license riskiness, and understand the health of each library (e.g. if it has reached EOL, if it is unmaintained, etc.)


### Library vulnerability context in APM
SCA enriches the information Application Performance Monitoring (APM) is already collecting by flagging libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the **Security** view embedded in the [APM Service Catalog][10].
- Whether it is reaching end of life
- Whether it is a malicious package
- The health of this library version based on its OpenSSF scorecard breakdown 
- Software supply chain & Software Bill of Materials (SBOM) management

<!-- ### Remediation

The Vulnerability Explorer offers remediation recommendations for detected vulnerabilities. Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking. They also include a collection of links and references to websites or information sources to help you understand the context behind each vulnerability. -->

<!-- **Note**: To create Jira issues for SCA vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][11] documentation, as well as the [Role Based Access Control][9] documentation. -->

[1]: /security/code_security/software_composition_analysis/setup_static/
[2]: /security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: /getting_started/code_security/
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis