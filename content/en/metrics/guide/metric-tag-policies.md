---
title: Metric Tag Policies
description: "Use tag policies to configure metrics proactively, after ingestion, so you can mitigate high cardinality and enforce consistent tag management across your organization"
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

Tag policies are centralized, sequentially evaluated aggregation rules that determine which tags are retained on metrics after ingestion. They let you define persistent, account-level controls based on metric names or prefixes to specify which tags to retain or exclude. This helps proactively manage cardinality and reduce costs without requiring code changes.

## Create a tag policy

After you create a policy, Datadog automatically applies it to all matching metrics.

1. Navigate to [**Metrics → Settings → Policies**][1].
2. Click **+ Create policy**.

Alternatively, create policies from the [Metrics Volume][2] page by opening the **More** menu next to **Export as CSV**.

### Step 1: Set policy details

1. Enter a policy name.
   Use a descriptive name that clearly identifies the purpose of the policy.

### Step 2: Define policy scope

Choose which metrics the policy applies to.

Scope a policy using one or more of the following options:

Policy type
: * **Include tags** (define an allowlist of tags that remain queryable)
  * **Exclude tags** (define a blocklist of tags to aggregate)

Metric names or prefixes
: Apply the policy to specific metric names or namespaces (for example, `http.*`, `db.query.*`)

Prefix exceptions
: Exclude specific prefixes from the policy scope (for example, apply to `http.*` except `http.debug.*`)

Metric usage
: * Apply to metrics not queried within a selected time window
  * Apply only to metrics tied to Datadog assets such as dashboards, monitors, notebooks, or SLOs

If multiple policies apply to the same metrics, Datadog evaluates them in order. Optionally, use **Replace** behavior to override previously evaluated policies for the selected metrics.

### Step 3: Configure tag behavior

Define how the policy handles tags for metrics in scope:

Select tags to include or exclude
: Choose specific tag keys to allow or block.

Include tags used on assets
: Retain tags used on dashboards, monitors, notebooks, or SLOs to avoid breaking critical assets.

Exclude inactive tags
: Optionally drop tags not queried within a selected time window, with an additional grace period for new tags.

Merge or replace existing configurations
: * Merge—applies this policy on top of existing tag configurations. Metrics with no prior configuration are unaffected.
  * Replace—ignores existing configurations and enforces this policy exclusively.

  **Note**: Use **Replace** behavior on a narrower policy to prevent a broader policy's excluded tags from stacking. For example, if Policy 1 excludes `host` from `dd.*` (Merge) and Policy 2 excludes `app_name` from `dd.payments.*`, using **Merge** behavior on Policy 2 drops both `host` and `app_name` tags from `dd.payments.*` metrics. Using **Replace** behavior on Policy 2 drops only `app_name` (Policy 1's effect is overridden for that prefix).

### Step 4: Preview affected metrics

The preview shows:

* A list of affected metrics (up to 100 in the UI)

* Optional estimated impact on metric usage

Download a full list of affected metrics as a CSV and preview how the policy applies to metrics not yet submitted.

### Limitations

- Exclude rules take effect after Datadog observes a tag on a metric.
- Datadog evaluates policies sequentially. Earlier policies establish
the configuration, and each subsequent policy either builds on or replaces it. 

## Modify a policy

Navigate to [**Metrics → Settings → Policies**][1] to modify existing policies.

Edit policy configuration
: Change the policy's scope, tag selection, or other settings.

Change merge or replace behavior
: Switch between **Merge** and **Replace** behaviors to control how this policy interacts with existing configurations.

Reorder policies
: Change the execution order to adjust how policies interact when multiple policies apply to the same metrics.

Delete a policy
: Remove policies that are no longer needed. When you delete a policy, Datadog recomputes the tag configuration for affected metrics based on the remaining policies.

Override policies for a specific metric                                                                                                                                 
: From the metric's details side panel, set the metric to retain all tags. This bypasses all policies for that metric without modifying them. To reapply policies, restore the metric's default configuration from the same panel.
         
After you make changes, Datadog automatically applies them to all matching metrics.

## Policy precedence

When multiple policies apply to the same metrics, Datadog evaluates them sequentially. Policy order matters because:

* Later policies modify the results of earlier policies
* **Replace** behavior overwrites previous configurations for matching metrics
* **Merge** behavior builds on existing configurations
* When multiple policies use **Replace** behavior, the last applied policy determines whether the final configuration is in include or exclude mode

Reorder policies on the [Policies page][1] to change which policy takes precedence. See the examples below to understand how different orders produce different results.

## Precedence examples

### Example 1: **Merge** and **Replace** behavior

Tag policies can either replace an existing configuration or merge with it. This determines whether a policy resets the tag configuration or builds on top of what already exists.

Starting tags:  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/metric_tag_policies/merge_vs_replace.png" alt="" style="width:100%;">}}

**Key insight**: The `env` tag is re-added only to the `infra.*` metrics.

### Example 2: Policy order

When multiple policies apply to the same metrics, they are evaluated in order.  
Policies that run later can refine or override the effects of earlier policies.

Starting tags:  
`host`, `env`, `service`

#### Order 1: Specific policy first

{{< img src="metrics/guide/metric_tag_policies/policy_order_1.png" alt="" style="width:100%;">}}

**Key insight**: Policy 1 removes the `host` tag, then Policy 2 re-adds `host`.

#### Order 2: General policy first

{{< img src="metrics/guide/metric_tag_policies/policy_order_2.png" alt="" style="width:100%;">}}

**Key insight**: The `host` tag is removed last, and stays removed.

### Example 3: Exception to a broad rule

Use a broad policy with **Replace** behavior to exclude a tag globally, then use a targeted policy with **Merge** behavior to restore the tag for specific metrics.

Starting tags:
`node`, `env`, `pod`

{{< img src="metrics/guide/metric_tag_policies/broad_exclude_narrow_exception.png" alt="" style="width:100%;">}}

**Key insight**: When a broad exclude and a narrow include cancel each other out for a metric, no tag restrictions are applied and all original tags are preserved.

### Example 4: Multiple exceptions to a broad rule

Layer multiple policies with **Merge** behavior on top of a broad policy with **Replace** behavior to restore different tags for different metric prefixes. Metrics matching more specific prefixes accumulate more restorations.

Starting tags:
`team`, `pod`, `env`

{{< img src="metrics/guide/metric_tag_policies/multiple_exceptions.png" alt="" style="width:100%;">}}

**Key insight**: Multiple inclusion policies with **Merge** behavior, applied after an exclusion policy with **Replace** behavior, are additive (a metric matching two exception prefixes gets both sets of tags restored).

## Metrics without Limits™ compatibility

Tag policies do not automatically override existing [Metrics without Limits™][3] (MWL) per-metric configurations. Existing MWL configurations take precedence and are preserved when tag policies are created or modified.

If a metric's MWL configuration is deleted, tag policies automatically apply to that metric based on the current policy order.

To exclude a specific metric from all tag policies without deleting them, use the metric's details side panel to retain all tags. To reapply policies, restore the metric's default configuration from the same panel.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: https://app.datadoghq.com/metric/volume
[3]: /metrics/metrics-without-limits/