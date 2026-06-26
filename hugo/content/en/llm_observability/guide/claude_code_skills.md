---
title: Analyze LLM Applications with Claude Code Skills
description: Use Datadog's Claude Code skills to classify sessions, diagnose failures, compare experiments, generate Python experiment code, and bootstrap evaluators against your live production data.
further_reading:
    - link: '/llm_observability/evaluations/'
      tag: 'Documentation'
      text: 'Agent Observability Evaluations'
    - link: '/llm_observability/experiments/'
      tag: 'Documentation'
      text: 'LLM Experiments'
    - link: '/llm_observability/guide/evaluation_developer_guide'
      tag: 'Guide'
      text: 'Evaluation Developer Guide: Build custom evaluators'
    - link: 'https://github.com/datadog-labs/agent-skills'
      tag: 'GitHub'
      text: 'datadog-labs/agent-skills'
---

## Overview

Datadog provides a set of [Claude Code][1] skills that bring Agent Observability analysis directly into your development workflow. Rather than navigating dashboards manually, you can invoke these skills from a Claude Code session to classify sessions, diagnose failures, compare experiments, generate Python experiment code, and bootstrap evaluators — all against your live production data.

| Skill | What it does |
|-------|-------------|
| `/llm-obs-session-classify` | Classify whether user intent was satisfied in a session, trace, or batch of sessions from an ml_app |
| `/llm-obs-trace-rca` | Root cause analysis on failing production LLM traces |
| `/llm-obs-experiment-analyzer` | Analyze and compare LLM experiment results |
| `/llm-obs-experiment-py-bootstrap` | Generate Python experiment code using the `ddtrace.llmobs` SDK from a labeled dataset or sample fixtures |
| `/llm-obs-eval-bootstrap` | Generate evaluator code or publish online LLM-judge evaluators from trace data |
| `/llm-obs-eval-pipeline` | End-to-end pipeline: classify sessions → root cause analysis → bootstrap evaluators |

The skills produce structured, actionable output — RCA reports with before/after fix proposals, generated evaluator code, experiment comparisons — that you can pass directly to a coding agent to apply fixes to your application. When Claude Code has access to your codebase, it can search for the relevant system prompt, tool definitions, or routing logic and propose specific diffs without leaving the session.

## Setup

### Prerequisites

- [Claude Code][1] installed and authenticated
- At least one LLM application [instrumented with Agent Observability][2] and producing traces
- A data backend: either the Datadog MCP server **or** the `pup` CLI

### Install the skills

The skills are published in the [agent-skills][6] repository. Clone the repository and copy the Agent Observability skills into your Claude Code skills directory:

```shell
git clone https://github.com/datadog-labs/agent-skills
cp -r agent-skills/dd-llmo/llm-obs-experiment-analyzer ~/.claude/skills
cp -r agent-skills/dd-llmo/llm-obs-eval-pipeline ~/.claude/skills
cp -r agent-skills/dd-llmo/llm-obs-eval-bootstrap ~/.claude/skills
cp -r agent-skills/dd-llmo/llm-obs-session-classify ~/.claude/skills
cp -r agent-skills/dd-llmo/llm-obs-trace-rca ~/.claude/skills
```

The skills are available in any Claude Code session after copying.

### Datadog MCP server

To use the Datadog MCP server option, connect the Agent Observability MCP server to your Claude Code session:

```shell
claude mcp add --scope user --transport http datadog-llmo-mcp \
  'https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=llmobs'
```

All skills detect the MCP server automatically at startup and use it throughout.

### Option B: pup CLI

If you prefer not to use the MCP server, the skills also run over [`pup`][5], Datadog's internal CLI. Install `pup` and authenticate:

```shell
pup auth login
```

Each skill detects at startup whether the MCP server is available; if not, it checks for `pup` and switches to pup mode automatically. You can also force pup mode explicitly by passing `--backend pup` to any skill invocation.

In pup mode, all Datadog API calls are made through `pup llm-obs` subcommands instead of MCP tools. The output and workflow are identical.

## Skills

### Classify sessions and traces

`/llm-obs-session-classify` assesses whether a user's intent was satisfied in a given interaction. It operates in three modes depending on what you provide:

| Mode | Invoke with | Use when |
|------|-------------|----------|
| Session | `session_id` | Evaluating a specific session |
| Trace | `trace_id` | Evaluating a single Agent Observability trace |
| App | `ml_app` | Sampling and classifying a batch of recent sessions or traces |

The skill pulls from up to three signal sources, and accuracy improves the more data it has access to:

- **Agent Observability traces** — the full span tree, conversation content, tool call results, and eval judge verdicts. Always available.
- **RUM behavioral signals** — page views, custom actions, dwell time, and explicit feedback events that confirm or contradict what the trace shows. Available when RUM is instrumented for your app.
- **Audit Trail** — server-confirmed write events (dashboards created, monitors modified, notebooks deleted) that prove whether the assistant's actions actually landed. Most authoritative signal when the session involved asset creation or editing.

The skill returns a compact `yes / partial / no` verdict with a one-sentence reason by default. Add `verbose: true` for a full markdown report.

**Examples:**

```
/llm-obs-session-classify session_id=abc-123
/llm-obs-session-classify trace_id=def-456
/llm-obs-session-classify ml_app=my-chatbot --timeframe now-7d
```

### Diagnose failures with root cause analysis

`/llm-obs-trace-rca` walks the span tree of failing traces to identify why your LLM application is producing poor results. It selects the best analysis mode based on available signals: LLM-judge eval verdicts (strongest signal), runtime errors, or structural anomalies such as latency outliers and agent-loop decisions.

The skill samples failing spans, groups them into a failure taxonomy, and compiles a structured RCA report with root cause categories, supporting evidence, and concrete fix proposals. Each fix includes the actual text or code from the trace — system prompt excerpts, tool argument shapes, routing logic — with a `BEFORE` / `AFTER` showing exactly what to change.

When Claude Code has access to your codebase, the skill searches for the relevant source files and proposes diffs you can apply immediately. For system prompt deficiencies, tool misuse, or routing errors, this means going from diagnosis to a pull request without leaving the session.

**Examples:**

```
/llm-obs-trace-rca ml_app=my-chatbot
/llm-obs-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

### Analyze and compare experiments

`/llm-obs-experiment-analyzer` retrieves experiment results and surfaces what changed between a candidate and a baseline. It works for a single experiment (exploratory analysis) or a pair (comparative analysis).

The skill highlights which metrics improved or regressed, which event categories shifted, and where the candidate underperformed — so you can make a confident promotion decision.

**Examples**

```
/llm-obs-experiment-analyzer experiment_id=exp-123
/llm-obs-experiment-analyzer experiment_id=exp-456 baseline_id=exp-123
```

### Generate experiment code with the Python SDK

`/llm-obs-experiment-py-bootstrap` generates a self-contained Python experiment client that uses the `ddtrace.llmobs` SDK. The generated file is either a `.py` script or a Jupyter `.ipynb` notebook matching the canonical [reference notebooks][7], with all eight sections present (env setup, `LLMObs.enable`, dataset, task placeholder, evaluators, experiment, run, results inspection) and a `# TODO(user)` marker on the task and evaluators so the placeholder cannot ship by accident.

The dataset source can be: a local `DatasetRecordRaw[]` JSON file (inlined into the generated code), a CSV (loaded at runtime with `LLMObs.create_dataset_from_csv`), an existing Datadog dataset by name (fetched at runtime with `LLMObs.pull_dataset`), or — by default — a small inline sample so the file is runnable as-is. Every generated experiment is tagged with `generated_by=claude-code` in both the experiment `config` and `tags` so you can identify and filter Claude-generated experiments in the LLM Experiments list.

| Option | Default | Description |
|--------|---------|-------------|
| `--format` | `py` | `py` (single `.py` file) or `ipynb` (Jupyter notebook with one cell per section) |
| `--dataset` | none (inline 3-record sample) | Path to a local `DatasetRecordRaw[]` JSON or CSV file. Mutually exclusive with `--dataset-name` |
| `--dataset-name` | none | Name of an existing Datadog dataset to fetch at runtime with `LLMObs.pull_dataset`. Mutually exclusive with `--dataset` |
| `--dataset-version` | latest | Pin to a specific dataset version when using `--dataset-name` |
| `--project-name` | `experiment-<service-name>` (inferred from the codebase) | Datadog project name visible in the LLM Experiments UI |
| `--evaluator-style` | `function` | `function` (plain functions), `class` (`BaseEvaluator` subclasses), or `remote` (`RemoteEvaluator` instances) |
| `--jobs` | `10` | Concurrency passed to `experiment.run(jobs=N)` |
| `--output` | `./experiments/experiment.<ext>` | Output file path; extension derives from `--format` |

**Examples**

```
/llm-obs-experiment-py-bootstrap
/llm-obs-experiment-py-bootstrap --dataset ./data/qa.json --format ipynb
/llm-obs-experiment-py-bootstrap --dataset-name qa_v3 --project-name customer-qa
/llm-obs-experiment-py-bootstrap --evaluator-style remote --jobs 5
```

### Bootstrap evaluators from trace data

`/llm-obs-eval-bootstrap` analyzes production traces from an ml_app (or an RCA report already in context) and proposes a suite of evaluators that would catch the observed failure modes. It outputs one of three artifacts:

| Mode | Flag | Output |
|------|------|--------|
| SDK code (default) | — | Python `BaseEvaluator` / `LLMJudge` classes ready to drop into an [LLM Experiment][3] |
| JSON spec | `--data-only` | Framework-agnostic evaluator spec, suitable for review or manual implementation |
| Online judges | `--publish` | LLM-judge evaluators published directly to Datadog and enabled on your ml_app |

The generated Python file is self-contained and ready to hand to a coding agent for integration into your experiment harness or CI pipeline.

**Examples**

```
/llm-obs-eval-bootstrap ml_app=my-chatbot
/llm-obs-eval-bootstrap ml_app=my-chatbot --publish
/llm-obs-eval-bootstrap ml_app=my-chatbot --data-only
```

### Run the end-to-end pipeline

`/llm-obs-eval-pipeline` chains the three skills above into a single supervised workflow. It is the recommended starting point when you have no existing evaluators and want to go from raw production traces to a working evaluator suite.

```
Phase 1: llm-obs-session-classify  →  classify a sample of recent traces
Phase 2: llm-obs-trace-rca         →  root cause the failures
Phase 3: llm-obs-eval-bootstrap    →  generate evaluators for each root cause
```

The pipeline pauses for your review and approval between each phase. You can exclude specific traces, adjust the failure taxonomy, or redirect the evaluator proposal before moving on.

**Examples**

```
/llm-obs-eval-pipeline my-chatbot
/llm-obs-eval-pipeline my-chatbot --timeframe now-30d --publish
```

| Option | Default | Description |
|--------|---------|-------------|
| `--timeframe` | `now-7d` | Lookback window for trace sampling |
| `--trace-limit` | `20` | Max traces to classify in Phase 1 |
| `--data-only` | off | Emit a JSON evaluator spec instead of Python code |
| `--publish` | off | Publish online LLM-judge evaluators to Datadog |

## Typical workflow

If you are new to evaluating an LLM application, the recommended flow is:

1. **Run the pipeline** to get an initial read on where your app is failing and generate a first evaluator suite:
   ```
   /llm-obs-eval-pipeline <ml_app>
   ```

2. **Apply fixes.** The RCA report produced in Phase 2 includes specific before/after fix proposals grounded in trace evidence. Pass the report to a coding agent (or act on it directly) to fix system prompts, tool definitions, or routing logic in your codebase.

3. **Run an offline experiment** using the generated evaluators against a labeled dataset to validate their quality before enabling them in production. See the [Evaluation Developer Guide][4].

4. **Publish online evaluators** once the evaluators are validated. Running `/llm-obs-eval-bootstrap` with `--publish` creates online LLM-judge evaluators in Datadog that run automatically on your production traces in real time — no code changes required:
   ```
   /llm-obs-eval-bootstrap <ml_app> --publish
   ```

5. **Monitor and iterate.** As your app evolves, re-run `/llm-obs-trace-rca` and `/llm-obs-eval-bootstrap` to catch new failure modes and keep your evaluator suite current.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://claude.ai/code
[2]: /llm_observability/setup/
[3]: /llm_observability/experiments/
[4]: /llm_observability/guide/evaluation_developer_guide
[5]: https://datadoghq.atlassian.net/wiki/spaces/BITSAI/pages/5226692942/pup+CLI
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
