---
title: Tag Indexing Rules
description: "Use tag rules to configure metrics proactively, after ingestion, so you can mitigate high cardinality and enforce consistent tag management across your organization"
further_reading:
- link: "/account_management/billing/custom_metrics/?tab=countrate"
  tag: "Documentation"
  text: "Custom Metrics Billing"
- link: "/metrics/guide/custom_metrics_governance/"
  tag: "Guide"
  text: "Best Practice for Custom Metric Governance"
- link: "https://www.datadoghq.com/blog/metrics-without-limits/"
  tag: "Blog"
  text: "Dynamically control your custom metrics volume with Metrics without Limits™"
algolia:
  tags: ['custom metrics']
private: true
---

## Overview

Tag Indexing Rules are centralized configurations that define how metric tags are handled at ingestion. They allow you to proactively control which tags are retained or excluded, helping reduce high cardinality by removing unnecessary tags and ensuring consistent tagging across your organization.

Tag Indexing Rules operate on groups of metrics identified by name or prefix. They apply to both existing and newly ingested metrics that match the defined patterns, reducing the need for reactive cleanup or code changes while enabling more predictable cost management.

## Create a tag rule

After you create a rule, Datadog automatically applies it to all matching metrics.

1. Navigate to [**Metrics → Settings**][3].
2. Click **+ Create Rule**.
3. Select **Configure Tag Indexing Rule**.

### Step 1: Set rule details

1. Enter a rule name.
   Use a descriptive name that clearly identifies the purpose of the rule.

### Step 2: Define rule scope

Choose which metrics the rule applies to.

Scope a rule using one or more of the following options:

Metric names or prefixes
: Apply the rule to specific metric names or namespaces (for example, `http.*`, `db.query.*`)

Prefix exceptions
: Exclude specific prefixes from the rule scope (for example, apply to `http.*` except `http.client.*`)

If multiple rules apply to the same metrics, Datadog evaluates them in order. Optionally, use **Override** behavior to override previously evaluated rules for the selected metrics.

### Step 3: Configure tag behavior

Define how the rule handles tags for metrics in scope:

Merge or override existing configurations
: * Merge (default)—applies this rule on top of existing tag configurations. Metrics with no prior configuration are unaffected.
  * Override—ignores all other rules that apply to the same prefixes and enforces this rule exclusively. This behavior is enabled by selecting the **Override all other rules that apply to these prefixes** option.

  **Note**: Use **Override** behavior on a narrower rule to prevent a broader rule's excluded tags from stacking. For example, if Rule 1 excludes `host` from `dd.*` (Merge) and Rule 2 excludes `app_name` from `dd.payments.*`, using **Merge** behavior on Rule 2 drops both `host` and `app_name` tags from `dd.payments.*` metrics. Using **Override** behavior on Rule 2 drops only `app_name` (Rule 1's effect is overridden for that prefix).

Apply to new metrics only
: Applies this rule only to metrics submitted after the rule is created. Existing metrics that match the rule are not affected.

Select tags to include or exclude
: * **Include tags** (use an allowlist of tags that remain queryable)
  * **Exclude tags** (use a blocklist to define non-queryable tags)

  Add the tag keys you want to include or exclude.

### Step 4: Preview affected metrics

The preview shows:

* A list of affected metrics (up to 100 in the UI)

### Limitations

- Exclude rules take effect after Datadog observes a tag on a metric.
- Datadog evaluates rules sequentially. Earlier rules establish
the configuration, and each subsequent rule either builds on or replaces it. 

## Modify a rule

Navigate to [**Metrics → Settings → Rules**][1] to modify existing rules.

Edit rule configuration
: Change the rule's scope, tag selection, or other settings.

Change merge or replace behavior
: Switch between **Merge** and **Override** behaviors to control how this rule interacts with existing configurations.

Reorder rules
: Change the execution order to adjust how rules interact when multiple rules apply to the same metrics.

Delete a rule
: Remove rules that are no longer needed. When you delete a rule, Datadog recomputes the tag configuration for affected metrics based on the remaining rules.

Override rules for a specific metric
: To exempt a metric from tag rules, open the metric's details side panel in Metrics Summary, select **Configure This Metric Individually**, and set the metric to retain all tags. This bypasses all tag rules for that metric without modifying the rules themselves.

  To reapply rules, restore the metric's default configuration from the same panel.
         
After you make changes, Datadog automatically applies them to all matching metrics.

## Rule precedence

When multiple rules apply to the same metrics, Datadog evaluates them sequentially. Rule order matters because:

* Later rules modify the results of earlier rules
* **Override** behavior overwrites previous configurations for matching metrics
* **Merge** behavior builds on existing configurations
* When multiple rules use **Override** behavior, the last applied rule determines whether the final configuration is in include or exclude mode

Reorder rules on the [Rules page][1] to change which rule takes precedence. See the examples below to understand how different orders produce different results.

## Precedence examples

### Example 1: **Merge** and **Override** behavior

Tag rules can either override an existing configuration or merge with it. This determines whether a rule resets the tag configuration or builds on top of what already exists.

Starting tags:  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/tag_indexing_rules/merge_vs_override.png" alt="" style="width:100%;">}}

**Key insight**: The `env` tag is re-added only to the `infra.*` metrics.

### Example 2: Rule order

When multiple rules apply to the same metrics, they are evaluated in order.  
Rules that run later can refine or override the effects of earlier rules.

Starting tags:  
`host`, `env`, `service`

#### Order 1: Specific rule first

{{< img src="metrics/guide/tag_indexing_rules/rule_order_1.png" alt="" style="width:100%;">}}

**Key insight**: Rule 1 removes the `host` tag, then Rule 2 re-adds `host`.

#### Order 2: General rule first

{{< img src="metrics/guide/tag_indexing_rules/rule_order_2.png" alt="" style="width:100%;">}}

**Key insight**: The `host` tag is removed last, and stays removed.

### Example 3: Exception to a broad rule

Use a broad rule with **Override** behavior to exclude a tag globally, then use a targeted rule with **Merge** behavior to restore the tag for specific metrics.

Starting tags:
`node`, `env`, `pod`

{{< img src="metrics/guide/tag_indexing_rules/broad_exclude_narrow_exception.png" alt="" style="width:100%;">}}

**Key insight**: When a broad exclude and a narrow include cancel each other out for a metric, no tag restrictions are applied and all original tags are preserved.

### Example 4: Multiple exceptions to a broad rule

Layer multiple rules with **Merge** behavior on top of a broad rule with **Override** behavior to restore different tags for different metric prefixes. Metrics matching more specific prefixes accumulate more restorations.

Starting tags:
`team`, `pod`, `env`

{{< img src="metrics/guide/tag_indexing_rules/multiple_exceptions.png" alt="" style="width:100%;">}}

**Key insight**: Multiple inclusion rules with **Merge** behavior, applied after an exclusion rule with **Override** behavior, are additive (a metric matching two exception prefixes gets both sets of tags restored).

## Metrics without Limits™ compatibility

Tag rules do not automatically override existing [Metrics without Limits™][2] (MWL) per-metric configurations. Existing MWL configurations take precedence and are preserved when tag rules are created or modified.

If a metric's MWL configuration is deleted, tag rules automatically apply to that metric based on the current rule order.

To exclude a specific metric from all tag rules without deleting them, use the metric's details side panel to retain all tags. To reapply rules, restore the metric's default configuration from the same panel.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: /metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/settings