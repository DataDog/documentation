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

Sensitive data, such as credit card numbers, bank routing numbers, API keys, OAuth tokens etc., are often exposed unintentionally in application logs and trace events, which can expose your organization to financial and privacy risks.

Often businesses are required to identify, remediate, and prevent the exposure of such sensitive data within their logs due to organizational policies, compliance requirements, industry regulations, and privacy concerns. This is especially true for industries such as banking, financial services, healthcare, and insurance among others.

## Sensitive Data Scanner

Sensitive data scanner is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. With implementation, your security and compliance teams can introduce a new line of defense in preventing sensitive data from leaking outside your organization.

Sensitive data scanner can be found under [Organization Settings][1]. The Scanner Library offers a wide variety of rules for commonly detected patterns such as email addresses, credit card numbers, API keys, authorization tokens, and others.

{{< img src="logs/sensitive_data_scanner/sensitive_data_scanner3.png" alt="Sensitive Data Scanner in Organization Settings" style="width:90%;">}}

### Setting up scanning groups

- **Define Scanning Groups:** Customize what data must be scanned using Pipelines. Define a query to indicate which logs must be included in the rule scope. See the [Logs search syntax page][2] for syntax on building searches.
- **Define Scanning Rule:** Create a new rule using predefined regex patterns from Datadog’s Scanner Library or create a custom rule.

### Custom rules

- **Define rule:** Specify the regex pattern to be used for matching against log events. Use sample data to verify that your regex pattern is valid.
- **Define scope:** Specify whether you want to scan the entire log event or just specific log attributes. You can also choose to skip specific attributes from the scan.
- **Add tags:** Specify the tags you want to associate with log events where the values match the specified regex pattern. Datadog recommends using the tag `sensitive_data`. These tags can then be used in searches, dashboards, and monitors.
- **Process matching values:** Optionally, specify whether you want to redact or hash the matching values. If you choose the redaction option, specify the placeholder text that you would like to replace the matching values so that data is redacted or hashed before it gets stored in Datadog or sent to your archive.
- **Name the rule:** Provide a human-readable name for the rule.

{{< img src="logs/sensitive_data_scanner/scanner_custom_rule2.png" alt="A Sensitive Data Scanner custom rule" style="width:90%;">}}

### Scanner library

Select the rule that you want from the Scanner Library and click **Add** to start customizing the rule.
{{< img src="logs/sensitive_data_scanner/scanner_library.png" alt="Scanner Library"  style="width:90%;">}}

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
- Scrubbing and hashing of attributes in log events are irreversible changes. Verify your rules on test data before enabling on production data.
- To turn off Sensitive Data Scanner entirely, disable each Scanning Group and Scanning Rule by setting the toggle to the **off** state.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[2]: /logs/explorer/search_syntax/
[3]: /logs/guide/logs-rbac-permissions/?tab=ui#overview
[4]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
