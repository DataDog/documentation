---
title: Agent Observability MCP and Skills
description: "Connect AI agents to your Agent Observability traces and experiments using the Datadog MCP Server."
further_reading:
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "/llm_observability/experiments"
  tag: "Documentation"
  text: "Set up and use Agent Observability Experiments"
- link: "/llm_observability/monitoring"
  tag: "Documentation"
  text: "Monitor your application with Agent Observability"
- link: "/llm_observability/guide/claude_code_skills"
  tag: "Guide"
  text: "Analyze LLM Applications with Claude Code Skills"
---

## Overview

The [Datadog MCP Server][1] enables AI agents to access your [Agent Observability][2] data through the Model Context Protocol (MCP). The `llmobs` toolset provides tools for searching and analyzing traces, inspecting span details and content, and evaluating experiment results directly from AI-powered clients like Cursor, Claude Code, or OpenAI Codex.

## Setup

Connect an MCP-compatible client to the Datadog MCP Server with the `llmobs` toolset enabled.

<div class="alert alert-info">For full setup instructions, including Cursor and VS Code extension configuration, see <a href="/mcp_server/setup/">Set up the Datadog MCP Server</a>.</div>

### Prerequisites

- A Datadog account with permission to access Agent Observability data.
- An MCP-compatible client (for example, Claude Code, Codex CLI, Cursor, Gemini CLI, or Kiro CLI).

### Endpoint

The MCP Server endpoint depends on your [Datadog site][5]. Use the {{< ui >}}Datadog Site{{< /ui >}} selector to display the endpoint for your site. Append `?toolsets=llmobs,core` to enable the Agent Observability and core toolsets.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint for your selected site ({{< region-param key="dd_site_name" >}}):
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Connect

Choose remote authentication when possible. Use local binary authentication if your environment blocks the remote OAuth flow.

{{< tabs >}}
{{% tab "Remote authentication" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Remote authentication uses the MCP specification's [Streamable HTTP][1] transport.

**Claude Code** (command line):

<pre><code>claude mcp add --transport http datadog-mcp "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"</code></pre>

**Codex CLI** (`~/.codex/config.toml`):

<pre><code>[mcp_servers.datadog]
url = "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"
</code></pre>

After adding the configuration, run `codex mcp login datadog` to complete the OAuth flow.

**Gemini CLI, Kiro CLI, and other MCP-compatible clients**:

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"
    }
  }
}
</code></pre>

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Local binary authentication" %}}

Local binary authentication uses the MCP specification's [stdio][2] transport. Use this method if remote authentication is unavailable.

1. Install the Datadog MCP Server binary:

    ```bash
    curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
    ```

    The binary installs to `~/.local/bin/datadog_mcp_cli`.

2. Complete the OAuth login flow:

    ```bash
    datadog_mcp_cli login
    ```

3. Configure your AI client. For Claude Code, add the following to `~/.claude.json`, replacing `<USERNAME>` in the command path:

    ```json
    {
      "mcpServers": {
        "datadog": {
          "type": "stdio",
          "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
          "args": [],
          "env": {}
        }
      }
    }
    ```

    Alternatively, add the server with the Claude Code CLI:

    ```bash
    claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
    ```

[2]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
{{% /tab %}}
{{< /tabs >}}

### Authenticate with API keys

The MCP Server uses OAuth 2.0 by default. If OAuth is unavailable, send a Datadog [API key and application key][6] as the `DD_API_KEY` and `DD_APPLICATION_KEY` HTTP headers:

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

For security, scope the API key and application key to a [service account][7] with only the required permissions.

## Agent skills

Agent skills are prebuilt instruction sets for AI coding agents that automate common Agent Observability workflows. The `agent-observability` skill set is available in the [Datadog agent-skills][8] repository. It provides six skills for classifying sessions, diagnosing failures, analyzing experiments, generating experiment code with the `ddtrace.llmobs` SDK, and bootstrapping evaluators against your live production data.

### Install

Install the `agent-observability` skills with the following command:

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

The skills require the `llmobs` MCP toolset to be connected. If you have not already connected it, run:

```shell
claude mcp add --scope user --transport http "datadog-llmo-mcp" \
  'https://mcp.datadoghq.com/v1/mcp?toolsets=llmobs'
```

Restart Claude Code after running both commands for the skills to appear.

### Available skills

| Skill | Invoke with | What it does |
|-------|-------------|-------------|
| Session classify | `/agent-observability-session-classify` | Classifies whether user intent was satisfied in a session, trace, or batch |
| Trace RCA | `/agent-observability-trace-rca` | Root cause analysis on failing production traces |
| Experiment analyzer | `/agent-observability-experiment-analyzer` | Analyze and compare LLM experiment results |
| Experiment Python codegen | `/agent-observability-experiment-py-bootstrap` | Generate Python experiment code using the `ddtrace.llmobs` SDK. Introspects your app to wire a real `task_fn`, auto-discovers `.env` credentials, and accepts a free-form `--purpose` that directs evaluator selection |
| Eval bootstrap | `/agent-observability-eval-bootstrap` | Generate evaluator code, publish online LLM-judge evaluators, or sample traces into a dataset for use in an experiment |
| Eval pipeline | `/agent-observability-eval-pipeline` | Six-phase guided pipeline from production traces through evaluators, datasets, experiments, and analysis. Stop early with `--stop-after`, resume mid-flow with `--start-at` |

#### Session classification

`/agent-observability-session-classify` classifies whether user intent was satisfied in a given interaction. It draws from up to three signal sources: Agent Observability traces, RUM behavioral data, and Audit Trail events. The skill returns a `yes / partial / no` verdict with supporting evidence. Confidence improves with each additional signal source.

```
/agent-observability-session-classify session_id=<SESSION_ID>
/agent-observability-session-classify trace_id=<TRACE_ID>
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

#### Trace root cause analysis

`/agent-observability-trace-rca` diagnoses why an LLM application is producing poor results. It selects an analysis mode based on the strongest available signal (LLM-judge eval verdicts, runtime errors, or structural anomalies) and compiles a structured RCA report. The report includes a failure taxonomy and concrete `BEFORE` / `AFTER` fix proposals grounded in trace evidence.

When Claude Code has access to your codebase, the skill can search for the relevant source files and propose diffs inline.

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

#### Evaluator bootstrap

`/agent-observability-eval-bootstrap` analyzes production traces and proposes a suite of evaluators targeting the observed failure modes. It outputs one of four artifacts: Python `BaseEvaluator` / `LLMJudge` classes for offline experiments, a framework-agnostic JSON spec, online LLM-judge evaluators published directly to Datadog, or — via `--emit-dataset <path>` — a `DatasetRecordRaw[]` JSON sampled from production traces and shaped for `LLMObs.create_dataset(records=...)`. The dataset-emit mode skips the evaluator workflow entirely; it produces a dataset suitable for use as the input to an experiment.

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json
```

#### Experiment analyzer

`/agent-observability-experiment-analyzer` retrieves experiment results and surfaces what changed between a candidate and a baseline: which metrics improved, which regressed, and where the candidate underperformed.

```
/agent-observability-experiment-analyzer experiment_id=<EXPERIMENT_ID>
/agent-observability-experiment-analyzer experiment_id=<CANDIDATE_ID> baseline_id=<BASELINE_ID>
```

#### Generate experiment code with the Python SDK

`/agent-observability-experiment-py-bootstrap` emits a self-contained `.py` script or Jupyter `.ipynb` notebook that uses the `ddtrace.llmobs` SDK and matches the canonical reference notebook style.

The dataset can be a local `DatasetRecordRaw[]` JSON (inlined into the file), a CSV (loaded at runtime via `LLMObs.create_dataset_from_csv`), an existing Datadog dataset by name (`LLMObs.pull_dataset`), or — by default — a small inline 3-record sample. Every generated experiment is tagged with `generated_by=claude-code` and the resolved `--purpose` in both `config` and `tags`.

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name <DATASET_NAME> --project-name <PROJECT_NAME>
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond
```

#### End-to-end eval pipeline

`/agent-observability-eval-pipeline` walks from production traces through evaluators, datasets, experiments, and analysis in six narrated phases, with a user checkpoint between each:

1. **Classify ml_app traces** — sample and classify recent traces from your `ml_app`
2. **Root cause analysis** — diagnose why failing traces are failing
3. **Bootstrap evaluators** — propose an evaluator suite targeting the observed failure modes
4. **Create + publish dataset** — extract input / expected_output pairs into a `DatasetRecordRaw[]` JSON and publish to Datadog under your project (created lazily)
5. **Generate + run experiment** — emit a runnable `.py` or `.ipynb` that pulls the dataset and wires your app's task function, then execute it end-to-end and capture `experiment.url`. An in-phase review beat (`run` / `edit` / `stop`) sits between codegen and execution so you can inspect the generated file before it runs
6. **Analyze experiment** — produce an analysis report with metric breakdowns and recommendations

Each phase has a canonical short name — the same value accepted by `--start-at` and `--stop-after`. The table below lists, per phase, which MCP tools the pipeline may invoke and a one-line description of the logic:

| # | Phase title | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">Stage name</span> | MCP tools called | Summary |
|---|-------------|----------------------------------------------------------------------------------------|------------------|---------|
| 1 | Classify ml_app traces | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `search_llmobs_spans` | Samples recent root spans for the `ml_app`, classifies each as success / partial / failure, surfaces common patterns. |
| 2 | Root cause analysis | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `search_llmobs_spans` | Pulls full traces for failing spans from Phase 1 and walks the trace tree to attribute each failure to a root span and a failure mode. |
| 3 | Bootstrap evaluators | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | None (local reasoning over the Phase 2 report); optional Datadog API call to publish online LLM-judge evaluators when `--publish` is set | Emits a Python evaluator suite (`sdk_code`), a framework-agnostic JSON spec (`data_only`), or publishes online evaluators (`publish`). |
| 4 | Create and publish dataset | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `search_llmobs_spans` for sampling; `LLMObs.create_dataset()` via the ddtrace SDK (not MCP) for publish | Samples root spans, extracts input / expected_output pairs, scrubs PII, writes a local JSON, then publishes to Datadog. |
| 5 | Generate and run experiment | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `list_llmobs_evals` (one-shot startup beacon — connectivity + telemetry); runtime uses the ddtrace SDK | Introspects your app for LLM call sites, emits a self-contained `.py` or `.ipynb` wiring `task_fn` to a real entry point, then runs it. |
| 6 | Analyze experiment | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `get_llmobs_experiment_summary`, `get_llmobs_experiment_metric_values`, `list_llmobs_experiment_events`, `get_llmobs_experiment_event`, `get_llmobs_experiment_dimension_values` | Pulls top-line metrics, per-record scores, segment dimensions, and drill-down events; synthesizes a structured analysis report. |

You can `stop` cleanly at any checkpoint and resume later with `--start-at <stage-name>` — no re-running required. Pass `--stop-after eval-bootstrap` to preserve the classic three-phase eval-only behavior.

```
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap          # classic 3-phase
/agent-observability-eval-pipeline my-chatbot --start-at experiment                # resume mid-flow
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>
```

For a complete guide to these skills and a recommended end-to-end workflow, see [Analyze LLM Applications with Claude Code Skills][9].

## Use cases

The Agent Observability MCP tools enable AI-assisted workflows for:

- **Debugging agent execution**: Search for traces by ML app, error status, or custom tags, then examine span hierarchies and content to identify failures.
- **Analyzing trace structure**: Visualize the full span tree of a trace to understand how agents, LLMs, tools, and retrievals interact.
- **Investigating agent loops**: Review an agent's step-by-step execution loop to understand decision-making and tool invocation patterns.
- **Evaluating experiments**: Get summary statistics for experiment metrics, compare results across dimension segments, and inspect individual events.
- **Discovering experiment patterns**: Filter and sort experiment events by metric performance to find the best and worst-performing cases.
- **Managing evaluators**: List, inspect, create, update, and delete evaluator configurations across an ML application or the entire organization.
- **Exploring Patterns**: List pattern configurations, check run status, and browse the discovered topic hierarchy to understand what users are asking and how traffic is distributed.
- **Managing datasets**: Look up projects and datasets, browse and inspect dataset records, and add new records to a dataset for use in experiments.

## Available tools

The `llmobs` toolset includes the following tools:

### Trace and span tools

`search_llmobs_spans`
: Search for spans matching filters or a raw query.

`get_llmobs_trace`
: Get the full structure of a trace as a span hierarchy tree, including span counts by kind, error indicators, and total duration.

`get_llmobs_span_details`
: Get detailed metadata for one or more spans, including timing, error info, LLM details (model, token counts), metrics, and evaluations.

`get_llmobs_span_content`
: Retrieve the actual content of a span field (input, output, messages, documents, or metadata) with optional JSONPath extraction.

`find_llmobs_error_spans`
: Find all error spans in a trace with propagation context, grouped by span kind with error messages and stack traces.

`expand_llmobs_spans`
: Load children of specific spans for progressive tree exploration when `get_llmobs_trace` returns collapsed nodes.

`get_llmobs_agent_loop`
: Get a chronological view of an agent's execution loop, showing each step (LLM calls, tool invocations, decisions) in order.

### Experiment tools

`get_llmobs_experiment_summary`
: Get a high-level experiment summary with pre-computed statistics for all evaluation metrics. Start here before using other experiment tools.

`list_llmobs_experiment_events`
: List experiment events with filtering by dimension or metric and sorting by metric value.

`get_llmobs_experiment_event`
: Get full details for a single experiment event, including input, output, expected output, all metrics, and dimensions.

`get_llmobs_experiment_metric_values`
: Get statistical analysis for a specific evaluation metric, optionally segmented by a dimension for comparison.

`get_llmobs_experiment_dimension_values`
: Get unique values for a dimension with counts, useful for discovering valid filter and segment values.

### Evaluator tools

`list_llmobs_evals`
: List every LLM-judge evaluator configured across all ML applications. Returns each evaluator's name, ml_app, and enabled status.

`list_llmobs_evals_by_ml_app`
: List all LLM-judge evaluators configured for a specific ML application.

`get_llmobs_evaluator`
: Retrieve an LLM-judge evaluator configuration by name, including its target (ml_app, sampling, filter), LLM provider, and judge prompt template.

`create_or_update_llmobs_evaluator`
: Create or update an LLM-judge evaluator configuration. Targets a specific ML application and optionally a filter or sampling percentage; the judge's model and prompt template define how it scores each span.

`delete_llmobs_evaluator`
: Delete an LLM-judge evaluator configuration by name.

### Project and dataset tools

`list_llmobs_projects`
: List all LLM Observability experiments projects for the org, sorted by creation date (newest first). Returns each project's `id`, `name`, and timestamps, plus pagination fields (`next_cursor`, `truncated`). Use this to discover project names and IDs when you don't already know them.

`get_llmobs_project`
: Look up an LLM Observability experiments project by ID or name. Use this to resolve a `project_id` UUID before calling dataset tools.

`list_llmobs_datasets`
: List datasets within a project, with optional ID or name filter. Returns dataset metadata and pagination fields. Use this before `get_llmobs_dataset_records` or `add_llmobs_dataset_records` — those tools require a dataset UUID.

`get_llmobs_dataset_records`
: Read dataset records with structured previews and a schema summary. Shapes arbitrary JSON fields (`input`, `expected_output`, `metadata`) into readable previews. Use `compute_schema=true` to get a type-aware sketch of record structure before constructing new records.

`get_llmobs_full_dataset_records`
: Fetch up to 3 specific records with full, untrimmed content. Use this to inspect individual records in detail after finding record IDs with `get_llmobs_dataset_records`.

`add_llmobs_dataset_records`
: Create records in a dataset using a two-step preview-then-confirm flow. Call with `confirmed=false` to preview the planned write, then `confirmed=true` to commit after user approval.

### Patterns tools

`list_llmobs_pattern_configs`
: List all Patterns configurations for the org. Returns each config's `id`, `name`, `evp_query`, sampling settings, and timestamps. Start here to find a `config_id`.

`get_llmobs_pattern_config`
: Get the most-recently-modified Patterns configuration for the org.

`get_llmobs_pattern_run_status`
: Get the status and per-activity progress of the most recent Patterns run for a config. Use this to check whether clustering is running, completed, or failed before reading topics.

`list_llmobs_pattern_runs`
: List all completed Patterns runs for a config, newest first. Returns each run's `id`, `status`, timestamps, and the `config_snapshot` used.

`get_llmobs_patterns`
: Get the topic hierarchy discovered by a Patterns run. Topics are organized into levels, each with a `name`, `description`, and `point_count`. Omit `run_id` to read the most recent completed run.

`get_llmobs_patterns_with_points`
: Get the topic hierarchy for a run with span IDs inlined on each leaf topic. Set `include_metrics=true` to also include per-span duration, cost, token counts, and evaluations.

`get_llmobs_pattern_points`
: Get a cursor-paginated page of clustering points (individual spans) assigned to a single topic. Each point includes the `span_id`, `session_id`, and a span input preview. Pass `next_page_token` back as `page_token` to continue paging.

## Recommended workflows

### Trace analysis

1. **Search**: Use `search_llmobs_spans` to find traces by ML app, status, span kind, or custom tags.
2. **Visualize**: Use `get_llmobs_trace` to see the full span hierarchy tree.
3. **Inspect**: Use `get_llmobs_span_details` to get metadata, timing, and evaluations for specific spans.
4. **Read content**: Use `get_llmobs_span_content` to retrieve the actual I/O, messages, or documents.
5. **Debug errors**: Use `find_llmobs_error_spans` to locate all errors in a trace with propagation context.
6. **Expand**: Use `expand_llmobs_spans` to load children of collapsed spans for deeper exploration.
7. **Agent review**: Use `get_llmobs_agent_loop` to see the step-by-step execution flow of an agent span.

### Experiment analysis

1. **Summarize**: Use `get_llmobs_experiment_summary` to get overall statistics and discover available metrics and dimensions.
2. **Browse events**: Use `list_llmobs_experiment_events` to find events of interest, filtering by dimension or sorting by metric.
3. **Inspect events**: Use `get_llmobs_experiment_event` to view full details for a specific event.
4. **Analyze metrics**: Use `get_llmobs_experiment_metric_values` to get percentile distributions, true/false rates, or compare across dimension segments.
5. **Discover dimensions**: Use `get_llmobs_experiment_dimension_values` to find valid filter and segment values.

### Dataset management

1. **Find your project**: Use `list_llmobs_projects` to browse projects — each result includes the `id` UUID you need for subsequent calls. If you already know the project name but not its UUID, use `get_llmobs_project` to resolve it directly.
2. **Find your dataset**: Use `list_llmobs_datasets` with the `project_id` to list datasets and get their UUIDs.
3. **Understand the data**: Use `get_llmobs_dataset_records` with `compute_schema=true` to browse records and get a type sketch of the fields before reading or writing.
4. **Read specific records**: Use `get_llmobs_full_dataset_records` to retrieve the complete content of up to 3 records by ID.
5. **Add records**: Use `add_llmobs_dataset_records` with `confirmed=false` to preview a write, then `confirmed=true` after user approval.

### Patterns analysis

1. **List configs**: Use `list_llmobs_pattern_configs` to find available Patterns configurations and their `config_id` values.
2. **Check run status**: Use `get_llmobs_pattern_run_status` to verify the most recent run is complete.
3. **Read topics**: Use `get_llmobs_patterns` to get the full topic hierarchy with names, descriptions, and coherence scores.
4. **Inspect spans**: Use `get_llmobs_patterns_with_points` to get topics with span IDs inlined, or `get_llmobs_pattern_points` to page through the spans of a specific topic.
5. **Analyze span content**: Use `get_llmobs_span_details` or `get_llmobs_span_content` with the `span_id` values from the previous step to inspect the actual inputs, outputs, and metadata of individual spans within a topic.
6. **Browse past runs**: Use `list_llmobs_pattern_runs` to see historical runs and pass a specific `run_id` to compare topic distributions over time.

## Example prompts

After connecting, try prompts like:

- Review error traces for my `customer-support-bot` app over the past week. Summarize the most common failure patterns, how often they occur, and recommend which ones to fix first.
- Find traces where my agent's responses were flagged by evaluations as low quality. Look at the inputs and outputs, then suggest specific changes to my system prompt to improve response quality.
- Look at recent agent traces for my app and find cases where the agent looped more than necessary. Analyze the decision-making at each step and suggest how to improve my tool descriptions to reduce unnecessary tool calls.
- A user reported a bad response. Here's the trace ID: `trace-123`. Walk me through exactly what happened: what the user asked, what the agent did at each step, and where things went wrong. Suggest a code fix.
- Analyze experiment `exp-456` and generate a markdown table of the worst-performing dimensions broken down by evaluation scores. Include any other relevant columns that help me understand where and why performance is degrading.
- Compare experiment `exp-123` (baseline) against experiment `exp-456`. Summarize what improved, what regressed, and by how much. Give me a recommendation on whether the changes are worth shipping.
- Summarize experiment `exp-456` and identify the top 5 lowest-scoring events. For each, show the input, output, and which evaluations failed.
- List the datasets in my `my-project` project and show me a sample of records from the dataset named `qa-golden-set`, including its schema.
- I have a CSV of new test cases. Add them to the `qa-golden-set` dataset in `my-project` as a new version. Show me a preview first.

## Combine with other Datadog tools

The `core` toolset included in the setup URL gives your AI agent access to additional Datadog tools that pair naturally with Agent Observability analysis.

### Export analysis to Datadog Notebooks

The `core` toolset includes `create_datadog_notebook` and `edit_datadog_notebook`, which let your AI agent create [Datadog Notebooks][3] directly from analysis results. You can export findings from agent chats into a collaborative, shareable notebook that lives in Datadog alongside your traces and experiments.

Try prompts like:

- Analyze experiment `exp-456`, identify the worst-performing dimensions, and export a summary report to a Datadog Notebook with a breakdown by evaluation scores.
- Review error traces for my `customer-support-bot` over the past week and create a Datadog Notebook with the findings, including common failure patterns and recommended fixes.

For custom visualizations that go beyond standard Datadog widgets, like comparison charts or quadrant plots, Notebooks also render [Mermaid diagrams][4] natively. Try prompts like:

- Analyze experiment `exp-456`, compare the `accuracy` scores across each prompt version, and export the results to a Datadog Notebook that includes a Mermaid bar chart of the average score for each version.
- Analyze experiment `exp-456` and export a Datadog Notebook that plots each prompt version on a Mermaid quadrant chart with `relevance` on one axis and `accuracy` on the other. Identify which versions are underperforming on both dimensions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/setup/
[2]: /llm_observability/
[3]: /notebooks/
[4]: /notebooks/guide/build_diagrams_with_mermaidjs/
[5]: /getting_started/site/
[6]: /account_management/api-app-keys/
[7]: /account_management/org_settings/service_accounts/
[8]: https://github.com/datadog-labs/agent-skills
[9]: /llm_observability/guide/claude_code_skills
