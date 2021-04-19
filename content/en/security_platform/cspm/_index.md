---
title: Cloud Security Posture Management
kind: documentation
---

{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED or US3.
</div>
{{< /site-region >}}

## Overview

Datadog Cloud Security Posture Management (CSPM) makes it easy to track the compliance posture of your production environment, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks. View your compliance posture from the Compliance Homepage, with links to explore compliance findings in detail.

{{< img src="security_platform/cspm/homepage" alt="CSPM Homepage">}}

### Terminology

- **Average compliance posture score**: The percentage of your environment that complies with all default cloud configuration and runtime compliance rules. Formula: `(# of resources with 0 findings)` / `(total # of resources scanned)`.
- **Requirement**: A group of controls representing a single technical or operational topic, such as “Access Management” or “Networking.” The regulatory framework PCI DSS, for example, has 12 requirements.
- **Control**: A specific recommendation for how technology, people, and processes should be managed.
- **Resource**: A configurable entity that needs to be continuously scanned for compliance. Example AWS instances include hosts, containers, security groups, users, and customer-managed IAM policies.

## Get Started

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}Configure your cloud environment for CSPM scanning{{< /nextlink >}}
  {{< nextlink href="">}}Search and explore findings to uncover the details about a misconfigured resource and the steps needed to fix it{{< /nextlink >}}
  {{< nextlink href="">}}Learn about the OOTB rules, regulatory frameworks, and industry benchmarks Datadog helps monitor{{< /nextlink >}}
{{< /whatsnext >}}
