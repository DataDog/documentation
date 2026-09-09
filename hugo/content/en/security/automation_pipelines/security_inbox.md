---
title: Add to Security Inbox Rules
aliases:
  - /security/vulnerability_pipeline/security_inbox
products:
  - name: Cloud Security
    url: /security/cloud_security_management/
    icon: cloud-security-management
  - name: Code Security
    url: /security/code_security/
    icon: security-code-security
  - name: App and API Protection
    url: /security/application_security/
    icon: app-sec
  - name: Workload Protection
    url: /security/workload_protection/
    icon: security-workload-security
further_reading:
  - link: "/security/security_inbox"
    tag: "Documentation"
    text: "Security Inbox"
  - link: "/security/automation_pipelines"
    tag: "Documentation"
    text: "Automation Pipelines"
---

{{< product-availability >}}

Configure inbox rules to manage your Security Inbox effectively, ensuring only the most relevant security issues are highlighted. By customizing conditions, you can focus on critical concerns, prioritize key risks, support compliance, and bring attention to issues that might otherwise be overlooked.

## Default inbox rules

Datadog provides a set of default inbox rules, compiled by the Datadog Security Research team, that populate your [Security Inbox][3] automatically. These rules cover the findings most likely to represent real risk in a typical environment.

Default rules appear alongside your own rules on the [Findings Automation][2] page. You can disable a default rule if it does not match how your organization triages, and you can add your own rules to cover cases the defaults miss.

## Create an inbox rule

1. In Datadog, go to **Security** > **Settings** > [Findings Automation][2]. Click **Add a New Rule**, then select **Add to Security Inbox**. The Create a New Rule page opens.
1. Under **Rule name**, enter a descriptive name for the rule; for example, "Cloud Infrastructure Anomaly Warnings".
1. Add your rule criteria into the following fields:
    - **Any of these types**: The types of findings that the rule should check for. Available types include:
      - Runtime Code Vulnerability
      - Static Code Vulnerability
      - Library Vulnerability
      - Secrets (Code)
      - Infrastructure as Code
      - Container Image Vulnerability
      - Host Vulnerability
      - Misconfiguration
      - Attack Path
      - Identity Risk
      - API Security
      - Workload Activity
    - **Any of these tags or attributes**: The resource tags or attributes that must match for the rule to apply.
1. To add severity criteria to the rule, click **Add Severity**.
1. Click **Save**. The rule applies to new findings immediately and starts checking existing findings within the next hour.

## Rule matching order

When Datadog identifies a finding, it evaluates the finding against your sequence of inbox rules. Starting with the first rule, if there's a match, Datadog adds the finding to the Security Inbox and stops evaluating further. If no match occurs, Datadog moves to the next rule. This process continues until a match is found or all rules are checked without a match.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox
[3]: /security/security_inbox/
