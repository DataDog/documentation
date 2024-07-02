---
title: 評価の送信
kind: ガイド
aliases:
    - /tracing/llm_observability/submit_evaluations
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability is not available in the US1-FED site.
</div>
{{% /site-region %}}

## 概要

In the context of LLM applications, it's important to track user feedback and evaluate the quality of your LLM application's responses.
While LLM Observability provides a few out-of-the-box evaluations for your traces, you can submit your own evaluations to LLM Observability in two ways: with Datadog's [Python SDK](#submitting-evaluations-with-the-sdk), or with the [LLM Observability API](#submitting-evaluations-with-the-api). See [Naming custom metrics][1] for guidelines on how to choose an appropriate label for your evaluations.

## Submitting evaluations with the SDK

To submit evaluations from your traced LLM application to Datadog, you'll need to associate it with a span using the below steps:

1. Extract the span context from the given span by using `LLMObs.export_span(span)`. If `span` is not provided (as when using function decorators), the SDK exports the current active span. See [Exporting a span][2] for more details.
2. Use `LLMObs.submit_evaluation()` with the extracted span context and evaluation information. See [Submitting evaluations][3] in the SDK documentation for details.

### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span_context,
        label="sentiment",
        metric_type="score",
        value=10,
    )
    return completion
{{< /code-block >}}


## Submitting evaluations with the API

You can use the evaluations API provided by LLM Observability to send evaluations associated with spans to Datadog. See the [Evaluations API][4] for more details on the API specifications.

### 例

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "span_id": "61399242116139924211",
          "trace_id": "13932955089405749200",
          "timestamp": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "span_id": "20245611112024561111",
          "trace_id": "13932955089405749200",
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3
        }
      ]
    }
  }
}
{{< /code-block >}}

[1]: /metrics/custom_metrics/#naming-custom-metrics
[2]: /llm_observability/sdk/#exporting-a-span
[3]: /llm_observability/sdk/#submit-evaluations
[4]: /llm_observability/api/?tab=model#evaluations-api
