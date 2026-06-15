---
title: Protecting Sensitive Data
description: Restrict access to telemetry data using Data Access Control.
further_reading:
- link: "/account_management/rbac/data_access"
  tag: "Documentation"
  text: "Data Access Control"
- link: "/security/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
- link: "/administrators_guide/plan/#resource-tagging"
  tag: "Documentation"
  text: "Administrator's Guide: Tagging"
- link: "/tracing/configure_data_security/"
  tag: "Documentation"
  text: "Data Security"
---

## Overview

Where [Protecting Assets][1] covers who can edit or view Dashboards, Monitors, and other objects, this section covers *telemetry*: the underlying data flowing through Datadog. Not every organization needs data-level restrictions, but those that handle sensitive or regulated data need [Data Access Control][2]. Data Access Control lets you create row-level restrictions on your data, defined by tag values, and enforced across every view where that data might surface.

This section helps you identify your data sensitivity patterns and choose the right approach for restricting access.

## Identifying your data sensitivity patterns

For sensitive data restrictions, there are three common patterns. You can use one or a combination of the three.

### Pattern 1: Based on the type of data

All data of a certain type is sensitive, regardless of where it comes from.

*For example, low-privilege users should never be able to see Logs data because it always contains sensitive information. Or a contractor should not have access to RUM sessions because they may contain end-user PII.*

**Recommended approach:** Create a [custom role][3] without the relevant read permissions. Assign that role to any users, such as third-party contractors, who should not be able to see that type of data at all. This is a permissions-level restriction, not a Data Access Control restriction.

### Pattern 2: Based on the service, infrastructure, or owner

Data sensitivity is determined by who or what is producing the data, not the data type itself. Some services or infrastructure components generate data that should be restricted to specific teams.

*For example, a payment processing service generates APM traces, Logs, and RUM data that should only be visible to the Payments team and senior administrators. All telemetry from that service is sensitive, regardless of type.*

**Recommended approach:** Use [Data Access Control][2] to create restricted datasets based on the tag (such as `service:payment-processor`) across relevant telemetry types. Assign access to the responsible Team and any other authorized Roles or Teams.

### Pattern 3: Based on protected classes of data within a service

Sensitive data is mixed in with non-sensitive data from the same source and telemetry type. This is common in regulated industries where only certain records within a data stream are sensitive.

*For example, in a healthcare organization, a service may generate routine operational Logs which can be viewed by anyone in the org, alongside HIPAA-protected data that must be restricted. Or in a financial institution, trading data across APM, Logs, and RUM must be restricted to compliance-approved users, while general infrastructure data from the same environment is broadly accessible.*

**Recommended approach:** Use Data Access Control to create restricted datasets based on a classification tag (such as `data_sensitivity:hipaa` or `data_classification:trading`) across the affected telemetry types. Assign access to the Roles or Teams authorized to see that class of data.

## Sensitive Data Scanner

[Sensitive Data Scanner][4] provides an automated safety net for situations where sensitive data appears unpredictably. For example, developers may inadvertently log credit card numbers, email addresses, or social security numbers.

Sensitive Data Scanner is useful as a defense-in-depth measure alongside Data Access Control, especially when you cannot guarantee that sensitive data is tagged consistently at ingestion.

## Standard Data Access Control vs. Strict Mode

Use **standard Data Access Control** to apply restrictions progressively: all data is visible by default, and you create restricted datasets to limit access to specific data. This model works well when sensitive data is the exception, not the rule.

For organizations with hard regulatory requirements (for example, defense) or organizations that collaborate with multiple external business partners in the same Datadog tenant, Datadog offers **Data Access Control Strict Mode**. In Strict Mode, data is hidden by default and users can only see data they have been explicitly granted access to. Instead of restricting the sensitive subset, you must explicitly allow access to everything.

Strict Mode is the exception, not the rule. Use Strict Mode only if your regulatory or legal framework demands a default-deny model for telemetry access.

## Recommendations

- **Identify which pattern applies to you** before creating datasets. Many organizations use Pattern 2 (service-based restrictions) as their primary model, with Pattern 1 (type-based restrictions through roles) as a supplement.
- **Use tags consistently.** Data Access Control restrictions are only as good as your tagging. Make sure that services, infrastructure, and data classifications are tagged consistently at ingestion. Work with your tagging strategy (see the [Administrator's Guide][5]) to help ensure the right tags are present.
- **Start with your most sensitive data.** Don't try to create datasets for everything at once. Identify the top 3-5 most sensitive services or data classes and restrict those first.
- **Use standard Data Access Control unless you have a regulatory reason for Strict Mode.** Default-deny creates significant operational overhead and should only be used when the regulatory environment demands it.
- **Combine Data Access Control with Sensitive Data Scanner** as a defense-in-depth measure, especially for Logs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/access_for_enterprises/protecting_assets/
[2]: /account_management/rbac/data_access
[3]: /getting_started/access_for_enterprises/permissions/#custom-roles
[4]: /sensitive_data_scanner/
[5]: /administrators_guide/plan/#resource-tagging
