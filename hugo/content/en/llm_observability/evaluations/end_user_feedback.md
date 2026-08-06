---
title: End-User Feedback
description: Submit end-user feedback to Agent Observability and connect it to spans, traces, sessions, or external entities.
further_reading:
    - link: '/llm_observability/instrumentation/api/#evaluations-api'
      tag: 'Documentation'
      text: 'Learn about the Evaluations API'
    - link: '/llm_observability/evaluations/external_evaluations'
      tag: 'Documentation'
      text: 'Learn about submitting external evaluations'
    - link: '/llm_observability/evaluations/annotation_queues'
      tag: 'Documentation'
      text: 'Learn about Annotation Queues'
---

## Overview

End-user feedback captures input from users of your LLM application in Agent Observability. Examples include thumbs-up or thumbs-down ratings, whether a user accepted an agent's change, and free-text comments about a response.

Feedback is different from an evaluation. Use feedback for signals submitted by an end user. Use [external evaluations][1] for results produced by your own evaluator logic, where who submitted the evaluation is not relevant. Use [Annotation Queues][2] for structured review workflows run by your team.

Submitted feedback appears when viewing Agent Observability sessions, traces, or spans.

## Submit feedback

Submit feedback with the [Evaluations API][3] by setting `event_kind` to `feedback`.

Feedback events require:

- `event_kind: "feedback"`
- `submitter.id`, which identifies the user or agent that submitted the feedback
- Exactly one target field: `span_id`, `trace_id`, `session_id`, or `feedback_join_key`
- A value field that matches `metric_type`

Feedback events must not include `join_on`. If `eval_scope` is omitted, Datadog infers it from the target field. If `eval_scope` is provided, it must match the selected target.

### Target feedback

| Target | Field | Use when |
|--------|-------|----------|
| Span | `span_id` | The feedback applies to one span. |
| Trace | `trace_id` | The feedback applies to an entire trace. |
| Session | `session_id` | The feedback applies to an entire session. |
| External entity | `feedback_join_key` | The feedback applies to a customer-defined entity, such as an incident ID, report ID, task ID, or release check ID. |

### Use a feedback join key

Use `feedback_join_key` when feedback is not tied to a single span, trace, or session. First, enrich your spans with the `feedback_join_key` tag related to the external entity using the SDK's [Enriching spans][4] workflow or the [Spans API][5]. Then, submit feedback with the same `feedback_join_key`.

## Examples

### Submit thumbs-down feedback for a span

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "span_id": "20245611112024561111",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "categorical",
          "label": "thumbs",
          "categorical_value": "down",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}

### Submit free-text feedback with a feedback join key

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "feedback_join_key": "incident-123",
          "ml_app": "incident-agent",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The investigation missed the customer impact.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}

## Analyze feedback

To create a dashboard widget for feedback, create the widget as you would for an evaluation and add the filter `@event_kind:feedback`. To search and filter spans and traces by feedback in the Trace Explorer, see [Feedback queries][6].

{{< img src="llm_observability/evaluations/feedback_widget_query.png" alt="The Datadog widget editor configured to count all evaluations filtered by @event_kind:feedback." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/evaluations/external_evaluations
[2]: /llm_observability/evaluations/annotation_queues
[3]: /llm_observability/instrumentation/api/#evaluations-api
[4]: /llm_observability/instrumentation/sdk/?tab=python#enriching-spans
[5]: /llm_observability/instrumentation/api/?tab=model#spans-api
[6]: /llm_observability/monitoring/querying/#feedback-queries
