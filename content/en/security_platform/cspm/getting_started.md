---
title: Getting Started with CSPM
kind: documentation
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration rules"
- link: "security_platform/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
- link: "security_platform/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
---

{{< site-region region="us" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is currently in <a href="https://app.datadoghq.com/security/configuration">public beta</a>.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED or US3.
</div>
{{< /site-region >}}

## Overview

Navigate to the [Getting Started page][1] to configure your environment for scanning.

{{< img src="security_platform/cspm/getting_started/posture-management-setup.png" alt="Setup page for CSPM" style="width:100%;">}}

## Setup

### Cloud environment

Detect misconfigurations in your cloud environment. This section guides you through collecting resource configuration data from cloud providers. Resource configuration collection allows Datadog to assess your environments against Datadog’s out-of-the-box [Cloud Configuration rules][2].

### Hosts and containers

Evaluate the security configuration of your hosts and containers. This section guides you through configuring the Datadog Agent to scan your hosts and containers. Our agent allows Datadog to continuously assess the state of your hosts and containers against Datadog’s out-of-the-box [Infrastructure Configuration rules][3].

## Posture Management

View your security posture with respect to Datadog’s OOTB security posture rules at a higher level with the [Home page][4], with links to [findings][5] in more detail.

{{< img src="security_platform/cspm/getting_started/posture-management-home.png" alt="Homepage for CSPM">}}

## Glossary

- **Average security configuration score**: Percentage of your environment that satisfies all of your active [Datadog’s OOTB rules][6]. Formula: `(# of resources with 0 findings) / (total # of resources scanned)`.

- **Requirement**:  A group of controls representing a single technical or operational topic, such as _Access Management_ or _Networking_. The regulatory framework PCI DSS, for example, has [12 requirements][7].

- **Control**: A specific recommendation for how technology, people, and processes should be managed; typically based on a regulation or industry standard.

- **Resource**: A configurable entity that needs to be continuously scanned for adherence with one or more controls. Examples of AWS instance resources include hosts, containers, security groups, users, and customer-managed IAM policies.

{{< img src="security_platform/cspm/getting_started/resource.png" alt="CSPM resource" style="width:65%;">}}

- **Rule**: A rule evaluates the configuration of a resource to validate a particular security best practice. These rules partially or completely, measure adherence to controls. Rules map to multiple controls, requirements, and frameworks.

{{< img src="security_platform/cspm/getting_started/rules.png" alt="Rules and frameworks" style="width:100%;">}}

- **Framework**: A collection of requirements that map to an industry benchmark or regulatory standard.

{{< img src="security_platform/cspm/getting_started/frameworks.png" alt="Frameworks overview" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration?config_k9_configuration=true&detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=compliance_monitoring
[2]: /security_platform/default_rules#cat-cloud-configuration
[3]: /security_platform/default_rules#cat-infrastructure-configuration
[4]: https://app.datadoghq.com/security/compliance/homepage?config_k9_compliance_homepage=true
[5]: /security_platform/cspm/findings/
[6]: /security_platform/cspm/configuration_rules/
[7]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
