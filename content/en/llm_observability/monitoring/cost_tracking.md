---
title: Cost Tracking
description: Use Cost Tracking to view your LLM tokens and cost.
---

Datadog LLM Observability _Cost Tracking_ is a feature that provides customers with clear visibility into the spend cost associated with your LLM-powered applications. Cost Tracking automatically captures input/output token counts and calculates the corresponding cost for each LLM request, using providers' pricing models. 

By aggregating this information across traces and applications, you can gain insights into the usage patterns of LLM models and their impact on overall spending.

Key Benefits:
- See how much each model, application, or request costs, and understand where LLM spend is coming from
- Identify unexpected increases in token usage or model calls before they lead to higher bills
- Correlate LLM cost with performance, errors, prompt content, and application behavior in a single view

<div class="alert alert-info"> If you provide only partial cost information, for example, supplying a total cost but not input/output cost, Datadog will still compute the input and output cost using provider pricing. This may cause a mismatch between your manually provided total cost and the sum of Datadog’s computed input/output costs. Datadog will always display your provided total cost as-is, even if these values differ.</div>

## Set up Cost Tracking
Datadog supports two ways of enabling Cost Tracking: Automatic and Manual. Most users rely on automatic cost calculation, which Datadog automatically estimates the cost by:
- Using the token counts returned by the provider (or computed from the response), and
- Applying the provider’s published pricing for the specific model

You can also supply your own cost data using the manual option. In this case, Datadog will use your values directly and will not attempt to automatically calculate costs.

### Automatic
If your application uses one of the supported providers listed below [link], Datadog will automatically collect token counts and calculate the cost of each request.

### Manual
For custom LLM providers, self-hosted models, or unsupported frameworks, you can manually provide cost values. To manually override or supply cost information, follow the instrumentation steps described here: [Link to SDK reference page]

<div class="alert alert-info">If you provide only partial cost information, for example, supplying a total cost but not input/output token details, Datadog will still compute the input and output token cost using provider pricing. This may cause a mismatch between your manually provided total cost and the sum of Datadog’s computed input/output costs. Datadog will always display your provided total cost as-is, even if these values differ.</div>

## Supported Providers
Datadog automatically calculates the cost of LLM requests made to the following supported providers using the publicly available pricing information from their official documentation.

<div class="alert alert-info">Cost tracking currently supports text-based models only.</div>

- OpenAI: [OpenAI Pricing][1]
- Anthropic: [Claude Pricing][2]
- Azure OpenAI: [Azure OpenAI Pricing][3]
    - We use US East 2 and Global Standard Deployment Pricing for all requests
- Gemini: [Gemini Pricing][4]

## Metrics
Cost Tracking metrics can be found in [LLM Observability Metrics][5].

## View Cost Tracking in LLM Observability
{{< img src="llm_observability/cost_tracking_overview.png" alt="Cost view for an app in LLM Observability." style="width:100%;" >}}

Once cost tracking is enabled, open your application in LLM Observability and select Cost on the left sidebar. The Cost view provides a complete, visual breakdown view of your token usage and LLM spend:
- **Summary**: A high-level overview of your LLM activity over time. This includes Total Change (Estimated), Cost Change, Total Tokens, Token change
- **Breakdown by Token Type**: A detailed breakdown of types of tokens, along with their associated costs
- **Breakdown by Provider/Model and Prompt ID/Version**: Cost and token usage grouped by LLM provider and model, and individual prompts or prompt versions that is powered by [Prompt Tracking][6]
- **Most Expensive LLM Calls**: A list of your highest-cost requests

{{< img src="llm_observability/cost_tracking_trace.png" alt="Cost data in trace detail." style="width:100%;" >}}
Cost data is also available within your application’s traces and spans, allowing you to understand cost at both the request and operation level.
Click any trace or span, Datadog opens a detailed side-panel view that includes cost metrics for the **full trace** and for each individual LLM call.
At the top of the trace view, the banner shows aggregated cost information for the full trace, including Estimated Cost and Total Tokens. Hovering over these values reveals a breakdown of input and output token/costs.

Selecting an individual LLM span shows similar cost metrics specific to that **single span**.

[1]: https://platform.openai.com/docs/pricing
[2]: https://platform.claude.com/docs/en/about-claude/models/overview#model-pricing
[3]: https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/
[4]: https://ai.google.dev/gemini-api/docs/pricing#standard
[5]: /llm_observability/monitoring/metrics/#llm-cost-metrics
[6]: /llm_observability/monitoring/prompt_tracking
