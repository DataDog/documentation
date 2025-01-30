---
title: Sensitive Data Scanner
aliases:
    - /logs/log_configuration/sensitive_data_detection
    - /account_management/org_settings/sensitive_data_detection
further_reading:
    - link: "/data_security/"
      tag: "Documentation"
      text: "Reducing data related risks"
    - link: "/sensitive_data_scanner/regular_expression_syntax"
      tag: "Documentation"
      text: "Regular expression syntax for custom scanning rules"
    - link: "/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules"
      tag: "Documentation"
      text: "Best practices for creating custom rules"
    - link: "https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/"
      tag: "Blog"
      text: "Discover, triage, and remediate sensitive data issues at scale with Sensitive Data Scanner"
    - link: "https://www.datadoghq.com/blog/sensitive-data-scanner/"
      tag: "Blog"
      text: "Build a modern data compliance strategy with Datadog's Sensitive Data Scanner"
    - link: "https://www.datadoghq.com/blog/sensitive-data-management-best-practices/"
      tag: "Blog"
      text: "Best practices for sensitive data management"
    - link: "https://www.datadoghq.com/blog/data-security/"
      tag: "Blog"
      text: "Discover sensitive data in your cloud data stores with Data Security"
    - link: "https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/"
      tag: "Blog"
      text: "How companies subject to HIPAA requirements manage sensitive data with Datadog"
---

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys are often exposed unintentionally in application logs, APM spans, and RUM events, which can expose your organization to financial and privacy risks.

Sensitive Data Scanner is a stream-based, pattern matching service used to identify, tag, and optionally redact or hash sensitive data. Security and compliance teams can implement Sensitive Data Scanner as a new line of defense, helping prevent against sensitive data leaks and limiting non-compliance risks.

To use Sensitive Data Scanner, set up a scanning group to define what data to scan and then set up scanning rules to determine what sensitive information to match within the data.

This document walks you through the following:

- The permissions required to view and set up Sensitive Data Scanner.
- Setting up scanning for sensitive data.
- Using the out-of-the-box dashboard.

**Note**: See [PCI DSS Compliance][1] for information on setting up a PCI-compliant Datadog organization.

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="The Sensitive Data Scanner page showing six out of the 12 active scanning groups" style="width:90%;">}}

## Set up Sensitive Data Scanner


There are two locations where you can redact your sensitive data:

**In the cloud:**

With **Sensitive Data Scanner in the Cloud**, you submit your application logs, APM events, and RUM events to the Datadog backend, so the events leave your premises before they are redacted. To use Sensitive Data Scanner, set up a scanning group to define what data to scan and then set up scanning rules to determine what sensitive information to match within the data. For scanning rules you can:
- Add predefined [scanning rules][19] from Datadog's Scanning Rule Library. These rules detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more.
- [Create your own rules using regex patterns][22].

**In your environment:**

With **Observability Pipelines**, collect and process your data within your environment, and then route the data to their downstream integrations. When you [set up a pipeline][2] in Observability Pipelines, add the [Sensitive Data Scanner processor][3] to redact sensitive data in your logs before they leave your premises. You can add predefined scanning rules from the Rule Library, such as email address, credit card numbers, API keys, authorization tokens, IP addresses, and more. You can also create your own rules using regex patterns. See [Observability Pipelines][4] for more information.

### Prerequisites

By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permissions under [Compliance][5] to a custom role. See [Access Control][6] for details on how to set up roles and permissions.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:80%;">}}

### Add a scanning group

A scanning group determines what data to scan. It consists of a query filter and a set of toggles to enable scanning for logs, APM, RUM, and events. See the [Log Search Syntax][7] documentation to learn more about query filters.

For Terraform, see the [Datadog Sensitive Data Scanner group][8] resource.

To set up a scanning group, perform the following steps:

1. Navigate to the [Sensitive Data Scanner][9] settings page.
1. Click **Add scanning group**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Group**.
1. Enter a query filter for the data you want to scan. At the top, click **APM Spans** to preview the filtered spans. Click **Logs** to see the filtered logs.
1. Enter a name and description for the group.
1. Click the toggle buttons to enable Sensitive Data Scanner for the products you want (for example, logs, APM spans, RUM events, and Datadog events).
1. Click **Create**.

By default, a newly-created scanning group is disabled. To enable a scanning group, click the corresponding toggle on the right side.

### Add scanning rules

A scanning rule determines what sensitive information to match within the data defined by a scanning group. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regex patterns. The data is scanned at ingestion time during processing. For logs, this means the scan is done before indexing and other routing decisions.

For Terraform, see the [Datadog Sensitive Data Scanner rule][10] resource.

To add scanning rules, perform the following steps:

1. Navigate to the [Sensitive Data Scanner][9] settings page.
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

1. Navigate to the [Sensitive Data Scanner][9] settings page.
1. Click the scanning group with the rule you want to edit.
1. Hover over the rule, and then click the pencil icon.
1. The recommended keywords are used by default. To add additional keywords, toggle **Use recommended keywords**, then add your keywords to the list. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. Click **Update**.

{{% /collapse-content %}}
{{% collapse-content title="Add a custom scanning rule" level="p" %}}
You can create custom scanning rules using regex patterns to scan for sensitive data.

1. Select a scanning group if you did not create this rule within a scanning group.
1. In the **Define match conditions** section, specify the regex pattern to use for matching against events in the **Define the regex** field. Enter sample data in the **Add sample data** field to verify that your regex pattern is valid.
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

See [Investigate Sensitive Data Issues][11] for details on how to use the [Summary][12] page to triage your sensitive data issues.

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

1. Navigate to the [Sensitive Data Scanner][9] settings page.
1. Hover over the scanning rule you want to edit and click the **Edit** (pencil) icon.

   The **Define match conditions** section shows either the regular expression you wrote for your custom rule or an explanation of the library scanning rule you chose along with examples of matched sensitive information.
1. To make sure that a rule matches your data, you can provide a sample in the **Add sample data** section. If the rule finds matches in the sample data, a green **Match** label appears next to the input field.
1. Under **Create keyword dictionary**, you can add keywords to refine detection accuracy. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`.
1. Choose the number of characters before a match that the keyword must appear in. By default, keywords must be within 30 characters before a match.
1. Optionally, under **Define rule target and action**, edit the tags that you want to associate with events where the values match the rule. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags, which can be used in searches, dashboards, and monitors. See [Control access to logs with sensitive data](#control-access-to-logs-with-sensitive-data) for information on how to use tags to determine who can access logs that contain sensitive data.
1. For **Set priority level**, choose a value based on your business needs.
1. Click **Update**.

### Control access to logs with sensitive data

To control who can access logs containing sensitive data, use tags added by the Sensitive Data Scanner to build queries with role-based access control (RBAC). You can restrict access to specific individuals or teams until the data ages out after the retention period. See [How to Set Up RBAC for Logs][13] for more information.

### Redact sensitive data in tags

To redact sensitive data contained in tags, you must [remap][14] the tag to an attribute and then redact the attribute. Uncheck `Preserve source attribute` in the remapper processor so that the tag is not preserved during the remapping.

To remap the tag to an attribute:

1. Navigate to your [log pipeline][15].
2. Click **Add Processor**.
3. Select **Remapper** in the processor type dropdown menu.
4. Name the processor.
5. Select **Tag key(s)**.
6. Enter the tag key.
7. Enter a name for the attribute the tag key is remapped to.
8. Disable **Preserve source attribute**.
9. Click **Create**.

To redact the attribute:

1. Navigate to your [scanning group][9].
2. Click **Add Scanning Rule**.
3. Check the library rules you want to use.
4. Select **Specific Attributes** for **Scan entire event or portion of it**.
5. Enter the name of the attribute you created earlier to specify that you want it scanned.
6. Select the action you want when there's a match.
7. Optionally, add tags.
8. Click **Add Rules**.

## Cloud Storage scanning

{{< callout header="Limited Availability" url="https://www.datadoghq.com/private-beta/data-security" >}}
  Scanning support for Amazon S3 buckets and RDS instances is in Limited Availability. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

If you have [Sensitive Data Scanner][16] enabled, you can catalog and classify sensitive data in your Amazon S3 buckets and RDS instances.

Sensitive Data Scanner scans for sensitive data by deploying [Agentless scanners][17] in your cloud environments. These scanning instances retrieve a list of all S3 buckets and RDS instances through [Remote Configuration][18], and have set instructions to scan text files—such as CSVs and JSONs—and tables in every datastore over time. Sensitive Data Scanner leverages its [entire rules library][19] to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. Data stores and their files are only read in your environment—no sensitive data is sent back to Datadog.

Along with displaying sensitive data matches, Cloud Storage surfaces any security issues detected by [Cloud Security Management][20] affecting the sensitive datastores. You can click any issue to continue triage and remediation within Cloud Security Management.

## Out-of-the-box dashboard

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][21] summarizing sensitive data findings is automatically installed in your account. To access this dashboard, go to **Dashboards > Dashboards List** and search for "Sensitive Data Scanner Overview".

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

## Disable Sensitive Data Scanner

To turn off Sensitive Data Scanner entirely, set the toggle to **off** for each Scanning Group so that they are disabled.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/pci_compliance/
[2]: /observability_pipelines/set_up_pipelines/
[3]: /observability_pipelines/processors/sensitive_data_scanner/
[4]: /observability_pipelines/
[5]: /account_management/rbac/permissions/#compliance
[6]: /account_management/rbac/
[7]: /logs/explorer/search_syntax/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[9]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[11]: /sensitive_data_scanner/investigate_sensitive_data_issues/
[12]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[13]: /logs/guide/logs-rbac/
[14]: /logs/log_configuration/processors/?tab=ui#remapper
[15]: https://app.datadoghq.com/logs/pipelines
[16]: /sensitive_data_scanner/
[17]: /security/cloud_security_management/setup/agentless_scanning
[18]: /agent/remote_config
[19]: /sensitive_data_scanner/library_rules/
[20]: /security/cloud_security_management
[21]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[22]: /sensitive_data_scanner/regular_expression_syntax