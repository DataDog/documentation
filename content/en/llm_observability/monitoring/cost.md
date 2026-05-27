---
title: Cost
description: Monitor your LLM tokens and costs.
---
{{< img src="llm_observability/Cost_LLMO.png" alt="Cost view for an app in LLM Observability." style="width:100%;" >}}

Datadog LLM Observability automatically calculates an estimated cost for each LLM request, using providers' public pricing models and token counts annotated on LLM/embedding spans.

By aggregating this information across traces and applications, you can gain insights into the user patterns of your LLM models and their impact on overall spending.

Use cases:
- See and understand where LLM spend is coming from, at the model, request, and application levels
- Track changes in token usage and cost over time to proactively guard against higher bills in the future
- Correlate LLM cost with overall application performance, model versions, model providers, and prompt details in a single view

## Setting up cost monitoring 

Datadog provides two ways to monitor your LLM costs:
- [Automatic](#automatic): Use [supported LLM providers'](#supported-providers) public pricing rates
- [Manual](#manual): For custom pricing rates, self-hosted models, or unsupported providers, manually supply your own cost values.

### Automatic 
If your LLM requests involve any of the [listed supported providers](#supported-providers), Datadog automatically calculates the cost of each request based on the following:

- Token counts attached to the LLM/embedding span, provided by either [auto-instrumentation][1] or manual user annotation
- The model provider's public pricing rates

### Manual
To manually supply cost information, follow the instrumentation steps described in the [SDK Reference][2] or [API][3]. When setting your costs up manually (e.g. setting `total_cost`), the unit must be in dollar units; however, the unit will be stored as nanodollars.

<div class="alert alert-info">If you provide partial cost information, Datadog tries to estimate missing information. For example, if you supply a total cost but not input/output cost values, Datadog uses provider pricing and token values annotated on your span to compute the input/output cost values. This can cause a mismatch between your manually provided total cost and the sum of Datadog’s computed input/output costs. Datadog always displays your provided total cost as-is, even if these values differ.</div>

## Supported providers
Datadog automatically calculates the cost of LLM requests made to the following supported providers using the publicly available pricing information from their official documentation.

<div class="alert alert-info">Datadog only supports monitoring costs for text-based models.</div>

Datadog supports estimated costs for [800+ models][4], from OpenAI, Hugging Face, Gemini, Anthropic to models served by OpenRouter.

## Metrics
You can find cost metrics in [LLM Observability Metrics][5]. The unit for LLM Observability estimated cost metrics is **nanodollars**. 

The cost metrics include a `source` tag to indicate where the value originated:
- `source:auto` — automatically calculated
- `source:user` — manually provided


## Custom tags on cost and tokens metrics

Datadog's LLM cost and token metrics ship with OOTB tags such as `model_name`, `model_provider`, and `ml_app`. To break down LLM spend by attributes specific to your application — for example team, customer tier or feature, you can promote a subset of your span tags as custom tags on the generated cost and token metrics.

<div class="alert alert-info">Custom tags apply only to LLM <strong>cost</strong> (<code>ml_obs.span.* cost</code>) and <strong>tokens</strong> (<code>ml_obs.span.* tokens</code>) metrics. Other span metrics (such as <code>ml_obs.span.duration</code>) are not affected.</div>

### How it works

1. Tag your LLM spans with the attributes you want to break spend down by, using the SDK's `tags` parameter (or auto-instrumentation)
2. In the same annotation, mark which of those tag keys should propagate to cost metrics by passing the keys to the `cost_tags` (Python) or `costTags` (Node.js) parameter. See the [SDK Reference][7] for the full instrumentation syntax and timing rules
3. Once propagated, those tag keys appear as tags on the LLM cost and token metrics. You can use them anywhere in Datadog that consumes these metrics — dashboards, monitors, notebooks, and trace search

<div class="alert alert-warning">Only configure tags with bounded values (such as <code>team</code>, <code>customer_tier</code>, or <code>feature</code>). Tags with unbounded or high-cardinality values (such as user IDs or request IDs) are not fully supported and may be truncated or omitted from the resulting metrics.</div>

### Use case: Filter and group spend by an application attribute

Use custom tags to break down spend by attributes that aren't part of the OOTB metric tags. Build a dashboard widget of `ml_obs.span.llm.total.cost` grouped by `team` to see which teams' LLM usage is driving consumption over time, and configure a metric monitor on the same query to alert independently for each team (or customer tier, feature, environment) when usage crosses a threshold.

### Use case: Track prompt caching effectiveness

Many LLM providers cache reused prompt prefixes to reduce repeated processing. Tagging spans with a prompt identifiers such as "prompt_version" or "prompt_template_id," which are then broken down by theese tags, allows you to:

- Compare prompt variants by how effectively they reuse provider caching. For example, tracking the cache hit rate using the formula `ml_obs.span.llm.input.cache_read.tokens / ml_obs.span.llm.input.cache_write.tokens` 
- Identify prompts that populate the cache but rarely reuse it, which is usually a sign of unstable prefixes or aggressive invalidation
- Spot prompts that miss caching entirely because the prefix is too short to qualify or changes with every call.
- Alert on caching regressions in token metrics before they result in increased costs

{{< img src="llm_observability/cost_tags_cache.png" alt="Dashboard comparing cache read, cache write, and non-cached input tokens grouped by a custom prompt_version tag." style="width:100%;" >}}

## View costs in LLM Observability
View your app in LLM Observability and select {{< ui >}}Cost{{< /ui >}} on the left. The _Cost view_ features:
- A high-level overview of your LLM usage over time including {{< ui >}}Total Cost{{< /ui >}}, {{< ui >}}Cost Change{{< /ui >}}, {{< ui >}}Total Tokens{{< /ui >}}, and {{< ui >}}Token Change{{< /ui >}}
- {{< ui >}}Breakdown by Token Type{{< /ui >}}: A breakdown of token usage, along with associated costs
- {{< ui >}}Breakdown by Provider/Model{{< /ui >}} or {{< ui >}}Prompt ID/Version{{< /ui >}}: Cost and token usage broken down by LLM provider and model, or by individual prompts or prompt versions (powered by [Prompt Tracking][6])
- {{< ui >}}Most Expensive LLM Calls{{< /ui >}}: A list of your most expensive requests

{{< img src="llm_observability/cost_tracking_trace.png" alt="Cost data in trace detail." style="width:100%;" >}}

Cost data is also available within your application’s traces and spans, allowing you to understand cost at both the request (trace) and operation level (span).
Click any trace or span to open a detailed side-panel view that includes cost metrics for the full trace and for each individual LLM call.
At the top of the trace view, the banner shows aggregated cost information for the full trace, including estimated cost and total tokens. Hovering over these values reveals a breakdown of input and output token/costs.

Selecting an individual LLM span shows similar cost metrics specific to that LLM request.

To query cost-related data in Traces page, use the left side {{< ui >}}Cost{{< /ui >}} facets. 

Alternatively, query the following span attributes directly:
- `@metrics.input_tokens` / `@metrics.estimated_input_cost`
- `@metrics.output_tokens` / `@metrics.estimated_output_cost`
- `@metrics.total_tokens` / `@metrics.estimated_total_cost`
- `@metrics.non_cached_input_tokens` / `@metrics.estimated_non_cached_input_cost`
- `@metrics.cache_read_input_tokens` / `@metrics.estimated_cache_read_input_cost`
- `@metrics.cache_write_input_tokens` / `@metrics.estimated_cache_write_input_cost`
- `@metrics.reasoning_output_tokens` / `@metrics.estimated_reasoning_output_cost`

## Troubleshoot LLM cost monitoring

If LLM cost values are missing from a trace or appear inaccurate, see the following sections for common causes and fixes.

### Trace shows "PARTIAL COST" or "COST UNAVAILABLE"

Each LLM span in a trace is priced independently. The warning appears when one or more LLM spans in the trace are missing a cost estimate:

- {{< ui >}}PARTIAL COST{{< /ui >}}: Datadog computed costs for some LLM spans in the trace, but not the rest. The {{< ui >}}Estimated Cost{{< /ui >}} value reflects the sum of only the spans for which cost was computed.
- {{< ui >}}COST UNAVAILABLE{{< /ui >}}: Datadog could not compute cost for any LLM span in the trace.

Hover over the warning to see the number of affected spans, the reason cost is missing, and the names of the affected spans. The reasons fall into one of the following categories.

#### Unsupported model provider

The LLM model provider on the span is not in the [list of supported providers](#supported-providers), so Datadog has no public pricing rates to apply.

How to fix:
- Verify the span's `model_provider` matches a supported provider identifier. See the [list of supported providers](#supported-providers).
- Manually supply cost values on the span. See the [SDK Reference][2] or [API][3].

#### Unsupported model name

The LLM provider is supported, but the `model_name` on the span does not match any entry in the provider's [pricing catalog][4]. This usually happens when the model name is misspelled, abbreviated, or uses an internal alias.

How to fix:
- Update the span's `model_name` to match the official name in the provider's [pricing catalog][4].
- For privately deployed or customized variants of a supported model, manually supply cost values on the span. See the [SDK Reference][2] or [API][3].

#### Missing token counts

The span has no `input_tokens` or `output_tokens` annotation, so Datadog has no token values for cost calculation. (For embedding spans, only `input_tokens` is required.)

How to fix:
- For [auto-instrumentation][1], confirm your provider and SDK version are supported.
- For manual instrumentation, annotate input and output token counts on the span. See the [SDK Reference][2] or [API][3].

### Inaccurate cost when prompt caching is enabled

If a span includes only aggregate `input_tokens` and `output_tokens`, but is missing `cache_read_input_tokens`, `cache_write_input_tokens`, or `non_cached_input_tokens`, Datadog applies the standard input rate to the entire `input_tokens`.

For providers that support prompt caching, cache reads, cache writes, and non-cached inputs are billed at different rates. Without this breakdown, the input cost calculation may be inaccurate.

How to fix:
- For [auto-instrumentation][1], verify that your provider and SDK version emit cache-specific token counts.
- For manual instrumentation, annotate `cache_read_input_tokens`, `cache_write_input_tokens`, and `non_cached_input_tokens` in addition to `input_tokens`. See the [SDK Reference][2] or [API][3].

[1]: /llm_observability/instrumentation/auto_instrumentation
[2]: /llm_observability/instrumentation/sdk/?tab=python#monitoring-costs
[3]: /llm_observability/instrumentation/api/#metrics
[4]: https://github.com/pydantic/genai-prices/tree/main?tab=readme-ov-file#providers
[5]: /llm_observability/monitoring/metrics/#llm-cost-metrics
[6]: /llm_observability/monitoring/prompt_tracking
[7]: /llm_observability/instrumentation/sdk/#adding-custom-tags-to-cost-and-tokens-metrics
