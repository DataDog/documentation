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

This document walks you through the following:

- The permissions required to view and set up Sensitive Data Scanner.
- Setting up scanning for sensitive data.
- Using the out-of-the-box dashboard.

**Note**: See [PCI DSS Compliance][1] for information on setting up a PCI-compliant Datadog organization.

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="The Sensitive Data Scanner page showing six out of the 12 active scanning groups" style="width:90%;">}}

## Set up Sensitive Data Scanner

There are two locations where you can redact your sensitive data:

- In the cloud:
    - With **Sensitive Data Scanner in the Cloud**, you submit your logs in the Datadog backend. In this method, logs leave your premises before they are redacted. You can have multiple scanning groups per organization, and you can create custom scanning rules. You can also redact sensitive data in tags.
- In your environment:
    - With **Sensitive Data Scanner through the Agent**, Datadog redacts your logs before submitting them to the Datadog backend, and unredacted logs never need to leave your premises. With this method, you are limited to one scanning group per organization, and you can use only predefined library rules.
    - Another way to redact your sensitive data in your environment before shipping to your downstream destinations is by using [Observability Pipelines][14].

### Prerequisites

{{< tabs >}}
{{% tab "In the Cloud" %}}
By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permissions under [Compliance][1] to a custom role. See [Access Control][2] for details on how to set up roles and permissions.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:55%;">}}

[1]: /account_management/rbac/permissions/#compliance
[2]: /account_management/rbac/
{{% /tab %}}
{{% tab "In the Agent" %}}

1. Grant appropriate permissions. By default, users with the Datadog Admin role have access to view and set up scanning rules. To allow other users access, grant the `data_scanner_read` or `data_scanner_write` permissions under [Compliance][1] to a custom role. See [Access Control][2] for details on how to set up roles and permissions.

    {{< img src="sensitive_data_scanner/read_write_permissions.png" alt="The compliance permissions sections showing data scanner read and writer permissions" style="width:55%;">}}
2. Follow the steps to [enable remote configuration][3].
3. Install the Datadog Agent v7.54 or newer.

[1]: /account_management/rbac/permissions/#compliance
[2]: /account_management/rbac/
[3]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
{{% /tab %}}
{{< /tabs >}}

### Add a scanning group

A scanning group determines what data to scan. It consists of a query filter and a set of toggles to enable scanning for logs, APM, RUM, and events. See the [Log Search Syntax][4] documentation to learn more about query filters.

For Terraform, see the [Datadog Sensitive Data Scanner group][5] resource.

To set up a scanning group, perform the following steps.

{{< tabs >}}
{{% tab "In the Cloud" %}}
1. Navigate to the [Sensitive Data Scanner][1] configuration page.
1. Click **Add scanning group**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Group**.
1. Enter a query filter for the data you want to scan. At the top, click **APM Spans** to preview the filtered spans. Click **Logs** to see the filtered logs.
1. Enter a name and description for the group.
1. Click the toggle buttons to enable Sensitive Data Scanner for the products you want (for example, logs, APM spans, RUM events, and Datadog events).
1. Click **Create**.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "In the Agent" %}}

<div class="alert alert-warning"><strong>Note</strong>: Sensitive Data Scanner in the Agent supports only one scanning group per organization.</div>

1. Navigate to the [Sensitive Data Scanner in the Agent][1] configuration page.
1. Click **Add scanning group**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Group**.
1. Enter a query filter for the data you want to scan. You can use only host-level tags for matching agents. At the bottom, the number of matching and eligible agents is displayed, including the total number out of all agents that the tag matches.
1. Enter a name and description for the group.
1. Click **Save**.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}

By default, a newly-created scanning group is disabled. To enable a scanning group, click the corresponding toggle on the right side.

### Add scanning rules

A scanning rule determines what sensitive information to match within the data defined by a scanning group. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regex patterns. The data is scanned at ingestion time during processing. For logs, this means the scan is done before indexing and other routing decisions.

For Terraform, see the [Datadog Sensitive Data Scanner rule][7] resource.

To add scanning rules, perform the following steps.

{{< tabs >}}
{{% tab "In the Cloud" %}}

1. Navigate to the [Sensitive Data Scanner][1] configuration page.
1. Click the scanning group where you want to add the scanning rules.
1. Click **Add Scanning Rule**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Rule**.
1. Select whether you want to add a library rule or create a custom scanning rule.

{{< collapse-content title="Add scanning rule from the library rules" level="p" >}}

The Scanning Rule Library contains predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.

1. In the **Add library rules to the scanning group** section, select the library rules you want to use.
1. In the **Define rule target and action** section, select if you want to scan the **Entire Event** or **Specific Attributes**.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned.
    - If you are scanning specific attributes, specify which attributes you want to scan.
{{% sds-scanning-rule %}}
1. Click **Add Rules**.

{{< /collapse-content >}} 
{{< collapse-content title="Add a custom scanning rule" level="p" >}}
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

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{< /collapse-content >}} 
{{% /tab %}}
{{% tab "In the Agent" %}}

<div class="alert alert-warning"><strong>Note</strong>: Sensitive Data Scanner in the Agent supports only predefined scanning rules from Datadog's Scanning Rule Library. The total number of scanning rules is limited to 20.</div>

1. Navigate to the [Sensitive Data Scanner in the Agent][1] configuration page.
1. Click **Add Scanning Rule**. Alternatively, click the **Add** dropdown menu on the top right corner of the page and select **Add Scanning Rule**.
1. In the **Add library rules to the scanning group** section, select the library rules you want to use. Use the **Filter library rules** input to search existing library rules. Next to the rule name you can find the list of predefined tags for each rule.
1. In the **Define rule target and action** section, select the action that you want to take for the matched sensitive information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - **Redact**: Replaces all matching values with the text you specify in the **Replacement text** field.
    - **Partially Redact**: Replaces a specified portion of all matched data. In the **Redact** section, specify the number of characters you want to redact and which part of the matched data to redact.
    - **Hash**: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match is hashed with the 64-bit fingerprint of FarmHash.
1. Optionally, add tags you want to associate with events where the values match the specified regex pattern. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags. These tags can then be used in searches, dashboards, and monitors. See [Control access to logs with sensitive data](#control-access-to-logs-with-sensitive-data) for information on how to use tags to determine who can access logs containing sensitive information. **Note**: If no tags are added when saving the rule, the Agent automatically adds the `sds_agent` tag as well as `sensitive_data` and `sensitive_data_category` tags which are predefined by the rule.
1. Click **Save**.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}


**Notes**:

- Any rules that you add or update affect only data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- After rules are added, ensure that the toggles for your scanning groups are enabled to begin scanning.
- To turn off Sensitive Data Scanner entirely, set the toggle to **off** for each Scanning Group and Scanning Rule so that they are disabled.

See [Investigate Sensitive Data Issues][8] for details on how to use the [Summary][9] page to triage your sensitive data issues.

### Control access to logs with sensitive data

To control who can access logs containing sensitive data, use tags added by the Sensitive Data Scanner to build queries with role-based access control (RBAC). You can restrict access to specific individuals or teams until the data ages out after the retention period. See [How to Set Up RBAC for Logs][10] for more information.

### Redact sensitive data in tags

{{< tabs >}}
{{% tab "In the Cloud" %}}
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
{{% /tab %}}
{{% tab "In the Agent" %}}
This functionality is not available for Sensitive Data Scanner in the Agent.
{{% /tab %}}
{{< /tabs >}}

## Out-of-the-box dashboard

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][13] summarizing sensitive data findings is automatically installed in your account. To access this dashboard, go to **Dashboards > Dashboards List** and search for "Sensitive Data Scanner Overview".

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
