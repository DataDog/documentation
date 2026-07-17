---
title: Getting Started with Software Delivery MCP Tools
description: Connect AI agents to your CI Visibility and Test Optimization data using the Datadog MCP Server.
further_reading:
- link: "mcp_server/setup"
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

The [Datadog MCP Server][1] enables AI agents to access your Software Delivery data through the [Model Context Protocol (MCP)][2]. The `software-delivery` toolset provides tools for interacting with [CI Visibility][3], [Test Optimization][4], [Code Coverage][8], and [DORA metrics][9] directly from AI-powered clients like Cursor, Claude Code, or OpenAI Codex.

## Use cases

The Software Delivery MCP tools unlock AI-assisted workflows for:

- **Debugging pipeline failures**: Ask your AI agent to find recent pipeline failures, analyze error logs, and suggest fixes.
- **Identifying flaky tests**: Query for flaky tests in your repository and get prioritized recommendations for which to fix first.
- **Analyzing CI performance**: Get aggregated statistics on pipeline durations, failure rates, and trends over time.
- **Triaging test failures**: Understand which tests are failing, their ownership, and historical patterns.
- **Reviewing code coverage**: Get coverage summaries for branches or commits, including patch coverage and breakdowns by service or code owner.
- **Measuring DORA metrics**: Query deployment frequency, change lead time, change failure rate, and recovery time by service or team.
- **Checking test optimization settings**: See which Test Optimization features are active for a service, including Test Impact Analysis, Early Flake Detection, and Auto Test Retries.
- **Retrying failed CI jobs**: Queue a retry for a failed GitHub Actions job without leaving the agent session.
- **Checking PR health**: Get a combined view of CI failures, code coverage, and quality or security violations for a pull request.

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

`retry_datadog_ci_job`
: Queue a retry for a failed GitHub Actions CI job. A write operation that modifies CI state, requiring `CiVisibilityWrite` permission. Server-side limits cap retries at two per job over seven days. This tool only applies to GitHub Actions. For other CI providers, use the provider's UI to rerun.

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
https://mcp.{{< region-param key="dd_site" >}}/v1/mcp?toolsets=core,software-delivery
```

For full setup instructions including client configuration for Cursor, Claude Code, VS Code, and other AI clients, see [Set Up the Datadog MCP Server][1].

## Agent skills

Agent skills are prebuilt instruction sets for AI coding agents that automate common Software Delivery workflows. The `dd-software-delivery` skill set is available in the [Datadog agent-skills][6] repository. It provides two skills for triaging flaky tests and unblocking failing PR pipelines using your live CI and Test Optimization data.

After you connect the `software-delivery` MCP toolset, your AI assistant automatically loads skills when your prompt matches their purpose. For example, entering "TestCheckoutServiceIntegration keeps failing in CI — investigate it" loads `/triage-flaky-test` without any installation required.

To invoke the skills explicitly with a slash command, install them locally:

### Install

```shell
npx skills add datadog-labs/agent-skills \
  --skill unblock-pr \
  --skill triage-flaky-test \
  --full-depth -y
```

Restart Claude Code after installing for the slash commands to appear.

Each skill automatically uses the Datadog MCP server if connected, and falls back to the [pup][7] CLI otherwise. To use the pup fallback, install and authenticate pup:

```shell
brew install datadog-labs/pack/pup
pup auth login
```

### Available skills

| Skill | Invoke with | What it does |
|-------|-------------|-------------|
| Triage flaky test | `/triage-flaky-test` | Get history, failure pattern, and AI category for a specific flaky test, then recommend fix, quarantine, or escalate |
| Unblock PR | `/unblock-pr` | Attribute each CI failure on a PR as flaky, infra, or regression, surface code coverage and quality or security violations, and propose a targeted action |

### Triage flaky test

`/triage-flaky-test` investigates a specific flaky test. It pulls 30-day failure history, extracts the top error messages and stack traces, and checks how many pipelines the test has impacted. It proposes a targeted fix based on the flaky category and stack trace, or recommends quarantine when the root cause is unclear. It produces a structured triage brief with a recommendation to fix, quarantine, or escalate to the owning team.

If the skill recommends quarantine, it presents the proposed action and requires your explicit approval before writing. All state changes are reversible.

```
/triage-flaky-test TestCheckoutServiceIntegration
/triage-flaky-test TestCheckoutServiceIntegration github.com/my-org/my-service
```

### Unblock PR

`/unblock-pr` investigates a failing PR CI pipeline. For each failing job, it checks whether the failure was already present on the default branch or on other branches. The skill classifies the failure as **flaky**, **infra**, or **regression**. In parallel, it fetches the branch's code coverage and any code quality or security violations from PR insights. It produces a triage brief with per-job classification, evidence, a recommended action, and a PR Health section summarizing coverage and violations.

For flaky failures, the skill chains into `triage-flaky-test` for a deeper investigation. For transient infra failures on GitHub Actions, it retries failed jobs using `retry_datadog_ci_job` (MCP) or `gh run rerun` (pup fallback); for other CI providers, it provides a link to the provider's UI. For regressions, it prompts you to investigate your code changes.

**Note**: Code quality and security violation data in the PR Health section requires the MCP toolset and is not available in pup mode.

```
/unblock-pr
/unblock-pr feat/add-retry-logic
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /continuous_integration/
[4]: /tests/
[5]: /getting_started/site/
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/pup
[8]: /code_coverage/
[9]: /delivery_performance/dora_metrics/
