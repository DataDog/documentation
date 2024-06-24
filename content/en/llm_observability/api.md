---
title: LLM Observability API Reference
aliases:
    - /tracing/llm_observability/api
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability is not available in the US1-FED site.
</div>
{{% /site-region %}}

## Overview

The LLM Observability API provides an interface for developers to send LLM-related traces and spans to Datadog. If your application is written in Python, you can use the [LLM Observability SDK for Python][1].

## Spans API

Use this endpoint to send spans to Datadog. For details on the available kinds of spans, see [Span Kinds][2].

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`

Method
: `POST`

### Request

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Body data (required)

{{< tabs >}}
{{% tab "Model" %}}
| Field | Type | Description                  |
|-------|------------------------------|------|
| data [*required*]|  [SpansRequestData](#spansrequestdata) | Entry point into the request body. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "span",
    "attributes": {
      "ml_app": "weather-bot",
      "session_id": "1",
      "tags": [
        "service:weather-bot",
        "env:staging",
        "user_handle:example-user@example.com",
        "user_id:1234"
      ],
      "spans": [
        {
          "parent_id": "undefined",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<AGENT_SPAN_ID>",
          "name": "health_coach_agent",
          "meta": {
            "kind": "agent",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value": "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 10000000000
        },
        {
          "parent_id": "<AGENT_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<WORKFLOW_ID>",
          "name": "qa_workflow",
          "meta": {
            "kind": "workflow",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value":  "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 5000000000
        },
        {
          "parent_id": "<WORKFLOW_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<LLM_SPAN_ID>",
          "name": "generate_response",
          "meta": {
            "kind": "llm",
            "input": {
              "messages": [
                {
                  "role": "system",
                  "content": "Your role is to ..."
                },
                {
                  "role": "user",
                  "content": "What is the weather like today and do i wear a jacket?"
                }
              ]
            },
            "output": {
              "messages": [
                {
                  "content": "It's very hot and sunny, there is no need for a jacket",
                  "role": "assistant"
                }
              ]
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 2000000000
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Response
If the request is successful, the API responds with a 202 network code and an empty body.

### API standards

#### Error
| Field   | Type   | Description        |
|---------|--------|--------------------|
| message | string | The error message. |
| stack   | string | The stack trace.   |
| type    | string | The error type.    |

#### IO
| Field   | Type   | Description  |
|---------|--------|--------------|
| value   | string | Input or output value. This should be used for all spans except for LLM spans. |
| messages| [[Message](#message)] | List of messages. This should only be used for LLM spans. |

#### Message
| Field                | Type   | Description              |
|----------------------|--------|--------------------------|
| content [*required*] | string | The body of the message. |
| role                 | string | The role of the entity.  |

#### Meta
| Field       | Type              | Description  |
|-------------|-------------------|--------------|
| kind [*required*]    | string | The [span kind][2]: `"agent"`, `"workflow"`, `"llm"`, `"tool"`, `"task"`, `"embedding"`, or `"retrieval"`.      |
| error       | [Error](#error)             | Error information on the span.              |
| input       | [IO](#io)                | The span's input information.               |
| output      | [IO](#io)                | The span's output information.              |
| metadata    | Dict[key (string), value] where the value is a float, bool, or string | Data about the span that is not input or output related. Use the following metadata keys for LLM spans: `temperature`, `max_tokens`, `model_name`, and `model_provider`. |

#### Metrics
| Field                  | Type    | Description  |
|------------------------|---------|--------------|
| prompt_tokens          | float64 | The number of prompt tokens. **Only valid for LLM spans.**      |
| completion_tokens      | float64 | The number of completion tokens. **Only valid for LLM spans.**     |
| total_tokens           | float64 | The total number of tokens associated with the span. **Only valid for LLM spans.**   |
| time_to_first_token    | float64 | The time in seconds it takes for the first output token to be returned in streaming-based LLM applications. Set for root spans. |
| time_per_output_token  | float64 | The time in seconds it takes for the per output token to be returned in streaming-based LLM applications. Set for root spans. |

#### Span

| Field       | Type              | Description         |
|-------------|-------------------|---------------------|
| name [*required*]       | string            | The name of the span.          |
| span_id [*required*]     | string            | An ID unique to the span.       |
| trace_id  [*required*]   | string            | A unique ID shared by all spans in the same trace.     |
| parent_id  [*required*]    | string | ID of the span's direct parent. If the span is a root span, the `parent_id` must be `undefined`. |
| start_ns [*required*]     | uint64            | The span's start time in nanoseconds.     |
| duration  [*required*]     | float64           | The span's duration in nanoseconds.          |
| meta [*required*]         | [Meta](#meta)              | The core content relative to the span.       |
| status      | string            | Error status (`"ok"` or `"error"`). Defaults to `"ok"`.      |
| metrics     | [Metrics](#metrics)           | Datadog metrics to collect.         |
| session_id  | string     | The span's `session_id`. Overrides the top-level `session_id` field.    |
| tags        | [[Tag](#tag)] | A list of tags to apply to this particular span.       |

#### SpansRequestData
| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| type [*required*]        | string                        | Identifier for the request. Set to `span`. |
| attributes [*required*]  | [SpansPayload](#spanspayload) | The body of the request.  |

#### SpansPayload
| Field    | Type                | Description  |
|----------|---------------------|--------------|
| ml_app [*required*] | string              | The name of your LLM application. See [Application naming guidelines](#application-naming-guidelines).     |
| spans [*required*]  | [[Span](#span)] | A list of spans.           |
| tags                | [[Tag](#tag)]   | A list of top-level tags to apply to each span.        |
| session_id          | string              | The session the list of spans belongs to. Can be overridden or set on individual spans as well. |

#### Tag

Tags should be formatted as a list of strings (for example, `["user_handle:dog@gmail.com", "app_version:1.0.0"]`). They are meant to store contextual information surrounding the span.

For more information about tags, see [Getting Started with Tags][3].

#### Application naming guidelines

Your application name (the value of `DD_LLMOBS_ML_APP`) must be a lowercase Unicode string. It may contain the characters listed below:

- Alphanumerics
- Underscores
- Minuses
- Colons
- Periods
- Slashes

The name can be up to 193 characters long and may not contain contiguous or trailing underscores.

## Evaluations API

Use this endpoint to send evaluations associated with a given span to Datadog.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/eval-metric`

Method
: `POST`

Evaluations require a `span_id` and `trace_id`.
- If you are not using the LLM Observability SDK, send the `span_id` and `trace_id` that you used to create your target span.
- If you are using the LLM Observability SDK, obtain the `span_id` and `trace_id` by finding your target span, and accessing the `root_span.span_id` and the `root_span.trace_id` attributes.

### Request

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Body data (required)

{{< tabs >}}
{{% tab "Model" %}}
| Field | Type | Description                  |
|-------|------------------------------|------|
| data [*required*]  | [EvalMetricsRequestData](#evalmetricsrequestdata) | Entry point into the request body. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "span_id": "61399242116139924211",
          "trace_id": "13932955089405749200",
          "timestamp_ms": 1609459200,
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
{{% /tab %}}
{{< /tabs >}}

### Response

{{< tabs >}}
{{% tab "Model" %}}
| Field   | Type                        | Description                              | Guaranteed |
|---------|-----------------------------|------------------------------------------|------------|
| ID      | string                      | Response UUID generated upon submission. | Yes        |
| metrics | [[EvalMetric](#evalmetric)] | A list of evaluations.                   | Yes        |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "d4f36434-f0cd-47fc-884d-6996cee26da4",
          "span_id": "61399242116139924211",
          "trace_id": "13932955089405749200",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "id": "cdfc4fc7-e2f6-4149-9c35-edc4bbf7b525",
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
{{% /tab %}}
{{< /tabs >}}

### API standards

#### Attribute

| Field   | Type         | Description                                         |
|---------|--------------|-----------------------------------------------------|
| metrics [*required*] | [[EvalMetric](#evalmetric)] | A list of evaluations each associated with a span. |
| tags        | [[Tag](#tag)] | A list of tags to apply to all the evaluations in the payload.       |

#### EvalMetric

| Field                  | Type   | Description  |
|------------------------|--------|--------------|
| ID                     | string | Evaluation metric UUID (generated upon submission). |
| span_id [*required*]    | string | The ID of the span that this evaluation is associated with. |
| trace_id [*required*]   | string | The ID of the trace that this evaluation is associated with. |
| timestamp_ms [*required*] | int64  | A UTC UNIX timestamp in milliseconds representing the time the request was sent. |
| ml_app [*required*] | string | The name of your LLM application. See [Application naming guidelines](#application-naming-guidelines). |
| metric_type [*required*]| string | The type of evaluation: `"categorical"` or `"score"`. |
| label [*required*]      | string | The unique name or label for the provided evaluation . |
| categorical_value [*required if the metric_type is "score"*]    | string | A string representing the category that the evaluation belongs to. |
| score_value [*required if the metric_type is "score"*]    | number | A score value of the evaluation. |
| tags        | [[Tag](#tag)] | A list of tags to apply to this particular evaluation metric.       |

#### EvalMetricsRequestData

| Field      | Type            | Description  |
|------------|-----------------|--------------|
| type [*required*]      | string | Identifier for the request. Set to `evaluation_metric`. |
| attributes [*required*] | [[EvalMetric](#evalmetric)] | The body of the request. |

[1]: /llm_observability/sdk/
[2]: /llm_observability/span_kinds/
[3]: /getting_started/tagging/
