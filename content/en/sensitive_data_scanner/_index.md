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
    - link: "/sensitive_data_scanner/regular_expression_syntax"
      tag: "Documentation"
      text: "Regular expression syntax for custom scanning rules"
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

If you want to redact your sensitive data in your environment before shipping to your downstream destinations, see how to [redact sensitive data with Observability Pipelines][14].

This document walks you through the following:

- [The permissions required to view and set up Sensitive Data Scanner](#permissions).
- [Setting up scanning for sensitive data](#set-up-scanning-for-sensitive-data).
- [Using the out-of-the-box dashboard](#out-of-the-box-dashboard).

**Note**: See [PCI DSS Compliance][1] for information on setting up a PCI-compliant Datadog organization.

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="The Sensitive Data Scanner page showing six out of the 12 active scanning groups" style="width:90%;">}}

## Permissions

By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permissions under [Compliance][2] to a custom role. See [Access Control][3] for details on how to set up roles and permissions.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:55%;">}}


## Set up Sensitive Data Scanner

This section walks you through the following to set up Sensitive Data Scanner:

- [Adding a scanning group](#add-a-scanning-group)
- [Adding scanning rules](#add-scanning-rules)
- [Controlling access to events with sensitive data](#control-access-to-events-with-sensitive-data)

You can also [redact sensitive data in tags](#redact-sensitive-data-in-tags).

### Add a scanning group

A scanning group determines what data to scan. It consists of a query filter and a set of toggles to enable scanning for logs, APM, RUM, and events. See the [Log Search Syntax][4] documentation to learn more about query filters.

For Terraform, see the [Datadog Sensitive Data Scanner group][5] resource.

To set up a scanning group:

1. Navigate to the [Sensitive Data Scanner][6] configuration page. Alternatively, go to **Organization Settings** > **Manage Sensitive Data** and click the **Configuration** tab.
1. Click **Add scanning group**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Group**.
1. Enter a query filter for the data you want to scan. At the top, click **APM Spans** to preview the filtered spans. Click **Logs** to see the filtered logs.
1. Enter a name and description for the group.
1. Click the toggle buttons to enable Sensitive Data Scanner for the products you want (for example, logs, APM spans, RUM events, and Datadog events).
1. Click **Create**.

### Add scanning rules

A scanning rule determines what sensitive information to match within the data defined by a scanning group. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regex patterns. The data is scanned at ingestion time during processing. For logs, this means the scan is done before indexing and other routing decisions.

For Terraform, see the [Datadog Sensitive Data Scanner rule][7] resource.

To add scanning rules:

1. Navigate to the [Sensitive Data Scanner][6] configuration page.
1. Click the scanning group where you want to add the scanning rules.
1. Click **Add Scanning Rule**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Rule**.
1. Select whether you want to add a library rule or create a custom scanning rule.

{{< tabs >}}
{{% tab "Add scanning rule from the library rules" %}}

The Scanning Rule Library contains predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.

1. In the **Add library rules to the scanning group** section, select the library rules you want to use.
1. In the **Define rule target and action** section, select if you want to scan the **Entire Event** or **Specific Attributes**.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned.
    - If you are scanning specific attributes, specify which attributes you want to scan.
{{% sds-scanning-rule %}}
1. Click **Add Rules**.

{{% /tab %}}
{{% tab "Add a custom scanning rule" %}}

You can create custom scanning rules using regex patterns to scan for sensitive data.

1. In the **Define match conditions** section, specify the regex pattern to use for matching against events in the **Define regex** field. Enter sample data in the **Regex tester** field to verify that your regex pattern is valid.   
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
{{% sds-scanning-rule %}}
1. Click **Add Rule**.

{{% /tab %}}
{{< /tabs >}}

**Notes**:

- Any rules that you add or update only affect data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- To turn off Sensitive Data Scanner entirely, set the toggle to **off** for each Scanning Group and Scanning Rule so that they are disabled.

See [Investigate Sensitive Data Issues][8] for details on how to use the [Summary][9] page to triage your sensitive data issues.

### Control access to logs with sensitive data

To control who can access logs containing sensitive data, use tags added by the Sensitive Data Scanner to build queries with role-based access control (RBAC). You can restrict access to specific individuals or teams until the data ages out after the retention period. See [How to Set Up RBAC for Logs][10] for more information.

### Redact sensitive data in tags

To redact sensitive data contained in tags, you must [remap][11] the tag to an attribute and then redact the attribute. Uncheck `Preserve source attribute` in the remapper processor so that the tag is not preserved during the remapping.

To remap the tag to an attribute:

1. Navigate to your [log pipeline][12].
2. Click **Add Processor**.
3. Select **Remapper** in the processor type dropdown menu.
4. Name the processor.
5. Select **Tag key(s)**.
6. Enter the tag key.
7. Enter a name for the attribute the tag key is remapped to.
8. Disable **Preserve source attribute**.
9. Click **Create**.

To redact the attribute:

1. Navigate to your [scanning group][6].
2. Click **Add Scanning Rule**.
3. Check the library rules you want to use.
4. Select **Specific Attributes** for **Scan entire event or portion of it**.
5. Enter the name of the attribute you created earlier to specify that you want it scanned.
6. Select the action you want when there's a match.
7. Optionally, add tags.
8. Click **Add Rules**.

### Data Security

<div class="alert alert-warning">Data Security is in private beta. To enroll in the private beta, <a href="https://www.datadoghq.com/private-beta/data-security">sign up here</a>.</div>

If you have [Sensitive Data Scanner][8] and [Cloud Security Management][16] enabled, you can use Data Security to locate sensitive data and fix security issues impacting AWS S3 buckets and RDS instances.

Data Security scans for sensitive data by deploying [Agentless scanners][17] in your cloud environments. These scanning instances retrieve a list of all S3 buckets and RDS instances through [Remote Configuration][18], and have set instructions to scan text files—such as CSVs and JSONs—and tables in every datastore over time. Data Security leverages rules provided by Sensitive Data Scanner to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. Datastores and their files are only read in your environment—no sensitive data is sent back to Datadog.

Along with displaying sensitive data matches, Data Security surfaces any security issues detected by Cloud Security Management affecting the sensitive datastores. You can click any issue to continue triage and remediation within Cloud Security Management.

## Out-of-the-box dashboard

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][13] summarizing sensitive data findings is automatically installed in your account. To access this dashboard, go to **Dashboards > Dashboards List** and search for `Sensitive Data Scanner Overview`.

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/pci_compliance/
[2]: /account_management/rbac/permissions/#compliance
[3]: /account_management/rbac/
[4]: /logs/explorer/search_syntax/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[8]: /sensitive_data_scanner/investigate_sensitive_data_issues/
[9]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[10]: /logs/guide/logs-rbac/
[11]: /logs/log_configuration/processors/?tab=ui#remapper
[12]: https://app.datadoghq.com/logs/pipelines
[13]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[14]: /observability_pipelines/sensitive_data_redaction/
[16]: /security/cloud_security_management
[17]: /security/cloud_security_management/setup/agentless_scanning
[18]: /agent/remote_config
