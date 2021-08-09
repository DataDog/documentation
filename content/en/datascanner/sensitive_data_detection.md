---
title: Sensitive Data Detection
kind: documentation
aliases:
    - /sensitive_data_detection/
further_reading:
- link: "/security/logs/"
  tag: "Documentation"
  text: "Security"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
---

<div class="alert alert-info">This page is about Sensitive Data Scanner which is in Private Beta. Contact Datadog Support if you want to learn more or participate in the Beta program. </div>

## Overview

Sensitive data such as US Social Security Numbers (SSN), credit card numbers, bank routing numbers, API keys and so on are often exposed unintentionally in application logs and trace events , exposing your organization to financial and privacy risks.

Most businesses are required to identify, remediate, and prevent the exposure of such sensitive data within their logs due to organizational policies, compliance requirements, industry regulations and privacy concerns. This is especially true for industries such as banking, financial services, healthcare, and insurance among others.

## Sensitive data scanner
With just a few clicks, your security and compliance teams can introduce a new line of defense in preventing sensitive data from leaking outside your organization.

Sensitive data scanner is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. Datadog's Scanner Library offers a wide variety of rules for commonly detected patterns such as email addresses, SSN, credit card numbers, API keys, authorization tokens, among others.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

### Setting up scanning groups

- **Define Scanning Groups:** Customize what data must be scanned using Pipelines. Define a query to indicate which logs must be included in the rule scope. See the Logs search syntax page for syntax on building searches.[1]
- **Define Scanning Rule:** Create a new rule using predefined regex patterns from Datadog’s Scanner Library or create a custom rule. 

### Custom rules

- **Define rule:** Specify the regex pattern to be used for matching against log events. Use sample data to verify that your regex pattern is valid.
- **Define scope:** Specify whether you want to scan the entire log event or just specific log attributes.  You can also choose to skip specific attributes from the scan.
- **Add tags:** Specify the tags you want to associate with log events where the values match the specified regex pattern. Datadog recommends using the tag sensitive_data. These tags can then be used in searches, dashboards, and monitors. 
- **Process matching values:** Optionally, you can specify whether you want to redact or hash the matching values. If you choose the redaction option, specify the placeholder text that you would like to replace the matching values with so that data is redacted or hashed before it gets stored in Datadog.
- **Name the rule:** Provide an easy to understand name for the rule.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

### Scanner library

Select the rule that you want from the Scanner Library and click Add to start customizing the rule.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

Select the rule that you want from the Scanner Library and click Add to start customizing the rule.

### Permissions

By default, users with Datadog Admin Role have access to view and define the scanning rules. To allow other users access, grant the permission for Data Scanner under Access Management. See the Custom RBAC documentation for details on Roles and Permissions.[2]

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

### Using tags with Query based RBAC

Easily control who can access log events containing sensitive data. Use tags added by Sensitive Data Scanner to build queries with RBAC and restrict access to specific individuals or teams until the data ages out after the retention period.[3]  

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

**Note:** 
- Any rules that you add or update only affect data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search_syntax/
[2]: /account_management/rbac/?tab=datadogapplication
[3]: /logs/guide/logs-rbac/?tab=ui
