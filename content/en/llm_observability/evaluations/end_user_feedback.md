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

To create a dashboard widget for feedback, create the widget as you would for an evaluation and add the filter `@event_kind:feedback`. To search and filter spans and traces by feedback directly, see [Search and filter by feedback in the Trace Explorer](#search-and-filter-by-feedback-in-the-trace-explorer).

### Search and filter by feedback in the Trace Explorer

You can filter spans and traces in the LLM Observability Trace Explorer using the `@feedback.<label>.<field>` query syntax. Feedback events are stored separately from spans and are joined at query time, so feedback submitted after the span's time window remains discoverable.

#### Query syntax

Use `@feedback.<label>.<field>:<value>` to filter the Trace Explorer. For example:

- `@feedback.thumbs.value:down`: spans that received a thumbs-down rating
- `@feedback.user_comment.assessment:fail`: spans with a failing assessment in the `user_comment` label
- `_missing_:@feedback.quality.reasoning`: spans that have a `quality` feedback event but are missing a `reasoning` field

Supported field paths include:

| Field | Description |
|-------|-------------|
| `value` | The logical feedback value; matches across categorical, boolean, numerical, score, and text types. Use `@feedback.<label>.value.nested.path` to query into a JSON value. |
| `reasoning` | Free-text reasoning string. |
| `assessment` | pass/fail assessment. |
| `status` | Status string. |
| `action` | Action string. |
| `eval_metric_type` | Metric type (categorical, boolean, numerical, score, text, json). |
| `eval_scope` | span, trace, session, or external. |
| `feedback_join_key` | The external join key. |
| `metadata.*` | Any metadata subpath. |
| `error.*` | Error fields. |
| `submitter.*` | Submitter fields (for example, `submitter.id`, `submitter.type`). |
| `tags` | Tags array. |

Supported operators include equality (`:value`), range (`>`, `<`, `[X TO Y]`), wildcards (`*`, `?`), `_exists_:@feedback.<label>.<field>`, and `_missing_:@feedback.<label>.<field>`.

#### Limitations

- `@feedback.*` fields cannot be used for projection (table columns), sort, timeseries aggregation, timeseries group-by, or multi-run queries.
- Feedback filters cannot be combined with other query backends using `OR` or `NOT` at the top level. For example, `service:checkout OR @feedback.quality.value:good` is not supported; use `service:checkout @feedback.quality.value:good` (AND) instead.
- `_missing_:@feedback.<label>.<field>` requires a feedback event with the label to exist; a span with no feedback events for the label does not match.

### Feedback facets

The Trace Explorer sidebar includes a **Feedback** group that automatically discovers feedback labels from your active dataset. One `.value` facet is created per eligible label:

| `eval_metric_type` | Facet type |
|--------------------|-----------|
| `numerical`, `score` | Range |
| `categorical`, `boolean`, `text` | List |
| `json`, `object`, or unknown | No root-value facet (use `@feedback.<label>.value.path` queries directly) |

Feedback facets are not opened by default. A warning is shown when more than 100 feedback labels are discovered; only the first 100 are shown as facets.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/evaluations/external_evaluations
[2]: /llm_observability/evaluations/annotation_queues
[3]: /llm_observability/instrumentation/api/#evaluations-api
[4]: /llm_observability/instrumentation/sdk/?tab=python#enriching-spans
[5]: /llm_observability/instrumentation/api/?tab=model#spans-api
