---
title: Automation Rules
description: Route Agent Observability traces into annotation queues or datasets automatically using filter-based rules.
further_reading:
  - link: /llm_observability/evaluations/annotation_queues
    tag: Documentation
    text: Set up annotation queues for human review
  - link: /llm_observability/experiments/datasets
    tag: Documentation
    text: Build datasets from production traces
  - link: /api/latest/llm-observability/
    tag: API
    text: Agent Observability API reference
---

## Overview

Automation Rules continuously route production LLM traces to annotation queues or datasets based on filters and sampling criteria. Use them to:

- Build datasets that stay current with production behavior
- Populate annotation queues with traces matching specific failure modes
- Keep human review focused on signal without manual trace selection

<div class="alert alert-info">Automations apply going forward: new traces matching your rule are routed to the destination as they arrive. Existing traces matching the filter are not added retroactively.</div>

Each rule is evaluated **per span**, in real time, as spans stream into Agent Observability. The rule-matcher does not buffer or join across spans, which constrains the filter set (see [Supported filter fields](#supported-filter-fields)).

## Configuring an automation

You configure automations from the Trace Explorer's {{< ui >}}Automate Query{{< /ui >}} button. The flow is the same regardless of destination:

1. Apply a filter in [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1] using [supported filter fields](#supported-filter-fields).
2. Click {{< ui >}}Automate Query{{< /ui >}}.
3. Configure the sampling rate (see [Sampling and limits](#sampling-and-limits)).
4. Pick the destination action:
   - {{< ui >}}Add to Annotation Queue{{< /ui >}}. See [Annotation Queues][2] for queue-specific setup.
   - {{< ui >}}Add to Dataset{{< /ui >}}. See [Datasets][3] for dataset-specific setup.

Manage your rules from [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4]. You can enable, disable, edit, or delete rules at any time.

## Supported filter fields

Automation filters use a subset of the Trace Explorer search syntax. The table below shows commonly-used fields by category. It is illustrative, not exhaustive. The {{< ui >}}Automate Query{{< /ui >}} button is disabled when a filter contains an unsupported field, and the tooltip names the offending field. Use the tooltip as the source of truth for what is accepted.

| Filter for | Example fields |
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

## Sampling and limits

Automations include a sampling rate to keep volume manageable.

| Destination | Sampling rate cap | Record cap |
|---|---|---|
| Annotation queue | Up to 5% | 1,000 records per queue. The automation pauses when the queue reaches the limit. |
| Dataset | Up to 100% | 20,000 records per dataset. Datasets populated by automations are read-only to prevent accidental modification. |

A higher sampling rate captures more traces but may overflow the destination faster. Start low (1-2%) for queues and tune up as you observe real volume.

## Troubleshooting

**No traces appear after saving a rule.**

Most often, one of:

- **Forward-only**: the rule only acts on traces arriving after you saved it. Wait for new traces, or check that traffic actually matches the filter.
- **Sampling**: a 1% sampling rate routes 1 in 100 matching traces. Confirm the rate is high enough for your match volume.
- **Destination is full**: annotation queues cap at 1,000 records and pause; datasets cap at 20,000.

**The Automate Query button is disabled despite a valid Trace Explorer filter.**

The Trace Explorer supports a wider field set than automations. The button's tooltip names the offending fields. Common cases:

- Trace-level fields (`@trace.*`): use a monitor instead.
- Deprecated `@evaluations.*`, `@evaluation_assessments.*`, `@evaluation_reasoning.*`, `@evaluation_metadata.*`, and `@evaluation_tags.*` fields: migrate to the consolidated `@evaluation.<NAME>.*` shape.
- Cross-span references (`@child.*`): rephrase to filter on the span itself.
- Aggregations and formulas (for example, `count:>5`, `avg(@metrics.input_tokens):>500`): use a monitor, or rephrase as a per-span condition.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /llm_observability/evaluations/annotation_queues/?tab=usingautomationrules
[3]: /llm_observability/experiments/datasets/?tab=fromproductiontraces
[4]: https://app.datadoghq.com/llm/settings/automations
