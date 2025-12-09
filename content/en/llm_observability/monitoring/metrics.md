---
title: LLM Observability Metrics
description: 'Learn about useful metrics you can generate from LLM Observability data.'
further_reading:
    - link: 'llm_observability/'
      tag: "Documentation"
      text: 'Learn more about LLM Observability'
    - link: 'monitors/'
      tag: "Documentation"
      text: 'Create and manage monitors to notify your teams when it matters.'
    - link: https://www.datadoghq.com/blog/llm-prompt-tracking
      tag: Blog
      text: Track, compare, and optimize your LLM prompts with Datadog LLM Observability
---

After you instrument your application with LLM Observability, you can access LLM Observability metrics for use in dashboards and monitors. These metrics capture span counts, error counts, token usage, and latency measures for your LLM applications. These metrics are calculated based on 100% of the application's traffic.

<div class="alert alert-info">Other tags set on spans are not available as tags on LLM Observability metrics.</div>

### Span metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span` | Total number of spans with a span kind | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.duration` | Total duration of spans in seconds | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.error` | Number of errors that occurred in the span | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

### LLM token metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.tokens` | Number of tokens in the input sent to the LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |
| `ml_obs.span.llm.output.tokens` | Number of tokens in the output | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |
| `ml_obs.span.llm.prompt.tokens` | Number of tokens used in the prompt | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |
| `ml_obs.span.llm.completion.tokens` | Tokens generated as a completion during the span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |
| `ml_obs.span.llm.total.tokens` | Total tokens consumed during the span (input + output + prompt) | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |
| `ml_obs.span.llm.input.characters` | Number of characters in the input sent to the LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |
| `ml_obs.span.llm.output.characters` | Number of characters in the output | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |

### Embedding metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.embedding.input.tokens` | Number of input tokens used for generating an embedding | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version` |

### LLM cost metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.cost` | Estimated input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source` |
| `ml_obs.span.embedding.input.cost` | Estimated input cost in an embedding span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source` |
| `ml_obs.span.llm.output.cost` | Estimated output cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source` |
| `ml_obs.span.llm.total.cost` | Estimated total cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source` |
| `ml_obs.span.llm.input.cache_write.cost` | Estimated cache write input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source` |
| `ml_obs.span.llm.input.cache_read.cost` | Estimated cache read input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source` |
| `ml_obs.span.llm.input.non_cached.cost` | Estimated non cached input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source` |

### Trace metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.trace` | Number of traces | Count | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.duration` | Total duration of all traces across all spans | Distribution | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.error` | Number of errors that occurred during the trace | Count | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |

### Estimated usage metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.input.tokens` | Estimated number of input tokens used | Distribution | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

### Deprecated metrics

<div class="alert alert-warning">
The following metrics are deprecated, and are maintained only for backward compatibility. Datadog strongly recommends using non-deprecated token metrics for all token usage measurement use cases.
</div>

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.output.tokens` | Estimated number of output tokens generated | Distribution | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |
| `ml_obs.estimated_usage.llm.total.tokens` | Total estimated tokens (input + output) used | Distribution | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

## Next steps

{{< whatsnext desc="Make use of your LLM Observability metrics:" >}}
    {{< nextlink href="dashboards/" >}}Create a dashboard to track and correlate LLM Observability metrics{{< /nextlink >}}
    {{< nextlink href="monitors/create/" >}}Create a monitor for alerts and notifications{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}