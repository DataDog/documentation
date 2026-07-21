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
  - link: /security/code_security/software_composition_analysis/cve_explorer
    tag: Documentation
    text: CVE Explorer
  - link: /pr_gates/
    tag: Documentation
    text: PR Gates
  - link: "https://www.datadoghq.com/blog/smart-vulnerability-remediation/"
    tag: "Blog"
    text: "Take a smarter approach to vulnerability remediation with Datadog"
  - link: "https://www.datadoghq.com/blog/remediate-faster-code-security"
    tag: "Blog"
    text: "Remediate transitive vulnerabilities faster with Datadog Software Composition Analysis"
  - link: "https://www.datadoghq.com/blog/devsecops-2026-study-learnings"
    tag: "Blog"
    text: "Key learnings from the 2026 State of DevSecOps study"

---
## Overview

Software Composition Analysis (SCA) detects open source libraries in both your repositories and running services, providing end-to-end visibility of library vulnerabilities and license management from development to production.

Using Software Composition Analysis provides organizations with the following benefits:
- Identification of emerging and known vulnerabilities affecting open source libraries
- Risk-based prioritization and remediation based on runtime detection of vulnerabilities
- Identification of malicious packages, end-of-life libraries, and library riskiness based on OpenSSF standards
- Export a Software Bill of Materials (SBOM) of detected libraries in CycloneDX 1.6 or SPDX 2.3 format

## How it works

SCA supports two complementary detection modes:
- **Static detection** scans repositories by analyzing dependency files (lockfiles and manifests). By default, scans run when a commit updates a supported dependency manifest or lockfile in an enabled repository. You can also run SCA in your CI/CD pipeline (CI jobs are supported for `push` events). See [Set up Static SCA][1] to get started.
- **Runtime detection** identifies libraries that are loaded and used by your services at runtime using instrumentation from Datadog APM. See [Set up Runtime SCA][2] to get started.

When Datadog ingests a new advisory, it is matched against your last known library inventory and appears in the Vulnerabilities Explorer even if you have not rescanned the repository. The Repositories Explorer is commit-scoped and reflects what was known at the time the scan ran—so a scan that executed before Datadog ingested the advisory will not show that newly published advisory in the Repositories Explorer for that commit. See [Understanding SCA views](#understanding-sca-views) for more details.

## Vulnerability database

Datadog SCA draws from multiple public and private sources to build a curated proprietary database. These sources include the [National Vulnerability Database (NVD)][21], the [GitHub Advisory Database][22], [osv.dev][23], ecosystem-specific advisories such as [PyPA's Advisory Database][24] and the [Global Security Database][25], [Datadog GuardDog][26], and Datadog Security Research.

Datadog uses these sources to identify known vulnerabilities, malicious packages, and emerging supply chain threats across supported ecosystems. There is a maximum of 1 hour between when a new vulnerability is published and when it appears in Datadog, with emerging vulnerabilities typically appearing in Datadog within minutes. Malicious packages are reported in Datadog within 6 hours.

## Public exploit sources

Datadog identifies whether a vulnerability has a known public exploit by aggregating data from multiple public sources, including CISA (Known Exploited Vulnerabilities Catalog), Exploit-DB, NIST (National Vulnerability Database), and GitHub (public exploit references).

When Datadog identifies a public exploit for a vulnerability from any of these sources, it flags the finding to help you prioritize remediation.

## Key capabilities

### Review and prioritize vulnerabilities

The [Vulnerabilities Explorer][11] provides a vulnerability-centric view of library vulnerabilities detected by SCA, alongside vulnerabilities detected by other Code Security capabilities (SAST, IAST, Secrets Scanning, and IaC). All vulnerabilities in the explorer are either detected on the default branch at the last commit of a scanned repository, or are affecting a running service.

#### Datadog severity score

To assist in prioritizing remediation, Datadog modifies the base CVSS score into the **Datadog Severity Score** by incorporating runtime context and exploitability signals. These factors help distinguish theoretical risk from vulnerabilities that are more likely to be exploited in real-world environments. The table below describes how each factor influences the final score.

| Risk factor                       | How it is evaluated                                                  | Impact on the score                                    |
|-----------------------------------|----------------------------------------------------------------------|--------------------------------------------------------|
| Base CVSS score                   | Published CVSS score for the vulnerability.                          | Starting point for the severity score.                 |
| Reachability                      | Whether the vulnerable function is referenced in the source code (detected statically at the repository level). | Increased when the vulnerable function is found to be reachable in the code. |
| Production runtime context        | Whether the affected service is running in a production environment. | Decreased if the service is not running in production. |
| Under attack                      | Evidence of active attack activity targeting the service.            | Decreased if there is no observed attack activity.     |
| Exploit availability              | Availability of public exploits for the vulnerability.               | Decreased if no exploit is available.                  |
| Exploitation probability (EPSS)   | Likelihood of real-world exploitation based on EPSS data.            | Decreased when the probability of exploitation is low. |

### View findings by repository

The [Repositories Explorer][12] provides a repository-centric view of all scan results across Static Code Analysis (SAST), Software Composition Analysis (SCA), Secrets Scanning, and Infrastructure as Code (IaC). Click on a repository to analyze {{< ui >}}Library Vulnerabilities{{< /ui >}} and {{< ui >}}Library Catalog{{< /ui >}} results from SCA scoped to your chosen branch and commit.
* The {{< ui >}}Library Vulnerabilities{{< /ui >}} tab contains the vulnerable library versions found by Datadog SCA
* The {{< ui >}}Library Catalog{{< /ui >}} tab contains all of the libraries (vulnerable or not) found by Datadog SCA.

Recommended steps for remediating detected vulnerabilities can be found in the side panel for each vulnerability in SCA. Steps are provided for upgrading the library to the safest (non-vulnerable) version, as well as the closest version.

To filter your results, use the facets to the left of the list or the search bar at the top. Results can be filtered by service or team facets. For more information about how results are linked to Datadog services and teams, see [Link findings to Datadog services and teams][18].

Every row represents a unique library and version combination. Each combination is associated with the specific commit and branch that is selected in the filters at the top of the page (by default, the latest commit on the default branch of the repository you selected).

Click on a library with a vulnerability to open a side panel that contains information about remediation steps.

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Side panel for a SCA violation" style="width:80%;">}} -->

### Remediation

Datadog SCA supports using coding agents and [Bits Code][31] to apply fixes for vulnerable libraries. You can also use [Bits Code Automation][32] to automatically generate fixes for vulnerabilities as they are found or on a schedule.

<div class="alert alert-info">SCA remediations in Bits Code require internet access to apply library upgrades. To configure internet access, see <a href="/bits_ai/bits_code/setup/#configure-internet-access">Configure internet access</a>.</div>

To view and remediate vulnerabilities:

1. In Datadog, navigate to [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Vulnerabilities{{< /ui >}}][11], and select {{< ui >}}Libraries (SCA){{< /ui >}}.
2. Select a vulnerability to open a side panel with details about the finding and the affected library.
3. In the {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} section, click {{< ui >}}Remediate with AI{{< /ui >}}
4. Select either Bits Code or another coding agent. With Bits Code, you can choose between:
   - [{{< ui >}}Single fix{{< /ui >}}](#single-fix): Generates a fix for this vulnerable library
     - If a fix has already been generated, select {{< ui >}}View fix and create PR{{< /ui >}} to view the existing [remediation session](#remediation-session-details).
   - [{{< ui >}}Create automation{{< /ui >}}](#create-automation): Opens a pop-up modal where you can create a [Bits Code automation][32]

#### Single fix

Use **Single fix** to open a Bits Code session to fix this single vulnerability. You can review the proposed diff, ask follow-up questions, edit the patch, and create a pull request to apply the remediation to your source code repository.

View all Bits Code sessions on {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][33].

#### Create automation

Use **Create automation** to create a [Bits Code automation][32] to generate fixes for SCA vulnerabilities automatically, either as they are found or on a schedule.

Selecting this option opens an {{< ui >}}Automate with Bits{{< /ui >}} modal with the {{< ui >}}Remediate SCA vulnerabilities{{< /ui >}} action pre-filled. Complete the form, including specifying a trigger and output, then click {{< ui >}}Create Automation{{< /ui >}}. See [Automations][32] to learn more about actions, triggers, and outputs.

View all Bits Code automations on {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][34].

#### Remediation session details

Each Bits Code session shows the life cycle of an AI-generated fix so you can review and validate changes before merging. It includes:

- The original security finding and proposed code change
- An explanation of how and why Bits Code generated the fix
- CI results (if enabled) to validate the patch is safe to deploy
- Options to refine the fix or {{< ui >}}Create PR{{< /ui >}} to apply the changes to your source code repository

You can also view all remediation sessions on [**Sessions**][33].

### Automatically block risky changes with PR Gates

Use [PR Gates][16] to enforce security standards for open source libraries before changes are merged. Datadog scans the dependencies introduced in each pull request, identifies vulnerabilities or license violations that exceed your configured severity threshold, and reports a pass or fail status to GitHub or Azure DevOps.

You can configure PR Gates to block on:
- **Security vulnerabilities**: libraries with known CVEs above a configured severity threshold.
- **License violations**: libraries using licenses that do not comply with your organization's policy.

PR Gates marks a PR check as failed only if the developer introduces a new violation in that PR. Violations that already existed in the codebase before the PR branch was created do not cause the check to fail. By default, failed checks are informational and do not block merging, but you can configure them as blocking in GitHub or Azure DevOps to prevent merges when critical issues are detected. For setup instructions, see [Set up PR Gate Rules][17].

### Manage your library inventory

The [Library Inventory][8] provides visibility into the third-party libraries detected across your codebase. Datadog collects this information from:

* **Static SCA**, which identifies all libraries referenced in your repositories, and
* **Runtime SCA**, which detects libraries that are actually loaded and used by your services at runtime.

Use the Library Inventory to understand which dependencies you rely on, where they are used, and whether they contain known vulnerabilities or license risks.

To learn more about how the inventory is generated, how Static and Runtime data differ, and how to interpret the library details (usage, vulnerabilities, licenses, versions, and OpenSSF score), see [Library Inventory][14].

### Export a Software Bill of Materials

Export a SBOM of your third-party libraries directly from the [Library Inventory][8]. The exported SBOM includes libraries detected both statically (with Static SCA) and at runtime (with Runtime SCA), giving you a single, comprehensive view of your software supply chain.

Datadog supports the following SBOM formats:

- **CycloneDX 1.6**
- **SPDX 2.3**

Use the exported SBOM to share dependency data with downstream consumers, satisfy compliance and regulatory requirements, or feed into other supply chain tooling.

For details on how to generate and download an SBOM, see [Library Inventory][29].

### Explore the full CVE catalog

Use the [CVE Explorer][15] to search every CVE and security advisory tracked by Datadog, including those that do not affect your environment. This helps you assess exposure to newly published vulnerabilities before they appear in your findings.

For CVEs that affect packages detected in your scanned repositories and services, Datadog automatically marks them as impacted. Assets that have not been scanned do not show an impacted status.

For each CVE, you can view the severity score, exploit availability, EPSS score, CISA KEV status, impacted packages, and fix versions. See [CVE Explorer][27] for more details.

### Create tickets from findings

You can create a bidirectional ticket in Jira or ServiceNow directly from any finding to track and remediate issues in your existing workflows. Ticket status remains synced between Datadog and your ticketing tool. For more information, see [Ticketing integrations][19].

<div class="alert alert-info">Ticket creation is only available for library vulnerability findings detected in repositories (Static SCA). Findings detected exclusively in running services do not support ticket creation.</div>

### Mute findings

To suppress a finding, click {{< ui >}}Mute{{< /ui >}} in the finding details panel. This opens a workflow where you can [create an Automation Rule][20] for context-aware filtering by tag values (for example, by `repository`). Muting a finding hides it and excludes it from reports.

<div class="alert alert-info">Muting is only available for library vulnerability findings detected in repositories (Static SCA). Findings detected exclusively in running services cannot be muted.</div>

To restore a muted finding, click {{< ui >}}Unmute{{< /ui >}} in the details panel. You can also use the {{< ui >}}Status{{< /ui >}} filter on the [Vulnerabilities Explorer][11] to review muted findings.

### Library vulnerability context in APM

SCA enriches the information that Application Performance Monitoring (APM) already collects by flagging libraries that match current vulnerability advisories. Potentially vulnerable services are highlighted directly in the Security view in the [APM Catalog][10].

## Understanding SCA views

The Repositories Explorer and Vulnerabilities Explorer serve complementary but distinct purposes.

Repositories Explorer reflects a point-in-time snapshot of the libraries and vulnerabilities detected at the time of the scan. It shows which libraries were present in a given repository at a specific commit, along with any vulnerabilities that were known at scan time. This view does not update retroactively if new advisories are published after the scan runs.

Vulnerabilities Explorer provides a live view that is continuously matched against the latest advisory database. If a new vulnerability advisory is published after a repository scan, it automatically appears in the Vulnerabilities Explorer, even if the repository has not been rescanned or if your last scan was on an older commit. This ensures your vulnerability exposure is always up to date.

<div class="alert alert-info"><b>Example</b>: If a scan runs at 10:00 AM and a CVE advisory for a library in your repository is published at 4:00 PM, the Repositories Explorer for that commit will not show the CVE, but the Vulnerabilities Explorer will reflect it as soon as the advisory is available in Datadog's database.</div>

### Retroactive advisory matching

Datadog continuously matches newly published advisories against the stored library inventory from past scans. This updates vulnerability records in the Vulnerabilities Explorer without altering the original Repositories Explorer snapshots. This means:

- You do not need to trigger a new scan for a newly published CVE to appear in the Vulnerabilities Explorer.
- The Vulnerabilities Explorer reflects the most current risk based on your last known library inventory, even for older commits.
- The Repositories Explorer remains a fixed, point-in-time record of what was known at scan time and does not update when new advisories are published.

### Vulnerability lifecycle

Datadog tracks SCA vulnerabilities differently depending on where they are detected. **Static SCA** findings are scoped to a **repository** and are based on repository scans. **Runtime SCA** findings are scoped to a **service** and are based on libraries that are loaded and used by running services.

A vulnerability is opened when Datadog detects a vulnerable library in the relevant scope. A vulnerability is closed when Datadog no longer detects it according to the life cycle rules for that product.

| Product | Scope | Scenario | When a vulnerability is opened | When a vulnerability is closed |
|---|---|---|---|---|
| Static SCA | Repository | Repository scan | Datadog detects a vulnerable library in a scanned repository. | The vulnerability was last seen more than three hours ago and is not detected in the latest scanned commit. |
| Runtime SCA | Service | Long-running service | Datadog detects a vulnerable library in a running service. | After one day, if the vulnerability is not detected again and the service is running in all environments where the vulnerability was detected. |
| Runtime SCA | Service | Library loaded later in the service life cycle | Datadog detects a vulnerable library in a running service. | After five days, if the vulnerability is not detected again during that period. |
| Runtime SCA | Service | Short-lived service or job | Datadog detects a vulnerable library in a running service. | After five days, if the vulnerability is not detected again during that period. |

## SCA language support

Software Composition Analysis (SCA) supports the following languages:

{{< card-grid image_width="80" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/python_avatar.svg" alt="python" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/javascript_large.png" alt="javascript" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/java_avatar.svg" alt="java" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/golang-avatar.png" alt="go" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/rust.png" alt="rust" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/cpp.png" alt="c++" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/dart.svg" alt="dart" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/swift_avatar.svg" alt="swift" image_width="50" >}}
{{< /card-grid >}}

## Customize your configuration

You can exclude paths from Static SCA analysis by configuring `ignore-paths` in Datadog or in a `code-security.datadog.yaml` file. For the full SCA configuration reference, see [Software Composition Analysis (SCA) Configuration][30]. For information on configuration locations, precedence, and merging, see [Code Security Configuration Reference][28].

## Next steps

1. [Set up Static SCA][1] to scan your repositories.
2. [Set up Runtime SCA][2] to detect libraries loaded by your running services.
3. Review and triage findings in the [Vulnerabilities Explorer][11].
4. Configure [PR Gates][16] to block risky changes before they are merged.
5. Use the [CVE Explorer][15] to proactively assess exposure to newly published vulnerabilities.

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
[15]: https://app.datadoghq.com/security/code-security/detection-coverage/advisories
[16]: /pr_gates/
[17]: /pr_gates/setup
[18]: /security/code_security/software_composition_analysis/setup_static/?tab=github#link-findings-to-datadog-services-and-teams
[19]: /security/ticketing_integrations
[20]: /security/automation_pipelines/mute
[21]: https://nvd.nist.gov/
[22]: https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/about-the-github-advisory-database
[23]: https://google.github.io/osv.dev/data/
[24]: https://github.com/pypa/advisory-database
[25]: https://github.com/cloudsecurityalliance/gsd-database
[26]: https://github.com/DataDog/guarddog
[27]: /security/code_security/software_composition_analysis/cve_explorer/
[28]: /security/code_security/guides/configuration/
[29]: /security/code_security/software_composition_analysis/library_inventory/#export-a-software-bill-of-materials-sbom
[30]: /security/code_security/software_composition_analysis/configuration/
[31]: /bits_ai/bits_code
[32]: /bits_ai/bits_code/automations
[33]: https://app.datadoghq.com/code
[34]: https://app.datadoghq.com/code/automations
