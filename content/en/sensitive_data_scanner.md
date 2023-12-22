---
title: Sensitive Data Scanner
kind: documentation
aliases:
    - /logs/log_configuration/sensitive_data_detection
    - /account_management/org_settings/sensitive_data_detection
further_reading:
    - link: "/data_security/logs/"
      tag: "Documentation"
      text: "Security"
    - link: "/logs/explorer/"
      tag: "Documentation"
      text: "Log Explorer"
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

Often, businesses are required to identify, remediate, and prevent the exposure of such sensitive data within their logs due to organizational policies, compliance requirements, industry regulations, and privacy concerns. This is especially true within industries such as banking, financial services, healthcare, and insurance.

Sensitive Data Scanner is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. Security and compliance teams can implement Sensitive Data Scanner as a new line of defense, helping prevent against sensitive data leaks and limiting non-compliance risks.

Sensitive Data Scanner can be found under [Organization Settings][1].

{{< img src="sensitive_data_scanner/sds_main_28_03_23.png" alt="Sensitive Data Scanner in Organization Settings" style="width:90%;">}}

## Setup

1. **Define Scanning Groups:** A scanning group determines what data to scan. It consists of a query filter and a set of toggles to enable scanning for Logs, APM, RUM, and/or Events. See the [Log Search Syntax][2] documentation to learn more about query filters.
    - For Terraform, see the [datadog_sensitive_data_scanner_group][3] resource.
2. **Define Scanning Rules:** A scanning rule determines what sensitive information to match within the data. Within a scanning group, add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules from scratch to scan using custom regex patterns.
    - For Terraform, see the [datadog_sensitive_data_scanner_rule][4] resource.

**Note:**
- Any rules that you add or update only affect data coming into Datadog after the rule was defined.
- Sensitive Data Scanner does not affect any rules you define on the Datadog Agent directly.
- To turn off Sensitive Data Scanner entirely, set the toggle to **off** for each Scanning Group and Scanning Rule so that they are disabled.

### Define Scanning Rules

#### Out-of-the-box Scanning Rules

The Scanning Rule Library contains an evergrowing collection of predefined rules maintained by Datadog for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.
{{< img src="sensitive_data_scanner/sds-library-28-03-23.png" alt="Scanning Rule Library" style="width:90%;">}}

#### Custom Scanning Rules

- Define custom scanning rules to scan for sensitive data specific to your business.
- **Define match conditions:** Specify the regex pattern to be used for matching against events. Test with sample data to verify that your regex pattern is valid.
  - Sensitive Data Scanner supports Perl Compatible RegEx (PCRE), but the following patterns are not supported:
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
   
#### Define rule target and action

- **Create keyword dictionary**: Add keywords to tune detection accuracy when matching regex conditions. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card` and require that these keywords must be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
- **Define scope:** Specify whether you want to scan the entire event or just specific attributes. You can also choose to exclude specific attributes from the scan.
- **Process matching values:** Optionally, specify whether you want to redact, partially redact, or hash matching values. When redacting, specify placeholder text to replace the matching values with. When partially redacting, specify the position (start/end) and length (# of characters) to redact within matching values. Redaction, partial redaction, and hashing are all irreversible actions.
- **Add tags:** Specify the tags you want to associate with events where the values match the specified regex pattern. Datadog recommends using `sensitive_data` and `sensitive_data_category` tags. These tags can then be used in searches, dashboards, and monitors.
- **Set priority level**: Set the priority level for a rule based on your business needs.
- **Name the rule:** Provide a human-readable name for the rule.

{{< img src="sensitive_data_scanner/sds_rules_28_03_23.png" alt="A Sensitive Data Scanner custom rule" style="width:90%;">}}

#### Redact sensitive data in tags

To redact sensitive data contained in tags, you must [remap][5] the tag to an attribute and then redact the attribute. Uncheck `Preserve source attribute` in the remapper processor so that the tag is not preserved during the remapping.

To remap the tag to an attribute:

1. Navigate to your [log pipeline][6].
2. Click **Add Processor**.
3. Select **Remapper** in the processor type dropdown menu.
4. Name the processor.
5. Select **Tag key(s)**.
6. Enter the tag key.
7. Enter a name for the attribute the tag key is remapped to.
8. Disable **Preserve source attribute**.
9. Click **Create**.

To redact the attribute:

1. Navigate to your [scanning group][1].
2. Click **Add Scanning Rule**.
3. Check the library rules you want to use.
4. Select **Specific Attributes** for **Scan entire event or portion of it**.
5. Enter the name of the attribute you created earlier to specify that you want it scanned.
6. Select the action you want when there's a match.
7. Optionally, add tags.
8. Click **Add Rules**.

### Permissions

By default, users with the Datadog Admin role have access to view and define the scanning rules. To allow other user access, grant read or write permissions for Data Scanner under **Compliance**. See the [Custom RBAC documentation][7] for details on Roles and Permissions.

{{< img src="sensitive_data_scanner/scanner_permission.png" alt="Permissions for Sensitive Data Scanner" style="width:90%;">}}

### Using tags with Query based RBAC

Control who can access events containing sensitive data. Use tags added by Sensitive Data Scanner to build queries with RBAC and restrict access to specific individuals or teams until the data ages out after the retention period.

### Investigate sensitive data issues in the Summary page

Use the [Summary][11] page to see all sensitive data issues within the selected timeframe and start investigating issues.

In the **Sensitive Data Issues** section, filter by a priority level to see only issues with that priority level in the **Issues Overview** section. In the **Cases** section, filter by a case status to see issues associated to cases with that status in the **Issues Overview** section.

To investigate an issue:

1. Click on the issue in the **Issues Overview**.
2. In the issue panel, click **View Recent Changes** to navigate to Audit Trail and see if there are any recent configuration changes that caused the sensitive data issue.
3. Click **View All Logs** to see in Log Explorer all logs matching the query.  
Click **View All APM Spans** to see in Trace Explorer all traces matching the query.  
Click **View All RUM Events** to see in RUM Explorer all RUM events matching the query.  
Click **View All Events** to see in Events Explorer all events matching the query.
4. In the **Blast Radius** section:  
    a. View the Top 10 services, hosts, and environments impacted by this sensitive data issue.  
    b. Click on a service to see more information about the service in the **Service Catalog**.  
    c. Click on a host to see more information about the host in the Infrastructure List page.

If you want to use [Case Management][9] to track, triage, and investigate the issue, click **Create Case** at the top of the panel. Associated cases are surfaced in the Summary page.

If you want to use [Incident Management][10] to create an incident, you can add the issue to an existing incident or declare a new incident. Click the **Declare Incident** dropdown menu to add the issue to an existing incident. Click **Declare Incident** to declare a new incident.

If you want to modify the Scanning Rule that was used to detect the sensitive data issue, click **Modify Rule** at the top of the panel.

### Out-of-the-box dashboard

When Sensitive Data Scanner is enabled, an out-of-the-box [dashboard][8] summarizing sensitive data findings is automatically installed in your account.

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

To access this dashboard, go to **Dashboards > Dashboards List** and search for `Sensitive Data Scanner Overview`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[2]: /logs/explorer/search_syntax/
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[5]: /logs/log_configuration/processors/?tab=ui#remapper
[6]: https://app.datadoghq.com/logs/pipelines
[7]: /logs/guide/logs-rbac-permissions/?tab=ui#overview
[8]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[9]: /service_management/case_management/
[10]: /service_management/incident_management/
[11]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
