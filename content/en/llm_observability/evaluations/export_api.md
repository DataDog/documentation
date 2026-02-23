---
title: Export API
---

## Overview

The LLM Observability Export API provides endpoints to retrieve span data. These endpoints allow you to programmatically access your LLM Observability data for running external evaluations and exporting spans for offline storage.

<div class="alert alert-info">By default, we export spans from the past 15 minutes. If you need to search outside of this timeframe, please specify a time range in your request.</div>

## Search spans

Use this endpoint to search and filter LLM Observability spans based on specific criteria.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events/search`

Method
: `POST`

### Request

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/vnd.api+json"`

#### Body data (required)

{{< tabs >}}
{{% tab "Model" %}}
| Field | Type | Description                  |
|-------|------------------------------|------|
| data[required] | [SearchSpansRequest](#searchspansrequest) | Entry point into the request body. |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "trace_id": "123456789",
        "span_kind": "llm",
        "tags": {
          "test-key": "correct-test-value"
        }
      },
      "page": {
        "limit": 2
      },
      "options": {
        "time_offset": 3600
      },
      "sort": "timestamp"
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Code example

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events/search" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/vnd.api+json" \
-d @- << EOF
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "span_id": "14624140233640368324"
      }
    }
  }
}
EOF
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## List spans

Use this endpoint to retrieve a list of LLM Observability spans.

Endpoint
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events`

Method
: `GET`

### Request

#### Headers (required)
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`

#### Query parameters

| Parameter | Type | Description                  |
|-------|------------------------------|------|
| filter[query] | string | Searches for spans using generic EVP query syntax. If no query filter is provided, the other filters take precedence. |
| filter[span_id] | string | Searches for a specific span by its span ID. |
| filter[trace_id] | string | Searches for spans by their trace ID. |
| filter[tag][key] | string | Searches for spans by tag key / value pairs. |
| filter[span_kind] | string | The span kind: "agent", "workflow", "llm", "tool", "task", "embedding", or "retrieval". |
| filter[span_name] | string | Searches for spans based on their provided name. |
| filter[ml_app] | string | Searches for spans submitted under a particular ML Application. |
| filter[from] | string | Minimum timestamp for requested spans. Supports date-time ISO8601, date math, and regular timestamps (milliseconds). Defaults to the current time minus 15 minutes. |
| filter[to] | string | Maximum timestamp for requested spans. Supports date-time ISO8601, date math, and regular timestamps (milliseconds). Defaults to the current time. |
| sort | string | Sort order. Allowed values: timestamp, -timestamp |
| page[cursor] | string | List following results with a cursor provided in the previous query. |
| page[limit] | integer | Maximum number of spans in the response. Default: 10. Maximum configurable limit: 5000. |

#### Code example

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
# searches for spans from the past 15 minutes
--data-urlencode "filter[trace_id]=6903738200000000af2d3775dfc70530"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Response

Both endpoints have the same response format. [Results are paginated](/logs/guide/collect-multiple-logs-with-pagination/).

{{< tabs >}}
{{% tab "Model" %}}
| Field   | Type                        | Description                              |
|---------|-----------------------------|------------------------------------------|
| data    | [[SearchedSpanResource](#searchedspanresource)]             | List of spans matching the search criteria. |
| meta    | [Meta](#meta)       | Metadata about the response.             |
| links    | [Links](#links)       | Links attributes.            |
{{% /tab %}}

{{% tab "Example" %}}
{{< code-block lang="json" >}}
{
  "data": [
    {
      "id": "14624140233640368324",
      "type": "span",
      "attributes": {
        "duration": 83000,
        "evaluation": {
          "failure_to_answer": {
              "eval_metric_type": "categorical",
              "value": "answered",
              "assessment": "pass",
              "status": "OK",
              "metadata": {
                  "_dd": {
                      "evaluation_kind": "failure_to_answer"
                  }
              },
              "llm_output": "answered"
          }
        },
        "input": {
          "value": "hi",
          "messages": [
            {
              "content": "hi",
              "role": "user"
            }
          ]
        },
        "metadata": {
          "test-key": "test-value"
        },
        "metrics": {
          "cache_read_input_tokens": 0,
          "cache_write_input_tokens": 0,
          "estimated_cache_read_input_cost": 0,
          "estimated_cache_write_input_cost": 0,
          "estimated_input_cost": 1500,
          "estimated_non_cached_input_cost": 1500,
          "estimated_output_cost": 6000,
          "estimated_total_cost": 7500,
          "input_tokens": 10,
          "non_cached_input_tokens": 10,
          "output_tokens": 10,
          "total_tokens": 20
        },
        "ml_app": "test-ml-app",
        "model_name": "gpt-4o-mini",
        "model_provider": "openai",
        "name": "llm_call_enriched",
        "output": {
          "value": "hello there",
          "messages": [
            {
              "content": "hello there",
              "role": "assistant"
            }
          ]
        },
        "parent_id": "undefined",
        "span_id": "14624140233640368324",
        "span_kind": "llm",
        "start_ns": 1761833858897,
        "status": "ok",
        "tags": [
          "service:test-service",
          "env:prod",
          "ddtrace.version:3.17",
          "test-key:test-value",
          "error:0",
          "source:llm-observability",
          "source:integration",
          "ml_app:test-ml-app",
          "version:",
          "language:python"
        ],
        "tool_definitions": [
          {
            "name": "test-tool",
            "description": "A test tool",
            "schema": {
              "test-key": "test-value"
            }
          }
        ],
        "trace_id": "6903738200000000af2d3775dfc70530"
      }
    }
  ],
  "meta": {
    "elapsed": 336,
    "request_id": "pddv1ChZucHRwTW96NFNfT3Z4bWFLTFBDWkR3Ii0KHYhY65R_1R21AyDpavSaeO2sul_V6omQLAyWutrzEgx-GnVDrZaMu-lW-Yc",
    "status": "done",
    "page": null
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## API standards

### SearchSpansRequest

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| type [*required*]        | string                        | Identifier for the request. Set to `spans`. |
| attributes [*required*]  | [SearchSpansPayload](#searchspanspayload) | The body of the request.  |

### SearchSpansPayload

| Field | Type | Description                  |
|-------|------------------------------|------|
| filter | [Filter](#filter) | The search and filter query settings. |
| options | [Options](#options) | Global query options that are used during the query. |
| page | [PageQuery](#pagequery) | Paging attributes for listing spans. |
| sort | string | Sort order. Allowed values: timestamp, -timestamp |

### Filter

| Field | Type | Description |
|-------|------|-------------|
| query | string | Searches for spans using generic EVP query syntax. If no query filter is provided, the other filters take precedence. |
| span_id | string | Searches for a specific span by its span ID. |
| trace_id | string | Searches for spans by their trace ID. |
| tags | Dict[key (string), string] | Search for spans by tag key / value pairs. |
| span_kind | string | The span kind: "agent", "workflow", "llm", "tool", "task", "embedding", or "retrieval". |
| span_name | string | Searches for spans based on their provided name. |
| ml_app | string | Search for spans submitted under a particular ML Application. |
| from | string | Minimum timestamp for requested spans. Supports date-time ISO8601, date math, and regular timestamps (milliseconds). Defaults to the current time minus 15 minutes. |
| to | string | Maximum timestamp for requested spans. Supports date-time ISO8601, date math, and regular timestamps (milliseconds). Defaults to the current time. |

### Options

| Field | Type | Description |
|-------|------|-------------|
| time_offset | integer | The time offset (in seconds) to apply to the query. |

### PageQuery

| Field | Type | Description |
|-------|------|-------------|
| limit | integer | Maximum number of spans in the response. Default: 10. Maximum configurable limit: 5000. |
| cursor | string | List following results with a cursor provided in the previous query. |

### SearchedSpanResource

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| type        | string                        | Type of the span. Allowed values: span. Default: span. |
| id       | string                        | Unique ID of the span. |
| attributes  | [SearchedSpan](#searchedspan) | Object containing all span attributes and their associated values.  |

### SearchedSpan

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| span_id        | string                        | An ID unique to the span. |
| trace_id        | string                        | A unique ID shared by all spans in the same trace. |
| parent_id        | string                        | ID of the span’s direct parent. |
| tags        | [string]                        | Array of tags associated with your span. |
| name        | string                       | The name of the span. |
| status        | string                       | Error status ("ok" or "error"). |
| start_ns        | integer                       | The span’s start time in nanoseconds. |
| duration        | float                       | The span’s duration in nanoseconds. |
| ml_app        | string                       | The name of the span’s LLM Application. |
| metadata        | Dict[key (string), any]                       | Data about the span that is not input or output related. |
| span_kind        | string                       | The span kind: "agent", "workflow", "llm", "tool", "task", "embedding", or "retrieval". |
| model_name        | string                       | The name of the model used in the request. Only applicable to LLM spans. |
| model_provider        | string                       | The provider for the model used in the request. Only applicable to LLM spans. |
| input        | [SearchedIO](#searchedio)                      | The span’s input information. |
| output        | [SearchedIO](#searchedio)                       | The span’s output information. |
| tool_definitions        | [[ToolDefinition](#tooldefinition)]                       | List of tools available in an LLM request. |
| metrics        | Dict[key (string), float]                      | Datadog metrics to collect. |
| evaluation        | Dict[key (string), [SpanEvalMetric](#spanevalmetric)]                      | A map of evaluations associated with the span. |

### SearchedIO

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| value        | string                        | Input or output value. |
| messages        | [[Message](#message)]                        | List of messages. This is only relevant for LLM spans. |

### Message

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| content        | string                        | The body of the message. |
| role        | string                        | The role of the entity. |

### ToolDefinition

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| name        | string                        | The name of the tool. |
| description        | string                       | The description of the tool’s function. |
| schema        | Dict[key (string), any]                       | Data about the arguments a tool accepts. |

### SpanEvalMetric

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| eval_metric_type        | string                        | The type of evaluation metric. Valid values are `categorical`, `score`, `boolean`, and `json`.  |
| value        | any                       | The evaluation result. Can be a string, float, Boolean, or JSON value. |
| reasoning        | string                       | Reasoning for the evaluation result. |
| assessment        | string                       | Whether the evaluation passed or failed. Valid values are `pass` and `fail`. |
| status        | string                       | The status of the evaluation run. Valid values are `OK`, `WARN`, and `ERROR`. |
| error        | [EvalMetricError](#evalmetricerror)                       | Information about the error that occurred when running the evaluation (if any). |
| tags        | [string]                       | Key-Value pairs associated with the evaluation metric. |
| action        | string                       | The action taken in response to the evaluation result for user-submitted evaluations. |
| eval_metric_metadata        | Dict[key (string), any]                        | Arbitrary JSON data associated with the evaluation. |
| llm_output        | string                       | The raw output from the LLM call used to determine the evaluation result. |

### EvalMetricError

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| message        | string                        | A description of the error. This may include reasons the evaluation was skipped or an error message generated while running the evaluation. |
| stack        | string                        | The stack trace associated with the evaluation error. |
| type        | string                        | The error category. One of a fixed set of reasons indicating why the evaluation was skipped or failed. |
| recommended_resolution        | string                        | The steps required to resolve the error. |

### Meta

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| elapsed        | integer                        | The time elapsed in milliseconds. |
| page        | [Page](#page)                        | Paging attributes. |
| request_id        | string                       | The identifier of the request. |
| status        | string                       | The status of the response. Allowed values: done,timeout |

### Page

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| after        | string                        | The cursor to use to get the next results, if any. To make the next request, use the same parameters with the addition of the `page[cursor]` field. |

### Links

| Field      | Type                          | Description                                |
|------------|-------------------------------|--------------------------------------------|
| next        | string                        | Link for the next set of results. See [Pagination][1]. |




[1]: https://jsonapi.org/format/#fetching-pagination
