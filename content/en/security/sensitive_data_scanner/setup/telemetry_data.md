---
title: Telemetry Data
disable_toc: false
aliases:
  - /sensitive_data_scanner/setup/telemetry_data
further_reading:
  - link: "/security/sensitive_data_scanner/scanning_rules/library_rules"
    tag: "Documentation"
    text: "Learn more about out-of-the-box library rules"
  - link: "/security/sensitive_data_scanner/scanning_rules/custom_rules"
    tag: "Documentation"
    text: "Learn more about creating custom rules"
  - link: "/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules/"
    tag: "Documentation"
    text: "Best practices for creating custom scanning rules"
---

## Overview

Sensitive Data Scanner in the Cloud scans telemetry data, such as your application logs, APM events, RUM events, and events from Event Management. The data that can be scanned and redacted are:

- Logs: All structured and unstructured log content, including log message and attribute values
- APM: Span attribute values only
- RUM: Event attribute values only
- Events: Event attribute values only

{{< callout url="https://www.datadoghq.com/product-preview/role-based-sensitive-data-unmasking-in-logs" btn_hidden="false" >}}
Role-based sensitive data unmasking in logs is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

You submit logs and events to the Datadog backend, so the data leaves your environment before it gets redacted. The logs and events are scanned and redacted in the Datadog backend during processing, so sensitive data is redacted before events are indexed and shown in the Datadog UI.

If you don't want data to leave your environment before it gets redacted, use [Observability Pipelines][12] and the [Sensitive Data Scanner processor][13] to scan and redact sensitive data. See [Set Up Pipelines][14] for information on how to set up a pipeline and its components.

To use Sensitive Data Scanner in the Cloud, set up a scanning group to define what data to scan and then add scanning rules to determine what sensitive information to match within the data.

This document goes through the following:

- The [permissions](#permissions) required to view and set up Sensitive Data Scanner.
- [Adding a scanning group](#add-a-scanning-group)
- [Adding scanning rules](#add-scanning-rules)
- [How to control access to logs wth sensitive data](#control-access-to-logs-with-sensitive-data)
- [How to redact sensitive data in tags](#redact-sensitive-data-in-tags)

## Setup

### Permissions

By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permissions under [Compliance][1] to a custom role. See [Access Control][2] for details on how to set up roles and permissions.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:80%;">}}

### Add a scanning group

A scanning group determines what data to scan. It consists of a query filter, a set of buttons to enable scanning for logs, APM, RUM, and events, and the option to set sampling rates between 10% to 99% for each product. See the [Log Search Syntax][3] documentation to learn more about query filters.

For Terraform, see the [Datadog Sensitive Data Scanner group][4] resource.

To set up a scanning group, perform the following steps:

1. Navigate to the [Sensitive Data Scanner][5] settings page.
1. Click **Add scanning group**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Group**.
1. Enter a query filter for the data you want to scan. At the top, click **APM Spans** to preview the filtered spans. Click **Logs** to see the filtered logs.
1. Enter a name and description for the group.
1. Click the option buttons to enable Sensitive Data Scanner for the products you want (for example, logs, APM spans, RUM events, and Datadog events).
1. Optionally set a sampling rate of 10-99% for the products you want. When you add scanning rules to a group that has sampling enabled, you will not be able to select actions that obfuscate the data it scans. To obfuscate matches, you must choose to scan all data matching your group query filter.
1. Click **Create**.

By default, a newly-created scanning group is disabled. To enable a scanning group, click the corresponding toggle on the right side.

### Add scanning rules

A scanning rule determines what sensitive information to match within the data defined by a scanning group. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regex patterns. The data is scanned at ingestion time during processing. For logs, this means the scan is done before indexing and other routing decisions.

For Terraform, see the [Datadog Sensitive Data Scanner rule][6] resource.

To add scanning rules, perform the following steps:

1. Navigate to the [Sensitive Data Scanner][5] settings page.
1. Click the scanning group where you want to add the scanning rules.
1. Click **Add Scanning Rule**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Rule**.
1. Select whether you want to add a library rule or create a custom scanning rule.

{{% collapse-content title="Add scanning rule from the library rules" level="p" %}}

The Scanning Rule Library contains predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.

1. Select a scanning group if you did not create this rule within a scanning group.
1. In the **Add library rules to the scanning group** section, select the library rules you want to use.
{{% sds-scanning-rule %}}
1. Click **Add Rules**.

#### Add additional keywords

After adding OOTB scanning rules, you can edit each rule separately and add additional keywords to the keyword dictionary.

1. Navigate to the [Sensitive Data Scanner][5] settings page.
1. Click the scanning group with the rule you want to edit.
1. Hover over the rule, and then click the pencil icon.
1. The recommend keywords are used by default. To add additional keywords, toggle **Use recommended keywords**, then add your keywords to the list. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. Click **Update**.

{{% /collapse-content %}}
{{% collapse-content title="Add a custom scanning rule" level="p" %}}
You can create custom scanning rules using regex patterns to scan for sensitive data.

1. Select a scanning group if you did not create this rule within a scanning group.
1. In the **Define match conditions** section, specify the regex pattern to use for matching against events in the **Define the regex** field. Enter sample data in the **Add sample data** field to verify that your regex pattern is valid.<br>
    Sensitive Data Scanner supports Perl Compatible Regular Expressions (PCRE), but the following patterns are not supported:
    - Backreferences and capturing sub-expressions (lookarounds)
    - Arbitrary zero-width assertions
    - Subroutine references and recursive patterns
    - Conditional patterns
    - Backtracking control verbs
    - The `\C` "single-byte" directive (which breaks UTF-8 sequences)
    - The `\R` newline match
    - The `\K` start of match reset directive
    - Callouts and embedded code
    - Atomic grouping and possessive quantifiers
1. For **Create keyword dictionary**, add keywords to refine detection accuracy when matching regex conditions. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
{{% sds-scanning-rule %}}
1. Click **Add Rule**.
{{% /collapse-content %}}

**Notes**:

- Any rules that you add or update affect only data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- After rules are added, ensure that the toggles for your scanning groups are enabled to begin scanning.
- When you add rules to a scanning group with sampling enabled, you will not be able to select the **redact**, **partially redact**, or **hash** actions. For complete obfuscation, disable sampling in your scanning group settings.

See [Investigate Sensitive Data Issues][7] for details on how to use the [Summary][8] page to triage your sensitive data issues.

#### Excluded namespaces

There are reserved keywords that the Datadog platform requires for functionality. If any of these words are in a log that is being scanned, the 30 characters after the matched word are ignored and not redacted. For example, what comes after the word `date` in a log is usually the event timestamp. If the timestamp is accidentally redacted, that would result in issues with processing the log and being able to query it later. Therefore, the behavior for excluded namespaces is to prevent unintentionally redacting important information for product functionality.

The excluded namespaces are:

- `host`
- `hostname`
- `syslog.hostname`
- `service`
- `status`
- `env`
- `dd.trace_id`
- `trace_id`
- `trace id`
- `dd.span_id`
- `span_id`
- `span id`
- `@timestamp`
- `timestamp`
- `_timestamp`
- `Timestamp`
- `date`
- `published_date`
- `syslog.timestamp`
- `error.fingerprint`
- `x-datadog-parent-id`

### Edit scanning rules

1. Navigate to the [Sensitive Data Scanner][5] settings page.
1. Hover over the scanning rule you want to edit and click the **Edit** (pencil) icon.
   The **Define match conditions** section shows either the regular expression you wrote for your custom rule or an explanation of the library scanning rule you chose along with examples of matched sensitive information.
1. To make sure that a rule matches your data, you can provide a sample in the **Add sample data** section. If the rule finds matches in the sample data, a green **Match** label appears next to the input field.
1. Under **Create keyword dictionary**, you can add keywords to refine detection accuracy. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`.
1. Choose the number of characters before a match that the keyword must appear in. By default, keywords must be within 30 characters before a match.
1. Optionally, under **Define rule target and action**, edit the tags that you want to associate with events where the values match the rule. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags, which can be used in searches, dashboards, and monitors. See [Control access to logs with sensitive data](#control-access-to-logs-with-sensitive-data) for information on how to use tags to determine who can access logs that contain sensitive data.
1. For **Set priority level**, choose a value based on your business needs.
1. Click **Update**.

## Control access to logs with sensitive data

To control who can access logs containing sensitive data, use tags added by the Sensitive Data Scanner to build queries with role-based access control (RBAC). You can restrict access to specific individuals or teams until the data ages out after the retention period. See [How to Set Up RBAC for Logs][9] for more information.

## Redact sensitive data in tags

To redact sensitive data contained in tags, you must [remap][10] the tag to an attribute and then redact the attribute. Uncheck `Preserve source attribute` in the remapper processor so that the tag is not preserved during the remapping.

To remap the tag to an attribute:

1. Navigate to your [log pipeline][11].
2. Click **Add Processor**.
3. Select **Remapper** in the processor type dropdown menu.
4. Name the processor.
5. Select **Tag key(s)**.
6. Enter the tag key.
7. Enter a name for the attribute the tag key is remapped to.
8. Disable **Preserve source attribute**.
9. Click **Create**.

To redact the attribute:

1. Navigate to your [scanning group][5].
2. Click **Add Scanning Rule**.
3. Check the library rules you want to use.
4. Select **Specific Attributes** for **Scan entire event or portion of it**.
5. Enter the name of the attribute you created earlier to specify that you want it scanned.
6. Select the action you want when there's a match.
7. Optionally, add tags.
8. Click **Add Rules**.

## Disable Sensitive Data Scanner

To turn off Sensitive Data Scanner entirely, set the toggle to **off** for each Scanning Group so that they are disabled.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#compliance
[2]: /account_management/rbac/
[3]: /logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
[8]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[9]: /logs/guide/logs-rbac/
[10]: /logs/log_configuration/processors/?tab=ui#remapper
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /observability_pipelines/
[13]: /observability_pipelines/processors/sensitive_data_scanner/
[14]: /observability_pipelines/set_up_pipelines/