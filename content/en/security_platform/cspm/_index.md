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

{{< img src="security_platform/cspm/landing_page.png" alt="Cloud Security Posture Management" width="100%">}}

## Detect misconfigurations across your cloud accounts and workloads

Strengthen your security posture and achieve continuous compliance by detecting, prioritizing, and remediating misconfigurations across all your cloud resources using Datadog's [out-of-the-box detection rules](#manage-out-of-the-box-and-custom-detection-rules). 

View a high-level overview of your security posture on the [Summary page][3]. Examine the details of findings and analyze historical configurations with the [Security Findings Explorer][9]. 

By continuously surfacing security weaknesses resulting from misconfigurations, teams can easily mitigate risks while ensuring compliance with industry standards.

**PLACEHOLDER FOR SCREENSHOT**

### Maintain compliance with industry frameworks and benchmarks

CSPM detection rules work with Datatog's out-of-the-box integration configurations. Each rule maps to one or more controls and requirements within a compliance standard or industry benchmark, such as the popular CIS compliance benchmarks for Docker and Kubernetes.

View compliance reports for each framework that include details such as resources with the most failed findings, a comprehensive breakdown of the number of resources with pass/fail findings, and the top three high-severity rule failures. This information enables you to understand whether your cloud infrastructure is in compliance with aspects of PCI, GDPR, HIPAA, and more.
## Manage out-of-the-box and custom detection rules

Use [out-of-the-box detection rules][7] to flag attacker techniques and potential misconfigurations so you can immediately take steps to remediate. Datadog continuously develops new default rules, which are automatically imported into your account. Customize the rules by defining [how each rule scans your environment][6], [create custom rules][8] (GCP only), and [set up real-time notifications for failed findings](#set-up-real-time-notifications).

**PLACEHOLDER FOR SCREENSHOT**

### Set up real-time notifications

Send real-time notifications when a failed finding is generated for a detection rule, so that your teams can take action to mitigate the risk. Notifications can be sent to Slack, email, PagerDuty, webhooks, and more.

Use template variables and Markdown to customize notification messages. Edit, disable, and delete existing notification rules, or create new rules and define custom logic for when a notification is triggered based on severity and rule type.

## Review and remediate findings

Drill down deeper into details using the Security Findings Explorer. View detailed information about a resource, such as configuration, detection rules applied to the resource, and tags that provide additional context about who owns the resources and its location within your environment.

**PLACEHOLDER FOR SCREENSHOT**

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
[9]: https://app.datadoghq.com/security/compliance