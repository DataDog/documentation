---
title: Trace-Level Evaluations
description: Run a custom LLM-as-a-judge across an entire trace, with examples of when to use trace scope over span scope.
further_reading:
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Custom LLM-as-a-Judge Evaluations"
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating"
  tag: "Documentation"
  text: "Prompt Templating"
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "LLM Observability terms and concepts"
---

A trace-level evaluation runs once per trace, with every span in the trace available to the LLM judge in a single prompt. This is the right choice when the answer to a question depends on the interaction between spans—for example, whether an agent reached its goal, whether tools were called in the correct order, or whether a multi-turn conversation stayed on topic.

Span-level evaluations, by contrast, run once per matching span and only see that span's input and output.

## When to use trace scope over span scope

Use {{< ui >}}Trace{{< /ui >}} scope when the evaluation needs context from more than one span:

- The answer depends on a sequence of steps (a tool call followed by an LLM response that uses the tool's output).
- The judge has to look at a final answer in the context of intermediate reasoning.
- A "pass" depends on something that happened earlier in the trace (a retrieval, a guardrail, a refusal).

Use {{< ui >}}Span{{< /ui >}} scope when the evaluation can be answered from a single span in isolation—for example, scoring the quality of one LLM response, classifying user intent on the root span, or checking that a tool received well-formed arguments.

## Use cases and examples

### 1. Goal completion for a multi-step agent

Score whether an agent finished what the user asked for, given the full sequence of tool calls and reasoning steps.

**System Prompt**
```
You are evaluating an AI agent that helps users complete tasks. You will see the full trace of an agent run, including every LLM call, tool invocation, and intermediate response.

Your job is to decide whether the agent achieved the user's goal. Consider:
- Did the agent understand the user's request?
- Did the tool calls and reasoning steps actually progress toward the goal?
- Is the final response a complete answer, or does it leave the request unfinished?

Respond with one of: completed, partially_completed, failed.
```

**User**
```
// {{spans[0].meta.input.value}} → input of the trace's first span (the user goal).
User goal: {{spans[0].meta.input.value}}

// {{spans}} → JSON of every span in the trace, in order.
Agent steps:
{{spans}}
```

### 2. Tool-use correctness

Check whether an agent called the right tool with the right arguments for the user's question.

**System Prompt**
```
You will see a trace where an LLM agent decides which tool to call and with what arguments. Decide whether the chosen tool and its arguments were appropriate for the user's request.

Score from 1 (clearly wrong tool or arguments) to 5 (perfect tool choice and arguments).
```

**User**
```
// First span's input—the user's original question.
User question: {{spans[0].meta.input.value}}

// `[meta.span.kind:tool]` filter → keeps only spans whose kind is "tool".
// `.meta.input.parameters` → the arguments passed to each matching tool call.
Tool calls made during this trace:
{{spans[meta.span.kind:tool].meta.input.parameters}}

// `[*]` wildcard → fan out across every span; outputs are joined with newlines.
Final response:
{{spans[*].meta.output.value}}
```

### 3. Faithfulness in a RAG workflow

Check whether the final answer is grounded in the documents that were retrieved earlier in the trace.

**System Prompt**
```
You will see a trace from a retrieval-augmented generation pipeline. The retrieval step provides context documents, and a downstream LLM step produces an answer.

Decide whether the final answer is supported by the retrieved documents. Mark `true` only if every factual claim in the answer can be traced back to one of the documents.
```

**User**
```
// `[meta.span.kind:retrieval]` filter → only retrieval spans (the documents fetched).
// `.meta.output.documents[*].text` → the text of every document the retrieval returned,
//                                     joined with newlines.
Retrieved context:
{{spans[meta.span.kind:retrieval].meta.output.documents[*].text}}

// `[meta.span.kind:llm]` filter → outputs of the LLM call(s) that produced the answer.
Final answer:
{{spans[meta.span.kind:llm].meta.output.value}}
```

### 4. Conversation quality across turns

Score the overall quality of a multi-turn conversation, factoring in coherence across turns rather than the quality of any single response.

**System Prompt**
```
You will see a multi-turn conversation between a user and an assistant. Evaluate the conversation as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether the assistant's tone stayed consistent

Output one of: excellent, good, mixed, poor.
```

**User**
```
// `meta.input.messages[*].content` → fans out over each LLM span's input messages
//                                     and joins their content with newlines.
Conversation:
{{spans[meta.span.kind:llm].meta.input.messages[*].content}}

// Same pattern, but on the LLM output messages—the assistant's replies.
Assistant responses:
{{spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## How trace completion works

A trace-level evaluation triggers after Datadog considers a trace complete. A trace is **complete** after **3 minutes** of inactivity—that is, three minutes have passed with no new spans arriving for that trace.

Any spans that arrive more than 3 minutes after the previous span on a trace are not included in the trace-level evaluation. If your application emits long-running agents whose steps are sparser than 3 minutes apart, plan for those late spans to be excluded.

## Configure a trace-level evaluation

The walkthrough below highlights the parts of the configuration that are specific to trace scope. The rest of the configuration (account, model, output type, assessment criteria) is the same as for span-scoped evaluations.

1. Navigate to the LLM Observability [Evaluations page][1] and select {{< ui >}}Create Evaluation{{< /ui >}}, then {{< ui >}}Create your own{{< /ui >}}. (You can also start from a [template evaluation][2].)
1. Fill in the {{< ui >}}evaluation name{{< /ui >}}, {{< ui >}}account{{< /ui >}}, and {{< ui >}}model{{< /ui >}} as you would for any custom LLM-as-a-judge evaluation.
1. Under {{< ui >}}Evaluation Scope{{< /ui >}} > {{< ui >}}Evaluate On{{< /ui >}}, select {{< ui >}}Trace{{< /ui >}}.

   {{< img src="llm_observability/evaluations/trace_level_evaluation_scope.png" alt="The Evaluate On scope picker with Trace selected and Span as the alternative." style="width:100%;" >}}

   <div class="alert alert-info">A trace is considered complete after <strong>3 minutes</strong> of inactivity (no new spans for that trace), at which point the evaluation runs. Spans that arrive more than 3 minutes after the previous span are not included in the evaluation.</div>

1. Add a {{< ui >}}Query{{< /ui >}} and {{< ui >}}Sampling Rate{{< /ui >}} to control which traces are evaluated. The query is matched against the trace's root span—for example, `@name:agent.workflow` evaluates only traces whose root span is named `agent.workflow`.
1. In the {{< ui >}}System Prompt{{< /ui >}} field, enter the static instructions to the LLM judge—for example, the criteria the judge should use and the output it should produce. The System Prompt does not resolve `{{ ... }}` placeholders.
1. In the {{< ui >}}User{{< /ui >}} message, write the prompt that injects trace data using `{{spans...}}` paths. The autocomplete dropdown adapts to trace scope and lists every field available on the selected sample trace. The `{{span_input}}` and `{{span_output}}` aliases are not available in trace scope—reference span data through the `spans` array instead. Common patterns:

   ```
   {{spans}}                                         # JSON of every span in the trace
   {{spans[0].meta.input.value}}                     # First span only
   {{spans[*].name}}                                 # All span names, joined with newlines
   {{spans[name:my-span].meta.input.value}}          # Filter spans by attribute
   {{spans[meta.span.kind:llm].meta.output.value}}   # All LLM-kind spans' outputs
   {{*}}                                             # Entire trace payload as JSON
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/trace_level_prompt_editor.png" alt="The User prompt editor for a trace-level evaluation, with the autocomplete dropdown listing spans-prefixed fields after typing two open braces." style="width:100%;" >}}

1. Pick a sample trace from the panel on the right. The pane title becomes {{< ui >}}Spans in Selected Trace{{< /ui >}} and renders the spans of that trace, with the fields referenced by your prompt highlighted.

   {{< img src="llm_observability/evaluations/trace_level_filtered_traces.png" alt="The configuration page in trace scope, with the Spans in Selected Trace pane on the right showing one span's input and output values highlighted." style="width:100%;" >}}

1. Click {{< ui >}}Test Evaluation{{< /ui >}} to run the prompt against the selected trace and preview the LLM judge's output before saving.
1. Continue with the rest of the [evaluation configuration][5] (output type, assessment criteria) and {{< ui >}}Save and Publish{{< /ui >}} to start running the evaluation against new traces.

## Viewing results

After a trace completes, its evaluation result is attached to the trace itself and is available across LLM Observability in near-real-time. While the trace is still within its 3-minute inactivity window, the result shows up as {{< ui >}}Pending{{< /ui >}} in the side panel; after the trace completes, the pending row is replaced by the final result.

### Query results

Trace-level evaluation results use the same query syntax as span-level evaluations. Use these patterns in the LLM Observability Traces explorer, in dashboards, and in monitor queries:

| Query | Purpose |
|---|---|
| `@evaluation.<evaluation_name>.value:complete` | Filter to traces with a specific evaluation value |
| `@evaluation.<evaluation_name>.assessment:fail` | Filter to traces that failed your evaluation's pass criteria |
| `@evaluation.<evaluation_name>.value:*` | All traces that have a result for this evaluator (excludes pending) |

Substitute `<evaluation_name>` with the name you set when creating the evaluator. Evaluation values can also be used as [facets][6] for grouping in dashboards and monitors.

### Debug results

Open the {{< ui >}}Evaluations{{< /ui >}} tab on a trace to see every evaluation that ran for it, alongside the LLM judge's reasoning when {{< ui >}}Enable Reasoning{{< /ui >}} was turned on at configuration time. The reasoning explains *why* the judge produced that value and references specific span fields it relied on—use it to triage individual failures and decide whether to refine the prompt or accept the verdict.

{{< img src="llm_observability/evaluations/trace_level_results_sidepanel.png" alt="The Evaluations tab of a completed trace, showing the trace-level evaluation result with the LLM judge's reasoning expanded." style="width:100%;" >}}

### Monitor results

Wire trace-level evaluation results into [monitors][7] and [annotation queues][8] to alert on regressions and route failures for human review:

- **Monitor on pass-rate drop.** Create a monitor with a query like the following to alert when the rolling pass rate drops:

  ```
  formula(100 * a / b) < 80
    where a = count(@evaluation.<evaluation_name>.assessment:pass) by {ml_app}
          b = count(@evaluation.<evaluation_name>.value:*) by {ml_app}
  over last_15m
  ```

- **Route failures to an annotation queue.** Configure an [Automation Rule][8] that matches `@evaluation.<evaluation_name>.assessment:fail` and adds the trace to an annotation queue for a human reviewer. This closes the loop on judge mistakes—failed traces are reviewed, mislabels are corrected, and the corrections become the dataset you use to refine the evaluator prompt.

## Permissions

Configuring evaluations requires the `LLM Observability Write` [permission][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations
[3]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating
[4]: /account_management/rbac/permissions/#llm-observability
[5]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/#define-the-evaluation-output
[6]: /events/explorer/facets/
[7]: /monitors/
[8]: /llm_observability/evaluations/annotation_queues
