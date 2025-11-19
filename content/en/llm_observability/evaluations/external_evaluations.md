---
title: External Evaluations
aliases:
    - /tracing/llm_observability/submit_evaluations
    - /llm_observability/submit_evaluations
    - /llm_observability/evaluations/submit_evaluations
further_reading:
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

<div class="alert alert-info">Evaluation labels must be unique for a given LLM application (<code>ml_app</code>) and organization.</div>

## Submitting external evaluations with the SDK

The LLM Observability SDK provides the methods `LLMObs.submit_evaluation()` and `LLMObs.export_span()` to help your traced LLM application submit external evaluations to LLM Observability. See the [Python][3] or [Node.js][4] SDK documentation for more details.

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
        tags={"reasoning": "it makes sense", "type": "custom"},
    )
{{< /code-block >}}


## Submitting external evaluations with the API

You can use the evaluations API provided by LLM Observability to send evaluations associated with spans to Datadog. See the [Evaluations API][2] for more details on the API specifications.

### Example

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "cdfc4fc7-e2f6-4149-9c35-edc4bbf7b525",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "span_id": "20245611112024561111",
          "trace_id": "13932955089405749200",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3
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
