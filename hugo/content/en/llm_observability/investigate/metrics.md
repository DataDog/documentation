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

<div class="alert alert-info">Other tags set on spans are not available as tags on Agent Observability metrics, except LLM token and cost metric tags and <a href="#gateway-metrics">Gateway tags</a>. See <a href="/llm_observability/investigate/cost/#custom-tags-on-cost-and-tokens-metrics">Custom tags on cost and tokens metrics</a> for more information.</div>

### Span metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span` | Total number of spans with a span kind | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.duration` | Total duration of spans in seconds | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.error` | Number of errors that occurred in the span | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.time_to_first_token` | Time to the first generated output in a streaming LLM span, in seconds | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.time_per_output_token` | Average generation time per output token in a streaming LLM span, in seconds | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

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

[AI Gateway][9] provides additional tags on span count, error, duration, streaming latency, token, and cost metrics. To count LLM calls, filter `ml_obs.span` by `dd.ai_gateway_frntr:true` and `span_kind:llm`. Retries and fallbacks count as separate calls.

The following tags are available when the Gateway span contains the corresponding information. Historical metric samples are not backfilled with these tags.

| Tag | Description |
|-----|-------------|
| `dd.ai_gateway_frntr` | `true` for AI Gateway traffic. |
| `gateway_provider_id` | ID of the configured Gateway provider account. |
| `gateway_provider` | Slug of the configured Gateway provider account. |
| `user_id` | Datadog user ID associated with the request. |
| `team_id` | ID of the selected or uniquely inferred Datadog team. Omitted when multiple teams apply. |
| `team_attribution` | `header` for an explicitly selected team, `single` for one inferred team, or `multiple` when more than one team applies. Calls with `multiple` remain in overall totals without a `team_id`. |
| `gateway_outcome` | Call result: `ok`, `error`, or `canceled`. Canceled calls are excluded from error counts. |
| `gateway.streaming` | `true` for streaming calls and `false` otherwise. |
| `gateway_error_category` | Error category on failed calls: `http_401`, `http_403`, `http_429`, `http_500`, `http_503`, `other_4xx`, `other_5xx`, `timeout`, `credentials`, `unavailable`, `stream_error`, or `unknown`. |
| `error_type` | Error type: `provider_http_error`, `timeout`, `credentials`, `unavailable`, `stream_read_error`, `early_close`, `provider_stream_error`, `incomplete_stream`, or `unknown`. |

#### Gateway pricing coverage

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.pricing.count` | Number of Gateway LLM calls by pricing status | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider`, Gateway metric tags, and `gateway_pricing_status` |

Each LLM call contributes one count, including calls without a cost estimate. The `gateway_pricing_status` tag is available only on this metric:

| Value | Description |
|-------|-------------|
| `complete` | The cost estimate covers the full call, including calls with a valid zero cost. |
| `partial` | The estimate is incomplete, for example because final usage or a price for cached tokens is missing. |
| `inconsistent` | Token counts or cost components do not match their reported totals, or a cost value is negative. |
| `unavailable` | There is not enough usage or pricing information to estimate the cost. |

Pricing coverage does not change the reported cost. If pricing samples are missing for part of the selected time range, coverage for that traffic is unknown.

#### Gateway streaming latency

AI Gateway reports timing metrics for successful streaming LLM calls with valid timing data, including calls with metadata-only capture.

- **Time to first token (TTFT)**: Time from the start of an LLM call to the first generated text, reasoning, or tool arguments received by the Gateway. Empty events, role announcements, and usage updates are excluded.
- **Time per output token (TPOT)**: Average generation time per output token, calculated as `(last output time - first output time) / (output tokens - 1)`. The calculation excludes the wait for first output and the delay after the last output.

TPOT requires a completed text-only stream, a matching final token count greater than one, and output received at different times. Reasoning, tool calls, multiple choices, or insufficient token information produce no TPOT sample. A TTFT sample can still be available for these calls.

Both metrics reflect when the Gateway receives output, so buffering and backpressure can affect the values. TPOT percentiles describe averages across LLM calls, not individual token intervals. Missing timing data is omitted rather than reported as zero.

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
