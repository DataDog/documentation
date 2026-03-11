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
  - link: /security/code_security/software_composition_analysis/setup_static/
    tag: Documentation
    text: Set up Static SCA
  - link: /security/code_security/software_composition_analysis/setup_runtime/
    tag: Documentation
    text: Set up Runtime SCA
  - link: /security/code_security/software_composition_analysis/library_inventory
    tag: Documentation
    text: Library Inventory
  - link: /pr_gates/
    tag: Documentation
    text: PR Gates

---
## Overview

Software Composition Analysis (SCA) detects open source libraries in both your repositories and running services, providing end-to-end visibility of library vulnerabilities and license management from development to production.

Using Software Composition Analysis provides organizations with the following benefits:
- Identification of emerging and known vulnerabilities affecting open source libraries
- Risk-based prioritization and remediation based on runtime detection of vulnerabilities
- Identification of malicious packages, end-of-life libraries, and library riskiness based on OpenSSF standards

## How it works

SCA supports two complementary detection modes:
- **Static detection** scans your repositories by analyzing dependency files (lockfiles and manifests). Scans run when changes are committed that update supported dependency manifests/lockfiles in an enabled repository. You can also run SCA in your CI/CD pipeline (CI jobs are supported on <code>push</code> event triggers). See [Set up Static SCA][1] to get started.
- **Runtime detection** identifies libraries that are actually loaded and used by your services at runtime, using instrumentation from Datadog APM. See [Set up Runtime SCA][2] to get started.

Datadog SCA uses a curated proprietary database. The database is sourced from Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), GitHub advisories, and other language ecosystem advisories, as well as Datadog's own Security Research team's findings. There is a maximum of 2 hours between when a new vulnerability is published and when it appears in Datadog, with emerging vulnerabilities typically appearing in Datadog within minutes.

When Datadog ingests a new advisory, it is matched against your last known library inventory and appears in the Vulnerabilities Explorer even if you have not rescanned the repository. The Repositories Explorer is commit-scoped and reflects what was known at the time the scan ran—so a scan that executed before Datadog ingested the advisory will not show that newly published advisory in the Repositories Explorer for that commit. See [Understanding SCA views](#understanding-sca-views) for more details.

## Key capabilities

### Review and prioritize vulnerabilities

The [Vulnerabilities Explorer][11] provides a vulnerability-centric view of library vulnerabilities detected by SCA, alongside vulnerabilities detected by other Code Security capabilities (SAST, IAST, Secrets Scanning, and IaC). All vulnerabilities in the explorer are either detected on the default branch at the last commit of a scanned repository, or are affecting a running service.

#### Datadog severity score

To assist in prioritizing remediation, Datadog modifies the base CVSS score into the **Datadog Severity Score** by incorporating runtime context and exploitability signals. These factors help distinguish theoretical risk from vulnerabilities that are more likely to be exploited in real-world environments. The table below describes how each factor influences the final score.

| Risk factor                       | How it is evaluated                                                  | Impact on the score                                    |
|-----------------------------------|----------------------------------------------------------------------|--------------------------------------------------------|
| Base CVSS score                   | Published CVSS score for the vulnerability.                          | Starting point for the severity score.                 |
| Reachability                      | Whether the vulnerable code path is actually executed.               | Increased when the vulnerable code is invoked.         |
| Production runtime context        | Whether the affected service is running in a production environment. | Decreased if the service is not running in production. |
| Under attack                      | Evidence of active attack activity targeting the service.            | Decreased if there is no observed attack activity.     |
| Exploit availability              | Availability of public exploits for the vulnerability.               | Decreased if no exploit is available.                  |
| Exploitation probability (EPSS)   | Likelihood of real-world exploitation based on EPSS data.            | Decreased when the probability of exploitation is low. |

### View findings by repository

The [Repositories Explorer][12] provides a repository-centric view of all scan results across Static Code Analysis (SAST), Software Composition Analysis (SCA), Secrets Scanning, and Infrastructure as Code (IaC). Click on a repository to analyze **Library Vulnerabilities** and **Library Catalog** results from SCA scoped to your chosen branch and commit.
* The **Library Vulnerabilities** tab contains the vulnerable library versions found by Datadog SCA
* The **Library Catalog** tab contains all of the libraries (vulnerable or not) found by Datadog SCA.

Recommended steps for remediating detected vulnerabilities can be found in the side panel for each vulnerability in SCA. Steps are provided for upgrading the library to the safest (non-vulnerable) version, as well as the closest version.

To filter your results, use the facets to the left of the list or the search bar at the top. Results can be filtered by service or team facets. For more information about how results are linked to Datadog services and teams, see [Link findings to Datadog services and teams][18].

Every row represents a unique library and version combination. Each combination is associated with the specific commit and branch that is selected in the filters at the top of the page (by default, the latest commit on the default branch of the repository you selected).

Click on a library with a vulnerability to open a side panel that contains information about remediation steps.

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Side panel for a SCA violation" style="width:80%;">}} -->

### Automatically block risky changes with PR Gates

Use [PR Gates][16] to enforce security standards on open source library usage before changes are merged. Datadog scans the dependencies introduced in each pull request, identifies any vulnerabilities or license violations above your configured severity threshold, and reports a pass or fail status to GitHub or Azure DevOps.

You can configure PR Gates to block on:
- **Security vulnerabilities**: libraries with known CVEs above a configured severity threshold.
- **License violations**: libraries using licenses that do not comply with your organization's policy.

PR Gates marks a PR check as failed only if the developer **introduces a new violation as part of that PR**—existing violations already present in the codebase before the PR and its branch were created do not cause the check to fail. By default, failed checks are informational and do not block merging, but you can configure them as blocking in GitHub or Azure DevOps to prevent merging when critical issues are detected. For setup instructions, see [Set up PR Gate Rules][17].

### Manage your library inventory

The [Library Inventory][8] provides visibility into the third-party libraries detected across your codebase. Datadog collects this information from:

* **Static SCA**, which identifies all libraries referenced in your repositories, and  
* **Runtime SCA**, which detects libraries that are actually loaded and used by your services at runtime.

Use the Library Inventory to understand which dependencies you rely on, where they are used, and whether they contain known vulnerabilities or license risks.

To learn more about how the inventory is generated, how Static and Runtime data differ, and how to interpret the library details (usage, vulnerabilities, licenses, versions, and OpenSSF score), see [Library Inventory][14].

### Library vulnerability context in APM

SCA enriches the information Application Performance Monitoring (APM) is already collecting by flagging libraries that match against current vulnerability advisories. Potentially vulnerable services are highlighted directly in the **Security** view embedded in the [APM Software Catalog][10].

## Understanding SCA views

The Repositories Explorer and Vulnerabilities Explorer serve complementary but distinct purposes.

**Repositories Explorer** reflects a **point-in-time snapshot** of the libraries and vulnerabilities detected at the time of the scan. It shows which libraries were present in a given repository at a specific commit, along with any vulnerabilities that were known at scan time. This view does not update retroactively if new advisories are published after the scan runs.

**Vulnerabilities Explorer** provides a **live view** that is continuously matched against the latest advisory database. If a new vulnerability advisory is published after a repository scan, it automatically appears in the Vulnerabilities Explorer, even if the repository has not been rescanned since that commit or if your last scan was on an older commit. This means your vulnerability exposure is always up to date, regardless of when the last scan ran.

> **Example:** If a scan runs at 10:00 AM and a CVE advisory for a library in your repository is published at 4:00 PM the same day, the Repositories Explorer for that commit will not show the CVE, but the Vulnerabilities Explorer will reflect it as soon as the advisory is available in Datadog's database.

### Retroactive advisory matching

Datadog continuously matches newly published advisories against the stored library inventory from past scans. This updates vulnerability records in the Vulnerabilities Explorer without changing the original Repositories Explorer snapshots. This means:
- You do not need to trigger a new scan for a newly published CVE to be reflected in your vulnerability posture in the Vulnerabilities Explorer.
- The Vulnerabilities Explorer always shows the most current risk picture based on your last known library inventory, even for older commits that have not been rescanned.
- The Repositories Explorer remains a fixed, point-in-time historical record of what was known at scan time and does not update when new advisories are published.

### Vulnerability lifecycle
Vulnerabilities detected in libraries by SCA **at runtime** are closed by Datadog after a certain period, depending on the service's usage of the vulnerable library.

- **Hot Libraries:**
Libraries from services that are alive for more than 2 hours.
  - **When vulnerabilities are auto-closed by Datadog:** After 1 day, if they are not detected again and the service is running on all environments where the vulnerability was detected.

- **Lazy Libraries:**
Libraries that are loaded more than 1 hour after the service has started.
  - **When vulnerabilities are auto-closed by Datadog:** After 5 days, if they have not been detected again during this period.

- **Cold Libraries:**
Libraries from services that are alive for less than 2 hours (such as jobs).
  - **When vulnerabilities are auto-closed by Datadog:** After 5 days, if they have not been detected again during this period.

## SCA language support

Software Composition Analysis (SCA) supports the following languages:

{{< partial name="code_security/sca-lang-support.html" >}}

## Next steps

1. [Set up Static SCA][1] to scan your repositories.
2. [Set up Runtime SCA][2] to detect libraries loaded by your running services.
3. Review and triage findings in the [Vulnerabilities Explorer][11].
4. Configure [PR Gates][16] to block risky changes before they are merged.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /security/code_security/software_composition_analysis/setup_static/
[2]: /security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis
[13]: /security/code_security/software_composition_analysis/setup_static/#upload-third-party-sbom-to-datadog
[14]: /security/code_security/software_composition_analysis/library_inventory
[16]: /pr_gates/
[17]: /pr_gates/setup
[18]: /security/code_security/software_composition_analysis/setup_static/?tab=github#link-findings-to-datadog-services-and-teams
