---
title: Mute Rules
aliases:
  - /security/vulnerability_pipeline/mute
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
further_reading:
  - link: "/security/automation_pipelines"
    tag: "Documentation"
    text: "Automation Pipelines"
  - link: "https://www.datadoghq.com/blog/datadog-iac-security/"
    tag: "Blog"
    text: "Prevent cloud misconfigurations from reaching production with Datadog IaC Security"
---

{{< product-availability >}}

Configure mute rules to streamline security alerts by automatically filtering out non-urgent findings. This approach helps reduce noise from known false positives and accepted risks, allowing you to focus on addressing the most critical threats.

## Create a mute rule

1. In Datadog, go to **Security** > **Settings** > [Findings Automation][2]. Click **Add a New Rule**, then select **Mute**. The Create a New Rule page opens.
1. Under **Rule name**, enter a descriptive name for the rule; for example, "Compensating control in place for account payment-prod".
1. Add your rule criteria into the following fields:
    - **Any of these types**: The types of findings that the rule should check for. Available types include:
      - Runtime Code Vulnerability
      - Static Code Vulnerability
      - Library Vulnerability
      - Secret
      - Infrastructure as Code
      - Container Image Vulnerability
      - Host Vulnerability
      - Misconfiguration
      - Attack Path
      - Identity Risk
      - API Security
    - **Any of these tags or attributes**: The resource tags or attributes that must match for the rule to apply.
1. To add severity criteria to the rule, click **Add Severity**.
1. Specify the mute reason and duration:
    - **Reason for muting**: The reason for muting the finding. Available reasons include:
      - False Positive
      - Risk Accepted
      - Pending fix
      - No Fix
      - Duplicate
      - Other
    - **Rule expiration**: The date on which the rule expires.
    - **Further description for muting reason**: Optional box for additional details.
1. Click **Save**. The rule applies to new findings immediately and starts checking existing findings within the next hour.

## Rule matching order

When Datadog identifies a finding, it evaluates the finding against your sequence of mute rules. Starting with the first rule, if there's a match, Datadog mutes the finding for the specified duration and stops evaluating further. If no match occurs, Datadog moves to the next rule. This process continues until a match is found or all rules are checked without a match.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=mute
