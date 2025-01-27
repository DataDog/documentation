---
title: Scanning Rules
disable_toc: false
further_reading:
- link: "sensitive_data_scanner/scanning_rules/library_rules/"
  tag: "Documentation"
  text: "Learn more about Datadog scanning library rules"
- link: "sensitive_data_scanner/scanning_rules/custom_rules/"
  tag: "Documentation"
  text: "Learn more about regular expressions for custom scanning rules"
---

Sensitive Data scanner uses scanning rules to determine what sensitive information to match within the data. This data can be from your logs, APM spans, and RUM events. You can use Datadog's Scanning Rule Library or create custom rules.

Datadog's Scanning Rule Library are predefined scanning rules that detect common patterns, such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. See [Library Rules][1] for more information.

You can also create custom scanning rules using regular expression (regex) patterns to define the sensitive information for which you want to match. See [Custom Rules][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /sensitive_data_scanner/scanning_rules/library_rules/
[2]: /sensitive_data_scanner/scanning_rules/custom_rules/