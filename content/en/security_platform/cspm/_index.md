---
title: Cloud Security Posture Management
kind: documentation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

## Overview

Datadog Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud environment, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks.

{{< img src="security_platform/cspm/landing_page.png" alt="Cloud Security Posture Management" width="100%">}}

Assess the configuration of your cloud resources, such as security groups, storage buckets, load balancers, and databases against configuration rules. Use the Datadog Agent to review local configuration information from servers, containers, and Kubernetes clusters against Datadog's OOTB Posture Management [Cloud][1] and [Infrastructure][2] detection rules.

View your cloud security posture at a high level with the [Posture Management][3] page. Examine the details of findings and analyze historical configurations with [Findings][4].

## Glossary

- **Security posture score**: Percentage of your environment that satisfies all of your active Datadog OOTB [Cloud][1] and [Infrastructure][2] detection rules. Formula: `(# of evaluation:pass findings) / (total # of findings)`. Datadog then weighs this formula by severity: low severity detection rules have a weighting of "1" and critical severity detection rules have a weighting of "5". This means critical severity detection rules impact scores five times more than low severity detection rules to put greater emphasis on the detection rules that pose greater security risk. The score is also normalized to treat all all resource types and resource volumes the same (for example, 500 failing containers are weighted the same as three failing S3 buckets in the computed score). This normalization factor allows scores to be comparable across your cloud accounts, without the risk that they are heavily skewed if one account has more containers, or another has fewer storage buckets.

- **Requirement**: A group of controls representing a single technical or operational topic, such as _Access Management_ or _Networking_. The regulatory framework PCI DSS, for example, has [12 requirements][5].

- **Control**: A specific recommendation for how technology, people, and processes should be managed; typically based on a regulation or industry standard.

- **Resource**: A configurable entity that needs to be continuously scanned for adherence with one or more controls. Examples of AWS instance resources include hosts, containers, security groups, users, and customer-managed IAM policies.

{{< img src="security_platform/cspm/getting_started/resource.png" alt="Posture management resource information in the Datadog app" style="width:65%;">}}

- **Rule**: A rule evaluates the configuration of a resource to validate an element related to one or more controls. Rules may map to multiple controls, requirements, and frameworks.

{{< img src="security_platform/cspm/getting_started/rules.png" alt="A list of Cloud Security Posture Management detection rules" style="width:65%;">}}

- **Findings**: A finding is the primary primitive for a rule evaluation against a resource. Every time a resource is evaluated against a rule, a finding is generated with a Pass or Fail status.

- **Framework**: A collection of requirements that map to an industry benchmark or regulatory standard.

{{< img src="security_platform/cspm/getting_started/frameworks.png" alt="The frameworks overview in the Cloud Security Posture Management landing page" style="width:100%;">}}

## Get started

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-cloud">}}Out-of-the-box Posture Management Cloud detection rules{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-infra">}}Out-of-the-box Posture Management Infrastructure detection rules{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/findings">}} Learn about Cloud Security Posture Management findings{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}} Monitor the security and compliance posture of your Azure environment with Datadog{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security_platform/default_rules/#cat-posture-management-cloud
[2]: /security_platform/default_rules/#cat-posture-management-infra
[3]: https://app.datadoghq.com/security/compliance/homepage
[4]: /security_platform/cspm/findings
[5]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
