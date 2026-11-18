---
title: Connect Providers to AI Gateway
description: Connect provider integration accounts, discover models, and manage provider configuration.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

## Add a provider

A provider connects an integration account to the models that callers can use through AI Gateway.

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Models{{< /ui >}} > {{< ui >}}Provider accounts{{< /ui >}}][2] and click {{< ui >}}New Provider{{< /ui >}}.
2. Enter a display name and a unique slug. The slug is part of the model identifier that callers send in requests.
3. Select the integration account that backs the provider. AI Gateway discovers and enables the models returned by that account.
4. Optional: Set a cost multiplier. Review custom prices in the [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Model Catalog{{< /ui >}}][11]. AI Gateway uses custom prices as entered, without applying the multiplier. For all other models, AI Gateway uses the automatically detected price and applies the multiplier. Confirm the price shown for each model in the Model Catalog.
5. Review the discovered models. To route requests to a model that discovery does not return, add the model manually and set:
   - **Model ID**: the canonical model identifier within the provider. In requests, prefix this value with the provider slug as `<PROVIDER_SLUG>/<MODEL_ID>`. For example, a provider slug of `production-openai` and a Model ID of `my-approved-model` produce the request value `production-openai/my-approved-model`.
   - **Provider model ID**: the identifier sent to the upstream provider. Leave this blank to send the Model ID.
   - **Supported operations**: the request formats the model accepts. Select Anthropic Messages, OpenAI Chat Completions, OpenAI Responses, or a combination of them.
6. Review the {{< ui >}}Access{{< /ui >}} stage and choose who can call the provider's models. See [Control model access](/ai_gateway/access_control/).
7. Review and create the provider.

After you create a provider, open it to view a generated request example for each operation that the provider supports.

## Manage providers

AI Gateway supports these model families on each provider. It also supports custom OpenAI-compatible endpoints.

| Model family | OpenAI | Anthropic | GCP Vertex AI | Amazon Bedrock | Azure OpenAI |
|---|:---:|:---:|:---:|:---:|:---:|
| OpenAI GPT | {{< X >}} | | | {{< X >}} | {{< X >}} |
| Anthropic Claude | | {{< X >}} | {{< X >}} | {{< X >}} | |
| Gemini | | | {{< X >}} | | |

Gemini models are available only through GCP Vertex AI. AI Gateway does not yet support the Gemini API (`generativelanguage.googleapis.com`) as a provider, or the Gemini Interactions API on Vertex AI.

From a model's page, you can rename the provider, manage manually added models, and review discovered models. Click {{< ui >}}View in Traces{{< /ui >}} to see the provider's requests in Agent Observability.

The slug, provider type, integration account, and connection configuration cannot be changed after you create the provider. To change them, create a provider.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/llm/gateway/providers
[11]: https://app.datadoghq.com/llm/gateway/model-catalog
