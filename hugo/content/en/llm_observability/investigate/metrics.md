---
title: Agent Observability Metrics
aliases:
- /llm_observability/monitoring/metrics/
description: 'Learn about useful metrics you can generate from Agent Observability data.'
further_reading:
    - link: 'llm_observability/'
      tag: "Documentation"
      text: 'Learn more about Agent Observability'
    - link: 'monitors/'
      tag: "Documentation"
      text: 'Create and manage monitors to notify your teams when it matters.'
    - link: https://www.datadoghq.com/blog/llm-prompt-tracking
      tag: Blog
      text: Track, compare, and optimize your LLM prompts with Datadog LLM Observability
    - link: "https://learn.datadoghq.com/courses/llm-obs-investigations"
      tag: "Learning Center"
      text: "Investigate with LLM Observability"
---

After you instrument your application with Agent Observability, you can access Agent Observability metrics for use in dashboards and monitors. These metrics capture span counts, error counts, token usage, latency measures, and evaluation results for your LLM applications. All metrics except evaluation metrics are calculated based on 100% of the application's traffic. For details about evaluation metrics, see the [Evaluation metrics](#evaluation-metrics) section.

The `ml_obs.*` metrics on this page are standard [Datadog metrics][5], derived from your LLM spans and evaluation results. They follow [Datadog metric retention][6] (15 months at full granularity), and you can query them from dashboards, monitors, and notebooks like any other metric.

Agent Observability also stores two other kinds of data, which have their own retention and are queried differently:

- **Per-span operational data**: The cost, tokens, latency, and errors recorded on each trace or span. Metrics roll up from these values. Span data follows [Agent Observability trace retention][7] and is queried from the Traces explorer.
- **Individual [evaluation results][1]** (evals): Quality and safety judgments, such as hallucination, faithfulness, or custom LLM-as-a-judge, attached to individual spans or experiment rows, including reasoning. These follow [Agent Observability trace and offline experiment retention][8]. The [Evaluation metrics](#evaluation-metrics) section describes the metrics that aggregate production evaluation results.

<div class="alert alert-info">Span tags are not automatically available on Agent Observability metrics. Exceptions include <a href="/llm_observability/investigate/cost/#custom-tags-on-cost-and-tokens-metrics">custom tags on cost and tokens metrics</a> and the <a href="#gateway-metrics">AI Gateway tags</a>.</div>

### Span metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span` | Total number of spans with a span kind | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.duration` | Total duration of spans in seconds | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.error` | Number of errors that occurred in the span | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

### Streaming latency metrics

These metrics contain samples only when the span includes the corresponding timing measurement. Both use seconds. For AI Gateway measurement rules, see [Gateway streaming latency](#gateway-streaming-latency).

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.time_to_first_token` | Time to the first generated output in a streaming LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.time_per_output_token` | Average generation time per output token in a streaming LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

### LLM token metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.tokens` | Number of tokens in the input sent to the LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.tokens` | Number of tokens in the output | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.tokens` | Number of reasoning tokens in the output | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.prompt.tokens` | Number of tokens used in the prompt | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.completion.tokens` | Tokens generated as a completion during the span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.tokens` | Total tokens consumed during the span (input + output + prompt) | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.tokens` | Number of input tokens written to the prompt cache in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.tokens` | Number of input tokens served from the prompt cache in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.tokens` | Number of input tokens that did not interact with the prompt cache in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.characters` | Number of characters in the input sent to the LLM | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.characters` | Number of characters in the output | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### Embedding metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.embedding.input.tokens` | Number of input tokens used for generating an embedding | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### LLM cost metrics

<div class="alert alert-info">
The unit for estimated cost metrics for Agent Observability is <strong>nanodollars</strong>.
</div>

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.cost` | Estimated input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.embedding.input.cost` | Estimated input cost in an embedding span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.cost` | Estimated reasoning output cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.cost` | Estimated output cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.cost` | Estimated total cost in an LLM or embedding span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.cost` | Estimated cache write input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.cost` | Estimated cache read input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.cost` | Estimated non cached input cost in an LLM span | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |

### Trace metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.trace` | Number of traces | Count | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.duration` | Total duration of all traces across all spans | Distribution | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.error` | Number of errors that occurred during the trace | Count | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |

### Gateway metrics

[AI Gateway][9] adds attribution and outcome tags to its span count, error, duration, streaming latency, token, and cost metrics. Use `_dd.ai_gateway_frntr:true` to select Gateway traffic. For LLM provider-attempt counts, also filter by `span_kind:llm` to exclude workflow spans. Retries and fallbacks contribute separate attempts, so these counts can exceed the number of requests from callers.

Gateway metric tags apply to newly processed traffic. Historical metric samples are not backfilled. Select any time range within [metric retention][6], including ranges longer than a month. A period before a metric's first samples has no data; missing data does not mean zero usage.

#### Gateway metric tags

These tags are available when the corresponding information exists on the Gateway span:

| Tag | Description |
|-----|-------------|
| `_dd.ai_gateway_frntr` | `true` identifies AI Gateway traffic. |
| `gateway_provider_id` | ID of the configured Gateway provider account. |
| `gateway_provider` | Slug of the configured Gateway provider account. Use `model_provider` for the model provider and `model_name` for the model. |
| `user_id` | Datadog user ID associated with the request, when available. |
| `team_id` | ID of the selected or uniquely inferred Datadog team. Omitted when multiple teams apply. |
| `team_attribution` | `header` for an explicitly selected team, `single` for one inferred team, or `multiple` when more than one team applies. Attempts with `multiple` remain in overall totals without attribution to an arbitrary team. |
| `gateway_outcome` | `ok`, `error`, or `canceled`. Use this tag to distinguish cancellations from successful attempts. |
| `gateway.streaming` | `true` for streaming attempts, or `false` for non-streaming attempts. |
| `gateway_error_category` | Error category on failed attempts: `http_401`, `http_403`, `http_429`, `http_500`, `http_503`, `other_4xx`, `other_5xx`, `timeout`, `credentials`, `unavailable`, `stream_error`, or `unknown`. |
| `error_type` | Error type when available: `provider_http_error`, `timeout`, `credentials`, `unavailable`, `stream_read_error`, `early_close`, `provider_stream_error`, `incomplete_stream`, or `unknown`. |

Cancellations are separate from errors. For successful-attempt counts, use `gateway_outcome:ok` instead of excluding errors. A stream can fail after an HTTP `200` response; such failures have `gateway_error_category:stream_error`. Provider error messages are not metric tags.

For example, count attempts by outcome over the selected time range:

```text
sum:ml_obs.span{_dd.ai_gateway_frntr:true,span_kind:llm} by {gateway_outcome}.as_count().fill(null)
```

#### Gateway pricing coverage

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.pricing.count` | Number of Gateway LLM attempts by pricing coverage, including attempts without a cost estimate | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider`, Gateway metric tags, and `gateway_pricing_status` |

The `gateway_pricing_status` tag is specific to this metric:

| Value | Meaning |
|-------|---------|
| `complete` | The cost estimate covers the whole attempt. A valid zero-cost attempt can have complete coverage. |
| `partial` | Only part of the cost is covered, or the stream reported preliminary usage without a final count. For example, a cache or pricing tier lacks a price. |
| `inconsistent` | Reported token counts or cost values do not reconcile. |
| `unavailable` | Usage or pricing information is insufficient to establish coverage. |

Pricing coverage describes the available cost information; it does not change spend or indicate whether an attempt succeeded. `complete` does not mean the estimate matches the provider's final invoice.

Count attempts by pricing status:

```text
sum:ml_obs.span.llm.pricing.count{_dd.ai_gateway_frntr:true} by {gateway_pricing_status}.as_count().fill(null)
```

To calculate the share with complete pricing, divide the `complete` count by the count across all four statuses, using the same filters and time range. Check that pricing samples cover the traffic and period being analyzed. If this metric has no samples or covers only part of the period, coverage for the missing traffic is unknown. Do not treat missing samples as complete coverage or zero cost.

#### Gateway streaming latency

AI Gateway records timing for successful streaming LLM attempts with valid, complete timing observations. Non-streaming, failed, canceled, or unmeasurable attempts have no timing sample. Timing works with metadata-only capture and does not require storing prompt or response content.

- **Time to first token (TTFT)** measures the interval from the provider attempt's start to the first nonempty generated text, reasoning, or tool-argument output observed by the Gateway. Empty events, role announcements, and usage updates do not qualify. It measures first output, which can arrive after the first response byte.
- **Time per output token (TPOT)** estimates an attempt's average generation time as `(last output time - first output time) / (output tokens - 1)`. It excludes the wait for first output and the delay after the last output. The output-token count must match the text being timed.

TPOT requires a completed text stream, a reliable final output-token count greater than one, and a positive interval between observed outputs. Reasoning, tool calls, multiple choices, or other output that cannot be matched to the count prevent a TPOT sample. Provider responses without the required token breakdown also have no sample. Output received together in one read can produce TTFT without TPOT.

Both measurements reflect when the Gateway observes output. Network buffering and backpressure can affect them; they are not provider-internal token timestamps. A chunk can contain multiple tokens. TPOT percentiles describe the distribution of **attempt averages**, not individual token gaps or stalls.

TTFT and TPOT can cover different sets of attempts. Compare their sample counts when interpreting latency, and keep missing measurements distinct from zero.

### Evaluation metrics

Evaluation metrics aggregate the results of your [evaluations][1] and [end-user feedback][4] so you can track the quality of your application over time, alert on it with monitors and SLOs, and compare it with other Datadog metrics.

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.evaluation.count` | Number of evaluation and feedback results | Count | `assessment`, `env`, `evaluation_name`, `evaluation_source`, `evaluation_version`, `is_feedback`, `metric_type`, `ml_app`, `service`, `value`, `version` |
| `ml_obs.evaluation.score` | Values of score evaluations and feedback, and numeric values returned by post-processing of JSON evaluations | Distribution | `assessment`, `env`, `evaluation_name`, `evaluation_source`, `evaluation_version`, `is_feedback`, `metric_type`, `ml_app`, `service`, `version` |

#### Evaluation metric tags

The following tags are available on evaluation metrics:

| Tag | Description |
|-----|-------------|
| `assessment` | `pass` or `fail` when the evaluation has pass-or-fail criteria. Otherwise, `none`. |
| `env`, `service`, `version` | Taken from the evaluated span. For feedback, taken from the tags on the feedback event. |
| `evaluation_name` | The name of the evaluation, for example `faithfulness`, or the label of the feedback, for example `thumbs`. |
| `evaluation_source` | `managed` for evaluations that Datadog runs, including custom LLM-as-a-judge evaluations. `external` for evaluations and feedback you submit through the SDK or API. |
| `evaluation_version` | The version of a custom LLM-as-a-judge evaluation. Not set for other evaluations or for feedback. |
| `is_feedback` | `true` for [end-user feedback][4]. Not set for evaluations. |
| `metric_type` | `boolean`, `categorical`, `score`, `numerical`, `json`, or `text`. `numerical` and `text` results are reported only in `ml_obs.evaluation.count`. |
| `ml_app` | The ML application the evaluation belongs to. |
| `value` | The evaluation result. Available only on `ml_obs.evaluation.count`. See the [`value` tag for evaluation metrics](#value-tag-for-evaluation-metrics) section. |

#### `value` tag for evaluation metrics

The `value` tag holds the result of an evaluation. How it's set depends on the evaluation's `metric_type`:
- **Boolean**: `value` is `true` or `false`.
- **Categorical**: `value` is the category.
- **Score**: `value` is not set. The score is reported in `ml_obs.evaluation.score`.
- **JSON**: `value` is not set, unless [post-processing][3] returns a `value`. A boolean or string becomes the `value` tag, and a number is reported in `ml_obs.evaluation.score`.
- **Numerical** and **Text**: `value` is not set, and the result is not reported in `ml_obs.evaluation.score`. These evaluations are counted in `ml_obs.evaluation.count` only.

String values in the `value` tag are lowercased, and characters that aren't allowed in tags are replaced with underscores. For example, the category `FAIL(OFF_TOPIC)` becomes `fail_off_topic`.

#### Evaluation metric scope and sampling

Evaluation metrics include production evaluation results that completed successfully. They do not include:
- Evaluation results from [experiments][2]
- Evaluations that were skipped or failed to run
- Evaluations you submit through the SDK or API that don't match a span

An SDK or API evaluation doesn't match a span when, for example, its span ID is incorrect or the span never reached Datadog. Feedback is included whether or not it matches a span.

Managed evaluations can run on a sample of your traffic. When they do, `ml_obs.evaluation.count` includes only the sampled results, so its counts don't line up one to one with `ml_obs.span`. Rates, such as pass rate, and score distributions still reflect your overall traffic, but they can be noisier for applications with low traffic.

#### Example evaluation metric queries

The following queries show common ways to use evaluation metrics in dashboards and monitors. Replace the evaluation names with your own.

<div class="alert alert-info">Add <code>.fill(null)</code> to <code>ml_obs.evaluation.count</code> queries. Without it, Datadog can <a href="/dashboards/functions/interpolation/">interpolate</a> empty intervals from nearby values, which inflates counts.</div>

Pass rate of an evaluation:

```text
sum:ml_obs.evaluation.count{evaluation_name:faithfulness AND assessment:pass}.as_count().fill(null)
  / sum:ml_obs.evaluation.count{evaluation_name:faithfulness AND assessment IN (pass,fail)}.as_count().fill(null)
```

The denominator counts only `pass` and `fail` results, so results with `assessment:none` don't lower the rate.

Breakdown of results for a categorical evaluation:

```text
sum:ml_obs.evaluation.count{evaluation_name:answer_quality} by {value}.as_count().fill(null)
```

Thumbs-up rate from end-user feedback:

```text
sum:ml_obs.evaluation.count{evaluation_name:thumbs AND is_feedback:true AND value:up}.as_count().fill(null)
  / sum:ml_obs.evaluation.count{evaluation_name:thumbs AND is_feedback:true}.as_count().fill(null)
```

90th percentile of a score evaluation by application:

```text
p90:ml_obs.evaluation.score{evaluation_name:relevance} by {ml_app}
```

To exclude feedback from an `ml_obs.evaluation.count` or `ml_obs.evaluation.score` query, add `NOT is_feedback:true` to the tag filter.

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

{{< whatsnext desc="Make use of your Agent Observability metrics:" >}}
    {{< nextlink href="dashboards/" >}}Create a dashboard to track and correlate Agent Observability metrics{{< /nextlink >}}
    {{< nextlink href="monitors/create/" >}}Create a monitor for alerts and notifications{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/investigate/evaluations/
[2]: /llm_observability/improve/offline_experiments/
[3]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#post-processing
[4]: /llm_observability/investigate/evaluations/end_user_feedback/
[5]: /metrics/
[6]: /data_security/data_retention_periods/
[7]: /llm_observability/data_governance/#traces-and-spans
[8]: /llm_observability/data_governance/
[9]: /llm_observability/configure/ai_gateway/
