---
title: Getting Started with Software Delivery MCP Tools
description: Connect AI agents to your CI Visibility and Test Optimization data using the Datadog MCP Server.
further_reading:
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Datadog MCP Server Setup"
- link: "continuous_integration/"
  tag: "Documentation"
  text: "CI Visibility"
- link: "tests/"
  tag: "Documentation"
  text: "Test Optimization"
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Connect your AI agents to Datadog tools and context using the Datadog MCP Server"
---

## Overview

The [Datadog MCP Server][1] enables AI agents to access your Software Delivery data through the [Model Context Protocol (MCP)][2]. The `software-delivery` toolset provides tools for interacting with [CI Visibility][3] and [Test Optimization][4] directly from AI-powered clients like Cursor, Claude Code, or OpenAI Codex.

## Use cases

The Software Delivery MCP tools unlock AI-assisted workflows for:

- **Debugging pipeline failures**: Ask your AI agent to find recent pipeline failures, analyze error logs, and suggest fixes.
- **Identifying flaky tests**: Query for flaky tests in your repository and get prioritized recommendations for which to fix first.
- **Analyzing CI performance**: Get aggregated statistics on pipeline durations, failure rates, and trends over time.
- **Triaging test failures**: Understand which tests are failing, their ownership, and historical patterns.
- **Reviewing code coverage**: Get coverage summaries for branches or commits, including patch coverage and breakdowns by service or code owner.
- **Measuring DORA metrics**: Query deployment frequency, change lead time, change failure rate, and recovery time by service or team.
- **Checking test optimization settings**: See which Test Optimization features are active for a service, including Test Impact Analysis, Early Flake Detection, and Auto Test Retries.

## Available tools

The `software-delivery` toolset includes the following tools:

`search_datadog_ci_pipeline_events`
: Search CI pipeline events with filters and get details on failures, durations, and statuses.

`aggregate_datadog_ci_pipeline_events`
: Aggregate CI pipeline events for statistics like average durations, failure counts, and percentile analysis.

`get_datadog_flaky_tests`
: Find flaky tests with triage details including failure rate, category, owners, and CI impact.

`update_datadog_flaky_test_states`
: Set the state of one or more flaky tests to `quarantined` (suppress failures), `disabled` (skip test), `fixed` (mark resolved), or `active` (restore). This is a write operation that requires `TestOptimizationWrite` permission and explicit user approval. All state changes are reversible.

`aggregate_datadog_test_events`
: Aggregate test events to analyze reliability and performance trends.

`search_datadog_test_events`
: Search test events with filters and get details on them.

`get_datadog_code_coverage_branch_summary`
: Fetch aggregated code coverage summary metrics for a repository branch, including total coverage, patch coverage, and service/codeowner breakdowns.

`get_datadog_code_coverage_commit_summary`
: Fetch aggregated code coverage summary metrics for a repository commit, including total coverage, patch coverage, and service/codeowner breakdowns.

`get_datadog_test_optimization_settings`
: Retrieve which Test Optimization features are enabled for a service, including Test Impact Analysis (ITR), Early Flake Detection (EFD), Auto Test Retries (ATR), Failed Test Replay, Code Coverage collection, and PR Comments.

`get_datadog_flaky_tests_management_policies`
: Retrieve the Flaky Tests Management policies configured for a repository, including auto-quarantine windows, branch rules, failure rate thresholds, disable policies, and retry settings.

`search_dora_deployments`
: Search DORA deployment events with filters, or fetch full details for a single deployment by ID. For aggregated trends (deployment frequency, change lead time, failure rate), use `aggregate_dora_deployments` instead.

`aggregate_dora_deployments`
: Aggregate DORA metrics—deployment frequency, change lead time, change failure rate, and recovery time—as scalar values or timeseries. For a complete DORA summary, call this tool four times in parallel, once per metric.

## Example prompts

After you are connected, try prompts like:

- Show me all the pipelines for my commit `58b1488`.
- What's causing the `integration-test` job to fail on my branch?
- Find active flaky tests for the checkout service sorted by failure rate.
- How many failed pipelines have there been in the last 2 weeks?
- Show me the 95th percentile of pipeline duration grouped by pipeline name.
- What's the code coverage on the `main` branch for `github.com/my-org/my-repo`?
- Show me coverage metrics for commit `abc123abc123abc123abc123abc123abc123abcd`.
- What is the deployment frequency and change failure rate for the `checkout` service over the last 30 days?
- Which test optimization features are enabled for the `auth-service`?
- Quarantine all active flaky tests in the `checkout-service` repository.

## Setup

To use the Software Delivery tools, connect to the Datadog MCP Server with the `software-delivery` toolset enabled. Add the `toolsets` query parameter to the endpoint URL for your [Datadog site][5]:

```text
https://mcp.{{< region-param key="dd_site" >}}/api/unstable/mcp-server/mcp?toolsets=core,software-delivery
```

For full setup instructions including client configuration for Cursor, Claude Code, VS Code, and other AI clients, see [Set Up the Datadog MCP Server][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /continuous_integration/
[4]: /tests/
[5]: /getting_started/site/
