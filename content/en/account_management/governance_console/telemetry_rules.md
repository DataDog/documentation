---
title: Telemetry Rules
is_beta: true
private: true
description: Use telemetry rules to govern tags, indexing, and other characteristics of your metrics, logs, and traces.
further_reading:
- link: '/account_management/governance_console/'
  tag: 'Documentation'
  text: 'Governance Console'
- link: '/account_management/governance_console/controls'
  tag: 'Documentation'
  text: 'Governance Console Controls'
---

{{< beta-callout url="#" btn_hidden="true" >}}
Telemetry rules are in Preview. If you see an issue or want to propose a new feature, use the Give Feedback button in the product UI.
{{< /beta-callout >}}

## Overview

Telemetry rules let Datadog admins govern characteristics of their telemetry, such as permissible tags and indexing. Telemetry rules can help standardize tagging, manage ingested and indexed volume, and minimize unused or redundant telemetry. You can implement rules safely by first targeting visibility, then stepping up to enforcement.

## Prerequisites

You need the `governance_console_read` permission to view telemetry rules. To create, edit, or delete rules, you need the `telemetry_rules_write` permission or the Datadog Admin role. To enable filtering on a rule, you need the `telemetry_rules_enforcement_write` permission.

**Note**: Some rule types might require additional permissions or Agent versions. See the individual rule type pages for more information.

## Telemetry rule types

| Rule type | Telemetry type(s) | Applied at | Description |
|---|---|---|---|
| Tag Visibility and Enforcement | Metrics, Logs, APM | Ingest | Determines whether telemetry tags and values are compliant, and optionally drops non-compliant telemetry at ingest. |
| Tag Indexing | Metrics | Ingest | Determines custom metric tags that should be indexed for a given metric. |
| Metric Name Filtering | Metrics | Agent | Drops custom metrics of a given name directly in the Datadog Agent, prior to ingestion. |

## Tag visibility and enforcement rules

### Create a tag visibility rule

1. Navigate to [Governance Console > Telemetry](https://app.datadoghq.com/governance/telemetry).
2. Click **+ Create New Rule**.
3. Select the signal type: **Metrics**, **APM**, or **Logs**.
4. Select the **Tag Visibility and Enforcement** rule type.
5. Select the scope. Choose **All [Spans/Metrics/Logs]** to apply the rule to all telemetry of the selected type. Choose **Selected [Spans/Metrics/Logs]** to scope the rule to a subset, then enter a tag query, for example, `service:web-store` or `env:prod AND team:payments`. The same query syntax used in Datadog monitors and dashboards applies here.
6. Define the tag key. Enter the tag key you want to enforce (for example, `env` or `team`). By default, a rule only evaluates telemetry that has the specified tag key; telemetry without it isn't evaluated and is considered compliant. To extend the rule to enforce the presence of the tag key across the telemetry type, select **Tag key must be present**. With this option enabled, the rule flags telemetry without the tag key as non-compliant.
7. Specify tag values. Select **Allowed tag values** to define an allowlist, or **Disallowed tag values** to define a denylist. Enter values as a comma-separated list. Wildcards are supported: `us*` matches `us-east-1`, `us-west-2`, and any other value starting with `us`.
8. Name your rule. Enter a description that explains what the rule enforces, for example, *Require team tag on all resources*.
9. Click **Create Rule**. **Note**: You can't toggle **Filter data at ingest** until after you create the rule.

{{< img src="account_management/governance_console/telemetry_rules/creating_telemetry_rule.mp4" alt="Creating a Tag Visibility rule in Governance Console" video="true" style="width:100%;" >}}

### Review tag visibility rule compliance

After you create a tag visibility rule, Datadog begins tracking compliance across all matching telemetry. Open a rule to see:

- **Compliance score**: The percentage of in-scope spans (or metric datapoints, or log events) that satisfy the rule, calculated over the selected time window. A compliance score of 100% means all matching telemetry is compliant with the rule. A score of 0% means none of the matching telemetry is compliant with the rule.
- **Score over time**: A chart showing how compliance has trended. Use the time selector to view the trend over your preferred time frame. **Note**: This chart isn't available for metrics, and metric history is limited to the last 8 hours.
- **Non-compliant telemetry**: A table showing individual spans, metrics, or log events that violate the rule, with service name, resource, and additional signal-specific details. Click a row to view more details about the telemetry in question. For APM rules, click **View in Trace** to open non-compliant spans directly in the trace explorer.

### Enforce tag compliance through filtering

After you create and review a tag visibility rule, you can enforce it by filtering out non-compliant telemetry at ingest. Filtering rules can cause permanent data loss if misconfigured. Because of this, there is a required waiting time of 5 minutes between creating a tag visibility rule and enabling filtering.

To enable filtering:

1. Navigate to the relevant tag visibility rule and open it.
2. Review the rule description, compliance score, and non-compliant telemetry carefully.
3. Enforce the rule by toggling **Filter data at ingest** under **Rule action**.
4. Confirm filtering enforcement by entering and submitting the required text.

The rule immediately begins to filter out non-compliant telemetry at ingest. You can review a sample of filtered telemetry at any time by opening the rule page and examining the graph or list underneath.

{{< img src="account_management/governance_console/telemetry_rules/enforcing_telemetry_rule.mp4" alt="Enforcing a Tag Visibility rule and viewing filtered telemetry" video="true" style="width:100%;" >}}

## Tag indexing rules

Tag Indexing rules determine which custom metric tags Datadog indexes. See [Tag Indexing Rules](/metrics/guide/tag-indexing-rules/) for more information. **Note**: You can manage these rules in either Governance Console or Metrics Settings. Tag Indexing rules are only available for metrics.

## Metric name filtering rules

Metric Name Filtering rules drop custom metrics of a given name in the Datadog Agent, before ingestion. See [Agent Filtering for Custom Metrics](/metrics/guide/agent-filtering-for-custom-metrics) for more information. **Note**: You can manage these rules in either Governance Console or Metrics Settings. Metric Name Filtering rules are only available for metrics.

## Rules reference

| Field | Description |
|---|---|
| Rule | A human-readable summary of the rule (for example, *env is prod in all spans*). |
| Scope | The tag query used to select which telemetry this rule applies to. `*` means all telemetry of the selected type. |
| Tag Key | The tag key this rule evaluates. |
| Value Patterns | The allowed or denied tag values, including any wildcards. |
| Negated | Whether the value list is an allowlist (**No**) or a denylist (**Yes**). |
| Compliance Score | Percentage of in-scope telemetry that satisfies the rule, over the configured time window. |
| Active Since | The date the rule was created and the user who created it. |

## Edit or delete a rule

Click the **⋮** menu on any rule row to edit or delete it. Edits take effect immediately, even if a rule is actively filtering or dropping telemetry. **Note**: Prior rule compliance data isn't retained.

## Limitations

You can create up to 10 rules per signal type (APM, Metrics, and Logs each have a separate limit of 10). You can specify up to 30 tag values per Tag Visibility and Enforcement rule. If your tagging strategy requires more rules, contact your Datadog account team to request a higher limit.

## Known limitations

- Not available for telemetry types outside Metrics, Logs, and APM.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
