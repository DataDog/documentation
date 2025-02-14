---
title: Scanning Rules
disable_toc: false
further_reading:
- link: "/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules/"
  tag: "Documentation"
  text: "Best practices for creating custom scanning rules"
---

## Telemetry Data

Sensitive Data Scanner for Telemetry Data uses scanning rules to determine what sensitive information to match within the data. This data can be from your application logs, APM spans, RUM events, and events from Event Management. You can use Datadog's [Scanning Rule Library][1] to create rules or you can create [custom rules][2].

Datadog's Scanning Rule Library containes predefined scanning rules that detect common patterns, such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. See [Library Rules][1] for more information.

You can also create custom scanning rules using regular expression (regex) patterns to define the sensitive information for which you want to match. See [Custom Rules][2] for more information.

## Cloud Storage

Sensitive Data Scanner for Cloud Storage also uses scanning rules to determine what sensitive information to match within the data. All rules from the Datadog Scanning Library are applied and cannot be edited. See [Library Rules][1] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /sensitive_data_scanner/scanning_rules/library_rules/
[2]: /sensitive_data_scanner/scanning_rules/custom_rules/