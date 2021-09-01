---
title: Sensitive Data Detection
kind: documentation
beta: true
further_reading:
- link: "/security/logs/"
  tag: "Documentation"
  text: "Security"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
---

<div class="alert alert-info">This page is about Sensitive Data Scanner, which is in currentl in private beta. Contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> if you want to learn more or participate in the beta program. </div>

## Overview

Sensitive data, such as US Social Security Numbers (SSN), credit card numbers, bank routing numbers, API keys, etc., are often exposed unintentionally in application logs and trace events, which can expose your organization to financial and privacy risks.

Often businesses are required to identify, remediate, and prevent the exposure of such sensitive data within their logs due to organizational policies, compliance requirements, industry regulations, and privacy concerns. This is especially true for industries such as banking, financial services, healthcare, and insurance among others.

## Sensitive data scanner

Sensitive data scanner is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. With implementation, your security and compliance teams can introduce a new line of defense in preventing sensitive data from leaking outside your organization.

Datadog's Scanner Library offers a wide variety of rules for commonly detected patterns such as email addresses, SSN, credit card numbers, API keys, authorization tokens, and others.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

### Setting up scanning groups

- **Define Scanning Groups:** Customize what data must be scanned using Pipelines. Define a query to indicate which logs must be included in the rule scope. See the [Logs search syntax page][1] for syntax on building searches.
- **Define Scanning Rule:** Create a new rule using predefined regex patterns from Datadog’s Scanner Library or create a custom rule.

### Custom rules

- **Define rule:** Specify the regex pattern to be used for matching against log events. Use sample data to verify that your regex pattern is valid.
- **Define scope:** Specify whether you want to scan the entire log event or just specific log attributes. You can also choose to skip specific attributes from the scan.
- **Add tags:** Specify the tags you want to associate with log events where the values match the specified regex pattern. Datadog recommends using the tag `sensitive_data`. These tags can then be used in searches, dashboards, and monitors.
- **Process matching values:** Optionally, specify whether you want to redact or hash the matching values. If you choose the redaction option, specify the placeholder text that you would like to replace the matching values with so that data is redacted or hashed before it gets stored in Datadog or sent to your archive.
- **Name the rule:** Provide an easy to understand name for the rule.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

### Scanner library

Select the rule that you want from the Scanner Library and click **Add** to start customizing the rule.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

### Permissions

By default, users with the Datadog Admin role have access to view and define the scanning rules. To allow other user access, grant the permission for Data Scanner under **Access Management**. See the [Custom RBAC documentation][2] for details on Roles and Permissions.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

### Using tags with Query based RBAC

Control who can access log events containing sensitive data. Use tags added by Sensitive Data Scanner to build queries with RBAC and restrict access to specific individuals or teams until the data ages out after the retention period.

**Note:**
- Any rules that you add or update only affect data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- Scrubbing and hashing of attributes in log events are irreversible changes. Verify your rules on test data before enabling on production data.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/explorer/search_syntax/
[2]: /logs/guide/logs-rbac-permissions/?tab=ui#overview
