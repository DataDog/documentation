---
title: Library Inventory
description: The Library Inventory provides a unified view of all third-party libraries detected across your codebase and services.
disable_toc: false
weight: 10
---

The [Library Inventory][1] provides a unified view of all third-party libraries detected across your codebase and services. It helps you understand which components you depend on, which versions are in use, and where vulnerabilities or license risks might exist. The inventory is built from two complementary data sources:

- **Static Software Composition Analysis (Static SCA)**, which scans your repositories to identify every library referenced in your source code.
- **Runtime Software Composition Analysis (Runtime SCA)**, which detects libraries that are actually loaded and used at runtime by your services.
This combined visibility helps you distinguish between theoretical dependencies and real risk exposure.

## Static view

The {{< ui >}}Static{{< /ui >}} view lists all libraries referenced in your repositories as detected by {{< ui >}}Static SCA{{< /ui >}}.

Static SCA analyzes dependency files and source code to identify all declared third-party libraries, regardless of whether they are used at runtime. Use this view to:

* See your complete dependency footprint  
* Identify libraries present in specific repositories  
* Track dependency versions and upgrade needs  
* Explore vulnerabilities and license metadata for all referenced libraries

Static data updates on every repository scan.

## Runtime view

The {{< ui >}}Runtime{{< /ui >}} view lists only the libraries actively used by your services in production or other monitored environments, as detected by {{< ui >}}Runtime SCA{{< /ui >}}.

Runtime SCA observes loaded dependencies through the Datadog SDK, enabling you to:

* Prioritize vulnerabilities in libraries that are actually executed  
* Reduce noise by filtering out unused dependencies  
* Understand real exposure to vulnerable components  
* Map vulnerable libraries to the services and environments using them

This view updates continuously as your services run.

## Library details

Clicking any library in the inventory opens the library detail panel, which provides an in-depth view of its metadata, vulnerabilities, and usage.

The panel includes the following sections.

### Overview

Displays key information about the selected library and version, including:

* {{< ui >}}Security status{{< /ui >}} (count of Critical, High, Medium, Low vulnerabilities)  
* {{< ui >}}License type{{< /ui >}}  
* {{< ui >}}Version status{{< /ui >}} (older version, actively maintained, deprecated, etc.)  
* {{< ui >}}Popularity{{< /ui >}} and download statistics when available

This section provides a snapshot of the security and maintenance posture of the dependency.

{{< img src="/security/code_security/overview.png" alt="a snapshot of the security and maintenance posture of the dependency" style="width:100%;" >}}

### Repositories

Shows all repositories where this library is referenced, as detected by {{< ui >}}Static SCA{{< /ui >}}.

For each repository, you can see:

* The file and path where the dependency was declared  
* Whether the dependency is direct or transitive  
* The first detection timestamp  
* The latest scanned commit

Use this view to understand how widely the library is used across your codebase.

{{< img src="/security/code_security/repositories.png" alt="a snapshot of the security and maintenance posture of the dependency" style="width:100%;" >}}


### Services

Shows all services that load this library at runtime, as detected by {{< ui >}}Runtime SCA{{< /ui >}}.

For each service, you can view:

* The environments where it is running (for example, env:dev, env:prod)  
* The team responsible (when available)  
* The first time the library was detected in that service

If no services appear, the library is referenced statically but not used at runtime.

{{< img src="/security/code_security/services.png" alt="services that load this library at runtime" style="width:100%;" >}}


### Security

Lists all known vulnerabilities affecting this library version, including:

* Severity (Critical, High, Medium, Low)  
* CVE or advisory ID (for example, GHSA identifiers)  
* A short description of each vulnerability  
* Links to the full vulnerability details

This section consolidates all vulnerabilities detected by Datadog from upstream security advisories.

{{< img src="/security/code_security/security.png" alt="all known vulnerabilities affecting this library version" style="width:100%;" >}}


### Licenses

The license table in this section is based on the **Choose a License Appendix**: [https://choosealicense.com/appendix/](https://choosealicense.com/appendix/)

It summarizes the license's:

* {{< ui >}}Permissions{{< /ui >}}  
* {{< ui >}}Conditions{{< /ui >}}  
* {{< ui >}}Limitations{{< /ui >}}

Additionally, Datadog identifies **license risks**, including:

* **Network copyleft**: code must be released when offered as a network service  
* **Strong copyleft**: derivative work must be open-sourced under the same license  
* **Non-standard copyleft**: copyleft terms differ from common OSI-approved patterns  
* **Non-commercial**: use is restricted to non-commercial contexts  
* **Non-standard / Non-free**: license does not meet standard open-source definitions

Each risk contains a short explanation and links to more detailed license information.

{{< img src="/security/code_security/licenses.png" alt="license summary" style="width:100%;" >}}


### Versions

Lists all known versions of the library, along with:

* Release dates  
* Vulnerability counts for each version  
* Whether the version is used in your repositories or services

This helps you evaluate remediation options and identify safer upgrade paths.

{{< img src="/security/code_security/versions_of_this_library.png" alt="all known versions of the library" style="width:100%;" >}}


### OpenSSF score

Displays the **OpenSSF Scorecard** results for the upstream project. Each check provides insight into the project's security maturity, such as:

* Maintenance activity  
* Use of security policies  
* Safe workflow practices  
* Dependency pinning  
* Binary artifact usage

The score ranges from **0 to 10**, where 10 indicates best practices.

{{< img src="/security/code_security/openSSF_Score_1.png" alt="OpenSSF Scorecard results for the upstream project" style="width:100%;" >}}


## Export a Software Bill of Materials

From the [Library Inventory][1], you can export a Software Bill of Materials (SBOM) of all libraries detected across your environment, both statically (with Static SCA) and at runtime (with Runtime SCA). This gives you a single, authoritative inventory of the open source components your organization depends on, regardless of where they were observed.

Datadog supports the following SBOM formats:

- **CycloneDX 1.6**
- **SPDX 2.3**

To export an SBOM:

1. Navigate to [{{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Inventory{{< /ui >}} > {{< ui >}}Libraries{{< /ui >}}][1].
1. (Optional) Apply filters to scope the export to a subset of libraries (for example, by repository, service, or environment).
1. Click {{< ui >}}Export SBOM{{< /ui >}} and choose {{< ui >}}CycloneDX 1.6{{< /ui >}} or {{< ui >}}SPDX 2.3{{< /ui >}}.
1. Download the generated file.

<div class="alert alert-info">The exported SBOM reflects the libraries currently visible in the inventory, including any active filters. Adjust your filters before exporting to scope the SBOM to the libraries you want to include.</div>

## Next steps

To get started with Library Inventory:

1. Enable {{< ui >}}Static SCA{{< /ui >}} to detect libraries in your repositories. See [static setup][2] to get started.
2. Enable {{< ui >}}Runtime SCA{{< /ui >}} to identify libraries actually used during execution. See [runtime setup][3] to get started.
3. Use both views together to understand both your full dependency footprint and your real runtime exposure.
4. (Optional) [Export an SBOM](#export-a-software-bill-of-materials-sbom) of your libraries in CycloneDX 1.6 or SPDX 2.3 format.

[1]: https://app.datadoghq.com/security/code-security/inventory/libraries
[2]: /security/code_security/software_composition_analysis/setup_static/
[3]: /security/code_security/software_composition_analysis/setup_runtime/