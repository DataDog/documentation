---
title: Prompt Templating
description: Reference for the templating used in custom LLM-as-a-judge evaluation prompts—variables, array operators, span and trace filters, session paths, and resolution rules.
further_reading:
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Custom LLM-as-a-Judge Evaluations"
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations"
  tag: "Documentation"
  text: "Trace-Level Evaluations"
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations"
  tag: "Documentation"
  text: "Session-Level Evaluations"
---

Custom LLM-as-a-judge prompts inject span, trace, or session data into the {{< ui >}}User{{< /ui >}} message by wrapping a field path in `{{ ... }}`. The System Prompt holds the static instructions to the LLM judge and does not resolve placeholders. The same syntax works in both the test pane and at evaluation time. Which paths are available depends on the evaluation scope you choose—span, trace, or session.

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
| `{{traces[0].spans[0].meta.input.value}}` | First span of the first trace (session scope) |
| `{{traces[*].spans[*].name}}` | Fan-out across traces and spans (session scope) |
| `{{traces[meta.span.kind:llm].spans[*].meta.output.value}}` | Filter spans by attribute across a session (session scope) |
| `{{traces}}` | Every trace in the session as JSON (session scope) |
| `{{*}}` | Entire span, trace, or session payload as JSON |

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

## Session-scope syntax

Session-scope evaluations expose every trace in the [user session][1] under the `traces` array. Each trace includes its own `spans` array, so you can read across traces and spans in one prompt. Use `{{traces...}}` paths (and nested `{{traces...].spans...}}` paths) to build session-level judges. The `{{span_input}}` and `{{span_output}}` aliases are not available in session scope.

Session-level evaluations require spans to be tagged with a `session_id`. See [Tracking user sessions][1] to instrument your application. A session is considered complete after **30 minutes** of inactivity (no new spans for that session, measured from the most recent span); the evaluation runs once at that point with every trace and span from the session. Spans that arrive more than 30 minutes after the previous span are not included. See [Session-Level Evaluations][2] for configuration, example prompts, and when to choose session scope over trace or span scope.

### Reference the whole session

```
{{traces}}    # JSON of every trace in the session (each trace includes its spans)
{{*}}         # Entire session payload as JSON, including top-level metadata
```

### Pick a trace or span by index

```
{{traces[0].spans[0].meta.input.value}}    # First span of the first trace
{{traces[*].spans[*].name}}                # Newline-joined names of every span in the session
{{traces[1].spans}}                        # JSON of every span in the second trace
```

### Filter traces or spans by attribute

```
{{traces[0].spans[name:my-span].meta.input.value}}
{{traces[*].spans[meta.span.kind:llm].meta.output.value}}
{{traces[meta.span.kind:llm].spans[*].meta.output.value}}
{{traces[meta.span.kind:tool].spans[*].meta.input.parameters}}
```

`[field.path:value]` on `traces` keeps only traces whose field at `field.path` equals `value`. The same filter syntax on `spans` (within a trace path) keeps only matching spans. Combine filters and deeper paths to extract inputs or outputs across the session. Filters fall back to an empty string when nothing matches.

### Fan-out across traces

Use `[*]` on `traces` or `spans` the same way as in trace scope: values from every matching trace or span are collected and joined with newlines (`\n`), or serialized as JSON when the resolved values are objects.

```
{{traces[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[meta.span.kind:llm].meta.output.messages[*].content}}
```

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

- Type `{{` in the prompt editor to open the autocomplete dropdown. The list adapts to the scope (span, trace, or session) and to the sample selected on the right.
- Pick a sample in the panel on the right—{{< ui >}}Filtered Spans{{< /ui >}} (span scope), {{< ui >}}Spans in Selected Trace{{< /ui >}} (trace scope), or the sample session pane listing traces in the session (session scope)—then click {{< ui >}}Test Evaluation{{< /ui >}} to preview how each placeholder resolves on real data before saving the configuration.
- Use the three-dots menu on a sample's JSON view and select {{< ui >}}Add variable to message{{< /ui >}} to insert a field path into the prompt without typing it.
- Pass `{{*}}` when you want the LLM judge to see the full payload—useful for free-form prompts that decide for themselves which fields matter.
- Prefer `{{traces}}` or targeted `{{traces...].spans...}}` paths for session judges when you need cross-turn context; use `{{spans}}` when a single trace is enough. See [Session-Level Evaluations][2] for scope guidance and example prompts.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrumentation/sdk/#tracking-user-sessions
[2]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations
