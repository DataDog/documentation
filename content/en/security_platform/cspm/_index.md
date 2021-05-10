---
title: Cloud Security Posture Management
kind: documentation
---

{{< site-region region="us" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is currently in public beta.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED or US3.
</div>
{{< /site-region >}}

## Overview

Datadog Cloud Security Posture Management (CSPM) makes it easy to track your production environment's security hygiene and compliance posture, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks. Assess the configuration of your cloud resources, such as security groups, storage buckets, load balancers, and databases against compliance controls. Use the Datadog Agent to review local configuration information from servers, containers, and Kubernetes clusters against security best practices.

View your cloud security posture at a higher level with the CSPM Home page, and drill into the details of compliance findings and analyze historical configurations with the Findings Explorer.

[Screenshot]

## Terminology

- **Resource**: A configurable entity that needs to be continuously scanned for compliance. Examples include hosts, containers, security groups, users, and customer-managed IAM policies.
- **Average compliance posture score**: The percentage of your environment that complies with all default cloud configuration and runtime compliance rules. Formula: `(# of resources with 0 findings) / (total # of resources scanned)`.
- **Control**: A specific recommendation for how technology, people, and processes should be managed. One or more configuration rules map to each control displayed in Datadog.
- **Requirement**: A group of controls representing a single technical or operational topic, such as “Access Management” or “Networking.” The regulatory framework PCI DSS, for example, has 12 requirements.

## Get Started

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}Configure your cloud environment for CSPM scanning{{< /nextlink >}}
  {{< nextlink href="">}}Search and explore findings to uncover the details about a misconfigured resource and the steps needed to fix it{{< /nextlink >}}
  {{< nextlink href="">}}Learn about the OOTB rules, regulatory frameworks, and industry benchmarks Datadog helps monitor{{< /nextlink >}}
{{< /whatsnext >}}
