---
title: Cloud Security Posture Management
kind: documentation
---

{{< site-region region="us" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is currently in <a href="https://app.datadoghq.com/security/configuration">public beta</a>.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED, US3, or EU.
</div>
{{< /site-region >}}

## Overview

Datadog Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud environment, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks.

{{< img src="security_platform/cspm/landing_page.png" alt="Cloud Security Posture Management" width="100%">}}

Assess the configuration of your cloud resources, such as security groups, storage buckets, load balancers, and databases against [configuration rules][1]. Use the Datadog Agent to review local configuration information from servers, containers, and Kubernetes clusters against [Datadog's OOTB security posture rules][2].

View your cloud security posture at a high level with the [Posture Management][1] page, and drill into the details of findings and analyze historical configurations with [Posture Findings][2].

{{< img src="security_platform/cspm/getting_started/posture-management-home.png" alt="Homepage for CSPM">}}

## Glossary

- **Average security configuration score**: Percentage of your environment that satisfies all of your active [Datadog’s OOTB rules][3]. Formula: `(# of resources with 0 findings) / (total # of resources scanned)`.

- **Requirement**:  A group of controls representing a single technical or operational topic, such as _Access Management_ or _Networking_. The regulatory framework PCI DSS, for example, has [12 requirements][4].

- **Control**: A specific recommendation for how technology, people, and processes should be managed; typically based on a regulation or industry standard.

- **Resource**: A configurable entity that needs to be continuously scanned for adherence with one or more controls. Examples of AWS instance resources include hosts, containers, security groups, users, and customer-managed IAM policies.

{{< img src="security_platform/cspm/getting_started/resource.png" alt="CSPM resource" style="width:65%;">}}

- **Rule**: A rule evaluates the configuration of a resource to validate a particular security best practice. These rules partially or completely, measure adherence to controls. Rules map to multiple controls, requirements, and frameworks.

{{< img src="security_platform/cspm/getting_started/rules.png" alt="Rules and frameworks" style="width:100%;">}}

- **Framework**: A collection of requirements that map to an industry benchmark or regulatory standard.

{{< img src="security_platform/cspm/getting_started/frameworks.png" alt="Frameworks overview" style="width:100%;">}}

## Get Started

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}Configure your cloud environment for CSPM scanning.{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/findings">}} Search and explore findings to reveal the details about a misconfigured resource, enabling you to identify the steps needed to fix it.{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/frameworks_and_benchmarks">}}Get details about Datadog’s OOTB configuration rules to compare your configuration to applicable regulatory standards, controls, and industry benchmarks.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: https://app.datadoghq.com/security/compliance?time=now
[3]: /security_platform/default_rules/#cat-cloud-configuration
[4]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
