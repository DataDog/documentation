---
title: LLM Observability API
---
<div class="alert alert-warning">LLM Observability is in public beta, and this API is subject to change. If changes occur, Datadog will provide release notes with any applicable upgrade instructions.</a></div>

## Spans endpoint
Send spans to Datadog.

URL
: `https://api.<DATADOG_SITE>/api/unstable/llm-obs/v1/trace/spans`
<br />Replace `<DATADOG_SITE>` with your Datadog site (for example, `datadoghq.com` or `us3.datadoghq.com`).

Method
: `POST`

### Request

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Body data (required)

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| type [*required*]        | string                        | Identifier for the request. Set to `span`. |
| attributes [*required*]  | [SpansPayload](#spanspayload) | The body of the request.                   |

#### Example request body

TODO

### Data schemas

#### `Error`
| Field   | Type   | Description        |
|---------|--------|--------------------|
| message | string | The error message. |
| stack   | string | The stack trace.   |
| type    | string | The error type.    |

#### `IO`
| Field   | Type   | Description  |
|---------|--------|--------------|
| value   | string | Input or output value. This should be used for all spans except for `llm` spans |
| messages| [Message](#message) | List of messages. This should only be used for llm spans |

#### `Message`
| Field                | Type   | Description              |
|----------------------|--------|--------------------------|
| role                 | string | The role of the entity.  |
| content [*required*] | string | The body of the message. |

#### `Meta`
| Field       | Type              | Description  |
|-------------|-------------------|--------------|
| kind [*required*]    | oneof={agent, workflow, llm, tool, task, embedding, retrieval} | Denotes the span kind.     |
| error       | [Error](#error)             | Holds error information on the span.              |
| input       | [IO](#io)                | Holds the span's input information.               |
| output      | [IO](#io)                | Holds the span's output information.              |
| metadata    | Dict[key (str), val] Where val is a float, bool, or string | Stores data about the span that is not input/output related. Use the following metadata keys for llm spans: temperature, max_tokens, model_name, model_provider. |

#### `Metrics`
| Field                  | Type    | Description  |
|------------------------|---------|--------------|
| prompt_tokens          | float64 | The number of prompt tokens. Only valid for llm spans.      |
| completion_tokens      | float64 | The number of completion tokens. Only valid for llm spans.     |
| total_tokens           | float64 | The total number of tokens associated with the span. Only valid for llm spans.   |
| time_to_first_token    | float64 | The time in seconds it takes for the first output token to be returned in streaming based llm apps. Set for root spans. |
| time_per_output_token  | float64 | The time in seconds it takes for the per output token to be returned in streaming based llm apps. Set for root spans. |

#### `SpansPayload`
| Field    | Type                | Description  |
|----------|---------------------|--------------|
| ml_app [*required*] | string              | The name of your LLM application.      |
| spans [*required*]  | List[[span](#span)] | A list of spans.           |
| tags                | List[[tag](#tag)]   | A list of top level tags to apply to each span.        |
| session_id          | string              | The session the list of spans belongs to. Can be overridden or set on individual spans as well. |

#### `Span`
| Field       | Description         | Type              |
|-------------|---------------------|-------------------|
| name [*required*]       | The name of the span          | string            |
| span_id [*required*]     | A unique ID to the span       | string            | 
| trace_id  [*required*]   | A unique ID shared by all spans in the same trace     | string            | 
| parent_id  [*required*]    | ID of the span's direct parent. If the span is a root span, parent_id must be "undefined" | string | 
| start_ns [*required*]     | The span's start time in nanoseconds     | uint64            | 
| duration  [*required*]     | The span's duration in nanoseconds          | float64           |
| meta [*required*]         | Holds the core content relative to the span.       | [Meta](#meta)              | 
| status      | error status ('ok' or 'error'). Defaults to 'ok'.      | string            |
| metrics     | Datadog metrics to collect           | [Metrics](#metrics)           |
| session_id  | The span's session_id. Overrides top-level session_id field.    | string     | 
| tags        | A list of tags to apply to this particular span       | List of tag strings|

#### `Tag`

Tags should be formatted as a list of strings (for example, `["user_handle:dog@gmail.com", "app_version:1.0.0"]`). They are meant to store contextual information surrounding the span.

## Eval metrics endpoint
Send evaluation metrics for a span to Datadog.

URL
: `https://api.<DATADOG_SITE>/api/unstable/llm-obs/v1/eval-metric`
<br />Replace `<DATADOG_SITE>` with your Datadog site (for example, `datadoghq.com` or `us3.datadoghq.com`).

Method
: `POST`

### Request

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### Body data (required)

#### Example request

TODO

### Response

| Field   | Type         | Description                             | Guaranteed |
|---------|--------------|-----------------------------------------|------------|
| ID      | string      | Response UUID will be generated upon submission. | Yes        |
| metrics | [][EvalMetric](#evalmetric) | A list of eval metrics.          | Yes        |

### Data schemas

#### Attribute

| Field   | Type         | Description                                         |
|---------|--------------|-----------------------------------------------------|
| metrics [*required*] | [][EvalMetric](#evalmetric) | A list of eval metrics for a given prompt-response pair. |

#### EvalMetric

| Field                  | Type   | Description  |
|------------------------|--------|--------------|
| ID                     | string | Evaluation metric UUID will be generated upon submission. |
| span_id[*required*]    | string | The ID of the span that this eval metric will be associated with. This should be the span ID of the root span. |
| trace_id[*required*]   | string | The ID of the trace that this eval metric will be associated with. |
| timestamp              | int64  | A UTC unix timestamp representing the time the request was sent. |
| metric_type[*required*]| oneof{"categorical, score"} | The type of evaluation metric. |
| label[*required*]      | string | The unique name or label for the provided evaluation metric. |
| categorical_value [*required if the metric_type is "score"*]    | string | A string representing the category that the evaluation metric belongs to. |
| score_value [*required if the metric_type is "score"*]    | number | A score value of the evaluation metric. |
| flagged                | boolean| Flag content as inappropriate or incorrect. |
| annotation             | string | A generic string note about the provided evaluation metric. |