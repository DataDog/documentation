---
title: Cloud Security Posture Management
kind: documentation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

Datadog Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud resources, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks.

Strengthen your security posture and achieve continuous compliance by detecting, prioritizing, and remediating misconfigurations across all your cloud resources, such as security groups, storage buckets, load balancers, and databases. By continuously surfacing security weaknesses resulting from misconfigurations, teams can easily mitigate risks while ensuring compliance with industry standards.

{{< img src="security_platform/cspm/landing_page.png" alt="Cloud Security Posture Management" width="100%">}}

## Detect misconfigurations across your cloud accounts and workloads

Assess the configuration of your cloud resources, such as security groups, storage buckets, load balancers, and databases against configuration rules. Use the Datadog Agent to review local configuration information from servers, containers, and Kubernetes clusters against Datadog's OOTB Posture Management [Cloud][1] and [Infrastructure][2] detection rules.

placeholder for screenshot

## Manage out-of-the-box and custom configuration rules

Use [out-of-the-box detection rules][7] to flag attacker techniques and potential misconfigurations so you can immediately take steps to remediate. [Customize how each rule scans your environment][6] and [create custom configuration rules][8] (GCP only).

placeholder for screenshot
## Maintain compliance with industry frameworks and benchmarks

Each detection rule maps to one or more controls and requirements within a compliance standard or industry benchmark, such as the popular CIS compliance benchmarks for Docker and Kubernetes.

 Datadog OOTB rules currently map to controls and requirements for the following frameworks and benchmarks:

Continuously monitor your compliance posture.

Datadog CSPM maps configuration rules to several industry benchmarks and regulatory standards, computing individual scores for each framework. This allows users to understand whether their cloud infrastructure is in compliance with aspects of PCI, GDPR, HIPAA, and more.

Our agent allows Datadog to continuously assess the state of your hosts and containers.

Datadog Cloud Security Posture Management (CSPM) uses the following rule types to validate the configuration of your cloud infrastructure:

Cloud configuration: These detection rules analyze the configuration of resources within your cloud environment. For example, the rule Cloudfront distribution is encrypted evaluates an AWS Cloudfront distribution’s configuration for encrypted status. Customization of a cloud configuration query directly is not supported at this time, but you can customize how you environment is scanned for each rule.

Infrastructure configuration: These detection rules analyze your containers and Kubernetes clusters to find configuration issues, as defined in the popular CIS compliance benchmarks for Docker and Kubernetes. For example, the rule /etc/default/docker file permissions are set to 644 or more restrictively evaluates Docker file permissions running on a host.

These detection rules work with out-of-the-box integration configurations and map to controls within a compliance framework or industry benchmark. When new default configuration detection rules are added, they are automatically imported into your account.

placeholder for screenshot

## Review and remediate findings

text

placeholder for screenshot

## Set up notifications

Add notification targets to...

## Glossary


Security posture score
: Percentage of your environment that satisfies all of your active Datadog OOTB [Cloud][1] and [Infrastructure][2] detection rules. Formula: `(# of evaluation:pass findings) / (total # of findings)`. Datadog then weighs this formula by severity: low severity detection rules have a weighting of "1" and critical severity detection rules have a weighting of "5". This means critical severity detection rules impact scores five times more than low severity detection rules to put greater emphasis on the detection rules that pose greater security risk. The score is also normalized to treat all all resource types and resource volumes the same (for example, 500 failing containers are weighted the same as three failing S3 buckets in the computed score). This normalization factor allows scores to be comparable across your cloud accounts, without the risk that they are heavily skewed if one account has more containers, or another has fewer storage buckets.

Requirement
: A group of controls representing a single technical or operational topic, such as _Access Management_ or _Networking_. The regulatory framework PCI DSS, for example, has [12 requirements][5].

Control
: A specific recommendation for how technology, people, and processes should be managed; typically based on a regulation or industry standard.

Resource
: A configurable entity that needs to be continuously scanned for adherence with one or more controls. Examples of AWS instance resources include hosts, containers, security groups, users, and customer-managed IAM policies.

  {{< img src="security_platform/cspm/getting_started/resource.png" alt="Posture management resource information in the Datadog app" style="width:65%;">}}

Rule
: A rule evaluates the configuration of a resource to validate an element related to one or more controls. Rules may map to multiple controls, requirements, and frameworks.

  {{< img src="security_platform/cspm/getting_started/rules.png" alt="A list of Cloud Security Posture Management detection rules" style="width:65%;">}}

Findings
: A finding is the primary primitive for a rule evaluation against a resource. Every time a resource is evaluated against a rule, a finding is generated with a Pass or Fail status.

Framework
: A collection of requirements that map to an industry benchmark or regulatory standard.

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
[6]: /security_platform/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[7]: /security_platform/default_rules/#cat-posture-management-cloud
[8]: /security_platform/cspm/custom_rules