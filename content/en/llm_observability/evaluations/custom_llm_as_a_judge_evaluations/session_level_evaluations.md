---
title: Session-Level Evaluations
description: Run a custom LLM-as-a-judge across an entire user session, with examples of when to use session scope over trace or span scope.
further_reading:
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Custom LLM-as-a-Judge Evaluations"
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations"
  tag: "Documentation"
  text: "Trace-Level Evaluations"
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating"
  tag: "Documentation"
  text: "Prompt Templating"
- link: "/llm_observability/instrumentation/sdk/#tracking-user-sessions"
  tag: "Documentation"
  text: "Tracking user sessions"
---

A session-level evaluation runs once per [user session][9], with every trace—and every span in those traces—available to the LLM judge in a single prompt. Sessions group related interactions under a shared `session_id` (for example, a chat conversation) and can include multiple traces over an extended interaction.

Session scope answers questions about agent performance and user behavior across an entire interaction—questions that trace-level and span-level judges cannot answer from a single request or span.

<div class="alert alert-info">Session-level evaluations require spans to be tagged with a <code>session_id</code>. See <a href="/llm_observability/instrumentation/sdk/#tracking-user-sessions">Tracking user sessions</a> to instrument your application.</div>

## Configure a session-level evaluation

The walkthrough below highlights the parts of the configuration that are specific to session scope. The rest of the configuration (account, model, output type, assessment criteria) is the same as for span- or trace-scoped evaluations.

1. Navigate to the LLM Observability [Evaluations page][1] and select {{< ui >}}Create Evaluation{{< /ui >}}, then in the `Evaluate On` select {{< ui >}}Session{{< /ui >}}. (You can also start from a [template evaluation][2].)
1. Fill in the {{< ui >}}evaluation name{{< /ui >}}, {{< ui >}}account{{< /ui >}}, and {{< ui >}}model{{< /ui >}} as you would for any custom LLM-as-a-judge evaluation.
1. Under {{< ui >}}Evaluation Scope{{< /ui >}} > {{< ui >}}Evaluate On{{< /ui >}}, select {{< ui >}}Session{{< /ui >}}.

   {{< img src="llm_observability/evaluations/session_level_evaluation_scope.png" alt="The Evaluate On scope picker with Session selected." style="width:100%;" >}}

   <div class="alert alert-info">A session is considered complete after 30 minutes of inactivity (no new spans for that session, measured from the most recent span), at which point the evaluation runs. Spans that arrive more than 30 minutes after the previous span are not included in the evaluation.</div>

1. Add a {{< ui >}}Query{{< /ui >}} and {{< ui >}}Sampling Rate{{< /ui >}} to control which sessions are evaluated.
1. In the {{< ui >}}System Prompt{{< /ui >}} field, enter the static instructions to the LLM judge—for example, the criteria the judge should use and the output it should produce. The System Prompt does not resolve `{{ ... }}` placeholders.
1. In the {{< ui >}}User{{< /ui >}} message, write the prompt that injects session data using `{{traces...}}` paths. The autocomplete dropdown adapts to session scope and lists fields available on the selected sample session. The `{{span_input}}` and `{{span_output}}` aliases are not available in session scope—reference span data through the `traces` array instead. Common patterns:

   ```
   {{traces}}                                              # JSON of every trace in the session
   {{traces[0].spans[0].meta.input.value}}                 # First span of the first trace
   {{traces[*].spans[*].name}}                             # All span names, joined with newlines
   {{traces[meta.span.kind:llm].spans[*].meta.output.value}}  # LLM outputs across the session
   {{*}}                                                   # Entire session payload as JSON
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/session_level_prompt_editor.png" alt="The User prompt editor for a session-level evaluation, with the autocomplete dropdown listing traces-prefixed fields after typing two open braces." style="width:100%;" >}}

1. Pick a sample session from the panel on the right. The pane lists the traces in that session, with the fields referenced by your prompt highlighted.

   {{< img src="llm_observability/evaluations/session_level_sample_session.png" alt="The configuration page in session scope, with the sample session pane on the right showing traces and highlighted span fields." style="width:100%;" >}}

   Clicking on a session then lists the traces in that session, with the fields referenced by your prompt highlighted.

   {{< img src="llm_observability/evaluations/session_level_sample_session_trace_view.png" alt="The configuration page in session scope, with the sample session pane on the right showing traces and highlighted span fields." style="width:100%;" >}}


1. Click {{< ui >}}Test Evaluation{{< /ui >}} to run the prompt against the selected session and preview the LLM judge's output before saving.
1. Continue with the rest of the [evaluation configuration][5] (output type, assessment criteria) and {{< ui >}}Save and Publish{{< /ui >}} to start running the evaluation against new sessions.

## Session completion

A session-level evaluation triggers after Datadog considers a session complete. A session is complete after 30 minutes of inactivity—that is, 30 minutes have passed with no new spans arriving for that session (measured from the most recent span).

When the session completes, the evaluation runs once with every trace and every span in those traces from that session available in the judge prompt. Any spans that arrive more than 30 minutes after the previous span on a session are not included in the session-level evaluation.

## View results

After a session completes, its evaluation result is attached to the session and is available across LLM Observability in near-real-time. While the session is still within its 30-minute inactivity window, the result shows up as {{< ui >}}Pending{{< /ui >}} in the side panel; after the session completes, the pending row is replaced by the final result.

Unfold the {{< ui >}}Session evaluations{{< /ui >}} on a session to see every evaluation that ran for it, alongside the LLM judge's reasoning when {{< ui >}}Enable Reasoning{{< /ui >}} was turned on at configuration time. The reasoning explains *why* the judge produced that value and references specific trace or span fields it relied on—use it to triage individual failures and decide whether to refine the prompt or accept the verdict.

{{< img src="llm_observability/evaluations/session_level_eval_results.png" alt="A session detail panel with the Session evaluations section expanded. The table lists eight evaluations — including goal completeness, toxicity, topic relevancy, tool selection, sentiment, and prompt injection — each with an outcome value shown as a colored badge (such as True, Not Toxic, or On Topic) and a preview of the LLM judge's reasoning." style="width:100%;" >}}

## Example prompts

### 1. Session goal completeness

Score whether the user accomplished what they came to do across the entire session, including follow-up turns in separate traces.

**System Prompt**
```
You are evaluating an LLM chatbot session. You will see every trace in the session, including all user messages and assistant responses across turns.

Decide whether the user's goals were fully met by the end of the session. Consider:
- All distinct intents the user expressed during the session
- Whether follow-up questions indicate unresolved needs
- Whether the final state of the conversation leaves the user satisfied

Respond with one of: completed, partially_completed, failed.
```

**User**
```
Session traces:
{{traces}}
```

The managed [Goal Completeness][11] template evaluation implements this pattern.

### 2. Multi-turn conversation quality

Evaluate coherence, context retention, and tone across the full session rather than a single exchange.

**System Prompt**
```
You will see a multi-turn chat session between a user and an assistant across multiple traces.

Evaluate the session as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether tone and helpfulness stayed consistent

Output one of: excellent, good, mixed, poor.
```

**User**
```
User and assistant messages across the session:
{{traces[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[meta.span.kind:llm].meta.output.messages[*].content}}
```

### 3. User behavior and frustration signals

Detect behavioral patterns that only emerge when viewing the full session.

**System Prompt**
```
Analyze this user session for signs of frustration, confusion, or abandonment.

Look for:
- Repeated or rephrased questions on the same topic
- Explicit expressions of dissatisfaction
- The user stopping after an incomplete or unhelpful answer

Output one of: no_issues, mild_frustration, high_frustration, abandoned.
```

**User**
```
Full session:
{{traces}}
```

### 4. Agent consistency across a session

Check whether the agent maintained quality and policy compliance across every turn in the session.

**System Prompt**
```
You will see all traces from one agent session. Assess whether the agent performed consistently:

- Did later turns contradict earlier correct answers?
- Did the agent recover from errors, or repeat the same mistake?
- Were safety and policy guidelines followed on every turn?

Respond with: consistent, mixed, inconsistent.
```

**User**
```
Session traces (chronological):
{{traces}}
```

## Choosing the right scope

| Scope | What the judge sees | Typical blind spot |
|---|---|---|
| Span | One span's input and output | No cross-span or cross-trace context |
| Trace | All spans in one trace | No prior or later turns in the same chat session |
| Session | All traces (and spans) in a session | — |

Use {{< ui >}}Session{{< /ui >}} scope when the evaluation needs context from more than one trace in the same user session:

- User satisfaction — whether the session as a whole met the user's intent, not just the last reply.
- Multi-turn coherence — whether the assistant stayed on topic, maintained tone, and carried forward relevant context across turns that live in different traces.
- User behavior over time — patterns such as frustration, confusion, topic switching, or giving up before the agent finished helping.
- Agent performance across a session — consistency, regression after tool failures, or whether the agent recovered from mistakes in a later turn.

Use {{< ui >}}Trace{{< /ui >}} scope when the answer depends on steps within a single request—for example, tool-call ordering, RAG faithfulness within one workflow run, or goal completion for one agent invocation. See [Trace-Level Evaluations][10].

Use {{< ui >}}Span{{< /ui >}} scope when the evaluation can be answered from one span in isolation—for example, scoring a single LLM response, classifying intent on one message, or validating tool arguments on one call.

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
[9]: /llm_observability/instrumentation/sdk/#tracking-user-sessions
[10]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations
[11]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations/#goal-completeness
