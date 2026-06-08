---
title: Experiments MCP Tools
description: Use AI agents to plan, monitor, and analyze experiments with the Datadog MCP Server's experiments toolset.
further_reading:
- link: "mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server Overview"
- link: "experiments/"
  tag: "Documentation"
  text: "Datadog Experiments"
- link: "feature_flags/feature_flag_mcp_server"
  tag: "Documentation"
  text: "Feature Flags MCP Tools"
algolia:
  tags: ["mcp", "mcp server", "experiments", "feature flags", "a/b testing", "experimentation"]
---

## Overview

The [Datadog MCP Server][1] lets AI agents interact with your experiment data through the [Model Context Protocol (MCP)][2]. The `experiments` toolset gives AI clients like Cursor, Claude Code, OpenAI Codex, and [Bits AI][6] structured access to your experiments, metrics, and diagnostic data.

The toolset becomes most powerful when your AI client can also read your codebase — combining live experiment state with how the associated feature flag is installed in your code.

<div class="alert alert-info">The <code>experiments</code> toolset is not enabled by default. See <a href="#setup">Setup</a> for instructions on enabling it.</div>

### Use cases

**Before launching an experiment**, point an agent at [`check-flag-implementation`][5] (part of the `feature-flags` toolset) alongside your source code to audit the flag installation:

- Is the flag read with the right value type and context attributes for its targeting rules? Is the default value consistent with what production serves today?
- Does the code correctly emit the metric events the experiment depends on — or is there a path where a metric fires in one variant but not another, or fires twice?
- Are there nearby events or user behaviors in the code that aren't captured by any metric, or segments worth adding because the code path diverges by platform or context?

**While an experiment is running**, the toolset covers about a dozen diagnostic dimensions — sample ratio mismatch (SRM), unreliable metrics, zero-data metrics, per-variant exposure imbalances, and more. When `get-experiment-diagnostics` identifies an issue, an agent with source access can trace the root cause: an SDK call inside a conditional that excludes some assigned subjects, or an exposure event that only fires after a late-loading component.

For metric movements, `get-metric-definition` returns the underlying event query and the recommended Datadog MCP tool to call next. An agent can chain into the raw event data and reason through what in your code change is most likely driving the movement.

**Before concluding**, use `explore-experiment-results` to build confidence in the interpretation. An agent can slice the primary metric by device type, country, plan tier, or any other assignment property to check whether the result holds across subgroups or is being carried by one cohort. It can also examine time-bucketed results to check whether the lift held steady over time or faded after the first few days. This segmentation work — which would otherwise require navigating multiple dashboard views — happens in a single conversational thread alongside the diagnostic and results data already in context.

**At conclusion**, an agent can take the winning variant decision, find the flag in the source, and draft the code change: inline the winning branch, remove the losing branch, delete the SDK call default that no longer needs a fallback.

**For program-wide operations**, an agent can sweep all running experiments for diagnostic warnings, surface stuck drafts with no allocation, and generate a standup-ready status summary.

## Setup

The `experiments` toolset is not enabled by default. To enable it, add `experiments` to the `toolsets` parameter when connecting to the Datadog MCP Server. For example:

```text
https://mcp.{{< region-param key="dd_site" >}}/api/unstable/mcp-server/mcp?toolsets=all,experiments
```

See [Set Up the Datadog MCP Server][3] for full connection instructions and toolset configuration.

For feature flag management tools used alongside experiments — creating flags, syncing allocations, checking canary results — see [Feature Flags MCP Tools][4].

## Available tools

The `experiments` toolset exposes the following tools to your AI client. When you ask a question in natural language, your AI client calls these tools on your behalf. For general information on how to use MCP tools, see the [Datadog MCP Server Overview][1]. Each tool lists the [Datadog permissions][7] required to use it.

### Listing and browsing

`list-experiments`
: Lists experiments for the organization. Accepts an optional name search query, limit, and offset for pagination.
: *Permissions required: `Product Analytics Experiments Read`*

`get-experiment`
: Gets a single experiment by ID, including status, linked feature flag, subject type, primary metric, assignment dates, and decision.
: *Permissions required: `Product Analytics Experiments Read`*

### Lifecycle management

`create-experiment`
: Creates a new experiment with a name, hypothesis, subject type, and primary metric.
: *Permissions required: `Product Analytics Experiments Write`*

`link-feature-flag-to-experiment`
: Links a feature flag to an experiment.
: *Permissions required: `Product Analytics Experiments Write`*

`start-experiment`
: Starts an experiment. Requires a linked flag with an active allocation, a subject type, and a primary metric.
: *Permissions required: `Product Analytics Experiments Write`*

`conclude-experiment`
: Concludes a running experiment with a permanent winning variant decision.
: *Permissions required: `Product Analytics Experiments Write`*

`cancel-experiment`
: Cancels a running experiment with a required reason.
: *Permissions required: `Product Analytics Experiments Write`*

### Diagnostics and results

`get-experiment-diagnostics`
: Returns a health summary for an experiment before interpreting results: sample ratio mismatch (SRM) status, total subjects, per-variant exposure counts and fractions, and per-metric health including unreliable and zero-data metrics. Call this before `get-experiment-results` — if `srm.has_warning` is true, variant-level comparisons are not safe to interpret.
: *Permissions required: `Product Analytics Experiments Read`*

`get-experiment-results`
: Returns computed per-variant, per-metric results. The `verdict` field (`better`, `worse`, `inconclusive`, or `unreliable`) is authoritative — do not re-derive significance from raw p-values or confidence intervals.
: *Permissions required: `Product Analytics Experiments Read`*

`explore-experiment-results`
: Segments results by an assignment property (device type, country, plan tier, and so on) or over time. Use after `get-experiment-results` for questions like "how does this look for mobile users?" or "how did this trend over the last week?"
: *Permissions required: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*

`list-experiment-segmentation-properties`
: Lists the assignment properties an experiment can be split by. Call this before `explore-experiment-results` to get valid property IDs — do not guess them.
: *Permissions required: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*

`get-experiment-segmentation-property-values`
: Returns the concrete values for a segmentation property (for example, `["mobile", "desktop", "tablet"]` for device type). Use this before filtering in `explore-experiment-results` to avoid invalid filter strings.
: *Permissions required: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*

### Metric investigation

`get-metric-definition`
: Returns the definition of an experiment metric — the underlying event query, data source, and the recommended Datadog MCP tool to call next to investigate why the metric moved. For `datadog`-sourced metrics, the response includes a `recommended_tool_call` field pointing to `aggregate_rum_events` or `run_analytics_query` along with the structured filter and aggregation pieces needed to assemble the call. Not for Datadog infrastructure or APM metrics; use `get_datadog_metric` for those.
: *Permissions required: `Product Analytics Metrics Read`*

### Troubleshooting

`diagnose-experiment-run-failure`
: Diagnoses why the latest (or a specific) analysis pipeline run for an experiment failed. Returns the root-cause task, a categorized failure explanation, and actionable next steps. This tool is for pipeline execution failures (tasks that crashed, timed out, or errored) — use `get-experiment-diagnostics` for result quality and SRM issues instead.
: *Permissions required: `Product Analytics Experiments Read`*

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /mcp_server/setup/
[4]: /feature_flags/feature_flag_mcp_server/
[5]: /feature_flags/feature_flag_mcp_server/#check-feature-flag-implementation
[6]: /bits_ai/
[7]: /account_management/rbac/permissions/
