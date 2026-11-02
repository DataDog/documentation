---
title: AI Gateway
description: Route LLM requests through Datadog AI Gateway to control model access, routing, and spend, and to observe every request in Agent Observability.

further_reading:
  - link: "/llm_observability/"
    tag: "Documentation"
    text: "Agent Observability"
  - link: "/account_management/personal-access-tokens/"
    tag: "Documentation"
    text: "Personal access tokens"
  - link: "/account_management/org_settings/service_accounts/"
    tag: "Documentation"
    text: "Service accounts"

---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Datadog's AI Gateway lets you govern how your organization uses large language models (LLMs) by routing agent and application traffic through a single endpoint. Because every request passes through one control point, you can:

- Call models from multiple providers through one endpoint and one set of Datadog credentials
- Give callers a stable model identifier with [routing rules](#route-requests-with-routing-rules) and ordered fallbacks
- Control which teams, users, and service accounts can use each model with [access policies](#control-model-access)
- Track and cap spend with [budgets](#set-budgets)
- Cap requests and tokens per minute with [rate limits](#set-rate-limits)
- Inspect every request as a span in Agent Observability

## Prerequisites

- AI Gateway Preview access for your Datadog organization.
- A Datadog role that can configure AI Gateway providers, routing rules, access, budgets, and rate limits.
- A provider [integration account][1] for a supported provider, such as OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, or Vertex AI.
- A credential for the principal that sends requests. The principal must have the `ai_gateway_usage` permission. See [Authenticate requests](#authenticate-requests).

## Get started

### Add a provider

A provider connects an integration account to the models that callers can use through AI Gateway.

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Models{{< /ui >}} > {{< ui >}}Provider accounts{{< /ui >}}][2] and click {{< ui >}}New Provider{{< /ui >}}.
2. Enter a display name and a unique slug. The slug is part of the model identifier that callers send in requests.
3. Select the integration account that backs the provider. AI Gateway discovers and enables the models returned by that account.
4. Optional: Set a cost multiplier. For models with a custom price in the [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Model Catalog{{< /ui >}}][11], AI Gateway uses the custom price as entered and does not apply the multiplier. For all other models, AI Gateway uses the auto-discovered price and applies the multiplier. Confirm the price shown for each model in the Model Catalog.
5. Review the discovered models. To route requests to a model that discovery does not return, add the model manually and set:
   - **Model ID**: the canonical identifier the client sends in the request, as `<PROVIDER_SLUG>/<MODEL_ID>`.
   - **Provider model ID**: the identifier sent to the upstream provider. Leave this blank to send the Model ID.
   - **Supported operations**: the request formats the model accepts. Select Anthropic Messages, OpenAI Chat Completions, OpenAI Responses, or a combination of them.
6. Create the provider.

After you create a provider, open it to view a generated request example for each operation that the provider supports.

### Authenticate requests

AI Gateway accepts the following Datadog credentials. The principal behind the credential must have the `ai_gateway_usage` permission.

| Credential | Request headers |
|---|---|
| [Personal access token][4] | `Authorization: Bearer <PERSONAL_ACCESS_TOKEN>` |
| [Service account token][5] | `Authorization: Bearer <SERVICE_ACCOUNT_TOKEN>` |

For service workloads, use a service account token. Store credentials in your application's secret manager and keep them out of source control and logs.

### Send a request

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

### Verify the request

1. Check the HTTP response and confirm the model that served the request.
2. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][3] to see requests, tokens, spend, errors, and latency for the selected time range.
3. Follow the {{< ui >}}Traces{{< /ui >}} link to inspect the Gateway span in Agent Observability. By default, all traces from AI Gateway appear under the `datadog-ai-gateway` application. To change this, send the `x-dd-tag-ml_app: <VALUE>` request header. The content recorded in the span depends on your [data capture](#configure-data-capture) setting.

## Send requests

### Supported request formats

Append one of the following paths to the base URL. The operations available depend on the model and provider account; the provider page shows the operations and request examples for your account.

| Request format | Path |
|---|---|
| OpenAI Responses | `POST /responses` |
| OpenAI Chat Completions | `POST /chat/completions` |
| Anthropic Messages | `POST /messages` |

### Select a model

Set the `model` field in the request body to one of the following:

- `<PROVIDER_SLUG>/<MODEL_ID>` to call a model on a specific provider.
- `router/<RULE_SLUG>` to let a [routing rule](#route-requests-with-routing-rules) choose the destination.

## Manage providers

AI Gateway supports these model families on each provider. It also supports custom OpenAI-compatible endpoints.

| Model family | OpenAI | Anthropic | GCP Vertex AI | Amazon Bedrock | Azure OpenAI |
|---|:---:|:---:|:---:|:---:|:---:|
| OpenAI GPT | {{< X >}} | | | {{< X >}} | {{< X >}} |
| Anthropic Claude | | {{< X >}} | {{< X >}} | {{< X >}} | |
| Gemini | | | {{< X >}} | | |

From a model's page, you can rename the provider, manage manually added models, review discovered models, and click {{< ui >}}View in Traces{{< /ui >}} to see the provider's requests in Agent Observability.

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

### Model served by any provider

A model served by any configured provider matches all enabled providers in your organization that serve that model and are permitted by the caller's [model access](#control-model-access) settings. AI Gateway tries those providers in slug order and sends each one its provider model ID.

### Fallback behavior

AI Gateway tries the next provider or fallback destination when the current one cannot serve the request or returns HTTP `401`, `402`, `403`, `408`, `429`, or `5xx`. A successful response, or any other `4xx` response (such as `400`, `404`, or `422`), is returned to the caller. If every attempt returns one of the fallback statuses, the caller receives the last of those responses. If no destination can serve the request, the request fails.

[Budgets](#set-budgets) in Block mode are checked per destination. If a budget blocks one destination, AI Gateway falls back to the next. If budgets block every destination, AI Gateway returns HTTP `402` until the budget window resets.

[Rate limits](#set-rate-limits) in Enforce mode are also checked per destination. A rate limit scoped to one model or provider makes AI Gateway fall back to the next destination. A rate limit that matches every destination, such as an organization-wide limit, returns HTTP `429`.

## Control model access

Access policies control who can call each model and routing rule. A policy lists models, routing rules, or both, and the users, [Datadog teams][13], and service accounts who can use them.

A caller can use a model when they have **Runner** or **Editor** access on at least one policy that contains that provider and model. The same model from another provider is a separate entry. Add each provider and model pair you want to govern, such as the OpenAI pair and the Amazon Bedrock pair.

### Default policy

The {{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Org defaults{{< /ui >}} tab sets the default policy. It applies to models and routing rules that are not in another policy, and it allows everyone to access them until you restrict access. New models stay available through this policy until you add them to an access policy.

After you add a model or routing rule to an access policy, the default policy no longer applies to it. Callers must have access through the new policy to continue using the model or routing rule.

### Access policies

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Access policies{{< /ui >}}][8] and create a policy.
2. Select the providers, models, and routing rules to include. A policy can contain only models, only routing rules, or both. Models alone grant direct access as `<PROVIDER_SLUG>/<MODEL_ID>`. Add a routing rule to grant access to its `router/<RULE_SLUG>` alias and that rule's direct targets.
3. Choose the users, teams, and service accounts, and their access level:
   - **No access**: Cannot call the policy's models or routing rules.
   - **Runner**: Can call the policy's models and routing rules.
   - **Editor**: Can call the policy's models and routing rules and manage who else has access.
4. Optional: Configure {{< ui >}}Allow fast mode{{< /ui >}} and the maximum reasoning level. A provider may use a different name for fast mode.

Access to a routing rule follows that rule's targets, so a change to the targets changes what its runners can reach. A routing rule that routes to another routing rule needs its own access. A request to `<PROVIDER_SLUG>/<MODEL_ID>` and a request to `router/<RULE_SLUG>` can be allowed or denied separately. Test both with the user or service account that sends them.

### Recommended setup

For tighter control over who can call models:

- Restrict the default policy so new models are not available to everyone.
- Create an access policy for each set of approved models.
- Grant **Runner** only to the users, teams, and service accounts that need it.
- Before you restrict the default policy, keep an administrator on a policy that can restore access.
- Review policy membership and routing rule targets regularly.

## Set budgets

A budget tracks spend for matching AI Gateway traffic over a UTC calendar day, week, or month, and can block requests when the limit is reached.

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Budgets{{< /ui >}}][9] and click {{< ui >}}New Budget{{< /ui >}}.
2. Choose the traffic to match. Select {{< ui >}}Everything{{< /ui >}} to track all AI Gateway spend, or match a user, team, model, provider, or custom tag. Send a custom tag in an `x-dd-tag-<KEY>: <VALUE>` request header, for example `x-dd-tag-ai_agent: claudecode`. A request matches the budget when it includes every filter you selected. The form estimates historical matches and links to the matching spans in Agent Observability.
3. Enter a spend limit and select a {{< ui >}}Daily{{< /ui >}}, {{< ui >}}Weekly{{< /ui >}}, or {{< ui >}}Monthly{{< /ui >}} window. The window follows the UTC calendar.
4. Optional: Select {{< ui >}}Track existing usage for current period{{< /ui >}} to count spend already recorded in the current window. Spend from requests already in progress might not count toward the budget.
5. Choose an enforcement mode and a warning threshold, then save the budget.

| Enforcement mode | Behavior |
|---|---|
| Block | Matching requests are rejected with HTTP `402` until the window resets. |
| Alert-only | Requests continue. The monitor `AI Gateway budget: <BUDGET_NAME>` alerts at the warning threshold and at the limit. |

When a budget is scoped to a [Datadog team][13], it applies to requests from that team's members. A request with the header `x-ai-gateway-team: <TEAM>` matches only the selected team's budgets. A request without the header matches the budgets of every team the caller directly belongs to, and its full cost counts against each of them. A personal budget that matches the same request also applies.

Datadog creates a [monitor][10] named `AI Gateway budget: <BUDGET_NAME>` for each budget and notifies the budget creator at the warning threshold and when the limit is reached. On the budget's details page, click the monitor icon next to {{< ui >}}Warning threshold{{< /ui >}} to change the recipients and message.

The budget list shows active budgets, tracked spend, budgets at risk, and **Untracked** spend that doesn't match a budget. A budget counts spend only after you create it, so earlier spend stays untracked. Use the Team, User, Model, Provider, and Tag filters to review coverage.

## Set rate limits

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Rate limits are in Preview. To enable them for your organization, contact your Customer Success Manager.
{{< /callout >}}

A rate limit caps how many requests, input tokens, or output tokens matching AI Gateway traffic can use per minute. Use rate limits to keep a runaway agent or script from using up your provider quota, to share provider capacity between teams, or to cap traffic to an expensive model. [Budgets](#set-budgets) cap spend over a day, week, or month; rate limits cap traffic within a minute.

### Create a rate limit

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Rate limits{{< /ui >}}][15] and click {{< ui >}}New Rate Limit{{< /ui >}}.
2. Choose the traffic to match. Leave the scope empty to cover all AI Gateway traffic in your organization, or match a user, team, model, provider, or custom tag. Send a custom tag in an `x-dd-tag-<KEY>: <VALUE>` request header. A request matches the rate limit when it includes every filter you selected.
3. Set at least one limit: {{< ui >}}Requests / minute{{< /ui >}}, {{< ui >}}Input tokens / minute{{< /ui >}}, or {{< ui >}}Output tokens / minute{{< /ui >}}.
4. Choose a mode, then save the rate limit.

| Mode | Behavior |
|---|---|
| Alert | Requests over the limit continue. The rate limit shows the {{< ui >}}Would limit{{< /ui >}} status. This is the default mode. |
| Enforce | New requests over the limit are rejected with HTTP `429`. Streaming responses that are already in progress finish. |

Start in Alert mode, review the {{< ui >}}Would limit{{< /ui >}} status for a few days, then switch to Enforce mode.

### How rate limits are counted

- Each limit applies to a rolling 60-second window, not to calendar minutes.
- All matching traffic shares one limit. For example, a team rate limit of 600 requests per minute allows 600 requests per minute for the whole team, not for each member.
- A request counts against every rate limit it matches, and AI Gateway accepts it only if every matching rate limit in Enforce mode has available capacity.
- Tokens count when a response completes, so requests already in progress can take token usage over a limit.
- A rate limit scoped to a [Datadog team][13] applies to requests that select that team with the header `x-ai-gateway-team: <TEAM>`. Without the header, it applies to requests from users who directly belong to the team.
- If a request falls back to another destination, it counts once against each rate limit.
- Your organization can have up to 100 active rate limits. Changes apply within a few seconds.
- If AI Gateway cannot check a rate limit, it accepts the request.

AI Gateway rate limits are separate from your model provider's rate limits. A request can stay under every AI Gateway rate limit and still receive a `429` from the provider.

### Rate-limited responses

When a rate limit in Enforce mode rejects a request, AI Gateway returns HTTP `429` in the error format of the API you called (OpenAI, Anthropic, or Gemini), with the `gateway_rate_limit` error code. The response includes these headers:

| Header | Value |
|---|---|
| `Retry-After` | Seconds until the request fits within the rate limit. |
| `X-Ai-Gateway-Error-Code` | `gateway_rate_limit`. A provider `429` does not include this header. |
| `X-Ai-Gateway-Ratelimit-Id` | The ID of the rate limit that rejected the request. |
| `X-Ai-Gateway-Ratelimit-Limit-<METRIC>` | The per-minute limit that was exceeded. |
| `X-Ai-Gateway-Ratelimit-Remaining-<METRIC>` | `0`. |
| `X-Ai-Gateway-Ratelimit-Reset-<METRIC>` | Time until the request fits, for example `12s`. |

`<METRIC>` is `Requests`, `Input-Tokens`, or `Output-Tokens`, depending on which limit was exceeded. For example, a request that exceeds a requests-per-minute limit returns `X-Ai-Gateway-Ratelimit-Limit-Requests`.

Clients that retry on `429` should wait for the `Retry-After` duration before they retry.

### Monitor rate limit usage

The rate limit list shows, for each rate limit, current usage against each limit in the rolling 60-second window, its status, and the number of requests it limited in the last 15 minutes. Usage turns orange at 80% of a limit and red when the limit is reached.

| Status | Meaning |
|---|---|
| Within limit | Usage is below 80% of every limit. |
| Near limit | Usage is at 80% or more of at least one limit. |
| Limiting | An Enforce mode rate limit is full and rejects new requests. |
| Would limit | An Alert mode rate limit is full. Requests continue. |

The list also includes two summary rows. **Untracked** is traffic that no Enforce mode rate limit matches. **Total** is all AI Gateway traffic in your organization.

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
3. Click a model, a request bar, or an error. The {{< ui >}}Traces{{< /ui >}} page opens with filters already set for that selection.
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
- Confirm that the user or service account has the `ai_gateway_usage` permission.
- Confirm that an access policy or the default policy allows that user or service account to use the requested model or routing rule.
- Send a personal access token or a service account token in the `Authorization: Bearer` header.

### 402 responses

Budgets in Block mode blocked every destination for the request. Review the budget's filters, tracked spend, and window on the [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Budgets{{< /ui >}}][9] page. AI Gateway falls back when a budget blocks one destination and another destination remains.

### 429 responses

- If the response includes `X-Ai-Gateway-Error-Code: gateway_rate_limit`, an AI Gateway [rate limit](#set-rate-limits) in Enforce mode rejected the request. Find the rate limit from the `X-Ai-Gateway-Ratelimit-Id` header on the [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Rate limits{{< /ui >}}][15] page, and retry after the `Retry-After` duration.
- If the response does not include `X-Ai-Gateway-Error-Code`, the model provider returned the `429`. Check the provider's rate limits for your account, or add a [fallback destination](#fallback-behavior) on another provider.

### Model unavailable

- Check the exact `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>` value.
- Confirm that the model is discovered or manually added on the provider, and that it supports the operation you called.
- Confirm that an access policy or the default policy allows access to that provider and model.

A model that is available from the upstream provider might not be enabled on your AI Gateway provider.

### Request not visible in Agent Observability

Confirm the time range and organization, and that the request reached AI Gateway. Spans include prompt and response content only when full capture applies to the request.

### Error codes

Errors that AI Gateway generates include the `X-Ai-Gateway-Error-Code` response header. For OpenAI and Anthropic, the same code is in the response body's `error.code` field. For Gemini, read the code from the header. Gemini's `error.code` is the numeric HTTP status.

A provider `4xx` or `5xx` response keeps its original status and body and does not include `X-Ai-Gateway-Error-Code`. Those responses are not listed below.

The following list shows the HTTP status that AI Gateway returns with each `X-Ai-Gateway-Error-Code` value and what the code means. When an entry lists three HTTP statuses, they apply to OpenAI, Anthropic, and Gemini, in that order.

`invalid_gateway_team`
: HTTP `400`. `x-ai-gateway-team` is empty, repeated, or not a valid Datadog team slug.

`gateway_team_forbidden`
: HTTP `403`. The caller is not a member of the selected Datadog team.

`gateway_team_user_required`
: HTTP `403`. Team selection requires a Datadog user identity. A service account token without user context cannot select a team.

`gateway_team_unavailable`
: HTTP `503`. Datadog team membership could not be verified. Retry the request.

`gateway_rate_limit`
: HTTP `429`. A gateway [rate limit](#set-rate-limits) was exceeded. The response also sets `Retry-After`, `X-Ai-Gateway-Ratelimit-Id`, and `X-Ai-Gateway-Ratelimit-{Limit,Remaining,Reset}-<METRIC>`. A provider `429` has no `X-Ai-Gateway-Error-Code`.

`budget_exceeded`
: HTTP `402`. A matching AI Gateway budget is exhausted for the current period. OpenAI, Anthropic, and Gemini all return HTTP `402`. On Gemini, the canonical status is `FAILED_PRECONDITION`. Do not retry automatically. Raise the budget or wait for the window to reset.

`budget_pricing_unavailable`
: HTTP `402`. A matching budget in Block mode applies, but AI Gateway has no price for the target model, so it cannot count the request's cost. Set a custom price for the model in [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Model Catalog{{< /ui >}}][11], or switch the budget to Alert-only.

`model_not_found`
: HTTP `400`. The request's model, router, or provider identifier does not resolve to a known target: unknown model, unknown provider slug, unknown routing rule, or an empty or malformed identifier. The response body's `message` distinguishes which one. The code is named after OpenAI's `model_not_found`, so clients that already handle that code keep working.

`bad_request`
: HTTP `400`. A malformed request that AI Gateway rejected before dispatch, such as an invalid JSON body, an invalid category filter, or an unknown action. Use `message` to see which.

`unsupported_operation`
: HTTP `400`. No eligible target supports the requested operation, for example a Responses field that no translator can map.

`websocket_not_supported`
: HTTP `426`. A `GET /responses` request, such as a Codex WebSocket connection, was rejected. AI Gateway serves OpenAI Responses only over `POST /responses`, buffered or streamed with `stream: true`. In Codex, set `supports_websockets=false` for the AI Gateway provider.

`requested_provider_unavailable`
: HTTP `400`. The provider pinned with `x-ai-gateway-provider` or the model prefix is not configured or active.

`no_eligible_target`
: HTTP `400`. Targets failed for mixed reasons: some on access, others on operation support or provider identity. This is not only a permission problem.

`no_permitted_target`
: HTTP `403`. Every eligible target was denied by an access policy. The caller cannot reach any of them without a policy change. Do not retry.

`zdr_no_eligible_target`
: HTTP `400`. The request requires zero data retention, and none of its eligible targets qualifies for it. This is a configuration issue. Do not retry.

`zdr_requirement_unavailable`
: HTTP `503` (OpenAI) / `504` (Anthropic) / `503` (Gemini). The zero-data-retention requirement could not be read. This is transient. Retry the request.

`config_error`
: HTTP `500`. A routing rule is misconfigured: a resolution cycle, an expansion limit, or an invalid rule. Contact [Datadog support][14].

`upstream_timeout`
: HTTP `504` (OpenAI, Anthropic, and Gemini). Every eligible upstream target was tried and the last attempt did not answer in time.

`upstream_unreachable`
: HTTP `500` / `500` / `503`. The connection to the provider failed (refused, reset, DNS, or TLS) or broke mid-response.

`provider_credentials_error`
: HTTP `500` / `500` / `503`. AI Gateway could not load or apply the provider credentials configured for your organization. This is not the Datadog personal access token or service account token. Check the provider's integration account.

`upstream_error`
: HTTP `500` / `500` / `503`. Any other upstream failure before a provider response. Also used when all targets failed with no more specific code.

`internal_error`
: HTTP `500`. An unclassified internal error. Contact [Datadog support][14] and include the request headers and timestamp.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: https://app.datadoghq.com/llm/gateway/providers
[3]: https://app.datadoghq.com/llm/gateway
[4]: /account_management/personal-access-tokens/
[5]: /account_management/service-access-tokens/
[7]: https://app.datadoghq.com/llm/gateway/routing
[8]: https://app.datadoghq.com/llm/gateway/access
[9]: https://app.datadoghq.com/llm/gateway/budgets
[10]: /monitors/
[11]: https://app.datadoghq.com/llm/gateway/model-catalog
[12]: /getting_started/site/
[13]: /account_management/teams/manage/
[14]: https://www.datadoghq.com/support/
[15]: https://app.datadoghq.com/llm/gateway/rate-limits
