---
title: Scanning Rules
disable_toc: false
aliases:
  - /sensitive_data_scanner/scanning_rules
further_reading:
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Visually identify and prioritize security risks using Cloudcraft
---

{{< callout url="https://www.datadoghq.com/product-preview/human-name-pii-detection-in-logs-using-machine-learning/" btn_hidden="false" >}}
Human name PII detection in logs using machine learning is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

## Telemetry Data

Sensitive Data Scanner for Telemetry Data uses scanning rules to determine what sensitive information to match within the data. This data can be from your application logs, APM spans, RUM events, and events from Event Management. You can use Datadog's [Scanning Rule Library][1] to create rules or you can create [custom rules][2].

Datadog's Scanning Rule Library containes predefined scanning rules that detect common patterns, such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. See [Library Rules][1] for more information.

You can also create custom scanning rules using regular expression (regex) patterns to define the sensitive information for which you want to match. See [Custom Rules][2] for more information.

## Cloud Storage

Sensitive Data Scanner for Cloud Storage also uses scanning rules to determine what sensitive information to match within the data. All rules from the Datadog Scanning Library are applied and cannot be edited. See [Library Rules][1] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[2]: /security/sensitive_data_scanner/scanning_rules/custom_rules/