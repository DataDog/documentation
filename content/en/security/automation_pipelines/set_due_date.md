---
title: Set Due Date Rules
further_reading:
  - link: "/security/automation_pipelines"
    tag: "Documentation"
    text: "Automation Pipelines"
---

{{< callout url="https://www.datadoghq.com/product-preview/security-automation-pipelines/" >}}
  Automation Pipelines is in Preview. To enroll in the Preview for due date rules, click <strong>Request Access</strong>.
{{< /callout >}} 

Configure due date rules to ensure vulnerabilities are addressed within your specified SLO time frames. By setting these due dates, you can automate accountability, meet compliance requirements, and prioritize the prompt remediation of security issues, thereby preventing potential exploitation.

Notification rules are pre-set conditions that automate security issue notifications for your team. With notification rules, you don't need to manually set up alerts for each individual detection rule. Instead, you can configure rules to cover various scenarios by specifying factors like severity, rule type, and tags.

Notification rules help automatically alert your team about security problems. Instead of setting up alerts for each issue one by one, you use notification rules. You can set these rules to cover different situations by choosing options like severity, type, and specific tags.

## Create a due date rule

1. On the [Automation Pipelines][2] page, click **Add a New Rule** and select **Set Due Date**.
1. Enter a descriptive name for the rule, for example, **Cloud Infrastructure Anomaly Warnings**.
1. Use the following boxes to configure the rule criteria:
    - **Any of these types**: The types of findings that the rule should check for. Available types include **Application Code Vulnerability**, **Application Library Vulnerability**, **Container Image Vulnerability**, **Misconfiguration**, **Attack Path**, **Identity Risk**, and **API Security Finding**.
    - **Any of these tags or attributes**: The resource tags or attributes that must match for the rule to apply.
1. Set a due date for each severity level, effective from the discovery of a matching severity vulnerability. Optionally, you can omit a due date if it is not necessary for a severity level. 
1. Click **Save**.

## Rule matching order

When Datadog identifies a vulnerability, it evaluates the vulnerability against your sequence of due date rules. Starting with the first rule, if there's a match, Datadog sets a due date on the vulnerability for the specified duration and stops evaluating further. If no match occurs, Datadog moves to the next rule. This process continues until a match is found or all rules are checked without a match.

## Removing due dates

When managing vulnerabilities, due dates can be removed under various conditions, such as:

- The detection rule that triggered the vulnerability passes successfully.
- The vulnerability is muted, either manually or automatically through a mute rule.
- The due date rule associated with the vulnerability is disabled or deleted.
- The associated due date rule is modified so that its criteria no longer match the vulnerability.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/pipeline-vulnerability