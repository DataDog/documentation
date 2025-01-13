---
title: Automation Pipelines
aliases:
  - /security/vulnerability_pipeline
further_reading:
  - link: "/security/automation_pipelines/mute"
    tag: "Documentation"
    text: "Mute Rules"
  - link: "/security/automation_pipelines/security_inbox"
    tag: "Documentation"
    text: "Add to Security Inbox Rules"
---

{{< callout btn_hidden="true">}}
  Automation Pipelines is in Preview. To enroll and access the automated rules, you must register for each set of rules separately:
  <ul><li><a href="https://www.datadoghq.com/product-preview/security-automation-pipelines/">Mute and Assign Due Date</a></li>
  <li><a href="https://www.datadoghq.com/product-preview/customize-your-security-inbox/">Add to Security Inbox</a></li></ul>
{{< /callout >}} 

Automation Pipelines allows you to set up automated rules for newly discovered vulnerabilities, thus accelerating triage and remediation efforts at scale.

## Availability

Automation Pipelines is available for:

- Misconfigurations
- Attack paths
- Identity risks
- Vulnerabilities

## How it works

Automation Pipelines operates through a rules-based system that allows you to automate how new vulnerabilities are managed. Here's how it works:

- **Rule configuration**: Each rule consists of multiple criteria, designed to filter vulnerabilities based on specific attributes. Within a rule, the combination of these criteria operates as a logical AND; however, if any criteria include multiple values, those values operate as a logical OR. This structure gives you the flexibility to create rules that precisely target your needs.
- **Rule matching**: Automation Pipelines evaluates vulnerabilities against your rules in the order you've listed them. As each vulnerability is processed, Automation Pipelines moves through the list until it finds a matching rule, at which point the specified action—such as muting non-urgent issues or highlighting critical threats—is triggered.

## Use cases

### Mute non-urgent findings so you can prioritize immediate threats

Mitigate information overload by muting non-urgent findings, so you can focus on critical threats. This allows you to:

- **Proactively discard non-urgent findings**: Automatically filter out known scenarios that don't require immediate action, such as false positives or accepted risks, without manual intervention.
- **Focus on true risks**: Prioritize and address genuine threats, ensuring your attention is directed towards remediating real and pressing issues.
- **Streamline security alerts**: Eliminate noise from security alerts related to:
  - Known false positives
  - Resources deemed non-critical or unimportant
  - Intentional vulnerabilities in controlled environments
  - Ephemeral resources that naturally flag without posing long-term concerns

### Customize the Security Inbox to highlight what's important to your organization

Customize the Security Inbox by defining specific conditions that determine which security issues are highlighted. This allows you to:

- **Resurface issues not captured by default**: Highlight issues that might be missed by out-of-the-box or custom detection rules, ensuring no critical issue is overlooked.
- **Strengthen compliance and address key system concerns**: Address concerns affecting regulatory compliance or important business systems, regardless of severity.
- **Prioritize current risks**: Focus on immediate threats, such as identity risks after an incident, or industry-wide vulnerabilities.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}