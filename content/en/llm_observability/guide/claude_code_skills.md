---
title: Analyze LLM Applications with Claude Code Skills
description: Use Datadog's Claude Code skills to classify sessions, diagnose failures, compare experiments, generate Python experiment code, and bootstrap evaluators against your live production data.
further_reading:
    - link: '/llm_observability/evaluations/'
      tag: 'Documentation'
      text: 'LLM Observability Evaluations'
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

Datadog provides a set of [Claude Code][1] skills that bring LLM Observability analysis directly into your development workflow. Rather than navigating dashboards manually, you can invoke these skills from a Claude Code session to classify sessions, diagnose failures, compare experiments, generate Python experiment code, and bootstrap evaluators — all against your live production data.

| Skill | What it does |
|-------|-------------|
| `/llm-obs-session-classify` | Classify whether user intent was satisfied in a session, trace, or batch of sessions from an ml_app |
| `/llm-obs-trace-rca` | Root cause analysis on failing production LLM traces |
| `/llm-obs-experiment-analyzer` | Analyze and compare LLM experiment results |
| `/llm-obs-experiment-py-bootstrap` | Generate Python experiment code using the `ddtrace.llmobs` SDK. Introspects your application to wire a real `task_fn` (no placeholder), auto-discovers credentials from `.env`, and accepts a free-form `--purpose` that directs evaluator selection |
| `/llm-obs-eval-bootstrap` | Generate evaluator code from traces, publish online LLM-judge evaluators, or sample traces into a dataset for use in an experiment |
| `/llm-obs-eval-pipeline` | Six-phase guided pipeline from production traces through evaluators, datasets, experiments, and analysis. Stop early with `--stop-after`, re-enter mid-flow with `--start-at`. |

The skills produce structured, actionable output — RCA reports with before/after fix proposals, generated evaluator code, experiment comparisons — that you can pass directly to a coding agent to apply fixes to your application. When Claude Code has access to your codebase, it can search for the relevant system prompt, tool definitions, or routing logic and propose specific diffs without leaving the session.

## Setup

### Prerequisites

- [Claude Code][1] installed and authenticated
- At least one LLM application [instrumented with LLM Observability][2] and producing traces
- A data backend: either the Datadog MCP server **or** the `pup` CLI

### Install the skills

The skills are published in the [agent-skills][6] repository. Clone the repository and copy the LLM Observability skills into your Claude Code skills directory:

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

To use the Datadog MCP server option, connect the LLM Observability MCP server to your Claude Code session:

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
| Trace | `trace_id` | Evaluating a single LLM Observability trace |
| App | `ml_app` | Sampling and classifying a batch of recent sessions or traces |

The skill pulls from up to three signal sources, and accuracy improves the more data it has access to:

- **LLM Observability traces** — the full span tree, conversation content, tool call results, and eval judge verdicts. Always available.
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

`/llm-obs-experiment-py-bootstrap` emits a self-contained `.py` script or Jupyter `.ipynb` notebook that uses the `ddtrace.llmobs` SDK and matches the canonical [reference notebooks][7].

The dataset can be a local `DatasetRecordRaw[]` JSON (inlined into the file), a CSV (loaded at runtime via `LLMObs.create_dataset_from_csv`), an existing Datadog dataset by name (`LLMObs.pull_dataset`), or — by default — a small inline 3-record sample.

**All flags below are optional.** Invoke `/llm-obs-experiment-py-bootstrap` with no arguments and the skill prompts for what it needs and emits a runnable file against the default 3-record sample.

| Option | Optional? | Default | Description |
|--------|-----------|---------|-------------|
| <span class="text-nowrap">`--purpose`</span> | Yes | prompted if not set or inferable | Free-form string describing what the experiment validates. Biases introspection ranking, wrapper return shape, and evaluator semantics |
| <span class="text-nowrap">`--format`</span> | Yes | `py` | `py` or `ipynb` |
| <span class="text-nowrap">`--dataset`</span> | Yes | inline 3-record sample | Local `DatasetRecordRaw[]` JSON or CSV. Mutually exclusive with `--dataset-name` |
| <span class="text-nowrap">`--dataset-name`</span> | Yes | none | Existing Datadog dataset to fetch at runtime via `LLMObs.pull_dataset`. Mutually exclusive with `--dataset` |
| <span class="text-nowrap">`--dataset-version`</span> | Yes | latest | Pin a specific version when using `--dataset-name` |
| <span class="text-nowrap">`--project-name`</span> | Yes | `experiment-<service-name>` inferred from codebase | Datadog project name shown in the Experiments UI |
| <span class="text-nowrap">`--evaluator-style`</span> | Yes | `function` | `function` / `class` / `remote`. Picks the surface; `--purpose` picks the semantics |
| <span class="text-nowrap">`--task-source`</span> | Yes | auto from introspection | Explicit `<module.path>:<function>` to wrap as `task_fn` |
| <span class="text-nowrap">`--placeholder-task`</span> | Yes | off | Skip introspection and emit a generic `# TODO(user)` placeholder |
| <span class="text-nowrap">`--app-root`</span> | Yes | inferred | Restricts introspection scan to this directory |
| <span class="text-nowrap">`--env-file`</span> | Yes | none | Explicit `.env` path. Baked into the generated file as `ENV_FILE_OVERRIDE` |
| <span class="text-nowrap">`--jobs`</span> | Yes | `10` | Concurrency passed to `experiment.run(jobs=N)` |
| <span class="text-nowrap">`--output`</span> | Yes | `./experiments/experiment.<ext>` | Output file path |

**Examples**

```
/llm-obs-experiment-py-bootstrap --purpose "validate output accuracy"
/llm-obs-experiment-py-bootstrap --purpose "test tool selection on ambiguous queries" --dataset ./data/qa.json
/llm-obs-experiment-py-bootstrap --dataset-name qa_v3 --project-name customer-qa
/llm-obs-experiment-py-bootstrap --task-source mymodule.handlers:respond --evaluator-style remote
/llm-obs-experiment-py-bootstrap --placeholder-task --format ipynb
```

### Bootstrap evaluators from trace data

`/llm-obs-eval-bootstrap` analyzes production traces from an ml_app (or an RCA report already in context) and proposes a suite of evaluators that would catch the observed failure modes. It outputs one of four artifacts:

| Mode | Flag | Output |
|------|------|--------|
| SDK code (default) | — | Python `BaseEvaluator` / `LLMJudge` classes ready to drop into an [LLM Experiment][3] |
| JSON spec | `--data-only` | Framework-agnostic evaluator spec, suitable for review or manual implementation |
| Online judges | `--publish` | LLM-judge evaluators published directly to Datadog and enabled on your ml_app |
| Dataset emission | `--emit-dataset <path>` | A `DatasetRecordRaw[]` JSON file sampled from production traces, shaped for `LLMObs.create_dataset(records=...)`. Skips the evaluator workflow entirely — this mode produces a dataset, not evaluators |

The first three modes share the same evaluator-proposal workflow and differ only in how the suite is materialized. The fourth mode (`--emit-dataset`) is independent — it samples root spans for the `ml_app` (filtered to `@status:ok`), extracts `input_data` and `expected_output` per record, runs a PII scrub on string values, and writes a JSON file you can publish to Datadog as a dataset and then run an experiment against. Per-record `tags` are auto-normalized (bare strings wrapped as `tag:<value>`) so `Dataset.append()` does not reject the record. The `expected_output` field is documented as the **production behavior baseline**, not ground truth — useful for regression-style experiments (does my refactor change observed outputs?) before being promoted to a labelled gold set.

**Examples**

```
/llm-obs-eval-bootstrap ml_app=my-chatbot
/llm-obs-eval-bootstrap ml_app=my-chatbot --publish
/llm-obs-eval-bootstrap ml_app=my-chatbot --data-only
/llm-obs-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json --trace-limit 25
```

### Run the end-to-end pipeline

`/llm-obs-eval-pipeline` chains the dd-llmo sub-skills into a single supervised, narrated workflow that walks from production traces through evaluators, datasets, experiments, and analysis. Every phase has the same envelope — a banner that names the entity being produced, a pedagogy block explaining its purpose, the action (a sub-skill call or a small executable step), and a checkpoint that waits for your confirmation. It is the recommended starting point when you have no existing evaluators or experiments and want a deterministic walkthrough.

```
Phase 1: Classify ml_app traces      → llm-obs-session-classify (ml_app mode)
Phase 2: Root cause analysis         → llm-obs-trace-rca
Phase 3: Bootstrap evaluators        → llm-obs-eval-bootstrap
Phase 4: Create + publish dataset    → llm-obs-eval-bootstrap --emit-dataset + LLMObs.create_dataset(records=...)
Phase 5: Generate + run experiment   → llm-obs-experiment-py-bootstrap + python <generated_file>
                                       (with an in-phase review beat between codegen and run)
Phase 6: Analyze experiment          → llm-obs-experiment-analyzer
```

Each phase has a canonical short name — the same value accepted by `--start-at` and `--stop-after`. Use these names whenever you need to refer to a single phase unambiguously (e.g. in scripts, in chat with teammates, or in support tickets):

| # | Phase title | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">Stage name</span> | Sub-skill invoked | Summary | Output artifact |
|---|-------------|----------------------------------------------------------------------------------------|-------------------|---------|-----------------|
| 1 | Classify ml_app traces | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `/llm-obs-session-classify` (ml_app mode) | MCP `search_llmobs_spans` samples recent root spans for the `ml_app`. Each span is classified as success / partial / failure and grouped into common patterns. | Classification summary + per-unit blocks |
| 2 | Root cause analysis | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `/llm-obs-trace-rca` | MCP `search_llmobs_spans` pulls full traces for the failing spans identified in Phase 1. The trace tree is walked to attribute each failure to a root span and a failure mode. | RCA report with failure-mode taxonomy and root causes |
| 3 | Bootstrap evaluators | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | `/llm-obs-eval-bootstrap` | Local reasoning over the Phase 2 RCA — no MCP calls. Emits Python evaluator code (`sdk_code`), a framework-agnostic JSON spec (`data_only`), or publishes online LLM-judge evaluators directly to Datadog via the public API (`publish`). | Evaluator suite (`sdk_code` / `data_only` / `publish` mode) |
| 4 | Create and publish dataset | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `/llm-obs-eval-bootstrap --emit-dataset` + `LLMObs.create_dataset(records=...)` | MCP `search_llmobs_spans` samples root spans, extracts `(input_data, expected_output)` pairs, scrubs PII, and writes a local JSON file. The publish sub-step then calls `LLMObs.create_dataset()` via the ddtrace SDK (not MCP) to push the dataset to Datadog. | Local `DatasetRecordRaw[]` JSON + published Datadog dataset (name, version, URL) |
| 5 | Generate and run experiment | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `/llm-obs-experiment-py-bootstrap` + `python <generated_file>` (with a `run` / `edit` / `stop` review beat between codegen and execution) | Mostly local: the skill introspects your app for LLM call sites (OpenAI / Anthropic / LangChain / LiteLLM / LlamaIndex / Bedrock / Gemini decorators) and emits a self-contained Python file wiring `task_fn` to a real entry point. One MCP `list_llmobs_evals` call fires at startup as a connectivity + telemetry beacon. The generated file uses the ddtrace SDK at runtime; no MCP calls during the run itself. | Generated `.py` or `.ipynb` + experiment run with `experiment.url` |
| 6 | Analyze experiment | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `/llm-obs-experiment-analyzer` | Heavy MCP user: `get_llmobs_experiment_summary` for top-line metrics, `get_llmobs_experiment_metric_values` for per-record scores, `list_llmobs_experiment_events` + `get_llmobs_experiment_event` to drill into individual rows, and `get_llmobs_experiment_dimension_values` for segment breakdowns. Synthesizes findings into a structured report. | Analysis report with metric breakdowns, segment performance, and recommended next experiments |

Phases 4 and 5 are the only two that execute code on your machine; the rest are read-only or write generated files to `--output-dir`. The classic three-phase eval-pipeline behavior (classify → RCA → bootstrap evaluators only) is preserved by passing `--stop-after eval-bootstrap`. Phase 5 pauses between codegen and execution so you can review the generated experiment file before any provider tokens are spent — type `run` to execute, `edit` to pause and adjust, or `stop` to exit cleanly.

**Enter and exit at any phase.** The pipeline persists each phase's primary output (classification summary, RCA report, evaluator suite, dataset, published dataset name, experiment file, experiment run, analyzer report) to `<output-dir>/state/0N-<name>.{md,json}` before each checkpoint renders. This means:

- **`stop`** at any checkpoint (or `--stop-after <phase>` from the top) ends the run cleanly, leaving a re-enterable artifact on disk.
- **`--start-at <phase>`** loads every prior phase's state file (or accepts an override flag if you supplied one) and skips directly to the named phase. You can resume hours or days later, or jump straight to "just re-analyze this experiment" without re-running anything earlier.

Checkpoint vocabulary at every phase: `continue` advances, `stop` exits cleanly, `redo` re-runs the current phase (with optional adjustment notes appended), `back` steps backward one phase. Any other input is treated as adjustment.

**Only `<ml_app>` is required.** Every flag below is optional — the skill picks sensible defaults for each one. The minimal invocation is `/llm-obs-eval-pipeline <ml_app>`; the rest of the table is for when you want to override a default, resume mid-flow, or pin a specific output location.

| Option | Optional? | Default | Description |
|--------|-----------|---------|-------------|
| `<ml_app>` | **No** | — (required) | The instrumented LLM application to onboard / evaluate against |
| `--project-name` | Yes | derived from `pyproject.toml` / `setup.cfg` / `setup.py` / `package.json` / cwd | The Datadog project the pipeline writes datasets and experiments into. Surfaced in the Precheck and created lazily by `LLMObs.enable(project_name=...)` in Phase 4 |
| `--timeframe` | Yes | `now-7d` | Lookback window for Phase 1 classification and Phase 4 dataset sampling |
| `--trace-limit` | Yes | `20` | Sampling cap for Phase 4. Phase 1 internally uses `min(20, --trace-limit)` for the classification sample |
| `--format` | Yes | `py` | Passed to `llm-obs-experiment-py-bootstrap` in Phase 5: `py` (script) or `ipynb` (Jupyter notebook) |
| `--evaluator-style` | Yes | `function` | Passed to Phase 3 and Phase 5: `function`, `class`, or `remote` |
| `--data-only` | Yes | off | Phase 3 pass-through: emit a framework-agnostic JSON evaluator spec instead of Python SDK code |
| `--publish` | Yes | off | Phase 3 pass-through: publish online LLM-judge evaluators to Datadog |
| `--stop-after` | Yes | `analyze` (run everything) | Stop after the named phase completes. Accepts: `classify`, `rca`, `eval-bootstrap` *(matches the classic 3-phase behavior)*, `dataset`, `experiment`, `analyze` |
| `--start-at` | Yes | `classify` (start at the top) | Skip earlier phases and begin at the named phase. Same vocabulary as `--stop-after`. Auto-loads prior phase artifacts from `<output-dir>/state/` |
| `--classification-summary` | Yes | auto-loaded from `state/01-classification.md` | Override the Phase 1 output that Phase 2 consumes (used with `--start-at rca` or later) |
| `--rca-report` | Yes | auto-loaded from `state/02-rca-report.md` | Override the Phase 2 output that Phase 3 consumes |
| `--dataset-file` | Yes | auto-loaded from `state/04-published-dataset.json`'s `dataset_file` field | The local `DatasetRecordRaw[]` JSON. Used by Phase 4's publish sub-step when re-publishing without re-sampling |
| `--dataset-name` | Yes | auto-loaded from `state/04-published-dataset.json` | Name of the published Datadog dataset that Phase 5 wires the experiment to |
| `--experiment-file` | Yes | auto-loaded from `state/05-experiment-run.json` | The generated experiment file. When present, Phase 5 skips codegen and goes straight to the review beat → run |
| `--experiment-id` / `--experiment-url` | Yes | auto-loaded from `state/05-experiment-run.json` | The Datadog experiment Phase 6 analyzes (mutually exclusive) |
| `--app-root` | Yes | resolved from cwd / `pyproject.toml` etc. | Restricts Phase 5's task-function introspection to this directory tree |
| `--env-file` | Yes | none (auto-discovery walks standard locations) | Explicit `.env` path for credential loading; surfaced in the Precheck |
| `--output-dir` | Yes | `./experiments` | Where the dataset JSON, publish script, generated experiment file, and `state/` directory are written |

**Examples**

```
# Full six-phase walkthrough for a brand new ml_app
/llm-obs-eval-pipeline my-chatbot --project-name my-chatbot

# Classic three-phase eval-pipeline behavior — preserves backward compatibility
/llm-obs-eval-pipeline my-chatbot --stop-after eval-bootstrap

# Resume from where a previous run stopped
/llm-obs-eval-pipeline my-chatbot --start-at experiment

# Re-analyze a previous experiment run without re-running it
/llm-obs-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>

# Run a single phase in isolation
/llm-obs-eval-pipeline my-chatbot --start-at dataset --stop-after dataset
```

## Typical workflow

If you are new to evaluating an LLM application, the recommended flow is:

1. **Run the pipeline** to walk from production traces all the way through evaluators, a seed dataset, an experiment, and analysis:
   ```
   /llm-obs-eval-pipeline <ml_app> --project-name <project>
   ```
   To stop at the classic evaluator-only output (no dataset or experiment), pass `--stop-after eval-bootstrap`. To resume a previous run, pass `--start-at <phase>` — the pipeline reloads prior state from `<output-dir>/state/` and continues from there.

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
