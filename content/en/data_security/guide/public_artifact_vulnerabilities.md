---
title: Public Artifact Vulnerabilities
description: Look up CVE and vulnerability information for Datadog's publicly available artifacts.
---

## Overview

The Public Artifact Vulnerabilities page lets you view vulnerability and response information for Datadog's publicly available artifacts and libraries. Use it to look up:

- Which vulnerabilities affect a given artifact (by image/version)
- Which artifacts are affected by a given CVE
- Status, justification, impact, and action statements for each vulnerability

{{< callout url="#">}}
  Public Artifact Vulnerabilities page is in Preview.
{{< /callout >}} 


## How to access

The Public Artifact Vulnerabilities page is accessible through the Help page under **Public Artifact Vulnerabilities**.

![Help page with Public Artifact Vulnerabilities link](/images/data_security/public_artifact_vulnerabilities/help-page.png)

![Public Artifact Vulnerabilities page](/images/data_security/public_artifact_vulnerabilities/public-artifact-vulnerabilities-page.png)

## Using the page

### 1. Look up by image and version (artifact-centric)

Use this to see all vulnerabilities for a specific artifact and version (for example, the Datadog Agent image version 7.52.0).

- **Image**: Choose an artifact from the **Image** dropdown (for example, agent, cluster-agent, synthetic-private-location-worker). The list is built from available public artifacts.
- **Version**: Choose a **Version** for that image. Versions are sorted by newest first.

The table loads and shows one row per vulnerability affecting that image/version.

**Table columns (by image/version):**

| Column | Purpose |
|--------|---------|
| Severity | Severity of the vulnerability (for example, Critical, High, Medium, Low, and Info). |
| Vulnerability | CVE or vulnerability identifier and name. |
| Platform | Platform(s) the statement applies to (for example, Linux, Windows). The platform column also shows the list of variants affected by the CVE (for example, fips, jmx, and servercore). |
| Status | Current status: for example, Not affected, Affected, Fixed, and Under investigation. |
| Additional Information | More information on the status of the CVE and justification of the status if needed. For example, if the status is component_not_present, this column explains why the CVE does not affect the artifact and how that conclusion was reached. Some statuses, such as Under investigation, do not have additional information because the impact is still being analyzed. |

You can use the search/filter box above the table to filter these rows by keyword.

![Look up by image and version](/images/data_security/public_artifact_vulnerabilities/by-image-version.png)

### 2. Look up by CVE (CVE-centric)

Use this to find which artifacts/versions are affected and the status for each.

1. In the search box at the top of the table, enter one or more CVE IDs (for example, `CVE-2024-1234` or `CVE-2024-1234, CVE-2024-5678` for multiple).
2. Click **Find CVE in artifacts**.

The table switches to CVE mode and shows one row per (CVE, artifact, version, status) combination.

**Table columns (by CVE):**

| Column | Purpose |
|--------|---------|
| CVE | The CVE ID. |
| Artifact Name | Name of the artifact (for example, agent, library name). |
| Version | Version of the artifact. |
| Platform | Platform(s) for this row (for example, Linux, Windows). |
| Status | Status for this CVE/artifact/version (for example, Not affected, Affected, Fixed, and Under investigation). |
| Additional Information | More information on the status of the CVE and justification of the status if needed. |

After you search for a CVE, the table filter clears so all returned rows are visible. You can type in the search box again to filter the current result set.

![Look up by CVE](/images/data_security/public_artifact_vulnerabilities/by-cve.png)

## Available artifacts (images)

The **Image** dropdown is populated from the list of tracked public artifacts. If an expected artifact is missing, contact [Datadog Support][1] to request that it be added.

## Options and actions on the page

| Option or action | Description |
|------------------|-------------|
| **Search / global filter** | Filter table rows by any text. In "by image/version" mode, the same search box is used before clicking **Find CVE in artifacts** to run a CVE lookup. |
| **Find CVE in artifacts** | Runs a CVE lookup using the current search box value (supports comma-separated CVE IDs). Only relevant when you want to look up by CVE. |
| **Pagination** | Use the table pagination to move through large result sets (for example, 50 rows per page). |
| **Resizable columns** | You can resize column widths for readability. |

[1]: /help
