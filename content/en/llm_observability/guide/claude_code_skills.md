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
| `/llm-obs-eval-bootstrap` | Generate evaluator code or publish online LLM-judge evaluators from trace data |
| `/llm-obs-eval-pipeline` | Eight-phase guided pipeline from production traces through evaluators, datasets, experiments, and analysis. Stop early with `--stop-after`, re-enter mid-flow with `--start-at`. |

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

`/llm-obs-experiment-py-bootstrap` generates a self-contained Python experiment client that uses the `ddtrace.llmobs` SDK. The generated file is either a `.py` script or a Jupyter `.ipynb` notebook matching the canonical [reference notebooks][7], with sections for env setup, `LLMObs.enable`, dataset wiring, the task function, evaluators, the experiment definition, run, and results inspection.

Three behaviors keep the generated file runnable out of the box without the manual cleanup that an unsupervised codegen would require:

**Application introspection — real `task_fn`, not a placeholder.** Instead of emitting a `# TODO(user): replace with your actual LLM call` placeholder, the skill scans the project for LLM call sites (OpenAI / Anthropic / LiteLLM / LangChain / LlamaIndex / Vertex AI / Bedrock plus any function already decorated with `@LLMObs.*` / `@workflow` / `@agent`), ranks them, and emits a wrapper that imports and calls the most likely entry point with a signature adapter from the SDK's `(input_data, config)` shape to whatever args your function actually takes. Async, class methods, and `**kwargs` shapes are handled automatically. Pass `--task-source <module:function>` to skip the scan, or `--placeholder-task` to opt out of introspection entirely.

**Credential auto-discovery — no manual `export` required.** The generated file ships an inline `_load_env_files` helper (no `python-dotenv` dependency) that walks `--env-file` overrides, the output directory, the project root, parent directories, and `~/.datadog/credentials` to find Datadog and provider credentials. Shell environment variables always win over file-loaded values, so `export DD_API_KEY=...` before re-running cleanly overrides whatever the file would have loaded. Provider-key assertions in the generated file are conditional on what introspection actually wired: `OPENAI_API_KEY` is only asserted if the task imports OpenAI; `ANTHROPIC_API_KEY` only for Anthropic; and so on.

**`--purpose <free text>` directs evaluator selection.** Before introspection runs, the skill captures a one-sentence statement of what the experiment is meant to validate (passed via the flag, inferred from the invocation message, or prompted via `AskUserQuestion` with five seed options plus Other). The resulting string is *not* a fixed taxonomy — Claude reads whatever you typed and reasons per-invocation about what to do with it: bias the introspection ranking toward agent / retrieval / structured-output entry points if applicable, pick a richer `task_fn` return shape (`{output, tool_calls}`, `{answer, retrieved_docs}`) when the function exposes it, and seed evaluator *semantics* (the `--evaluator-style` flag still picks the *surface*). Common patterns: a tool-call purpose adds a `tool_calls_correct` LLMJudge rubric; a structured-output purpose leans on `JSONEvaluator`; a regression-test purpose drops the LLMJudge in favor of `exact_match` + a near-match check. The resolved purpose is embedded in the file's docstring header and in the experiment's `config`, `tags`, and `description` so it surfaces in the Datadog Experiments UI list view. Every generated experiment is also tagged with `generated_by=claude-code` in both `config` and `tags` so you can identify and filter Claude-generated experiments.

The dataset source can be: a local `DatasetRecordRaw[]` JSON file (inlined into the generated code), a CSV (loaded at runtime with `LLMObs.create_dataset_from_csv`), an existing Datadog dataset by name (fetched at runtime with `LLMObs.pull_dataset`), or — by default — a small inline sample so the file is runnable as-is.

| Option | Default | Description |
|--------|---------|-------------|
| `--purpose` | auto — prompted via `AskUserQuestion` if not set or inferable from the invocation message | Free-form string describing what the experiment is meant to validate (e.g. `"test that the agent picks the right tool for ambiguous user requests"`, `"verify SQL output always parses"`, `"regression-test prompt v3 against prod baseline"`). Biases introspection ranking, wrapper return shape, and evaluator semantics |
| `--format` | `py` | `py` (single `.py` file) or `ipynb` (Jupyter notebook with one cell per section) |
| `--dataset` | none (inline 3-record sample) | Path to a local `DatasetRecordRaw[]` JSON or CSV file. Mutually exclusive with `--dataset-name` |
| `--dataset-name` | none | Name of an existing Datadog dataset to fetch at runtime with `LLMObs.pull_dataset`. Mutually exclusive with `--dataset` |
| `--dataset-version` | latest | Pin to a specific dataset version when using `--dataset-name` |
| `--project-name` | `experiment-<service-name>` (inferred from the codebase) | Datadog project name visible in the LLM Experiments UI |
| `--evaluator-style` | `function` | `function` (plain functions), `class` (`BaseEvaluator` subclasses), or `remote` (`RemoteEvaluator` instances). Picks the *surface*; `--purpose` picks the *semantics* |
| `--task-source` | auto — discovered by introspection | Explicit `<dotted.module.path>:<function_name>` to wrap as `task_fn`. Skips the introspection scan |
| `--placeholder-task` | off | Opt out of introspection and emit a generic placeholder task with a `# TODO(user)` marker |
| `--app-root` | resolved from `pyproject.toml` / `setup.cfg` / `setup.py` / cwd | Restricts the introspection scan to this directory tree |
| `--env-file` | none (auto-discovery walks standard locations) | Explicit absolute path to a `.env` file. Baked into the generated file as `ENV_FILE_OVERRIDE` and always tried first at runtime |
| `--jobs` | `10` | Concurrency passed to `experiment.run(jobs=N)` |
| `--output` | `./experiments/experiment.<ext>` | Output file path; extension derives from `--format` |

**Examples**

```
/llm-obs-experiment-py-bootstrap --purpose "validate output accuracy"
/llm-obs-experiment-py-bootstrap --purpose "test tool selection on ambiguous queries" --dataset ./data/qa.json
/llm-obs-experiment-py-bootstrap --dataset-name qa_v3 --project-name customer-qa
/llm-obs-experiment-py-bootstrap --task-source mymodule.handlers:respond --evaluator-style remote
/llm-obs-experiment-py-bootstrap --placeholder-task --format ipynb
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

`/llm-obs-eval-pipeline` chains the dd-llmo sub-skills into a single supervised, narrated workflow that walks from production traces through evaluators, datasets, experiments, and analysis. Every phase has the same envelope — a banner that names the entity being produced, a pedagogy block explaining its purpose, the action (a sub-skill call or a small executable step), and a checkpoint that waits for your confirmation. It is the recommended starting point when you have no existing evaluators or experiments and want a deterministic walkthrough.

```
Phase 1: Classify ml_app traces      → llm-obs-session-classify (ml_app mode)
Phase 2: Root cause analysis         → llm-obs-trace-rca
Phase 3: Bootstrap evaluators        → llm-obs-eval-bootstrap
Phase 4: Create dataset from traces  → llm-obs-eval-bootstrap --emit-dataset
Phase 5: Publish dataset             → LLMObs.create_dataset(records=...) (creates the project lazily)
Phase 6: Generate experiment code    → llm-obs-experiment-py-bootstrap
Phase 7: Run experiment              → python <generated_file>
Phase 8: Analyze experiment          → llm-obs-experiment-analyzer
```

Phases 5 and 7 are the only two that execute code on your machine; the rest are read-only or write generated files to `--output-dir`. The classic three-phase eval-pipeline behavior (classify → RCA → bootstrap evaluators only) is preserved by passing `--stop-after eval-bootstrap`.

**Enter and exit at any phase.** The pipeline persists each phase's primary output (classification summary, RCA report, evaluator suite, dataset, published dataset name, experiment file, experiment run, analyzer report) to `<output-dir>/state/0N-<name>.{md,json}` before each checkpoint renders. This means:

- **`stop`** at any checkpoint (or `--stop-after <phase>` from the top) ends the run cleanly, leaving a re-enterable artifact on disk.
- **`--start-at <phase>`** loads every prior phase's state file (or accepts an override flag if you supplied one) and skips directly to the named phase. You can resume hours or days later, or jump straight to "just re-analyze this experiment" without re-running anything earlier.

Checkpoint vocabulary at every phase: `continue` advances, `stop` exits cleanly, `redo` re-runs the current phase (with optional adjustment notes appended), `back` steps backward one phase. Any other input is treated as adjustment.

| Option | Default | Description |
|--------|---------|-------------|
| `<ml_app>` | — (required) | The instrumented LLM application to onboard / evaluate against |
| `--project-name` | derived from `pyproject.toml` / `setup.cfg` / `setup.py` / `package.json` / cwd | The Datadog project the pipeline writes datasets and experiments into. Surfaced in the Precheck and created lazily by `LLMObs.enable(project_name=...)` in Phase 5 |
| `--timeframe` | `now-7d` | Lookback window for Phase 1 classification and Phase 4 dataset sampling |
| `--trace-limit` | `20` | Sampling cap for Phase 4. Phase 1 internally uses `min(20, --trace-limit)` for the classification sample |
| `--format` | `py` | Passed to `llm-obs-experiment-py-bootstrap` in Phase 6: `py` (script) or `ipynb` (Jupyter notebook) |
| `--evaluator-style` | `function` | Passed to Phase 3 and Phase 6: `function`, `class`, or `remote` |
| `--data-only` | off | Phase 3 pass-through: emit a framework-agnostic JSON evaluator spec instead of Python SDK code |
| `--publish` | off | Phase 3 pass-through: publish online LLM-judge evaluators to Datadog |
| `--stop-after` | `analyze` (run everything) | Stop after the named phase completes. Accepts: `classify`, `rca`, `eval-bootstrap` *(matches the classic 3-phase behavior)*, `dataset`, `publish`, `experiment`, `run`, `analyze` |
| `--start-at` | `classify` (start at the top) | Skip earlier phases and begin at the named phase. Same vocabulary as `--stop-after`. Auto-loads prior phase artifacts from `<output-dir>/state/` |
| `--classification-summary` | auto-loaded from `state/01-classification.md` | Override the Phase 1 output that Phase 2 consumes (used with `--start-at rca` or later) |
| `--rca-report` | auto-loaded from `state/02-rca-report.md` | Override the Phase 2 output that Phase 3 consumes |
| `--dataset-file` | auto-loaded from `state/04-dataset.json` | The local `DatasetRecordRaw[]` JSON that Phase 5 publishes |
| `--dataset-name` | auto-loaded from `state/05-published-dataset.json` | Name of the published Datadog dataset that Phase 6 wires the experiment to |
| `--experiment-file` | auto-loaded from `state/06-experiment.json` | The generated experiment file Phase 7 executes |
| `--experiment-id` / `--experiment-url` | auto-loaded from `state/07-experiment-run.json` | The Datadog experiment Phase 8 analyzes (mutually exclusive) |
| `--app-root` | resolved from cwd / `pyproject.toml` etc. | Restricts Phase 6's task-function introspection to this directory tree |
| `--env-file` | none (auto-discovery walks standard locations) | Explicit `.env` path for credential loading; surfaced in the Precheck |
| `--output-dir` | `./experiments` | Where the dataset JSON, publish script, generated experiment file, and `state/` directory are written |

**Examples**

```
# Full eight-phase walkthrough for a brand new ml_app
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
