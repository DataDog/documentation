---
title: Telemetry Rules
is_beta: true
private: true
description: Use telemetry rules to govern tags, indexing, and other characteristics of your metrics, logs, and spans.
further_reading:
- link: '/account_management/governance_console/'
  tag: 'Documentation'
  text: 'Governance Console'
- link: '/account_management/governance_console/controls'
  tag: 'Documentation'
  text: 'Governance Console Controls'
- link: '/metrics/guide/tag-indexing-rules/'
  tag: 'Documentation'
  text: 'Tag Indexing Rules'
- link: '/metrics/guide/agent-filtering-for-custom-metrics'
  tag: 'Documentation'
  text: 'Agent Filtering for Custom Metrics'
---

{{< beta-callout url="#" btn_hidden="true" header="false" >}}
Telemetry rules are in Preview. If you see an issue or want to propose a new feature, use the Give Feedback button in the product UI.
{{< /beta-callout >}}

## Overview

Telemetry rules let Datadog admins govern characteristics of their metrics, logs, and spans from the Governance Console. Telemetry rules can help standardize tagging, manage ingested and indexed volume, and minimize unused or redundant telemetry, which can improve usage and cost management.

## Prerequisites

You need the `governance_console_read` permission to view telemetry rules. To create, edit, or delete rules, you need the `telemetry_rules_write` permission or the Datadog Admin role. To enable filtering on a rule, you need the `telemetry_rules_enforcement_write` permission.

<div class="alert alert-info">Some rule types might require additional permissions or Agent versions. See the individual rule type pages for more information.</div>

## Telemetry rule types

| Rule type | Telemetry type(s) | Applied at | Description |
|---|---|---|---|
| Tag Visibility and Enforcement | Metrics, logs, spans | Ingest | Determines whether telemetry tags and values are compliant, and optionally drops non-compliant telemetry at ingest. |
| Tag Indexing | Metrics | Ingest | Determines custom metric tags that should be indexed for a given metric. |
| Metric Name Filtering | Metrics | Agent | Drops custom metrics of a given name directly in the Datadog Agent, prior to ingestion. |

## Tag visibility and enforcement rules

### Create a tag visibility rule

1. Navigate to [Governance Console > Telemetry](https://app.datadoghq.com/governance/telemetry) and click **+ Create New Rule**.
2. Select the signal type (**Metrics**, **APM**, or **Logs**) and the **Tag Visibility and Enforcement** rule type.
3. Select the scope. Choose **All [Spans/Metrics/Logs]** to apply the rule to all telemetry of the selected type. Choose **Selected [Spans/Metrics/Logs]** to scope the rule to a subset, then enter a tag query, for example, `service:web-store` or `env:prod AND team:payments`. The same query syntax used in Datadog monitors and dashboards applies here.
4. Define the tag key. Enter the tag key you want to enforce (for example, `env` or `team`). Select **Tag key must be present** to flag telemetry missing the key as non-compliant.

   <div class="alert alert-info">If <strong>Tag key must be present</strong> isn't selected, a rule only evaluates telemetry that already has the specified tag key. Telemetry without the key isn't evaluated and is considered compliant.</div>
5. Specify tag values. Select **Allowed tag values** to define an allowlist, or **Disallowed tag values** to define a denylist. Enter values as a comma-separated list; wildcards are supported (for example, `us*` matches `us-east-1` and `us-west-2`).
6. Name your rule. Enter a description that explains what the rule enforces, for example, *Require team tag on all resources*.

   <div class="alert alert-info">You can't toggle <strong>Filter data at ingest</strong> until after you create the rule.</div>
7. Click **Create Rule**.

{{< img src="account_management/governance_console/telemetry_rules/creating_telemetry_rule.mp4" alt="Creating a Tag Visibility rule in Governance Console" video="true" style="width:100%;" >}}

### Review tag visibility rule compliance

After you create a tag visibility rule, Datadog begins tracking compliance across all matching telemetry. Open a rule to see:

- **Compliance score**: The percentage of in-scope spans, metrics, or log events that satisfy the rule, calculated over the selected time window. A compliance score of 100% means all matching telemetry is compliant with the rule. A score of 0% means none of the matching telemetry is compliant with the rule.
- **Score over time**: A chart showing how compliance has trended. Use the time selector to view the trend over your preferred time frame. This chart isn't available for metrics, and metric history is limited to the last 8 hours.
- **Non-compliant telemetry**: A table showing individual spans, metrics, or log events that violate the rule, with service name, resource, and additional signal-specific details. Click a row to view more details about the telemetry in question. For rules on spans, click **View in Trace** to open non-compliant spans directly in the trace explorer.

### Enforce tag compliance through filtering

After you create and review a tag visibility rule, you can enforce it by filtering out non-compliant telemetry at ingest.

<div class="alert alert-warning">Filtering rules can cause permanent data loss if misconfigured. There is a required waiting time of 5 minutes between creating a tag visibility rule and enabling filtering.</div>

To enable filtering:

1. Navigate to the relevant tag visibility rule and open it.
2. Review the rule description, compliance score, and non-compliant telemetry carefully.
3. Enforce the rule by toggling **Filter data at ingest** under **Rule action**.
4. Confirm filtering enforcement by entering and submitting the required text.

The rule immediately begins to filter out non-compliant telemetry at ingest. Samples of non-compliant telemetry are recorded in the [Audit Trail](/account_management/audit_trail/). You can view these samples by navigating to the rule, then either scrolling through the table or clicking **View in Audit Trail**.

{{< img src="account_management/governance_console/telemetry_rules/enforcing_telemetry_rule.mp4" alt="Enforcing a Tag Visibility rule and viewing filtered telemetry" video="true" style="width:100%;" >}}

## Edit or delete a rule

Click the **⋮** menu on any rule row to edit or delete it. Edits take effect immediately, even if a rule is actively filtering or dropping telemetry, and prior rule compliance data isn't retained.

## Other rules

You can create and manage specific rules for metrics from the Governance Console. Alternatively, you can manage these rules from Metrics Settings. For rule-specific details, see the reference documentation below:

- [Tag Indexing](/metrics/guide/tag-indexing-rules/)
- [Metric Name Filtering](/metrics/guide/agent-filtering-for-custom-metrics)

## Limitations

You can create up to 10 rules per signal type (spans, metrics, and logs each have a separate limit of 10). You can specify up to 30 tag values per Tag Visibility and Enforcement rule. If your tagging strategy requires more rules, contact your Datadog account team to request a higher limit. Telemetry rules aren't available for telemetry types outside metrics, logs, and spans.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
