---
title: Public Artifact Vulnerabilities
description: Look up CVE and vulnerability information for Datadog's publicly available artifacts.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-public-artifact-vulnerabilities-openvex/"
  tag: "Blog"
  text: "Reduce CVE noise with OpenVEX assessments in Datadog"
---

The Public Artifact Vulnerabilities page lets you view vulnerability and response information for Datadog's publicly available artifacts and libraries. Use it to look up:

- Which vulnerabilities affect a given artifact (by image/version)
- Which artifacts are affected by a given CVE
- Status, justification, impact, and action statements for each vulnerability

## How to access

The Public Artifact Vulnerabilities page is accessible through the Help page under {{< ui >}}Public Artifact Vulnerabilities{{< /ui >}}.

## Using the page

### Look up by artifact

Use the artifact view to see all vulnerabilities for a specific family, image, and version (for example, the Datadog Agent image version 7.52.0).

- {{< ui >}}Family{{< /ui >}}: Choose a category such as {{< ui >}}Agent platform{{< /ui >}}, {{< ui >}}APM library injection{{< /ui >}}, {{< ui >}}Private action runners{{< /ui >}}, {{< ui >}}Telemetry collectors{{< /ui >}}, {{< ui >}}Serverless{{< /ui >}}, {{< ui >}}Private deployments{{< /ui >}}, or {{< ui >}}Build & CI{{< /ui >}}. Your selection narrows the {{< ui >}}Image{{< /ui >}} dropdown.
- {{< ui >}}Image{{< /ui >}}: Choose an image from the {{< ui >}}Image{{< /ui >}} dropdown (for example, agent, cluster-agent, synthetic-private-location-worker). The list is built from available public artifacts.
- {{< ui >}}Version{{< /ui >}}: Choose a version of the selected image. Versions are sorted by newest first.

The table loads and shows one row per vulnerability affecting that image and version.

<div class="alert alert-tip">To filter your current results, enter a keyword in the search box without clicking {{< ui >}}Find CVE in artifacts{{< /ui >}}.</div>

{{< img src="data_security/public_artifact_vulnerabilities/artifact-view.png" alt="Look up by artifact" style="width:100%;" >}}

**Table columns (by image/version):**

| Column | Purpose |
|--------|---------|
| Severity | Severity of the vulnerability (for example, Critical, High, Medium, Low, and Info). |
| Vulnerability | CVE or vulnerability identifier and name. |
| Platform | Applicable platforms. Hover over a platform value to see the specific variants it covers, including FIPS and non-FIPS builds. |
| Status | Current status: for example, Not affected, Affected, Fixed, and Under investigation. |
| Additional Information | More information on the status of the CVE and justification of the status if needed. For example, if the status is component_not_present, this column explains why the CVE does not affect the artifact and how that conclusion was reached. Some statuses, such as Under investigation, do not have additional information because the impact is still being analyzed. |

### Look up by CVE

Use the CVE view to find which artifacts and versions are affected by specific vulnerabilities, and the status for each.

1. In the search box at the top of the table, enter one or more CVE IDs (for example, `CVE-2024-1234` or `CVE-2024-1234, CVE-2024-5678` for multiple).
2. Click {{< ui >}}Find CVE in artifacts{{< /ui >}}.

The table switches to CVE mode and shows one row per CVE, artifact, and version combination.

<div class="alert alert-tip">To filter your current results, enter a keyword in the search box without clicking {{< ui >}}Find CVE in artifacts{{< /ui >}}.</div>

{{< img src="data_security/public_artifact_vulnerabilities/cve-view.png" alt="Look up by CVE" style="width:100%;" >}}

**Table columns (by CVE):**

| Column | Purpose |
|--------|---------|
| CVE | The CVE ID. |
| Artifact Name | Name of the artifact (for example, agent, library name). |
| Version | Version of the artifact. |
| Platform | Applicable platforms. Hover over a platform value to see the specific variants it covers, including FIPS and non-FIPS builds. |
| Status | Status for this CVE/artifact/version (for example, Not affected, Affected, Fixed, and Under investigation). |
| Additional Information | More information on the status of the CVE and justification of the status if needed. |


## Available artifacts (images)

The **Image** dropdown is populated from the list of tracked public artifacts. Public Artifact Vulnerabilities supports the **latest 10 versions** of tracked public images. If an expected artifact is missing, contact [Datadog Support][1] to request that it be added.

## Options and actions on the page

| Option or action | Description |
|------------------|-------------|
| {{< ui >}}Search / global filter{{< /ui >}} | Filter table rows by any text. In "by image/version" mode, the same search box is used before clicking {{< ui >}}Find CVE in artifacts{{< /ui >}} to run a CVE lookup. |
| {{< ui >}}Find CVE in artifacts{{< /ui >}} | Runs a CVE lookup using the current search box value (supports comma-separated CVE IDs). Only relevant when you want to look up by CVE. |
| {{< ui >}}Pagination{{< /ui >}} | Use the table pagination to move through large result sets (for example, 50 rows per page). |
| {{< ui >}}Resizable columns{{< /ui >}} | You can resize column widths for readability. |

[1]: /help

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
