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
- link: "mcp_server/tools"
  tag: "Documentation"
  text: "Datadog MCP Server Tools"
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

The toolset becomes most powerful when your AI client can also read your codebase—combining live experiment state with how the associated feature flag is installed in your code.

<div class="alert alert-info">The <code>experiments</code> toolset is not enabled by default. See <a href="#setup">Setup</a> for instructions on enabling it.</div>

### Use cases

**Before launching an experiment**, point an agent at [`check_datadog_flag_implementation`][5] (part of the `feature-flags` toolset) alongside your source code to audit the flag installation:

- Whether the flag is read with the correct value type and context attributes for its targeting rules, and whether the default value matches what production serves
- Whether the code emits metric events correctly in all variants, or whether there is a path where a metric fires in one variant but not another, or fires twice
- Whether nearby events or behaviors in the code aren't captured by any metric, and whether segments are worth adding because the code path diverges by platform or context

**While an experiment is running**, the toolset covers several diagnostic dimensions—sample ratio mismatch (SRM), unreliable metrics, zero-data metrics, per-variant exposure imbalances, and more. When `get_experiment_diagnostics` identifies an issue, an agent with source access can trace the root cause: an SDK call inside a conditional that excludes some assigned subjects, or an exposure event that only fires after a late-loading component.

For metric movements, `get_metric_definition` returns the underlying event query and the recommended Datadog MCP tool to call next. An agent can then query the raw event data and reason through what change in your code is most likely driving the movement.

**Before concluding**, use `explore_experiment_results` to build confidence in the interpretation. An agent can segment the primary metric by device type, country, plan tier, or any other assignment property to check whether the result holds across subgroups or is driven by a single cohort. It can also examine time-bucketed results to check whether the lift held steady over time or faded after the first few days. This segmentation work, which would otherwise require multiple dashboard views, happens within a single conversation.

**At conclusion**, an agent can record the winning variant decision, find the flag in the source, and draft the code change: inline the winning branch, remove the losing branch, delete the SDK call default that no longer needs a fallback.

**For program-wide operations**, an agent can sweep all running experiments for diagnostic warnings, surface draft experiments with no allocation, and generate a status summary.

## Setup

The `experiments` toolset is not enabled by default. To enable it, add `experiments` to the `toolsets` parameter when connecting to the Datadog MCP Server. See [Set Up the Datadog MCP Server][3] for connection instructions and toolset configuration.

For feature flag management tools used alongside experiments—creating flags, syncing allocations, checking canary results—see [Feature Flags MCP Tools][4].

For the full reference of tools in the `experiments` toolset, including required permissions and example prompts, see [Datadog MCP Server Tools][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /mcp_server/setup/
[4]: /feature_flags/feature_flag_mcp_server/
[5]: /feature_flags/feature_flag_mcp_server/#check-feature-flag-implementation
[6]: /bits_ai/
[7]: /mcp_server/tools/#experiments
