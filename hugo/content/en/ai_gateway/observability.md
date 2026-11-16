---
title: Observe AI Gateway Activity
description: Review AI Gateway requests, tokens, spend, errors, and latency, then inspect requests in Agent Observability.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

<!-- vale Datadog.words_case_insensitive = NO -->

The [{{< ui >}}Overview{{< /ui >}}][3] page shows, for the selected time range:

- Requests, successful requests, errors, and error rate
- Tokens and average tokens per request
- Spend, average cost per request, and cost per million tokens
- Latency over time and by model
- Providers with errors
- Provider prompt-cache metrics: {{< ui >}}Cache hit ratio{{< /ui >}} is cache-read input tokens divided by total input tokens. {{< ui >}}Cache reuse ratio{{< /ui >}} is cache reads per cache write.

<!-- vale Datadog.words_case_insensitive = YES -->

Charts break down requests and cost by model or provider.

To investigate a request:

1. Select a time range that contains the request.
2. Use the model or provider breakdown to find the affected traffic.
3. Click a model, a request bar, or an error. The {{< ui >}}Traces{{< /ui >}} page opens with filters already set for that selection.
4. For a failed request, review its error type and trace, and the provider's error rate, before changing a routing rule or provider.

For available metrics and tags, see [AI Gateway metrics][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/llm/gateway
[16]: /llm_observability/investigate/metrics/#gateway-metrics
