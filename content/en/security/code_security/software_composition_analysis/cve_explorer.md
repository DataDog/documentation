---
title: CVE Explorer
description: The CVE Explorer provides a unified view of all CVEs and security advisories tracked by Datadog, with visibility into which ones affect your environment.
disable_toc: false
---

The CVE Explorer gives you a searchable catalog of every CVE and security advisory tracked by Datadog, including detailed information about affected packages, exploit availability, and fix guidance. Unlike the [Vulnerabilities explorer][1], which shows findings scoped to your repositories and services, CVE Explorer shows the full set of CVEs Datadog tracks, so you can proactively assess exposure to newly published vulnerabilities before they appear in your findings.

For CVEs that affect packages detected in your scanned repositories and services, Datadog automatically marks them as impacted. Assets that have not been scanned do not show an impacted status.

To access the CVE Explorer, navigate to [Detection Coverage > CVE Explorer][2].

{{< img src="security/code_security/cve_explorer/cve-explorer.png" alt="CVE Explorer showing a list of critical advisories filtered by impacted and Maven ecosystem" style="width:100%;" >}}

## Search and filter CVEs

Use the search bar to find a specific CVE or advisory ID (for example, `CVE-2025-24813` or a GHSA identifier). You can filter the list by:

| Filter | Description |
|--------|-------------|
| **Severity** | Base severity score: critical, high, medium, low |
| **Impacted** | Indicates whether any asset in your environment is affected |
| **Exploit Available** | Whether a public exploit has been published |
| **CISA Known Exploit** | Whether the CVE appears in the CISA KEV catalog |
| **EPSS Score** | Exploit Prediction Scoring System probability |
| **Ecosystem** | Package ecosystem: Maven, npm, PyPI, Go, and others |

The **Impacted** filter is the fastest way to focus on CVEs that affect libraries detected in your repositories or running services.

## CVE details panel

Clicking any CVE opens a details panel showing the severity score, publication date, and a summary of impacted repositories, services, and infrastructure resources.

{{< img src="security/code_security/cve_explorer/advisory-header.png" alt="CVE details panel header showing impacted repositories, services, and infrastructure resources" style="width:100%;" >}}

### Summary

A description of the vulnerability sourced from the NVD and the advisory database, including affected versions and conditions required for exploitation.

{{< img src="security/code_security/cve_explorer/advisory-summary.png" alt="CVE summary section showing vulnerability description and affected versions" style="width:100%;" >}}

### Risk signals

Datadog surfaces additional risk context alongside the base severity score:

- **Exploit Available**: Indicates a public exploit exists for this vulnerability, with the date it became available.
- **CISA Known Exploit**: Flags CVEs listed in the CISA Known Exploited Vulnerabilities catalog, with the date added.
- **High Exploitation Risk (EPSS)**: Shows the EPSS probability score, which estimates the likelihood of exploitation in the wild within the next 30 days.

{{< img src="security/code_security/cve_explorer/advisory-risks.png" alt="Risk signals showing Exploit Available and EPSS score for a CVE" style="width:100%;" >}}

### Impacted packages

Lists every package affected by the CVE, including:

- **Package name** and a link to the library in your Library Inventory if detected in your environment
- **Ecosystem** (Maven, npm, PyPI, and so on)
- **Impacted versions**: All versions known to be vulnerable
- **Fixed versions**: The earliest versions where the vulnerability is resolved

Use this table to identify which version to upgrade to for remediation.

{{< img src="security/code_security/cve_explorer/advisory-impacted-packages.png" alt="Impacted packages table showing package names, ecosystems, impacted versions, and fixed versions" style="width:100%;" >}}

### Reference links

External references associated with the CVE, including NVD advisories, GitHub Security Advisories, proof-of-concept repositories, and patch commits. Reference types include:

- **Advisory**: Official advisory from NVD or a package registry
- **Web**: External links such as patch commits, blog posts, or PoC repositories

{{< img src="security/code_security/cve_explorer/advisory-reference-links.png" alt="Reference links table showing advisory and web links for a CVE" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/code-security/detection-coverage/advisories
[3]: /security/code_security/software_composition_analysis/
[4]: /security/code_security/software_composition_analysis/library_inventory/
