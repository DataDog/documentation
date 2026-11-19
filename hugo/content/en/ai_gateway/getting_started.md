---
title: Get Started with AI Gateway
description: Connect a provider, authenticate, send your first model request, and verify it in Agent Observability.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

## Prerequisites

- AI Gateway Preview access for your Datadog organization.
- A Datadog role with the `ai_gateway_config_read` and `ai_gateway_config_write` permissions to configure AI Gateway providers, routing rules, budgets, and rate limits.
- A provider [integration account][1] for a supported provider, such as OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, or Vertex AI. [See all supported providers](/ai_gateway/providers/#choose-a-provider-account).
- A credential for the user or service account that sends requests. The principal and credential scope must allow `ai_gateway_usage`, and a model access policy or the default policy must allow the requested model or routing rule. See [Authenticate requests](/ai_gateway/applications/#authenticate-requests) and [Control model access](/ai_gateway/access_control/).

## Add a provider

[Connect a provider](/ai_gateway/providers/#add-a-provider) and review the models available through its integration account.

## Authenticate requests

[Choose a personal access token or service access token](/ai_gateway/applications/#authenticate-requests). The caller and credential scope must allow `ai_gateway_usage`, and a [model access policy](/ai_gateway/access_control/) must allow the requested model or routing rule.

## Send a request

Send requests to the AI Gateway base URL for your [Datadog site][12] ({{< region-param key="dd_site_name" >}}). The {{< ui >}}Datadog Site{{< /ui >}} selector on this page updates the host.

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1
```

Pass the model as `<PROVIDER_SLUG>/<MODEL_ID>` in the `model` field. The following example uses the OpenAI Responses API:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DATADOG_ACCESS_TOKEN>" \
  -d '{"model": "<PROVIDER_SLUG>/<MODEL_ID>", "input": "Woof!"}'
```

## Verify the request

1. Check the HTTP response and confirm the model that served the request.
2. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][3] to see requests, tokens, spend, errors, and latency for the selected time range.
3. To inspect the Gateway span, open [Agent Observability traces][4], which shows the `datadog-ai-gateway` application. By default, all traces from AI Gateway appear under that application. To change this, send the `x-dd-tag-ml_app: <VALUE>` request header. The content recorded in the span depends on your [data capture](/ai_gateway/security/#configure-data-capture) setting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[3]: https://app.datadoghq.com/llm/gateway
[4]: https://app.datadoghq.com/llm/traces?query=%40ml_app%3Adatadog-ai-gateway
[12]: /getting_started/site/
