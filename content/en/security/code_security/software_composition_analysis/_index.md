---
title: Software Composition Analysis
disable_toc: false
aliases:
- /security/application_security/software_composition_analysis/setup/
- /security/application_security/software_composition_analysis/
- /code_analysis/software_composition_analysis/
- /security/application_security/vulnerability_management/

further_reading:
  - link: https://www.datadoghq.com/blog/code-security-secret-scanning
    tag: Blog
    text: Detect and block exposed credentials with Datadog Secret Scanning

---
## Overview

Software Composition Analysis (SCA) detects open source libraries in both your repositories and running services, providing end-to-end visibility of library vulnerabilities and license management from development to production.

Using Software Composition Analysis provides organizations with the following benefits:
- Identification of emerging and known vulnerabilities affecting open source libraries
- Risk-based prioritization and remediation based on runtime detection of vulnerabilities
- Identification of malicious packages, end-of-life libraries, and library riskiness based on OpenSSF standards

Datadog SCA uses a curated proprietary database. The database is sourced from Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), GitHub advisories, and other language ecosystem advisories, as well as Datadog's own Security Research team's findings. There is a maximum of 2 hours between when a new vulnerability is published and when it appears in Datadog, with emerging vulnerabilities typically appearing in Datadog within minutes.

## Set up Software Composition Analysis

{{% security-products/sca-supported-lang %}}  

SCA supports both static and runtime dependency detection:
- For **static detection**, you can scan your repositories from your CI/CD pipelines or directly from Datadog's infrastructure. See [static setup][1] to get started.
- For **runtime detection**, you can enable SCA on services instrumented with Datadog APM. See [runtime setup][2] to get started.

## Search and filter results
### Vulnerabilities explorer
The [Vulnerabilities][11] explorer provides a vulnerability-centric view of library vulnerabilities detected by SCA, alongside vulnerabilities detected by other Code Security capabilities (SAST and IAST). All vulnerabilities in the explorer are either detected on the default branch at the last commit of a scanned repository, or are affecting a running service.

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

The [Library Inventory][8] provides visibility into the third-party libraries detected across your codebase. Datadog collects this information from:

* **Static SCA**, which identifies all libraries referenced in your repositories, and  
* **Runtime SCA**, which detects libraries that are actually loaded and used by your services at runtime.

Use the Library Inventory to understand which dependencies you rely on, where they are used, and whether they contain known vulnerabilities or license risks.

To learn more about how the inventory is generated, how Static and Runtime data differ, and how to interpret the library details (usage, vulnerabilities, licenses, versions, and OpenSSF score), see [Library Inventory][14].

### Library vulnerability context in APM
SCA enriches the information Application Performance Monitoring (APM) is already collecting by flagging libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the **Security** view embedded in the [APM Software Catalog][10].
- Whether it is reaching end of life
- Whether it is a malicious package
- The health of this library version based on its OpenSSF scorecard breakdown
- Software supply chain & Software Bill of Materials (SBOM) management


### Vulnerability lifecycle
Vulnerabilities detected in libraries by SCA **at runtime** are closed by Datadog after a certain period, depending on the service's usage of the vulnerable library.

- **Hot Libraries:**
Libraries from services that are alive for more than 2 hours.
  - **When vulnerabilities are auto-closed by Datadog:** After 1 hour, if they are not detected again and the service is running on all environments where the vulnerability was detected.

- **Lazy Libraries:**
Libraries that are loaded more than 1 hour after the service has started.
  - **When vulnerabilities are auto-closed by Datadog:** After 5 days, if they have not been detected again during this period.

- **Cold Libraries:**
Libraries from services that are alive for less than 2 hours (such as jobs).
  - **When vulnerabilities are auto-closed by Datadog:** After 5 days, if they have not been detected again during this period.

<!-- ### Remediation

The Vulnerability Explorer offers remediation recommendations for detected vulnerabilities. Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking. They also include a collection of links and references to websites or information sources to help you understand the context behind each vulnerability. -->

<!-- **Note**: To create Jira issues for SCA vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][11] documentation, as well as the [Role Based Access Control][9] documentation. -->

[1]: /security/code_security/software_composition_analysis/setup_static/
[2]: /security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[5]: /getting_started/code_security/
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis
[13]: /security/code_security/software_composition_analysis/setup_static/#upload-third-party-sbom-to-datadog
[14]: /security/code_security/software_composition_analysis/library_inventory