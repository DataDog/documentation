---
title: Sensitive Data Scanner
kind: documentation
aliases:
    - /logs/log_configuration/sensitive_data_detection
    - /account_management/org_settings/sensitive_data_detection
further_reading:
    - link: "/data_security/"
      tag: "Documentation"
      text: "Reducing data related risks"
    - link: "https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/"
      tag: "Blog"
      text: "Discover, triage, and remediate sensitive data issues at scale with Sensitive Data Scanner"
    - link: "https://www.datadoghq.com/blog/sensitive-data-scanner/"
      tag: "Blog"
      text: "Build a modern data compliance strategy with Datadog's Sensitive Data Scanner"
    - link: "https://www.datadoghq.com/blog/sensitive-data-management-best-practices/"
      tag: "Blog"
      text: "Best practices for sensitive data management"
---

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys are often exposed unintentionally in application logs, APM spans, and RUM events, which can expose your organization to financial and privacy risks.

Sensitive Data Scanner is a stream-based, pattern matching service used to identify, tag, and optionally redact or hash sensitive data. Security and compliance teams can implement Sensitive Data Scanner as a new line of defense, helping prevent against sensitive data leaks and limiting non-compliance risks.

To use Sensitive Data Scanner, set up a scanning group to define what data to scan and then set up scanning rules to determine what sensitive information to match within the data.

This document walks you through the following:

- [The permissions required to view and set up Sensitive Data Scanner](#permissions).
- [Setting up scanning for sensitive data](#set-up-scanning-for-sensitive-data).
- [The out-of-the-box dashboard provided](#out-of-the-box-dashboard).

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="The Sensitive Data Scanner page showing six out of the 12 active scanning groups" style="width:90%;">}}

## Permissions

By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permission under [Compliance][1] when you are adding permissions to a custom role. See [Access Control][2] for details on how to set up roles and permissions.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:55%;">}}


## Set up Sensitive Data Scanner

This section walks you through the following to set up Sensitive Data Scanner:

- [Adding a scanning group](#add-a-scanning-group)
- [Adding scanning rules](#add-scanning-rules)
- [Controlling access to events with sensitive data](#control-access-to-events-with-sensitive-data)

You can also [redact sensitive data in tags](#redact-sensitive-data-in-tags).

### Add a scanning group

A scanning group determines what data to scan. It consists of a query filter and a set of toggles to enable scanning for Logs, APM, RUM, and Events. See the [Log Search Syntax][3] documentation to learn more about query filters.

For Terraform, see the [Datadog sensitive data scanner group][4] resource.

To set up a scanning group:

1. Navigate to [Sensitive Data Scanner][5]. Alternatively, go to Organization Settings > Sensitive Data Scanner.
1. Click **Add scanning group**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Group**.
1. Enter a query filter for the data you want to scan. At the top, click **APM Spans** to preview the filtered spans. Click **Logs** to see the filtered logs.
1. Enter a name and description for the group.
1. Click the toggle buttons to enable Sensitive Data Scanner for the products you want.
1. Click **Create**.

### Add scanning rules

A scanning rule determines what sensitive information to match within the data for a scanning group. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regex patterns. The data is scanned at the point of ingestion. For logs, the scan is done before indexing.

For Terraform, see the [Datadog Sensitive Data Scanner rule][6] resource.

To add scanning rules:

1. Navigate to [Sensitive Data Scanner][5].
1. Click the scanning group where you want to add the scanning rules.
1. Click **Add Scanning Rules**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Rules**.
1. Select whether you want to add scanning rules from the library rules or create a custom scanning rule.

{{< tabs >}}
{{% tab "Add scanning rule from the library rules" %}}

The Scanning Rule Library contains predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.

1. In the **Add library rules to the scanning group** section, select the library rules you want to use.
1. In the **Define rule target and action** section, select if you want to scan the **Entire Event** or **Specific Attributes**.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned.
    - If you are scanning specific attributes, specify which attributes you want to scan.
1. For **Define actions on match**, select the action you want to take for the matched information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - **Redact**: Replaces all matching values with the text you specify in the **Replacement text** field.
    - **Partially Redact**: Replaces a specified portion of all matched data. In the **Redact** section, specify the number of characters you want to redact and which part of the matched data to redact.
    - **Hash**: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match is hashed with the 64-bit fingerprint of farmhash.
1. Optionally, add tags you want to associate with events where the values match the specified regex pattern. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags. These tags can then be used in searches, dashboards, and monitors. See [Control access to events with sensitive data](#control-access-to-events-with-sensitive-data) for information on how to use tags to determine who can access events containing sensitive information.
1. For **Set priority level**, select the priority level for the rule based on your business needs.
1. In the **Name and describe the scanning rule** section, enter a name for the rule. Optionally, add a description.
1. Click **Add Rules**.

{{% /tab %}}
{{% tab "Add a custom scanning rule" %}}

You can create custom scanning rules using regex patterns to scan for sensitive data.

1. In the **Define match conditions** section, specify the regex pattern to use for matching against events in the **Define regex** field. Enter sample data in the **Regex tester** field to verify that your regex pattern is valid.   
    Sensitive Data Scanner supports Perl Compatible RegEx (PCRE), but the following patterns are not supported:
    - Backreferences and capturing sub-expressions (lookarounds)
    - Arbitrary zero-width assertions
    - Subroutine references and recursive patterns
    - Conditional patterns
    - Backtracking control verbs
    - The \C "single-byte" directive (which breaks UTF-8 sequences)
    - The \R newline match
    - The \K start of match reset directive
    - Callouts and embedded code
    - Atomic grouping and possessive quantifiers
1. For **Create keyword dictionary**, add keywords to refine detection accuracy when matching regex conditions. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`. You can also require that these keywords must be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. For **Define actions on match**, select the action you want to take for the matched information.
    - **Redact**: Replaces all matching values with the text you specify in the **Replacement text** field.
    - **Partially Redact**: Replaces a specified portion of all matched data. In the **Redact** section, specify the number of characters you want to redact and which part of the matched data to redact.
    - **Hash**: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match is hashed with the 64-bit fingerprint of farmhash.
    - **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
1. Optionally, add tags you want to associate with events where the values match the specified regex pattern. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags. These tags can then be used in searches, dashboards, and monitors. See [Control access to events with sensitive data](#control-access-to-events-with-sensitive-data) for information on how to use tags to determine who can access events containing sensitive data.
1. For **Set priority level**, select the priority level for the rule based on your business needs.
1. In the **Name and describe the scanning rule** section, enter a name for the rule. Optionally, add a description.
1. Click **Add Rule**.

{{% /tab %}}
{{< /tabs >}}

**Notes**:

- Any rules that you add or update only affect data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- To turn off Sensitive Data Scanner entirely, set the toggle to off for each Scanning Group and Scanning Rule so that they are disabled.

See [Investigate Sensitive Data Issues][7] for details on how to use the [Summary][8] page to triage your sensitive data issues.

### Control access to events with sensitive data

To control who can access events containing sensitive data, use tags added by the Sensitive Data Scanner to build queries with role-based access control (RBAC). You can restrict access to specific individuals or teams until the data ages out after the retention period.

### Redact sensitive data in tags

To redact sensitive data contained in tags, you must [remap][9] the tag to an attribute and then redact the attribute. Uncheck `Preserve source attribute` in the remapper processor so that the tag is not preserved during the remapping.

To remap the tag to an attribute:

1. Navigate to your [log pipeline][10].
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

## Out-of-the-box dashboard

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][11] summarizing sensitive data findings is automatically installed in your account. To access this dashboard, go to **Dashboards > Dashboards List** and search for `Sensitive Data Scanner Overview`.

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#compliance
[2]: /account_management/rbac/
[3]: /logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /sensitive_data_scanner/investigate_sensitive_data_issues/
[8]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[9]: /logs/log_configuration/processors/?tab=ui#remapper
[10]: https://app.datadoghq.com/logs/pipelines
[11]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
