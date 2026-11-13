---
title: LiteLLM Proxy Usage and Cost Metrics
description: "Emit OpenTelemetry GenAI token usage and cost metrics from a LiteLLM proxy instrumented with the Datadog Python tracer."
further_reading:
- link: "/cloud_cost_management/ai_costs"
  tag: "Documentation"
  text: "AI Costs"
- link: "/llm_observability/instrument/auto_instrumentation"
  tag: "Documentation"
  text: "LLM Observability auto-instrumentation"
- link: "https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-token-metrics.md"
  tag: "External Site"
  text: "OpenTelemetry GenAI token metrics semantic conventions"
---

## Overview

The Datadog Python tracer (`ddtrace`) can emit usage and cost metrics for a [LiteLLM proxy][1] that serves as a shared AI gateway. The metrics cover the proxy's calls to model providers and follow the [OpenTelemetry GenAI semantic conventions][2]. For each call, they carry token counts by type, the provider account, project, and API key ID, and an estimated cost. These are the inputs needed to split a provider bill, such as one tracked in [AI Costs][3], by the callers that generated it.

This feature is part of the `ddtrace` LiteLLM integration and runs inside the proxy process. It is separate from the [LiteLLM integration][4] that the Datadog Agent runs against the proxy's Prometheus endpoint, which reports `litellm.*` metrics.

The metrics:

- Are recorded for chat completions, text completions, Responses API calls, Anthropic Messages calls, and embeddings.
- Are recorded whether or not a trace is sent.
- Contain no prompts or responses.

## Requirements

<!-- TODO before merge: replace 4.N.0 with the first ddtrace release that includes LiteLLM usage metrics. -->
- `ddtrace` **v4.N.0 or later** (version to be confirmed)
- A LiteLLM proxy server started with `ddtrace-run`

## Setup

1. Start the proxy with `ddtrace-run` and enable usage metrics:

   ```shell
   DD_LITELLM_USAGE_METRICS_ENABLED=true \
   ddtrace-run litellm --config config.yaml
   ```

2. Make sure the proxy can reach the Datadog Agent's [DogStatsD][6] endpoint. By default, `ddtrace` sends the metrics there, to the same `DD_DOGSTATSD_URL` the tracer uses for its other metrics. See [Exporters and destinations](#exporters-and-destinations).
3. Optionally, add tags with `DD_LITELLM_USAGE_METRICS_TAGS` and declare provider IDs in `model_info`. See [Optional tags](#optional-tags) and [Provider IDs for bill matching](#provider-ids-for-bill-matching).

### Configuration

| Environment variable | Default | Description |
|---|---|---|
| `DD_LITELLM_USAGE_METRICS_ENABLED` | `false` | Emit usage and cost metrics for LiteLLM proxy calls. |
| `DD_LITELLM_USAGE_METRICS_EXPORTER` | `dogstatsd` | `dogstatsd` sends the metrics to the Datadog Agent. `otlp` sends them over OTLP, and is only for backends other than Datadog. |
| `DD_LITELLM_USAGE_METRICS_TAGS` | (none) | Comma-separated list of [optional tags](#optional-tags) to add. |
| `DD_LITELLM_USAGE_METRICS_CLIENT_SOURCE` | (none) | Name of the client application that uses this proxy, sent as the `trajectory.client_source` tag. |

## Exporters and destinations

### DogStatsD

DogStatsD is the default exporter (`DD_LITELLM_USAGE_METRICS_EXPORTER=dogstatsd`), and the one to use with Datadog. `ddtrace` sends the series to the Datadog Agent's [DogStatsD][6] endpoint at `DD_DOGSTATSD_URL`, over UDP or a Unix socket. The Agent stores the counters as `rate` metrics with a 10-second interval and the durations as distributions, the same types that every other source of these metric names, such as the Datadog AI gateways, uses. Use `.as_count()` to get token and cost totals.

A failed send, such as one to a port with no listener, logs a warning.

### OTLP

<div class="alert alert-warning">Use the OTLP exporter only to send the metrics to a backend other than Datadog, such as an OpenTelemetry Collector that forwards to another system. Datadog stores these OTLP counters as <code>count</code> metrics, while other sources of the same metric names send <code>rate</code> metrics. Datadog keeps one type per metric name in an org and applies it to every point, so mixing the two changes the type of every source's points and can make totals off by up to 10 times.</div>

With `DD_LITELLM_USAGE_METRICS_EXPORTER=otlp`, `ddtrace` sends OTLP/HTTP protobuf metrics with delta temporality. The destination is chosen in this order:

1. **A configured endpoint**: `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`, or `OTEL_EXPORTER_OTLP_ENDPOINT` followed by `/v1/metrics`. Headers come from `OTEL_EXPORTER_OTLP_METRICS_HEADERS`. Use this for an OpenTelemetry Collector.
2. **Datadog's OTLP intake**: when agentless mode is on (`DD_AGENTLESS_ENABLED=true`), metrics go to `https://otlp.<DD_SITE>/v1/metrics`, with `DD_API_KEY` sent as the `dd-api-key` header. The API key is sent only to this intake. Because of the type conflict described above, prefer DogStatsD for Datadog.
3. **The Datadog Agent's OTLP receiver** on port 4318. The Agent enables this receiver only when it is configured, for example with `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318`. See [OTLP Ingestion by the Datadog Agent][5]. Because of the type conflict described above, prefer DogStatsD for Datadog.

Only OTLP/HTTP is supported. If `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` (or, if unset, `OTEL_EXPORTER_OTLP_PROTOCOL`) is `grpc`, the metrics are not enabled. Set `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf` and point `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` at an OTLP/HTTP endpoint.

Exports are compressed with gzip (`Content-Encoding: gzip`), which every OTLP receiver must accept. To send them uncompressed, set `OTEL_EXPORTER_OTLP_METRICS_COMPRESSION` (or `OTEL_EXPORTER_OTLP_COMPRESSION`) to `none`. An export with many series is split into several requests of at most 2 MiB each before compression.

An export that fails with status 429, 502, 503, or 504, a refused connection, or a timeout is retried. While the endpoint stays unavailable, failed exports are kept for later attempts, up to 64 MiB in total; the oldest data is dropped first. Other failures log a warning.

### Cost units

| Destination | Cost unit |
|---|---|
| DogStatsD, Datadog Agent OTLP receiver, or Datadog OTLP intake | USD |
| Any other OTLP endpoint, such as an OpenTelemetry Collector | Integer billionths of a dollar (unit `{nanoUSD}`), following the semantic conventions |

## Metrics

Provider metrics are recorded for each request from the proxy to a model provider, including each retry and fallback.

| Metric | Type | Unit | Description |
|---|---|---|---|
| `gen_ai.client.inference.duration` | Histogram | seconds | Duration of a provider request. Embeddings use `gen_ai.client.operation.duration` instead. Failed requests carry `error.type`. |
| `gen_ai.client.inference.usage.input_tokens` | Counter | tokens | Input tokens, including cached input. |
| `gen_ai.client.inference.usage.output_tokens` | Counter | tokens | Output tokens. |
| `gen_ai.client.inference.usage.cache_read.input_tokens` | Counter | tokens | Input tokens read from the provider's prompt cache. |
| `gen_ai.client.inference.usage.cache_write.input_tokens` | Counter | tokens | Input tokens written to the provider's prompt cache. |
| `trajectory.gen_ai.client.inference.usage.cost` | Counter | USD or nano-USD | The proxy's own price for the provider request. Tagged `trajectory.cost.source:estimated`. |
| `trajectory.gen_ai.gateway.request.estimated_cost` | Counter | USD or nano-USD | Recorded once for each client request to the proxy: the amount the proxy charged against its budgets. |

The two cost metrics describe the same spend from different points of view. Do not add them together.

A token count that the provider did not report, and that the proxy estimated, is tagged `trajectory.token.source:estimated`.

## Tags

Every point carries:

- `gen_ai.operation.name`
- `gen_ai.request.model`
- `trajectory.observation.point:gateway`

Provider metrics also carry `gen_ai.provider.name` and `gen_ai.response.model`.

Token and cost metrics carry `trajectory.request.service_tier` when the provider reports the tier that served the call. The value uses the provider's own terms (for example, `default` or `flex` for OpenAI, `standard` for Anthropic). The tier is read from the response, or for a streamed call from the stream itself. The tier the request asked for is never used.

Values that are not observed are omitted, never reported as zero.

### Optional tags

Set `DD_LITELLM_USAGE_METRICS_TAGS` to a comma-separated list of the following names. Each tag can increase the number of series.

| Name | Tag | Value |
|---|---|---|
| `user` | `user.id` | The person the call was made for: the email address of the proxy key's owner, or else the request's end user. A key owned by a service account or a team has no `user.id`; use `key_alias` to identify the caller. |
| `team` | `trajectory.team.id` | The team of the proxy key. |
| `key_alias` | `trajectory.gateway.key.alias` | The alias of the proxy key. Keys and key hashes are never sent. |
| `route` | `trajectory.gateway.route` | The model group the client asked for. |
| `destination` | `trajectory.gateway.destination.id` | The deployment the proxy chose. |
| `provider_account` | `trajectory.request.provider_account_id` | The account at the provider that served the call. For Anthropic, the `anthropic-organization-id` response header. For OpenAI, the `openai-organization` response header, which is the organization's name, not its `org-` identifier. For Bedrock, the AWS account of a model given as an ARN, such as an inference profile. |
| `project` | `trajectory.request.project_id` | The provider's project: the `openai-project` response header for OpenAI. |
| `service`, `host` | `service.name`, `host.name` | The service and host of the proxy process. |

No other response headers are read. IDs declared in a deployment's `model_info` are always sent, and replace the values found in response headers.

For example:

```shell
DD_LITELLM_USAGE_METRICS_TAGS=user,team,key_alias,provider_account,project
```

## Provider IDs for bill matching

To match these metrics to a provider's bill, declare the IDs the proxy cannot discover in each deployment's `model_info`. Write them exactly as the provider's console shows them. Each ID is sent as written on the metrics of every call to that deployment.

| `model_info` key | Tag | Value |
|---|---|---|
| `datadog_api_key_id` | `trajectory.request.api_key_id` | The provider's identifier for the API key the deployment uses. Use the identifier the provider's console lists for the key, never the key itself; `ddtrace` does not derive it from the key. |
| `datadog_provider_account_id` | `trajectory.request.provider_account_id` | The account at the provider. |
| `datadog_project_id` | `trajectory.request.project_id` | The provider's project or workspace. |

Each value must be a string of 1 to 128 characters.

For example, in the proxy's `config.yaml`:

```yaml
model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_key: os.environ/OPENAI_API_KEY
    model_info:
      datadog_api_key_id: key_AbC123dEf456
      datadog_project_id: proj_AbC123dEf456
```

## Limitations

- Image generation, audio, rerank, and batch requests record no metrics.
- Only calls made through a LiteLLM proxy are recorded. Calls made directly with the LiteLLM Python SDK, outside a proxy, are not.
- The cost metrics are the proxy's estimates, not provider-billed amounts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.litellm.ai/docs/simple_proxy
[2]: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-token-metrics.md
[3]: /cloud_cost_management/ai_costs/
[4]: /integrations/litellm/
[5]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[6]: /extend/dogstatsd/
