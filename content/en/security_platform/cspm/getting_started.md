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
- link: "security_platform/cspm/frameworks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
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

Navigate to the [Getting Started page][1] to configure your environment for scanning.

## Setup

### Cloud environment

Evaluate the security configuration of your cloud environment. This section guides you through collecting resource configuration data from cloud providers. Resource configuration collection allows Datadog to assess your environments against Datadog’s OOTB Cloud Configuration rules [Add link].

### Hosts and containers

Evaluate the security configuration of your hosts and containers. This section guides you through configuring the Datadog Agent to scan your hosts and containers. Our agent allows Datadog to continuously assess the state of your hosts and containers against Datadog’s OOTB Runtime Compliance rules [Add link].

## Home

View your security posture with respect to Datadog’s OOTB security posture rules at a 1,000 foot level with the [Home page][2], with links to explore security configuration [findings][3] in more detail.

## Glossary

- **Average security configuration score**: Percentage of your environment that satisfies all of your active [Datadog’s OOTB rules][4]. Formula: `(# of resources with 0 findings) / (total # of resources scanned)`.

- **Requirement**:  A group of controls representing a single technical or operational topic, such as _Access Management_ or _Networking_. The regulatory framework PCI DSS, for example, has [12 requirements][5].

- **Control**: A specific recommendation for how technology, people, and processes should be managed; typically based on a regulation or industry standard.

- **Resource**: A configurable entity that needs to be continuously scanned for adherence with one or more controls. Examples of AWS instance resources include hosts, containers, security groups, users, and customer-managed IAM policies.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration?config_k9_configuration=true&detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=compliance_monitoring
[2]: https://app.datadoghq.com/security/compliance/homepage?config_k9_compliance_homepage=true
[3]: /security_platform/cspm/findings/
[4]: /security_platform/cspm/configuration_rules/
[5]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
