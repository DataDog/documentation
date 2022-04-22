---
title: Sensitive Data Scanner
kind: documentation
beta: true
aliases:
    - /logs/log_configuration/sensitive_data_detection
further_reading:
- link: "/security/logs/"
  tag: "Documentation"
  text: "Security"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
- link: "https://www.datadoghq.com/blog/sensitive-data-scanner/"
  tag: "Blog"
  text: "Build a modern data compliance strategy with Datadog's Sensitive Data Scanner"
---

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys are often exposed unintentionally in application logs and trace events, which can expose your organization to financial and privacy risks.

Often, businesses are required to identify, remediate, and prevent the exposure of such sensitive data within their logs due to organizational policies, compliance requirements, industry regulations, and privacy concerns. This is especially true within industries such as banking, financial services, healthcare, and insurance.

## Sensitive Data Scanner

Sensitive Data Scanner is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. Security and compliance teams can implement Sensitive Data Scanner as a new line of defense, helping prevent against sensitive data leaks and limiting non-compliance risks.

Sensitive Data Scanner can be found under [Organization Settings][1].

{{< img src="logs/sensitive_data_scanner/sds_main_apr_22.png" alt="Sensitive Data Scanner in Organization Settings" style="width:90%;">}}

### Setup

- **Define Scanning Groups:** A scanning group consists of a filter query indicating which kinds of logs to scan, and a set of scanning rules indicating specific types of sensitive data to scan for within those logs. See the [Log Search Syntax][2] documentation to learn more about filter queries.
- **Define Scanning Rules:** Within a scanning group, add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules from scratch to scan using custom regex patterns.

### Custom Scanning Rules

- **Define pattern:** Specify the regex pattern to be used for matching against log events. Test with sample data to verify that your regex pattern is valid.
- **Define scope:** Specify whether you want to scan the entire log event or just specific log attributes. You can also choose to exclude specific attributes from the scan.
- **Add tags:** Specify the tags you want to associate with log events where the values match the specified regex pattern. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags. These tags can then be used in searches, dashboards, and monitors.
- **Process matching values:** Optionally, specify whether you want to redact, partially redact, or hash matching values. When redacting, specify placeholder text to replace the matching values with. When partially redacting, specify the position (start/end) and length (# of characters) to redact within matching values. Redaction, partial redaction, and hashing are all irreversible actions.
- **Name the rule:** Provide a human-readable name for the rule.

{{< img src="logs/sensitive_data_scanner/sds_rule_apr_22.png" alt="A Sensitive Data Scanner custom rule" style="width:90%;">}}

### Out-of-the-box Scanning Rules

The Scanning Rule Library contains an evergrowing collection of predefined rules maintained by Datadog for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.
{{< img src="logs/sensitive_data_scanner/sds_library_apr_22.png" alt="Scanning Rule Library"  style="width:90%;">}}

### Permissions

By default, users with the Datadog Admin role have access to view and define the scanning rules. To allow other user access, grant the permission for Data Scanner under **Access Management**. See the [Custom RBAC documentation][3] for details on Roles and Permissions.

{{< img src="logs/sensitive_data_scanner/scanner_permission.png" alt="Permissions for Sensitive Data Scanner" style="width:90%;">}}

### Using tags with Query based RBAC

Control who can access log events containing sensitive data. Use tags added by Sensitive Data Scanner to build queries with RBAC and restrict access to specific individuals or teams until the data ages out after the retention period.

### Out-of-the-box dashboard

When Sensitive Data Scanner is enabled, an out-of-the-box [dashboard][4] summarizing sensitive data findings is automatically installed in your account.

{{<img src="account_management/sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

To access this dashboard, go to **Dashboards > Dashboards List** and search for `Sensitive Data Scanner Overview`.

**Note:**
- Any rules that you add or update only affect data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- To turn off Sensitive Data Scanner entirely, disable each Scanning Group and Scanning Rule by setting the toggle to the **off** state.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[2]: /logs/explorer/search_syntax/
[3]: /logs/guide/logs-rbac-permissions/?tab=ui#overview
[4]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
