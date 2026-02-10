---
title: Library Rules
aliases:
  - /sensitive_data_scanner/library_rules/
  - /sensitive_data_scanner/scanning_rules/library_rules
further_reading:
    - link: "/security/sensitive_data_scanner/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner"
---

{{< callout url="https://www.datadoghq.com/product-preview/phone-number-physical-address-pii-detection-in-logs-using-machine-learning/" btn_hidden="false" >}}
Phone number and physical address PII detection in logs using machine learning are in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-info">Human Name Scanner detects personal names in logs using machine learning. The feature is in Preview for the {{< region-param key="dd_site_name" >}} site. Fill out the <a href="https://www.datadoghq.com/product-preview/human-name-pii-detection-in-logs-using-machine-learning/">form</a> to request access.</a></div>
{{< /site-region >}}

The Scanning Rule Library is a collection of predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. The recommended keywords are used by default when library rules are created.

These rules can also be viewed in Datadog:

1. Navigate to [Sensitive Data Scanner][1].
1. Click **Scanning Rules Library** on the top right side of the page.
1. To add rules from the library to a scanning group:<br />
   1. Select the rules you want to add.<br />
   1. Click **Add Rules to Scanning Group**.<br />
   1. Follow the steps in [Set Up Sensitive Data Scanner][2] to finish the setup.

{{< multifilter-search resource="sds_rules" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /security/sensitive_data_scanner/?#add-scanning-rules
