---
title: Cloud Security Posture Management
kind: documentation
aliases:
  - /security_platform/cspm/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

Datadog Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud resources, automate audit evidence collection, and remediate misconfigurations that leave your organization vulnerable to attacks. By continuously surfacing security weaknesses resulting from misconfigurations, teams can mitigate risks while ensuring compliance with industry standards.

## Detect misconfigurations across your cloud resources

Strengthen your security posture and achieve continuous compliance by detecting, prioritizing, and remediating misconfigurations across all your cloud resources using Datadog's [out-of-the-box detection rules](#manage-out-of-the-box-and-custom-detection-rules). 

View a high-level overview of your security posture on the [Overview page][1]. Examine the details of findings and analyze historical configurations with the [Security Findings Explorer][2].

{{< img src="security/cspm/overview_page.png" alt="Cloud Security Posture Management overview page" width="100%">}}

## Maintain compliance with industry frameworks and benchmarks

CSPM comes with more than 400 out-of-the-box detection rules that are maintained by a team of security experts. The rules map to controls and requirements within compliance standards and industry benchmarks, such as PCI and SOC2 compliance frameworks.

[View compliance reports][3] to see how well you're doing against each control in a compliance framework. The reports include details such as resources with the most failed findings, a comprehensive breakdown of the number of resources with pass/fail findings, and the top three high-severity rule failures.

{{< img src="security/cspm/compliance_frameworks.png" alt="Cloud Security Posture Management compliance frameworks" width="100%">}}

## Manage out-of-the-box and custom detection rules

[Out-of-the-box detection rules][4] surface the most important risks so that you can immediately take steps to remediate. Datadog continuously develops new default rules, which are automatically imported into your account. [Customize the rules][5] by defining how each rule scans your environment, [create custom rules][6], and [set up real-time notifications for failed findings](#set-up-real-time-notifications).

{{< img src="security/cspm/detection_rules.png" alt="Cloud Security Posture Management detection rules" width="100%">}}

## Set up real-time notifications

[Send real-time notifications][7] when a new misconfiguration is detected in your environment, so that your teams can take action to mitigate the risk. Notifications can be sent to [Slack, email, PagerDuty, webhooks, and more][8].

Use template variables and Markdown to [customize notification messages][9]. Edit, disable, and delete existing notification rules, or create new rules and define custom logic for when a notification is triggered based on severity and rule type.

{{< img src="security/cspm/rule_notification_setup.png" alt="Cloud Security Posture Management rule notification setup page" width="100%">}}

## Review and remediate findings

Investigate details using the [Security Findings Explorer][10]. View detailed information about a resource, such as configuration, detection rules applied to the resource, and tags that provide additional context about who owns the resource and its location within your environment.

{{< img src="security/cspm/security_findings_explorer.png" alt="Cloud Security Posture Management security findings explorer" width="100%">}}

## Glossary

Security posture score
: Percentage of your environment that satisfies all of your active Datadog OOTB [Cloud][4] and [Infrastructure][11] detection rules. Formula: `(# of evaluation:pass findings) / (total # of findings)`. Datadog then weighs this formula by severity: low severity detection rules have a weighting of "1" and critical severity detection rules have a weighting of "5". This means critical severity detection rules impact scores five times more than low severity detection rules to put greater emphasis on the detection rules that pose greater security risk. The score is also normalized to treat all resource types and resource volumes the same (for example, 500 failing containers are weighted the same as three failing S3 buckets in the computed score). This normalization factor allows scores to be comparable across your cloud accounts, without the risk that they are heavily skewed if one account has more containers, or another has fewer storage buckets.

Requirement
: A group of controls representing a single technical or operational topic, such as _Access Management_ or _Networking_. The regulatory framework PCI DSS, for example, has [12 requirements][12].

Control
: A specific recommendation for how technology, people, and processes should be managed; typically based on a regulation or industry standard.

Resource
: A configurable entity that needs to be continuously scanned for adherence with one or more controls. Examples of AWS instance resources include hosts, containers, security groups, users, and customer-managed IAM policies.

Rule
: A rule evaluates the configuration of a resource to validate an element related to one or more controls. Rules may map to multiple controls, requirements, and frameworks.

Findings
: A finding is the primary primitive for a rule evaluation against a resource. Every time a resource is evaluated against a rule, a finding is generated with a Pass or Fail status.

Framework
: A collection of requirements that map to an industry benchmark or regulatory standard.

## Get started

{{< whatsnext >}}
  {{< nextlink href="/security/cspm/getting_started">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}Out-of-the-box Posture Management Cloud detection rules{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}Out-of-the-box Posture Management Infrastructure detection rules{{< /nextlink >}}
  {{< nextlink href="/security/cspm/findings">}} Learn about Cloud Security Posture Management findings{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}} Monitor the security and compliance posture of your Azure environment{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}} Improve the compliance and security posture of your Google Cloud environment{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: https://app.datadoghq.com/security/compliance
[3]: /security/cspm/frameworks_and_benchmarks
[4]: /security/default_rules/#cat-posture-management-cloud
[5]: /security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[6]: /security/cspm/custom_rules
[7]: /security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules
[8]: /security/notifications/
[9]: /security/notifications/#detection-rule-notifications
[10]: /security/cspm/findings
[11]: /security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
