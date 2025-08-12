---
title: Findings Automation Pipelines
aliases:
  - /security/vulnerability_pipeline
further_reading:
  - link: "/security/automation_pipelines/mute"
    tag: "Documentation"
    text: "Mute Rules"
  - link: "/security/automation_pipelines/security_inbox"
    tag: "Documentation"
    text: "Add to Security Inbox Rules"
  - link: "/security/automation_pipelines/set_due_date"
    tag: "Documentation"
    text: "Set Due Date Rules"
  - link: "https://www.datadoghq.com/blog/datadog-iac-security/"
    tag: "Blog"
    text: "Prevent cloud misconfigurations from reaching production with Datadog IaC Security"
algolia:
  tags: ["automation pipelines", "findings automation", "findings pipelines", "finding automation"]
---

Automation Pipelines allows you to set up automated rules for newly discovered findings, thus accelerating triage and remediation efforts at scale.

## Availability

Automation Pipelines is available for:

- Misconfigurations
- Attack paths
- Identity risks
- Vulnerabilities
- Application Code Vulnerability
- Application Library Vulnerability
- Container Image Vulnerability
- API Security Finding
- Host Vulnerability

## How it works

Automation Pipelines operates through a rules-based system that allows you to automate how new findings are managed. Here's how it works:

- **Rule configuration**: Each rule consists of multiple criteria, designed to filter findings based on specific attributes. Within a rule, the combination of these criteria operates as a logical AND; however, if any criteria include multiple values, those values operate as a logical OR. This structure gives you the flexibility to create rules that precisely target your needs.
- **Rule matching**: Automation Pipelines evaluates findings against your rules in the order you've listed them. As each finding is processed, Automation Pipelines moves through the list until it finds a matching rule, at which point the specified action—such as muting non-urgent issues or highlighting critical threats—is triggered. Automation Pipeline rules apply immediately to new findings. For existing findings, updates can take up to two hours.

## Use cases

### Mute non-urgent findings to focus on what matters

Reduce alert fatigue and prioritize critical threats by automatically muting non-urgent findings. This allows you to:

- **Automatically ignore low-priority issues**: Suppress known false positives, accepted risks, and other findings that don't require immediate action. No manual review is needed.
- **Prioritize real threats**: Keep your attention on high-impact alerts that demand investigation and remediation.
- **Declutter your alert stream**: Eliminate noise from false positives, non-critical resources, test or staging environments, and short-lived resources that trigger alerts but pose no long-term risk.

### Customize the Security Inbox to highlight what's important to your organization

Customize the Security Inbox by defining specific conditions that determine which security issues are highlighted. This allows you to:

- **Resurface issues not captured by default**: Highlight issues that might be missed by out-of-the-box or custom detection rules to ensure critical issues are not overlooked.
- **Strengthen compliance and address key system concerns**: Address concerns affecting regulatory compliance or important business systems, regardless of severity.
- **Prioritize current risks**: Focus on immediate threats, such as identity risks after an incident, or industry-wide findings.

### Set due dates for findings to align with your security SLAs

Assign remediation deadlines to findings to improve accountability and stay compliant with your security policies. This allows you to:

- **Stay compliant by design**: Automatically apply due dates that align with industry standards, such as FedRAMP, PCI, and others.
- **Drive accountability across teams**: Use SLAs to ensure timely remediation without constant follow-ups, giving security and engineering clear expectations.
- **Promote proactive risk management** Encourage faster response times and reduce exposure by using SLAs to prioritize and track remediation efforts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
