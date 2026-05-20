---
title: External Evaluations
description: Submit custom evaluations to LLM Observability using the Python SDK or the LLM Observability API to track user feedback and response quality.
aliases:
    - /tracing/llm_observability/submit_evaluations
    - /llm_observability/submit_evaluations
    - /llm_observability/evaluations/submit_evaluations
further_reading:
    - link: '/llm_observability/guide/evaluation_developer_guide'
      tag: 'Documentation'
      text: 'Learn about building custom evaluators'
    - link: '/llm_observability/setup/sdk'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Python'
    - link: '/llm_observability/setup/api'
      tag: 'Documentation'
      text: 'Learn about the Evaluations API'
    - link: '/llm_observability/evaluations/submit_nemo_evaluations'
      tag: 'Documentation'
      text: 'Learn about submitting evaluations from NVIDIA NeMo'
---

## Overview

In the context of LLM applications, it's important to track user feedback and evaluate the quality of your LLM application's responses.
While LLM Observability provides a few out-of-the-box evaluations for your traces, you can submit your own evaluations to LLM Observability in two ways: with Datadog's [SDK](#submitting-evaluations-with-the-sdk), or with the [LLM Observability API](#submitting-evaluations-with-the-api). Use this naming convention for the evaluation label:

* Evaluation labels must start with a letter.
* Evaluation labels must only contain ASCII alphanumerics or underscores.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is not supported.
* Evaluation labels must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

<div class="alert alert-info">

Evaluation labels must be unique for a given LLM application (<code>ml_app</code>) and organization.

</div>

## Submitting external evaluations with the SDK

The LLM Observability SDK provides the methods `LLMObs.submit_evaluation()` and `LLMObs.export_span()` to help your traced LLM application submit external evaluations to LLM Observability. See the [Python][3] or [Node.js][4] SDK documentation for more details.

<div class="alert alert-info">For building reusable, class-based evaluators with rich result metadata, see the <a href="/llm_observability/guide/evaluation_developer_guide/">Evaluation Developer Guide</a>.</div>

### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

def my_harmfulness_eval(input: Any) -> float:
  score = ... # custom harmfulness evaluation logic

  return score

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score", # can be score or categorical
        value=my_harmfulness_eval(completion),
        tags={"type": "custom"},
        timestamp_ms=1765990800016, # optional, unix timestamp in milliseconds
        assessment="pass", # optional, "pass" or "fail"
        reasoning="it makes sense", # optional, judge llm reasoning
    )
{{< /code-block >}}


## Submitting external evaluations with the API

You can use the evaluations API provided by LLM Observability to send evaluations to Datadog at the span, trace, or session level. See the [Evaluations API][2] for more details on the API specifications. For building reusable evaluators, see the [Evaluation Developer Guide][5].

Use the `eval_scope` field to control the granularity of the evaluation:
- **`span`** (default): Associates the evaluation with a specific span, identified by `join_on`.
- **`trace`**: Associates the evaluation with an entire trace, identified by `join_on` pointing to the root span.
- **`session`**: Associates the evaluation with a session, identified by `session_id`. Do not include `join_on` for session-scoped evaluations.

To submit evaluations for <a href="/llm_observability/instrumentation/otel_instrumentation">OpenTelemetry spans</a> directly to the Evaluations API, you must include the <code>source:otel</code> tag in the evaluation. Additionally, <code>span_id</code> and <code>trace_id</code> values must be provided as **decimal** strings. If your OpenTelemetry instrumentation produces hexadecimal IDs, convert them to decimal before submitting. For example, in Python: <code>str(int(hex_span_id, 16))</code>.

### Example

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "eval_scope": "span",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "pass",
          "reasoning": "it makes sense"
        },
        {
          "eval_scope": "trace",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "score",
          "label": "Overall Quality",
          "score_value": 4,
          "assessment": "pass"
        },
        {
          "eval_scope": "session",
          "session_id": "abc123def456",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "categorical",
          "label": "Session Outcome",
          "categorical_value": "Resolved"
        }
      ]
    }
  }
}
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/#naming-custom-metrics
[2]: /llm_observability/setup/api/?tab=model#evaluations-api
[3]: /llm_observability/setup/sdk/python/#evaluations
[4]: /llm_observability/setup/sdk/nodejs/#evaluations
[5]: /llm_observability/guide/evaluation_developer_guide
