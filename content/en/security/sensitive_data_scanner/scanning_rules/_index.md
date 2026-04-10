---
title: Scanning Rules
disable_toc: false
aliases:
  - /sensitive_data_scanner/scanning_rules
further_reading:
- link: "https://www.datadoghq.com/blog/human-name-detection"
  tag: "Blog"
  text: "Detect human names in logs with ML in Sensitive Data Scanner"
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Visually identify and prioritize security risks using Cloudcraft
---

## Telemetry Data
{{< callout url="https://www.datadoghq.com/product-preview/phone-number-physical-address-pii-detection-in-logs-using-machine-learning/" btn_hidden="false" >}}
Phone number and physical address PII detection in logs using machine learning are in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-info">Human Name Scanner detects personal names in logs using machine learning. The feature is in Preview for the {{< region-param key="dd_site_name" >}} site. Fill out the <a href="https://www.datadoghq.com/product-preview/human-name-pii-detection-in-logs-using-machine-learning/">form</a> to request access.</a></div>
{{< /site-region >}}

Sensitive Data Scanner for Telemetry Data uses scanning rules to determine what sensitive information to match within the data. This data can be from your application logs, APM spans, RUM events, and events from Event Management. You can use Datadog's [Scanning Rule Library][1] to create rules or you can create [custom rules][2].

Datadog's Scanning Rule Library containes predefined scanning rules that detect common patterns, such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. See [Library Rules][1] for more information.

You can also create custom scanning rules using regular expression (regex) patterns to define the sensitive information for which you want to match. See [Custom Rules][2] for more information.

## Cloud Storage

Sensitive Data Scanner for Cloud Storage also uses scanning rules to determine what sensitive information to match within the data. All rules from the Datadog Scanning Library are applied and cannot be edited. See [Library Rules][1] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[2]: /security/sensitive_data_scanner/scanning_rules/custom_rules/