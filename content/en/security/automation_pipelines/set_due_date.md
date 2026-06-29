---
title: Set Due Date Rules
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
    icon: cloud-security-management
further_reading:
  - link: "/security/automation_pipelines"
    tag: "Documentation"
    text: "Automation Pipelines"
---

{{< product-availability >}}

Configure due date rules to ensure findings are addressed within your specified SLO time frames. By setting these due dates, you can automate accountability, meet compliance requirements, and prioritize the prompt remediation of security issues, thereby preventing potential exploitation.

## Create a due date rule

1. In Datadog, go to **Security** > **Settings** > [Findings Automation][2]. Click **Add a New Rule**, then select **Set Due Date**. The Create a New Rule page opens.
1. Under **Rule name**, enter a descriptive name for the rule; for example, "Cloud Infrastructure Anomaly Warnings".
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
      - Workload Activity
    - **Any of these tags or attributes**: The resource tags or attributes that must match for the rule to apply.
1. Set a due date for each severity level that needs one.
1. If the rule includes a CVE-based finding type (Library, Container Image, or Host vulnerability), under **Calculate due dates from**, select the base date for the SLA clock:
   - **First Seen Date**: Starts the SLA clock when Datadog first detects the finding.
   - **Fix-Available Date**: Starts the SLA clock when a patch is published for the vulnerability. Useful when you don't want teams to breach SLA on advisories they can't yet remediate.

   For all other finding types, First Seen Date is always used.
1. Click **Save**. The rule applies to new findings immediately and starts checking existing findings within the next hour.

## Where due dates appear

When a finding has a due date, you can see it in these locations:

- Explorer facets
- Findings side panel
- Notifications
- Jira ticket descriptions
- Reporting metrics (as an "overdue" Boolean) to identify teams or repositories with the most overdue vulnerabilities

## Rule matching order

When Datadog identifies a finding, it evaluates the finding against your sequence of due date rules. Starting with the first rule, if there's a match, Datadog sets a due date on the finding for the specified duration and stops evaluating further. If no match occurs, Datadog moves to the next rule. This process continues until a match is found or all rules are checked without a match.

## Removing due dates

When managing findings, due dates can be removed under various conditions, such as:

- The detection rule that triggered the finding passes successfully.
- The finding is muted, either manually or automatically through a mute rule.
- The due date rule associated with the finding is disabled or deleted.
- The associated due date rule is modified so that its criteria no longer match the finding.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=set_due_date
