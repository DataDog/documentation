---
title: Prompt Templating
description: Reference for the templating used in custom LLM-as-a-judge evaluation prompts—variables, array operators, span filters, and resolution rules.
further_reading:
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Custom LLM-as-a-Judge Evaluations"
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations"
  tag: "Documentation"
  text: "Trace-Level Evaluations"
---

Custom LLM-as-a-judge prompts inject span or trace data into the {{< ui >}}User{{< /ui >}} message by wrapping a field path in `{{ ... }}`. The System Prompt holds the static instructions to the LLM judge and does not resolve placeholders. The same syntax works in both the test pane and at evaluation time.

## At a glance

| Pattern | Description |
|---|---|
| `{{name}}` | Direct field |
| `{{meta.input.value}}` | Dot notation for nested fields |
| `{{meta.input.messages[0].content}}` | Array index (0-based) |
| `{{meta.input.messages[1,3].content}}` | Inclusive array range |
| `{{meta.input.messages[*].content}}` | Array wildcard (fan-out) |
| `{{meta.input.messages.content}}` | Implicit fan-out (same as `[*]`) |
| `{{span_input}}`, `{{span_output}}` | Span-scope aliases |
| `{{spans[0].name}}` | Pick one span from a trace (trace scope) |
| `{{spans[name:my-span].meta.input.value}}` | Filter spans by attribute (trace scope) |
| `{{spans}}` | Every span in the trace as JSON (trace scope) |
| `{{*}}` | Entire span or trace payload as JSON |

The autocomplete dropdown opens after you type `{{` and lists fields available on the selected sample.

## Span-scope syntax

Span-scope evaluations expose a single span per evaluation. Reference fields by their JSON path on the span.

### Built-in aliases

| Alias | Resolves to |
|---|---|
| `{{span_input}}` | `meta.input.messages[*].content` for LLM spans, `meta.input.value` otherwise |
| `{{span_output}}` | `meta.output.messages[*].content` for LLM spans, `meta.output.value` otherwise |

The aliases adapt to the kind of span being evaluated, so you don't have to branch on whether the span is an LLM call or an agent step.

### Direct field paths

```
{{name}}
{{meta.input.value}}
{{meta.output.value}}
{{metrics.input_tokens}}
```

### Array access

```
{{meta.input.messages[0].content}}     # First message only
{{meta.input.messages[*].content}}     # All messages, joined with newlines
{{meta.input.messages[0,2].content}}   # Inclusive range; out-of-bounds ends are clamped
{{meta.input.messages.content}}        # Implicit fan-out, equivalent to [*]
```

## Trace-scope syntax

Trace-scope evaluations expose every span in the trace under the `spans` array. Use `{{spans...}}` paths to read across spans. The `{{span_input}}` and `{{span_output}}` aliases are not available in trace scope.

### Reference the whole trace

```
{{spans}}    # JSON of every span in the trace
{{*}}        # Entire trace payload as JSON, including top-level metadata
```

### Pick a span by index

```
{{spans[0].meta.input.value}}    # First span
{{spans[*].name}}                # Newline-joined names of every span
```

### Filter spans by attribute

```
{{spans[name:my-span].meta.input.value}}
{{spans[meta.span.kind:llm].meta.output.value}}
{{spans[meta.span.kind:tool].meta.input.parameters}}
```

`[field.path:value]` keeps only the spans whose field at `field.path` equals `value`. Combine with deeper paths to extract the inputs or outputs of the matching spans. The filter falls back to an empty string if no span matches.

## Resolution rules

| Result | Behavior |
|---|---|
| Missing path | Resolves to an empty string |
| Out-of-bounds index | Resolves to an empty string |
| Single string | Inserted as-is |
| Array of strings | Joined with newlines (`\n`) |
| Object or array of non-string values | Serialized as compact JSON |
| Mixed array (strings + objects) | Serialized as compact JSON |
| Single empty array | Resolves to an empty string |

For example, given a span where `meta.input.messages` is:

```json
[
  { "role": "user", "content": "hello" },
  { "role": "user", "content": "help please" }
]
```

| Template | Resolved value |
|---|---|
| `{{meta.input.messages[0].content}}` | `hello` |
| `{{meta.input.messages[*].content}}` | `hello`<br>`help please` |
| `{{meta.input.messages}}` | `[{"role":"user","content":"hello"},{"role":"user","content":"help please"}]` |

## Tips

- Type `{{` in the prompt editor to open the autocomplete dropdown. The list adapts to the scope (span or trace) and to the sample selected on the right.
- Pick a sample row in the {{< ui >}}Filtered Spans{{< /ui >}} panel (span scope) or the {{< ui >}}Spans in Selected Trace{{< /ui >}} panel (trace scope), then click {{< ui >}}Test Evaluation{{< /ui >}} to preview how each placeholder resolves on real data before saving the configuration.
- Use the three-dots menu on a sample's JSON view and select {{< ui >}}Add variable to message{{< /ui >}} to insert a field path into the prompt without typing it.
- Pass `{{*}}` when you want the LLM judge to see the full payload—useful for free-form prompts that decide for themselves which fields matter.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
