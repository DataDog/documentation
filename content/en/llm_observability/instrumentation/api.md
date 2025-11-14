---
title: HTTP API Reference
aliases:
    - /tracing/llm_observability/api
    - /llm_observability/api
    - /llm_observability/setup/api
---

## Overview

The LLM Observability HTTP API provides an interface for developers to send LLM-related traces and spans to Datadog. If your application is written in Python, Node.js, or Java, you can use the [LLM Observability SDKs][1].

The API accepts spans with timestamps no more than 24 hours old, allowing limited backfill of delayed data.

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
| value   | string | Input or output value. If not set, this value is inferred from messages or documents. |
| messages| [Message](#message) | List of messages. This should only be used for LLM spans. |
| documents| [Document](#document) | List of documents. This should only be used as the output for retrieval spans |
| prompt | [Prompt](#prompt) | Structured prompt metadata that includes the template and variables used for the LLM input. This should only be used for input IO on LLM spans. |


**Note**: When only `input.messages` is set for an LLM span, Datadog infers `input.value` from `input.messages` and uses the following inference logic:

1. If a message with `role=user` exists, the content of the last message is used as `input.value`.
1. If a `user` role message is not present, `input.value` is inferred by concatenating the content fields of all messages, regardless of their roles.

#### Message

| Field                | Type   | Description              |
|----------------------|--------|--------------------------|
| content [*required*] | string | The body of the message. |
| role                 | string | The role of the entity.  |

#### Document
| Field                | Type   | Description              |
|----------------------|--------|--------------------------|
| text | string | The text of the document. |
| name    | string | The name of the document.  |
| score | float | The score associated with this document. |
| id    | string | The id of this document.  |

#### Prompt

<div class="alert alert-info">LLM Observability registers new versions of templates when the <code>template</code> or <code>chat_template</code> value is updated. If the input is expected to change between invocations, extract the dynamic parts into a variable.</div>

{{< tabs >}}
{{% tab "Model" %}}
| Field                | Type   | Description              |
|----------------------|--------|--------------------------|
| id    | string | Logical identifier for this prompt template. Should be unique per `ml_app`.  |
| version | string | Version tag for the prompt (for example, "1.0.0"). If not provided, LLM Observability automatically generates a version by computing a hash of the template content. |
| template | string | Single string template form. Use placeholder syntax (like `{{variable_name}}`) to embed variables. This should not be set with `chat_template`. |
| chat_template | [[Message]](#message) | Multi-message template form. Use placeholder syntax (like `{{variable_name}}`) to embed variables in message content. This should not be set with `template`. |
| variables | Dict[key (string), string] | Variables used to render the template. Keys correspond to placeholder names in the template. |
| query_variable_keys | [string] | Variable keys that contain the user query. Used for hallucination detection. |
| context_variable_keys | [string] | Variable keys that contain ground-truth or context content. Used for hallucination detection. |
| tags | Dict[key (string), string] | Tags to attach to the prompt run. |

{{% /tab %}}
{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "id": "translation-prompt",
  "chat_template": [
    {
      "role": "system",
      "content": "You are a translation service. You translate to {{language}}."
    }, {
      "role": "user",
      "content": "{{user_input}}"
    }
  ],
  "variables": {
    "language": "french",
    "user_input": "<USER_INPUT_TEXT>"
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

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
| input_tokens           | float64 | The number of input tokens. **Only valid for LLM spans.**      |
| output_tokens          | float64 | The number of output tokens. **Only valid for LLM spans.**     |
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
| apm_trace_id | string      | The ID of the associated APM trace. Defaults to match the `trace_id` field.   |
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
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

Method
: `POST`

Evaluations must be joined to a unique span. You can identify the target span using either of these two methods:
1. Tag-based joining - Join an evaluation using a custom tag key-value pair that uniquely identifies a single span.
2. Direct span reference - Join an evaluation using the span's unique trace ID and span ID combination.


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
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive",
        },
        {
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
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
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
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
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### API standards

#### Attributes

| Field   | Type         | Description                                         |
|---------|--------------|-----------------------------------------------------|
| metrics [*required*] | [[EvalMetric](#evalmetric)] | A list of evaluations each associated with a span. |
| tags        | [[Tag](#tag)] | A list of tags to apply to all the evaluations in the payload.       |

#### EvalMetric

| Field                  | Type   | Description  |
|------------------------|--------|--------------|
| ID                     | string | Evaluation metric UUID (generated upon submission). |
| join_on [*required*]    | [[JoinOn](#joinon)] | How the evaluation is joined to a span. |
| timestamp_ms [*required*] | int64  | A UTC UNIX timestamp in milliseconds representing the time the request was sent. |
| ml_app [*required*] | string | The name of your LLM application. See [Application naming guidelines](#application-naming-guidelines). |
| metric_type [*required*]| string | The type of evaluation: `"categorical"` or `"score"`. |
| label [*required*]      | string | The unique name or label for the provided evaluation . |
| categorical_value [*required if the metric_type is "categorical"*]    | string | A string representing the category that the evaluation belongs to. |
| score_value [*required if the metric_type is "score"*]    | number | A score value of the evaluation. |
| assessment | string | An assessment of this evaluation. Accepted values are `pass` and `fail`. |
| reasoning | string | A text explanation of the evaluation result. |
| tags        | [[Tag](#tag)] | A list of tags to apply to this particular evaluation metric.       |

#### JoinOn

| Field      | Type            | Description  |
|------------|-----------------|--------------|
| span | [[Span](#SpanContext)] | Uniquely identifies the span associated with this evaluation using span ID & trace ID. |
| tag | [[Tag](#TagContext)] | Uniquely identifies the span associated with this evaluation using a tag key-value pair. |

#### SpanContext

| Field      | Type            | Description  |
|------------|-----------------|--------------|
| span_id | string | The span ID of the span that this evaluation is associated with. |
| trace_id | string | The trace ID of the span that this evaluation is associated with. |

#### TagContext

| Field      | Type            | Description  |
|------------|-----------------|--------------|
| key | string | The tag key name. This must be the same key used when setting the tag on the span.  |
| value | string | The tag value. This value must match exactly one span with the specified tag key/value pair. |


#### EvalMetricsRequestData

| Field      | Type            | Description  |
|------------|-----------------|--------------|
| type [*required*]      | string | Identifier for the request. Set to `evaluation_metric`. |
| attributes [*required*] | [[Attributes](#attributes)] | The body of the request. |

[1]: /llm_observability/setup/sdk/
[2]: /llm_observability/terms/
[3]: /getting_started/tagging/
