---
title: Cost
description: Monitor your LLM tokens and costs.
---
{{< img src="llm_observability/cost_tracking_overview.png" alt="Cost view for an app in LLM Observability." style="width:100%;" >}}

Datadog LLM Observability automatically calculates an estimated cost for each LLM request, using providers' public pricing models and token counts annotated on LLM/embedding spans.

By aggregating this information across traces and applications, you can gain insights into the user patterns of your LLM models and their impact on overall spending.

Use cases:
- See and understand where LLM spend is coming from, at the model, request, and application levels
- Track changes in token usage and cost over time to proactively guard against higher bills in the future
- Correlate LLM cost with overall application performance, model versions, model providers, and prompt details in a single view

## Set up monitoring costs

Datadog provides two ways to monitor your LLM costs:
- [Automatic](#automatic): Use [supported LLM providers'](#supported-providers) public pricing rates
- [Manual](#manual): For custom pricing rates, self-hosted models, or unsupported providers, manually supply your own cost values.

### Automatic 
If your LLM requests involve any of the [listed supported providers](#supported-providers), Datadog automatically calculates the cost of each request based on the following:

- Token counts attached to the LLM/embedding span, provided by either [auto-instrumentation][1] or manual user annotation
- The model provider's public pricing rates

### Manual
To manually supply cost information, follow the instrumentation steps described in the [SDK Reference][2] or [API][3].

<div class="alert alert-info">If you provide partial cost information, Datadog tries to estimate missing information. For example, if you supply a total cost but not input/output cost values, Datadog uses provider pricing and token values annotated on your span to compute the input/output cost values. This can cause a mismatch between your manually provided total cost and the sum of Datadog’s computed input/output costs. Datadog always displays your provided total cost as-is, even if these values differ.</div>

## Supported providers
Datadog automatically calculates the cost of LLM requests made to the following supported providers using the publicly available pricing information from their official documentation.

<div class="alert alert-info">Datadog only supports monitoring costs for text-based models.</div>

- OpenAI: [OpenAI Pricing][4]
- Anthropic: [Claude Pricing][5]
- Azure OpenAI: [Azure OpenAI Pricing][6]
    - For consistency, Datadog uses US East 2 and Global Standard Deployment Pricing for all requests
- Google Gemini: [Gemini Pricing][7]

## Metrics
You can find cost metrics in [LLM Observability Metrics][8].

The cost metrics include a `source` tag to indicate where the value originated:
- `source:auto` — automatically calculated
- `source:user` — manually provided


## View costs in LLM Observability
View your app in LLM Observability and select **Cost** on the left. The _Cost view_ features:
- A high-level overview of your LLM usage over time including **Total Cost**, **Cost Change**, **Total Tokens**, and **Token Change**
- **Breakdown by Token Type**: A breakdown of token usage, along with associated costs
- **Breakdown by Provider/Model** or **Prompt ID/Version**: Cost and token usage broken down by LLM provider and model, or by individual prompts or prompt versions ( powered by [Prompt Tracking][9])
- **Most Expensive LLM Calls**: A list of your most expensive requests

{{< img src="llm_observability/cost_tracking_trace.png" alt="Cost data in trace detail." style="width:100%;" >}}

Cost data is also available within your application’s traces and spans, allowing you to understand cost at both the request (trace) and operation level (span).
Click any trace or span to open a detailed side-panel view that includes cost metrics for the full trace and for each individual LLM call.
At the top of the trace view, the banner shows aggregated cost information for the full trace, including estimated cost and total tokens. Hovering over these values reveals a breakdown of input and output token/costs.

Selecting an individual LLM span shows similar cost metrics specific to that LLM request.

[1]: /llm_observability/instrumentation/auto_instrumentation
[2]: /llm_observability/instrumentation/sdk/?tab=python#monitoring-costs
[3]: /llm_observability/instrumentation/api/#metrics
[4]: https://platform.openai.com/docs/pricing
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#model-pricing
[6]: https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/
[7]: https://ai.google.dev/gemini-api/docs/pricing#standard
[8]: /llm_observability/monitoring/metrics/#llm-cost-metrics
[9]: /llm_observability/monitoring/prompt_tracking
