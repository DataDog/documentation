---
title: Send Requests through AI Gateway
description: Choose an AI Gateway endpoint, supported request format, and model identifier.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Send requests to the base URL for your [Datadog site][12]:

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1
```

[Authenticate requests](/ai_gateway/applications/#authenticate-requests) with a Datadog personal access token or service access token. For a complete request example, see [Get Started](/ai_gateway/getting_started/#send-a-request).

## Supported request formats

Append one of the following paths to the base URL. The operations available depend on the model and provider account; the provider page shows the operations and request examples for your account.

| Request format | Path |
|---|---|
| OpenAI Responses | `POST /responses` |
| OpenAI Chat Completions | `POST /chat/completions` |
| Anthropic Messages | `POST /messages` |

## Select a model

Set the `model` field in the request body to one of the following:

- `<PROVIDER_SLUG>/<MODEL_ID>` to call a model on a specific provider.
- `router/<RULE_SLUG>` to let a [routing rule](/ai_gateway/routing/) choose the destination.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[12]: /getting_started/site/
