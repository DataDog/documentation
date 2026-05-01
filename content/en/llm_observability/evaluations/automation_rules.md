---
title: Automation Rules
description: Route LLM Observability traces into annotation queues or datasets automatically using filter-based rules.
further_reading:
  - link: /llm_observability/evaluations/annotation_queues
    tag: Documentation
    text: Set up annotation queues for human review
  - link: /llm_observability/experiments/datasets
    tag: Documentation
    text: Build datasets from production traces
  - link: /api/latest/llm-observability/
    tag: API
    text: LLM Observability API reference
---

## Overview

Automation Rules continuously route production LLM traces to annotation queues or datasets based on filters and sampling criteria. Use them to:

- Build datasets that stay current with production behavior
- Populate annotation queues with traces matching specific failure modes
- Keep human review focused on signal without manual trace selection

<div class="alert alert-info">Automations apply going forward: new traces matching your rule are routed to the destination as they arrive. Existing traces matching the filter are not added retroactively.</div>

Each rule is evaluated **per span**, in real time, as spans stream into LLM Observability. The rule-matcher does not buffer or join across spans, which constrains the filter set (see [Supported filter fields](#supported-filter-fields)).

## Configuring an automation

You configure automations from the Trace Explorer's **Automate Query** button. The flow is the same regardless of destination:

1. Apply a filter in [**AI Observability > Traces**][1] using [supported filter fields](#supported-filter-fields).
2. Click **Automate Query**.
3. Configure the sampling rate (see [Sampling and limits](#sampling-and-limits)).
4. Pick the destination action:
   - **Add to Annotation Queue**. See [Annotation Queues][2] for queue-specific setup.
   - **Add to Dataset**. See [Datasets][3] for dataset-specific setup.

Manage your rules from [**AI Observability > Settings > Automations**][4]. You can enable, disable, edit, or delete rules at any time.

## Supported filter fields

Automation filters use a subset of the Trace Explorer search syntax. When a filter contains an unsupported field, the **Automate Query** button is disabled and the tooltip names the offending field.

| Filter for | Fields |
|---|---|
| Application and scope | `@ml_app`, `@ml_app_version`, `@parent_id` (use `:undefined` for root spans), `@span_id`, `@trace_id`, `@session_id`, `@duration`, `@start_ns`, `@kind`, `@name` |
| Status and errors | `@status`, `@error`, `@error.message`, `@error.type`, `@error.stack`, `@meta.error.message`, `@meta.error.type`, `@meta.error.stack` |
| Content | `@input`, `@output`, `@expected_output`, `@meta.input.value`, `@meta.output.value`, `@meta.input.messages.*`, `@meta.output.messages.*`, `@meta.input.documents.*`, `@meta.output.documents.*`, `@meta.input.parameters.*`, `@meta.output.parameters.*` |
| Model and span kind | `@model_name`, `@model_provider`, `@meta.span.kind` |
| Evaluations | `@evaluation.<NAME>.value`, `@evaluation.<NAME>.assessment`, `@evaluation.<NAME>.reasoning`, `@evaluation.<NAME>.metadata`, `@evaluation.<NAME>.tags` |
| Metrics | `@metrics.*` (any custom metric, for example, `@metrics.input_tokens`) |
| Tags | bare keys (`env:prod`), `@tags` |
| Custom metadata | `@meta.metadata.*` (any key, for example, `@meta.metadata.user_id`) |
| Prompts and tools | `@meta.input.prompt.*`, `@meta.output.prompt.*`, `@meta.tool_definitions.*` |

### Not supported

These patterns are common in the Trace Explorer but cannot be used in automation rules:

| Pattern | Why | What to use instead |
|---|---|---|
| `@trace.*` (for example, `@trace.total_tokens`) | Computed across all spans of a trace at query time. The rule-matcher evaluates one span in isolation. | Use a monitor for trace-level conditions. For per-span token counts, use `@metrics.input_tokens` or `@metrics.output_tokens`. |
| `@child.*` (for example, `@child.@meta.span.kind`) | Requires walking sibling spans. Per-span evaluation has no graph traversal. | Filter directly on the span you care about, scoped by `@parent_id:undefined` for root spans. |
| `@event_type` | Trace-explorer scoping field. Automations already operate per span. | Drop it. The **Automate Query** button strips it automatically. |
| Top-level `@field`s not in the allowed list (for example, `@content`, `@score_value`) | The rule-matcher uses a fixed field accessor. Unmapped fields silently fail to match. | Use the closest allowlisted field. For example, `@input` or `@output` instead of `@content`. |
| Custom deep `@meta.*` paths outside the allowed prefixes | Only specific prefixes are dynamically dispatched. | Move custom data under `@meta.metadata.*`, which is a catch-all. |
| Aggregations and formulas (for example, `count:>5`, `avg(@metrics.input_tokens):>500`) | Require a result set. The rule-matcher evaluates one span as a row. | Use a monitor; or rephrase as a per-span condition. |

### Deprecated fields

The following field shapes are deprecated and rejected in new automations. Migrate to the consolidated `@evaluation.<NAME>.*` shape:

| Deprecated prefix | Use instead |
|---|---|
| `@evaluations.<NAME>` | `@evaluation.<NAME>.value` |
| `@evaluation_assessments.<NAME>` | `@evaluation.<NAME>.assessment` |
| `@evaluation_reasoning.<NAME>` | `@evaluation.<NAME>.reasoning` |
| `@evaluation_metadata.<NAME>` | `@evaluation.<NAME>.metadata` |
| `@evaluation_tags.<NAME>` | `@evaluation.<NAME>.tags` |

## Sampling and limits

Automations include a sampling rate to keep volume manageable.

| Destination | Sampling rate cap | Record cap |
|---|---|---|
| Annotation queue | Up to 5% | 1,000 records per queue. The automation pauses when the queue reaches the limit. |
| Dataset | Up to 100% | 20,000 records per dataset. Datasets populated by automations are read-only to prevent accidental modification. |

A higher sampling rate captures more traces but may overflow the destination faster. Start low (1-2%) for queues and tune up as you observe real volume.

## Troubleshooting

**My rule is saved but no traces are showing up.**

Most often, one of:

- **Forward-only**: the rule only acts on traces arriving after you saved it. Wait for new traces, or check that traffic actually matches the filter.
- **Sampling**: a 1% sampling rate routes 1 in 100 matching traces. Confirm the rate is high enough for your match volume.
- **Destination is full**: annotation queues cap at 1,000 records and pause; datasets cap at 20,000.

**My filter validates in the Trace Explorer but the Automate Query button is disabled.**

The Trace Explorer supports a wider field set than automations. The button's tooltip names the offending fields. Common cases:

- Trace-level fields (`@trace.*`): use a monitor instead.
- Deprecated `@evaluations.*` fields: migrate to `@evaluation.<NAME>.*`.
- Cross-span references (`@child.*`): rephrase to filter on the span itself.

**My filter has a custom `@meta.*` path that isn't in the allowlist.**

Move the custom data under `@meta.metadata.*`. The catch-all prefix accepts any key.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /llm_observability/evaluations/annotation_queues/
[3]: /llm_observability/experiments/datasets/
[4]: https://app.datadoghq.com/llm/settings/automations
