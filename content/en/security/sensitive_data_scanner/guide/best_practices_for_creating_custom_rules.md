---
title: Best Practices for Creating Custom Rules
disable_toc: false
aliases:
  - /sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
further_reading:
- link: "/security/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Set up Sensitive Data Scanner"
- link: "/security/sensitive_data_scanner/regular_expression_syntax"
  tag: "Documentation"
  text: "Regular expression syntax for custom rules"
---

## Overview

Sensitive Data Scanner uses scanning rules to identify, tag, and optionally redact sensitive data in your logs, APM events, and RUM events. Use [out-of-the-box scanning rules][3] or create custom rules using [regular expression][1] (regex) patterns. This guide goes over best practices for creating custom rules using regex patterns.

## Use precise regex patterns

Define regex patterns that are as precise as possible because generic patterns result in more false positives. To refine your regex pattern, add test data in the sample data tester when creating a custom rule. For more information, see step 2 in [Add a custom scanning rule][2].

{{< img src="sensitive_data_scanner/guides/regex_sample_test.mp4" alt="Testing a regex pattern with a sample that matches and one that does not" video=true >}}

## Refine regex pattern matching

Provide a list of keywords to the keyword dictionary to refine regex pattern matching. The dictionary checks for the matching pattern within a defined proximity of those keywords. For example, if you are scanning for passwords, you can add keywords like `password`, `token`, `secret`, and `credential`. You can also specify that these keywords be within a certain number of characters of a match. By default, keywords must be within 30 characters before a matched value. See step 2 in [Add a custom scanning rule][2] for more information.

{{< img src="sensitive_data_scanner/guides/password_keyword.png" alt="A keyword dictionary with password, token, secret, credential" style="width:90%;" >}}

To make matches more precise, you can also do one of the following:

- Scan the entire event but exclude certain attributes from getting scanned. For example, if you are scanning for personally identifiable information (PII) like names, you might want to exclude attributes such as `resource_name` and `namespace`.
- Scan for specific attributes to narrow the scope of the data that is scanned. For example, if you are scanning for names, you can choose specific attributes such as `first_name` and `last_name`.

See step 3 in [Add a custom scanning rule][2] for more information.

{{< img src="sensitive_data_scanner/guides/include_exclude_attributes.mp4" alt="Exclude attributes when scanning an entire event or scan for specific attributes" video=true >}}

## Use out-of-the-box rules

Whenever possible, use Datadog's out-of-the-box [library rules][3]. These rules are predefined rules that detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. Each rule has recommended keywords for the keyword dictionary to refine matching accuracy. You can also [add your own keywords][5]. 

[Contact support][4] if there is a rule that you want to use and think other users would also benefit from it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/scanning_rules/custom_rules/
[2]: /security/sensitive_data_scanner/setup/telemetry_data/#add-scanning-rules
[3]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[4]: /help/
[5]: /security/sensitive_data_scanner/setup/telemetry_data/#add-custom-keywords