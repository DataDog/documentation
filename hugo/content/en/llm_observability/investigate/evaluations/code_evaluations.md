---
title: Code Evaluators
description: Create custom evaluators that run a JavaScript function on your spans, traces, or sessions instead of calling an LLM judge.
further_reading:
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Learn about custom LLM-as-a-judge evaluators"
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating"
  tag: "Documentation"
  text: "Prompt templating reference"
- link: "/llm_observability/investigate/evaluations/managed_evaluations"
  tag: "Documentation"
  text: "Learn about managed evaluators"
---

## Overview

Code evaluators are custom evaluators that run a JavaScript function you write, instead of sending a prompt to an LLM judge. Use them for checks that have a definite answer, such as:

- Detecting empty or malformed tool results
- Checking whether user input or model output contains a keyword
- Counting spans, tool calls, or retries in a trace
- Computing a rate across the traces in a session

Because no LLM is called, code evaluators do not require an [LLM provider account][1], consume no LLM tokens, and return the same result every time for the same input.

Code evaluators run on the same scopes as [custom LLM-as-a-judge evaluators][2]: span, trace, and session. Results appear across Agent Observability alongside your other evaluations.

## Create a code evaluator

1. In Datadog, navigate to the Agent Observability [Evaluators page][3]. Select {{< ui >}}Create Evaluator{{< /ui >}}.
1. Start the evaluator in one of these ways:
   - Under {{< ui >}}Templates{{< /ui >}}, select a template from the {{< ui >}}Code Evaluations{{< /ui >}} group. The editor opens in Code mode with the template's function.
   - Under {{< ui >}}Scratch{{< /ui >}}, select the scope you want to evaluate. In the editor, set {{< ui >}}Type{{< /ui >}} to {{< ui >}}Code (deterministic){{< /ui >}}.
1. Provide a clear, descriptive {{< ui >}}evaluator name{{< /ui >}} (for example, `empty-tool-result`). The name must be unique within your application.
1. In {{< ui >}}Runs On{{< /ui >}}, select the application you want to evaluate, what you want to evaluate on (span, trace, or session), and the sampling rate. You can add more filtering criteria, for example `@meta.span.kind:tool` to evaluate only tool spans. See [Define the evaluation scope][4] for details.
1. In the {{< ui >}}Template{{< /ui >}} picker, select a starting point:
   - {{< ui >}}Empty tool result{{< /ui >}}: Flags tool calls that return an empty result.
   - {{< ui >}}User input contains text{{< /ui >}}: Checks whether the user input contains a given string.
   - {{< ui >}}Create from scratch{{< /ui >}}: Starts from a minimal function.

   Templates have a version for each scope. If you change the scope before editing the template's code, the editor switches to the template's version for the new scope. Code you have edited is not replaced.
1. Write or edit your function in {{< ui >}}Evaluation code{{< /ui >}}. See [Write the evaluation function](#write-the-evaluation-function).
1. Test the evaluator. See [Test and preview](#test-and-preview).
1. Select {{< ui >}}Save and Publish{{< /ui >}} to start running the evaluator, or {{< ui >}}Save as Draft{{< /ui >}} to finish it later.

In Code mode, the model, prompt, and output sections of the editor are hidden, because the function defines the whole evaluation.

You can switch an existing evaluator between {{< ui >}}LLM judge{{< /ui >}} and {{< ui >}}Code (deterministic){{< /ui >}} with the {{< ui >}}Type{{< /ui >}} selector.

## Write the evaluation function

The function must be named `__evalDeterministic`. It receives one argument, `data`, and returns the evaluation result:

```javascript
function __evalDeterministic(data) {
    return {
        value: true,
        assessment: "pass",
        reasoning: "Explain why the evaluation returned this value",
        metadata: { example_key: "example value" },
    };
}
```

### Input data

`data` is the same object that fills `{{ }}` variables in LLM-as-a-judge [prompt templates][5]. Its shape depends on the evaluation scope:

| Scope | `data` | Example fields |
|---|---|---|
| Span | The span | `data.name`, `data.span_id`, `data.meta.span.kind`, `data.meta.input.value`, `data.meta.output.value` |
| Trace | `{ spans: [...] }`, every span in the trace | `data.spans[0].name`, `data.spans.filter((s) => s.meta?.span?.kind === "tool")` |
| Session | `{ session_id, traces: [{ trace_id, spans: [...] }] }`, every trace in the session | `data.session_id`, `data.traces[0].spans` |

To see the exact fields available, select a span, trace, or session in the right pane of the editor to view its JSON.

Fields can be missing on some spans. Use optional chaining (`?.`) and defaults (`??`) to avoid errors, for example `data.meta?.output?.value ?? ""`.

### Return value

The type of the value your function returns determines the evaluation's metric type:

| Return value | Metric type |
|---|---|
| `true` or `false` | Boolean |
| A number | Score |
| A non-empty string | Categorical |
| A plain object | JSON |
| `null`, `undefined`, or `""` | No result. The evaluation is skipped. |

To add an assessment, reasoning, or metadata, return an object with a `value` key:

| Key | Description |
|---|---|
| `value` | The evaluation value. Mapped to a metric type using the rules above. |
| `assessment` | Optional. `"pass"` or `"fail"`. |
| `reasoning` | Optional. A string explaining the result. |
| `metadata` | Optional. An object with extra details, such as the IDs of the spans that failed. |

If the object has an `assessment` but no `value`, the result is a Boolean that is `true` when the assessment is `"pass"`.

Return `null` to skip spans, traces, or sessions that the evaluation doesn't apply to, for example a span that is not a tool call.

### Example: Empty tool result (span scope)

```javascript
function __evalDeterministic(data) {
    if (data.meta?.span?.kind !== "tool") {
        return null;
    }
    const output = String(data.meta?.output?.value ?? "").trim();
    const isEmpty = output === "" || output === "[]" || output === "{}";
    return {
        value: isEmpty,
        assessment: isEmpty ? "fail" : "pass",
        reasoning: isEmpty
            ? `Tool ${data.name} returned an empty result`
            : `Tool ${data.name} returned a result`,
    };
}
```

### Example: Empty tool results in a trace (trace scope)

```javascript
function __evalDeterministic(data) {
    const isEmpty = (span) => {
        const output = String(span.meta?.output?.value ?? "").trim();
        return output === "" || output === "[]" || output === "{}";
    };
    const toolSpans = (data.spans ?? []).filter((s) => s.meta?.span?.kind === "tool");
    if (toolSpans.length === 0) {
        return null;
    }
    const empty = toolSpans.filter(isEmpty);
    return {
        value: empty.length > 0,
        assessment: empty.length > 0 ? "fail" : "pass",
        reasoning: empty.length > 0
            ? `${empty.length} of ${toolSpans.length} tool call(s) returned an empty result`
            : `All ${toolSpans.length} tool call(s) returned a result`,
        metadata: { empty_tool_span_ids: empty.map((s) => s.span_id) },
    };
}
```

### Example: Empty tool call rate (session scope)

This function returns a number, so the result is a score.

```javascript
function __evalDeterministic(data) {
    const toolSpans = (data.traces ?? []).flatMap((t) =>
        (t.spans ?? []).filter((s) => s.meta?.span?.kind === "tool"),
    );
    if (toolSpans.length === 0) {
        return null;
    }
    const empty = toolSpans.filter((s) => {
        const output = String(s.meta?.output?.value ?? "").trim();
        return output === "" || output === "[]" || output === "{}";
    });
    return empty.length / toolSpans.length;
}
```

## Test and preview

The pane on the right shows the spans, traces, or sessions that match the evaluation scope. Click {{< ui >}}Test Evaluator{{< /ui >}}, then:

- Select {{< ui >}}Auto Test{{< /ui >}} to run your function on a sample of the matching spans, traces, or sessions.
- Select {{< ui >}}Test Manually{{< /ui >}} to run your function on one you choose.

For each run, the result panel shows the returned value, any `console.log` output, and any error the function raised.

## Viewing and using results

Code evaluator results appear in the same places as other evaluation results, and you can query them with the same syntax. For example:

- `@evaluation.empty-tool-result.value:true`
- `@evaluation.empty-tool-result.assessment:fail`

See [Viewing and using results][6] for details.

## Configure code evaluators from the API

You can create and update code evaluators with the [custom evaluator configuration API][7]. In the request body:

- Set `llm_provider.integration_provider` to `deterministic` and `llm_provider.model_name` to `javascript`.
- Omit `llm_provider.integration_account_id`, `prompt_template`, `output_schema`, and `inference_params`.
- Set `llm_judge_config.parsing_type` to `json`, and put your function in `llm_judge_config.user_specified_json_post_processing_function`.

Set `DD_SITE` to your [Datadog site][8] (for example, {{< region-param key="dd_site" code="true" >}}).

```bash
curl -X PUT "https://api.${DD_SITE}/api/unstable/llm-obs/config/evaluators/custom/empty-tool-result" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d @- <<'EOF'
{
  "data": {
    "type": "evaluator_config",
    "id": "empty-tool-result",
    "attributes": {
      "eval_name": "empty-tool-result",
      "target": {
        "application_name": "my-app",
        "eval_scope": "span",
        "filter": "@meta.span.kind:tool"
      },
      "llm_provider": {
        "integration_provider": "deterministic",
        "model_name": "javascript"
      },
      "llm_judge_config": {
        "parsing_type": "json",
        "user_specified_json_post_processing_function": "function __evalDeterministic(data) {\n  const out = String(data.meta?.output?.value ?? \"\").trim();\n  const empty = out === \"\" || out === \"[]\";\n  return { value: empty, assessment: empty ? \"fail\" : \"pass\" };\n}"
      }
    }
  }
}
EOF
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account
[2]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[3]: https://app.datadoghq.com/llm/evaluations
[4]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#define-the-evaluation-scope-filtering-and-sampling
[5]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
[6]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#viewing-and-using-results
[7]: /api/latest/agent-observability/#create-or-update-a-custom-evaluator-configuration
[8]: /getting_started/site/
