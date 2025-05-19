---
title: Submit Evaluations
aliases:
    - /tracing/llm_observability/submit_evaluations
further_reading:
    - link: '/llm_observability/setup/sdk'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Python'
    - link: '/llm_observability/setup/api'
      tag: 'Documentation'
      text: 'Learn about the Evaluations API'
    - link: '/llm_observability/submit_nemo_evaluations'
      tag: 'Documentation'
      text: 'Learn about submitting evaluations from NVIDIA NeMo'
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

In the context of LLM applications, it's important to track user feedback and evaluate the quality of your LLM application's responses.
While LLM Observability provides a few out-of-the-box evaluations for your traces, you can submit your own evaluations to LLM Observability in two ways: with Datadog's [Python SDK](#submitting-evaluations-with-the-sdk), or with the [LLM Observability API](#submitting-evaluations-with-the-api). See [Naming custom metrics][1] for guidelines on how to choose an appropriate label for your evaluations.

## Submitting evaluations with the SDK

The LLM Observability SDK provides the methods `LLMObs.submit_evaluation_for()` and `LLMObs.export_span()` to help your traced LLM application submit evaluations to LLM Observability. See [submitting evaluations][3] in the SDK documentation for details.

### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # tag your span with a `msg_id`
    msg_id = get_msg_id()
    LLMObs.annotate(
        tags = {'msg_id': msg_id}
    )

    # submit an evaluation on a span tagged with a matching `msg_id`
    LLMObs.submit_evaluation_for(
        span_with_tag_value = {
            "tag_key": "msg_id",
            "tag_value": msg_id
        },
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
    )
{{< /code-block >}}


## Submitting evaluations with the API

You can use the evaluations API provided by LLM Observability to send evaluations associated with spans to Datadog. See the [Evaluations API][4] for more details on the API specifications.

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
[2]: /llm_observability/setup/sdk/#exporting-a-span
[3]: /llm_observability/setup/sdk/#submit-evaluations
[4]: /llm_observability/setup/api/?tab=model#evaluations-api
