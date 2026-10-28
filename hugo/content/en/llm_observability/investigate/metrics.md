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

<div class="alert alert-info">
The <code>ml_obs.*</code> entries on this page are <a href="/metrics/">Datadog Metrics</a>: numerical values that describe an aspect of your LLM application over time, derived from your LLM spans (counts, distributions of cost, tokens, latency, errors) and evaluation results. They follow standard <a href="/data_security/data_retention_periods/">Datadog metric retention</a> (15 months at full granularity) and are queryable from dashboards, monitors, and notebooks like any other Datadog metric.
<br><br>
They are distinct from two other things in Agent Observability:
<ul>
<li><strong>Per-span operational data</strong> (cost, tokens, latency, errors on each individual trace or span): the raw values these metrics roll up from. Stored with spans, follow <a href="/llm_observability/data_governance/#traces-and-spans">Agent Observability trace retention</a>, and are queried from the Traces explorer rather than as metrics.</li>
<li><strong>Individual <a href="/llm_observability/investigate/evaluations/">evaluation results</a></strong> (also called "evals"): quality and safety judgments (for example, hallucination, faithfulness, custom LLM-as-a-judge) attached to individual spans or offline experiment rows, including reasoning and other details. These follow <a href="/llm_observability/data_governance/">Agent Observability trace and offline experiment retention</a>. The metrics in the <a href="#evaluation-metrics">Evaluation metrics</a> section aggregate production evaluation results into Datadog metrics, which follow standard metric retention.</li>
</ul>
</div>

<div class="alert alert-info">Other tags set on spans are not available as tags on Agent Observability metrics, except LLM token and cost metric tags. See <a href="/llm_observability/investigate/cost/#custom-tags-on-cost-and-tokens-metrics">Custom tags on cost and tokens metrics</a> for more information.</div>

### Span metrics

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.span` | Total number of spans with a span kind | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.duration` | Total duration of spans in seconds | Distribution | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.error` | Number of errors that occurred in the span | Count | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

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

### Evaluation metrics

Evaluation metrics aggregate the results of your [evaluations][1] so you can track the quality of your application over time, alert on it with monitors and SLOs, and compare it with other Datadog metrics.

| Metric Name | Description | Metric Type | Tags |
|-------------|-------------|-------------|------|
| `ml_obs.evaluation.count` | Number of evaluation results | Count | `env`, `ml_app`, `service`, `version`, `evaluation_name`, `metric_type`, `assessment`, `evaluation_source`, `evaluation_version`, `value` |
| `ml_obs.evaluation.score` | Value of score evaluation results, and of JSON evaluation results whose post-processing returns a numeric `value` | Distribution | `env`, `ml_app`, `service`, `version`, `evaluation_name`, `metric_type`, `assessment`, `evaluation_source`, `evaluation_version` |

The evaluation metric tags have the following values:

| Tag | Values |
|-----|--------|
| `evaluation_name` | The name of the evaluation, for example `faithfulness` |
| `metric_type` | `boolean`, `categorical`, `score`, or `json` |
| `assessment` | `pass` or `fail` when the evaluation has pass/fail criteria, otherwise `none` |
| `evaluation_source` | `managed` for evaluations that Datadog runs, including custom LLM-as-a-judge evaluations; `external` for evaluations you submit through the SDK or API |
| `evaluation_version` | The version of a managed evaluation. Not set for evaluations you submit through the SDK or API. |
| `value` | The evaluation result. Available only on `ml_obs.evaluation.count`. See the [`value` tag](#the-value-tag) section. |
| `env`, `service`, `version` | Taken from the evaluated span |

#### The value tag

How each type of evaluation reports its result:
- **Boolean**: `value` is `true` or `false`.
- **Categorical**: `value` is the category.
- **Score**: `value` is not set. The score is reported in `ml_obs.evaluation.score`.
- **JSON**: `value` is not set, unless [post-processing][3] returns a `value`. A boolean or string becomes the `value` tag, and a number is reported in `ml_obs.evaluation.score`.

String values in the `value` tag are lowercased.

#### Evaluation metric scope and sampling

Evaluation metrics include production evaluation results that completed successfully. They do not include:
- Evaluation results from [experiments][2]
- Evaluations that were skipped or that failed to run

When a managed evaluation samples a portion of your traffic, `ml_obs.evaluation.count` reflects only the sampled results, so it does not match `ml_obs.span` one to one. Rates (such as pass rate) and score distributions are not affected by sampling.

#### Example evaluation metric queries

<div class="alert alert-info">Add <code>.fill(null)</code> to <code>ml_obs.evaluation.count</code> queries so that empty intervals are not <a href="/dashboards/functions/interpolation/">interpolated</a> with nearby values, which would inflate counts.</div>

Pass rate of an evaluation:

```text
sum:ml_obs.evaluation.count{evaluation_name:faithfulness,assessment:pass}.as_count().fill(null)
  / sum:ml_obs.evaluation.count{evaluation_name:faithfulness AND assessment IN (pass,fail)}.as_count().fill(null)
```

Distribution of results for a categorical evaluation:

```text
sum:ml_obs.evaluation.count{evaluation_name:answer_quality} by {value}.as_count().fill(null)
```

90th percentile of a score evaluation by application:

```text
p90:ml_obs.evaluation.score{evaluation_name:relevance} by {ml_app}
```

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
