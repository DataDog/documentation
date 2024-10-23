---
title: Best Practices for Creating Custom Rules
disable_toc: false
further_reading:
- link: "/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Set up Sensitive Data Scanner"
- link: "/sensitive_data_scanner/regular_expression_syntax"
  tag: "Documentation"
  text: "Regular expression syntax for custom rules"
---

## Overview

Sensitive Data Scanner uses scanning rules to identify, tag, and optionally redact sensitive data in your logs, APM events, and RUM events. Use [out-of-the-box scanning rules][3] or create your own custom rules using [regular expression][1] (regex) patterns. This guide goes over best practices for creating custom rules with regex.

## Use precise regex patterns

Use regex patterns that are as precise as possible because generic patterns result in more false positives. To refine your regex pattern, test the regex in the **Sample data** box when you are creating a custom rule. See step 2 in [Add a custom scanning rule][2] for more information.

{{< img src="sensitive_data_scanner/guides/regex_sample_test.mp4" alt="Testing a regex pattern with a sample that matches and one that does not" video=true >}}

## Refine regex pattern matching

Add keywords to the keyword dictionary to refine detection accuracy for matching regex patterns. For example, if you are scanning for passwords, you can add keywords like `password`, `token`, `secret`, and `credential`. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value. See step 2 in [Add a custom scanning rule][2] for more information.

{{< img src="sensitive_data_scanner/guides/password_keyword.png" alt="A keyword dictionary with password, token, secret, credential" style="width:90%;" >}}

To make matches more precise, you can also do one of the following:

- Scan the entire event but exclude certain attributes from getting scanned. For example, if you are scanning for personally identifiable information (PII) like names, you might want to exclude attributes such as `resource_name` and `namespace`.
- Scan for specific attributes to limit the scope of the data that is scanned. For example, if you are scanning for names, you can specify scanning attributes such as `first_name` and `last_name`.

See step 3 in [Add a custom scanning rule][2] for more information.

## Use out-of-the-box rules

Use Datadog's out-of-the-box [library rules][3] when possible. The library rules are predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. [Contact support][4] if there is a rule that you want to use and think other users would also benefit from.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/sensitive_data_scanner/regular_expression_syntax/
[2]: https://docs.datadoghq.com/sensitive_data_scanner/?tab=inthecloud#add-scanning-rules
[3]: https://docs.datadoghq.com/sensitive_data_scanner/library_rules/
[4]: https://docs.datadoghq.com/help/