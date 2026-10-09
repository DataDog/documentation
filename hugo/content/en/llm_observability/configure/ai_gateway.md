---
title: AI Gateway
description: Route LLM requests through Datadog AI Gateway to control model access, routing, and spend, and to observe every request in Agent Observability.
private: true

further_reading:
  - link: "/llm_observability/"
    tag: "Documentation"
    text: "Agent Observability"
  - link: "/account_management/api-app-keys/"
    tag: "Documentation"
    text: "API and application keys"
  - link: "/account_management/org_settings/service_accounts/"
    tag: "Documentation"
    text: "Service accounts"

---

## Overview

AI Gateway is a Datadog-hosted endpoint that sits between your applications and your model providers. Send requests to AI Gateway instead of calling each provider directly, and Datadog forwards them to the provider account you configure. Because every request passes through one control point, you can:

- Call models from multiple providers through one endpoint and one set of Datadog credentials
- Give callers a stable model identifier with [routing rules](#route-requests-with-routing-rules) and ordered fallbacks
- Control which teams, users, and service accounts can use each model with [model groups](#control-model-access)
- Track and cap spend with [budgets](#set-budgets)
- Inspect every request as a span in Agent Observability

<div class="alert alert-info"><strong>Preview:</strong> AI Gateway is available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager.</div>

## Prerequisites

- AI Gateway Preview access for your Datadog organization.
- A Datadog role that can configure AI Gateway providers, routing rules, access, and budgets.
- A provider [integration account][1] for a supported provider, such as OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, or Vertex AI.
- A credential for the principal that sends requests. The principal must have the `ai_gateway_usage` permission. See [Authenticate requests](#authenticate-requests).

## Get started

### Add a provider

A provider connects an integration account to the models that callers can use through AI Gateway.

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Providers{{< /ui >}}][2] and click {{< ui >}}New Provider{{< /ui >}}.
2. Enter a display name and a unique slug. The slug is part of the model identifier that callers send in requests.
3. Select the integration account that backs the provider. AI Gateway discovers and enables the models returned by that account.
4. Review the discovered models. Add a model manually only if discovery does not return it. For a manual model, set the Gateway model ID, an optional provider model ID, and the operations the model supports.
5. Create the provider.

After you create a provider, open it to view a generated request example for each operation that the provider supports.

### Send a request

Send requests to the AI Gateway base URL for your Datadog site:

{{< code-block lang="text" >}}
https://ai-gateway.datadoghq.com/ai/v1
{{< /code-block >}}

<div class="alert alert-warning">The base URL above is for the US1 site. To get the base URL for another Datadog site, contact your Customer Success Manager.</div>

Pass the model as `<PROVIDER_SLUG>/<MODEL_ID>` in the `model` field. The following example uses the OpenAI Responses API:

{{< code-block lang="shell" >}}
curl -X POST "https://ai-gateway.datadoghq.com/ai/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DATADOG_ACCESS_TOKEN>" \
  -d '{"model": "<PROVIDER_SLUG>/<MODEL_ID>", "input": "Hello"}'
{{< /code-block >}}

### Verify the request

1. Check the HTTP response and confirm the model that served the request.
2. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][3] to see requests, tokens, spend, errors, and latency for the selected time range.
3. Follow the {{< ui >}}Traces{{< /ui >}} link to inspect the Gateway span in Agent Observability. The content recorded in the span depends on your [data capture](#configure-data-capture) setting.

## Authenticate requests

AI Gateway accepts the following Datadog credentials. The principal behind the credential must have the `ai_gateway_usage` permission.

| Credential | Request headers |
|---|---|
| [Personal access token][4] | `Authorization: Bearer <PERSONAL_ACCESS_TOKEN>` |
| [Service account token][5] | `Authorization: Bearer <SERVICE_ACCOUNT_TOKEN>` |
| Datadog OAuth access token | `Authorization: Bearer <OAUTH_ACCESS_TOKEN>` |
| [API key and application key][6] | `DD-API-KEY: <DATADOG_API_KEY>` and `DD-APPLICATION-KEY: <DATADOG_APP_KEY>` |

For service workloads, use a service account token. Store credentials in your application's secret manager and keep them out of source control and logs.

## Send requests

### Supported request formats

Append one of the following paths to the base URL. The operations available depend on the model and provider account; the provider page shows the operations and request examples for your account.

| Request format | Path |
|---|---|
| OpenAI Responses | `POST /responses` |
| OpenAI Chat Completions | `POST /chat/completions` |
| Anthropic Messages | `POST /messages` |

Do not repeat `/ai/v1` when you append the path.

### Select a model

Set the `model` field in the request body to one of the following:

- `<PROVIDER_SLUG>/<MODEL_ID>` to call a model on a specific provider.
- `router/<RULE_SLUG>` to let a [routing rule](#route-requests-with-routing-rules) choose the destination.

The **Model ID** is the identifier AI Gateway uses for routing. The **Provider model ID** is the identifier sent to the upstream provider, and defaults to the Model ID. Copy the exact value from the provider or routing rule page.

## Manage providers

From a provider's page, you can rename the provider, manage manually added models, review discovered models, and click {{< ui >}}View in Traces{{< /ui >}} to see the provider's requests in Agent Observability.

The slug, provider type, integration account, and connection configuration cannot be changed after you create the provider. To change them, create a new provider.

## Route requests with routing rules

A routing rule gives callers a stable `router/<RULE_SLUG>` model value while the rule selects the destination. Use a routing rule to change models or providers without changing application code, and to add fallback destinations.

### Create a routing rule

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Routing{{< /ui >}}][7] and click {{< ui >}}New Routing Rule{{< /ui >}}.
2. Enter a lowercase slug. The page shows the resulting `router/<RULE_SLUG>` identifier.
3. Select the primary destination. A destination can be:
   - A specific model on a specific provider
   - A model served by any configured provider
   - Another routing rule
4. Optional: Add fallback destinations in priority order.
5. Choose the [data capture](#configure-data-capture) mode for the rule.
6. Save the rule, then copy its identifier into the `model` field of your requests.

### Fallback behavior

AI Gateway tries fallback destinations in order when the preceding destination is unavailable or returns an error.

A request rejected by a [budget](#set-budgets) in Block mode does not trigger a fallback. AI Gateway returns HTTP `402` until the budget window resets.

## Control model access

### Default policy

The [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Access{{< /ui >}}][8] page defines the default policy for models and routing rules that do not belong to a model group. Review the default policy for your organization before you give callers access to AI Gateway.

### Model groups

A model group overrides the default policy for the models and routing rules it contains.

1. On the {{< ui >}}Access{{< /ui >}} page, create a model group and enter a name.
2. Select the models and routing rules to include.
3. Choose the teams, roles, users, and service accounts that can use the group, and their access level:
   - **Runner**: Can send requests to the group's models and routing rules.
   - **Editor**: Can manage the group.
4. Optional: Configure {{< ui >}}Allow fast mode{{< /ui >}} and the maximum reasoning level for the group's models.

If a routing rule routes to another routing rule, include both rules in the model group. A direct `<PROVIDER_SLUG>/<MODEL_ID>` request and a `router/<RULE_SLUG>` request can be subject to different policies, so test each identifier as the calling principal.

## Set budgets

A budget tracks spend for matching AI Gateway traffic over a time window, and can block requests when the limit is reached.

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Budgets{{< /ui >}}][9] and click {{< ui >}}New Budget{{< /ui >}}.
2. Choose the traffic to match. Select {{< ui >}}Everything{{< /ui >}} to track all AI Gateway spend, or combine User, Team, Model, Provider, and request tag filters. The form estimates historical matches and links to the matching spans in Agent Observability.
3. Enter a spend limit and select a {{< ui >}}Daily{{< /ui >}}, {{< ui >}}Weekly{{< /ui >}}, or {{< ui >}}Monthly{{< /ui >}} window.
4. Optional: Select {{< ui >}}Track existing spans for current period{{< /ui >}} to count spend that occurred earlier in the current window.
5. Choose an enforcement mode and a warning threshold, then save the budget.

| Enforcement mode | Behavior |
|---|---|
| Block | Matching requests are rejected with HTTP `402` until the window resets. |
| Alert-only | Requests continue. A monitor alerts at the warning threshold and at the limit. |

Datadog creates a [monitor][10] for each budget in either mode.

The budget list shows active budgets, tracked spend, budgets at risk, and **Untracked** spend that does not match any budget. Use the Team, User, Model, Provider, and Tag filters to review coverage.

## Observe AI Gateway activity

The [{{< ui >}}Overview{{< /ui >}}][3] page shows, for the selected time range:

- Requests, successful requests, errors, and error rate
- Tokens and average tokens per request
- Spend, average cost per request, and cost per million tokens
- Latency over time and by model
- Providers with errors
- Cache hit ratio and cache reuse ratio, which measure input tokens served from the model provider's cache

Charts break down requests and cost by model or provider.

To investigate a request:

1. Select a time range that contains the request.
2. Use the model or provider breakdown to find the affected traffic.
3. Click {{< ui >}}Traces{{< /ui >}} to inspect the Gateway span in Agent Observability.
4. For a failed request, review the error type, the provider's error rate, and the request's trace before you change a routing rule or provider.

## Configure data capture

AI Gateway records every request as a span in Agent Observability. The data capture mode controls whether the span includes prompt and response content.

| Mode | What is recorded |
|---|---|
| Metadata only | Request and response metadata, without prompt and response content. |
| Full capture | Request and response metadata, and prompt and response content. |

Set the default mode for your organization in AI Gateway settings. Each routing rule can inherit the organization default or override it with its own mode.

Before you send sensitive prompts or responses, check the mode that applies to the request:

1. Review the organization mode and any routing rule override.
2. Send a harmless test request with the same model or routing rule as your workload.
3. Open the request's Gateway span and review the recorded fields.

## Troubleshooting

### 401 or 403 responses

- Confirm that the credential is valid for the same Datadog organization and site as the base URL.
- Confirm that the calling principal has the `ai_gateway_usage` permission.
- Confirm that a model group or the default policy allows the principal to use the requested model or routing rule.
- If you use an API key and application key, send both the `DD-API-KEY` and `DD-APPLICATION-KEY` headers.

### 402 responses

A budget in Block mode matched the request and its limit is reached. Review the budget's filters, tracked spend, and window on the [{{< ui >}}Budgets{{< /ui >}}][9] page. Routing rules do not fall back when a budget blocks a request.

### Model unavailable

- Check the exact `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>` value.
- Confirm that the model is discovered or manually added on the provider, and that it supports the operation you called.
- Confirm that a model group or the default policy allows access to the model.

A model that is available from the upstream provider might not be enabled on your AI Gateway provider.

### Request not visible in Agent Observability

Confirm the time range and organization, and that the request reached AI Gateway. Spans include prompt and response content only when full capture applies to the request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: https://app.datadoghq.com/llm/gateway/providers
[3]: https://app.datadoghq.com/llm/gateway
[4]: /account_management/personal-access-tokens/
[5]: /account_management/service-access-tokens/
[6]: /account_management/api-app-keys/
[7]: https://app.datadoghq.com/llm/gateway/routing
[8]: https://app.datadoghq.com/llm/gateway/access
[9]: https://app.datadoghq.com/llm/gateway/budgets
[10]: /monitors/
