---
title: Add to Security Inbox Rules
aliases:
  - /security/vulnerability_pipeline/security_inbox
further_reading:
  - link: "/security/security_inbox"
    tag: "Documentation"
    text: "Security Inbox"
---

{{< callout url="https://www.datadoghq.com/product-preview/customize-your-security-inbox/" >}}
  Automation Pipelines is in Preview. To enroll in the Preview for Add to Security Inbox rules, click <strong>Request Access</strong>.
{{< /callout >}} 

Configure inbox rules to manage your Security Inbox effectively, ensuring only the most relevant security issues are highlighted. By customizing conditions, you can focus on critical concerns, prioritize key risks, support compliance, and bring attention to issues that might otherwise be overlooked.

## Create an inbox rule

1. On the [Automation Pipelines][2] page, click **Add a New Rule** and select **Add to Security Inbox**.
1. Enter a descriptive name for the rule, for example, Cloud Infrastructure Anomaly Warnings.
1. Use the following boxes to configure the rule criteria:
    - **Any of these types**: The types of findings that the rule should check for. Available types include **Misconfiguration**, **Attack Path**, **Identity Risk**, and **API Security Finding**.
    - **Any of these tags or attributes**: The resource tags or attributes that must match for the rule to apply.
1. To add severity criteria to the rule, click **Add Severity**.
1. Click **Save**.

## Rule matching order

When Datadog identifies a vulnerability, it evaluates the vulnerability against your sequence of inbox rules. Starting with the first rule, if there's a match, Datadog adds the vulnerability to the Security Inbox and stops evaluating further. If no match occurs, Datadog moves to the next rule. This process continues until a match is found or all rules are checked without a match.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/pipeline-vulnerability