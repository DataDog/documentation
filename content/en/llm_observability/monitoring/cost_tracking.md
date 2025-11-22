---
title: Cost Tracking
description: Use Cost Tracking to view your LLM tokens and cost.
---
{{< img src="llm_observability/cost_tracking_overview.png" alt="Cost view for an app in LLM Observability." style="width:100%;" >}}

In Datadog's LLM Observability, the _Cost Tracking_ is a feature that provides clear visibility into the spend cost associated with your LLM-powered applications. Cost Tracking automatically calculates an estimated cost for each LLM request, using providers' public pricing models and token counts annotated on LLM/embedding spans.

By aggregating this information across traces and applications, you can gain insights into the user patterns of your LLM models and their impact on overall spending.

Use cases:
- See and understand where LLM spend is coming from, at the model, request, and application levels
- Track changes in token usage and cost over time to proactively guard against higher bills in the future
- Correlate LLM cost with overall application performance, model versions, model providers, and prompt details in a single view

## Set up Cost Tracking
Datadog LLM Observability Cost Tracking can be enabled either automatically or manually. Automatic cost calculation is provided out of the box for major LLM providers, in which case Datadog automatically estimates the cost by:
- Using the token counts attached to the LLM/embedding span, provided either by the auto-instrumentation or by your manual token annotations, and
- Applying the model provider’s public pricing rates for the specific model

You can also supply your own cost data manually. In this case, Datadog will use your values directly instead of calculating our own estimates.

### Automatic
If your LLM requests involve any of the [supported providers listed below](#supported-providers), Datadog will automatically calculate the cost of each request for each LLM/embedding span with annotated token metrics.

Token counts used for this calculation come from [Datadog’s auto-instrumentation][1] or from user annotations.

### Manual
For users with custom pricing rates, self-hosted models, or unsupported providers, you can manually provide cost values on your LLM/embedding spans. To manually supply cost information, follow the instrumentation steps described in [SDK Reference][2] or in [API][3].

<div class="alert alert-info">If you provide partial cost information, for example, supplying a total cost but not input/output cost values, Datadog will still compute the input and output cost using provider pricing and token values annotated on your span. This may cause a mismatch between your manually provided total cost and the sum of Datadog’s computed input/output costs. Datadog will always display your provided total cost as-is, even if these values differ.</div>

## Supported providers
Datadog automatically calculates the cost of LLM requests made to the following supported providers using the publicly available pricing information from their official documentation.

<div class="alert alert-info">Cost tracking currently supports text-based models only.</div>

- OpenAI: [OpenAI Pricing][4]
- Anthropic: [Claude Pricing][5]
- Azure OpenAI: [Azure OpenAI Pricing][6]
    - For consistency, Datadog uses US East 2 and Global Standard Deployment Pricing for all requests
- Google Gemini: [Gemini Pricing][7]

## Metrics
You can find Cost Tracking metrics in [LLM Observability Metrics][8].

## View Cost Tracking in LLM Observability
View your app in LLM Observability and select **Cost** on the left. The _Cost view_ features the following information:
- **Summary**: A high-level overview of your LLM usage over time. This includes Total Cost, Cost Change, Total Tokens, and Token Change
- **Breakdown by Token Type**: A detailed breakdown of token usage, along with their associated costs
- **Breakdown by Provider/Model and Prompt ID/Version**: Cost and token usage broken down by LLM provider and model, and individual prompts or prompt versions that is powered by [Prompt Tracking][9]
- **Most Expensive LLM Calls**: A list of your most expensive requests

{{< img src="llm_observability/cost_tracking_trace.png" alt="Cost data in trace detail." style="width:100%;" >}}

Cost data is also available within your application’s traces and spans, allowing you to understand cost at both the request (trace) and operation level (span).
Click any trace or span to open a detailed side-panel view that includes cost metrics for the full trace and for each individual LLM call.
At the top of the trace view, the banner shows aggregated cost information for the full trace, including Estimated Cost and Total Tokens. Hovering over these values reveals a breakdown of input and output token/costs.

Selecting an individual LLM span shows similar cost metrics specific to that LLM request.

[1]: /llm_observability/instrumentation/auto_instrumentation
[2]: /llm_observability/instrumentation/sdk/?tab=python#cost-tracking
[3]: /llm_observability/instrumentation/api/#metrics
[4]: https://platform.openai.com/docs/pricing
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#model-pricing
[6]: https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/
[7]: https://ai.google.dev/gemini-api/docs/pricing#standard
[8]: /llm_observability/monitoring/metrics/#llm-cost-metrics
[9]: /llm_observability/monitoring/prompt_tracking
