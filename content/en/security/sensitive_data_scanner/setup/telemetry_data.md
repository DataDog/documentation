---
title: Telemetry Data
disable_toc: false
aliases:
  - /sensitive_data_scanner/setup/telemetry_data
  - /security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
  - /sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
further_reading:
  - link: "/security/sensitive_data_scanner/scanning_rules/library_rules"
    tag: "Documentation"
    text: "Learn more about out-of-the-box library rules"
  - link: "/security/sensitive_data_scanner/scanning_rules/custom_rules"
    tag: "Documentation"
    text: "Learn more about creating custom rules"
---

## Overview

Sensitive Data Scanner in the Cloud scans telemetry data, such as your application logs, APM events, RUM events, and events from Event Management. The data that can be scanned and redacted are:

- **Logs**: All structured and unstructured log content, including log message and attribute values
- **APM**: Span attribute values only
- **RUM**: Event attribute values only
- **Events**: Event attribute values only

Optionally, sampling rates can be set between 10% and 99% for each product. This helps manage costs when you first get started by reducing the amount of data that gets scanned for sensitive information.

For each scanning rule, one of the following actions can be applied to matched sensitive data:

- **Redact**: Replace the entire matched data with a single token that you choose, such as `[sensitive_data]`.
- **Partially redact**: Replace a specific portion of all matching values.
- **Hash**: Replace the entire matched data with a non-reversible unique identifier.
- **Mask** (available for logs only): Obfuscate all matching values. Users with the `Data Scanner Unmask` permission can de-obfuscate (unmask) and view this data in Datadog. See [Mask action](#mask-action) for more information.

**Note**: When scanning sampled data, you will not be able to select actions that obfuscate the data it scans.

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

If a scanning rule uses the **mask** action (only available for logs) for matched sensitive data, users with the `data_scanner_unmask` permission can de-obfuscate and view the data in Datadog. **Note**: Datadog does not recommend using the **mask** action for credentials, unless you have a plan to respond to and rotate all leaked credentials. See [Mask action](#mask-action) for more information.

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

A scanning rule determines what sensitive information to match within the data defined by a scanning group. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regular express (regex) patterns. The data is scanned at ingestion time during processing. For logs, this means the scan is done before indexing and other routing decisions.

Whenever possible, use Datadog's out-of-the-box library rules. These rules are predefined rules that detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. Each rule has recommended keywords for the keyword dictionary to refine matching accuracy. You can also [add your own keywords](#add-custom-keywords).

For Terraform, see the [Datadog Sensitive Data Scanner rule][6] resource.

#### Create a scanning rule

To add scanning rules, perform the following steps:

1. Navigate to the [Sensitive Data Scanner][5] settings page.
1. Click the scanning group where you want to add the scanning rules.
1. Click **Add Scanning Rule**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Rule**.
1. Select whether you want to add a library rule or create a custom scanning rule.

{{% collapse-content title="Add library rules" level="p" id="add-library-rules" %}}

The Scanning Rule Library contains predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.

1. Select a scanning group if you did not create this rule within a scanning group.
1. In the **Priority** dropdown menu, select the priority level for the rule based on your business needs.
1. In the **Add Library Rules** section, select the library rules you want to use.
{{% sds-scanning-rule %}}
1. Click **Add Rules**.

#### Add custom keywords

The [recommended keywords][15] are used by default when library rules are added. After adding library rules, you can edit each rule separately and add keywords to or remove keywords from the keyword dictionary. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`.

1. Navigate to the [Sensitive Data Scanner][5] settings page.
1. Click the scanning group with the rule you want to edit.
1. Hover over the rule, and then click the pencil icon.
1. In the **Match Conditions** section, click **Custom Keywords**.
    - To add keywords, enter a keyword and click the plus icon to add the keyword to the list.
    - To remove keywords, click the **X** next to the keyword you want to remove.
    - You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
    - **Note**: You cannot have more than 20 keywords for a rule.
1. In the **Type or paste event data to test the rule** section, add event data to evaluate your rule and add keywords to refine match conditions.
1. Click **Update**.

#### Add suppressions

{{% sds-suppressions %}}

{{% /collapse-content %}}
{{% collapse-content title="Add a custom rule" level="p" id="add-custom-rule"%}}
You can create custom scanning rules using regex patterns to scan for sensitive data.

1. Select a scanning group if you did not create this rule within a scanning group.
1. Enter a name for the rule.
1. In the **Priority** dropdown menu, select the priority level for the rule based on your business needs.
1. (Optional) Enter a description for the rule.
1. In the **Match conditions** section, specify the regex pattern to use for matching against events in the **Regex pattern** field. Define regex patterns that are as precise as possible because generic patterns result in more false positives.<br>
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
1. For **Check surrounding match context for keywords to reduce noise**, add keywords to refine detection accuracy when matching regex conditions. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`.
    - To add keywords, enter a keyword and click the plus icon to add the keyword to the list.
    - To remove keywords, click the **X** next to the keyword you want to remove.
    - You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
      **Note**: You cannot have more than 20 keywords for a rule.
{{% sds-suppressions %}}
1. In the **Type or paste event data to test the rule** section, add event data to evaluate your rule and add keywords to refine match conditions.
{{% sds-scanning-rule %}}
1. Click **Add Rule**.

{{% /collapse-content %}}

**Notes**:

- Any rules that you add or update affect only data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- After rules are added, ensure that the toggles for your scanning groups are enabled to begin scanning.
- When you add rules to a scanning group with sampling enabled, you will not be able to select the **redact**, **partially redact**, or **hash** actions. For complete obfuscation, disable sampling in your scanning group settings.

See [Investigate Sensitive Data Findings][7] for details on triaging sensitive data using the [Findings][8] page.

#### Excluded namespaces

There are reserved keywords that the Datadog platform requires for functionality. If any of these words are in a log that is being scanned, the 30 characters after the matched word are ignored and not redacted. For example, what comes after the word `date` in a log is usually the event timestamp. If the timestamp is accidentally redacted, that would result in issues with processing the log and being able to query it later. Therefore, the behavior for excluded namespaces is to prevent unintentionally redacting important information for product functionality.

The excluded namespaces are:

{{% tabs %}}
{{% tab "Logs" %}}

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

{{% /tab %}}
{{% tab "Spans" %}}

- `metrics._dd.`
- `metrics.dd.`
- `metrics._dd1.`
- `metrics.otel.trace_id`
- `metrics.otlp.`
- `metrics._sampling_priority_v1`
- `metrics._sample_rate`
- `meta._dd.`
- `meta.api.endpoint.`
- `meta.dd.`
- `meta_struct.dd.`
- `meta_struct._dd.`
- `meta_struct.api.endpoint.`
- `meta_struct.appsec.`
- `meta_struct.threat_intel.results.`
- `meta.otel.trace_id`
- `meta.otel.library.`
- `meta.otlp.`
- `trace_id`
- `span_id`
- `start`
- `timestamp`
- `end`
- `duration`
- `parent_id`
- `type`
- `resource`
- `resource_hash`
- `ingest_size_in_bytes`
- `ingestion_reason`
- `error`
- `flags`
- `status`
- `chunk_id`
- `host`
- `host_id`
- `hostname`
- `env`
- `service`
- `operation_name`
- `name`
- `version`
- `meta._dd.error_tracking`
- `meta.error.fingerprint`
- `meta.issue`

{{% /tab %}}
{{% tab "RUM" %}}

- `application.id`
- `session.id`
- `session.initial_view.id`
- `session.last_view.id`
- `view.id`
- `action.id`
- `resource.id`
- `geo`
- `error.fingerprint`
- `error.binary_images.uuid`
- `issue`
- `_dd.trace_id`
- `_dd.span_id`
- `_dd.usage_attribution_tag_names`
- `_dd.error.unminified_frames`
- `_dd.error.threads`

{{% /tab %}}
{{% /tabs %}}

#### Suppress specific matches to ignore risk-accepted data

Use suppressions to ignore sensitive data matches you consider operationally safe (for example: internal email domains or private IP ranges).

**Notes**:
- Suppressed matches are not redacted, masked, or hashed.
- Suppressed matches are excluded from the Findings page, dashboards, alerts, and other reporting workflows.
- Suppressions are defined per rule within a scanning group.

#### Scan or exclude specific attributes

To make matches more precise, you can also do one of the following:

- Scan the entire event but exclude certain attributes from getting scanned. For example, if you are scanning for personally identifiable information (PII) like names, you might want to exclude attributes such as `resource_name` and `namespace`.
- Scan for specific attributes to narrow the scope of the data that is scanned. For example, if you are scanning for names, you can choose specific attributes such as `first_name` and `last_name`.

### Edit scanning rules

To edit scanning rules:

1. Navigate to the [Sensitive Data Scanner][5] settings page.
1. Hover over the scanning rule you want to edit and click the **Edit** (pencil) icon.
1. Make the changes you want for the rule. Depending on the type of rule you are editing, see [Add library rules](#add-library-rules) or [Add custom rule](#add-custom-rule) for more information on each setup section.
1. Click **Update**.

## Control access to logs with sensitive data

To control who can access logs containing sensitive data, use tags added by the Sensitive Data Scanner to build queries with role-based access control (RBAC). You can restrict access to specific individuals or teams until the data ages out after the retention period. See [How to Set Up RBAC for Logs][9] for more information.

### Mask action

{{% sds-mask-action %}}

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

## Log rehydration

When you rehydrate logs from an archive, the Sensitive Data Scanner does not re-scan those logs. Instead, Datadog restores the logs exactly as they were written to the archive.

If your archive is configured to include [Datadog tags][16], and your scanning rules added tags when the logs were initially ingested and processed by Sensitive Data Scanner, you can use those tags to identify which rehydrated logs previously contained sensitive data. This allows you to filter rehydrated logs using queries such as `sensitive_data:<rule_tag_name>`.

The metadata of matched sensitive data is not stored in archived logs, so sensitive data matches are not highlighted when those logs are rehydrated. The archive format contains only the original log payload and any preserved tags. It does not include the positional information that Sensitive Data Scanner uses in the Datadog UI to visually highlight detected values.

What you can do with rehydrated logs:

- If tags were included in the archive, filter for logs that previously matched scanning rules.
- Investigate historical events that contain sensitive data.

What you **cannot** do with rehydrated logs:

- View in-line highlighted sensitive data matches in the UI: The matches remain obfuscated even if mask, redact, partially redact, or hash was chosen as an action on match.
- Trigger retroactive scans: Sensitive Data Scanner does not re-scan rehydrated logs.

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
[7]: /security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[8]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
[9]: /logs/guide/logs-rbac/
[10]: /logs/log_configuration/processors/?tab=ui#remapper
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /observability_pipelines/
[13]: /observability_pipelines/processors/sensitive_data_scanner/
[14]: /observability_pipelines/configuration/set_up_pipelines/
[15]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[16]: /logs/log_configuration/archives/?tab=awss3#datadog-tags